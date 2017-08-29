package com.shengxi.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.shengxi.common.dao.BaseDaoImpl;
import com.shengxi.common.dao.IBaseDao;
import com.shengxi.model.CutType;
import com.shengxi.model.IAccountHistory;

@Repository("iaccountHistoryDao")
public class IAccountHistoryDao extends BaseDaoImpl<IAccountHistory, String> implements  IBaseDao<IAccountHistory, String> {

	public boolean findByCutType(String id) {

		List<IAccountHistory> cutTypesList = new ArrayList<IAccountHistory>();
		if (id != null) {
			String sql = "select * from i_account_history  where cuttype_id='" + id + "' limit 1";
			cutTypesList = findAllBySql(sql);
		}

		if (cutTypesList != null && cutTypesList.size() > 0) {
			return true;
		}

		return false;
	}
}
