package com.company.admin.modules.siteconfig.service;

import com.company.admin.modules.siteconfig.repository.SiteConfigRepository;
import com.company.admin.modules.siteconfig.vo.SiteConfigVO;
import org.springframework.stereotype.Service;

@Service
public class SiteConfigService {
    private final SiteConfigRepository repository;

    public SiteConfigService(SiteConfigRepository repository) {
        this.repository = repository;
    }

    public SiteConfigVO getDefault() {
        return repository.findFirstBySiteCodeAndDeletedFlagFalse("default")
            .map(it -> new SiteConfigVO(it.getSiteCode(), it.getSiteName(), it.getDefaultLocale(), it.getLogoUrl(), it.getStatus()))
            .orElse(null);
    }
}
