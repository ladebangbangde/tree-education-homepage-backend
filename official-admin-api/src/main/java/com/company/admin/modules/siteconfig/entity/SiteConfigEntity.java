package com.company.admin.modules.siteconfig.entity;

import com.company.admin.common.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "site_config")
public class SiteConfigEntity extends BaseEntity {
    @Column(name = "site_code", nullable = false)
    private String siteCode;

    @Column(name = "site_name", nullable = false)
    private String siteName;

    @Column(name = "default_locale", nullable = false)
    private String defaultLocale;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(nullable = false)
    private String status;
}
