package com.university.goods.repository.impl;

import com.university.goods.model.UserBasicInfo;
import com.university.goods.model.UserFullInfo;
import com.university.goods.repository.UserRepository;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;

@Repository
public class UserRepositoryImpl implements UserRepository {
    private static final String CREATE_TABLE_QUERY = "create table if not exists users(id bigserial not null, name varchar not null, email varchar not null, " +
            "male varchar, surname varchar, img varchar, phone integer, yearsOld  integer, blocked boolean, password varchar not null);";
    private static final String CREATE_UNIQ_INDEX_QUERY = "create unique index if not exists users_id_uindex on users (id);";
    private static final String INSERT_QUERY = "insert into users (email, password, name, blocked) values (?, ?, ?, ?) " +
            "returning id, name, email, male, surname, img, phone, yearsOld, blocked";
    private static final String UPDATE_QUERY = "update users set name=?, email =?, male=?, surname=?, img=?, phone=?, yearsOld=? where id=?";
    private static final String UPDATE_BLOCKED_STATUS_QUERY = "update users set blocked=? where id=?";
    private static final String FIND_NOT_BLOCKED_QUERY = "select email, password, name, blocked from users where name=? and blocked != true";
    private static final String SELECT_ALL_QUERY = "select id, name, email, male, surname, img, phone, yearsOld, blocked from users";
    private final JdbcTemplate jdbcTemplate;


    public UserRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostConstruct
    public void createTableIfNotExists() {
        jdbcTemplate.execute(CREATE_TABLE_QUERY);
        jdbcTemplate.execute(CREATE_UNIQ_INDEX_QUERY);
    }

    @Override
    public UserFullInfo saveAndGetFullInfo(UserBasicInfo userBasicInfo) {
        return jdbcTemplate.queryForObject(INSERT_QUERY,
                new BeanPropertyRowMapper<>(UserFullInfo.class),
                userBasicInfo.getEmail(), userBasicInfo.getPassword(), userBasicInfo.getName(), false);
    }

    @Override
    public Optional<UserBasicInfo> findNotBlocked(String username) {
        try {
            return Optional.ofNullable(
                    jdbcTemplate.queryForObject(FIND_NOT_BLOCKED_QUERY, new BeanPropertyRowMapper<>(UserBasicInfo.class), username));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    @Override
    public int update(UserFullInfo userFullInfo) {
        return jdbcTemplate.update(UPDATE_QUERY, userFullInfo.getName(), userFullInfo.getEmail(), userFullInfo.getMale(),
                userFullInfo.getSurname(), userFullInfo.getImg(), userFullInfo.getPhone(), userFullInfo.getYearsOld(),
                userFullInfo.getId());
    }

    @Override
    public int setBlockedStatus(long id, boolean blocked) {
        return jdbcTemplate.update(UPDATE_BLOCKED_STATUS_QUERY, blocked, id);
    }

    @Override
    public List<UserFullInfo> getAll() {
        return jdbcTemplate.query(SELECT_ALL_QUERY, new BeanPropertyRowMapper<>(UserFullInfo.class));
    }
}
