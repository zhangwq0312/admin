Ext.define('app.view.module.marriage.Toolbar', {
	extend: 'Ext.toolbar.Toolbar',
    
	alias: 'widget.marriage_toolbar',
	
	defaultType: 'textfield',
		items: [{  	
					name: 'tel',
					fieldLabel: '手机',
					labelAlign: 'right',
					width:190,
				}, {
					name: 'username',
					fieldLabel: '姓名关键词',
					labelAlign: 'right',
					width:180,
				}, {
					xtype:'combobox',
					name: 'sex',
					fieldLabel: '性别',
					labelAlign: 'right',
					editable: false,
					displayField: 's_name',
					valueField:'s_id',
					flex: 1,
                    value:'',
					bind: {
						store: '{sexStatusStore}',
					},
                    flex: 1,
				},{
					xtype:'combobox',
					name: 'identity',
					fieldLabel: '认证',
					labelAlign: 'right',
					editable: false,
					displayField: 's_name',
					valueField:'s_id',
                    value:'0',
					bind: {
						store: '{identityStatusStore}',
					},
                    flex: 1,
				},{
					xtype:'combobox',
					name: 'img',
					fieldLabel: '相片',
					labelAlign: 'right',
					editable: false,
					displayField: 's_name',
					valueField:'s_id',
                    value:'1',
					bind: {
						store: '{marriageImgStatusStore}',
					},
                    flex: 1,
				}, {
					xtype:'combobox',
					name: 'status',
					fieldLabel: '状态',
					labelAlign: 'right',
					editable: false,
					displayField: 's_name',
					valueField:'s_id',
                    value:'0',
                    bind: {
						store: '{commonStatusStore}',
					},
                    flex: 1,
				},{
					xtype: 'button',
					text: '搜索',
					glyph: 0xf002,
					width: 60,
					margin: '0, 20, 0, 80',
					handler: 'search'
				}]


});