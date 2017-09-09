package com.shengxi.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.shengxi.dao.MsgDao;
import com.shengxi.model.Msg;
//import com.shengxi.service.MsgService;
import com.shengxi.service.UserService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import tools.BmUtil;
import tools.StringTool;

@Controller("msgController")
@RequestMapping("/msg/*")
public class MsgController extends MultiActionController {
	@Autowired
	@Qualifier("userService")
	private UserService userService;
	
	@Autowired
	@Qualifier("msgDao")
	private MsgDao dao;
	
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
			List<Msg> list = dao.findAll(tel, username,status,firstResult, maxResults);
			for(Msg e: list) {
				
				if(e == null) continue;
				
				JSONObject json = new JSONObject();
				json.put("m_id",e.getId());
				json.put("create_time",BmUtil.formatDate(e.getCreate_time()));
				json.put("from_tel",StringTool.null2Empty(e.getFrom_tel()));
				json.put("person",StringTool.null2Empty(e.getPerson()));
				json.put("qq",StringTool.null2Empty(e.getQq()));
				json.put("status",e.getStatus());
				json.put("description",e.getDescription());
				json.put("reply_time",BmUtil.formatDate(e.getReply_time()));
				json.put("reply", StringTool.null2Empty(e.getReply()));
				json.put("reply_operator_id", e.getReply_operator_id());
				
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
	

//	@RequestMapping("update.do")
//	public void update(HttpServletRequest req, HttpServletResponse resp)
//			throws Exception {
//
//		logger.info("--:");
//		resp.setContentType("application/json; charset=UTF-8");
//		
//		boolean issuc = false;
//		String msg = "修改失败";
//		try {
//			String m_id= req.getParameter("m_id");
//			String m_education= req.getParameter("m_education");
//			String m_job= req.getParameter("m_job");
//			String m_address= req.getParameter("m_address");
//			String m_message= req.getParameter("m_message");
//			String m_identity= req.getParameter("m_identity")==""?"-1":req.getParameter("m_identity");
//			String m_photo= req.getParameter("m_photo")==""?"2":req.getParameter("m_photo");
//			
//			Msg bean = service.findById(m_id);
//			bean.setAddress(m_address);
//			bean.setEducation(m_education);
//			bean.setJob(m_job);
//			bean.setMessage(m_message);
//			bean.setModify_time(new Date());
//			bean.setIdentity(Integer.parseInt(m_identity));
//			bean.setPhoto(Integer.parseInt(m_photo));
//			
//			issuc = service.update(bean);
//		} catch (Exception e) {
//			e.printStackTrace();
//		} finally {
//			if (issuc) {
//				msg = "修改成功";
//			}
//			JSONObject rootJson = new JSONObject();
//			rootJson.put("success", true);
//			rootJson.put("issuc", issuc);
//			rootJson.put("msg", msg);
//
//			logger.info(rootJson);
//			resp.getWriter().print(rootJson);
//		}
//	}
	
}
