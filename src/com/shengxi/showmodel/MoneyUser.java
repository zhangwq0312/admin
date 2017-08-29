package com.shengxi.showmodel;

import java.io.Serializable;
import java.util.Date;

import com.shengxi.common.annotation.IField;
import com.shengxi.common.annotation.IId;

@SuppressWarnings("serial")
public class MoneyUser implements Serializable {
	@IId
	private String id;//用户ID
	private String tel;
	private String username;
	private String ni;
	private int status;
	private int sex;
	private String mail;
	private Date born_day;
	private String address;
	private Date create_time; 
	private Date modify_time; 
	
	private String i_id;//账户ID
	private Date i_create_time;// 首次付费时间
	private Date i_modify_time;// 修改账户信息时间
	private int money_now;
	private int money_add;
	private int money_cut;
	private int integral_cut;
	
	
	public String getI_id() {
		return i_id;
	}
	public void setI_id(String i_id) {
		this.i_id = i_id;
	}
	public Date getI_create_time() {
		return i_create_time;
	}
	public void setI_create_time(Date i_create_time) {
		this.i_create_time = i_create_time;
	}
	public Date getI_modify_time() {
		return i_modify_time;
	}
	public void setI_modify_time(Date i_modify_time) {
		this.i_modify_time = i_modify_time;
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
