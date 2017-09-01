package com.shengxi.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.shengxi.model.Company;
import com.shengxi.model.User;
import com.shengxi.service.CompanyService;
import com.shengxi.service.CutTypeService;
import com.shengxi.service.IAccountHistoryService;
import com.shengxi.service.IAccountService;
import com.shengxi.service.UserService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import tools.BmUtil;
import tools.StringTool;

@Controller("companyController")
@RequestMapping("/company/*")
public class CompanyController extends MultiActionController {
	@Autowired
	@Qualifier("userService")
	private UserService userService;

	@Autowired
	@Qualifier("iaccountService")
	private IAccountService iaccountService;
	
	@Autowired
	@Qualifier("iaccountHistoryService")
	private IAccountHistoryService iaccountHistoryService;
	
	@Autowired
	@Qualifier("cutTypeService")
	private CutTypeService cutTypeService;
	
	@Autowired
	@Qualifier("companyService")
	private CompanyService companyService;
	
	
	
	@RequestMapping("change.do")
	public void change(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");

		boolean issuc = false;
		String msg = "修改失败";
		try {
			String type = req.getParameter("type")==null?"":req.getParameter("type");
			String company_id = req.getParameter("company_id")==null?"0":req.getParameter("company_id");
	
			int status = 0;
			if("pass".equals(type)){
				status=0;
			}else if("yes".equals(type)){
				status=0;
			}else if("no".equals(type)){
				status=-1;
			}
			issuc=companyService.update(company_id,status);

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
	@RequestMapping("query.do")
	public void queryHandler(HttpServletRequest req, HttpServletResponse resp)
			throws Exception {
		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");

		String tel = req.getParameter("tel")==null?"":req.getParameter("tel");
		String title = req.getParameter("title")==null?"":req.getParameter("title");
		String type = req.getParameter("type")==null?"":req.getParameter("type");
		String status = req.getParameter("status")==null?"":req.getParameter("status");
		String orderby = req.getParameter("orderby")==null?"":req.getParameter("orderby");
		

		int firstResult = Integer.parseInt(req.getParameter("start"));
		int maxResults = firstResult + Integer.parseInt(req.getParameter("limit"));
		
		JSONArray root = new JSONArray();
		try {
			List<Company> list = companyService.findAll(tel, title,type,status,firstResult, maxResults);
			for(Company company: list) {
				
				if(company == null) continue;
				
				User u = userService.findByTel(company.getUserid());
				if(u==null){
					u=new User();
					u.setId("0");
					u.setStatus(-1);
					u.setUsername("---BUG---");
				}
				JSONObject json = new JSONObject();

				json.put("company_id",company.getId());
				json.put("company_userid", StringTool.null2Empty(company.getUserid()));
				json.put("company_name",StringTool.null2Empty(company.getName()));
				json.put("company_short_name",StringTool.null2Empty(company.getShort_name()));
				json.put("company_address", StringTool.null2Empty(company.getAddress()));
				json.put("company_tel",StringTool.null2Empty(company.getTel()));
				json.put("company_leixing",StringTool.null2Empty(company.getLeixing()));
				json.put("company_status",company.getStatus());
				json.put("company_create_time", BmUtil.formatDate(company.getCreate_time()));
				json.put("company_modify_time", BmUtil.formatDate(company.getModify_time()));
				json.put("user_name", StringTool.null2Empty(u.getUsername()));

				if(json != null){
					root.add(json);
				}
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			logger.info(root);
			resp.getWriter().print(root);
		}
	}


}
