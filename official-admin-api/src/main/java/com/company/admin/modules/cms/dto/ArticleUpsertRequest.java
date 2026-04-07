package com.company.admin.modules.cms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ArticleUpsertRequest {
    @NotBlank private String title;
    @NotBlank private String content;
    @NotNull private Long columnId;
}
