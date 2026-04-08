package com.company.admin.modules.siteconfig.repository;

import com.company.admin.modules.siteconfig.entity.SiteConfigEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SiteConfigRepository extends JpaRepository<SiteConfigEntity, Long> {
    Optional<SiteConfigEntity> findFirstBySiteCodeAndDeletedFlagFalse(String siteCode);
}
