package com.company.admin.modules.menu.application;

import com.company.admin.modules.menu.entity.SysMenu;
import com.company.admin.modules.menu.repository.SysMenuRepository;
import com.company.admin.modules.menu.vo.MenuTreeVO;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MenuApplicationService {
    private final SysMenuRepository repository;

    public MenuApplicationService(SysMenuRepository repository) { this.repository = repository; }

    public List<MenuTreeVO> tree() {
        List<SysMenu> menus = repository.findAllByOrderBySortOrderAsc();
        Map<Long, MenuTreeVO> all = new HashMap<>();
        List<MenuTreeVO> roots = new ArrayList<>();
        for (SysMenu menu : menus) {
            MenuTreeVO vo = new MenuTreeVO();
            vo.setId(menu.getId()); vo.setMenuName(menu.getMenuName()); vo.setMenuPath(menu.getMenuPath());
            all.put(menu.getId(), vo);
        }
        for (SysMenu menu : menus) {
            if (menu.getParentId() == null || menu.getParentId() == 0L) roots.add(all.get(menu.getId()));
            else Optional.ofNullable(all.get(menu.getParentId())).ifPresent(parent -> parent.getChildren().add(all.get(menu.getId())));
        }
        return roots;
    }
}
