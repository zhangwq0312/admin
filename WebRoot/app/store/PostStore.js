Ext.define("app.store.PostStore", {
    extend: "Ext.data.Store",
    autoDestroy: true,
    fields: [
        {name: 'user_id', type: 'string'},
        {name: 'user_tel', type: 'string'},
        {name: 'user_name', type: 'string'},
        {name: 'user_status', type: 'string'},
        {name: 'post_table', type: 'string'},
        {name: 'post_id', type: 'string'},
        {name: 'post_status', type: 'string'},
        {name: 'post_title', type: 'string'},
		{name: 'post_create_time', type: 'date', dateFormat: 'Y-m-d H:i:s'},
		{name: 'post_modify_time', type: 'date', dateFormat: 'Y-m-d H:i:s'},
		{name: 'post_build_time', type: 'date', dateFormat: 'Y-m-d H:i:s'}
	],
    pageSize: 20,
    proxy: {
    	type: 'ajax',
    	url: 'post/query.do',//参考的是主题管理里面的代码。
    	reader: {
    		type: 'json',
    		totalProperty : "total",
    		root: 'data'
    	},
    	timeout:3000000
    },
});