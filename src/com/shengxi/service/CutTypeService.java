package com.shengxi.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.shengxi.dao.CutTypeDao;
import com.shengxi.model.CutType;

@Service("cutTypeService")
public class CutTypeService   {
	
	@Autowired
	@Qualifier("cutTypeDao")
	private CutTypeDao cutTypeDao;
	
	public boolean save(CutType cutType) {
		cutType.setCreate_time(new Date());
		return cutTypeDao.save(cutType);
	}
	
	public boolean update(CutType cutType) {
		return cutTypeDao.update(cutType);
	}
	
	public boolean delete(String id) {
		return cutTypeDao.deleteById(id);
	}
	
	public CutType findById(String id) {
		return cutTypeDao.findById(id);
	}
	
	public CutType findByName(String name) {
		return cutTypeDao.findByName(name);
	}
	
	public int countAll() {
		return cutTypeDao.countAll();
	}
	
	public List<CutType> findAll(int firstResult, int maxResults) {
		return cutTypeDao.findAll(firstResult, maxResults);
	}

	public boolean isExist(String name) {
		String where= " name='"+ name + "' ";
		
		int count = cutTypeDao.countAll(where);
		
		return count >= 1 ? true :false;
	}
	
	public boolean roleIsUsed(String id) {
		String sql= "select * from zz_cutTypes t where t.role_ids like '%"+id+"%'";
		List<CutType>  cutTypes = cutTypeDao.findAllBySql(sql);
		if(cutTypes!=null && cutTypes.size() >0){
			return true;
		}
		return false;
	}
}
