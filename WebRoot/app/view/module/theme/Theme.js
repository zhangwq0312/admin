Ext.define('app.view.module.theme.Theme', {
	extend : 'Ext.grid.Panel',
	requires : [ 'app.view.module.theme.ThemeController',
			'app.view.module.theme.ThemeModel' ],

	alias : 'widget.themeManage',
	uses : [ 'app.view.module.theme.ThemeToolbar',
			'app.view.module.theme.ThemeWindow',
			'app.view.module.theme.ThemeImgWindow',
			'app.view.module.theme.ThemeDownloadUrlListWindow' ],

	title : '购物资产',
	controller : 'cont-theme',
	viewModel : {
		type : 'cont-themeviewmodel'
	},

	frame : true,
	columnLines : true,
	iconCls : 'icon-grid',

	initComponent : function() {

		var mainViewModel = this.up('app-main').getViewModel();
		this.getController().mainViewModel = mainViewModel;

		if (mainViewModel.get('contStatusStore') == null) {
			mainViewModel.set('contStatusStore', Ext
					.create('app.store.ContStatusStore'));
		}

		if (mainViewModel.get('contProviderByAuthStore') == null) {
			mainViewModel.set('contProviderByAuthStore', Ext
					.create('app.store.ContProviderByAuthStore'));
		}

		if (mainViewModel.get('contTypeStore') == null) {
			mainViewModel.set('contTypeStore', Ext
					.create('app.store.ContTypeStore'));
		}

		var store = Ext.create('app.store.ThemeListStore');

		var pageSize = store.getPageSize();

		Ext.apply(this, {
			store : store,
			bbar : {
				xtype : 'pagingtoolbar',
				pageSize : pageSize,
				store : store,
				displayInfo : true,
				plugins : Ext.create('app.ux.ProgressBarPager')
			},
			viewConfig : {
				stripeRows : true,
				enableTextSelection : true
			}
		});

		this.callParent();
	},
	selModel : {
		selType : 'checkboxmodel',
		// mode : 'SIMPLE'
		mode : 'SINGLE'
	},
	columns : [
			{
				header : '名称',
				dataIndex : 'c_site',
				hidden : true
			},
			{
				header : '名称',
				dataIndex : 'name',
				width : 200,
				locked : true
			},
			{
				header : 'ID',
				dataIndex : 'c_id',
				align : 'center',
				width : 120
			},
			{
				header : '包名',
				dataIndex : 'package_name',
				align : 'center',
				width : 180
			},
			{
				header : '价格',
				dataIndex : 'price',
				align : 'center',
				width : 100
			},
			{
				header : '来源',
				dataIndex : 'provider_id',
				renderer : 'parseProviderV',
				align : 'center',
				width : 150
			},
			{
				header : '类型',
				dataIndex : 'c_type',
				renderer : 'parseTypeV',
				align : 'center',
				width : 100
			},
			{
				header : '状态',
				dataIndex : 'c_status',
				renderer : 'parseStatusV',
				align : 'center',
				width : 100
			},
			{
				xtype : 'datecolumn',
				format : 'Y-m-d H:i:s',
				header : '生效时间',
				dataIndex : 'active_time',
				align : 'center',
				width : 150,
			},
			{
				xtype : 'datecolumn',
				format : 'Y-m-d H:i:s',
				header : '失效时间',
				dataIndex : 'deactive_time',
				align : 'center',
				width : 150,
			}, {
				header : '版本',
				dataIndex : 'version',
				width : 150
			}, {
				header : '版本代码',
				dataIndex : 'version_code',
				width : 150
			}, {
				header : '',
				xtype : 'actioncolumn',
				locked : true,
				width : 100,
				sortable : false,
				menuDisabled : true,
				align : 'center',
				items : [ ' ', {
					iconCls : 'edit',
					tooltip : '编辑主题',
					handler : 'onThemeModify'
				}, ' ', {
					iconCls : 'delete',
					tooltip : '删除主题',
					handler : 'onThemeDelete'
				} ]
			} ],

	listeners : {
		itemclick : function(view, record, item, index, e, eOpts) {
			this.getViewModel().set('c_id', record.raw.c_id);
		}
	},

	dockedItems : [ {
		xtype : 'theme-toolbar',
		dock : 'top'
	} ],

	tbar : [ {
		text : '添加主题',
		iconCls : 'add',
		handler : 'onAddThemeBtn'
	}, '-', ' ', {
		text : '上传主题图片',
		iconCls : 'add',
		handler : 'onAddThemeImgBtn'
	}, '-', ' ', {
		text : '主题apk下载',
		iconCls : 'add',
		handler : 'onAddThemeApkBtn'
	} ]
});