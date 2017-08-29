package com.shengxi.common.dao;

import java.io.Serializable;
import java.util.List;

/**
 * 
 * @Class: IBaseDao
 * @Description: 所有Dao的泛型基类
 *
 * @author Haidi Liu
 * @param <E> 实体类型
 * @param <PK> 实体类型Key
 */
public interface IBaseDao<E extends Serializable, PK extends Serializable> {
	
	public boolean save(E entity);
	
	public String saveAndReturnId(E entity);
	
	public boolean update(E entity);
	
	public boolean delete(E entity);
	
	public boolean deleteById(PK id);
	
	public E findById(PK id);
	
	public int countAll();
	
	public int countAll(String where);
	
	public int countBySql(String sql);
	
	public List<E> findAll();
	
	public List<E> findAll(String where, String order);
	
	public List<E> findAllBySql(String sql);
	
	public List<E> findAllByPage(int pageNum, int pageSize);
	
	public List<E> findAllByPage(int pageNum, int pageSize, String where);
	
	public List<E> findAll(int firstResult, int maxResults);
	
	public List<E> findAll(int firstResult, int maxResults, String where);
	
	public String getSplitFieldSql(String orgi_set_sql);
	
}
