package com.shengxi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.shengxi.dao.CompanyDao;
import com.shengxi.model.Company;

@Service("companyService")
public class CompanyService {

	@Autowired
	@Qualifier("companyDao")
	private CompanyDao dao;

	public boolean update(String id,int status) {
		return dao.update(id,status);
	}

	public List<Company> findAll(String tel, String title, String type,String status, int firstResult, int maxResults) {
		return dao.findAll(tel, title, type,status,firstResult, maxResults);
	}
	

}
