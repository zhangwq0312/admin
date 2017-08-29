Ext.define('app.view.module.user.CutMoneyWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.cut_money_window',
	
	reference: 'cut_money_window',
	
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
	title: '扣费',
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
			name: 'i_id',
			fieldLabel: '账户ID',
			readOnly: true
		}, {
			name: 'tel',
			fieldLabel: '电话',
			readOnly: true
		}, {
			name: 'username',
			fieldLabel: '姓名',
			readOnly: true
		}, {
			xtype: 'combobox',
			name: 'cutTypeId',
			allowBlank: false,
			editable: false,
			displayField: 'name',
			valueField:'c_id',
			//queryMode: 'local',
			flex: 1,
			bind: {
				store: '{cutTypeStore}'
			},
			fieldLabel: '*套餐名称',
		}, {
			xtype: 'numberfield',
			anchor: '100%',
			value: 0,
			maxValue: 9999,
			minValue: 1,
			name: 'unit_num',
			fieldLabel: '套餐份数',
			emptyText: '',
		},{
			xtype : 'datefield',
			name : 'begin_date',
			allowBlank : false,
			flex : 1,
			fieldLabel : '*开始时间',
			value : new Date(),
			format : 'Y-m-d H:i:s'
		} ]
	}],
	buttonAlign: 'center',
	buttons: [{
		text: '提交',
		handler: 'onCutMoneySubmit'
	}, {
		text: '取消',
		handler: function(btn) {
			btn.up('cut_money_window').hide();
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