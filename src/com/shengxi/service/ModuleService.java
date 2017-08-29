package com.shengxi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.shengxi.dao.ModuleDao;
import com.shengxi.model.Module;
import com.shengxi.model.Operator;

@Service("moduleService")
public class ModuleService {
	
	@Autowired
	@Qualifier("moduleDao")
	private ModuleDao moduleDao;

	public List<Module> queryWithAuth(Operator operator) {
		return moduleDao.queryWithAuth(operator);
	}

	public List<Module> findAll() {
		return moduleDao.findAll(null, "order by id asc");
	}

}
