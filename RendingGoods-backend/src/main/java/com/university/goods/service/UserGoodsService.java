package com.university.goods.service;

import com.university.goods.model.UserGoods;

import java.util.List;

public interface UserGoodsService {
    boolean save(UserGoods userGoods);

    boolean setRequestStatusTrue(long goodsId);

    List<UserGoods> getAll();

    Integer getMonths(long goodsId);
}
