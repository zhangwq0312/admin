Ext.define('app.view.module.coupon.Toolbar', {
	extend: 'Ext.toolbar.Toolbar',
    
	alias: 'widget.coupon_toolbar',
	
	defaultType: 'textfield',
		items: [{
					name: 'company_name',
					fieldLabel: '商户名称',
					labelAlign: 'right',
					flex: 1,
				},{  	
					name: 'tel',
					fieldLabel: '商户手机账号',
					labelAlign: 'right',
					flex: 1,
				},  {
					xtype:'combobox',
					name: 'type',
					fieldLabel: '类型',
					labelAlign: 'right',
					editable: false,
					displayField: 'type_name',
					valueField:'type_id',
					flex: 1,
                    value:'',
					store: {
						xtype: 'Ext.data.Store',
						fields:['type_name','type_id'],
						data: [
							{type_name:'请选择',type_id:''},
							{type_name:'进行中',type_id : '1'},
							{type_name:'未发布',type_id : '2'},
                            {type_name:'已结束',type_id : '3'},
						]
					},
					
				}, {
					xtype:'combobox',
					name: 'status',
					fieldLabel: '状态',
					labelAlign: 'right',
                    allowBlank: false,
                    editable: false,
                    displayField: 's_name',
                    valueField:'s_id',
                    queryMode: 'local',
					flex: 1,
                    value:'',
                    bind: {
                        store: '{commonStatusStore}'
                    },
				},{
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