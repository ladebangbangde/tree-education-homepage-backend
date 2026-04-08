package com.company.admin.modules.permission.repository;

import com.company.admin.modules.permission.entity.SysPermission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository extends JpaRepository<SysPermission, Long> {
}
