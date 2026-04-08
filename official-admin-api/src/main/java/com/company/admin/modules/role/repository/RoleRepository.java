package com.company.admin.modules.role.repository;

import com.company.admin.modules.role.entity.SysRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<SysRole, Long> {
}
