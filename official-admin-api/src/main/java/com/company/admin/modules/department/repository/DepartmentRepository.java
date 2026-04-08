package com.company.admin.modules.department.repository;

import com.company.admin.modules.department.entity.SysDepartment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<SysDepartment, Long> {
}
