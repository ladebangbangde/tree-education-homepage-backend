package com.company.admin.modules.siteconfig.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateSiteConfigRequest(@NotBlank String siteName, String logoUrl) {
}
