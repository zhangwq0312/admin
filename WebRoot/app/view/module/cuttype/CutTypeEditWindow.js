Ext.define('app.view.module.cuttype.CutTypeEditWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.cuttypeedit-window',
	
	reference: 'cuttypeedit_window',
	
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
			name: 'c_id',
			hidden: true,
		}, {
			name: 'name',
			allowBlank: false,
			fieldLabel: '*套餐名称',
			emptyText: '输入名称'
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
			fieldLabel: '*类型',
			disabled:true,
		}, {
			name: 'unit_price',
			allowBlank: false,
			fieldLabel: '*套餐单价',
			emptyText: '输入套餐单价',
			disabled:true,
		},{
			name: 'unit_contain_weeks',
			allowBlank: false,
			fieldLabel: '*单位',
			emptyText: '内含数量',
			disabled:true,
		}, {
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
		handler: 'onEditSubmit'
	}, {
		text: '取消',
		handler: function(btn) {
			btn.up('cuttypeedit-window').hide();
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