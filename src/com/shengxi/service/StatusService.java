package com.shengxi.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.shengxi.dao.StatusDao;
import com.shengxi.model.Status;


@Service("statusService")
public class StatusService   {
	
	@Autowired
	@Qualifier("statusDao")
	private  StatusDao statusDao;

	public List<Status> findStatus(String table_name) {
		return statusDao.findStatus(table_name);
	}
	
	public boolean save( Status status) {
		status.setCreate_time(new Date());
		status.setModify_time(new Date());
		return statusDao.save(status);
	}
	
	public boolean update( Status status) {
		status.setModify_time(new Date());
		return statusDao.update(status);
	}
	
	public boolean delete( Status status) {
		return statusDao.delete(status);
	}
	
	public boolean delete(String id) {
		return statusDao.deleteById(id);
	}
	
	public int countAll() {
		
		return statusDao.countAll();
	}
	
	public  Status findById(String id) {
		return statusDao.findById(id);
	}
	
	public List<Status> findAll() {
		return statusDao.findAll();
	}
	
	public List<Status> findAll(int firstResult, int maxResults) {
		return statusDao.findAll(firstResult, maxResults);
	}

}
