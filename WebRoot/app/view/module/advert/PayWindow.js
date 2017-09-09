Ext.define('app.view.module.advert.PayWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.advert_paywindow',
	
	reference: 'advert_paywindow',
	
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
	title: '购买',
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
			name: 'advert_userid',
			fieldLabel: '申请人电话',
			readOnly: true
		}, {
			name: 'user_name',
			fieldLabel: '申请人',
			readOnly: true
		},{
			fieldLabel: '商户ID',
			name: 'advert_id',
			hidden:true,
		},{
			name: 'advert_name',
			fieldLabel: '商户名称',
			readOnly: true,
		},  {
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
			fieldLabel: '*套餐份数',
			emptyText: '',
		},{
			xtype : 'datefield',
			name : 'advert_valid_time',
			allowBlank : false,
			flex : 1,
			fieldLabel : '有效时间',
			format : 'Y-m-d H:i:s',
			readOnly: true,
		},{
			xtype : 'datefield',
			name : 'begin_date',
			allowBlank : false,
			flex : 1,
			fieldLabel : '当前时间',
			value : new Date(),
			format : 'Y-m-d H:i:s',
			readOnly: true,
		} ]
	}],
	buttonAlign: 'center',
	buttons: [{
		text: '提交',
		handler: 'onPaySubmit'
	}, {
		text: '取消',
		handler: function(btn) {
			btn.up('advert_paywindow').hide();
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