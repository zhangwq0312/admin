package com.shengxi.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.shengxi.dao.TypeDao;
import com.shengxi.model.Type;


@Service("typeService")
public class TypeService   {
	
	@Autowired
	@Qualifier("typeDao")
	private  TypeDao dao;

	public List<Type> findByGroupName(String group_name) {
		return dao.findByGroupName(group_name);
	}
	
	public boolean save( Type type) {
		type.setCreate_time(new Date());
		type.setModify_time(new Date());
		return dao.save(type);
	}
	
	public boolean update( Type type) {
		type.setModify_time(new Date());
		return dao.update(type);
	}
	
	public boolean delete( Type type) {
		return dao.delete(type);
	}
	
	public boolean delete(String id) {
		return dao.deleteById(id);
	}
	
	public int countAll() {
		
		return dao.countAll();
	}
	
	public  Type findById(String id) {
		return dao.findById(id);
	}
	
	public List<Type> findAll() {
		return dao.findAll();
	}
	
	public List<Type> findAll(int firstResult, int maxResults) {
		return dao.findAll(firstResult, maxResults);
	}


}
