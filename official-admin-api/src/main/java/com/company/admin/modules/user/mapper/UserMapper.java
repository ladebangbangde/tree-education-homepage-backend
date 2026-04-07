package com.company.admin.modules.user.mapper;

import com.company.admin.modules.user.entity.SysUser;
import com.company.admin.modules.user.vo.UserVO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserVO toVO(SysUser user);
}
