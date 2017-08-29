Ext.define('app.view.module.column.Column', {
	extend: 'Ext.tree.Panel',
	requires: [
       'app.view.module.column.ColumnController',
       'app.view.module.column.ColumnModel',
       'app.view.module.column.ColumnWindow'
    ],
    
    uses: ['app.view.module.column.UserToolbar'],
    
	alias: 'widget.menuStructure',
	
	title: '栏目管理',
	controller: 'column',
    viewModel: {
        type: 'column'
    },
	
	frame: false,
//	useArrows: true,
    rootVisible: false,
    columnLines: true,
    
    dockedItems: [{
        xtype: 'user-toolbar',
        dock: 'top'
    }],
	
	initComponent: function() {
		
		var mainViewModel = this.up('app-main').getViewModel();
		this.getController().mainViewModel = mainViewModel;
		
		//if(mainViewModel.get('userStatusStore') == null) {
		//	mainViewModel.set('userStatusStore', Ext.create('app.store.UserStatusStore'));
		//}

		var store = Ext.create('app.store.ColumnStore');
		
		Ext.apply(this, {
            store: store,
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
        xtype: 'actioncolumn',
        width: 120,
        sortable: false,
        menuDisabled: true,
        align: 'center',
        items: [{
        	iconCls: 'edit',
        	tooltip: '交费',
            handler: 'onModifyClick'
        }, ' ', {
        	iconCls:'delete',
            tooltip: '扣费',
            handler: 'onRemoveClick'
        }]
    }, {
		header: '栏目ID',
		dataIndex: 'c_id',
		width: 80
	}, {
		header: '状态',
		align: 'center',
		dataIndex: 'status',
		renderer: 'parseStatusV',
		width: 60
	}, {
		header: '性别',
		align: 'center',
		dataIndex: 'status',
		renderer: function(val) {
			var str = '';
			if(val == 1) {
				str = '男';
			} else if(val == 2){
				str = '女';
			}

			return str;
		},
		width: 80
	}, {
		header: '昵称',
		dataIndex: 'username',
		width: 120
	}, {
		header: '邮箱',
		dataIndex: 'mail',
		width: 120
	}, {
		header: '出生日期',
		dataIndex: 'born_day',
		width: 120
	}, {
		header: '地址',
		dataIndex: 'address',
		width: 120
	}, {
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '创建时间',
		dataIndex: 'create_time',
		align: 'center',
		width: 136
	}, {
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '修改时间',
		dataIndex: 'modify_time',
		align: 'center',
		width: 136
	}],
    
    listeners: {
    	itemclick: function(view, record, item, index, e, eOpts) {
    		view.toggleOnDblClick = false;
    		this.getViewModel().set('column_c_id', record.raw.c_id);
    	}
    },
    
	iconCls: 'icon-grid'
});