package com.barbershop.booking.controller;

import com.barbershop.booking.dto.barber.BarberRequestDto;
import com.barbershop.booking.dto.barber.BarberResponseDto;
import com.barbershop.booking.service.BarberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/barbers")
@RequiredArgsConstructor
@CrossOrigin
public class BarberController {

    private final BarberService barberService;

    @GetMapping
    public List<BarberResponseDto> getBarbers() {
        return barberService.getAllBarbers();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BarberResponseDto createBarber(@Valid @RequestBody BarberRequestDto dto) {
        return barberService.createBarber(dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBarber(@PathVariable Long id) {
        barberService.deleteBarber(id);
    }
}

