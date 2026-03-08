package com.barbershop.booking.controller;

import com.barbershop.booking.dto.booking.BookingRequestDto;
import com.barbershop.booking.dto.booking.BookingResponseDto;
import com.barbershop.booking.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@CrossOrigin
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookingResponseDto createBooking(@Valid @RequestBody BookingRequestDto dto) {
        return bookingService.createBooking(dto);
    }

    @GetMapping
    public List<BookingResponseDto> getBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/date/{date}")
    public List<BookingResponseDto> getBookingsByDate(
            @PathVariable
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date
    ) {
        return bookingService.getBookingsByDate(date);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
    }
}

