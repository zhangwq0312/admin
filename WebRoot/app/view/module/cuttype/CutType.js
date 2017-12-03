Ext.define('app.view.module.cuttype.CutType', {
	extend: 'Ext.grid.Panel',
	requires: [
       'app.view.module.cuttype.CutTypeController'
    ],

	alias: 'widget.cuttype',
	
	title: '扣费类型',
	controller: 'cuttype',
	
	frame: false,//设置为true,会把panel的body放到一个iframe框中，导致增加了panel body周围的线框。
    columnLines: true,
	viewConfig: {
		stripeRows: true,//斑马线效果
		enableTextSelection:true //设置后能够选择每行上的文本
	},
	
	initComponent: function() {
		
		var mainViewModel = this.up('app-main').getViewModel();
		this.getController().mainViewModel = mainViewModel;
		
		var store = Ext.create('app.store.CutTypeStore', {
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
		header: '类型',
		dataIndex: 'type',
		renderer: 'parseType',
		width: 100,
	},{
		locked: true,
		header: '业务名称',
		dataIndex: 'name',
		flex: 1,
		width: 200,
	}, {
		locked: true,
		header: '业务单价',
		dataIndex: 'unit_price',
		renderer: 'parseUnit_price',
		flex: 1,
		width: 100,
	},{
		locked: true,
		header: '内含数量',
		dataIndex: 'unit_name',
		width: 100,
	}, {
		header: '状态',
		dataIndex: 'status',
		renderer: 'parseStatusV',
		align: 'center',
		width: 60
	}, {
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '创建时间',
		dataIndex: 'create_time',
		align: 'center',
		width: 150
	}, {
		header: '修改日志',
		dataIndex: 'detail',
		width: 300
	}, {
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '最近一次作废时间',
		dataIndex: 'delete_time',
		align: 'center',
		width: 150
	}, {
        locked: true,
        xtype: 'actioncolumn',
        width: 90,
        sortable: false,
        menuDisabled: true,//这一列的最上面“下拉三角”设置为true将不再显示。
        align: 'center',
        items: [{
        	iconCls: 'edit',
        	tooltip: '修改',
        	isDisabled: function() {
        		return !this.up('app-main').getViewModel().isAdmin();
        	},
            handler: 'onModify'
        },' ',{
        	iconCls: 'delete',
        	tooltip: '删除',
        	isDisabled: function() {
        		return !this.up('app-main').getViewModel().isAdmin();
        	},
            handler: 'onDelete'
        },' ']
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