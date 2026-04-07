package com.company.admin.modules.user.repository;

import com.company.admin.modules.user.entity.SysUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SysUserRepository extends JpaRepository<SysUser, Long> {
    Optional<SysUser> findByUsernameAndDeletedFlagFalse(String username);
}
