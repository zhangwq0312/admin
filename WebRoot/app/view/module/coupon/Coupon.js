Ext.define('app.view.module.coupon.Coupon', {
	extend: 'Ext.grid.Panel',
	requires: [
       'app.view.module.coupon.Controller',
    ],
    
    uses: ['app.view.module.coupon.Toolbar'],
    
	alias: 'widget.coupon',
	
	title: '栏目管理',
	controller: 'coupon',

	frame: false,
    columnLines: true,
    
    dockedItems: [{
        xtype: 'coupon_toolbar',
        dock: 'top'
    }],
	
	initComponent: function() {

		var mainViewModel = this.up('app-main').getViewModel();
		this.getController().mainViewModel = mainViewModel;
		
		var store = Ext.create('app.store.CouponStore');
		
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
		header: 'ID',
		dataIndex: 'o_id',
		width: 50
	},{
		locked: true,
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '创建时间',
		dataIndex: 'coupon_create_time',
		align: 'center',
		width: 136
	},{
		locked: true,
		header: '商户名称',
		dataIndex: 'company_name',
		flex: 1
	},{
		locked: true,
		header: '手机账号',
		dataIndex: 'company_userid',
		flex: 1
	},{
		header: '商户ID',
		dataIndex: 'company_id',
		width: 60
	},{
		locked: true,
		header: '类型',
		dataIndex: 'coupon_type',
		width: 70,
        renderer: 'parseType',
	},{
		locked: true,
		header: '状态',
		dataIndex: 'coupon_status',
		width: 60,
        renderer: 'parseStatus',
	},{
		locked: true,
		header: '券名',
		dataIndex: 'big',
		width: 136
	},{
		header: 'small',
		dataIndex: 'small',
		width: 136
	},{
		header: 'description',
		dataIndex: 'description',
		width: 136
	},{
		locked: true,
		header: '总数',
		dataIndex: 'total_num',
		width: 40
	},{
		locked: true,
		header: '余数',
		dataIndex: 'rest_num',
		width: 40
	},{
		locked: true,
        xtype: 'actioncolumn',
		header: '编辑',
		align: 'center',
		width: 60,
        items: [{
        	iconCls:'edit',
            handler: 'onEdit'
        }],
	},{
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '发券起',
		dataIndex: 'coupon_publish_start_time',
		align: 'center',
		width: 136
	},{
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '发券止',
		dataIndex: 'coupon_publish_end_time',
		align: 'center',
		width: 136
	},{
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '该券生效时间',
		dataIndex: 'coupon_start_time',
		align: 'center',
		width: 136
	},{
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '该券失效时间',
		dataIndex: 'coupon_end_time',
		align: 'center',
		width: 136
	}],
 
    tbar: [{
    	text: '添加',
    	iconCls: 'add',
    	handler: 'onAddBtn'
    }],
	iconCls: 'icon-grid',
});