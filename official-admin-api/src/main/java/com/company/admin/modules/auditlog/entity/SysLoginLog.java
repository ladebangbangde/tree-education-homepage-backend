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
@Table(name = "sys_login_log")
public class SysLoginLog extends BaseEntity {
    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false)
    private String username;

    @Column(name = "login_type", nullable = false)
    private String loginType = "PASSWORD";

    @Column(name = "ip_address", nullable = false)
    private String ipAddress;

    @Column(name = "login_result", nullable = false)
    private String resultStatus;

    @Column(name = "user_agent")
    private String userAgent;

    @Column(name = "fail_reason")
    private String failReason;
}
