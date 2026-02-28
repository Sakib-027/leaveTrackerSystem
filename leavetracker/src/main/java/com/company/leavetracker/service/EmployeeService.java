package com.company.leavetracker.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.leavetracker.entity.Employee;
import com.company.leavetracker.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Create / Save Employee
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Get All Employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get Employee by ID
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }
    
    // update employee
    public Employee updateEmployee(Long id, Employee updatedEmployee) {

        Optional<Employee> optional = employeeRepository.findById(id);

        if (optional.isPresent()) {
            Employee employee = optional.get();
            employee.setName(updatedEmployee.getName());
            employee.setEmail(updatedEmployee.getEmail());
            employee.setRole(updatedEmployee.getRole());
            employee.setTotalLeave(updatedEmployee.getTotalLeave());
            employee.setRemainingLeave(updatedEmployee.getRemainingLeave());
            employee.setPassword(updatedEmployee.getPassword());

            return employeeRepository.save(employee);
        } else {
            return null;
        }
    }
    
    // delete employee
    public boolean deleteEmployee(Long id) {

        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
            return true;
        }
        return false;
    }


}
