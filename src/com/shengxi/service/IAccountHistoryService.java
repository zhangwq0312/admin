package com.shengxi.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.shengxi.dao.IAccountHistoryDao;
import com.shengxi.model.IAccountHistory;

@Service("iaccountHistoryService")
public class IAccountHistoryService {

	@Autowired
	@Qualifier("iaccountHistoryDao")
	private IAccountHistoryDao dao;

	public IAccountHistory findById(String id) {
		return dao.findById(id);
	}

	public boolean save(IAccountHistory iaccountHistory) {
		iaccountHistory.setCreate_time(new Date());
		String id = dao.saveAndReturnId(iaccountHistory);
		iaccountHistory.setId(id);
		return true;
	}

	public boolean findByCutType(String id) {
		return dao.findByCutType(id);
	}
}
