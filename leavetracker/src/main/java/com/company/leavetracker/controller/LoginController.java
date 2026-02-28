package com.company.leavetracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.company.leavetracker.dto.LoginRequest;
import com.company.leavetracker.dto.LoginResponse;
import com.company.leavetracker.entity.Employee;
import com.company.leavetracker.service.LoginService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Employee employee = loginService.validateLogin(
                request.getEmail(),
                request.getPassword()
        );

        if (employee == null) {
            return ResponseEntity
                    .badRequest()
                    .body("Invalid email or password");
        }

        LoginResponse response = new LoginResponse(
                employee.getId(),
                employee.getName(),
                employee.getRole()
        );

        return ResponseEntity.ok(response);
    }

}
