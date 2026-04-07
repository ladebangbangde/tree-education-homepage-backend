package com.company.admin.modules.lead.application;

import com.company.admin.common.audit.AuditOperation;
import com.company.admin.common.exception.BizException;
import com.company.admin.common.exception.ErrorCode;
import com.company.admin.modules.lead.dto.AssignLeadRequest;
import com.company.admin.modules.lead.dto.CreateFollowRecordRequest;
import com.company.admin.modules.lead.entity.LeadFollowRecord;
import com.company.admin.modules.lead.entity.LeadRecord;
import com.company.admin.modules.lead.mapper.LeadMapper;
import com.company.admin.modules.lead.repository.LeadFollowRecordRepository;
import com.company.admin.modules.lead.repository.LeadRecordRepository;
import com.company.admin.modules.lead.vo.LeadVO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeadApplicationService {
    private final LeadRecordRepository repository;
    private final LeadFollowRecordRepository followRepository;
    private final LeadMapper mapper;

    public LeadApplicationService(LeadRecordRepository repository, LeadFollowRecordRepository followRepository, LeadMapper mapper) {
        this.repository = repository;
        this.followRepository = followRepository;
        this.mapper = mapper;
    }

    public List<LeadVO> list() { return repository.findAll().stream().map(mapper::toVO).toList(); }

    public LeadVO detail(Long id) {
        return mapper.toVO(repository.findById(id).orElseThrow(() -> new BizException(ErrorCode.NOT_FOUND, "线索不存在")));
    }

    @AuditOperation(module = "LEAD", action = "ASSIGN_LEAD", highRisk = true)
    public void assign(Long id, AssignLeadRequest request) {
        LeadRecord lead = repository.findById(id).orElseThrow(() -> new BizException(ErrorCode.NOT_FOUND, "线索不存在"));
        lead.setAssignedTo(request.getAssignedTo());
        lead.setStatus("ASSIGNED");
        repository.save(lead);
    }

    @AuditOperation(module = "LEAD", action = "ADD_FOLLOW")
    public void addFollowRecord(Long id, CreateFollowRecordRequest request) {
        LeadRecord lead = repository.findById(id).orElseThrow(() -> new BizException(ErrorCode.NOT_FOUND, "线索不存在"));
        LeadFollowRecord follow = new LeadFollowRecord();
        follow.setLeadId(lead.getId());
        follow.setFollowContent(request.getFollowContent());
        followRepository.save(follow);
    }
}
