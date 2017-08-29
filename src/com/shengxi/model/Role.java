package com.shengxi.model;

import java.io.Serializable;
import java.util.Date;

import com.shengxi.common.annotation.IField;
import com.shengxi.common.annotation.IId;
import com.shengxi.common.annotation.ITable;

@SuppressWarnings("serial")
@ITable(name = "zz_roles")
public class Role implements Serializable {

	@IId
	private String id;
	private String name;
	private String module_ids;
	@IField(update=false, save=false)
	private String module_names;

   @IField(update = false)
	private Date create_time;
	private Date update_time;
	
	public String getModule_ids() {
		return module_ids;
	}
	public void setModule_ids(String moduleIds) {
		module_ids = moduleIds;
	}
	public String getModule_names() {
		return module_names;
	}
	public void setModule_names(String moduleNames) {
		module_names = moduleNames;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public Date getCreate_time() {
		return create_time;
	}
	public void setCreate_time(Date createTime) {
		create_time = createTime;
	}
	public Date getUpdate_time() {
		return update_time;
	}
	public void setUpdate_time(Date updateTime) {
		update_time = updateTime;
	}
	
	
}
