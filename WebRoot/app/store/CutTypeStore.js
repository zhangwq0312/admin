Ext.define("app.store.CutTypeStore", {
    extend: "Ext.data.Store",
    autoDestroy: true,
	fields: [
        {name: 'c_id', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'unit_contain_weeks', type: 'string'},
        {name: 'unit_name', type: 'string'},
        {name: 'unit_price', type: 'string'},
        {name: 'status', type: 'string'},
        {name: 'detail', type: 'string'},
		{name: 'create_time', type: 'date', dateFormat: 'Y-m-d H:i:s'},
		{name: 'delete_time', type: 'date', dateFormat: 'Y-m-d H:i:s'}
    ],
	
    pageSize: 20,
    proxy: {
    	type: 'ajax',
    	url: 'cutType/query.do',
    	reader: {
    		type: 'json',
    		totalProperty : "total",
    		root: 'data'
    	},
    	timeout:3000000
    },
});