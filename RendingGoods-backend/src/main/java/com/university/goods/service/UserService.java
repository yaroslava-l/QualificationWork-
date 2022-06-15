package com.university.goods.service;

import com.university.goods.model.UserBasicInfo;
import com.university.goods.model.UserFullInfo;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

public interface UserService {
    UserFullInfo register(UserBasicInfo userBasicInfo);

    boolean isAuthenticated(String username, String password) throws UsernameNotFoundException;

    boolean update(UserFullInfo userFullInfo);

    boolean block(long id);

    boolean unblock(long id);

    List<UserFullInfo> getAll();
}
