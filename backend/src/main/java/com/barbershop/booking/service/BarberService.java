package com.barbershop.booking.service;

import com.barbershop.booking.dto.barber.BarberRequestDto;
import com.barbershop.booking.dto.barber.BarberResponseDto;
import com.barbershop.booking.model.Barber;
import com.barbershop.booking.repository.BarberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BarberService {

    private final BarberRepository barberRepository;

    @Transactional(readOnly = true)
    public List<BarberResponseDto> getAllBarbers() {
        return barberRepository.findAll().stream()
                .map(this::toResponseDto)
                .toList();
    }

    @Transactional
    public BarberResponseDto createBarber(BarberRequestDto dto) {
        Barber barber = Barber.builder()
                .name(dto.getName())
                .experience(dto.getExperience())
                .photoUrl(dto.getPhotoUrl())
                .build();
        Barber saved = barberRepository.save(barber);
        return toResponseDto(saved);
    }

    @Transactional
    public void deleteBarber(Long id) {
        if (!barberRepository.existsById(id)) {
            throw new IllegalArgumentException("Barber not found with id " + id);
        }
        barberRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Barber getById(Long id) {
        return barberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Barber not found with id " + id));
    }

    private BarberResponseDto toResponseDto(Barber barber) {
        return BarberResponseDto.builder()
                .id(barber.getId())
                .name(barber.getName())
                .experience(barber.getExperience())
                .photoUrl(barber.getPhotoUrl())
                .build();
    }
}

