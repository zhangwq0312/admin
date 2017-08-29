package com.shengxi.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Repository;

import com.shengxi.common.dao.BaseDaoImpl;
import com.shengxi.model.Operator;

import tools.InitManager;

@Repository("operatorDao")
public class OperatorDao extends BaseDaoImpl<Operator, String>  {
//exist
	public Operator findByName(String name) {

		Operator operators = null;
		List<Operator> operatorsList = new ArrayList<Operator>();
		if (name != null && name.trim().length() > 0) {
			String sql = "select * from zz_operators t where t.name='" + name + "'";
			operatorsList = findAllBySql(sql);
		}

		if (operatorsList != null && operatorsList.size() > 0) {
			operators = operatorsList.get(0);
		}

		return operators;
	}

	@SuppressWarnings("unchecked")
	public List<Operator> findAll(int firstResult, int maxResults) {
		String sql = "";
		String HQL_FIND_ALL = "select o.*, (select group_concat(r.name) from zz_roles r where concat(',',o.role_ids,',') like concat('%,',r.id,',%')) role_names from zz_operators o";
		
		if(firstResult <= InitManager.Defaut_Unselected_ID || maxResults <= InitManager.Defaut_Unselected_ID || maxResults < firstResult) {
			sql = HQL_FIND_ALL + " order by id desc";
    	} else {
    		sql = HQL_FIND_ALL + " limit " + firstResult + "," + maxResults;
    	}
		
		List<Operator> list = getJdbcTemplate().query(sql, new BeanPropertyRowMapper(Operator.class));
		if(list == null) {
			list = new ArrayList<Operator>();
		}
		return list;
		
	}
}
