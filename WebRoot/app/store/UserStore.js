Ext.define("app.store.UserStore", {
    extend: "Ext.data.Store",
    autoDestroy: true,
    fields: [
//太神奇了，居然不用指定也能用。也许字段名一样的情况下是可以自动装配的。
    ],
    pageSize: 20,
    proxy: {
    	type: 'ajax',
    	url: 'user/query.do',//参考的是主题管理里面的代码。
    	reader: {
    		type: 'json',
    		totalProperty : "total",
    		root: 'data'
    	},
    	timeout:3000000
    },
    sorters: [{
    	property: 'c_id',
        direction:'DESC'
    }]
});