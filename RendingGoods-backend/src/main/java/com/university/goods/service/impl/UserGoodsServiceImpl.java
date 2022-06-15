package com.university.goods.service.impl;

import com.university.goods.model.UserGoods;
import com.university.goods.repository.UserGoodsRepository;
import com.university.goods.service.UserGoodsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserGoodsServiceImpl implements UserGoodsService {
    private final UserGoodsRepository userGoodsRepository;

    public UserGoodsServiceImpl(UserGoodsRepository userGoodsRepository) {
        this.userGoodsRepository = userGoodsRepository;
    }

    @Override
    public boolean save(UserGoods userGoods) {
        return userGoodsRepository.save(userGoods) > 0;
    }

    @Override
    public boolean setRequestStatusTrue(long goodsId) {
        return userGoodsRepository.setRequestStatusTrue(goodsId) > 0;
    }

    @Override
    public List<UserGoods> getAll() {
        return userGoodsRepository.getAll();
    }

    @Override
    public Integer getMonths(long goodsId) {
        return userGoodsRepository.getMonths(goodsId);
    }
}
