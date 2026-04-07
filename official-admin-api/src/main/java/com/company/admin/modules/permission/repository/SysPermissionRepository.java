package com.company.admin.modules.permission.repository;

import com.company.admin.modules.permission.entity.SysPermission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SysPermissionRepository extends JpaRepository<SysPermission, Long> {
    List<SysPermission> findByIdIn(List<Long> ids);
}
