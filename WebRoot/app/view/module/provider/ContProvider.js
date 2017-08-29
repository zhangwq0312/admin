Ext.define('app.view.module.provider.ContProvider', {
	extend: 'Ext.grid.Panel',
	requires: [
       'app.view.module.provider.ContProviderController',
       'app.view.module.provider.ContProviderWindow'
    ],
    
	alias: 'widget.contProvider',
	
	title: '来源列表',
	controller: 'cont-provider',
	
	frame: true,
    columnLines: true,
	
	viewConfig:{
		stripeRows:true,
	    enableTextSelection:true,
	},
	
	initComponent: function() {
		
		var mainViewModel = this.up('app-main').getViewModel();
		this.getController().mainViewModel = mainViewModel;
		
		if(mainViewModel.get('siteAllStore') == null) {
			mainViewModel.set('siteAllStore', Ext.create('app.store.SiteAllStore'));
		}
		if(mainViewModel.get('providerTypeStore') == null) {
			mainViewModel.set('providerTypeStore', Ext.create('app.store.ProviderTypeStore'));
		}
		if(mainViewModel.get('contProviderByAuthStore') == null) {
			mainViewModel.set('contProviderByAuthStore', Ext.create('app.store.ContProviderByAuthStore'));
		}

		var store = Ext.create('app.store.ContProviderStore', {
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
		header: '来源名称',
		dataIndex: 'name',
		width: 200,
		locked: true
	}, {
		header: 'ID',
		dataIndex: 'cp_id',
		width: 80
	}, {
		header: '来源类型',
		dataIndex: 'sourcetype',
		renderer: 'parSesourceTypeV',
		align: 'center',
		width: 60
	}, {
		header: '状态',
		dataIndex: 'p_status',
		align: 'center',
		renderer: function(val) {
			var str = '';
			if(val == 1) {
				str = '正常-普通';
			} else if(val == 2) {
				str = '正常-高级';
			} else if(val == 0) {
				str = '待审';
			} else if(val == -1) {
				str = '禁用';
			}
			
			return str;
		},
		lockable: true,
		width: 80
	}/*, {
		header: '<div class="header_title_center">Prefix前缀</div>',
		dataIndex: 'stb_prefix_names',
		lockable: true,
		width: 150
	}, {
		header: '<div class="header_title_center">对应模式</div>',
		dataIndex: 'site_id',
		renderer: 'parseSiteV',
		lockable: true,
		width: 120
	}, {
		header: '默认模式',
		align: 'center',
		dataIndex: 'isdefault',
		renderer: function(val) {
			var str = '';
			if(val == 1) {
				str = '是';
			} else if(val == 0) {
				str = '否';
			}
			
			return str
		},
		lockable: true,
		width: 60
	}, {
		header: '<div class="header_title_center">对应内容提供方</div>',
		dataIndex: 'cont_provider_id_name',
		lockable: true,
		width: 120
	}, {
		header: '<div class="header_title_center">频道提供方</div>',
		dataIndex: 'chn_provider_name',
		lockable: true,
		width: 80
	}, {
		header: '图标',
		dataIndex: 'icon_url',
		renderer: 'parseIconUrl',
		flex: 1
	}*/, {
		header: '应用包名',
		dataIndex: 'packagename',
		align: 'center',
		width: 150
	}, {
		header: '应用下载地址',
		dataIndex: 'download_url',
		align: 'center',
		width: 80
	}, {
		header: '机型',
		dataIndex: 'model_ids',
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
        xtype: 'actioncolumn',
        locked: true,
        width: 80,
        sortable: false,
        menuDisabled: true,
        align: 'center',
        items: [' ', {
        	iconCls: 'edit',
        	tooltip: '修改',
            handler: 'onModify'
        }, ' ', {
        	iconCls:'delete',
        	tooltip: '删除',
            handler: 'onRemove'
        }, ' ']
    }],
    
    listeners: {
    },
	plugins: [{
		ptype: 'rowexpander',
		expandOnDblClick: false,
		rowBodyTpl: new Ext.XTemplate(
			'<p><b>第三方应用信息:</b></p>',
			'<p><b>apk的唯一标签:</b> {trd_model}</p>',
			'<p><b>apk名称:</b> {trd_name}</p>',
			'<p><b>apk下载路径，用于在客户端生成二维码形式:</b> {trd_downloadurl}</p>',
			'<p><b>登录方式：web/phone/client等:</b> {trd_login_way}</p>',
			'<p><b>apk介绍:</b> {trd_apk_info}</p>',
			'<p><b>apk图标:</b> {trd_apk_icon}</p>',
			'<p><b>web登录url连接:</b> {trd_login_way_web}</p>',
			'<p><b>获取数据的接口地址:</b> {trd_get_date_current}</p>',
			'<p><b>备注信息:</b> {trd_other}</p>',
			{
			formatSInfo: function(v) {
				var arr = v.split('\\n');
				return arr.join('<br>&nbsp;&nbsp;&nbsp;&nbsp;');
			},
			parserV: function(v) {
				var str = '';
				
				if(v==1) {
					str = '能';
				} else if(v==0) {
					str = '不能';
				}
				
				return str;
			}
		})
	}],
    
    tbar: [{
    	text: '添加',
    	iconCls: 'add',
    	handler: 'onAddBtn'
    }],
	
	iconCls: 'icon-grid'
});