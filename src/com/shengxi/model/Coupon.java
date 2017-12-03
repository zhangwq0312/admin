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
@ITable(name = "z_coupon")
public class Coupon implements Serializable {

	@IId
	private long id;
	private String userid;
	
	private String big;
	private String small;
	private String description;
	private int total_num ;
	private int rest_num ;
	
	private long company_id;
	private String company_name;

	private Date start_time;
	private Date end_time;
	private Date create_time;
	private Date publish_start_time;
	private Date publish_end_time;

	private int status ;
	@IField(update = false)
	private long orderno;

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

	public String getBig() {
		return big;
	}

	public void setBig(String big) {
		this.big = big;
	}

	public String getSmall() {
		return small;
	}

	public void setSmall(String small) {
		this.small = small;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public long getCompany_id() {
		return company_id;
	}

	public void setCompany_id(long company_id) {
		this.company_id = company_id;
	}

	public String getCompany_name() {
		return company_name;
	}

	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}

	public Date getStart_time() {
		return start_time;
	}

	public void setStart_time(Date start_time) {
		this.start_time = start_time;
	}

	public Date getEnd_time() {
		return end_time;
	}

	public void setEnd_time(Date end_time) {
		this.end_time = end_time;
	}

	public Date getCreate_time() {
		return create_time;
	}

	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}

	public Date getPublish_start_time() {
		return publish_start_time;
	}

	public void setPublish_start_time(Date publish_start_time) {
		this.publish_start_time = publish_start_time;
	}

	public Date getPublish_end_time() {
		return publish_end_time;
	}

	public void setPublish_end_time(Date publish_end_time) {
		this.publish_end_time = publish_end_time;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getTotal_num() {
		return total_num;
	}

	public void setTotal_num(int total_num) {
		this.total_num = total_num;
	}

	public int getRest_num() {
		return rest_num;
	}

	public void setRest_num(int rest_num) {
		this.rest_num = rest_num;
	}

	public long getOrderno() {
		return orderno;
	}

	public void setOrderno(long orderno) {
		this.orderno = orderno;
	}
	

}
