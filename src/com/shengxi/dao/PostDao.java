package com.shengxi.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Repository;

import com.shengxi.common.dao.BaseDaoImpl;
import com.shengxi.common.dao.IBaseDao;
import com.shengxi.model.User;
import com.shengxi.showmodel.PostUser;

import tools.InitManager;

@Repository("postDao")
public class PostDao extends BaseDaoImpl<User, String> implements  IBaseDao<User, String> {

	@SuppressWarnings("unchecked")
	public List<PostUser> findAll(String orderby,String tel,String post_tel, String title, String type,String status, int firstResult, int maxResults) {
		
		String order = "";
		if("0".equals(orderby)){
			order="create_time";
		}else if("1".equals(orderby)){
			order="build_time";
		}else{
			order="create_time";
		}
		String where=" ";
		
		if(!"".equals(tel)){
			where += " and userid ='" + tel + "' ";
		}
		if(!"".equals(post_tel)){
			where += " and tel ='" + post_tel + "' ";
		}
		if(!"".equals(title)){
			where += " and title like '%" + title + "%' ";
		}
		if(!"".equals(status)){
			where += " and status = "+status;
		}
		
		String sql="";
		
		if(type!=null && !"".equals(type.trim())){
			if("zl_house".equals(type)){
				sql =  " select '"+type+"' post_table,create_time,modify_time,build_time,userid user_tel,tel post_tel,status post_status,title post_title, id post_id from zl_house where 1=1 and source!=10 "+where ;
			}else{
				sql =  " select '"+type+"' post_table,create_time,modify_time,build_time,userid user_tel,tel post_tel,status post_status,title post_title, id post_id from "+type+" where 1=1  "+where;
			}
		}else{
			sql = " select * from ( ";
			sql = sql +  " select  'zl_house' post_table,create_time,modify_time,build_time,userid user_tel,tel post_tel,status post_status,title post_title, id post_id from zl_house where 1=1 and source!=10 "+where ;
			sql = sql +  " union ";
			sql = sql +  " select 'zl_employ' post_table,create_time,modify_time,build_time,userid user_tel,tel post_tel,status post_status,title post_title, id post_id from zl_employ where 1=1  "+where;
			sql = sql +  " union  ";
			sql = sql +  " select 'zl_tel'    post_table,create_time,modify_time,build_time,userid user_tel,tel post_tel,status post_status,title post_title, id post_id from zl_tel where 1=1 "+where;
			sql = sql +  " ) a ";
		}
		
		sql =sql +" order by "+order+" desc ";
		
		if(firstResult <= InitManager.Defaut_Unselected_ID || maxResults <= InitManager.Defaut_Unselected_ID || maxResults < firstResult) {
    	} else {
    		sql = sql  + " limit " + firstResult + "," + maxResults;
    	}
		
		logger.info("find sql: " + sql);
		
		List<PostUser> list = getJdbcTemplate().query(sql, new BeanPropertyRowMapper(PostUser.class));
		
		if(list == null) {
			list = new ArrayList<PostUser>();
		}
		
		return list;
	}

	public boolean update(String id, int status,String post_table) {
		String sql = "update "+ post_table + " set status = " + status + ", modify_time= now() where id = "+ id;
		int lineNum = getJdbcTemplate().update(sql);
		if(lineNum>0){
			return true;
		}
		return false;
	}

	
	public int ifAutoFlushing(String post_table, String post_id) {
		String query =  " select  build_time>now()  from "+ post_table + " where id = "+ post_id;
		return  getJdbcTemplate().queryForInt(query);
	}
	
	public boolean updatePublishDate(int fullWeeks, String post_table, String post_id) {
		String sql="";
		
		int d = fullWeeks+1;
		//从次日0点到fullweeks天后的0点，当日申请刷新的当天富余时间为赠送的。
		if(ifAutoFlushing(post_table,post_id)==1){
			sql = "update "+ post_table + " set build_time =  DATE_ADD(DATE_ADD(str_to_date(DATE_FORMAT(build_time,'%Y-%m-%d'),'%Y-%m-%d %H:%i:%s'),INTERVAL "+d+" DAY),INTERVAL -1 SECOND)   where id = "+ post_id;
		}else{
			sql = "update "+ post_table + " set build_time =  DATE_ADD(DATE_ADD(str_to_date(DATE_FORMAT(NOW(),'%Y-%m-%d'),'%Y-%m-%d %H:%i:%s'),INTERVAL "+d+" DAY),INTERVAL -1 SECOND)   where id = "+ post_id;

		}
		
		int lineNum = getJdbcTemplate().update(sql);
		if(lineNum>0){
			return true;
		}
		return false;
	}

	public int ifExistValidBM(String post_table, String post_id) {
		String query =  " select  count(*)  from "+ post_table + " where status=0 and tel in (select tel from "+ post_table + " where id = "+ post_id +" )";
		return  getJdbcTemplate().queryForInt(query);
	}

}
