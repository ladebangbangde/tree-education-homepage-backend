package com.company.admin.modules.systemconfig.repository;

import com.company.admin.modules.systemconfig.entity.SysConfigItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SysConfigItemRepository extends JpaRepository<SysConfigItem, Long> {
}
