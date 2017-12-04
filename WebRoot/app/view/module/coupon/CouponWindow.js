Ext.define('app.view.module.coupon.CouponWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.coupon_window',
	
	reference: 'coupon_window',
	
	uses: [
	   'app.ux.form.MultiTextAreaField'
	],
	
	closable: true,
	closeAction: 'hide',
	resizable: false,
	modal: true,
	draggable: true,
	autoShow: true,
	width: 420,
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
	        labelWidth: 80,
			labelAlign: 'right',
	        anchor: '100%'
	    },
	    defaultType: 'textfield',
		items: [{
			name: 'o_id',
			hidden: true,
			value: '-1'
		},{
			name: 'company_id',
			allowBlank: false,
			fieldLabel: '*商户ID',
			emptyText: ''
		},{
			name: 'big',
			allowBlank: false,
			fieldLabel: '*券名',
			emptyText: ''
		},{
			name: 'small',
			allowBlank: false,
			fieldLabel: '*small',
			emptyText: ''
		},{
			name: 'description',
			allowBlank: false,
			fieldLabel: '*description',
			emptyText: ''
		},{
			name: 'total_num',
			allowBlank: false,
			fieldLabel: '*总数',
			emptyText: ''
		},{
			xtype: 'combobox',
			name: 'coupon_status',
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
		},{
			name: 'rest_num',
			allowBlank: false,
			fieldLabel: '*余数',
			emptyText: ''
		},{
			xtype : 'datefield',
			name : 'coupon_create_time',
			flex : 1,
			fieldLabel : '创建时间',
			format : 'Y-m-d H:i:s',
            readOnly: true,
		},{
			xtype : 'datefield',
			name : 'coupon_start_time',
			allowBlank : false,
			flex : 1,
			fieldLabel : '*生效时间',
			format : 'Y-m-d H:i:s',
		},{
			xtype : 'datefield',
			name : 'coupon_end_time',
			allowBlank : false,
			flex : 1,
			fieldLabel : '*失效时间',
			format : 'Y-m-d H:i:s',
		},{
			xtype : 'datefield',
			name : 'coupon_publish_start_time',
			allowBlank : false,
			flex : 1,
			fieldLabel : '*发券起',
			format : 'Y-m-d H:i:s',
		},{
			xtype : 'datefield',
			name : 'coupon_publish_end_time',
			allowBlank : false,
			flex : 1,
			fieldLabel : '*发券止',
			format : 'Y-m-d H:i:s',
		},]
	}],
	buttonAlign: 'center',
	buttons: [{
		text: '提交',
		handler: 'onSubmit'
	}, {
		text: '取消',
		handler: function(btn) {
			btn.up('coupon_window').hide();
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