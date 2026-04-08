package com.company.admin.modules.auditlog.repository;

import com.company.admin.modules.auditlog.entity.SysOperationLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OperationLogRepository extends JpaRepository<SysOperationLog, Long> {
}
