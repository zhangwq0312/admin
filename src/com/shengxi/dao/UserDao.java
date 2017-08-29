package com.shengxi.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Repository;

import com.shengxi.common.dao.BaseDaoImpl;
import com.shengxi.common.dao.IBaseDao;
import com.shengxi.model.User;
import com.shengxi.showmodel.MoneyUser;

import tools.InitManager;

@Repository("userDao")
public class UserDao extends BaseDaoImpl<User, String> implements  IBaseDao<User, String> {

	@SuppressWarnings("unchecked")
	public List<MoneyUser> findAll(String tel, String username, String status,int firstResult, int maxResults) {
		
		String where="";
		if(!"".equals(tel)){
			where += " and t.tel ='" + tel + "' ";
		}
		if(!"".equals(username)){
			where += " and t.username ='" + username + "' ";
		}
		if(!"".equals(status)){
			where += " and t.status ='" + status + "' ";
		}

		String HQL_FIND_ALL = "select t.*,"
				+ "i.id i_id,i.modify_time i_modify_time,i.create_time i_create_time, "
				+ "i.money_now,i.money_add,i.money_cut,i.integral_cut  from t_user t ,i_account i ";
		
		String sql = HQL_FIND_ALL + " where t.tel=i.userid " + where ;

		if(firstResult <= InitManager.Defaut_Unselected_ID || maxResults <= InitManager.Defaut_Unselected_ID || maxResults < firstResult) {
			sql = sql + " order by i.modify_time desc";
    	} else {
    		sql = sql  + " order by i.modify_time desc "+ " limit " + firstResult + "," + maxResults;
    	}
		
		logger.info("find sql: " + sql);
		
		List<MoneyUser> list = getJdbcTemplate().query(sql, new BeanPropertyRowMapper(MoneyUser.class));
		
		if(list == null) {
			list = new ArrayList<MoneyUser>();
		}
		
		return list;
	}
	
	@SuppressWarnings("unchecked")
	public User findByTel(String tel) {
		String sql = "select * from t_user where tel='"+tel+"'";
		List<User> list = getJdbcTemplate().query(sql, new BeanPropertyRowMapper(User.class));
		
		if(list != null&&list.size()>0) {
			return list.get(0);
		}
		return null;
	}

}