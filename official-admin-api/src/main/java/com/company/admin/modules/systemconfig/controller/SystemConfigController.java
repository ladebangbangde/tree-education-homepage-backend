package com.company.admin.modules.systemconfig.controller;

import com.company.admin.common.api.ApiControllerSupport;
import com.company.admin.common.constants.PermissionConstants;
import com.company.admin.common.response.ApiResponse;
import com.company.admin.modules.systemconfig.application.SystemConfigApplicationService;
import com.company.admin.modules.systemconfig.dto.UpdateConfigItemRequest;
import com.company.admin.modules.systemconfig.vo.ConfigItemVO;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/system/config-items")
public class SystemConfigController implements ApiControllerSupport {
    private final SystemConfigApplicationService service;

    public SystemConfigController(SystemConfigApplicationService service) { this.service = service; }

    @GetMapping
    @PreAuthorize("hasAuthority('" + PermissionConstants.CONFIG_VIEW + "')")
    public ApiResponse<List<ConfigItemVO>> list() { return ok(service.list()); }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('" + PermissionConstants.CONFIG_UPDATE + "')")
    public ApiResponse<ConfigItemVO> update(@PathVariable Long id, @Valid @RequestBody UpdateConfigItemRequest request) {
        return ok(service.update(id, request));
    }
}
