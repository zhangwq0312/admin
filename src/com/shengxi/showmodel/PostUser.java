package com.shengxi.showmodel;

import java.io.Serializable;
import java.util.Date;

@SuppressWarnings("serial")
public class PostUser implements Serializable {
	private String user_tel;
	private String post_table;//post table
	private String post_id;//post ID
	private int    post_status;
	private String post_title;
	private String post_tel;
	
	private Date create_time; 
	private Date modify_time;
	private Date build_time;
	
	
	public String getPost_tel() {
		return post_tel;
	}
	public void setPost_tel(String post_tel) {
		this.post_tel = post_tel;
	}
	public Date getBuild_time() {
		return build_time;
	}
	public void setBuild_time(Date build_time) {
		this.build_time = build_time;
	}
	public String getUser_tel() {
		return user_tel;
	}
	public void setUser_tel(String user_tel) {
		this.user_tel = user_tel;
	}
	public String getPost_table() {
		return post_table;
	}
	public void setPost_table(String post_table) {
		this.post_table = post_table;
	}
	public String getPost_id() {
		return post_id;
	}
	public void setPost_id(String post_id) {
		this.post_id = post_id;
	}
	public int getPost_status() {
		return post_status;
	}
	public void setPost_status(int post_status) {
		this.post_status = post_status;
	}
	public String getPost_title() {
		return post_title;
	}
	public void setPost_title(String post_title) {
		this.post_title = post_title;
	}
	public Date getCreate_time() {
		return create_time;
	}
	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}
	public Date getModify_time() {
		return modify_time;
	}
	public void setModify_time(Date modify_time) {
		this.modify_time = modify_time;
	}
	
}
