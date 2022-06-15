package com.university.goods.service.impl;

import com.university.goods.model.Goods;
import com.university.goods.dto.GoodsRatingDTO;
import com.university.goods.repository.GoodsRepository;
import com.university.goods.service.GoodsService;
import com.university.goods.service.UserGoodsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GoodsServiceImpl implements GoodsService {
    private final Logger logger = LoggerFactory.getLogger(GoodsCategoryServiceImpl.class);
    private final GoodsRepository goodsRepository;
    private final UserGoodsService userGoodsService;

    public GoodsServiceImpl(GoodsRepository goodsRepository, UserGoodsService userGoodsService) {
        this.goodsRepository = goodsRepository;
        this.userGoodsService = userGoodsService;
    }

    @Override
    public boolean save(Goods goods) {
        return goodsRepository.save(goods) > 0;
    }

    @Override
    public boolean buy(long id) {
        return goodsRepository.setBoughtTrue(id) > 0 && userGoodsService.setRequestStatusTrue(id);
    }

    @Override
    public List<Goods> getAll() {
        return goodsRepository.getAll()
                .stream()
                .map(this::setMonthValueIfBought)
                .collect(Collectors.toList());
    }

    @Override
    public boolean editRating(GoodsRatingDTO goodsRatingDTO) {
        Optional<Integer> ratingOptional = goodsRepository.findRatingById(goodsRatingDTO.getId());
        if (ratingOptional.isPresent()) {
            int newRating = getNewRatingValue(ratingOptional.get(), goodsRatingDTO.isLiked());
            return goodsRepository.updateRating(goodsRatingDTO.getId(), newRating) > 0;
        }
        return false;
    }

    @Override
    public boolean markAsViewed(long id) {
        return goodsRepository.markAsViewed(id) > 0;
    }

    @Override
    public boolean block(long id) {
        return goodsRepository.setBlockedStatus(id, true) > 0;
    }

    @Override
    public boolean unblock(long id) {
        return goodsRepository.setBlockedStatus(id, false) > 0;
    }

    @Override
    public boolean delete(long id) {
        return goodsRepository.delete(id) > 0;
    }

    @Override
    public boolean goodsExistsInCategory(long categoryId) {
        Integer counter = goodsRepository.countGoodsInCategory(categoryId);
        logger.info("Found goods {} for category {}", counter, categoryId);
        return counter != null && counter > 0;
    }

    private Goods setMonthValueIfBought(Goods goods) {
        if (goods.isBought()) {
            goods.setMonths(userGoodsService.getMonths(goods.getId()));
        }
        return goods;
    }

    private int getNewRatingValue(int rating, boolean liked) {
        return liked ? ++rating : --rating;
    }
}
