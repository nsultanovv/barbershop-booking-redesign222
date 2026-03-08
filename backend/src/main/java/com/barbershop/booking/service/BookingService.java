package com.barbershop.booking.service;

import com.barbershop.booking.dto.booking.BookingRequestDto;
import com.barbershop.booking.dto.booking.BookingResponseDto;
import com.barbershop.booking.model.*;
import com.barbershop.booking.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.EnumSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class BookingService {

    private static final Set<BookingStatus> ACTIVE_STATUSES =
            EnumSet.of(BookingStatus.PENDING, BookingStatus.CONFIRMED);

    private final BookingRepository bookingRepository;
    private final UserService userService;
    private final BarberService barberService;
    private final ServiceService serviceService;

    @Transactional
    public BookingResponseDto createBooking(BookingRequestDto dto) {
        LocalDate date = dto.getBookingDate();
        LocalTime time = dto.toLocalTime();

        boolean exists = bookingRepository.existsByBarberIdAndBookingDateAndBookingTimeAndStatusIn(
                dto.getBarberId(),
                date,
                time,
                ACTIVE_STATUSES
        );
        if (exists) {
            throw new IllegalStateException("Selected time is already booked for this barber.");
        }

        User user = userService.findOrCreateUser(dto.getUserName(), dto.getUserPhone());
        Barber barber = barberService.getById(dto.getBarberId());
        ServiceEntity service = serviceService.getById(dto.getServiceId());

        Booking booking = Booking.builder()
                .user(user)
                .barber(barber)
                .service(service)
                .bookingDate(date)
                .bookingTime(time)
                .status(BookingStatus.CONFIRMED)
                .build();

        Booking saved = bookingRepository.save(booking);
        return toResponseDto(saved);
    }

    @Transactional(readOnly = true)
    public List<BookingResponseDto> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::toResponseDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<BookingResponseDto> getBookingsByDate(LocalDate date) {
        return bookingRepository.findByBookingDateOrderByBookingTimeAsc(date).stream()
                .map(this::toResponseDto)
                .toList();
    }

    @Transactional
    public void cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found with id " + id));
        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }

    private BookingResponseDto toResponseDto(Booking booking) {
        return BookingResponseDto.builder()
                .id(booking.getId())
                .userName(booking.getUser().getName())
                .userPhone(booking.getUser().getPhone())
                .barberId(booking.getBarber().getId())
                .barberName(booking.getBarber().getName())
                .serviceId(booking.getService().getId())
                .serviceName(booking.getService().getName())
                .bookingDate(booking.getBookingDate())
                .bookingTime(booking.getBookingTime())
                .status(booking.getStatus())
                .build();
    }
}

