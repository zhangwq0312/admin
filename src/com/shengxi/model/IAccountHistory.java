package com.shengxi.model;

import java.io.Serializable;
import java.util.Date;

import com.shengxi.common.annotation.IId;
import com.shengxi.common.annotation.ITable;

@SuppressWarnings("serial")
@ITable(name = "i_account_history")
public class IAccountHistory implements Serializable {
	@IId
	private String id;
	private String userid;
	private long account_id;
	private int money_change;
	private String cuttype_type;
	private long cuttype_id;
	private int unit_num;
	private Date create_time;
	private String operator_id;
	private String post_table;
	private long post_id;
	private String post_title;

	public String getPost_table() {
		return post_table;
	}
	public void setPost_table(String post_table) {
		this.post_table = post_table;
	}
	public long getPost_id() {
		return post_id;
	}
	public void setPost_id(long post_id) {
		this.post_id = post_id;
	}
	public String getPost_title() {
		return post_title;
	}
	public void setPost_title(String post_title) {
		this.post_title = post_title;
	}
	public String getCuttype_type() {
		return cuttype_type;
	}
	public void setCuttype_type(String cuttype_type) {
		this.cuttype_type = cuttype_type;
	}
	public long getCuttype_id() {
		return cuttype_id;
	}
	public void setCuttype_id(long cuttype_id) {
		this.cuttype_id = cuttype_id;
	}
	public int getUnit_num() {
		return unit_num;
	}
	public void setUnit_num(int unit_num) {
		this.unit_num = unit_num;
	}
	public long getAccount_id() {
		return account_id;
	}
	public void setAccount_id(long account_id) {
		this.account_id = account_id;
	}
	public String getOperator_id() {
		return operator_id;
	}
	public void setOperator_id(String operator_id) {
		this.operator_id = operator_id;
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
	public int getMoney_change() {
		return money_change;
	}
	public void setMoney_change(int money_change) {
		this.money_change = money_change;
	}
	public Date getCreate_time() {
		return create_time;
	}
	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	} 
}
