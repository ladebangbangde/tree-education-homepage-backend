package com.company.admin.modules.lead.repository;

import com.company.admin.modules.lead.entity.LeadFollowRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeadFollowRecordRepository extends JpaRepository<LeadFollowRecord, Long> {
}
