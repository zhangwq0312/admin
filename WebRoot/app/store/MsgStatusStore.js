Ext.define("app.store.MsgStatusStore", {
    extend: "Ext.data.Store",
    alias: 'store.msgStatusStore',
    autoDestroy: true,
	autoLoad: true,
    fields: ['s_id', 's_name'],
    proxy: {
    	type: 'ajax',
    	url: 'status/query_for.do?q=msg',
    	reader: {
    		type: 'json',
    		root: 'data'
    	},
    	timeout:3000000
    },
    sorters: [{
    	property: 's_id',
        direction:'ASC'
    }]
});