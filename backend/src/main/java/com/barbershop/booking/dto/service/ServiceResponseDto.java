package com.barbershop.booking.dto.service;

import lombok.Builder;
import lombok.Value;

import java.math.BigDecimal;

@Value
@Builder
public class ServiceResponseDto {

    Long id;
    String name;
    BigDecimal price;
    Integer durationMinutes;
}

