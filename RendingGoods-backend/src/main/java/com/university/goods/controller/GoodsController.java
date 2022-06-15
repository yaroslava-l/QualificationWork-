package com.university.goods.controller;

import com.university.goods.dto.IdDTO;
import com.university.goods.model.Goods;
import com.university.goods.dto.GoodsRatingDTO;
import com.university.goods.service.GoodsService;
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
public class GoodsController {
    private final GoodsService goodsService;

    public GoodsController(GoodsService goodsService) {
        this.goodsService = goodsService;
    }

    @PostMapping("createGoodsItem")
    public ResponseEntity<Void> create(@RequestBody Goods goods) {
        return goodsService.save(goods) ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @PostMapping("buyGoods")
    public ResponseEntity<Void> buy(@RequestBody IdDTO idDTO) {
        return goodsService.buy(idDTO.getId()) ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @PostMapping("editRating")
    public ResponseEntity<Void> editRating(@RequestBody GoodsRatingDTO goodsRatingDTO) {
        return goodsService.editRating(goodsRatingDTO) ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @PostMapping("goodsView")
    public ResponseEntity<Void> markAsViewed(@RequestBody IdDTO idDTO) {
        return goodsService.markAsViewed(idDTO.getId()) ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @PostMapping("blockGoods")
    public ResponseEntity<Void> block(@RequestBody IdDTO idDTO) {
        return goodsService.block(idDTO.getId()) ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @PostMapping("unBlockGoods")
    public ResponseEntity<Void> unblock(@RequestBody IdDTO idDTO) {
        return goodsService.unblock(idDTO.getId()) ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @GetMapping("goods")
    public ResponseEntity<List<Goods>> getAll() {
        return ResponseEntity.ok(goodsService.getAll());
    }

    @DeleteMapping("deleteGoods")
    public ResponseEntity<Void> delete(@RequestBody IdDTO idDTO) {
        return goodsService.delete(idDTO.getId())  ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }
}
