package com.university.goods.repository.impl;

import com.university.goods.model.UserGoods;
import com.university.goods.repository.UserGoodsRepository;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
public class UserGoodsRepositoryImpl implements UserGoodsRepository {
    private static final String CREATE_TABLE_QUERY = "create table if not exists user_goods(id bigserial not null, buyerUserId bigserial not null, " +
            "sellUserId bigserial not null, goodsItemId bigserial not null, requestStatus boolean, months integer not null)";
    private static final String CREATE_UNIQ_INDEX_QUERY = "create unique index if not exists user_goods_id_uindex on user_goods (id);";
    private static final String SELECT_ALL_QUERY = "select id, buyerUserId, sellUserId, goodsItemId, requestStatus, months from user_goods";
    private static final String SET_REQUEST_STATUS_TRUE_QUERY = "update user_goods set requestStatus=true where goodsItemId=?";
    private static final String GET_MONTHS_QUERY = "select months from user_goods where goodsItemId=? limit 1";
    private static final String INSERT_QUERY = "insert into user_goods (buyerUserId, sellUserId, goodsItemId, requestStatus, months) " +
            "values (?,?,?,?,?)";
    private final JdbcTemplate jdbcTemplate;

    public UserGoodsRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostConstruct
    public void createTableIfNotExists() {
        jdbcTemplate.execute(CREATE_TABLE_QUERY);
        jdbcTemplate.execute(CREATE_UNIQ_INDEX_QUERY);
    }

    @Override
    public int save(UserGoods userGoods) {
        return jdbcTemplate.update(INSERT_QUERY, userGoods.getBuyerUserId(), userGoods.getSellUserId(),
                userGoods.getGoodsItemId(), userGoods.isRequestStatus(), userGoods.getMonths());
    }

    @Override
    public List<UserGoods> getAll() {
        return jdbcTemplate.query(SELECT_ALL_QUERY, new BeanPropertyRowMapper<>(UserGoods.class));
    }

    @Override
    public int setRequestStatusTrue(long goodsId) {
        return jdbcTemplate.update(SET_REQUEST_STATUS_TRUE_QUERY, goodsId);
    }

    @Override
    public Integer getMonths(long goodsId) {
        try {
            return jdbcTemplate.queryForObject(GET_MONTHS_QUERY, Integer.class, goodsId);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
}
