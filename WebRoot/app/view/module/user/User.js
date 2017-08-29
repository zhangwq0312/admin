Ext.define('app.view.module.user.User', {
	extend: 'Ext.grid.Panel',
	requires: [
       'app.view.module.user.UserController',
       'app.view.module.user.UserModel'
    ],
    
    uses: ['app.view.module.user.UserToolbar'],
    
	alias: 'widget.user',
	
	title: '栏目管理',
	controller: 'user',
    viewModel: {
        type: 'user'
    },
	
	frame: false,
    columnLines: true,
    
    dockedItems: [{
        xtype: 'user-toolbar',
        dock: 'top'
    }],
	
	initComponent: function() {

		var mainViewModel = this.up('app-main').getViewModel();
		this.getController().mainViewModel = mainViewModel;
		
		var store = Ext.create('app.store.UserStore');
		
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
		locked: true,
		header: '电话',
		dataIndex: 'tel',
		width: 90,
		flex: 1
	}, {
		locked: true,
		header: '姓名',
		dataIndex: 'username',
		width: 120
	},{
		locked: true,
		header: '账户ID',
		dataIndex: 'i_id',
		width: 80
	},{
		locked: true,
		header: '当前金额',
		dataIndex: 'money_now',
		width: 80
	},{
		locked: true,
        xtype: 'actioncolumn',
		header: '充值',
        width: 100,
        sortable: false,
        menuDisabled: true,
        align: 'center',
        items: [{
        	iconCls: 'add',
        	tooltip: '交费',
            handler: 'onAddMoney'
        }]
    }, {
		header: '总充值',
		dataIndex: 'money_add',
		width: 80
	},{
        xtype: 'actioncolumn',
        width: 100,
        sortable: false,
        menuDisabled: true,
        align: 'center',
        items: [{
        	iconCls: 'edit',
        	tooltip: '交费明细',
            handler: 'queryAddMoney'
        }]
    },{
		header: '总扣费',
		dataIndex: 'money_cut',
		width: 80
	},{
        xtype: 'actioncolumn',
        width: 60,
        sortable: false,
        menuDisabled: true,
        align: 'center',
        items: [{
        	iconCls:'edit',
            tooltip: '扣费明细',
            handler: 'queryCutMoney'
        }]
    },{
		header: '当前积分',
		dataIndex: 'integral_cut',
		width: 80
	},{
		header: '状态',
		align: 'center',
		dataIndex: 'status',
		renderer: 'parseStatusV',
		width: 60
	}, {
		header: '性别',
		align: 'center',
		dataIndex: 'sex',
		renderer:'parseSexStatusV',
		width: 80
	}, {
		header: '昵称',
		dataIndex: 'ni',
		width: 120
	}, {
		header: '地址',
		dataIndex: 'address',
		width: 120
	},{
		header: '邮箱',
		dataIndex: 'mail',
		width: 120
	}, {
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '首充时间',
		dataIndex: 'i_create_time',
		align: 'center',
		width: 136
	}, {
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '变动时间',
		dataIndex: 'i_modify_time',
		align: 'center',
		width: 136
	}],
 
	iconCls: 'icon-grid',
});