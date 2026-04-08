package com.company.admin.modules.menu.controller;

import com.company.admin.common.api.ApiControllerSupport;
import com.company.admin.common.constants.PermissionConstants;
import com.company.admin.common.response.ApiResponse;
import com.company.admin.modules.menu.application.MenuApplicationService;
import com.company.admin.modules.menu.vo.MenuTreeVO;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/menus")
public class MenuController implements ApiControllerSupport {
    private final MenuApplicationService service;

    public MenuController(MenuApplicationService service) { this.service = service; }

    @GetMapping("/tree")
    @PreAuthorize("hasAuthority('" + PermissionConstants.AUTH_MENU_VIEW + "')")
    public ApiResponse<List<MenuTreeVO>> tree() { return ok(service.tree()); }
}
