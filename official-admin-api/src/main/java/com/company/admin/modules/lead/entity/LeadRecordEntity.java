package com.company.admin.modules.lead.entity;

import com.company.admin.common.base.AuditableEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * 线索主记录实体（lead_record）。
 */
@Getter
@Setter
@Entity
@Table(name = "lead_record")
public class LeadRecordEntity extends AuditableEntity {

    @Column(name = "lead_no", nullable = false, unique = true, length = 64)
    private String leadNo;

    @Column(name = "student_name", nullable = false, length = 128)
    private String studentName;

    @Column(name = "phone", nullable = false, length = 32)
    private String phone;

    @Column(name = "email", length = 128)
    private String email;

    @Column(name = "wechat_no", length = 128)
    private String wechatNo;

    @Column(name = "source_channel", nullable = false, length = 64)
    private String sourceChannel;

    @Column(name = "consultant_user_id")
    private Long consultantUserId;

    @Column(name = "status", nullable = false, length = 32)
    private String status;

    @Column(name = "intent_level", length = 32)
    private String intentLevel;

    @Column(name = "latest_follow_at")
    private LocalDateTime latestFollowAt;

    @Column(name = "next_follow_at")
    private LocalDateTime nextFollowAt;

    @Column(name = "remark", length = 1024)
    private String remark;
}
