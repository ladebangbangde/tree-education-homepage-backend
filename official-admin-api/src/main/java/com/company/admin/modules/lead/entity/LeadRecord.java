package com.company.admin.modules.lead.entity;

import com.company.admin.common.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "lead_record")
public class LeadRecord extends BaseEntity {
    @Column(name = "lead_no", nullable = false)
    private String leadNo;

    @Column(name = "student_name", nullable = false)
    private String studentName;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String status;

    @Column(name = "consultant_user_id")
    private Long assignedTo;
}
