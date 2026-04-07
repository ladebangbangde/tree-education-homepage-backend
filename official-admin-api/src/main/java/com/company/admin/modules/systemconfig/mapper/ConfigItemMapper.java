package com.company.admin.modules.systemconfig.mapper;

import com.company.admin.modules.systemconfig.entity.SysConfigItem;
import com.company.admin.modules.systemconfig.vo.ConfigItemVO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ConfigItemMapper {
    ConfigItemVO toVO(SysConfigItem entity);
}
