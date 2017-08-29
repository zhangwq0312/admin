package com.shengxi.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.shengxi.dao.OperatorDao;
import com.shengxi.model.Operator;

@Service("operatorService")
public class OperatorService   {
	
	@Autowired
	@Qualifier("operatorDao")
	private OperatorDao operatorDao;
	
	public boolean save(Operator operator) {
		operator.setCreate_time(new Date());
		operator.setModify_time(new Date());
		return operatorDao.save(operator);
	}
	
	public boolean update(Operator operator) {
		operator.setModify_time(new Date());
		return operatorDao.update(operator);
	}
	
	public boolean delete(String id) {
		return operatorDao.deleteById(id);
	}
	
	public Operator findById(String id) {
		return operatorDao.findById(id);
	}
	
	public Operator findByName(String name) {
		return operatorDao.findByName(name);
	}
	
	public int countAll() {
		return operatorDao.countAll();
	}
	
	public List<Operator> findAll(int firstResult, int maxResults) {
		return operatorDao.findAll(firstResult, maxResults);
	}

	public boolean isExist(String name) {
		String where= " name='"+ name + "' ";
		
		int count = operatorDao.countAll(where);
		
		return count >= 1 ? true :false;
	}
	
	public boolean roleIsUsed(String id) {
		String sql= "select * from zz_operators t where t.role_ids like '%"+id+"%'";
		List<Operator>  operators = operatorDao.findAllBySql(sql);
		if(operators!=null && operators.size() >0){
			return true;
		}
		return false;
	}
}
