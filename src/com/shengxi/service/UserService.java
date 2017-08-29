package com.shengxi.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.shengxi.dao.UserDao;
import com.shengxi.model.User;
import com.shengxi.showmodel.MoneyUser;

@Service("userService")
public class UserService {

	@Autowired
	@Qualifier("userDao")
	private UserDao dao;

	public User findById(String id) {
		return dao.findById(id);
	}
	public User findByTel(String tel) {
		return dao.findByTel(tel);
	}

	public boolean update(User user) {
		user.setModify_time(new Date());
		return dao.update(user);
	}

	public List<MoneyUser> findAll(String tel, String username, String status,int firstResult, int maxResults) {
		return dao.findAll(tel, username, status,firstResult, maxResults);
	}

}
