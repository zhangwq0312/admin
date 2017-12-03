Ext.define("app.store.CouponStore", {
    extend: "Ext.data.Store",
    autoDestroy: true,
    fields: [
   
	],
    pageSize: 20,
    proxy: {
    	type: 'ajax',
    	url: 'coupon/query.do',//参考的是主题管理里面的代码。
    	reader: {
    		type: 'json',
    		totalProperty : "total",
    		root: 'data'
    	},
    	timeout:3000000
    },
});