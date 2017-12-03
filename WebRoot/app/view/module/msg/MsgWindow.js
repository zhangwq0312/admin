Ext.define('app.view.module.msg.MsgWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.msg_window',
	
	reference: 'msg_window',
	
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
			name: 'm_id',
			hidden: true,
		},{
			fieldLabel: '*开始时间',
			name: 'create_time',
			emptyText: '',
            readOnly:true,
		},{
			fieldLabel: '*联系电话',
			name: 'from_tel',
			emptyText: '',
            readOnly:true,
		},{
			fieldLabel: '*联系人',
			name: 'person',
			emptyText: '',
            readOnly:true,
		},{
			fieldLabel: '*QQ',
			name: 'qq',
			emptyText: '',
            readOnly:true,
		},{
			fieldLabel: '*发言内容',
			name: 'description',
            anchor    : '100%',
            xtype     : 'textareafield',
            grow      : true,
            readOnly:true,
		},{
            xtype: 'combobox',
			fieldLabel: '*状态',
			name: 'status',
            value:'',
			allowBlank: false,
			displayField: 's_name',
			valueField:'s_id',
            bind:{
                store:'{msgStatusStore}',
            },
		},{
			fieldLabel: '*回应客户',
			name: 'reply',
            anchor    : '100%',
            xtype     : 'textareafield',
            grow      : true,
		},{
            xtype:'checkboxgroup',
            fieldLabel:'是否短信提醒',
            items:[{
                xtype: 'fieldset',
                collapsible: false,
                border:0,
                defaultType : 'checkbox',
                items: [{boxLabel:'是',name:'shortmsg_flag',inputValue:'1',checked:false }]
            }]
		}]
	}],
	buttonAlign: 'center',
	buttons: [{
		text: '提交',
		handler: 'onSubmit'
	}, {
		text: '取消',
		handler: function(btn) {
			btn.up('msg_window').hide();
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