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
import com.shengxi.model.User;
import com.shengxi.service.CutTypeService;
import com.shengxi.service.IAccountHistoryService;
import com.shengxi.service.IAccountService;
import com.shengxi.service.PostService;
import com.shengxi.service.UserService;
import com.shengxi.showmodel.PostUser;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import tools.BmUtil;
import tools.StringTool;

@Controller("postController")
@RequestMapping("/post/*")
public class PostController extends MultiActionController {
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
	@Qualifier("postService")
	private PostService postService;
	
	
	
	@RequestMapping("change.do")
	public void change(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");

		boolean issuc = false;
		String msg = "修改失败";
		try {
			String type = req.getParameter("type")==null?"":req.getParameter("type");
			String post_id = req.getParameter("post_id")==null?"0":req.getParameter("post_id");
			String post_table = req.getParameter("post_table")==null?"":req.getParameter("post_table");
	
			int status = 0;
			if("pass".equals(type)||"yes".equals(type)){
				
				status=0;
				if("zl_tel".equals(post_table)){//只有便民做此检查
					if(postService.ifExistValidBM(post_table,post_id)==0){
						issuc=postService.update(post_id,status,post_table);
					}else{
						msg="为避免信息重复，目前一个便民电话只能拥有一条便民信息。";
					}
				}else{
					issuc=postService.update(post_id,status,post_table);
				}

			}else if("no".equals(type)){
				status=-1;
				if(postService.ifAutoFlushing(post_table,post_id)!=1){
					issuc=postService.update(post_id,status,post_table);
				}else{
					msg="该帖子已经订购了刷新业务，不能由客服禁用，只能由用户禁用。";
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
		String post_tel = req.getParameter("post_tel")==null?"":req.getParameter("post_tel");
		String title = req.getParameter("title")==null?"":req.getParameter("title");
		String type = req.getParameter("type")==null?"":req.getParameter("type");
		String status = req.getParameter("status")==null?"":req.getParameter("status");
		String orderby = req.getParameter("orderby")==null?"":req.getParameter("orderby");
		

		int firstResult = Integer.parseInt(req.getParameter("start"));
		int maxResults = firstResult + Integer.parseInt(req.getParameter("limit"));
		
		JSONArray root = new JSONArray();
		try {
			List<PostUser> list = postService.findAll(orderby,tel,post_tel, title,type,status,firstResult, maxResults);
			for(PostUser post: list) {
				
				if(post == null) continue;
				
				User u = userService.findByTel(post.getUser_tel());
				if(u==null){
					u=new User();
					u.setId("0");
					u.setStatus(-1);
					u.setUsername("---BUG---");
				}
				JSONObject json = new JSONObject();
				
				json.put("user_tel", StringTool.null2Empty(post.getUser_tel()));
				json.put("user_id", u.getId());
				json.put("user_status",u.getStatus());
				json.put("user_name", StringTool.null2Empty(u.getUsername()));
				
				json.put("post_table", StringTool.null2Empty(post.getPost_table()));
				json.put("post_id", post.getPost_id());
				json.put("post_title", StringTool.null2Empty(post.getPost_title()));
				if(20==post.getPost_status()){
					post.setPost_status(0);
				}
				json.put("post_status", post.getPost_status());
				json.put("post_tel", post.getPost_tel());	
				json.put("post_create_time", BmUtil.formatDate(post.getCreate_time()));
				json.put("post_modify_time", BmUtil.formatDate(post.getModify_time()));
				json.put("post_build_time", BmUtil.formatDate(post.getBuild_time()));
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
			String user_tel = req.getParameter("user_tel")==null?"":req.getParameter("user_tel");

			String post_table = req.getParameter("post_table")==null?"0":req.getParameter("post_table");	
			String post_id = req.getParameter("post_id")==null?"0":req.getParameter("post_id");
			String post_title = req.getParameter("post_title")==null?"0":req.getParameter("post_title");
			
			String cutTypeId = req.getParameter("cutTypeId")==null?"":req.getParameter("cutTypeId");
			String unit_num_str = req.getParameter("unit_num")==null?"":req.getParameter("unit_num");
			
			int unit_num = Integer.parseInt(unit_num_str);
			CutType ct = cutTypeService.findById(cutTypeId);
			int cutmoney = ct.getUnit_price()*unit_num; //该类型该周期的价格*N个周期 
		   
			IAccount iaccount = iaccountService.findByTel(user_tel);
			
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
					
					int fullWeeks = ct.getUnit_contain_weeks()*unit_num;
					boolean issus2 = postService.updatePublishDate(fullWeeks,post_table,post_id);
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
						
						//帖子
						history.setPost_id(Long.parseLong(post_id));
						history.setPost_table(post_table);
						history.setPost_title(post_title);
						iaccountHistoryService.save(history);
						
						iaccount.setMoney_now(money_now);
						iaccount.setMoney_cut(money_cut);
						iaccount.setIntegral_cut(integral_cut);
						issuc = iaccountService.update(iaccount);
					}

				}
			}

//			if("marriage_valid".equals(ct.getType())){
//				//婚恋是线下操作，不需要修改表中的记录，只需要在历史表登记有这个支出即可。
//			}else if("company_valid".equals(ct.getType())){
//				//商铺需要修改商铺的开始时间和结束时间，而且要通知到用户。需要注意unit_contain_weeks可能需要时间乘起来

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

}
