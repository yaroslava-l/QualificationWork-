package com.university.goods.repository;

import com.university.goods.model.UserBasicInfo;
import com.university.goods.model.UserFullInfo;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    UserFullInfo saveAndGetFullInfo(UserBasicInfo userBasicInfo);

    Optional<UserBasicInfo> findNotBlocked(String username);

    int update(UserFullInfo userFullInfo);

    int setBlockedStatus(long id, boolean blocked);

    List<UserFullInfo> getAll();
}
