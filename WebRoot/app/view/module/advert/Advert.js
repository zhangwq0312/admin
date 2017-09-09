Ext.define('app.view.module.advert.Advert', {
	extend: 'Ext.grid.Panel',
	requires: [
       'app.view.module.advert.Controller',
       'app.view.module.advert.Model'
    ],
    
    uses: ['app.view.module.advert.Toolbar'],
    
	alias: 'widget.advert',
	
	title: '栏目管理',
	controller: 'advert',
    viewModel: {
        type: 'advert'
    },
	
	frame: false,
    columnLines: true,
    
    dockedItems: [{
        xtype: 'advert_toolbar',
        dock: 'top'
    }],
	
	initComponent: function() {

		var mainViewModel = this.up('app-main').getViewModel();
		this.getController().mainViewModel = mainViewModel;
		
		var store = Ext.create('app.store.AdvertStore');
		
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
		header: '申请人',
		dataIndex: 'user_name',
		flex: 1
	},{
		locked: true,
		header: '申请人电话',
		dataIndex: 'advert_userid',
		flex: 1
	}, {
		locked: true,
		header: '商户名称',
		dataIndex: 'advert_name',
		width: 150
	},{
		locked: true,
		header: '短名称',
		dataIndex: 'advert_short_name',
		width: 60
	},{
        xtype: 'actioncolumn',
		locked: true,
		header: '状态',
		align: 'center',
		getClass:function(v,metadata,r,rowIndex,colIndex,store){
			if(r.raw.advert_status=='0'&&r.raw.isvalid=='-1'){
				return 'info';
			}
			if(r.raw.advert_status=='-1'){
				return 'error';
			}
			if(r.raw.advert_status=='0'&&r.raw.isvalid=='0'){
				return 'ok';
			}
		},
		width: 60
	},{
        xtype: 'actioncolumn',
		header: '禁用/生效',
        width: 120,
        sortable: false,
        menuDisabled: true,
        align: 'center',
        items: [{
        	iconCls:'error',
            tooltip: '禁用',
			isDisabled:function(view , rowIndex , colIndex , item, record) {
				if(record.raw.advert_status!="-1"){return false;}
				else {return true;}
			}, 
            handler: 'onNo'
        },' ',{
        	iconCls:'ok',
            tooltip: '启用',
			isDisabled:function(view , rowIndex , colIndex , item, record) {
				if(record.raw.advert_status=="-1"){return false;}
				else {return true;}
			}, 
            handler: 'onYes'
        }]
    }, {
        xtype: 'actioncolumn',
		header: '续费',
		align: 'center',
		iconCls:'edit',
		width: 60,
		handler: 'onPay'
	},{
		header: '类型',
		dataIndex: 'advert_leixing',
		width: 80,
		renderer: 'parseAdvertTypeV',
	},{
		header: '联系电话',
		dataIndex: 'advert_tel',
		flex: 1
	},{
		header: '地址',
		dataIndex: 'advert_address',
		width: 100
	},{
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '有效时间',
		dataIndex: 'advert_valid_time',
		align: 'center',
		width: 136
	},{
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '创建时间',
		dataIndex: 'advert_create_time',
		align: 'center',
		width: 136
	},  {
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '修改时间',
		dataIndex: 'advert_modify_time',
		align: 'center',
		width: 136,
	},{
		header: '创建人ID',
		dataIndex: 'create_operator_id',
		width: 80,
	}],
 
     tbar: [{
    	text: '添加',
    	iconCls: 'add',
    	handler: 'onAddBtn'
    }],
	iconCls: 'icon-grid',
});