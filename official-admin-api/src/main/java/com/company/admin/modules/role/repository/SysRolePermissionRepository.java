package com.company.admin.modules.role.repository;

import com.company.admin.modules.role.entity.SysRolePermission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SysRolePermissionRepository extends JpaRepository<SysRolePermission, Long> {
    List<SysRolePermission> findByRoleIdInAndDeletedFlagFalse(List<Long> roleIds);
    void deleteByRoleId(Long roleId);
}
