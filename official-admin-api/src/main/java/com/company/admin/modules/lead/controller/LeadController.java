package com.company.admin.modules.lead.controller;

import com.company.admin.common.api.ApiControllerSupport;
import com.company.admin.common.constants.PermissionConstants;
import com.company.admin.common.response.ApiResponse;
import com.company.admin.modules.lead.application.LeadApplicationService;
import com.company.admin.modules.lead.dto.AssignLeadRequest;
import com.company.admin.modules.lead.dto.CreateFollowRecordRequest;
import com.company.admin.modules.lead.vo.LeadVO;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/leads")
public class LeadController implements ApiControllerSupport {
    private final LeadApplicationService service;

    public LeadController(LeadApplicationService service) { this.service = service; }

    @GetMapping
    @PreAuthorize("hasAuthority('" + PermissionConstants.LEAD_VIEW + "')")
    public ApiResponse<List<LeadVO>> list() { return ok(service.list()); }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('" + PermissionConstants.LEAD_VIEW + "')")
    public ApiResponse<LeadVO> detail(@PathVariable Long id) { return ok(service.detail(id)); }

    @PutMapping("/{id}/assign")
    @PreAuthorize("hasAuthority('" + PermissionConstants.LEAD_ASSIGN + "')")
    public ApiResponse<Void> assign(@PathVariable Long id, @Valid @RequestBody AssignLeadRequest request) { service.assign(id, request); return ok(null); }

    @PostMapping("/{id}/follow-records")
    @PreAuthorize("hasAuthority('" + PermissionConstants.LEAD_FOLLOW + "')")
    public ApiResponse<Void> addFollowRecord(@PathVariable Long id, @Valid @RequestBody CreateFollowRecordRequest request) { service.addFollowRecord(id, request); return ok(null); }
}
