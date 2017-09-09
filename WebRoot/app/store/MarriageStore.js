Ext.define("app.store.MarriageStore", {
    extend: "Ext.data.Store",
    autoDestroy: true,
    fields: [
   
	],
    pageSize: 20,
    proxy: {
    	type: 'ajax',
    	url: 'marriage/query.do',//�ο����������������Ĵ��롣
    	reader: {
    		type: 'json',
    		totalProperty : "total",
    		root: 'data'
    	},
    	timeout:3000000
    },
});