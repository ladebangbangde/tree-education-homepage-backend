package com.company.admin.modules.cms.controller;

import com.company.admin.common.api.ApiControllerSupport;
import com.company.admin.common.constants.PermissionConstants;
import com.company.admin.common.response.ApiResponse;
import com.company.admin.modules.cms.application.CmsArticleApplicationService;
import com.company.admin.modules.cms.dto.ArticleUpsertRequest;
import com.company.admin.modules.cms.vo.ArticleVO;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/cms/articles")
public class CmsArticleController implements ApiControllerSupport {
    private final CmsArticleApplicationService service;

    public CmsArticleController(CmsArticleApplicationService service) { this.service = service; }

    @GetMapping
    @PreAuthorize("hasAuthority('" + PermissionConstants.CMS_ARTICLE_VIEW + "')")
    public ApiResponse<List<ArticleVO>> list() { return ok(service.list()); }

    @PostMapping
    @PreAuthorize("hasAuthority('" + PermissionConstants.CMS_ARTICLE_CREATE + "')")
    public ApiResponse<ArticleVO> create(@Valid @RequestBody ArticleUpsertRequest request) { return ok(service.create(request)); }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('" + PermissionConstants.CMS_ARTICLE_UPDATE + "')")
    public ApiResponse<ArticleVO> update(@PathVariable Long id, @Valid @RequestBody ArticleUpsertRequest request) { return ok(service.update(id, request)); }

    @PutMapping("/{id}/publish")
    @PreAuthorize("hasAuthority('" + PermissionConstants.CMS_ARTICLE_PUBLISH + "')")
    public ApiResponse<Void> publish(@PathVariable Long id) { service.publish(id); return ok(null); }
}
