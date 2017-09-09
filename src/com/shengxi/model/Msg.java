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
@ITable(name = "t_leave_msg")
public class Msg implements Serializable {

	@IId
	private long id;
	private String type;
	private String from_tel;
	private String to_tel;
	private String person;
	private String qq;
	private String description;
	private String reply;
	private int status;

	@IField(update = false)
	private Date create_time;
	private Date reply_time;
	private long reply_operator_id;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getFrom_tel() {
		return from_tel;
	}
	public void setFrom_tel(String from_tel) {
		this.from_tel = from_tel;
	}
	public String getTo_tel() {
		return to_tel;
	}
	public void setTo_tel(String to_tel) {
		this.to_tel = to_tel;
	}
	public String getPerson() {
		return person;
	}
	public void setPerson(String person) {
		this.person = person;
	}
	public String getQq() {
		return qq;
	}
	public void setQq(String qq) {
		this.qq = qq;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getReply() {
		return reply;
	}
	public void setReply(String reply) {
		this.reply = reply;
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
	public Date getReply_time() {
		return reply_time;
	}
	public void setReply_time(Date reply_time) {
		this.reply_time = reply_time;
	}
	public long getReply_operator_id() {
		return reply_operator_id;
	}
	public void setReply_operator_id(long reply_operator_id) {
		this.reply_operator_id = reply_operator_id;
	}
}
