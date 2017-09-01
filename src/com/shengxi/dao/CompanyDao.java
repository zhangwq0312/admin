package com.shengxi.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Repository;

import com.shengxi.common.dao.BaseDaoImpl;
import com.shengxi.common.dao.IBaseDao;
import com.shengxi.model.Company;
import com.shengxi.model.User;

import tools.InitManager;

@Repository("companyDao")
public class CompanyDao extends BaseDaoImpl<User, String> implements  IBaseDao<User, String> {

	@SuppressWarnings("unchecked")
	public List<Company> findAll(String tel, String title, String type,String status, int firstResult, int maxResults) {
		

		String where=" ";
		
		if(!"".equals(tel)){
			where += " and userid ='" + tel + "' ";
		}
		if(!"".equals(title)){
			where += " and (short_name like '%" + title + "%' or name like '%" + title+ "%') ";
		}
		if(!"".equals(type)){
			where += " and leixing = "+type;
		}
		if(!"".equals(status)){
			where += " and status = "+status;
		}
		
		String sql =  " select  * from zl_company where 1=1   "+where ;
		
		sql =sql +" order by id desc ";
		
		if(firstResult <= InitManager.Defaut_Unselected_ID || maxResults <= InitManager.Defaut_Unselected_ID || maxResults < firstResult) {
    	} else {
    		sql = sql  + " limit " + firstResult + "," + maxResults;
    	}
		
		logger.info("find sql: " + sql);
		
		List<Company> list = getJdbcTemplate().query(sql, new BeanPropertyRowMapper(Company.class));
		
		if(list == null) {
			list = new ArrayList<Company>();
		}
		
		return list;
	}

	public boolean update(String id, int status) {
		String sql = "update zl_company set status = " + status + " where id = "+ id;
		int lineNum = getJdbcTemplate().update(sql);
		if(lineNum>0){
			return true;
		}
		return false;
	}

}
