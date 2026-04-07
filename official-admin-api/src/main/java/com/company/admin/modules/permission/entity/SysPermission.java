package com.company.admin.modules.permission.entity;

import com.company.admin.common.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "sys_permission")
public class SysPermission extends BaseEntity {
    @Column(name = "permission_code", nullable = false, unique = true)
    private String permissionCode;
    @Column(name = "permission_name", nullable = false)
    private String permissionName;
    @Column(nullable = false)
    private String module;
}
