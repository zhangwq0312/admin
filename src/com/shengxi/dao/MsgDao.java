package com.shengxi.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Repository;

import com.shengxi.common.dao.BaseDaoImpl;
import com.shengxi.model.Msg;

import tools.InitManager;

@Repository("msgDao")
public class MsgDao extends BaseDaoImpl<Msg, String>  {

	@SuppressWarnings("unchecked")
	public List<Msg> findAll(String tel, String username, String status, int firstResult, int maxResults) {
		String where = " ";

		if (!"".equals(status)) {
			where += " and status = "+status;
		}
		if (!"".equals(tel)) {
			where += " and from_tel ='" + tel + "'";
		}
		if (!"".equals(username)) {
			where += " and person like '%" + username + "%' ";
		}
		
		String sql = " select  * from t_leave_msg where type='leave_msg_sys' and  " + where;

		sql = sql + " order by create_time desc ";

		if (firstResult <= InitManager.Defaut_Unselected_ID || maxResults <= InitManager.Defaut_Unselected_ID || maxResults < firstResult) {
		} else {
			sql = sql + " limit " + firstResult + "," + maxResults;
		}

		logger.info("find sql: " + sql);

		List<Msg> list = getJdbcTemplate().query(sql, new BeanPropertyRowMapper(Msg.class));

		if (list == null) {
			list = new ArrayList<Msg>();
		}

		return list;
	}

}
