Ext.define("app.store.queryAccountHistoryStore", {
    extend: "Ext.data.Store",
    autoDestroy: true,
    fields: [
    ],
    pageSize: 20,
    proxy: {
    	type: 'ajax',
    	url: 'user/queryAccountHistory.do',//参考的是主题管理里面的代码。
    	reader: {
    		type: 'json',
    		totalProperty : "total",
    		root: 'data'
    	},
    	timeout:3000000
    },
    sorters: [{
    	property: 'h_id',
        direction:'DESC'
    }]
});