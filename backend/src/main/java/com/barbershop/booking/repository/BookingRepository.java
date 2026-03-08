package com.barbershop.booking.repository;

import com.barbershop.booking.model.Booking;
import com.barbershop.booking.model.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByBookingDate(LocalDate bookingDate);

    List<Booking> findByBookingDateOrderByBookingTimeAsc(LocalDate bookingDate);

    boolean existsByBarberIdAndBookingDateAndBookingTimeAndStatusIn(
            Long barberId,
            LocalDate bookingDate,
            LocalTime bookingTime,
            Set<BookingStatus> statuses
    );
}

