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

import com.shengxi.model.Coupon;
import com.shengxi.model.CutType;
import com.shengxi.model.IAccount;
import com.shengxi.model.IAccountHistory;
import com.shengxi.model.Operator;
import com.shengxi.model.User;
import com.shengxi.service.CouponService;
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
	@Qualifier("couponService")
	private CouponService couponService;
	
	
	
	@RequestMapping("change.do")
	public void change(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");

		boolean issuc = false;
		String msg = "修改失败";
		try {
			String type = req.getParameter("type")==null?"":req.getParameter("type");
			String coupon_id = req.getParameter("coupon_id")==null?"0":req.getParameter("coupon_id");
	
			int status = 0;
			if("yes".equals(type)){
				status=0;
				issuc=couponService.update(coupon_id,status);
			}else if("no".equals(type)){
				status=-1;
				if(couponService.isValiding(coupon_id)!=1){
					issuc=couponService.update(coupon_id,status);
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
		String company_name = req.getParameter("company_name")==null?"":req.getParameter("company_name");
		String type = req.getParameter("type")==null?"":req.getParameter("type");
		String status = req.getParameter("status")==null?"":req.getParameter("status");

		int firstResult = Integer.parseInt(req.getParameter("start"));
		int maxResults = firstResult + Integer.parseInt(req.getParameter("limit"));
		
		JSONArray root = new JSONArray();
		try {
			List<Coupon> list = couponService.findAll(tel,company_name,type,status,firstResult, maxResults);
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
			Operator operator = (Operator) req.getSession().getAttribute("user");
			
				String coupon_name = req.getParameter("coupon_name");
				String coupon_userid = req.getParameter("coupon_userid");
				User u = userService.findByTel(coupon_userid);
				if(u==null){
					msg = "添加失败，手机号【" + coupon_userid + "】尚未注册。";
				}else{
					
					if(couponService.isExist(coupon_name)) {
						msg = "添加失败，商户名称【" + coupon_name + "】已经存在。";
					} else {
						Coupon c = new Coupon();
//						c.setName(coupon_name);
						String coupon_leixing = req.getParameter("coupon_leixing");
						String coupon_short_name = req.getParameter("coupon_short_name");
						issuc = couponService.createCoupon(coupon_userid,coupon_userid,coupon_leixing,coupon_name,coupon_short_name,operator);
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
