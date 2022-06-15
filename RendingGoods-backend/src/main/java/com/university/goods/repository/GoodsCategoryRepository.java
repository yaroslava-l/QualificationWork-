package com.university.goods.repository;

import com.university.goods.model.GoodsCategory;

import java.util.List;

public interface GoodsCategoryRepository {
    int create(GoodsCategory goodsCategory);

    int delete(long id);

    List<GoodsCategory> getAll();
}
