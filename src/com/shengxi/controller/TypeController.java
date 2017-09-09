package com.shengxi.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.shengxi.model.Type;
import com.shengxi.service.TypeService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import tools.BmUtil;
import tools.InitManager;

@Controller("typeController")
@RequestMapping("/type/*")
public class TypeController extends MultiActionController {

	@Autowired
	@Qualifier("typeService")
	private TypeService typeService;

	@RequestMapping("query_for.do")
	public void queryType(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");
		String q = req.getParameter("q");
		JSONArray rootArr = findAll(q);

		JSONObject root = new JSONObject();
		root.put("data", rootArr);
		resp.getWriter().print(root);
	}
	
	public JSONArray findAll(String group_name) {

		JSONArray rootArr = new JSONArray();

		try {
			List<Type> list = null;

			if(!BmUtil.isEmpty(group_name)) {
				list = typeService.findByGroupName(group_name);
			}

			if(list == null) {
				list = new ArrayList<Type>();
			}

			JSONObject colJson = null;
			colJson = new JSONObject();
			colJson.put("s_id", "");
			colJson.put("s_name", "请选择");
			rootArr.add(colJson);

			for(Type type: list) {
				if(type == null) continue;

				colJson = new JSONObject();

				colJson.put("s_id", type.getValue());
				colJson.put("s_name", type.getName());
				rootArr.add(colJson);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return rootArr;
	}
}
