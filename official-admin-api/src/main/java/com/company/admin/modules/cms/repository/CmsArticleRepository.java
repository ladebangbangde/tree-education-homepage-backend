package com.company.admin.modules.cms.repository;

import com.company.admin.modules.cms.entity.CmsArticle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CmsArticleRepository extends JpaRepository<CmsArticle, Long> {
}
