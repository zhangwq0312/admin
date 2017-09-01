package com.shengxi.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.shengxi.model.CutType;
import com.shengxi.model.IAccount;
import com.shengxi.model.IAccountHistory;
import com.shengxi.model.Operator;
import com.shengxi.service.CutTypeService;
import com.shengxi.service.IAccountHistoryService;
import com.shengxi.service.IAccountService;
import com.shengxi.service.UserService;
import com.shengxi.showmodel.MoneyUser;
import com.shengxi.showmodel.PostUser;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import tools.BmUtil;
import tools.StringTool;

@Controller("userController")
@RequestMapping("/user/*")
public class UserController extends MultiActionController {
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
	
	
	@RequestMapping("queryAccountHistory.do")
	public void queryAccountHistory(HttpServletRequest req, HttpServletResponse resp)	throws Exception {

		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");
		
		boolean issuc = false;
		String msg = "修改失败";
		
		JSONArray root = new JSONArray();
		try {
			
			String idStr = req.getParameter("i_id")==null?"0":req.getParameter("i_id");
			String type = req.getParameter("type")==null?"":req.getParameter("type");
			int firstResult = Integer.parseInt(req.getParameter("start"));
			int maxResults = firstResult + Integer.parseInt(req.getParameter("limit"));
			
			List<IAccountHistory> hs = iaccountHistoryService.findByAccountId(firstResult,maxResults,idStr,type);
			
			for(IAccountHistory h: hs) {
				if(h == null) continue;
				
				CutType ct = new CutType();
				if("cut".equals(type)){
					ct = cutTypeService.findById(String.valueOf(h.getCuttype_id()));
				}

				
				
				JSONObject json = new JSONObject();
				json.put("h_id", h.getId());
				json.put("userid", h.getUserid());
				json.put("account_id", h.getAccount_id());
				json.put("money_change",h.getMoney_change());
				
				if("cut".equals(type)){
					json.put("cuttype_type", StringTool.null2Empty(h.getCuttype_type()));
					json.put("cuttype_id", h.getCuttype_id());
					json.put("unit_num", h.getUnit_num());
					String cut_reason = h.getUnit_num()+"份“"+ct.getName()+"”业务，单价"+ct.getUnit_price()+"元，合计"+h.getUnit_num()*ct.getUnit_price()+"元";
					json.put("cut_reason", cut_reason);
					
					json.put("post_table", StringTool.null2Empty(h.getPost_table()));
					json.put("post_id", h.getPost_id());
					json.put("post_title", StringTool.null2Empty(h.getPost_title()));
				}
				
				json.put("create_time", BmUtil.formatDate(h.getCreate_time()));
				json.put("operator_id", h.getOperator_id());
				
				if(json != null){
					root.add(json);
				}
			}
			issuc=true;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			
			logger.info(root);
			resp.getWriter().print(root);
		}
			
	}
	@RequestMapping("addMoney.do")
	public void addMoney(HttpServletRequest req, HttpServletResponse resp)
			throws Exception {

		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");
		
		boolean issuc = false;
		String msg = "修改失败";
		try {
			String idStr = req.getParameter("i_id")==null?"0":req.getParameter("i_id");
			String tel = req.getParameter("tel")==null?"0":req.getParameter("tel");
			String addmoneyStr = req.getParameter("addmoney")==null?"0":req.getParameter("addmoney");
			
			if(Integer.parseInt(addmoneyStr)>0&&!"0".equals(tel)&&!"0".equals(idStr)){
				int addmoney = Integer.parseInt(addmoneyStr);
				   
				IAccount iaccount = iaccountService.findById(idStr);
				
				if(iaccount != null ) {
					iaccount.setMoney_now(iaccount.getMoney_now()+addmoney);
					iaccount.setMoney_add(iaccount.getMoney_add()+addmoney);
					issuc = iaccountService.update(iaccount);
				}else{
					iaccount = new IAccount();
					iaccount.setId(idStr);
					iaccount.setUserid(tel);
					iaccount.setMoney_now(iaccount.getMoney_now()+addmoney);
					iaccount.setMoney_add(iaccount.getMoney_add()+addmoney);
					iaccount.setMoney_cut(0);
					iaccount.setIntegral_cut(0);
					issuc = iaccountService.save(iaccount);
				}
				IAccountHistory history = new IAccountHistory();
				history.setMoney_change(addmoney);
				Operator operator =(Operator) req.getSession().getAttribute("user");
				history.setOperator_id(operator.getId());
				history.setUserid(iaccount.getUserid());
				history.setAccount_id(Long.parseLong(idStr));
				iaccountHistoryService.save(history);
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
	
	@RequestMapping("query.do")
	public void queryHandler(HttpServletRequest req, HttpServletResponse resp)
			throws Exception {
		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");

		String tel = req.getParameter("tel")==null?"":req.getParameter("tel");
		String username = req.getParameter("username")==null?"":req.getParameter("username");
		String status = req.getParameter("status")==null?"":req.getParameter("status");

		int firstResult = Integer.parseInt(req.getParameter("start"));
		int maxResults = firstResult + Integer.parseInt(req.getParameter("limit"));
		
		JSONArray root = new JSONArray();
		try {
			List<MoneyUser> list = userService.findAll(tel, username,status,firstResult, maxResults);
			JSONObject json = null;

			for(MoneyUser user: list) {
				json = parserColumn(user);
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


	private JSONObject parserColumn(MoneyUser user) {

		if(user == null) return null;

		JSONObject colJson = new JSONObject();

		colJson.put("c_id", user.getId());
		
		colJson.put("tel", StringTool.null2Empty(user.getTel()));
		colJson.put("username", StringTool.null2Empty(user.getUsername()));
		colJson.put("ni", StringTool.null2Empty(user.getNi()));
		colJson.put("status", user.getStatus());
		colJson.put("sex", user.getSex());
		
		colJson.put("mail", StringTool.null2Empty(user.getMail()));
		colJson.put("address", StringTool.null2Empty(user.getAddress()));
		colJson.put("born_day", BmUtil.formatDate(user.getBorn_day()));
		
		colJson.put("create_time", BmUtil.formatDate(user.getCreate_time()));
		colJson.put("modify_time", BmUtil.formatDate(user.getModify_time()));
		
		colJson.put("i_id", user.getI_id());
		colJson.put("money_now", user.getMoney_now());
		colJson.put("money_add", user.getMoney_add());
		colJson.put("money_cut", user.getMoney_cut());
		colJson.put("integral_cut", user.getIntegral_cut());
		
		colJson.put("i_create_time", BmUtil.formatDate(user.getI_create_time()));
		colJson.put("i_modify_time", BmUtil.formatDate(user.getI_modify_time()));
		
		return colJson;
	}
	

}
