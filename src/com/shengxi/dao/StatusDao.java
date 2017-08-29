package com.shengxi.dao;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Repository;

import com.shengxi.common.dao.BaseDaoImpl;
import com.shengxi.model.Status;

@Repository("statusDao")
public class StatusDao extends BaseDaoImpl<Status, String>  {
	
	public List<Status> findStatus(String table_name, String field_name, String exceptValues) {
		
		String where = " table_name='" + table_name + "' and field_name='" + field_name + "' ";
		if (StringUtils.isNotBlank(exceptValues)){
			where += " and STATUS not in (" + exceptValues + ")";
		}
		
		return this.findAll(where, "order by status");
	}
	
	public List<Status> queryStatus(String table_name, String field_name) {
		
		String where = " table_name='" + table_name + "' and field_name='" + field_name + "' ";
		
		return this.findAll(where, " order by status");
	}
	
}
