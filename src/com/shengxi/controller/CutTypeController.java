package com.shengxi.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
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
import com.shengxi.model.Operator;
import com.shengxi.service.CutTypeService;
import com.shengxi.service.IAccountHistoryService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import tools.BmUtil;
import tools.StringTool;

@Controller("cutTypeController")
@RequestMapping("/cutType/*")
public class CutTypeController extends MultiActionController {
	
	@Autowired
	@Qualifier("cutTypeService")
	private CutTypeService cutTypeService;

	@Autowired
	@Qualifier("iaccountHistoryService")
	private IAccountHistoryService iaccountHistoryService;
	
	public CutTypeService getCutTypeService() {
		return cutTypeService;
	}

	public void setCutTypeService(CutTypeService cutTypeService) {
		this.cutTypeService = cutTypeService;
	}
	
	@RequestMapping("query.do")
	public void queryHandler(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");

		int firstResult = Integer.parseInt(req.getParameter("start"));
		int maxResults = firstResult + Integer.parseInt(req.getParameter("limit"));

		JSONArray rootArr = new JSONArray();
		long total = 0;
		try {
			List<CutType> list = cutTypeService.findAll(firstResult, maxResults);
			if(list != null && list.size() > 0) {
				for(CutType cutType: list) {
					if(cutType == null) continue;
					
					rootArr.add(parserCutType(cutType));
				}
			}
			
			total = cutTypeService.countAll();
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			JSONObject root = new JSONObject();
			root.put("total", total);
			root.put("data", rootArr);
			
			logger.info(root);
			resp.getWriter().print(root);
		}
	}
	
	@RequestMapping("save.do")
	public void saveHandler(HttpServletRequest req, HttpServletResponse resp)
			throws Exception {

		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");
		
		boolean issuc = false;
		String msg = "添加失败";
		try {
			Operator admin = (Operator) req.getSession().getAttribute("admin");
			if (admin == null || !"admin".equals(admin.getName())) {// 只有admin能增加和删除帐号
				msg = "添加失败！只有admin能增加和删除扣费类型！";
			} else {
				String name = req.getParameter("name");
				
				if(cutTypeService.isExist(name)) {
					msg = "添加失败，类型【" + name + "】已经存在。";
				} else {
					CutType cutType = new CutType();
					cutType.setName(name);
					cutType.setType(req.getParameter("type"));
					cutType.setUnit_price(Integer.parseInt(req.getParameter("unit_price")));
					cutType.setUnit_contain_weeks(Integer.parseInt(req.getParameter("unit_contain_weeks")));;
					cutType.setStatus(Integer.parseInt(req.getParameter("status")));
					issuc = cutTypeService.save(cutType);
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
	
	@RequestMapping("update.do")
	public void updateHandler(HttpServletRequest req, HttpServletResponse resp)
			throws Exception {

		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");
		
		boolean issuc = false;
		String msg = "修改失败";
		try {
			Operator admin = (Operator) req.getSession().getAttribute("user");
		   String name = req.getParameter("name");
		   
		   if(admin != null && ("admin".equals(admin.getName()) || admin.getName().equals(name))) {
			   String id = req.getParameter("c_id");
			   CutType cutType = cutTypeService.findById(id);
			   cutType.setName(req.getParameter("name"));
			   cutType.setStatus(Integer.parseInt(req.getParameter("status")));
			   String statusStr="";
			   if(cutType.getStatus()==0){
				   statusStr="启用";
			   }else{
				   statusStr="作废";
				   cutType.setDelete_time(new Date());
			   }
			   
			   String nowStr = getNowStr();
			   cutType.setDetail("{时间："+nowStr+"，名称："+cutType.getName()+"，状态："+statusStr+"}，  "+cutType.getDetail());
			   issuc = cutTypeService.update(cutType);
		   } else {
			   msg = "修改失败！请重新登录！";
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
	@RequestMapping("del.do")
	public void delHandler(HttpServletRequest req, HttpServletResponse resp)
			throws Exception {

		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");
		
		boolean issuc = false;
		String msg = "删除失败";
		String id = req.getParameter("c_id");
		if(iaccountHistoryService.findByCutType(id)){
			 msg = "系统中已经存在该套餐的扣费记录，不允许删除";
		}else{
			issuc = cutTypeService.delete(id);
			if (issuc) {
				msg = "删除成功";
			}
		}

		
		JSONObject rootJson = new JSONObject();
		rootJson.put("success", true);
		rootJson.put("issuc", issuc);
		rootJson.put("msg", msg);

		logger.info(rootJson);
		resp.getWriter().print(rootJson);
	}
	private String getNowStr() {
		//得到long类型当前时间
		   long l = System.currentTimeMillis();
		   //new日期对象
		   Date date = new Date(l);
		   //转换提日期输出格式
		   SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		   String nowStr = dateFormat.format(date);
		return nowStr;
	}
	
	private JSONObject parserCutType(CutType cutType) {
		
		if(cutType == null) return null;
		
		JSONObject colJson = new JSONObject();
		
		colJson.put("c_id", cutType.getId());
		colJson.put("name", StringTool.null2Empty(cutType.getName()));
		colJson.put("type", cutType.getType());
		colJson.put("unit_contain_weeks", cutType.getUnit_contain_weeks());
		String unit_name= "";
		if("hunlian".equals(cutType.getType())){
			unit_name=cutType.getUnit_contain_weeks()+"次";
		}else if ("shangpu".equals(cutType.getType())){
			unit_name=cutType.getUnit_contain_weeks()+"个月";
		}else if ("flush".equals(cutType.getType())){
			unit_name=cutType.getUnit_contain_weeks()+"条/月";
		}
		colJson.put("unit_name", unit_name);
		colJson.put("unit_price", cutType.getUnit_price());
		colJson.put("detail", StringTool.null2Empty(cutType.getDetail()));
		colJson.put("status", cutType.getStatus());
		colJson.put("create_time", BmUtil.formatDate(cutType.getCreate_time()));
		colJson.put("delete_time", BmUtil.formatDate(cutType.getDelete_time()));
		
		return colJson;
	}
}
