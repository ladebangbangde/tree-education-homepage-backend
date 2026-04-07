package com.company.admin.modules.cms.vo;

import lombok.Data;

@Data
public class ArticleVO {
    private Long id;
    private String title;
    private String status;
    private Long columnId;
}
