package com.shengxi.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.shengxi.common.dao.BaseDaoImpl;
import com.shengxi.common.dao.IBaseDao;
import com.shengxi.model.IAccount;
import com.shengxi.model.Operator;

@Repository("iaccountDao")
public class IAccountDao extends BaseDaoImpl<IAccount, String> implements  IBaseDao<IAccount, String> {
	
	public IAccount findByTel(String tel) {

		IAccount account = null;
		List<IAccount> list = new ArrayList<IAccount>();
		if (tel != null && tel.trim().length() > 0) {
			String sql = "select * from i_account t where t.userid='" + tel + "' limit 1";
			list = findAllBySql(sql);
		}

		if (list != null && list.size() > 0) {
			account = list.get(0);
		}

		return account;
	}
}
