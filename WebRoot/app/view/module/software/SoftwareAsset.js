Ext.define('app.view.module.software.SoftwareAsset', {
	extend: 'Ext.grid.Panel',
	requires: [
       'app.view.module.software.SoftwareAssetController'
    ],
    
	alias: 'widget.softwareAsset',
	
	uses: ['app.view.module.software.SoftwareAssetToolbar',
	       'app.view.module.software.SoftwareAssetWindow'],
	
	title: '软件版本信息',
	controller: 'software-asset',
	
	frame: true,
    columnLines: true,
	
	initComponent: function() {
		
		var mainViewModel = this.up('app-main').getViewModel();
		this.getController().mainViewModel = mainViewModel;
		
		if(mainViewModel.get('softwareFileTypeStatusStore') == null) {
			mainViewModel.set('softwareFileTypeStatusStore', Ext.create('app.store.SoftwareFileTypeStatusStore'));
		}
		
		if(mainViewModel.get('testGroupAllStore') == null) {
			mainViewModel.set('testGroupAllStore', Ext.create('app.store.TestGroupAllStore'));
		}
		
		var store = Ext.create('app.store.SoftwareStore', {
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
		header: '平台信息',
		dataIndex: 'add_plat',
		width: 300,
		locked: true
	}, {
		header: '版本号',
		dataIndex: 'version_number',
		locked: true,
		width: 100
	}, {
		header: 'ID',
		dataIndex: 'id',
		width: 100
	}, {
		header: '文件类型',
		dataIndex: 'file_type',
		width: 60
	}, {
		header: '强制升级',
		dataIndex: 'enforce_flag',
		width: 60,
		renderer : function(v) {
			if(v==='1') {
				return '强制';
			} else {
				return '不强制';
			}
		}
	}, {
		header: '发布时间',
		dataIndex: 'publish_time',
		width: 90
	}, {
		header: '状态',
		dataIndex: 'statusname',
		width: 50
	}, {
		header: '软件发布信息',
		dataIndex: 'software_info',
		width: 200
	}, {
		header: '备注',
		dataIndex: 'description',
		width: 200
	}, {
		header: 'MD5',
		dataIndex: 'md5',
		width: 240
	}, {
		header: '普通升级地址',
		dataIndex: 'update_url_general',
		width: 700
	}, {
        xtype: 'actioncolumn',
        locked: true,
        width: 80,
        sortable: false,
        menuDisabled: true,
        align: 'center',
        items: [' ', {
        	iconCls: 'edit',
        	tooltip: '修改软件版本信息',
            handler: 'onModifyClick'
        }, ' ', {
        	iconCls:'delete',
            tooltip: '删除软件版本信息',
            handler: 'onRemoveClick'
        }]
    }],
    
    listeners: {
    },
	
	plugins: [{
		ptype: 'rowexpander',
		expandOnDblClick: false,
		rowBodyTpl: new Ext.XTemplate(
			'<p><b>软件信息:</b> {software_info:this.formatSInfo}</p>',
			'<p><b>MD5:</b> {md5}</p>',
			'<p><b>普通升级地址:</b> {update_url_general}</p>',
			'<p><b>描述:</b> {description}</p>', {
			formatSInfo: function(v) {
				var arr = v.split('\\n');
				return arr.join('<br>&nbsp;&nbsp;&nbsp;&nbsp;');
			}
		})
	}],
	
	dockedItems: [{
        xtype: 'software-asset-toolbar',
        dock: 'top'
    }],
    
    tbar: [{
    	text: '添加',
    	iconCls: 'add',
    	listeners: {
    		click: 'onAddClick',
    		render : function(btn) {
    			btn.dropZone = new Ext.dd.DropZone(btn.getEl(), {
					ddGroup: 'DD_grid_SoftwareAsset',
					getTargetFromEvent : function(e) {
						return e.getTarget('');
					},
					
					onNodeOver: function(target, dd, e, data) {
						return Ext.dd.DropZone.prototype.dropAllowed;
					},
					
					onNodeDrop : function(target, dd, e, data) {
						var grid = btn.up('softwareAsset');
						var lastSelected = grid.getSelectionModel().lastSelected;
						if(lastSelected) {
							grid.getController().onAddWithCopy(lastSelected);
						}
					}
				})
    		}
    	}
    }/*, '-', {
    	text: '删除',
    	iconCls: 'delete',
    	listeners: {
    		click: function(btn) {
    			var grid = btn.up('softwareAsset');
				var lastSelected = grid.getSelectionModel().lastSelected;
				if(lastSelected) {
					grid.getController().onRemoveClick(grid, -1, -1, null, null, lastSelected);
				}
    		},
    		render : function(btn) {
    			btn.dropZone = new Ext.dd.DropZone(btn.getEl(), {
					ddGroup: 'DD_grid_SoftwareAsset',
					getTargetFromEvent : function(e) {
						return e.getTarget('');
					},
					
					onNodeOver: function(target, dd, e, data) {
						return Ext.dd.DropZone.prototype.dropAllowed;
					},
					
					onNodeDrop : function(target, dd, e, data) {
						var grid = btn.up('softwareAsset');
						var lastSelected = grid.getSelectionModel().lastSelected;
						if(lastSelected) {
							grid.getController().onRemoveClick(grid, -1, -1, null, e, lastSelected);
						}
					}
				})
    		}
    	}
    }*/, '-', {
    	text: 'Excel添加',
    	iconCls: 'add',
    	listeners: {
    		click: 'onAddFromExcel'
    	}
    }],
	
	iconCls: 'icon-grid'
});