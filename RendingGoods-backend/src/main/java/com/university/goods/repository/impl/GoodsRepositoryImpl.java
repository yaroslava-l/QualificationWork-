package com.university.goods.repository.impl;

import com.university.goods.model.Goods;
import com.university.goods.repository.GoodsRepository;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;

@Repository
public class GoodsRepositoryImpl implements GoodsRepository {
    private static final String CREATE_TABLE_QUERY = "create table if not exists goods(id bigserial not null, name varchar not null, " +
            "img varchar not null, description varchar not null, cost double precision not null, creator_id bigserial not null, category_id bigserial not null," +
            " views integer, rating integer, blocked boolean, bought boolean);";
    private static final String CREATE_UNIQ_INDEX_QUERY = "create unique index if not exists goods_id_uindex on goods (id);";
    private static final String INSERT_QUERY = "insert into goods (name, img, description, cost, creator_id, category_id, " +
            "views, rating, blocked, bought) values(?,?,?,?,?,?,?,?,?,?)";
    private static final String SET_BOUGHT_TRUE_QUERY = "update goods set bought=true where id=?";
    private static final String FIND_RATING_QUERY = "select rating from goods where id=? limit 1";
    private static final String UPDATE_RATING_QUERY = "update goods set rating=? where id=?";
    private static final String UPDATE_VIEW_COUNTER_QUERY = "update goods set views=views+1 where id=?";
    private static final String UPDATE_BLOCKED_STATUS_QUERY = "update goods set blocked=? where id=?";
    private static final String DELETE_QUERY = "delete from goods where id=?";
    private static final String COUNT_GOODS_IN_CATEGORY = "select count(*) from goods where category_id=?";
    private static final String SELECT_ALL = "select id, name, img, description, cost, creator_id, " +
            "category_id, views, rating, blocked, bought from goods";
    private final JdbcTemplate jdbcTemplate;

    public GoodsRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostConstruct
    public void createTableIfNotExists() {
        jdbcTemplate.execute(CREATE_TABLE_QUERY);
        jdbcTemplate.execute(CREATE_UNIQ_INDEX_QUERY);
    }

    @Override
    public int save(Goods goods) {
        return jdbcTemplate.update(INSERT_QUERY, goods.getName(), goods.getImg(),
                goods.getDescription(), goods.getCost(), goods.getCreatorId(), goods.getCategoryId(),
                0, 0, false, false);
    }

    @Override
    public int setBoughtTrue(long id) {
        return jdbcTemplate.update(SET_BOUGHT_TRUE_QUERY, id);
    }

    @Override
    public List<Goods> getAll() {
        return jdbcTemplate.query(SELECT_ALL, new BeanPropertyRowMapper<>(Goods.class));
    }

    @Override
    public Optional<Integer> findRatingById(long id) {
        try {
            return Optional.ofNullable(
                    jdbcTemplate.queryForObject(FIND_RATING_QUERY, Integer.class, id));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    @Override
    public int updateRating(long id, int newRating) {
        return jdbcTemplate.update(UPDATE_RATING_QUERY, newRating, id);
    }

    @Override
    public int markAsViewed(long id) {
        return jdbcTemplate.update(UPDATE_VIEW_COUNTER_QUERY, id);
    }

    @Override
    public int setBlockedStatus(long id, boolean status) {
        return jdbcTemplate.update(UPDATE_BLOCKED_STATUS_QUERY, status, id);
    }

    @Override
    public int delete(long id) {
        return jdbcTemplate.update(DELETE_QUERY, id);
    }

    @Override
    public Integer countGoodsInCategory(long categoryId) {
        return jdbcTemplate.queryForObject(COUNT_GOODS_IN_CATEGORY, Integer.class, categoryId);
    }
}
