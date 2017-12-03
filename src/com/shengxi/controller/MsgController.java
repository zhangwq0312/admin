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
import com.taobao.api.ApiException;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.request.AlibabaAliqinFcSmsNumSendRequest;
import com.taobao.api.response.AlibabaAliqinFcSmsNumSendResponse;

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
	

	@RequestMapping("update.do")
	public void update(HttpServletRequest req, HttpServletResponse resp)
			throws Exception {

		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");
		
		boolean issuc = false;
		String msg = "保存失败";
		String m_id= req.getParameter("m_id");
		String status= req.getParameter("status")==null?"0":req.getParameter("status");
		String reply= req.getParameter("reply");
		String shortmsg_flag= req.getParameter("shortmsg_flag")==null?"0":req.getParameter("shortmsg_flag");
		Msg bean = null;
		try {
			bean = dao.findById(m_id);
			bean.setStatus(Integer.parseInt(status));
			bean.setReply(reply);
		
			issuc = dao.update(bean);
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (issuc) {
				msg = "保存成功";
				if("1".equals(shortmsg_flag)){
					String leave_msg ;
					String desc = bean.getDescription();
					if(desc.length()>9){
						leave_msg = desc.substring(0,9)+"...";
					}else{
						leave_msg=desc;
					}
					 
					sendShortMsg(bean.getFrom_tel(),leave_msg);
					logger.info("短信发送成功================shortmsg_flag = "+shortmsg_flag);
				}
			}
			JSONObject rootJson = new JSONObject();
			rootJson.put("success", true);
			rootJson.put("issuc", issuc);
			rootJson.put("msg", msg);

			logger.info(rootJson);
			resp.getWriter().print(rootJson);
		}
	}


	private void sendShortMsg(String user_tel,String leave_msg) {
		String url="http://gw.api.taobao.com/router/rest";
		String appkey="23732976";
		String secret="e031402de72252a0fee7483e4708459d";
		TaobaoClient client = new DefaultTaobaoClient(url, appkey, secret);
		AlibabaAliqinFcSmsNumSendRequest req = new AlibabaAliqinFcSmsNumSendRequest();
		req.setExtend("");
		req.setSmsType("normal");
		req.setSmsFreeSignName("胜溪互联");
		req.setSmsParamString("{\"name\":\"用户\",\"product\":\""+leave_msg+"\"}");
		req.setRecNum(user_tel);
		req.setSmsTemplateCode("SMS_114905003");
		AlibabaAliqinFcSmsNumSendResponse rsp=null;
		try {
			rsp = client.execute(req);
		} catch (ApiException e) {
			e.printStackTrace();
			logger.error("检查短信接口，出现问题");
			if(rsp!=null){
				logger.info(rsp.getBody());
			}
		}
		
	}
	
}
