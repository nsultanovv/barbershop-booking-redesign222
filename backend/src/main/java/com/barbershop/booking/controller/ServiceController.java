package com.barbershop.booking.controller;

import com.barbershop.booking.dto.service.ServiceRequestDto;
import com.barbershop.booking.dto.service.ServiceResponseDto;
import com.barbershop.booking.service.ServiceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
@CrossOrigin
public class ServiceController {

    private final ServiceService serviceService;

    @GetMapping
    public List<ServiceResponseDto> getServices() {
        return serviceService.getAllServices();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServiceResponseDto createService(@Valid @RequestBody ServiceRequestDto dto) {
        return serviceService.createService(dto);
    }
}

