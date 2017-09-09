Ext.define('app.view.module.msg.Toolbar', {
	extend: 'Ext.toolbar.Toolbar',
    
	alias: 'widget.msg_toolbar',
	
	defaultType: 'textfield',
		items: [{  	
					name: 'tel',
					fieldLabel: '手机',
					labelAlign: 'right',
					width: 230,
				}, {
					name: 'username',
					fieldLabel: '姓名',
					labelAlign: 'right',
					width: 200,
				}, {
					xtype:'combobox',
					name: 'status',
					fieldLabel: '状态',
					labelAlign: 'right',
					editable: false,
					displayField: 's_name',
					valueField:'s_id',
					width: 200,
					bind: {
						store: '{msgStatusStore}',
					},
					
				}, {
					xtype: 'button',
					text: '搜索',
					glyph: 0xf002,
					width: 60,
					margin: '0, 20, 0, 80',
					handler: 'search'
				}, {
					xtype: 'button',
					text: '重置',
					glyph: 0xf112,
					width: 60,
					handler: 'onSearchReset'
	
				}]


});