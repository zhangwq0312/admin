Ext.define("app.store.CouponStore", {
    extend: "Ext.data.Store",
    autoDestroy: true,
    fields: [
   
	],
    pageSize: 20,
    proxy: {
    	type: 'ajax',
    	url: 'coupon/query.do',//�ο����������������Ĵ��롣
    	reader: {
    		type: 'json',
    		totalProperty : "total",
    		root: 'data'
    	},
    	timeout:3000000
    },
});