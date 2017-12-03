Ext.define('app.view.module.msg.Msg', {
	extend: 'Ext.grid.Panel',
	requires: [
       'app.view.module.msg.Controller'
    ],
    
    uses: ['app.view.module.msg.Toolbar'],
    
	alias: 'widget.msg',
	
	title: '栏目管理',
	controller: 'msg',
	
	frame: false,
    columnLines: true,
    
    dockedItems: [{
        xtype: 'msg_toolbar',
        dock: 'top'
    }],
	
	initComponent: function() {

		var mainViewModel = this.up('app-main').getViewModel();
		this.getController().mainViewModel = mainViewModel;

		var store = Ext.create('app.store.MsgStore', {
            
		});
		store.proxy.extraParams.status =0;
        store.load();
        
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
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '开始时间',
		dataIndex: 'create_time',
		align: 'center',
		width: 136
	},{
		locked: true,
		header: '联系电话',
		dataIndex: 'from_tel',
		flex: 1
	},{
		locked: true,
		header: '联系人',
		dataIndex: 'person',
		flex: 1
	},{
		locked: true,
		header: 'QQ',
		dataIndex: 'qq',
		flex: 1
	}, {
		locked: true,
		header: '状态',
		dataIndex: 'status',
        renderer: 'parseStatusV',
		width: 60
	},{
        locked: true,
        xtype: 'actioncolumn',
        width: 50,
        sortable: false,
        menuDisabled: true,//这一列的最上面“下拉三角”设置为true将不再显示。
        align: 'center',
		header: '编辑',
        items: [{
            iconCls: 'edit',
            handler: 'onModify'}]
	},{
		header: '发言内容',
		dataIndex: 'description',
		width: 300
	},{
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '处理时间',
		dataIndex: 'reply_time',
		align: 'center',
		width: 136
	},{
		header: '处理结果',
		dataIndex: 'reply',
		width: 200,
	},{
		header: '处理人ID',
		dataIndex: 'reply_operator_id',
		width: 80,
	}],
 
     tbar: [{
    	text: '发送给所有用户/暂未开发',
    	iconCls: 'add',
    	handler: 'onAddBtn'
    }],
	iconCls: 'icon-grid',
});