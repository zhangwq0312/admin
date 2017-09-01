package com.shengxi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.shengxi.dao.PostDao;
import com.shengxi.showmodel.PostUser;

@Service("postService")
public class PostService {

	@Autowired
	@Qualifier("postDao")
	private PostDao dao;

	public boolean update(String id,int status,String post_table) {
		return dao.update(id,status,post_table);
	}

	public List<PostUser> findAll(String orderby,String tel, String title, String type,String status, int firstResult, int maxResults) {
		return dao.findAll(orderby,tel, title, type,status,firstResult, maxResults);
	}

	public boolean updatePublishDate(int fullWeeks, String post_table, String post_id) {
		return dao.updatePublishDate(fullWeeks,post_table,post_id);
	}
	
	public int ifAutoFlushing(String post_table, String post_id) {
		return  dao.ifAutoFlushing(post_table,post_id);
	}

}
