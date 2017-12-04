package com.shengxi.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.shengxi.common.dao.BaseDaoImpl;
import com.shengxi.common.dao.IBaseDao;
import com.shengxi.model.Coupon;
import com.shengxi.model.Operator;

import tools.InitManager;

@Repository("couponDao")
public class CouponDao extends BaseDaoImpl<Coupon, String> implements IBaseDao<Coupon, String> {

	@SuppressWarnings("unchecked")
	public List<Coupon> findAll(String tel, String company_name, String type, String status, int firstResult, int maxResults) {
		String where = " ";

		if ("1".equals(type)) {
			where += " and publish_start_time<now() and publish_end_time>now() ";
		}
		if ("2".equals(type)) {
			where += " and publish_start_time>=now() ";
		}
		if ("3".equals(type)) {
			where += " and publish_end_time <= now()";
		}

		if (!"".equals(status)) {
			where += " and status = " + status;
		}
		
		if (!"".equals(tel)) {
			where += " and userid ='" + tel + "' ";
		}
		if (!"".equals(company_name)) {
			where += " and company_name like '%" + company_name + "%' ";
		}


		String sql = " select  * from z_coupon where 1=1   " + where;

		sql = sql + " order by id desc ";

		if (firstResult <= InitManager.Defaut_Unselected_ID || maxResults <= InitManager.Defaut_Unselected_ID || maxResults < firstResult) {
		} else {
			sql = sql + " limit " + firstResult + "," + maxResults;
		}

		logger.info("find sql: " + sql);

		List<Coupon> list = getJdbcTemplate().query(sql, new BeanPropertyRowMapper(Coupon.class));

		if (list == null) {
			list = new ArrayList<Coupon>();
		}

		return list;
	}

	public boolean update(String id, int status) {
		String sql = "update zl_coupon set status = " + status + ", modify_time= now()  where id = " + id;
		int result = getJdbcTemplate().update(sql);
		return result > 0 ? true : false;
	}

}
