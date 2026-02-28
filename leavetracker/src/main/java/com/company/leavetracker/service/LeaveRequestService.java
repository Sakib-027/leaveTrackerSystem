package com.company.leavetracker.service;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.leavetracker.dto.LeaveResponseDTO;
import com.company.leavetracker.entity.Employee;
import com.company.leavetracker.entity.LeaveRequest;
import com.company.leavetracker.repository.LeaveRequestRepository;

@Service
public class LeaveRequestService {

	@Autowired
	private LeaveRequestRepository leaveRequestRepository;

	// Apply leave
	public LeaveRequest applyLeave(LeaveRequest leaveRequest) {
		leaveRequest.setStatus("PENDING");
		return leaveRequestRepository.save(leaveRequest);
	}

	// View leave requests by employee
	public List<LeaveResponseDTO> getLeavesByEmployee(Long employeeId) {

		List<LeaveRequest> leaves = leaveRequestRepository.findByEmployeeId(employeeId);
		List<LeaveResponseDTO> response = new ArrayList<>();

		for (LeaveRequest leave : leaves) {
			response.add(mapToDTO(leave));
		}

		return response;
	}

	// approve leave
	public LeaveRequest approveLeave(Long leaveId) {

		LeaveRequest leaveRequest = leaveRequestRepository.findById(leaveId).orElse(null);

		if (leaveRequest != null) {

			Employee employee = leaveRequest.getEmployee();

			if (employee != null && employee.getRemainingLeave() != null) {

				long days = ChronoUnit.DAYS.between(leaveRequest.getStartDate(), leaveRequest.getEndDate()) + 1;

				int remaining = employee.getRemainingLeave();

				if (remaining >= days) {
					employee.setRemainingLeave(remaining - (int) days);
					leaveRequest.setStatus("APPROVED");
				} else {
					leaveRequest.setStatus("REJECTED");
				}
			}
			return leaveRequestRepository.save(leaveRequest);
		}

		return null;
	}

	// reject leave
	public LeaveRequest rejectLeave(Long leaveId) {

		LeaveRequest leaveRequest = leaveRequestRepository.findById(leaveId).orElse(null);

		if (leaveRequest != null) {
			leaveRequest.setStatus("REJECTED");
			return leaveRequestRepository.save(leaveRequest);
		}

		return null;
	}

	// get all leave
	public List<LeaveResponseDTO> getAllLeaves() {

		List<LeaveRequest> leaves = leaveRequestRepository.findAll();
		List<LeaveResponseDTO> response = new ArrayList<>();

		for (LeaveRequest leave : leaves) {
			response.add(mapToDTO(leave));
		}

		return response;
	}

	// helper method
	private LeaveResponseDTO mapToDTO(LeaveRequest leaveRequest) {

		LeaveResponseDTO dto = new LeaveResponseDTO();

		dto.setLeaveId(leaveRequest.getId());
		dto.setStartDate(leaveRequest.getStartDate());
		dto.setEndDate(leaveRequest.getEndDate());
		dto.setStatus(leaveRequest.getStatus());
		dto.setReason(leaveRequest.getReason());

		if (leaveRequest.getEmployee() != null) {
			dto.setEmployeeId(leaveRequest.getEmployee().getId());
			dto.setEmployeeName(leaveRequest.getEmployee().getName());
		}

		return dto;
	}

}
