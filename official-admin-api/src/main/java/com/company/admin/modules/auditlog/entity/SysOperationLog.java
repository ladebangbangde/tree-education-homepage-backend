package com.company.admin.modules.auditlog.entity;

import com.company.admin.common.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "sys_operation_log")
public class SysOperationLog extends BaseEntity {
    @Column(nullable = false)
    private String operator;
    @Column(nullable = false)
    private String module;
    @Column(nullable = false)
    private String action;
    @Column(name = "request_path", nullable = false)
    private String requestPath;
    @Column(name = "result_status", nullable = false)
    private String resultStatus;
    @Column(name = "risk_tag", nullable = false)
    private String riskTag;
    @Column(name = "request_time", nullable = false)
    private LocalDateTime requestTime;
}
