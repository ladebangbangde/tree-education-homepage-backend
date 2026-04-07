package com.company.admin.modules.user.application;

import com.company.admin.common.audit.AuditOperation;
import com.company.admin.modules.user.dto.CreateUserRequest;
import com.company.admin.modules.user.entity.SysUser;
import com.company.admin.modules.user.mapper.UserMapper;
import com.company.admin.modules.user.repository.SysUserRepository;
import com.company.admin.modules.user.vo.UserVO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserApplicationService {
    private final SysUserRepository repository;
    private final UserMapper mapper;
    private final PasswordEncoder passwordEncoder;

    public UserApplicationService(SysUserRepository repository, UserMapper mapper, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserVO> listUsers() {
        return repository.findAll().stream().map(mapper::toVO).toList();
    }

    @AuditOperation(module = "USER", action = "CREATE_USER")
    public UserVO create(CreateUserRequest request) {
        SysUser user = new SysUser();
        user.setUsername(request.getUsername());
        user.setDisplayName(request.getDisplayName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setDepartmentId(request.getDepartmentId());
        user.setStatus("ENABLED");
        return mapper.toVO(repository.save(user));
    }
}
