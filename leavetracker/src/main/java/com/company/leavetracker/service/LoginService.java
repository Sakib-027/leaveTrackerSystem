package com.company.leavetracker.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.leavetracker.entity.Employee;
import com.company.leavetracker.repository.EmployeeRepository;

@Service
public class LoginService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee validateLogin(String email, String password) {

        Optional<Employee> optionalEmployee =
                employeeRepository.findByEmail(email);

        if (optionalEmployee.isEmpty()) {
            return null;
        }

        Employee employee = optionalEmployee.get();

        if (!employee.getPassword().equals(password)) {
            return null;
        }

        return employee;
    }
}
