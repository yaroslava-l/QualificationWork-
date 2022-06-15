package com.university.goods.service;

import com.university.goods.model.Goods;
import com.university.goods.dto.GoodsRatingDTO;

import java.util.List;

public interface GoodsService {
    boolean save(Goods goods);

    boolean buy(long id);

    List<Goods> getAll();

    boolean editRating(GoodsRatingDTO goodsRatingDTO);

    boolean markAsViewed(long id);

    boolean block(long id);

    boolean unblock(long id);

    boolean delete(long id);

    boolean goodsExistsInCategory(long categoryId);
}
