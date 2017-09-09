package com.shengxi.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.shengxi.common.dao.BaseDaoImpl;
import com.shengxi.common.dao.IBaseDao;
import com.shengxi.model.Marriage;
import com.shengxi.model.Operator;

import tools.InitManager;

@Repository("marriageDao")
public class MarriageDao extends BaseDaoImpl<Marriage, String> implements IBaseDao<Marriage, String> {

	@SuppressWarnings("unchecked")
	public List<Marriage> findAll(String tel, String username, String sex, String img, String status, String identity,int firstResult, int maxResults) {
		String where = " ";

		if (!"".equals(status)) {
			where += " and status = "+status;
		}
		if (!"".equals(tel)) {
			where += " and (userid ='" + tel + "' or tel='"+ tel +"')";
		}
		if (!"".equals(username)) {
			where += " and fullname like '%" + username + "%' ";
		}
		if (!"".equals(sex)) {
			where += " and sex = " + sex;
		}
		if (!"".equals(img)) {
			where += " and photo = " + img;
		}
		if (!"".equals(identity)) {
			where += " and identity = " + identity;
		}
		
		
		String sql = " select  * from zl_marriage where 1=1   " + where;

		sql = sql + " order by id desc ";

		if (firstResult <= InitManager.Defaut_Unselected_ID || maxResults <= InitManager.Defaut_Unselected_ID || maxResults < firstResult) {
		} else {
			sql = sql + " limit " + firstResult + "," + maxResults;
		}

		logger.info("find sql: " + sql);

		List<Marriage> list = getJdbcTemplate().query(sql, new BeanPropertyRowMapper(Marriage.class));

		if (list == null) {
			list = new ArrayList<Marriage>();
		}

		return list;
	}
	
	public boolean update(String id, int status) {
		String sql = "update zl_marriage set status = " + status + " where id = " + id;
		int result = getJdbcTemplate().update(sql);
		return result > 0 ? true : false;
	}


	public boolean createMarriage(String marriage_userid, String tel, String marriage_leixing, String marriage_name, String marriage_short_name,Operator operator) {
		final String sql = "insert into zl_marriage (userid,tel,leixing,name,short_name,create_time,modify_time,valid_time,status,create_operator_id) " + " values ('" + marriage_userid + "','" + tel + "','" + marriage_leixing + "','" + marriage_name + "','"
				+ marriage_short_name + "',now(),now(),DATE_ADD(DATE_ADD(str_to_date(DATE_FORMAT(NOW(),'%Y-%m-%d'),'%Y-%m-%d %H:%i:%s'),INTERVAL 1 DAY),INTERVAL -1 SECOND),0,"+operator.getId()+") ";
		
		KeyHolder keyHolder = new GeneratedKeyHolder();  
		int autoIncId = 0;  
	        
		int result =jdbcTemplate.update(new PreparedStatementCreator() {  
	        public PreparedStatement createPreparedStatement(Connection con)  
	                throws SQLException {  
	            PreparedStatement ps = con.prepareStatement(sql,PreparedStatement.RETURN_GENERATED_KEYS);  
	            return ps;  
	        }  
	    }, keyHolder);  
		
		return result>0 ? true : false;
	}

	public boolean isExist(String name,String tel) {
		int count = countAll(" fullname ='" + name + "' or tel ='"+ tel +"'");
		if (count > 1) {
			return true;
		}
		return false;
	}

}
