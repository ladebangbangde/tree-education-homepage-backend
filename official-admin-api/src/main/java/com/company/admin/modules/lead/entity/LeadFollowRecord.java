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
@Table(name = "lead_follow_record")
public class LeadFollowRecord extends BaseEntity {
    @Column(name = "lead_id", nullable = false)
    private Long leadId;
    @Column(name = "follow_content", nullable = false)
    private String followContent;
}
