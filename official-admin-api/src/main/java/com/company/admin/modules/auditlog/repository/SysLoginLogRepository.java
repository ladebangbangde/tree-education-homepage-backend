package com.company.admin.modules.auditlog.repository;

import com.company.admin.modules.auditlog.entity.SysLoginLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SysLoginLogRepository extends JpaRepository<SysLoginLog, Long> {
}
