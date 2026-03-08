package com.barbershop.booking.service;

import com.barbershop.booking.dto.service.ServiceRequestDto;
import com.barbershop.booking.dto.service.ServiceResponseDto;
import com.barbershop.booking.model.ServiceEntity;
import com.barbershop.booking.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceService {

    private final ServiceRepository serviceRepository;

    @Transactional(readOnly = true)
    public List<ServiceResponseDto> getAllServices() {
        return serviceRepository.findAll().stream()
                .map(this::toResponseDto)
                .toList();
    }

    @Transactional
    public ServiceResponseDto createService(ServiceRequestDto dto) {
        ServiceEntity service = ServiceEntity.builder()
                .name(dto.getName())
                .price(dto.getPrice())
                .durationMinutes(dto.getDurationMinutes())
                .build();
        ServiceEntity saved = serviceRepository.save(service);
        return toResponseDto(saved);
    }

    @Transactional(readOnly = true)
    public ServiceEntity getById(Long id) {
        return serviceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Service not found with id " + id));
    }

    private ServiceResponseDto toResponseDto(ServiceEntity service) {
        return ServiceResponseDto.builder()
            .id(service.getId())
            .name(service.getName())
            .price(service.getPrice())
            .durationMinutes(service.getDurationMinutes())
            .build();
    }
}

