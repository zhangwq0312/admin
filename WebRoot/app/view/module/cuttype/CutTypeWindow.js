Ext.define('app.view.module.cuttype.CutTypeWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.cuttype-window',
	
	reference: 'cuttype_window',
	
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
	title: '新建类型',
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
			fieldLabel: '*套餐名称',
			emptyText: '体现:名称、单价、内含数量'
		}, {
			xtype: 'combobox',
			name: 'type',
			allowBlank: false,
			editable: false,
			displayField: 's_name',
			valueField:'s_id',
			queryMode: 'local',
			flex: 1,
			bind: {
				store: '{cutTypeTypeStore}'
			},
			fieldLabel: '*类型'
		}, {
			xtype: 'numberfield',
			value: 0,
			minValue: 1,
			name: 'unit_price',
			allowBlank: false,
			fieldLabel: '*套餐单价',
			emptyText: '输入套餐单价'
		}, {
			xtype: 'numberfield',
			value: 0,
			minValue: 1,
			name: 'unit_contain_weeks',
			allowBlank: false,
			fieldLabel: '*内含数量',
			emptyText: '输入数量'
		},{
			xtype: 'combobox',
			name: 'status',
			allowBlank: false,
			editable: false,
			displayField: 's_name',
			valueField:'s_id',
			queryMode: 'local',
			flex: 1,
			bind: {
				store: '{commonStatusStore}'
			},
			fieldLabel: '*状态'
		}]
	}],
	buttonAlign: 'center',
	buttons: [{
		text: '提交',
		handler: 'onSubmit'
	}, {
		text: '取消',
		handler: function(btn) {
			btn.up('cuttype-window').hide();
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