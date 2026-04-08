package com.company.admin.modules.user.repository;

import com.company.admin.modules.user.entity.SysUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<SysUser, Long> {
}
