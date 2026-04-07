package com.company.admin.modules.menu.entity;

import com.company.admin.common.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "sys_menu")
public class SysMenu extends BaseEntity {
    @Column(name = "parent_id")
    private Long parentId;
    @Column(name = "menu_name", nullable = false)
    private String menuName;
    @Column(name = "menu_path", nullable = false)
    private String menuPath;
    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;
}
