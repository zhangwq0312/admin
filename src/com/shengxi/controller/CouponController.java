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

import com.shengxi.dao.CouponDao;
import com.shengxi.model.Company;
import com.shengxi.model.Coupon;
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

@Controller("couponController")
@RequestMapping("/coupon/*")
public class CouponController extends MultiActionController {
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
	@Qualifier("couponDao")
	private CouponDao couponDao;
	
	@Autowired
	@Qualifier("companyService")
	private CompanyService companyService;
	
	@RequestMapping("query.do")
	public void queryHandler(HttpServletRequest req, HttpServletResponse resp)
			throws Exception {
		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");

		String tel = req.getParameter("tel")==null?"":req.getParameter("tel");
		String company_name = req.getParameter("company_name")==null?"":req.getParameter("company_name");
		String type = req.getParameter("type")==null?"":req.getParameter("type");
		String status = req.getParameter("status")==null?"":req.getParameter("status");

		int firstResult = Integer.parseInt(req.getParameter("start"));
		int maxResults = firstResult + Integer.parseInt(req.getParameter("limit"));
		
		JSONArray root = new JSONArray();
		try {
			List<Coupon> list = couponDao.findAll(tel,company_name,type,status,firstResult, maxResults);
			for(Coupon coupon: list) {
				
				JSONObject json = new JSONObject();

				json.put("o_id",coupon.getId());
				json.put("company_userid", StringTool.null2Empty(coupon.getUserid()));
				json.put("company_id",coupon.getCompany_id());
				json.put("company_name",StringTool.null2Empty(coupon.getCompany_name()));
				
				json.put("big", StringTool.null2Empty(coupon.getBig()));
				json.put("small", StringTool.null2Empty(coupon.getSmall()));
				json.put("description", StringTool.null2Empty(coupon.getDescription()));
				
				json.put("total_num",coupon.getTotal_num());
				json.put("rest_num",coupon.getRest_num());
				
				json.put("coupon_status", coupon.getStatus());
				json.put("coupon_create_time", BmUtil.formatDate(coupon.getCreate_time()));
				json.put("coupon_start_time", BmUtil.formatDate(coupon.getStart_time()));
				json.put("coupon_end_time", BmUtil.formatDate(coupon.getEnd_time()));
				json.put("coupon_publish_start_time", BmUtil.formatDate(coupon.getPublish_start_time()));
				json.put("coupon_publish_end_time", BmUtil.formatDate(coupon.getPublish_end_time()));
				
				if(coupon.getPublish_start_time().getTime()< new Date().getTime() 
					&& coupon.getPublish_end_time().getTime()> new Date().getTime() ){
					json.put("coupon_type", "1");
				}else if(coupon.getPublish_start_time().getTime()>= new Date().getTime()){
					json.put("coupon_type", "2");
				}else if(coupon.getPublish_end_time().getTime()<= new Date().getTime()){
					json.put("coupon_type", "3");
				}else {
					json.put("coupon_type", "-1");
				}

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
	
	

	@RequestMapping("save.do")
	public void save(HttpServletRequest req, HttpServletResponse resp)
			throws Exception {

		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");
		
		boolean issuc = false;
		String msg = "添加失败";
		try {
//			String o_id = req.getParameter("o_id");
			String company_id = req.getParameter("company_id");
			Company company = companyService.findById(company_id);
			
			String big = req.getParameter("big");
			String small = req.getParameter("small");
			String description = req.getParameter("description");
			String total_num = req.getParameter("total_num");
			String rest_num = req.getParameter("rest_num");
			String coupon_status = req.getParameter("coupon_status");
//			String coupon_create_time = req.getParameter("coupon_create_time");
			String coupon_start_time = req.getParameter("coupon_start_time");
			String coupon_end_time = req.getParameter("coupon_end_time");
			String coupon_publish_start_time = req.getParameter("coupon_publish_start_time");
			String coupon_publish_end_time = req.getParameter("coupon_publish_end_time");
			
			User u = userService.findByTel(company.getUserid());
			if(u==null){
				msg = "添加失败，手机号【" + company.getUserid() + "】尚未注册。";
			}else{
				Coupon o = new Coupon();
				o.setCompany_id(Long.parseLong(company_id));
				o.setCompany_name(company.getName());
				o.setUserid(company.getUserid());
//				o.setId(id);
//				o.setOrderno(orderno);
				o.setBig(big);
				o.setSmall(small);
				o.setDescription(description);
				o.setTotal_num(Integer.parseInt(total_num));
				o.setRest_num(Integer.parseInt(rest_num));
				
				o.setStatus(Integer.parseInt(coupon_status));
				
				o.setCreate_time(new Date());
				o.setStart_time(BmUtil.parseDate(coupon_start_time));
				o.setEnd_time(BmUtil.parseDate(coupon_end_time));
				o.setPublish_start_time(BmUtil.parseDate(coupon_publish_start_time));
				o.setPublish_end_time(BmUtil.parseDate(coupon_publish_end_time));
				
				issuc = couponDao.save(o);
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
	public void update(HttpServletRequest req, HttpServletResponse resp)
			throws Exception {

		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");
		
		boolean issuc = false;
		String msg = "修改失败";
		try {
			String o_id = req.getParameter("o_id");
			String company_id = req.getParameter("company_id");
			String big = req.getParameter("big");
			String small = req.getParameter("small");
			String description = req.getParameter("description");
			String total_num = req.getParameter("total_num");
			String rest_num = req.getParameter("rest_num");
			String coupon_status = req.getParameter("coupon_status");
			String coupon_start_time = req.getParameter("coupon_start_time");
			String coupon_end_time = req.getParameter("coupon_end_time");
			String coupon_publish_start_time = req.getParameter("coupon_publish_start_time");
			String coupon_publish_end_time = req.getParameter("coupon_publish_end_time");
			
			Coupon o = couponDao.findById(o_id);
			o.setCompany_id(Long.parseLong(company_id));
			Company company = companyService.findById(company_id);
			o.setCompany_name(company.getName());
			o.setUserid(company.getUserid());
			o.setBig(big);
			o.setSmall(small);
			o.setDescription(description);
			o.setTotal_num(Integer.parseInt(total_num));
			o.setRest_num(Integer.parseInt(rest_num));
			o.setStatus(Integer.parseInt(coupon_status));
			o.setStart_time(BmUtil.parseDate(coupon_start_time));
			o.setEnd_time(BmUtil.parseDate(coupon_end_time));
			o.setPublish_start_time(BmUtil.parseDate(coupon_publish_start_time));
			o.setPublish_end_time(BmUtil.parseDate(coupon_publish_end_time));
			
			issuc = couponDao.update(o);
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
}
