package com.shengxi.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import tools.BmUtil;
import tools.StringTool;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.shengxi.model.Role;
import com.shengxi.service.RoleService;

@Controller("roleController")
@RequestMapping("/role/*")
public class RoleController extends MultiActionController {

	@Autowired
	@Qualifier("roleService")
	private RoleService roleService;

	@RequestMapping("query_all.do")
	public void queryAllRole(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");

		JSONArray rootArr = new JSONArray();
		try {
			List<Role> list = roleService.findAll();
			
			if(list != null && list.size() > 0) {
				JSONObject colJson = null;
				for(Role role: list) {
					if(role == null) continue;
					
					colJson = new JSONObject();
					
					colJson.put("r_id", role.getId());
					colJson.put("r_name", role.getName());
					rootArr.add(colJson);
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			JSONObject root = new JSONObject();
			root.put("data", rootArr);
			resp.getWriter().print(root);
		}
	}
	
	@RequestMapping("query.do")
	public void queryHandler(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");

		int firstResult = Integer.parseInt(req.getParameter("start"));
		int maxResults = firstResult + Integer.parseInt(req.getParameter("limit"));

		JSONArray rootArr = new JSONArray();
		long total = 0;
		try {
			List<Role> list = roleService.findAll(firstResult, maxResults);
			if(list != null && list.size() > 0) {
				for(Role role: list) {
					if(role == null) continue;
					
					rootArr.add(parserRole(role));
				}
			}
			
			total = roleService.countAll();
			
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
		} finally {
			JSONObject root = new JSONObject();
			root.put("total", total);
			root.put("data", rootArr);
			
			logger.info(root);
			resp.getWriter().print(root);
		}
	}
	
	@RequestMapping("save.do")
	public void saveHandler(HttpServletRequest req, HttpServletResponse resp)
			throws Exception {
		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");
		
		boolean issuc = false;
		String msg = "添加失败";
		try {
			
			if (BmUtil.isAdminOperator(req)) {
				Role role = new Role();
				updateRole(role, req);
				if(roleService.isExist(role)) {
					msg = "角色【"+role.getName()+"】已存在。";
					throw new Exception(msg);
				} else {
					issuc = roleService.save(role);
				}
			} else {
				msg = "非Admin用户不能添加";
				throw new Exception(msg);
			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (issuc) {
				msg = "添加成功";
			}
			JSONObject rootJson = new JSONObject();
			rootJson.put("success", true);
			rootJson.put("issuc", issuc);
			rootJson.put("msg", msg);

			logger.info(rootJson);
			resp.getWriter().print(rootJson);
		}
	}
	
	@RequestMapping("update.do")
	public void updateHandler(HttpServletRequest req, HttpServletResponse resp)
			throws Exception {
		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");
		
		boolean issuc = false;
		String msg = "修改失败";
		try {
			
			if (BmUtil.isAdminOperator(req)) {
				Role role = new Role();
				role.setId(req.getParameter("o_id"));
				updateRole(role, req);
				if(roleService.isExist(role)) {
					msg = "角色【"+role.getName()+"】已存在。";
					throw new Exception(msg);
				} else {
					issuc = roleService.update(role);
				}
			} else {
				msg = "非Admin用户不能修改";
				throw new Exception(msg);
			}
		   
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (issuc) {
				msg = "修改成功";
			}
			
			JSONObject rootJson = new JSONObject();
			rootJson.put("success", true);
			rootJson.put("issuc", issuc);
			rootJson.put("msg", msg);
			
			logger.info(rootJson);
			resp.getWriter().print(rootJson);
		}
	}
	
	@RequestMapping("del.do")
	public void delHandler(HttpServletRequest req, HttpServletResponse resp)
			throws Exception {
		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");
		
		boolean issuc = false;
		String msg = "删除失败";
		try {
			
			if (BmUtil.isAdminOperator(req)) {
				issuc = roleService.deleteById(req.getParameter("r_id"));
				if (!issuc){
					msg = "删除失败!角色已分配给用户！";
				}
			} else {
				msg = "非Admin用户不能删除";
			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (issuc) {
				msg = "删除成功";
			}
			
			JSONObject rootJson = new JSONObject();
			rootJson.put("success", true);
			rootJson.put("issuc", issuc);
			rootJson.put("msg", msg);

			logger.info(rootJson);
			resp.getWriter().print(rootJson);
		}
	}
	
	private JSONObject parserRole(Role role) {
		
		if(role == null) return null;
		
		JSONObject colJson = new JSONObject();
		
		colJson.put("r_id", role.getId());
		colJson.put("name", StringTool.null2Empty(role.getName()));
		colJson.put("module_ids", StringTool.null2Empty(role.getModule_ids()));
		colJson.put("module_names", StringTool.null2Empty(role.getModule_names()));
		colJson.put("create_time", BmUtil.formatDate(role.getCreate_time()));
		colJson.put("modify_time", BmUtil.formatDate(role.getUpdate_time()));
		
		return colJson;
	}
	
	private void updateRole(Role role, HttpServletRequest req) {
		
		try {
			role.setName(req.getParameter("name"));
			role.setModule_ids(req.getParameter("module_ids"));
			role.setModule_names(req.getParameter("module_names"));  
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

}
