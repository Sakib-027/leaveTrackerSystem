package com.company.leavetracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.company.leavetracker.dto.LeaveResponseDTO;
import com.company.leavetracker.entity.LeaveRequest;
import com.company.leavetracker.service.LeaveRequestService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/leaves")
public class LeaveRequestController {

	@Autowired
	private LeaveRequestService leaveRequestService;

	// Apply for leave
	@PostMapping
	public LeaveRequest applyLeave(@RequestBody LeaveRequest leaveRequest) {
		return leaveRequestService.applyLeave(leaveRequest);
	}

	// Get leaves of an employee
	@GetMapping("/employee/{employeeId}")
	public List<LeaveResponseDTO> getLeavesByEmployee(@PathVariable Long employeeId) {
		return leaveRequestService.getLeavesByEmployee(employeeId);
	}
 
	// Approve leave
	@PutMapping("/{leaveId}/approve")
	public LeaveRequest approveLeave(@PathVariable Long leaveId) {
		return leaveRequestService.approveLeave(leaveId);
	}

	// Reject leave
	@PutMapping("/{leaveId}/reject")
	public LeaveRequest rejectLeave(@PathVariable Long leaveId) {
		return leaveRequestService.rejectLeave(leaveId);
	}
 
	// get all leave
	@GetMapping
	public List<LeaveResponseDTO> getAllLeaves() {
		return leaveRequestService.getAllLeaves();
	}

}
