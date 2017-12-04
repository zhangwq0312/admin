Ext.define('app.view.module.role.RoleWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.role-window',
	
	reference: 'role_window',
	
	uses: ['app.ux.form.MultiTextAreaField'],
	
	closable: true,
	closeAction: 'hide',
	resizable: false,
	modal: true,
	draggable: true,
	autoShow: true,
	width: 360,
	scrollable: true,
	title: '新建角色',
	glyph: 0xf007,
	initComponent: function() {
		this.maxHeight = Ext.getBody().getHeight() - 20;
		this.callParent();
	},
	items:[{
		xtype: 'form',
		bodyPadding: 20,
		fieldDefaults: {
	        labelWidth: 68,
			labelAlign: 'right',
	        anchor: '100%'
	    },
	    defaultType: 'textfield',
		items: [{
			name: 'o_id',
			hidden: true,
			value: '-1'
		}, {
			name: 'name',
			allowBlank: false,
			fieldLabel: '*角色名称',
			emptyText: '输入角色名称'
		},{
			xtype: 'multitextareafield',
			valueName: 'module_ids',
			textName: 'module_names',
			fieldLabel: '模块',
			emptyText: '选择模块',
			margin: '5, 0, 0, 0',
			allowBlank: false,
			onHandler: 'onChoiceModule'
		}]
	}],
	buttonAlign: 'center',
	buttons: [{
		text: '提交',
		handler: 'onSubmit'
	}, {
		text: '取消',
		handler: function(btn) {
			btn.up('role-window').hide();
		}
	}],
	listeners: {
		resize: function(win, width, height) {
			var bodyH = Ext.getBody().getHeight();
			var y = (bodyH-height)/2;
			win.setY(y);
			win.setMaxHeight(bodyH-20);
		}
	}
});