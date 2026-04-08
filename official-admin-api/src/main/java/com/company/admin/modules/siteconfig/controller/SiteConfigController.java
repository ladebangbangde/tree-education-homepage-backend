package com.company.admin.modules.siteconfig.controller;

import com.company.admin.common.api.ApiControllerSupport;
import com.company.admin.common.constants.PermissionConstants;
import com.company.admin.common.response.ApiResponse;
import com.company.admin.modules.siteconfig.service.SiteConfigService;
import com.company.admin.modules.siteconfig.vo.SiteConfigVO;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/site/config")
public class SiteConfigController implements ApiControllerSupport {

    private final SiteConfigService service;

    public SiteConfigController(SiteConfigService service) {
        this.service = service;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('" + PermissionConstants.SITE_CONFIG_VIEW + "')")
    public ApiResponse<SiteConfigVO> getConfig() {
        return ok(service.getDefault());
    }
}
