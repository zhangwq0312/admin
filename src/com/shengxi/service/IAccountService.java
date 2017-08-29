package com.shengxi.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.shengxi.dao.IAccountDao;
import com.shengxi.model.IAccount;

@Service("iaccountService")
public class IAccountService {

	@Autowired
	@Qualifier("iaccountDao")
	private IAccountDao dao;

	public IAccount findById(String id) {
		return dao.findById(id);
	}
	public IAccount findByTel(String id) {
		return dao.findByTel(id);
	}
	public boolean save(IAccount iaccount) {
		iaccount.setCreate_time(new Date());
		iaccount.setModify_time(new Date());
		String id = dao.saveAndReturnId(iaccount);
		iaccount.setId(id);
		return true;
	}

	public boolean update(IAccount iaccount) {
		iaccount.setModify_time(new Date());
		return dao.update(iaccount);
	}

}
