package com.shengxi.controller;

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
	
	@RequestMapping("cutMoney.do")
	public void cutMoney(HttpServletRequest req, HttpServletResponse resp)
			throws Exception {

		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");
		
		boolean issuc = false;
		String msg = "扣费失败，请通知技术部门";
		try {
			String idStr = req.getParameter("i_id")==null?"0":req.getParameter("i_id");
			
			String cutTypeId = req.getParameter("cutTypeId")==null?"0":req.getParameter("cutTypeId");
			String unit_num_str = req.getParameter("unit_num")==null?"0":req.getParameter("unit_num");
			int unit_num = Integer.parseInt(unit_num_str);
			CutType ct = cutTypeService.findById(cutTypeId);
			int cutmoney = ct.getUnit_price()*unit_num; //该类型该周期的价格*N个周期 
		   
			IAccount iaccount = iaccountService.findById(idStr);
			
			if(iaccount == null ) {
				msg="请先给客服充值";
				issuc=false;
			}else{
				int money_now = iaccount.getMoney_now()-cutmoney;
				int money_cut = iaccount.getMoney_cut()+cutmoney;
				int integral_cut =iaccount.getIntegral_cut()+ cutmoney;
				if(money_now<0){
					msg="该客户的余额不足，无法执行该操作";
					issuc=false;
				}else{
					
					IAccountHistory history = new IAccountHistory();
					history.setMoney_change(0-cutmoney);
					Operator operator =(Operator) req.getSession().getAttribute("user");
					history.setOperator_id(operator.getId());
					history.setUserid(iaccount.getUserid());
					history.setAccount_id(Long.parseLong(idStr));
					history.setCuttype_id(ct.getId());
					history.setCuttype_type(ct.getType());
					history.setUnit_num(unit_num);
					iaccountHistoryService.save(history);
					
					//执行具体的业务，如果账户表和账户历史表的记录不一致，可能是下面执行业务的操作出了错误，
					if("hunlian".equals(ct.getType())){
						//婚恋是线下操作，不需要修改表中的记录，只需要在历史表登记有这个支出即可。
					}else if("shangpu".equals(ct.getType())){
						//商铺需要修改商铺的开始时间和结束时间，而且要通知到用户。需要注意unit_contain_weeks可能需要时间乘起来
					}else if("flush".equals(ct.getType())){
						//刷新要指明是哪个帖子，时间从当前时间开始。
					}
					
					iaccount.setMoney_now(money_now);
					iaccount.setMoney_cut(money_cut);
					iaccount.setIntegral_cut(integral_cut);
					issuc = iaccountService.update(iaccount);
				}
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