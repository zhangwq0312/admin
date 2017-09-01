Ext.define('app.view.module.credit.CreditActionWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.creditAction-window',
	
	reference: 'creditAction_window',
	
	uses: [
	   'app.ux.form.MultiTextAreaField'
	],
	
	closable: true,
	closeAction: 'hide',
	resizable: false,
	modal: true,
	draggable: true,
	autoShow: true,
	width: 390,
	scrollable: true,
	//title: '新增积分场景',
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
			name: 'creditName',
			allowBlank: false,
			fieldLabel: '*名称',
			emptyText: '输入积分名称'
		}, {
			name: 'creditType',
			allowBlank: false,
			fieldLabel: '*动作序号',
			emptyText: '输入BI动作序号'
		}, {
			name: 'creditValue',
			allowBlank: false,
			fieldLabel: '*积分值',
			emptyText: '输入积分值'
		}, {
			xtype: 'combobox',
			name: 'creditCategory',
			allowBlank: false,
			editable: false,
			displayField: 's_name',
			valueField:'s_id',
			queryMode: 'local',
			flex: 1,
			value: '0',
			bind: {
				store: '{creditActionTypeStore}'
			},
			fieldLabel: '*积分类型'
		}, {
			xtype: 'combobox',
			name: 'statType',
			allowBlank: false,
			editable: false,
			displayField: 's_name',
			valueField:'s_id',
			queryMode: 'local',
			flex: 1,
			value: '0',
			bind: {
				store: '{creditActionStatTypeStore}'
			},
			fieldLabel: '*统计方式'
		}, {
			name: 'packageName',
			allowBlank: true,
			fieldLabel: '应用包名',
			emptyText: '输入应用包名'
		}, {
			name: 'continueDay',
			allowBlank: true,
			fieldLabel: '连续天数',
			emptyText: '输入连续天数'
		}, {
			name: 'extraCredit',
			allowBlank: true,
			fieldLabel: '额外奖励',
			emptyText: '输入额外奖励'
		/*}, {
			xtype: 'multitextareafield',
			valueName: 'role_ids',
			textName: 'role_names',
			fieldLabel: '角 色',
			margin: '5, 0, 5, 0',
			allowBlank: true,
			onHandler: 'onChoiceRole'
		}, {
			name: 'phone',
			vtype: 'phonenum',
			fieldLabel: '手机号码',
			emptyText: '输入手机号码'
		}, {
			name: 'tel',
			vtype: 'telnum',
			fieldLabel: '电话号码',
			emptyText: '输入电话号码'
		}, {
			name: 'email',
			vtype: 'email',
			fieldLabel: '邮箱地址',
			emptyText: '输入邮箱地址'
		}, {
			xtype: 'textareafield',
			name: 'intro',
			fieldLabel: '备注',
			emptyText: '输入备注'*/
		}]
	}],
	buttonAlign: 'center',
	buttons: [{
		text: '提交',
		handler: 'onSubmit'
	}, {
		text: '取消',
		handler: function(btn) {
			btn.up('creditAction-window').hide();
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