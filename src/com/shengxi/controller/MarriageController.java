package com.shengxi.controller;

import java.util.Calendar;
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
import com.shengxi.model.Marriage;
import com.shengxi.model.Operator;
import com.shengxi.model.User;
import com.shengxi.service.CutTypeService;
import com.shengxi.service.IAccountHistoryService;
import com.shengxi.service.IAccountService;
import com.shengxi.service.MarriageService;
import com.shengxi.service.UserService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import tools.BmUtil;
import tools.StringTool;

@Controller("marriageController")
@RequestMapping("/marriage/*")
public class MarriageController extends MultiActionController {
	@Autowired
	@Qualifier("userService")
	private UserService userService;

	@Autowired
	@Qualifier("marriageService")
	private MarriageService service;
	
	
	
	@RequestMapping("change.do")
	public void change(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");

		boolean issuc = false;
		String msg = "修改失败";
		try {
			String type = req.getParameter("type")==null?"":req.getParameter("type");
			String marriage_id = req.getParameter("marriage_id")==null?"0":req.getParameter("marriage_id");
	
			int status = 0;
			if("yes".equals(type)){
				status=0;
				issuc=service.update(marriage_id,status);
			}else if("no".equals(type)){
				status=-1;
				issuc=service.update(marriage_id,status);
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
		String sex = req.getParameter("sex")==null?"":req.getParameter("sex");
		String img = req.getParameter("img")==null?"":req.getParameter("img");
		String status = req.getParameter("status")==null?"":req.getParameter("status");
		String identity = req.getParameter("identity")==null?"":req.getParameter("identity");

		int firstResult = Integer.parseInt(req.getParameter("start"));
		int maxResults = firstResult + Integer.parseInt(req.getParameter("limit"));
		
		JSONArray root = new JSONArray();
		try {
			List<Marriage> list = service.findAll(tel, username,sex,img,status,identity,firstResult, maxResults);
			for(Marriage e: list) {
				
				if(e == null) continue;
				
				User u = userService.findByTel(e.getUserid());
				if(u==null){
					u=new User();
					u.setId("0");
					u.setStatus(-1);
					u.setUsername("---BUG---");
				}
				JSONObject json = new JSONObject();

				json.put("m_id",e.getId());
				json.put("m_userid", StringTool.null2Empty(e.getUserid()));
				json.put("m_tel",StringTool.null2Empty(e.getTel()));
				json.put("m_fullname",StringTool.null2Empty(e.getFullname()));
				json.put("m_sex",StringTool.null2Empty(e.getSex()));
				json.put("m_born_time",BmUtil.formatDate(e.getBorn_time()));
				json.put("m_age",e.getBorn_time()==null?"":getAge(e.getBorn_time()));
				json.put("m_education",StringTool.null2Empty(e.getEducation()));
				json.put("m_address", StringTool.null2Empty(e.getAddress()));
				json.put("m_job", StringTool.null2Empty(e.getJob()));
				json.put("m_message", StringTool.null2Empty(e.getMessage()));
				json.put("m_identity", e.getIdentity());
				json.put("m_photo", e.getPhoto());
				json.put("m_status", e.getStatus());
				json.put("create_time", BmUtil.formatDate(e.getCreate_time()));
				json.put("modify_time", BmUtil.formatDate(e.getModify_time()));
				json.put("create_operator_id",e.getCreate_operator_id());
				
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
			String m_tel= req.getParameter("m_tel");
			String m_fullname= req.getParameter("m_fullname");
			String m_sex= req.getParameter("m_sex");
			String m_born_time= req.getParameter("m_born_time");
			String m_education= req.getParameter("m_education");
			String m_job= req.getParameter("m_job");
			String m_address= req.getParameter("m_address");
			String m_message= req.getParameter("m_message");
			String m_identity= req.getParameter("m_identity")==""?"-1":req.getParameter("m_identity");
			String m_photo= req.getParameter("m_photo")==""?"2":req.getParameter("m_photo");
			
			 Operator user = (Operator) req.getSession().getAttribute("user");
			 
					if(service.isExist(m_tel,m_fullname)) {
						msg = "添加失败，【" + m_tel+" , "+m_fullname + "】已经存在。";
					} else {
						Marriage c = new Marriage();
						c.setTel(m_tel);
						c.setAddress(m_address);
						c.setBorn_time(BmUtil.parseDate(m_born_time+"-01-01 00:00:00"));
						c.setCreate_operator_id(Long.parseLong(user.getId()));
						c.setCreate_time(new Date());
						c.setEducation(m_education);
						c.setFullname(m_fullname);
						c.setIdentity(Integer.parseInt(m_identity));
						c.setJob(m_job);
						c.setMessage(m_message);
						c.setModify_time(new Date());
						c.setPhoto(Integer.parseInt(m_photo));
						c.setSex(m_sex);
						c.setStatus(0);
						c.setUserid("0");//目前没有开放由客户来创建婚恋信息
						
						issuc = service.save(c);
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
			String m_id= req.getParameter("m_id");
			String m_education= req.getParameter("m_education");
			String m_job= req.getParameter("m_job");
			String m_address= req.getParameter("m_address");
			String m_message= req.getParameter("m_message");
			String m_identity= req.getParameter("m_identity")==""?"-1":req.getParameter("m_identity");
			String m_photo= req.getParameter("m_photo")==""?"2":req.getParameter("m_photo");
			
			Marriage bean = service.findById(m_id);
			bean.setAddress(m_address);
			bean.setEducation(m_education);
			bean.setJob(m_job);
			bean.setMessage(m_message);
			bean.setModify_time(new Date());
			bean.setIdentity(Integer.parseInt(m_identity));
			bean.setPhoto(Integer.parseInt(m_photo));
			
			issuc = service.update(bean);
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
	
	public static int getAge(Date birthDay) throws Exception { 
        //获取当前系统时间
        Calendar cal = Calendar.getInstance(); 
        //如果出生日期大于当前时间，则抛出异常
        if (cal.before(birthDay)) { 
            throw new IllegalArgumentException( 
                "The birthDay is before Now.It's unbelievable!"); 
        } 
        //取出系统当前时间的年、月、日部分
        int yearNow = cal.get(Calendar.YEAR); 
        int monthNow = cal.get(Calendar.MONTH); 
        int dayOfMonthNow = cal.get(Calendar.DAY_OF_MONTH); 
         
        //将日期设置为出生日期
        cal.setTime(birthDay); 
        //取出出生日期的年、月、日部分  
        int yearBirth = cal.get(Calendar.YEAR); 
        int monthBirth = cal.get(Calendar.MONTH); 
        int dayOfMonthBirth = cal.get(Calendar.DAY_OF_MONTH); 
        //当前年份与出生年份相减，初步计算年龄
        int age = yearNow - yearBirth; 
        //当前月份与出生日期的月份相比，如果月份小于出生月份，则年龄上减1，表示不满多少周岁
        if (monthNow <= monthBirth) { 
            //如果月份相等，在比较日期，如果当前日，小于出生日，也减1，表示不满多少周岁
            if (monthNow == monthBirth) { 
                if (dayOfMonthNow < dayOfMonthBirth) age--; 
            }else{ 
                age--; 
            } 
        } 
        System.out.println("age:"+age); 
        return age; 
    }
}
