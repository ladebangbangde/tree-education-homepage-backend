package com.company.admin.modules.role.repository;

import com.company.admin.modules.role.entity.SysUserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SysUserRoleRepository extends JpaRepository<SysUserRole, Long> {
    List<SysUserRole> findByUserIdAndDeletedFlagFalse(Long userId);
}
