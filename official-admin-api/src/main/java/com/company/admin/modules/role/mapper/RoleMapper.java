package com.company.admin.modules.role.mapper;

import com.company.admin.modules.role.entity.SysRole;
import com.company.admin.modules.role.vo.RoleVO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    RoleVO toVO(SysRole role);
}
