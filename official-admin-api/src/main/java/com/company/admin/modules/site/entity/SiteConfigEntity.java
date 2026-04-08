package com.company.admin.modules.site.entity;

import com.company.admin.common.base.AuditableEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/**
 * 站点配置实体（site_config）。
 */
@Getter
@Setter
@Entity
@Table(name = "site_config")
public class SiteConfigEntity extends AuditableEntity {

    @Column(name = "site_code", nullable = false, unique = true, length = 64)
    private String siteCode;

    @Column(name = "site_name", nullable = false, length = 128)
    private String siteName;

    @Column(name = "default_locale", nullable = false, length = 16)
    private String defaultLocale = "zh-CN";

    @Column(name = "logo_url", length = 1024)
    private String logoUrl;

    @Column(name = "favicon_url", length = 1024)
    private String faviconUrl;

    @Column(name = "support_email", length = 128)
    private String supportEmail;

    @Column(name = "support_phone", length = 32)
    private String supportPhone;

    @Column(name = "status", nullable = false, length = 32)
    private String status;
}
