Ext.define('app.view.module.marriage.Marriage', {
	extend: 'Ext.grid.Panel',
	requires: [
       'app.view.module.marriage.Controller',
    ],
    
    uses: ['app.view.module.marriage.Toolbar'],
    
	alias: 'widget.marriage',
	
	title: '栏目管理',
	controller: 'marriage',

	
	frame: false,
    columnLines: true,
    
    dockedItems: [{
        xtype: 'marriage_toolbar',
        dock: 'top'
    }],
	
	initComponent: function() {

		var mainViewModel = this.up('app-main').getViewModel();
		this.getController().mainViewModel = mainViewModel;
		
		var store = Ext.create('app.store.MarriageStore');
		
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
		dataIndex: 'm_id',
		flex: 1,
	},{
		locked: true,
		header: '登记人电话',
		dataIndex: 'm_userid',
        width: 100,
        renderer:'parseTel',  
	},{
		locked: true,
		header: '登记人完整电话',
		dataIndex: 'm_userid',
        width: 100,
        hidden:true,
	},{
		locked: true,
		header: '约会人电话',
		dataIndex: 'm_tel',
        width: 100,
        renderer:'parseTel',
	},{
		locked: true,
		header: '约会人完整电话',
		dataIndex: 'm_tel',
        width: 100,
        hidden:true,
	},{
		locked: true,
		header: '姓名',
		dataIndex: 'm_fullname',
        width: 80,
        renderer:'parseName',
	},{
		locked: true,
		header: '完整姓名',
		dataIndex: 'm_fullname',
        width: 80,
        hidden:true,
	},{
		locked: true,
		header: '邮箱地址',
		dataIndex: 'm_email',
        width: 80,
        hidden:true,
	},{
		locked: true,
        xtype: 'actioncolumn',
		header: '状态',
		align: 'center',
		getClass:function(v,metadata,r,rowIndex,colIndex,store){
			if(r.raw.m_status=='-1'){
				return 'error';
			}
			if(r.raw.m_status=='0'){
				return 'ok';
			}
		},
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
            // tooltip: '编辑',
            handler: 'onModify'}]
	},{
		locked: true,
		header: '认证',
		dataIndex: 'm_identity',
		width: 60,
        renderer:'parseIdentity',
	},{
		locked: true,
		header: '性别',
		dataIndex: 'm_sex',
		width: 60,
        renderer:'parseSexStatusV',
	},{
		locked: true,
		header: '相片',
		dataIndex: 'm_photo',
		width: 60,
        renderer:'parseImgStatusV',
	},{
		locked: true,
		header: '年龄',
		dataIndex: 'm_age',
		width: 60,
	},{
		header: '学历',
		dataIndex: 'm_education',
		width: 150
	},{
		header: '职业',
		dataIndex: 'm_job',
		width: 150
	},{
		header: '希望约会地址',
		dataIndex: 'm_address',
		width: 200,
	},{
		header: '情感寄语',
		dataIndex: 'm_message',
		width: 300
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
				if(record.raw.m_status!="-1"){return false;}
				else {return true;}
			}, 
            handler: 'onNo'
        },' ',{
        	iconCls:'ok',
            tooltip: '启用',
			isDisabled:function(view , rowIndex , colIndex , item, record) {
				if(record.raw.m_status=="-1"){return false;}
				else {return true;}
			}, 
            handler: 'onYes'
        }]
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