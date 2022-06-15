package com.university.goods.controller;

import com.university.goods.dto.IdDTO;
import com.university.goods.model.GoodsCategory;
import com.university.goods.service.GoodsCategoryService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SecurityRequirement(name = "Basic")
@RestController
public class GoodsCategoryController {
    private final GoodsCategoryService goodsCategoryService;

    public GoodsCategoryController(GoodsCategoryService goodsCategoryService) {
        this.goodsCategoryService = goodsCategoryService;
    }

    @PostMapping("createGoodsCategory")
    public ResponseEntity<Void> create(@RequestBody GoodsCategory goodsCategory) {
        return goodsCategoryService.create(goodsCategory) ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @DeleteMapping("deleteGoodsCategory")
    public ResponseEntity<Void> delete(@RequestBody IdDTO idDTO) {
        return goodsCategoryService.delete(idDTO.getId()) ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @GetMapping("goodsCategories")
    public ResponseEntity<List<GoodsCategory>> getAll() {
        return ResponseEntity.ok(goodsCategoryService.getAll());
    }
}
