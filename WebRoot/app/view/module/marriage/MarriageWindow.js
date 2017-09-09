Ext.define('app.view.module.marriage.MarriageWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.marriage_window',
	
	reference: 'marriage_window',
	
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
			name: 'm_id',
			fieldLabel: '*ID',
			value: '',
            readOnly:'true',
		},{
			name: 'm_tel',
			fieldLabel: '*电话',
            allowBlank: false,
			value: '',
		},{
			name: 'm_fullname',
			fieldLabel: '*姓名',
            allowBlank: false,
			value: '',
		},{
            xtype: 'combobox',
			name: 'm_sex',
			fieldLabel: '*性别',
            value:'',
			allowBlank: false,
			displayField: 's_name',
			valueField:'s_id',
            bind:{
                store:'{sexStatusStore}',
            },
        },{
			xtype: 'numberfield',
			anchor: '100%',
			value: 1980,
			maxValue: 9999,
			minValue: 1,
			name: 'm_born_time',
			fieldLabel: '*出生年份',
			emptyText: '', 
        },{
			name: 'm_education',
			fieldLabel: '*学历',
			emptyText: '',
        },{
			name: 'm_job',
			fieldLabel: '*职业',
			emptyText: '',
        },{
			name: 'm_address',
			fieldLabel: '*约会地址',
			emptyText: '',
        },{
            xtype     : 'textareafield',
            grow      : true,
            name      : 'm_message',
			fieldLabel: '情感寄语',
            anchor    : '100%',
        },{
            xtype: 'combobox',
			name: 'm_identity',
			fieldLabel: '*认证',
			allowBlank: false,
			displayField: 's_name',
			valueField:'s_id',
            value:'',
            bind:{
                store:'{identityStatusStore}',
            },
        },{
            xtype: 'combobox',
			name: 'm_photo',
			fieldLabel: '*相片',
			allowBlank: false,
			displayField: 's_name',
			valueField:'s_id',
            value:'',
            bind:{
                store:'{marriageImgStatusStore}',
            },
        }]
	}],
	buttonAlign: 'center',
	buttons: [{
		text: '提交',
		handler: 'onSubmit'
	}, {
		text: '取消',
		handler: function(btn) {
			btn.up('marriage_window').hide();
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