Ext.define('app.view.module.operator.Operator', {
	extend: 'Ext.grid.Panel',
	requires: [
       'app.view.module.operator.OperatorController'
    ],
    
	alias: 'widget.operators',
	
	title: '管理员用户',
	controller: 'operator',
	
	frame: false,//设置为true,会把panel的body放到一个iframe框中，导致增加了panel body周围的线框。
    columnLines: true,
	viewConfig: {
		stripeRows: true,//斑马线效果
		enableTextSelection:true //设置后能够选择每行上的文本
	},
	
	initComponent: function() {
		
		var mainViewModel = this.up('app-main').getViewModel();
		this.getController().mainViewModel = mainViewModel;
		
		var store = Ext.create('app.store.OperatorStore', {
			autoLoad: true
		});
		
		var pageSize = store.getPageSize();
		
		Ext.apply(this, {
            store: store,
            bbar: {
				xtype: 'pagingtoolbar',
		        pageSize: pageSize,
		        store: store,
		        displayInfo: true,
		        plugins: Ext.create('app.ux.ProgressBarPager')
            }
        });
		
        this.callParent();
	},
	
	columns: [{
		locked: true,
		header: '名称',
		dataIndex: 'name',
		flex: 1,
		width: 150,
	}, {
		header: '状态',
		dataIndex: 'status',
		renderer: 'parseStatusV',
		align: 'center',
		width: 60
	}, {
		header: 'ID',
		dataIndex: 'o_id',
		width: 80
	}, {
		header: '角色',
		dataIndex: 'role_names',
		width: 180
	}, {
		header: '手机号码',
		dataIndex: 'tel',
		align: 'center',
		width: 100
	},  {
		header: '邮箱地址',
		dataIndex: 'email',
		width: 180
	}, {
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '创建时间',
		dataIndex: 'create_time',
		align: 'center',
		width: 150
	}, {
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '修改时间',
		dataIndex: 'modify_time',
		align: 'center',
		width: 150
	}, {
        locked: true,
        xtype: 'actioncolumn',
        width: 100,
        sortable: false,
        menuDisabled: true,//这一列的最上面“下拉三角”设置为true将不再显示。
        align: 'center',
        items: [{
        	iconCls: 'user',
        	tooltip: '编辑用户',
        	isDisabled: function() {
        		return !this.up('app-main').getViewModel().isAdmin();
        	},
            handler: 'onModify'
        }, ' ', {
        	iconCls: 'password',
        	tooltip: '修改密码',
            handler: 'onModifyPsd'
        }, ' ', {
        	iconCls:'delete',
            tooltip: '删除用户',
        	isDisabled: function() {
        		return !this.up('app-main').getViewModel().isAdmin();
        	},
            handler: 'onRemove'
        }, ' ']
    }],
    
    listeners: {
    },
    
    tbar: [{
    	text: '添加',
    	iconCls: 'add',
    	hidden: true,
    	bind: {
			hidden: '{!isAdmin}'
		},
    	handler: 'onAddBtn'
    }],
	
	iconCls: 'icon-grid'
});