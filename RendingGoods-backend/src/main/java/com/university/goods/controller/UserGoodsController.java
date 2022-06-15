package com.university.goods.controller;

import com.university.goods.model.UserGoods;
import com.university.goods.service.UserGoodsService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SecurityRequirement(name = "Basic")
@RestController
public class UserGoodsController {
    private final UserGoodsService userGoodsService;

    public UserGoodsController(UserGoodsService userGoodsService) {
        this.userGoodsService = userGoodsService;
    }

    @PostMapping("buy")
    public ResponseEntity<Void> save(@RequestBody UserGoods userGoods) {
        return userGoodsService.save(userGoods) ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @GetMapping("buyList")
    public ResponseEntity<List<UserGoods>> getAll() {
        return ResponseEntity.ok(userGoodsService.getAll());
    }
}
