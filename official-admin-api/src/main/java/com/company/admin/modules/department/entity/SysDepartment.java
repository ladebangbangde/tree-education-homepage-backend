package com.company.admin.modules.department.entity;

import com.company.admin.common.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "sys_department")
public class SysDepartment extends BaseEntity {
    @Column(name = "parent_id", nullable = false)
    private Long parentId;

    @Column(name = "dept_code", nullable = false)
    private String deptCode;

    @Column(name = "dept_name", nullable = false)
    private String deptName;

    @Column(nullable = false)
    private String status;
}
