Ext.define('app.view.module.company.Toolbar', {
	extend: 'Ext.toolbar.Toolbar',
    
	alias: 'widget.company_toolbar',
	
	defaultType: 'textfield',
		items: [{  	
					name: 'tel',
					fieldLabel: '手机',
					labelAlign: 'right',
					flex: 1,
					listeners: {
						change: 'onSearchChangeTel'
					}
				}, {
					name: 'title',
					fieldLabel: '名称关键词',
					labelAlign: 'right',
					flex: 1,
					listeners: {
						change: 'onSearchChangeTitle'
					}
				}, {
					xtype:'combobox',
					name: 'type',
					fieldLabel: '类型',
					labelAlign: 'right',
					editable: false,
					displayField: 'type_name',
					valueField:'type_id',
					flex: 1,

					store: {
						xtype: 'Ext.data.Store',
						fields:['type_name','type_id'],
						data: [
							{type_name:'不限',type_id:''},
							{type_name:'住房',type_id : 'zl_house'},
							{type_name:'工作',type_id : 'zl_employ'},
							{type_name:'电话薄',type_id : 'zl_tel'}
						]
					},
					listeners: {
						select: 'onSearchChangeType'
					}
					
				}, {
					xtype:'combobox',
					name: 'status',
					fieldLabel: '状态',
					labelAlign: 'right',
					editable: false,
					displayField: 'status_name',
					valueField:'status_id',
					flex: 1,

					store: {
						xtype: 'Ext.data.Store',
						fields:['status_name','status_id'],
						data: [
							{status_name:'不限',status_id:''},
							{status_name:'正常',status_id : '0'},
							{status_name:'禁用',status_id : '-1'},
							{status_name:'待交费',status_id : '-99'}
						]
					},
					listeners: {
						select: 'onSearchChangeStatus'
					}
					
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