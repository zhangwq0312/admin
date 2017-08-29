package com.shengxi.model;

import java.io.Serializable;
import java.util.Date;

import com.shengxi.common.annotation.IField;
import com.shengxi.common.annotation.IId;
import com.shengxi.common.annotation.ITable;

@SuppressWarnings("serial")
@ITable(name = "i_account")
public class IAccount implements Serializable {
	@IId
	private String id;
	private String userid;
	private int money_now;
	private int money_add;
	private int money_cut;
	private int integral_cut;
	private Date create_time; 
	private Date modify_time; 
	
	
	public Date getModify_time() {
		return modify_time;
	}
	public void setModify_time(Date modify_time) {
		this.modify_time = modify_time;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public int getMoney_now() {
		return money_now;
	}
	public void setMoney_now(int money_now) {
		this.money_now = money_now;
	}
	public int getMoney_add() {
		return money_add;
	}
	public void setMoney_add(int money_add) {
		this.money_add = money_add;
	}
	public int getMoney_cut() {
		return money_cut;
	}
	public void setMoney_cut(int money_cut) {
		this.money_cut = money_cut;
	}
	public int getIntegral_cut() {
		return integral_cut;
	}
	public void setIntegral_cut(int integral_cut) {
		this.integral_cut = integral_cut;
	}
	public Date getCreate_time() {
		return create_time;
	}
	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}

}
