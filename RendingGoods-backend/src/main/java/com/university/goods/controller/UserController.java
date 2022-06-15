package com.university.goods.controller;

import com.university.goods.dto.IdDTO;
import com.university.goods.model.UserBasicInfo;
import com.university.goods.model.UserFullInfo;
import com.university.goods.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@RestController
public class UserController {
    private static Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("registration")
    public ResponseEntity<UserFullInfo> register(@RequestBody UserBasicInfo userBasicInfo) {
        try {
            return ResponseEntity.ok(userService.register(userBasicInfo));
        } catch (IllegalArgumentException e) {
            logger.error("An error occurred during user registration", e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("login")
    public ResponseEntity<Void> login(@RequestBody UserBasicInfo userBasicInfo) {
        return userService.isAuthenticated(userBasicInfo.getName(), userBasicInfo.getPassword()) ?
                ResponseEntity.ok().build() : ResponseEntity.status(UNAUTHORIZED.value()).build();
    }

    @SecurityRequirement(name = "Basic") //Swagger annotation
    @PostMapping("blockUser")
    public ResponseEntity<Void> block(@RequestBody IdDTO idDTO) {
        return userService.block(idDTO.getId()) ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @SecurityRequirement(name = "Basic")
    @PostMapping("unBlockUser")
    public ResponseEntity<Void> unblock(@RequestBody IdDTO idDTO) {
        return userService.unblock(idDTO.getId()) ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @SecurityRequirement(name = "Basic")
    @PostMapping("editUserSettings")
    public ResponseEntity<Void> update(@RequestBody UserFullInfo userFullInfo) {
        return userService.update(userFullInfo) ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @SecurityRequirement(name = "Basic")
    @GetMapping("users")
    public ResponseEntity<List<UserFullInfo>> getAll() {
        return ResponseEntity.ok(userService.getAll());
    }

}
