package com.company.admin.modules.role.entity;

import com.company.admin.common.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "sys_role_permission")
public class SysRolePermission extends BaseEntity {
    @Column(name = "role_id", nullable = false)
    private Long roleId;
    @Column(name = "permission_id", nullable = false)
    private Long permissionId;
}
