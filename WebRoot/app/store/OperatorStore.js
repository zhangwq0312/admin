Ext.define("app.store.OperatorStore", {
    extend: "Ext.data.Store",
    autoDestroy: true,
	fields: [
        {name: 'o_id', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'password', type: 'string'},
        {name: 'status', type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'tel', type: 'string'},
        {name: 'role_ids', type: 'string'},
		{name: 'create_time', type: 'date', dateFormat: 'Y-m-d H:i:s'},
		{name: 'modify_time', type: 'date', dateFormat: 'Y-m-d H:i:s'}
    ],
	
    pageSize: 20,
    proxy: {
    	type: 'ajax',
    	url: 'operator/query.do',
    	reader: {
    		type: 'json',
    		totalProperty : "total",
    		root: 'data'
    	},
    	timeout:3000000
    },
    sorters: [{
    	property: 'o_id',
        direction:'ASC'
    }]
});