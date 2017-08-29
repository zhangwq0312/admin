Ext.define("app.store.UserStore", {
    extend: "Ext.data.Store",
    autoDestroy: true,
    fields: [
        {name: 'c_id', type: 'string'},
        {name: 'tel', type: 'string'},
        {name: 'username', type: 'string'},
        {name: 'ni', type: 'string'},
        {name: 'status', type: 'string'},
        {name: 'sex', type: 'string'},
        {name: 'mail', type: 'string'},
        {name: 'born_day', type: 'string'},
        {name: 'address', type: 'string'},
		{name: 'create_time', type: 'date', dateFormat: 'Y-m-d H:i:s'},
		{name: 'modify_time', type: 'date', dateFormat: 'Y-m-d H:i:s'}
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