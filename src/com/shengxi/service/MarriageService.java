package com.shengxi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.shengxi.dao.MarriageDao;
import com.shengxi.model.Marriage;
import com.shengxi.model.Operator;

@Service("marriageService")
public class MarriageService {

	@Autowired
	@Qualifier("marriageDao")
	private MarriageDao dao;

	public Marriage findById(String id) {
		return dao.findById(id);
	}
	
	public boolean update(String id, int status) {
		return dao.update(id, status);
	}

	public boolean isExist(String name,String tel) {
		return dao.isExist(name, tel);
	}

	public boolean createMarriage(String company_userid, String tel, String company_leixing, String company_name, String company_short_name,Operator operator) {
		return dao.createMarriage(company_userid, tel, company_leixing, company_name, company_short_name, operator);
	}

	public List<Marriage> findAll(String tel, String username, String sex, String img, String status, String identity,int firstResult, int maxResults) {
		return dao.findAll(tel,username,sex,img,status,identity,firstResult,maxResults);
	}

	public boolean save(Marriage bean) {
		return dao.save(bean);
	}

	public boolean update(Marriage bean) {
		return dao.update(bean);
	}

}
