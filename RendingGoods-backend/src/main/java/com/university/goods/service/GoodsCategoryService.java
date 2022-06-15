package com.university.goods.service;

import com.university.goods.model.GoodsCategory;

import java.util.List;

public interface GoodsCategoryService {
    boolean create(GoodsCategory goodsCategory);

    boolean delete(long id);

    List<GoodsCategory> getAll();
}
