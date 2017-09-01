Ext.define('app.view.module.column.ColumnWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.column-window',
	requires: [
	           'app.view.module.column.ColumnController',
	           'app.view.module.column.ColumnModel'
	        ],
	reference: 'column_window',
	
	uses: [
	       'app.store.ColumnShortCutStore',
	       'app.ux.form.MultiTypeUserGroup',
	       'app.ux.form.MultiImgGroup',
	       'app.ux.form.ColumnShortcutTextField',
	       'app.ux.form.PreviewFileField'],
	
    closable: true,
	closeAction: 'hide',
	resizable: false,
	modal: true,
	draggable: true,
	autoShow: true,
	width: 720,
	scrollable: true,
	title: '添加栏目',
//	y: 10,
	glyph: 0xf007,
	initComponent: function() {
		
		this.maxHeight = Ext.getBody().getHeight() - 20;
		
		this.callParent();
	},
	items:[{
		xtype: 'form',
		bodyPadding: 20,
//		referenceHolder: true,
		fieldDefaults: {
	        labelWidth: 120,
			labelAlign: 'right'
	    },
		items: [{
			xtype: 'textfield',
			name: 'column_base_info',
			value: 1,
			bind: {
				//value: '{column_base_info}'
			},
		    hidden: true
		}, {
  			    xtype: 'textfield',
				name: 'c_id',
				hidden: true,
				value: '-1'
			}, {
				xtype: 'textfield',
				name: 'c_pid',
				hidden: true,
				value: '0'
			}, {
				xtype: 'container',
				layout: 'hbox',
				defaultType: 'textfield',
				items: [{
					name: 'title',
					fieldLabel: '*栏目名称',
					allowBlank: false,
					flex: 1,
					emptyText: '输入栏目名称'
				}, {
					name: 'version',
					fieldLabel: '栏目版本',
					flex: 1,
					emptyText: '输入栏目版本'
				}]
			}, {
				xtype: 'container',
				layout: 'hbox',
				margin: '10, 0, 0, 0',
				items: [{
					xtype: 'combobox',
					name: 'status',
					allowBlank: false,
					editable: false,
					displayField: 's_name',
					valueField:'s_id',
					queryMode: 'local',
					flex: 1,
					value: '1',
					bind: {
						store: '{columnStatusStore}'
					},
					fieldLabel: '*栏目状态',
					emptyText: '选择栏目状态'
				},  {
					xtype: 'datefield',
					name: 'active_time',
					allowBlank: false,
					flex: 1,
					fieldLabel: '*生效时间',
					value: new Date(),
					format: 'Y-m-d H:i:s'
				}]
			}, {
				xtype: 'container',
				layout: 'hbox',
				margin: '10, 0, 0, 0',
				items: [{
					xtype: 'combobox',
					name: 'menu_code',
					allowBlank: false,
					editable: false,
					displayField: 's_name',
					valueField:'s_id',
					queryMode: 'local',
					flex: 1,
					value: '',
					bind: {
						store: '{columnCodeStore}'
					},
					fieldLabel: '*栏目(海报位)编码',
					emptyText: '选择栏目(海报位)编码'
				},{
					xtype: 'datefield',
					name: 'deactive_time',
					allowBlank: false,
					flex: 1,
					fieldLabel: '*失效时间',
					value: Ext.Date.add(new Date(), Ext.Date.YEAR, 50),
					format: 'Y-m-d H:i:s'
				}]
			}, {
				xtype: 'container',
				layout: 'hbox',
				margin: '10, 0, 0, 0',
				items: [{
					xtype: 'combobox',
					name: 'struct_type',
					allowBlank: false,
					editable: false,
					displayField: 's_name',
					valueField:'s_id',
					queryMode: 'local',
					flex: 1,
					value: '3',
					bind: {
						store: '{columnTypeStore}'
					},
					fieldLabel: '*栏目类型',
					emptyText: '选择栏目类型'
				}, {
					xtype: 'textfield',
					name: 'order_num',
					flex: 1,
					value: 0,
					allowBlank: false,
					fieldLabel: '*排序号',
					emptyText: '输入排序号'
				}]
			} , {
				xtype: 'checkbox',
				name: 'islocal',
				flex: 1,
				value: 0,
				fieldLabel: '是否可供客户端选择'
			}]
		}],
	buttonAlign: 'center',
	buttons: [{
		text: '提交',
		handler: 'onSubmit'
	}, {
		text: '取消',
		handler: 'onCancel'
	}],
	listeners: {
		resize: function(win, width, height) {
			var bodyH = Ext.getBody().getHeight();
			var y = (bodyH-height)/2;
			win.setY(y);
			win.setMaxHeight(bodyH-20);
		},
		show: function(win) {
			var viewModel = this.getViewModel();
		}
	}
});