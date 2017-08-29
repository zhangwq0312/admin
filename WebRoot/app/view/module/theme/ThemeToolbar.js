Ext.define('app.view.module.theme.ThemeToolbar', {
	extend: 'Ext.toolbar.Toolbar',
    
	alias: 'widget.theme-toolbar',
	
	items: [{
		xtype : 'panel',
		baseCls : 'x-plain'
	},'按条件搜索主题：'	,{
		xtype: 'combobox',
		name: 'provider_id',
		labelWidth: 40,
		maxWidth: 150,
		labelAlign: 'right',
		displayField: 'cp_name',
		valueField:'cp_id',
		queryMode: 'local',
		editable: false,
		flex: 1,
		bind: {
			store: '{contProviderByAuthStore}'
		},
		hideLabel : true,
		fieldLabel: '来源',
		emptyText : '请选择来源...',
		listeners: {
			select: 'onThemeProviderSelect'
		}
	}, {
		xtype: 'combobox',
		name: 'c_status',
		labelWidth: 40,
		maxWidth: 100,
		labelAlign: 'right',
		displayField: 's_name',
		valueField:'s_id',
		queryMode: 'local',
		editable: false,
		flex: 1,
		bind: {
			store: '{contStatusStore}'
		},
		hideLabel : true,
		fieldLabel: '状态',
		emptyText : '请选择状态',
		listeners: {
			select: 'onStatusSelect'
		}
	}, {
    	xtype: 'textfield',
    	name: 'name',
		hideLabel : true,
		fieldLabel: '资产名称',
		emptyText : '主题名称(模糊)',
    	tooltip: '主题名称(模糊)',
		labelWidth: 70,
		maxWidth: 150,
		flex: 1,
		labelAlign: 'right',
		listeners: {
			change: 'onThemeNameChange'
		}
	}, {
    	xtype: 'textfield',
    	name: 'price',
		hideLabel : true,
		fieldLabel: '主题价格',
		emptyText : '主题价格',
		labelWidth: 70,
		maxWidth: 90,
		flex: 1,
		labelAlign: 'right',
		listeners: {
			change: 'onThemePriceChange'
		}
	}, {
    	xtype: 'textfield',
    	name: 'version_code',
		hideLabel : true,
		fieldLabel: '主题版本号',
		emptyText : '主题版本号',
		labelWidth: 70,
		maxWidth: 90,
		flex: 1,
		labelAlign: 'right',
		listeners: {
			change: 'onThemeVersionChange'
		}
	}
//	, {
//		xtype: 'combobox',
//		name: 'c_s_type',
//		labelWidth: 40,
//		maxWidth: 100,
//		labelAlign: 'right',
//		displayField: 's_name',
//		valueField:'s_id',
//		queryMode: 'local',
//		editable: false,
//		flex: 1,
//		bind: {
//			store: '{contTypeStore}'
//		},
//		hideLabel : true,
//		fieldLabel: '类型',
//		emptyText : '请选择类型',
//		listeners: {
//			select: 'onTypeSelect'
//		}
//	}
	, {
		xtype: 'button',
		text: '搜索',
		glyph: 0xf002,
		width: 60,
		margin: '0, 0, 0, 20',/*
		disabled: false,
		bind: {
			disabled: '{!canSearch}'
		},*/
		handler: 'onSearchTheme'
	}, {
		xtype: 'button',
		text: '重置',
		width: 60,
		margin: '0, 0, 0, 20',
		handler: 'onSearchThemeReset'
	}]
});