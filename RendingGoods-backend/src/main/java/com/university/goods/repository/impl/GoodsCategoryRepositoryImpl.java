package com.university.goods.repository.impl;

import com.university.goods.model.GoodsCategory;
import com.university.goods.repository.GoodsCategoryRepository;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.List;

@Repository
public class GoodsCategoryRepositoryImpl implements GoodsCategoryRepository {
    private static final String CREATE_TABLE_QUERY = "create table if not exists goods_category(id bigserial not null, name varchar not null);";
    private static final String CREATE_UNIQ_INDEX_QUERY = "create unique index if not exists goods_category_id_uindex on goods_category (id);";
    private static final String INSERT_QUERY = "insert into goods_category (name) values (?)";
    private static final String DELETE_QUERY = "delete from goods_category where id=?";
    private static final String SELECT_ALL_QUERY = "select id, name from goods_category";
    private final JdbcTemplate jdbcTemplate;

    public GoodsCategoryRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostConstruct
    public void createTableIfNotExists() {
        jdbcTemplate.execute(CREATE_TABLE_QUERY);
        jdbcTemplate.execute(CREATE_UNIQ_INDEX_QUERY);
    }

    @Override
    public int create(GoodsCategory goodsCategory) {
        return jdbcTemplate.update(INSERT_QUERY, goodsCategory.getName());
    }

    @Override
    public int delete(long id) {
        return jdbcTemplate.update(DELETE_QUERY, id);
    }

    @Override
    public List<GoodsCategory> getAll() {
        return jdbcTemplate.query(SELECT_ALL_QUERY, new BeanPropertyRowMapper<>(GoodsCategory.class));
    }
}
