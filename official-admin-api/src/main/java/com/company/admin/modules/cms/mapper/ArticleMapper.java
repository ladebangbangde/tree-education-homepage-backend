package com.company.admin.modules.cms.mapper;

import com.company.admin.modules.cms.entity.CmsArticle;
import com.company.admin.modules.cms.vo.ArticleVO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ArticleMapper {
    ArticleVO toVO(CmsArticle article);
}
