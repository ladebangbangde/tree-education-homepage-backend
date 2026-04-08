package com.company.admin.modules.cms.repository;

import com.company.admin.modules.cms.entity.CmsArticle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<CmsArticle, Long> {
}
