Ext.define('app.view.module.user.AddMoneyWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.add_money_window',
	
	reference: 'add_money_window',
	
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
	title: '交费',
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
			xtype: 'numberfield',
			anchor: '100%',
			fieldLabel: 'Bottles of Beer',
			value: 0,
			maxValue: 10000,
			minValue: 1,
			name: 'addmoney',
			fieldLabel: '交费',
			emptyText: '',
		}]
	}],
	buttonAlign: 'center',
	buttons: [{
		text: '提交',
		handler: 'onAddMoneySubmit'
	}, {
		text: '取消',
		handler: function(btn) {
			btn.up('add_money_window').hide();
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