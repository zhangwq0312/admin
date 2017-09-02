Ext.define('app.view.module.user.queryCutMoneyGrid', {
	extend: 'Ext.grid.Panel',

	alias: 'widget.queryCutMoneyGrid',
	//requires: [
    //   'app.view.module.user.UserController',
    //   'app.view.module.user.UserModel'
   // ],
	//	controller: 'user',
	//    viewModel: {
     //   type: 'user'
    //},
	title: '扣费',
	frame: false,
    columnLines: true,

	initComponent: function() {
		var store = Ext.create('app.store.queryAccountHistoryStore');
		
		var pageSize = store.getPageSize();
		Ext.apply(this, {
            store: store,
            bbar: {
				xtype: 'pagingtoolbar',
		        pageSize: pageSize,
		        store: store,
		        displayInfo: true,
		        plugins: Ext.create('app.ux.ProgressBarPager')
            },
            viewConfig: {
            	stripeRows: true,
            	enableTextSelection:true
            }
        });
        this.callParent();
	},
	
	columns: [{
		header: 'ID',
		dataIndex: 'h_id',
		width: 50
	}, {
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '时间',
		dataIndex: 'create_time',
		align: 'center',
		width: 150
	},{
		header: '扣费',
		dataIndex: 'money_change',
		width: 50
	},{
		header: '详情',
		dataIndex: 'cut_reason',
		width: 370,
		renderer: function(value, meta, record) {
			meta.style = 'white-space:normal;word-wrap: break-word;'; 
			return value;
		}
	}],
 
	iconCls: 'icon-grid',
});