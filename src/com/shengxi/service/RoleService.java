package com.shengxi.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.shengxi.dao.UserDao;
import com.shengxi.dao.ModuleDao;
import com.shengxi.dao.RoleDao;
import com.shengxi.model.User;
import com.shengxi.model.Module;
import com.shengxi.model.Operator;
import com.shengxi.model.Role;

@Service("roleService")
public class RoleService  {

	@Autowired
	@Qualifier("roleDao")
	private RoleDao roleDao;

	@Autowired
	@Qualifier("operatorService")
	private OperatorService operatorService;

   @Autowired
   @Qualifier("moduleDao")
   private ModuleDao moduleDao;

   @Autowired
   @Qualifier("userDao")
   private UserDao userDao;

	public List<Role> findAll() {
		return roleDao.findAll();
	}

	public boolean save(Role role) {
		role.setCreate_time(new Date());
		role.setUpdate_time(new Date());
		return roleDao.save(role);
	}

	public boolean update(Role role) {
		role.setUpdate_time(new Date());
		return roleDao.update(role);
	}

	public boolean deleteById(String id) {
		if (!operatorService.roleIsUsed(id)) {
			return roleDao.deleteById(id);
		}

		return false;
	}

	public int countAll() {
		return roleDao.countAll();
	}

	public Role findById(String id) {
		return roleDao.findById(id);
	}

	public List<Role> findAll(int firstResult, int maxResults) {
		return roleDao.findAll(firstResult, maxResults);
	}

	public boolean isExist(Role role) {
		String where = " name ='" + role.getName() + "' ";
		if (!StringUtils.isEmpty(role.getId())) {
			where += " and id <> '" + role.getId() + "'";
		}
		int i = roleDao.countAll(where);
		
		return i >= 1 ? true : false;
	}


   public String queryIdsWithAuth(Operator operator, String type) {
      String ids = "";
      if (operator != null && !StringUtils.isEmpty(operator.getRole_ids())) {
         List<Role> roles = roleDao.findAll(" id in ("
               + operator.getRole_ids() + ")", null);

         if ("module".equals(type)){
            for (Role role : roles) {
               ids += role.getModule_ids() + ",";
            }
         }
      }
      if (!StringUtils.isEmpty(ids)) {
         ids = ids.substring(0, ids.length() - 1);
      }
      return ids;
   }

   public List<Module> queryModuleListWithAuth(Operator operator, boolean isAdmin) {
      List<Module> list = null;

      if (isAdmin){
         list = moduleDao.findAll(null, null);
      }
      else if (operator != null){
         String ids = queryIdsWithAuth(operator,"module");
         if (!StringUtils.isBlank(ids)){
            String where = "id in ("+ids+")";
            list = moduleDao.findAll(where, null);
         }
      }

      if (list == null)
         list = new ArrayList<Module>();
      return list;
   }


   public List<User> queryColumnListWithAuth(Operator operator, boolean isAdmin) {
      List<User> list = null;
      if (isAdmin){
         list = userDao.findAll(null, null);
      }
      else if (operator != null){
         String siteIds = queryIdsWithAuth(operator,"site");
         if ((","+siteIds+",").indexOf(",0,")>=0){
            list = userDao.findAll(null, null);
         }
         else{
            String ids = queryIdsWithAuth(operator,"menu");
            if (!StringUtils.isBlank(ids)){
               String where = "id in ("+ids+")";
               list = userDao.findAll(where, null);
            }
         }
      }
      if (list == null)
         list = new ArrayList<User>();
      return list;
   }
}
