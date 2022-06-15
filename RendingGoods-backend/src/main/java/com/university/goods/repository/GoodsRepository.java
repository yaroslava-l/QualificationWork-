package com.university.goods.repository;

import com.university.goods.model.Goods;

import java.util.List;
import java.util.Optional;

public interface GoodsRepository {
    int save(Goods goods);

    int setBoughtTrue(long id);

    List<Goods> getAll();

    Optional<Integer> findRatingById(long id);

    int updateRating(long id, int newRating);

    int markAsViewed(long id);

    int setBlockedStatus(long id, boolean status);

    int delete(long id);

    Integer countGoodsInCategory(long categoryId);
}
