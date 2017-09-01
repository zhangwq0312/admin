Ext.define('app.view.module.contvideo.ContVideo', {
	extend: 'Ext.grid.Panel',
	requires: [
       'app.view.module.contvideo.ContVideoController',
       'app.view.module.contvideo.ContVideoModel'
    ],
    
	alias: 'widget.contVideo',
	
	uses: ['app.view.module.contvideo.ContVideoToolbar',
	       'app.view.module.contvideo.ContVideoWindow'],
	
	title: '内容管理',
	controller: 'cont-video',
    viewModel: {
        type: 'cont-video'
    },
	
	frame: true,
    columnLines: true,
	iconCls: 'icon-grid',
	
	initComponent: function() {
		
		var mainViewModel = this.up('app-main').getViewModel();
		this.getController().mainViewModel = mainViewModel;
		
		if(mainViewModel.get('contStatusStore') == null) {
			mainViewModel.set('contStatusStore', Ext.create('app.store.ContStatusStore'));
		}
		
		if(mainViewModel.get('contProviderByAuthStore') == null) {
			mainViewModel.set('contProviderByAuthStore', Ext.create('app.store.ContProviderByAuthStore'));
		}
		
		if(mainViewModel.get('contTypeStore') == null) {
			mainViewModel.set('contTypeStore', Ext.create('app.store.ContTypeStore'));
		}

		var store = Ext.create('app.store.ContVideoStore');
		
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
	selModel : {
		selType : 'checkboxmodel',
		//mode : 'SIMPLE'
		mode : 'SINGLE'
	},
	columns: [{
		header: '名称',
		dataIndex: 'c_name',
		width: 200,
		locked: true
	}, {
		header: 'ID',
		dataIndex: 'c_id',
		align: 'center',
		width: 100
	}, {
		header: '来源',
		dataIndex: 'provider_id',
		renderer: 'parseProviderV',
		align: 'center',
		width: 100
	}, {
		header: '类型',
		dataIndex: 'c_type',
		renderer: 'parseTypeV',
		align: 'center',
		width: 80
	}, {
		header: '状态',
		dataIndex: 'c_status',
		renderer: 'parseStatusV',
		align: 'center',
		width: 80
	}, {
		header: '语言',
		dataIndex: 'cv_language',
		align: 'center',
		width: 40
	}, {
		header: '地区',
		dataIndex: 'cv_country_code',
		align: 'center',
		width: 40
	}, {
		header: '拼音简写',
		dataIndex: 'pinyin',
		width: 150
	}, {
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '生效时间',
		dataIndex: 'active_time',
		align: 'center',
		width: 150
	}, {
		xtype: 'datecolumn',
		format: 'Y-m-d H:i:s',
		header: '失效时间',
		dataIndex: 'deactive_time',
		align: 'center',
		width: 150
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
		header: '',
        xtype: 'actioncolumn',
        locked: true,
        width: 100,
        sortable: false,
        menuDisabled: true,
        align: 'center',
        items: [' ', {
        	iconCls: 'edit',
        	tooltip: '编辑资产',
            handler: 'onModify'
        }, ' ', {
        	iconCls: 'delete',
        	tooltip: '删除资产',
            handler: 'onDelete'
        }, ' ', {
        	iconCls:'preview',
            tooltip: '预览图片',
            handler: 'onPreviewClick'
        }]
    }]/*,
	
	plugins: [{
		ptype: 'rowexpander',
		expandOnDblClick: false,
		rowBodyTpl: new Ext.XTemplate(
			'<p><b>别名:</b> {cv_alias}</p>',
			'<p><b>导演:</b> {cv_director}</p>',
			'<p><b>演员:</b> {cv_actors}</p>',
			'<p><b>编剧:</b> {cv_screenwriter}</p>',
			'<p><b>语言:</b> {cv_language}</p>',
			'<p><b>基本信息锁定:</b> {is_locked:this.isLocked}</p>',
			'<p><b>zip包下载:</b> {zip_download_url_show}</p>',
			'<p><b>静态链接地址:</b> {link_url}</p>',
			'<p><b>视频播放地址:</b> {cv_play_url}</p>',
			'<p><b>描述:</b> {cv_description}</p>', {
				isLocked: function(v) {
					return v==1 ? '是' : '否';
				}
		})
	}]*/,
    
    listeners: {
    	itemclick: function(view, record, item, index, e, eOpts) {
    		this.getViewModel().set('c_id', record.raw.c_id);
    	}
    },
    
    dockedItems: [{
        xtype: 'cont-video-toolbar',
        dock: 'top'
    }],
    
    tbar: [{
    	text: '添加',
    	iconCls: 'add',
    	handler: 'onAddBtn'
    }/* ' ', '-', ' ', {
    	text: '修改',
    	iconCls: 'edit',
		disabled: true,
		bind: {
			disabled: '{!canModify}'
		},
    	handler: 'onModifyBtn'menu: [{
    		text: '基本信息',
    		tooltip: '修改资产的基本信息',
    		bTag: 'base',
    		handler: 'onModifyBtn'
    	}, '-', {
    		text: '图片信息',
    		tooltip: '修改资产的图片信息',
    		bTag: 'img',
    		handler: 'onModifyBtn'
    	}, '-', {
    		text: '全部',
    		tooltip: '修改资产的基本信息和图片信息',
    		bTag: 'all',
    		handler: 'onModifyBtn'
    	}]
    }, ' ', '-', ' ', {
    	text: '删除',
    	iconCls: 'delete',
		disabled: true,
		bind: {
			disabled: '{!canModify}'
		},
		handler: 'onDeleteBtn'
    }, ' ', '-', ' ', {
    	text: '设置角标',
		disabled: true,
		bind: {
			disabled: '{!canModify}'
		},
		handler: 'onSetSuperscript'
    }, ' ', '-', ' ', {
    	text: '删除角标',
		disabled: true,
		bind: {
			disabled: '{!canModify}'
		},
		handler: 'onDelSuperscript'
    }, ' ', '-', ' ', {
    	text: '视频播放地址',
		disabled: true,
		bind: {
			disabled: '{!canModify}'
		},
		handler: 'showVideoInfo'
    }*/]
});