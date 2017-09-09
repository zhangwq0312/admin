package com.shengxi.model;

import java.io.Serializable;
import java.util.Date;

import com.shengxi.common.annotation.IField;
import com.shengxi.common.annotation.IId;
import com.shengxi.common.annotation.ITable;

/**
 * Status of the concrete class
 * 
 * @author liuhaidi
 * 
 */
@SuppressWarnings("serial")
@ITable(name = "zl_marriage")
public class Marriage implements Serializable {

	@IId
	private long id;
	private String userid;
	private String tel;
	private String fullname;
	private String sex;
	private Date born_time;
	private String education;
	private String address;
	private String job;
	private String message;
	private int identity;
	private int photo;
	private int status;
	@IField(update = false)
	private Date create_time;
	private Date modify_time;
	private long create_operator_id;
	
	
	public Date getBorn_time() {
		return born_time;
	}
	public void setBorn_time(Date born_time) {
		this.born_time = born_time;
	}
	public int getIdentity() {
		return identity;
	}
	public void setIdentity(int identity) {
		this.identity = identity;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getFullname() {
		return fullname;
	}
	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getEducation() {
		return education;
	}
	public void setEducation(String education) {
		this.education = education;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getJob() {
		return job;
	}
	public void setJob(String job) {
		this.job = job;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public int getPhoto() {
		return photo;
	}
	public void setPhoto(int photo) {
		this.photo = photo;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
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
	public long getCreate_operator_id() {
		return create_operator_id;
	}
	public void setCreate_operator_id(long create_operator_id) {
		this.create_operator_id = create_operator_id;
	}
	
	
	
}
