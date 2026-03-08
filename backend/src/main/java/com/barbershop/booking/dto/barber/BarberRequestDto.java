package com.barbershop.booking.dto.barber;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class BarberRequestDto {

    @NotBlank
    @Size(max = 100)
    private String name;

    @Min(0)
    private Integer experience;

    @Size(max = 1024)
    private String photoUrl;
}

