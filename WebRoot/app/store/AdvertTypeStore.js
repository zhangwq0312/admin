Ext.define("app.store.AdvertTypeStore", {
    extend: "Ext.data.Store",
    alias: 'store.advertTypeStore',
    autoDestroy: true,
	autoLoad: true,
    fields: ['s_id', 's_name'],
    proxy: {
    	type: 'ajax',
    	url: 'type/query_for.do?q=company',
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