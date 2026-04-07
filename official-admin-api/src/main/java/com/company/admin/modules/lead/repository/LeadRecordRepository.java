package com.company.admin.modules.lead.repository;

import com.company.admin.modules.lead.entity.LeadRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeadRecordRepository extends JpaRepository<LeadRecord, Long> {
}
