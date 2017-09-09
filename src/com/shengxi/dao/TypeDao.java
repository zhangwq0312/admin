package com.shengxi.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.shengxi.common.dao.BaseDaoImpl;
import com.shengxi.model.Type;

@Repository("typeDao")
public class TypeDao extends BaseDaoImpl<Type, String>  {
	
	public List<Type> findByGroupName(String group_name) {
		
		String where = " group_name='" + group_name + "' and status = 0";
		
		return this.findAll(where, "order by order_num");
	}

}
