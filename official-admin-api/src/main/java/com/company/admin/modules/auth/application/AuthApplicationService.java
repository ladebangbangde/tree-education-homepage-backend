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
            saveLoginLog(request.getUsername(), httpServletRequest.getRemoteAddr(), "FAIL");
            throw new BusinessException(ErrorCode.UNAUTHORIZED, "账号或密码错误");
        }
        List<Long> roleIds = userRoleRepository.findByUserIdAndDeletedFlagFalse(user.getId()).stream().map(r -> r.getRoleId()).toList();
        List<Long> permissionIds = rolePermissionRepository.findByRoleIdInAndDeletedFlagFalse(roleIds).stream().map(p -> p.getPermissionId()).toList();
        List<String> permissions = permissionRepository.findByIdIn(permissionIds).stream().map(SysPermission::getPermissionCode).distinct().toList();
        String token = jwtTokenService.generateToken(user.getId(), user.getUsername(), permissions);
        saveLoginLog(request.getUsername(), httpServletRequest.getRemoteAddr(), "SUCCESS");
        return LoginResponse.builder().token(token).userId(user.getId()).username(user.getUsername())
                .displayName(user.getDisplayName()).permissions(permissions).build();
    }

    public LoginResponse me() {
        AdminUserDetails user = (AdminUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return LoginResponse.builder().userId(user.getId()).username(user.getUsername()).displayName(user.getUsername())
                .permissions(user.getAuthorities().stream().map(a -> a.getAuthority()).toList()).build();
    }

    private void saveLoginLog(String username, String ipAddress, String resultStatus) {
        SysLoginLog log = new SysLoginLog();
        log.setUsername(username);
        log.setIpAddress(ipAddress == null ? "unknown" : ipAddress);
        log.setResultStatus(resultStatus);
        loginLogRepository.save(log);
    }
}
