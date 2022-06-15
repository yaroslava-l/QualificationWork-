package com.university.goods.service.impl;

import com.university.goods.model.GoodsCategory;
import com.university.goods.repository.GoodsCategoryRepository;
import com.university.goods.service.GoodsCategoryService;
import com.university.goods.service.GoodsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoodsCategoryServiceImpl implements GoodsCategoryService {

    private final GoodsCategoryRepository goodsCategoryRepository;
    private final GoodsService goodsService;

    public GoodsCategoryServiceImpl(GoodsCategoryRepository goodsCategoryRepository,
                                    GoodsService goodsService) {
        this.goodsCategoryRepository = goodsCategoryRepository;
        this.goodsService = goodsService;
    }

    @Override
    public boolean create(GoodsCategory goodsCategory) {
        return goodsCategoryRepository.create(goodsCategory) > 0;
    }

    @Override
    public boolean delete(long id) {
        if (goodsService.goodsExistsInCategory(id)) {
            return false;
        }
        return goodsCategoryRepository.delete(id) > 0;
    }

    @Override
    public List<GoodsCategory> getAll() {
        return goodsCategoryRepository.getAll();
    }
}
