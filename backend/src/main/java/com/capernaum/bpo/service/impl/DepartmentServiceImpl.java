package com.capernaum.bpo.service.impl;

import com.capernaum.bpo.dto.DepartmentDTO;
import com.capernaum.bpo.entity.Department;
import com.capernaum.bpo.repository.DepartmentRepository;
import com.capernaum.bpo.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Override
    public List<DepartmentDTO> getAllDepartments() {
        return departmentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DepartmentDTO getDepartmentById(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));
        return convertToDTO(department);
    }

    @Override
    public DepartmentDTO createDepartment(DepartmentDTO dto) {
        Department department = convertToEntity(dto);
        if (department.getCode() == null || department.getCode().isEmpty()) {
            department.setCode("DEPT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        return convertToDTO(departmentRepository.save(department));
    }

    @Override
    public DepartmentDTO updateDepartment(Long id, DepartmentDTO dto) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));
        
        department.setName(dto.getName());
        department.setHead(dto.getHead());
        department.setStaffCount(dto.getStaffCount() != null ? dto.getStaffCount() : 0);
        department.setBudget(dto.getBudget());
        department.setStatus(dto.getStatus());
        
        return convertToDTO(departmentRepository.save(department));
    }

    @Override
    public void deleteDepartment(Long id) {
        if (!departmentRepository.existsById(id)) {
            throw new RuntimeException("Department not found with id: " + id);
        }
        departmentRepository.deleteById(id);
    }

    private DepartmentDTO convertToDTO(Department department) {
        return DepartmentDTO.builder()
                .id(department.getId())
                .code(department.getCode())
                .name(department.getName())
                .head(department.getHead())
                .staffCount(department.getStaffCount())
                .budget(department.getBudget())
                .status(department.getStatus())
                .build();
    }

    private Department convertToEntity(DepartmentDTO dto) {
        return Department.builder()
                .id(dto.getId())
                .code(dto.getCode())
                .name(dto.getName())
                .head(dto.getHead())
                .staffCount(dto.getStaffCount() != null ? dto.getStaffCount() : 0)
                .budget(dto.getBudget())
                .status(dto.getStatus())
                .build();
    }
}
