Ext.define('app.view.module.post.Post', {
	extend: 'Ext.grid.Panel',
	requires: [
       'app.view.module.post.PostController',
       'app.view.module.post.PostModel'
    ],
    
    uses: ['app.view.module.post.PostToolbar'],
    
	alias: 'widget.post',
	
	title: '栏目管理',
	controller: 'post',
    viewModel: {
        type: 'post'
    },
	
	frame: false,
    columnLines: true,
    
    dockedItems: [{
        xtype: 'post-toolbar',
        dock: 'top'
    }],
	
	initComponent: function() {

		var mainViewModel = this.up('app-main').getViewModel();
		this.getController().mainViewModel = mainViewModel;
		
		var store = Ext.create('app.store.PostStore');
		
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
		dataIndex: 'user_tel',
		width: 90,
		flex: 1
	}, {
		locked: true,
		header: '姓名',
		dataIndex: 'user_name',
		width: 80
	},{
		locked: true,
		header: '用户ID',
		dataIndex: 'user_id',
		width: 80
	},
	/*应该让用户自己去付费，而不是客服来帮忙做。
	{
        locked: true,
        xtype: 'actioncolumn',
        width: 80,
        sortable: false,
        menuDisabled: true,
        align: 'center',
        items: [' ', {
        	iconCls:'gouwuche',
            tooltip: '扣费',
            handler: 'onCutMoney'
        }]
    },*/
	{
		header: '帖子类型',
		dataIndex: 'post_table',
		width: 70,
		renderer: 'OnPostType',
	},{
		header: '帖子ID',
		dataIndex: 'post_id',
		width: 70
	},{
        xtype: 'actioncolumn',
		header: '帖子状态',
		align: 'center',
		getClass:function(v,metadata,r,rowIndex,colIndex,store){
			if(r.raw.post_status=='-2'){
				return 'info';
			}
			if(r.raw.post_status=='-1'){
				return 'error';
			}
			if(r.raw.post_status=='0'){
				return 'ok';
			}
		},
		width: 60
	},{
		header: '帖子标题',
		dataIndex: 'post_title',
		width: 250
	},{
        xtype: 'actioncolumn',
		header: '审核/禁用/生效',
        width: 120,
        sortable: false,
        menuDisabled: true,
        align: 'center',
        items: [{
        	iconCls:'ok',
            tooltip: '审核通过',
			isDisabled:function(view , rowIndex , colIndex , item, record) {
				if(record.raw.post_status=="-2"){return false;}
				else {return true;}
			}, 
            handler: 'onPass'
        },' ',{
        	iconCls:'error',
            tooltip: '禁用',
			isDisabled:function(view , rowIndex , colIndex , item, record) {
				if(record.raw.post_status!="-1"){return false;}
				else {return true;}
			}, 
            handler: 'onNo'
        },' ',{
        	iconCls:'ok',
            tooltip: '启用',
			isDisabled:function(view , rowIndex , colIndex , item, record) {
				if(record.raw.post_status=="-1"){return false;}
				else {return true;}
			}, 
            handler: 'onYes'
        }]
    },{
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '自动刷新',
		dataIndex: 'post_build_time',
		align: 'center',
		width: 136
	},  {
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '创建时间',
		dataIndex: 'post_create_time',
		align: 'center',
		width: 136
	},  {
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '修改时间',
		dataIndex: 'post_modify_time',
		align: 'center',
		width: 136
	}],
 
	iconCls: 'icon-grid',
});