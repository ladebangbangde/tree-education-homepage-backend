package com.company.admin.modules.auditlog.entity;

import com.company.admin.common.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "sys_operation_log")
public class SysOperationLog extends BaseEntity {
    @Column(name = "operator_name")
    private String operator;

    @Column(name = "module_key", nullable = false)
    private String module;

    @Column(name = "action_key", nullable = false)
    private String action;

    @Column(name = "request_path", nullable = false)
    private String requestPath;

    @Column(name = "request_method", nullable = false)
    private String requestMethod;

    @Column(name = "result_code", nullable = false)
    private String resultStatus;

    @Column(name = "created_at")
    private java.time.LocalDateTime requestTime;

    @Column(name = "risk_tag")
    private String riskTag;
}
