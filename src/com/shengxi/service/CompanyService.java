package com.shengxi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.shengxi.dao.CompanyDao;
import com.shengxi.model.Company;
import com.shengxi.model.Operator;

@Service("companyService")
public class CompanyService {

	@Autowired
	@Qualifier("companyDao")
	private CompanyDao dao;

	public Company findById(String id) {
		return dao.findById(id);
	}
	
	public boolean update(String id, int status) {
		return dao.update(id, status);
	}

	public List<Company> findAll(String tel, String company_tel,String title, String type, String status, int firstResult, int maxResults) {
		return dao.findAll(tel,company_tel, title, type, status, firstResult, maxResults);
	}

	public boolean updateValidDate(int fullWeeks, String company_id) {
		return dao.updateValidDate(fullWeeks, company_id);
	}

	public int isValiding(String company_id) {
		return dao.isValiding(company_id);
	}

	public boolean isExist(String name) {
		return dao.isExist(name);
	}

	public boolean createCompany(String company_userid, String tel, String company_leixing, String company_name, String company_short_name,Operator operator) {
		return dao.createCompany(company_userid, tel, company_leixing, company_name, company_short_name, operator);
	}

}
