Ext.define('app.view.module.whitelist.WhiteList', {
	extend: 'Ext.grid.Panel',
	requires: [
       'app.view.module.whitelist.WhiteListController'
    ],
    
	alias: 'widget.whitelist',
	
	title: '白名单',
	controller: 'whitelist',
	
	frame: true,
    columnLines: true,
	
	initComponent: function() {

		var store = Ext.create('app.store.WhiteListStore', {
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
		header: '版本号',
		dataIndex: 'version',
		flex: 1,
		width: 150,
		locked: true
	}, {
		header: 'ID',
		dataIndex: 'wl_id',
		width: 150
	}, {
		header: '设备型号',
		dataIndex: 'device_modes',
		align: 'center',
		width: 100,
		locked: true
	}, {
		header: '默认白名单',
		dataIndex: 'is_default',
		renderer: 'parseIsDefaultV',
		align: 'center',
		width: 80
	}, {
		header: '模式代码（多选逗号分割）',
		dataIndex: 'patternsStr',
		align: 'center',
		width: 200
	}, {
		header: '设备序列号匹配规则',
		dataIndex: 'device_seq_reg',
		align: 'center',
		width: 200
	}, {
		header: '<div class="header_title_center">xml地址</div>',
		dataIndex: 'xml_path',
		flex: 1
	}, {
		header: '',
		dataIndex: 'http_xml_path',
		hidden: true
	},{
        xtype: 'actioncolumn',
		header: '',
        locked: true,
        width: 100,
        sortable: false,
        menuDisabled: true,
        align: 'center',
        items: [{
        	iconCls: 'edit',
        	tooltip: '修改',
            handler: 'onModify'
        }, ' ',{
        	iconCls: 'info',
	    	tooltip: '下载',
	        handler: 'onDownload'
        }, ' ', {
        	iconCls:'delete',
        	tooltip: '删除',
            handler: 'onRemove'
        }]
    }],
    
    listeners: {
    },
    
    tbar: [{
    	text: '添加',
    	iconCls: 'add',
    	handler: 'onAddBtn'
    }, ' ', '-', ' '],
	
	iconCls: 'icon-grid'
});