package com.company.admin.modules.menu.repository;

import com.company.admin.modules.menu.entity.SysMenu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<SysMenu, Long> {
}
