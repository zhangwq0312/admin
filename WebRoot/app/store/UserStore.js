Ext.define("app.store.UserStore", {
    extend: "Ext.data.Store",
    autoDestroy: true,
    fields: [
//̫�����ˣ���Ȼ����ָ��Ҳ���á�Ҳ���ֶ���һ����������ǿ����Զ�װ��ġ�
    ],
    pageSize: 20,
    proxy: {
    	type: 'ajax',
    	url: 'user/query.do',//�ο����������������Ĵ��롣
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