package com.shengxi.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.shengxi.common.dao.BaseDaoImpl;
import com.shengxi.model.Module;
import com.shengxi.model.Operator;

@Repository("moduleDao")
public class ModuleDao extends BaseDaoImpl<Module, String>  {

	public List<Module> queryWithAuth(Operator operator) {
		List<Module> moduleList = new ArrayList<Module>();

		if (operator == null)
			return moduleList;

		String sql = "select distinct m.* from zz_operators u,zz_roles r,Zz_MODULES m where u.id='" + operator.getId()
				+ "' and concat(',', u.role_ids, ',') like concat('%,', r.id, ',%') and concat(',', r.module_ids, ',') like concat('%,', m.id, ',%') order by m.id asc";
		moduleList = findAllBySql(sql);

		return moduleList;
	}
	
}
