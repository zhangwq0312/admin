Ext.define('app.view.module.company.CompanyWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.company_window',
	
	reference: 'company_window',
	
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
			name: 'company_userid',
			allowBlank: false,
			fieldLabel: '*申请人电话',
			emptyText: ''
		},{
			xtype: 'combobox',
			name: 'company_leixing',
			allowBlank: false,
			editable: false,
			displayField: 's_name',
			valueField:'s_id',
			flex: 1,
			bind: {
				store: '{companyTypeStore}'
			},
			fieldLabel: '*类型',
		}, {
			name: 'company_name',
			allowBlank: false,
			fieldLabel: '*商铺名称',
			emptyText: ''
		},  {
			name: 'company_short_name',
			allowBlank: false,
			fieldLabel: '*短名称',
			emptyText: ''
		}]
	}],
	buttonAlign: 'center',
	buttons: [{
		text: '提交',
		handler: 'onSubmit'
	}, {
		text: '取消',
		handler: function(btn) {
			btn.up('company_window').hide();
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