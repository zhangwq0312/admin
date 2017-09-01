Ext.define('app.view.module.post.PayWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.paywindow',
	
	reference: 'paywindow',
	
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
			name: 'user_tel',
			fieldLabel: '电话',
			readOnly: true
		}, {
			name: 'user_name',
			fieldLabel: '姓名',
			readOnly: true
		},{
			fieldLabel: '帖子类型',
			name: 'post_table',
			hidden:true,
		},{
			fieldLabel: '帖子ID',
			name: 'post_id',
			hidden:true,
		},{
			name: 'post_title',
			fieldLabel: '帖子',
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
			fieldLabel: '套餐份数',
			emptyText: '',
		},{
			xtype : 'datefield',
			name : 'post_build_time',
			allowBlank : false,
			flex : 1,
			fieldLabel : '*已刷时间',
			format : 'Y-m-d H:i:s'
		},{
			xtype : 'datefield',
			name : 'begin_date',
			allowBlank : false,
			flex : 1,
			fieldLabel : '*当前时间',
			value : new Date(),
			format : 'Y-m-d H:i:s'
		} ]
	}],
	buttonAlign: 'center',
	buttons: [{
		text: '提交',
		handler: 'onPaySubmit'
	}, {
		text: '取消',
		handler: function(btn) {
			btn.up('paywindow').hide();
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