package com.barbershop.booking.dto.service;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ServiceRequestDto {

    @NotBlank
    @Size(max = 100)
    private String name;

    @NotNull
    @Min(0)
    private BigDecimal price;

    @NotNull
    @Min(1)
    private Integer durationMinutes;
}

