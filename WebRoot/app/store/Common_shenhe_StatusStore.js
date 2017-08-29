Ext.define("app.store.Common_shenhe_StatusStore", {
    extend: "Ext.data.Store",
    alias: 'store.common-shenhe-status-store',
    autoDestroy: true,
	autoLoad: true,
    fields: ['s_id', 's_name'],
    proxy: {
    	type: 'ajax',
    	url: 'status/query_for.do?q=common_shenhe',
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