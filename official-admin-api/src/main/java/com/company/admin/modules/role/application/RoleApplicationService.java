package com.company.admin.modules.role.application;

import com.company.admin.common.audit.AuditOperation;
import com.company.admin.modules.role.dto.CreateRoleRequest;
import com.company.admin.modules.role.dto.RolePermissionGrantRequest;
import com.company.admin.modules.role.entity.SysRole;
import com.company.admin.modules.role.entity.SysRolePermission;
import com.company.admin.modules.role.mapper.RoleMapper;
import com.company.admin.modules.role.repository.SysRolePermissionRepository;
import com.company.admin.modules.role.repository.SysRoleRepository;
import com.company.admin.modules.role.vo.RoleVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RoleApplicationService {
    private final SysRoleRepository roleRepository;
    private final SysRolePermissionRepository rolePermissionRepository;
    private final RoleMapper mapper;

    public RoleApplicationService(SysRoleRepository roleRepository, SysRolePermissionRepository rolePermissionRepository, RoleMapper mapper) {
        this.roleRepository = roleRepository;
        this.rolePermissionRepository = rolePermissionRepository;
        this.mapper = mapper;
    }

    public List<RoleVO> list() { return roleRepository.findAll().stream().map(mapper::toVO).toList(); }

    @AuditOperation(module = "ROLE", action = "CREATE_ROLE", highRisk = true)
    public RoleVO create(CreateRoleRequest request) {
        SysRole role = new SysRole();
        role.setRoleCode(request.getRoleCode());
        role.setRoleName(request.getRoleName());
        role.setStatus("ENABLED");
        return mapper.toVO(roleRepository.save(role));
    }

    @Transactional
    @AuditOperation(module = "ROLE", action = "GRANT_PERMISSION", highRisk = true)
    public void grantPermissions(Long roleId, RolePermissionGrantRequest request) {
        rolePermissionRepository.deleteByRoleId(roleId);
        for (Long permissionId : request.getPermissionIds()) {
            SysRolePermission rel = new SysRolePermission();
            rel.setRoleId(roleId);
            rel.setPermissionId(permissionId);
            rolePermissionRepository.save(rel);
        }
    }
}
