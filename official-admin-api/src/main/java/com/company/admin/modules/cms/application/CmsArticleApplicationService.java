package com.company.admin.modules.cms.application;

import com.company.admin.common.audit.AuditOperation;
import com.company.admin.common.exception.BusinessException;
import com.company.admin.common.exception.ErrorCode;
import com.company.admin.modules.cms.dto.ArticleUpsertRequest;
import com.company.admin.modules.cms.entity.CmsArticle;
import com.company.admin.modules.cms.entity.CmsArticleVersion;
import com.company.admin.modules.cms.mapper.ArticleMapper;
import com.company.admin.modules.cms.repository.CmsArticleRepository;
import com.company.admin.modules.cms.repository.CmsArticleVersionRepository;
import com.company.admin.modules.cms.vo.ArticleVO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CmsArticleApplicationService {
    private final CmsArticleRepository repository;
    private final CmsArticleVersionRepository versionRepository;
    private final ArticleMapper mapper;

    public CmsArticleApplicationService(CmsArticleRepository repository, CmsArticleVersionRepository versionRepository, ArticleMapper mapper) {
        this.repository = repository;
        this.versionRepository = versionRepository;
        this.mapper = mapper;
    }

    public List<ArticleVO> list() {
        return repository.findAll().stream().map(mapper::toVO).toList();
    }

    @AuditOperation(module = "CMS", action = "CREATE_ARTICLE")
    public ArticleVO create(ArticleUpsertRequest request) {
        CmsArticle article = new CmsArticle();
        article.setTitle(request.getTitle());
        article.setContent(request.getContent());
        article.setColumnId(request.getColumnId());
        article.setStatus("DRAFT");
        CmsArticle saved = repository.save(article);
        saveVersion(saved, "DRAFT");
        return mapper.toVO(saved);
    }

    @AuditOperation(module = "CMS", action = "UPDATE_ARTICLE")
    public ArticleVO update(Long id, ArticleUpsertRequest request) {
        CmsArticle article = repository.findById(id).orElseThrow(() -> new BusinessException(ErrorCode.RESOURCE_NOT_FOUND, "文章不存在"));
        article.setTitle(request.getTitle());
        article.setContent(request.getContent());
        article.setColumnId(request.getColumnId());
        CmsArticle saved = repository.save(article);
        saveVersion(saved, "DRAFT");
        return mapper.toVO(saved);
    }

    @AuditOperation(module = "CMS", action = "PUBLISH_ARTICLE", highRisk = true)
    public void publish(Long id) {
        CmsArticle article = repository.findById(id).orElseThrow(() -> new BusinessException(ErrorCode.RESOURCE_NOT_FOUND, "文章不存在"));
        article.setStatus("PUBLISHED");
        repository.save(article);
        saveVersion(article, "PUBLISHED");
    }

    private void saveVersion(CmsArticle article, String versionStatus) {
        CmsArticleVersion v = new CmsArticleVersion();
        v.setArticleId(article.getId());
        v.setVersionNo((int) (versionRepository.countByArticleId(article.getId()) + 1));
        v.setSnapshot(article.getContent());
        v.setTitleSnapshot(article.getTitle());
        v.setVersionStatus(versionStatus);
        versionRepository.save(v);
    }
}
