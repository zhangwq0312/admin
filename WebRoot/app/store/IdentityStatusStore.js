Ext.define("app.store.IdentityStatusStore", {
    extend: "Ext.data.Store",
    alias: 'store.identityStatusStore',
    autoDestroy: true,
	autoLoad: true,
    fields: ['s_id', 's_name'],
    proxy: {
    	type: 'ajax',
    	url: 'status/query_for.do?q=identity',
    	reader: {
    		type: 'json',
    		root: 'data'
    	},
    	timeout:3000000
    },
    sorters: [{
    	property: 's_id',
        direction:'ASC'
    }],
 /*   filters: [
        function(item) {
            return item.raw.s_name != '请选择';
        }
    ],*/
});