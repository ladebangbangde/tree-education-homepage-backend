package com.company.admin.modules.cms.entity;

import com.company.admin.common.base.AuditableEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * 文章聚合实体（cms_article）。
 */
@Getter
@Setter
@Entity
@Table(name = "cms_article")
public class ArticleEntity extends AuditableEntity {

    @Column(name = "column_id", nullable = false)
    private Long columnId;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "slug", nullable = false, length = 255)
    private String slug;

    @Column(name = "summary", length = 1024)
    private String summary;

    @Column(name = "content_markdown", columnDefinition = "LONGTEXT")
    private String contentMarkdown;

    @Column(name = "content_html", columnDefinition = "LONGTEXT")
    private String contentHtml;

    @Column(name = "status", nullable = false, length = 32)
    private String status;

    @Column(name = "current_version_no", nullable = false)
    private Integer currentVersionNo = 1;

    @Column(name = "published_version_no")
    private Integer publishedVersionNo;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    @Column(name = "published_by")
    private Long publishedBy;
}
