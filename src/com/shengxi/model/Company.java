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
@ITable(name = "zl_company")
public class Company implements Serializable {

	@IId
	private long id;
	private String userid;
	private String short_name;
	private String name;
	private String address;
	private String tel;
	private String leixing;
	int status ;
	@IField(update = false)
	private Date create_time;
	private Date modify_time;
	private Date valid_time;
	private long create_operator_id;
	
	
	public long getCreate_operator_id() {
		return create_operator_id;
	}
	public void setCreate_operator_id(long create_operator_id) {
		this.create_operator_id = create_operator_id;
	}
	public Date getValid_time() {
		return valid_time;
	}
	public void setValid_time(Date valid_time) {
		this.valid_time = valid_time;
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
	public String getShort_name() {
		return short_name;
	}
	public void setShort_name(String short_name) {
		this.short_name = short_name;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getLeixing() {
		return leixing;
	}
	public void setLeixing(String leixing) {
		this.leixing = leixing;
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
