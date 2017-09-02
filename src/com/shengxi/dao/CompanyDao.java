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
		
		if("-99".equals(status)){
			where += " and status = 0 and valid_time<now() ";
		}
		if("0".equals(status)){
			where += " and status = 0 and valid_time>=now() ";
		}
		if("-1".equals(status)){
			where += " and status = -1";
		}

		if(!"".equals(tel)){
			where += " and userid ='" + tel + "' ";
		}
		if(!"".equals(title)){
			where += " and (short_name like '%" + title + "%' or name like '%" + title+ "%') ";
		}
		if(!"".equals(type)){
			where += " and leixing = "+type;
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

	public boolean updateValidDate(int fullWeeks, String company_id) {
		String sql="";

		//从次日0点到fullweeks月后的0点，当日申请刷新的当天富余时间为赠送的。（所以加了一天）
		if(isValiding(company_id)==1){
			sql = "update zl_company set valid_time =  DATE_ADD(DATE_ADD(DATE_ADD(str_to_date(DATE_FORMAT(valid_time,'%Y-%m-%d'),'%Y-%m-%d %H:%i:%s'),interval "+fullWeeks+" MONTH),interval 1 DAY),INTERVAL -1 SECOND)   where id = "+ company_id;
		}else{
			sql = "update zl_company set valid_time =  DATE_ADD(DATE_ADD(DATE_ADD(str_to_date(DATE_FORMAT(NOW(),'%Y-%m-%d'),'%Y-%m-%d %H:%i:%s'),interval "+fullWeeks+" MONTH),interval 1 DAY),INTERVAL -1 SECOND)   where id = "+ company_id;
		}
		
		int lineNum = getJdbcTemplate().update(sql);
		if(lineNum>0){
			return true;
		}
		return false;
	}
	
	public int isValiding(String company_id) {
		String query =  " select  valid_time>now()  from zl_company where id = "+ company_id;
		return  getJdbcTemplate().queryForInt(query);
	}
	

}
