Ext.define('app.view.module.credit.CreditAction', {
	extend: 'Ext.grid.Panel',
	requires: [
       'app.view.module.credit.CreditActionController',
    ],
    
	alias: 'widget.creditAction',
	
	title: '管理员用户',
	controller: 'creditAction',
	
	frame: true,
    columnLines: true,
	
	initComponent: function() {
		
		var mainViewModel = this.up('app-main').getViewModel();
		this.getController().mainViewModel = mainViewModel;
		
		if(mainViewModel.get('creditActionTypeStore') == null) {
			mainViewModel.set('creditActionTypeStore', Ext.create('app.store.CreditActionTypeStore'));
		}
		
		if(mainViewModel.get('creditActionStatTypeStore') == null) {
			mainViewModel.set('creditActionStatTypeStore', Ext.create('app.store.CreditActionStatTypeStore'));
		}
		
		var store = Ext.create('app.store.CreditActionStore', {
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
            },
            viewConfig: {
            	stripeRows: true,
            	enableTextSelection:true
            }
        });
		
        this.callParent();
	},
	
	columns: [{
		header: '名称',
		dataIndex: 'creditName',
		flex: 1,
		width: 150,
		locked: true
	}, {
		header: 'BI动作序号',
		dataIndex: 'creditType',
		width: 80
	}, {
		header: '积分值',
		dataIndex: 'creditValue',
		width: 70
	}, {
		header: 'ID',
		dataIndex: 'o_id',
		width: 70
	}, {
		header: '类型',
		dataIndex: 'creditCategory',
		renderer: 'parseCreditTypeV',
		width: 70
	}, {
		header: '统计方式',
		dataIndex: 'statType',
		renderer: 'parseCreditStattypeV',
		width: 110
	}, {
		header: '连续天数',
		dataIndex: 'continueDay',
		width: 60
	}, {
		header: '额外奖励',
		dataIndex: 'extraCredit',
		width: 60
	}, {
		header: '应用包名',
		dataIndex: 'packageName',
		width: 150
	}, {
		header: '操作人',
		dataIndex: 'operator',
		width: 60
	}, {
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '修改时间',
		dataIndex: 'updateTime',
		align: 'center',
		width: 150
	}, {
		header: '创建人',
		dataIndex: 'creator',
		width: 60,
		flex: 1
	}, {
        xtype: 'actioncolumn',
		header: '操作',
        locked: true,
        width: 100,
        sortable: false,
        menuDisabled: true,
        align: 'center',
        items: [{
        	iconCls: 'edit',
        	tooltip: '编辑',
        	isDisabled: function() {
        		return !this.up('app-main').getViewModel().isAdmin();
        	},
            handler: 'onModify'
        }, ' ', {
        	iconCls:'delete',
            tooltip: '删除',
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
    }, '-', {
    	text: '刷新缓存',
    	iconCls: 'info',
    	//glyph:'icon-refresh',
    	hidden: true,
    	bind: {
			hidden: '{!isAdmin}'
		},
		handler: 'onRefreshBtn'
    }],
	
	iconCls: 'icon-grid'
});