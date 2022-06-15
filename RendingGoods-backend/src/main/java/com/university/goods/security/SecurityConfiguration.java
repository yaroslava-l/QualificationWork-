package com.university.goods.security;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.http.HttpStatus.FORBIDDEN;

@Configuration
@SecurityScheme(
        name = "Basic", scheme = "basic",
        type = SecuritySchemeType.HTTP, in = SecuritySchemeIn.HEADER)
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http,
                                           UserAuthenticationManager userAuthenticationManager) throws Exception {
        return http.cors()
                .and()
                .csrf()
                .disable()
                .authorizeRequests()
                .antMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html",
                        "/login", "/registration").permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationManager(userAuthenticationManager)
                .exceptionHandling()
                .authenticationEntryPoint((request, response, authException) -> response.setStatus(FORBIDDEN.value()))
                .and()
                .build();
    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }
}
