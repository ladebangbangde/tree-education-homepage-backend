package com.company.admin.modules.menu.vo;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class MenuTreeVO {
    private Long id;
    private String menuName;
    private String menuPath;
    private List<MenuTreeVO> children = new ArrayList<>();
}
