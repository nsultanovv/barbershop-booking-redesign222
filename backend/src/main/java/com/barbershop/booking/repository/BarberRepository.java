package com.barbershop.booking.repository;

import com.barbershop.booking.model.Barber;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BarberRepository extends JpaRepository<Barber, Long> {
}

