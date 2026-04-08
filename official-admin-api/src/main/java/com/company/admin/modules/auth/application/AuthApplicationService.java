package com.company.admin.modules.auth.application;

import com.company.admin.common.exception.BusinessException;
import com.company.admin.common.exception.ErrorCode;
import com.company.admin.common.security.AdminUserDetails;
import com.company.admin.common.security.JwtTokenService;
import com.company.admin.modules.auditlog.entity.SysLoginLog;
import com.company.admin.modules.auditlog.repository.SysLoginLogRepository;
import com.company.admin.modules.auth.dto.LoginRequest;
import com.company.admin.modules.auth.vo.LoginResponse;
import com.company.admin.modules.permission.entity.SysPermission;
import com.company.admin.modules.permission.repository.SysPermissionRepository;
import com.company.admin.modules.role.repository.SysRolePermissionRepository;
import com.company.admin.modules.role.repository.SysUserRoleRepository;
import com.company.admin.modules.user.entity.SysUser;
import com.company.admin.modules.user.repository.SysUserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthApplicationService {
    private final SysUserRepository userRepository;
    private final SysUserRoleRepository userRoleRepository;
    private final SysRolePermissionRepository rolePermissionRepository;
    private final SysPermissionRepository permissionRepository;
    private final SysLoginLogRepository loginLogRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenService jwtTokenService;

    public AuthApplicationService(SysUserRepository userRepository, SysUserRoleRepository userRoleRepository,
                                  SysRolePermissionRepository rolePermissionRepository,
                                  SysPermissionRepository permissionRepository,
                                  SysLoginLogRepository loginLogRepository,
                                  PasswordEncoder passwordEncoder, JwtTokenService jwtTokenService) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
        this.rolePermissionRepository = rolePermissionRepository;
        this.permissionRepository = permissionRepository;
        this.loginLogRepository = loginLogRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenService = jwtTokenService;
    }

    public LoginResponse login(LoginRequest request, HttpServletRequest httpServletRequest) {
        SysUser user = userRepository.findByUsernameAndDeletedFlagFalse(request.getUsername())
                .orElseThrow(() -> new BusinessException(ErrorCode.UNAUTHORIZED, "账号或密码错误"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            saveLoginLog(null, request.getUsername(), httpServletRequest, "FAIL", "账号或密码错误");
            throw new BusinessException(ErrorCode.UNAUTHORIZED, "账号或密码错误");
        }
        List<Long> roleIds = userRoleRepository.findByUserIdAndDeletedFlagFalse(user.getId()).stream().map(r -> r.getRoleId()).toList();
        List<String> permissions;
        if (roleIds.isEmpty()) {
            permissions = List.of();
        } else {
            List<Long> permissionIds = rolePermissionRepository.findByRoleIdInAndDeletedFlagFalse(roleIds).stream().map(p -> p.getPermissionId()).toList();
            permissions = permissionIds.isEmpty() ? List.of() :
                permissionRepository.findByIdIn(permissionIds).stream().map(SysPermission::getPermissionCode).distinct().toList();
        }
        String token = jwtTokenService.generateToken(user.getId(), user.getUsername(), user.getDisplayName(), permissions);
        saveLoginLog(user.getId(), request.getUsername(), httpServletRequest, "SUCCESS", null);
        return LoginResponse.builder().token(token).userId(user.getId()).username(user.getUsername())
                .displayName(user.getDisplayName()).permissions(permissions).build();
    }

    public LoginResponse me() {
        AdminUserDetails user = (AdminUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return LoginResponse.builder().userId(user.getId()).username(user.getUsername()).displayName(user.getDisplayName())
                .permissions(user.getAuthorities().stream().map(a -> a.getAuthority()).toList()).build();
    }

    private void saveLoginLog(Long userId, String username, HttpServletRequest request, String resultStatus, String failReason) {
        SysLoginLog log = new SysLoginLog();
        log.setUserId(userId);
        log.setUsername(username);
        log.setIpAddress(request.getRemoteAddr() == null ? "unknown" : request.getRemoteAddr());
        log.setResultStatus(resultStatus);
        log.setUserAgent(request.getHeader("User-Agent"));
        log.setFailReason(failReason);
        loginLogRepository.save(log);
    }
}
