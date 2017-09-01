Ext.define('app.view.module.column.UserToolbar', {
	extend: 'Ext.toolbar.Toolbar',
    
	alias: 'widget.user-toolbar',
	
	defaultType: 'textfield',
		items: [{  	
					name: 'tel',
					fieldLabel: '手机',
					labelAlign: 'right',
					flex: 1
				}, {
					name: 'username',
					fieldLabel: '姓名',
					labelAlign: 'right',
					flex: 1
				}, {
					xtype:'combo',
					name: 'sex',
					fieldLabel: '性别',
					labelAlign: 'right',
					displayField: 'sex_name',
					valueField:'sex_id',
					flex: 1,
					store: {
						xtype: 'Ext.data.Store',
						fields:['sex_name','sex_id'],
						data: [
							{sex_name:'不限',sex_id:'0'},
							{sex_name:'男',sex_id : '1'},
							{sex_name:'女',sex_id : '2'}
						]
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
					handler: function() {
						this.up('form').reset();
					}
	
				},'->']


});