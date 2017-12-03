package com.shengxi.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.shengxi.common.dao.BaseDaoImpl;
import com.shengxi.common.dao.IBaseDao;
import com.shengxi.model.CutType;
import com.shengxi.model.IAccountHistory;

import tools.InitManager;

@Repository("iaccountHistoryDao")
public class IAccountHistoryDao extends BaseDaoImpl<IAccountHistory, String> implements  IBaseDao<IAccountHistory, String> {

	public boolean findByCutType(String cuttype_id) {

		List<IAccountHistory> cutTypesList = new ArrayList<IAccountHistory>();
		if (cuttype_id != null) {
			String sql = "select * from i_account_history  where cuttype_id='" + cuttype_id + "' limit 1";
			cutTypesList = findAllBySql(sql);
		}

		if (cutTypesList != null && cutTypesList.size() > 0) {
			return true;
		}

		return false;
	}
	
	public List<IAccountHistory> findByAccountId(int firstResult,int maxResults,String account_id,String type) {

		List<IAccountHistory> cutTypesList = new ArrayList<IAccountHistory>();
		if (account_id != null) {
			String sql = "select * from i_account_history  where account_id=" + account_id ;
			if("add".equals(type)){
				sql=sql+ " and money_change>0 ";
			}else if("cut".equals(type)) {
				sql=sql+ " and money_change<=0 ";
			}
			
			if(firstResult <= InitManager.Defaut_Unselected_ID || maxResults <= InitManager.Defaut_Unselected_ID || maxResults < firstResult) {
				sql = sql + " order by id desc";
	    	} else {
	    		sql = sql  + " order by id desc "+ " limit " + firstResult + "," + maxResults;
	    	}
			
			cutTypesList = findAllBySql(sql);
		}

		if (cutTypesList != null && cutTypesList.size() > 0) {
			return cutTypesList;
		}

		return new ArrayList<IAccountHistory>();
	}
	
}
