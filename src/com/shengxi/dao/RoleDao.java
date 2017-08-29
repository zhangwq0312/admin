package com.shengxi.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Repository;

import com.shengxi.common.dao.BaseDaoImpl;
import com.shengxi.model.Role;

import tools.InitManager;

@Repository("roleDao")
public class RoleDao extends BaseDaoImpl<Role, String>  {

	public List<Role> findAll(int firstResult, int maxResults) {
		String sql = "";

		String HQL_FIND_ALL = "select r.*,  "
				+ "(select group_concat(m.name) from zz_modules m where concat(',', r.module_ids, ',') like concat('%,', m.id, ',%')) module_names "
				+ " from zz_roles r";

		if (firstResult <= InitManager.Defaut_Unselected_ID
				|| maxResults <= InitManager.Defaut_Unselected_ID
				|| maxResults < firstResult) {
			sql = HQL_FIND_ALL + " order by id desc";
		} else {
			sql = HQL_FIND_ALL + " limit " + firstResult + "," + maxResults;
		}

		@SuppressWarnings("unchecked")
		List<Role> list = getJdbcTemplate().query(sql,
				new BeanPropertyRowMapper(Role.class));

		if (list == null) {
			list = new ArrayList<Role>();
		}

		return list;
	}

	public Role findByName(String name) {
		Role role = null;
		List<Role> roleList = new ArrayList<Role>();
		if (name != null && name.trim().length() > 0) {
			String sql = "select * from zl_roles t where t.name='" + name + "'";
			logger.info("------------sql:" + sql);
			roleList = findAllBySql(sql);
		}

		if (roleList != null && roleList.size() > 0) {
			role = roleList.get(0);
		}

		return role;
	}

}
