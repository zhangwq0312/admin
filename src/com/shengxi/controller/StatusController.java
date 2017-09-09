package com.shengxi.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import tools.BmUtil;
import tools.InitManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.shengxi.model.Status;
import com.shengxi.service.StatusService;

import org.springframework.web.bind.annotation.RequestMapping;

@Controller("statusController")
@RequestMapping("/status/*")
public class StatusController extends MultiActionController {

	@Autowired
	@Qualifier("statusService")
	private StatusService statusService;

	@RequestMapping("query_for.do")
	public void queryOperatorStatus(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		logger.info("--:");
		resp.setContentType("application/json; charset=UTF-8");
		String q = req.getParameter("q");
		JSONArray rootArr = findAll(q);

		JSONObject root = new JSONObject();
		root.put("data", rootArr);
		resp.getWriter().print(root);
	}
	
	private JSONArray findAll(String table_name) {

		JSONArray rootArr = new JSONArray();

		try {
			List<Status> list = null;

			if(!BmUtil.isEmpty(table_name)) {
				list = statusService.findStatus(table_name);
			}

			if(list == null) {
				list = new ArrayList<Status>();
			}

			JSONObject colJson = null;
			colJson = new JSONObject();
			colJson.put("s_id", "");
			colJson.put("s_name", "请选择");
			rootArr.add(colJson);

			for(Status status: list) {
				if(status == null) continue;

				colJson = new JSONObject();

				colJson.put("s_id", status.getStatus());
				colJson.put("s_name", status.getDescription());
				rootArr.add(colJson);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return rootArr;
	}
}
