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

import com.shengxi.model.Company;
import com.shengxi.model.CutType;
import com.shengxi.model.IAccount;
import com.shengxi.model.IAccountHistory;
import com.shengxi.model.Operator;
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
			if("yes".equals(type)){
				status=0;
				issuc=companyService.update(company_id,status);
			}else if("no".equals(type)){
				status=-1;
				if(companyService.isValiding(company_id)!=1){
					issuc=companyService.update(company_id,status);
				}else{
					msg="该商户正在有效期内，不能由客服禁用，请联系后端工程师处理。";
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
		String title = req.getParameter("title")==null?"":req.getParameter("title");
		String type = req.getParameter("type")==null?"":req.getParameter("type");
		String status = req.getParameter("status")==null?"":req.getParameter("status");

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
				json.put("company_valid_time", BmUtil.formatDate(company.getValid_time()));
				json.put("create_operator_id",company.getCreate_operator_id());
				
				if(company.getValid_time().getTime()> new Date().getTime()){
					json.put("isvalid", "0");
				}else{
					json.put("isvalid", "-1");
				}
				
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
	
	
	@RequestMapping("paySubmit.do")
	public void paySubmit(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");
		
		boolean issuc = false;
		String msg = "支付失败，请通知技术部门";
		
		try {
			System.out.println(req.getParameter("company_id"));
			
			String company_id = req.getParameter("company_id")==null?"0":req.getParameter("company_id");
			System.out.println(company_id);
			Company company = companyService.findById(company_id);
			String cutTypeId = req.getParameter("cutTypeId")==null?"":req.getParameter("cutTypeId");
			String unit_num_str = req.getParameter("unit_num")==null?"":req.getParameter("unit_num");
			
			int unit_num = Integer.parseInt(unit_num_str);
			CutType ct = cutTypeService.findById(cutTypeId);
			int cutmoney = ct.getUnit_price()*unit_num; //该类型该周期的价格*N个周期 
		   
			IAccount iaccount = iaccountService.findByTel(company.getUserid());
			
			if(iaccount == null ) {
				msg="请先给客户充值";
				issuc=false;
			}else{
				int money_now = iaccount.getMoney_now()-cutmoney;
				int money_cut = iaccount.getMoney_cut()+cutmoney;
				int integral_cut =iaccount.getIntegral_cut()+ cutmoney;
				if(money_now<0){
					msg="该客户的余额不足，无法执行该操作";
					issuc=false;
				}else{
					
					int fullWeeks = ct.getUnit_contain_weeks()*unit_num;
					boolean issus2 = companyService.updateValidDate(fullWeeks,company_id);
					if(issus2){

						IAccountHistory history = new IAccountHistory();
						history.setMoney_change(0-cutmoney);
						Operator operator =(Operator) req.getSession().getAttribute("user");
						history.setOperator_id(operator.getId());
						history.setUserid(iaccount.getUserid());
						history.setAccount_id(Long.parseLong(iaccount.getId()));
						history.setCuttype_id(ct.getId());
						history.setCuttype_type(ct.getType());
						history.setUnit_num(unit_num);
						
						//商户
						history.setPost_id(Long.parseLong(company_id));
						history.setPost_title(company.getName());
						iaccountHistoryService.save(history);
						
						iaccount.setMoney_now(money_now);
						iaccount.setMoney_cut(money_cut);
						iaccount.setIntegral_cut(integral_cut);
						issuc = iaccountService.update(iaccount);
					}

				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (issuc) {
				msg = "支付成功";
			}
			
			JSONObject rootJson = new JSONObject();
			rootJson.put("success", true);
			rootJson.put("issuc", issuc);
			rootJson.put("msg", msg);
			
			logger.info(rootJson);
			resp.getWriter().print(rootJson);
		}
	}
	
	
	@RequestMapping("save.do")
	public void save(HttpServletRequest req, HttpServletResponse resp)
			throws Exception {

		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");
		
		boolean issuc = false;
		String msg = "添加失败";
		try {
			Operator operator = (Operator) req.getSession().getAttribute("user");
			
				String company_name = req.getParameter("company_name");
				String company_userid = req.getParameter("company_userid");
				User u = userService.findByTel(company_userid);
				if(u==null){
					msg = "添加失败，手机号【" + company_name + "】尚未注册。";
				}else{
					
					if(companyService.isExist(company_name)) {
						msg = "添加失败，商户【" + company_name + "】已经存在。";
					} else {
						Company c = new Company();
						c.setName(company_name);
						String company_leixing = req.getParameter("company_leixing");
						String company_short_name = req.getParameter("company_short_name");
						issuc = companyService.createCompany(company_userid,company_userid,company_leixing,company_name,company_short_name,operator);
					}
					
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
}
