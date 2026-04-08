package com.company.admin.modules.cms.entity;

import com.company.admin.common.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "cms_article")
public class CmsArticle extends BaseEntity {
    @Column(nullable = false)
    private String title;

    @Column(name = "content_markdown", columnDefinition = "LONGTEXT")
    private String content;

    @Column(name = "column_id", nullable = false)
    private Long columnId;

    @Column(nullable = false)
    private String status;
}
