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
import com.shengxi.model.Company;
import com.shengxi.model.Operator;

import tools.InitManager;

@Repository("companyDao")
public class CompanyDao extends BaseDaoImpl<Company, String> implements IBaseDao<Company, String> {

	@SuppressWarnings("unchecked")
	public List<Company> findAll(String tel,String company_tel, String title, String type, String status, int firstResult, int maxResults) {
		String where = " ";

		if ("-99".equals(status)) {
			where += " and status = 0 and build_time<now() ";
		}
		if ("0".equals(status)) {
			where += " and status = 0 and build_time>=now() ";
		}
		if ("-1".equals(status)) {
			where += " and status = -1";
		}

		if (!"".equals(tel)) {
			where += " and userid ='" + tel + "' ";
		}
		if (!"".equals(company_tel)) {
			where += " and tel ='" + company_tel + "' ";
		}
		if (!"".equals(title)) {
			where += " and (short_name like '%" + title + "%' or name like '%" + title + "%') ";
		}
		if (!"".equals(type)) {
			where += " and leixing = " + type;
		}

		String sql = " select  * from zl_company where 1=1   " + where;

		sql = sql + " order by id desc ";

		if (firstResult <= InitManager.Defaut_Unselected_ID || maxResults <= InitManager.Defaut_Unselected_ID || maxResults < firstResult) {
		} else {
			sql = sql + " limit " + firstResult + "," + maxResults;
		}

		logger.info("find sql: " + sql);

		List<Company> list = getJdbcTemplate().query(sql, new BeanPropertyRowMapper(Company.class));

		if (list == null) {
			list = new ArrayList<Company>();
		}

		return list;
	}

	public boolean update(String id, int status) {
		String sql = "update zl_company set status = " + status + ", modify_time= now()  where id = " + id;
		int result = getJdbcTemplate().update(sql);
		return result > 0 ? true : false;
	}

	public boolean updateValidDate(int fullWeeks, String company_id) {
		String sql = "";

		// 从次日0点到fullweeks月后的0点，当日申请刷新的当天富余时间为赠送的。（所以加了一天）
		if (isValiding(company_id) == 1) {
			sql = "update zl_company set build_time =  DATE_ADD(DATE_ADD(DATE_ADD(str_to_date(DATE_FORMAT(build_time,'%Y-%m-%d'),'%Y-%m-%d %H:%i:%s'),interval " + fullWeeks + " MONTH),interval 1 DAY),INTERVAL -1 SECOND)   where id = " + company_id;
		} else {
			sql = "update zl_company set build_time =  DATE_ADD(DATE_ADD(DATE_ADD(str_to_date(DATE_FORMAT(NOW(),'%Y-%m-%d'),'%Y-%m-%d %H:%i:%s'),interval " + fullWeeks + " MONTH),interval 1 DAY),INTERVAL -1 SECOND)   where id = " + company_id;
		}

		int result = getJdbcTemplate().update(sql);
		return result > 0 ? true : false;
	}

	public int isValiding(String company_id) {
		String query = " select  build_time>now()  from zl_company where id = " + company_id;
		return getJdbcTemplate().queryForInt(query);
	}

	public boolean createCompany(String company_userid, String tel, String company_leixing, String company_name, String company_short_name,Operator operator) {
		final String sql = "insert into zl_company (userid,tel,leixing,name,short_name,create_time,modify_time,build_time,status,create_operator_id) " + " values ('" + company_userid + "','" + tel + "','" + company_leixing + "','" + company_name + "','"
				+ company_short_name + "',now(),now(),DATE_ADD(DATE_ADD(str_to_date(DATE_FORMAT(NOW(),'%Y-%m-%d'),'%Y-%m-%d %H:%i:%s'),INTERVAL 1 DAY),INTERVAL -1 SECOND),0,"+operator.getId()+") ";
		
		KeyHolder keyHolder = new GeneratedKeyHolder();  
		int autoIncId = 0;  
	        
	      jdbcTemplate.update(new PreparedStatementCreator() {  
	        public PreparedStatement createPreparedStatement(Connection con)  
	                throws SQLException {  
	            PreparedStatement ps = con.prepareStatement(sql,PreparedStatement.RETURN_GENERATED_KEYS);  
	            return ps;  
	        }  
	    }, keyHolder);  

		String sql2 = "insert into zl_discount (c_id,status,userid) values ("+autoIncId+",-1,'"+company_userid+"')";
		int result2 = getJdbcTemplate().update(sql2);
		
		return result2>0 ? true : false;
	}

	public boolean isExist(String name) {
		int count = countAll(" name ='" + name + "' ");
		if (count > 1) {
			return true;
		}
		return false;
	}

}
