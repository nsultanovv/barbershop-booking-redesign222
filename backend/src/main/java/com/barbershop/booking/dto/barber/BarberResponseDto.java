package com.barbershop.booking.dto.barber;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class BarberResponseDto {

    Long id;
    String name;
    Integer experience;
    String photoUrl;
}

