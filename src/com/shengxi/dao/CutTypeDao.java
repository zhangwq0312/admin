package com.shengxi.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Repository;

import com.shengxi.common.dao.BaseDaoImpl;
import com.shengxi.model.CutType;

import tools.InitManager;

@Repository("cutTypeDao")
public class CutTypeDao extends BaseDaoImpl<CutType, String>  {
//exist
	public CutType findByName(String name) {

		CutType cutTypes = null;
		List<CutType> cutTypesList = new ArrayList<CutType>();
		if (name != null && name.trim().length() > 0) {
			String sql = "select * from zz_cutTypes t where t.name='" + name + "'";
			cutTypesList = findAllBySql(sql);
		}

		if (cutTypesList != null && cutTypesList.size() > 0) {
			cutTypes = cutTypesList.get(0);
		}

		return cutTypes;
	}

	@SuppressWarnings("unchecked")
	public List<CutType> findAll(int firstResult, int maxResults) {
		String sql = "";
		String HQL_FIND_ALL = "select * from zz_cuttypes ";
		
		if(firstResult <= InitManager.Defaut_Unselected_ID || maxResults <= InitManager.Defaut_Unselected_ID || maxResults < firstResult) {
			sql = HQL_FIND_ALL + " order by status desc ,type desc, id desc";
    	} else { 
    		sql = HQL_FIND_ALL + " order by status desc ,type desc, id desc limit " + firstResult + "," + maxResults;
    	}
		
		List<CutType> list = getJdbcTemplate().query(sql, new BeanPropertyRowMapper(CutType.class));
		if(list == null) {
			list = new ArrayList<CutType>();
		}
		return list;
		
	}
}
