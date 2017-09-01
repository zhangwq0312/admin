Ext.define('app.view.module.user.queryAddMoneyGrid', {
	extend: 'Ext.grid.Panel',

	alias: 'widget.queryAddMoneyGrid',
	//requires: [
    //   'app.view.module.user.UserController',
    //   'app.view.module.user.UserModel'
   // ],
	//	controller: 'user',
	//    viewModel: {
     //   type: 'user'
    //},
	title: '充值',
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
	},{
		header: '电话',
		dataIndex: 'userid',
		width: 100
	}, {
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '时间',
		dataIndex: 'create_time',
		align: 'center',
		width: 150
	},{
		header: '充值',
		dataIndex: 'money_change',
		flex: 1,
	}],
 
	iconCls: 'icon-grid',
});