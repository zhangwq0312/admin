package com.shengxi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.shengxi.dao.CouponDao;
import com.shengxi.model.Coupon;
import com.shengxi.model.Operator;

@Service("couponService")
public class CouponService {

	@Autowired
	@Qualifier("couponDao")
	private CouponDao dao;

	public Coupon findById(String id) {
		return dao.findById(id);
	}
	
	public boolean update(String id, int status) {
		return dao.update(id, status);
	}

	public List<Coupon> findAll(String tel, String company_name, String type, String status, int firstResult, int maxResults) {
		return dao.findAll(tel, company_name, type, status, firstResult, maxResults);
	}

	public boolean updateValidDate(int fullWeeks, String coupon_id) {
		return dao.updateValidDate(fullWeeks, coupon_id);
	}

	public int isValiding(String coupon_id) {
		return dao.isValiding(coupon_id);
	}

	public boolean isExist(String name) {
		return dao.isExist(name);
	}

	public boolean createCoupon(String coupon_userid, String tel, String coupon_leixing, String coupon_name, String coupon_short_name,Operator operator) {
		return dao.createCoupon(coupon_userid, tel, coupon_leixing, coupon_name, coupon_short_name, operator);
	}

}
