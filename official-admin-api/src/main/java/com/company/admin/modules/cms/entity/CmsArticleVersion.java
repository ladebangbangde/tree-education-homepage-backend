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
@Table(name = "cms_article_version")
public class CmsArticleVersion extends BaseEntity {
    @Column(name = "article_id", nullable = false)
    private Long articleId;

    @Column(name = "version_no", nullable = false)
    private Integer versionNo;

    @Column(name = "content_markdown_snapshot", columnDefinition = "LONGTEXT")
    private String snapshot;

    @Column(name = "title_snapshot", nullable = false)
    private String titleSnapshot;

    @Column(name = "version_status", nullable = false)
    private String versionStatus = "DRAFT";
}
