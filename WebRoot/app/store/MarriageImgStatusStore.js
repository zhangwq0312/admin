Ext.define("app.store.MarriageImgStatusStore", {
    extend: "Ext.data.Store",
    alias: 'store.marriage_img_status_store',
    autoDestroy: true,
	autoLoad: true,
    fields: ['s_id', 's_name'],
    proxy: {
    	type: 'ajax',
    	url: 'status/query_for.do?q=marriage_img',
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