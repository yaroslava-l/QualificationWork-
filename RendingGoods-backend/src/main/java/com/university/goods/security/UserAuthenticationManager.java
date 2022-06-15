package com.university.goods.security;

import com.university.goods.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Component
public class UserAuthenticationManager implements AuthenticationManager {
    private final UserService userService;

    public UserAuthenticationManager(UserService userService) {
        this.userService = userService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String userName = authentication.getPrincipal().toString();
        String password = authentication.getCredentials().toString();
        if (userService.isAuthenticated(userName, password)) {
            return new UsernamePasswordAuthenticationToken(userName, password);
        }
        throw new BadCredentialsException(String.format("Bad credentials for user %s", userName));
    }
}
