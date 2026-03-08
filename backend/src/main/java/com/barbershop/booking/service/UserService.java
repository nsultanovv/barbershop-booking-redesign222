package com.barbershop.booking.service;

import com.barbershop.booking.model.User;
import com.barbershop.booking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public User findOrCreateUser(String name, String phone) {
        return userRepository.findByPhone(phone)
                .orElseGet(() -> {
                    User user = new User();
                    user.setName(name);
                    user.setPhone(phone);
                    return userRepository.save(user);
                });
    }
}

