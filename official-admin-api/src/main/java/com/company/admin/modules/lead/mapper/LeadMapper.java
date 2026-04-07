package com.company.admin.modules.lead.mapper;

import com.company.admin.modules.lead.entity.LeadRecord;
import com.company.admin.modules.lead.vo.LeadVO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LeadMapper {
    LeadVO toVO(LeadRecord entity);
}
