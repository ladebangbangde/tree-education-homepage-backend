package com.company.admin.modules.role.entity;

import com.company.admin.common.base.AuditableEntity;
import com.company.admin.common.enums.DataScopeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/**
 * 角色实体（sys_role）。
 */
@Getter
@Setter
@Entity
@Table(name = "sys_role")
public class RoleEntity extends AuditableEntity {

    @Column(name = "role_code", nullable = false, length = 64, unique = true)
    private String roleCode;

    @Column(name = "role_name", nullable = false, length = 128)
    private String roleName;

    @Enumerated(EnumType.STRING)
    @Column(name = "data_scope_type", nullable = false, length = 32)
    private DataScopeType dataScopeType = DataScopeType.SELF;

    @Column(name = "status", nullable = false, length = 32)
    private String status;

    @Column(name = "enabled", nullable = false)
    private Boolean enabled = Boolean.TRUE;

    @Column(name = "remark", length = 512)
    private String remark;
}
