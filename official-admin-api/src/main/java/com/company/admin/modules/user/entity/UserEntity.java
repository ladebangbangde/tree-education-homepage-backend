package com.company.admin.modules.user.entity;

import com.company.admin.common.base.AuditableEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/**
 * 用户实体（sys_user）。
 */
@Getter
@Setter
@Entity
@Table(name = "sys_user")
public class UserEntity extends AuditableEntity {

    @Column(name = "username", nullable = false, length = 64, unique = true)
    private String username;

    @Column(name = "display_name", nullable = false, length = 128)
    private String displayName;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "phone", length = 32)
    private String phone;

    @Column(name = "email", length = 128)
    private String email;

    @Column(name = "wechat_no", length = 128)
    private String wechatNo;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "status", nullable = false, length = 32)
    private String status;

    @Column(name = "enabled", nullable = false)
    private Boolean enabled = Boolean.TRUE;

    @Column(name = "remark", length = 512)
    private String remark;
}
