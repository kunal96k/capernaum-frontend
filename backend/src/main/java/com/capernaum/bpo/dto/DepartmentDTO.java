package com.capernaum.bpo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentDTO {
    private Long id;
    
    private String code;

    @NotBlank(message = "Department name is required")
    private String name;

    @NotBlank(message = "Department head is required")
    private String head;

    @PositiveOrZero(message = "Staff count cannot be negative")
    private Integer staffCount;

    @PositiveOrZero(message = "Budget cannot be negative")
    private Double budget;

    @NotBlank(message = "Status is required")
    private String status;
}
