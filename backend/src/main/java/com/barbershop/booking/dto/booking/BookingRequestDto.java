package com.barbershop.booking.dto.booking;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class BookingRequestDto {

    @NotBlank
    @Size(max = 100)
    private String userName;

    @NotBlank
    @Size(max = 20)
    private String userPhone;

    @NotNull
    @Min(1)
    private Long barberId;

    @NotNull
    @Min(1)
    private Long serviceId;

    @NotNull
    @FutureOrPresent
    private LocalDate bookingDate;

    /**
     * Time in HH:mm format (e.g. 14:30).
     */
    @NotBlank
    @Pattern(regexp = "^\\d{2}:\\d{2}$")
    private String bookingTime;

    public LocalTime toLocalTime() {
        return LocalTime.parse(bookingTime);
    }
}

