package com.shengxi.service;

import java.util.Date;
import java.util.List;

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

	public boolean findByCutType(String cuttype_id) {
		return dao.findByCutType(cuttype_id);
	}
	
	public List<IAccountHistory> findByAccountId(int firstResult,int maxResults,String account_id,String type) {
		return dao.findByAccountId(firstResult,maxResults,account_id,type);
	}
}
