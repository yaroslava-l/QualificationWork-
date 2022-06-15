package com.university.goods.repository;

import com.university.goods.model.UserGoods;

import java.util.List;

public interface UserGoodsRepository {
    int save(UserGoods userGoods);

    List<UserGoods> getAll();

    int setRequestStatusTrue(long goodsId);

    Integer getMonths(long goodsId);
}
