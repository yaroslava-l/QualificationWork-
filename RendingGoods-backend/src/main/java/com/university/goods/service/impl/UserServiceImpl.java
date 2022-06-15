package com.university.goods.service.impl;

import com.university.goods.model.UserBasicInfo;
import com.university.goods.model.UserFullInfo;
import com.university.goods.repository.UserRepository;
import com.university.goods.service.UserService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public UserFullInfo register(UserBasicInfo userBasicInfo) {
        String password = userBasicInfo.getPassword();
        Optional<UserBasicInfo> userBasicInfoOptional = userRepository.findNotBlocked(userBasicInfo.getName());
        if (password == null || userBasicInfoOptional.isPresent()) {
            throw new IllegalArgumentException("Wrong input");
        }
        userBasicInfo.setPassword(passwordEncoder.encode(password));
        return userRepository.saveAndGetFullInfo(userBasicInfo);
    }

    @Override
    public boolean isAuthenticated(String username, String password) throws UsernameNotFoundException {
        Optional<UserBasicInfo> userBasicInfoOptional = userRepository.findNotBlocked(username);
        return userBasicInfoOptional.filter(userBasicInfo ->
                passwordEncoder.matches(password, userBasicInfo.getPassword())).isPresent();
    }

    @Override
    public boolean update(UserFullInfo userFullInfo) {
        return userRepository.update(userFullInfo) > 0;
    }

    @Override
    public boolean block(long id) {
        return userRepository.setBlockedStatus(id, true) > 0;
    }

    @Override
    public boolean unblock(long id) {
        return userRepository.setBlockedStatus(id, false) > 0;
    }

    @Override
    public List<UserFullInfo> getAll() {
        return userRepository.getAll();
    }
}
