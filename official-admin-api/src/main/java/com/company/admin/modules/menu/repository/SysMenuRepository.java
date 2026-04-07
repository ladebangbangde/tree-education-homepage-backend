package com.company.admin.modules.menu.repository;

import com.company.admin.modules.menu.entity.SysMenu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SysMenuRepository extends JpaRepository<SysMenu, Long> {
    List<SysMenu> findAllByOrderBySortOrderAsc();
}
