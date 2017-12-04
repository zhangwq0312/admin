package com.shengxi.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.shengxi.common.dao.BaseDaoImpl;
import com.shengxi.model.Status;

@Repository("statusDao")
public class StatusDao extends BaseDaoImpl<Status, String>  {
	
	public List<Status> findStatus(String table_name) {
		
		String where = " table_name='" + table_name +"'";
		
		return this.findAll(where, "order by id");
	}
	
}
