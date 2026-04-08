package com.company.admin.modules.cms.repository;

import com.company.admin.modules.cms.entity.CmsArticleVersion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CmsArticleVersionRepository extends JpaRepository<CmsArticleVersion, Long> {
    long countByArticleId(Long articleId);
}
