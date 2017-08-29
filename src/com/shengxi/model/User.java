package com.shengxi.model;

import java.io.Serializable;
import java.util.Date;

import com.shengxi.common.annotation.IField;
import com.shengxi.common.annotation.IId;
import com.shengxi.common.annotation.ITable;

@SuppressWarnings("serial")
@ITable(name = "t_user")
public class User implements Serializable {
	@IId
	private String id;
	private String tel;
	private String username;
	private String ni;
	private int status;
	private int sex;
	private String mail;
	private Date born_day;
	private String address;
	@IField(update = false)
	private Date create_time; // 创建时间
	private Date modify_time; // 修改时间

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getMail() {
		return mail;
	}
	public void setMail(String mail) {
		this.mail = mail;
	}
	public String getNi() {
		return ni;
	}
	public void setNi(String ni) {
		this.ni = ni;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		this.sex = sex;
	}
	public Date getBorn_day() {
		return born_day;
	}
	public void setBorn_day(Date born_day) {
		this.born_day = born_day;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
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


}
