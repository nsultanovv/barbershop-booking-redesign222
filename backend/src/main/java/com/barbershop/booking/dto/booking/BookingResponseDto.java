package com.barbershop.booking.dto.booking;

import com.barbershop.booking.model.BookingStatus;
import lombok.Builder;
import lombok.Value;

import java.time.LocalDate;
import java.time.LocalTime;

@Value
@Builder
public class BookingResponseDto {

    Long id;
    String userName;
    String userPhone;
    Long barberId;
    String barberName;
    Long serviceId;
    String serviceName;
    LocalDate bookingDate;
    LocalTime bookingTime;
    BookingStatus status;
}

