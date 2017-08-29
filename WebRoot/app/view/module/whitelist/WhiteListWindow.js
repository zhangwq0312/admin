Ext.define('app.view.module.whitelist.WhiteListWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.whitelist-window',
	
	reference: 'whitelist_window',
	
	uses: [
	       'app.ux.form.UploadFileField'
	    ],
	
	closable: true,
	closeAction: 'hide',
	resizable: false,
	modal: true,
	draggable: true,
	autoShow: true,
	width: 660,
	scrollable: true,
	title: '添加',
	glyph: 0xf007,
	initComponent: function() {
		this.maxHeight = Ext.getBody().getHeight() - 20;
		this.callParent();
	},
	items:[{
		xtype: 'form',
		bodyPadding: 20,
		fieldDefaults: {
	        labelWidth: 120,
			labelAlign: 'right',
	        anchor: '100%'
	    },
	    defaultType: 'textfield',
		items: [{
			name: 'wl_id',
			hidden: true,
			value: '-1'
		}, {
			name: 'version',
			allowBlank: false,
			fieldLabel: '*版本号',
			emptyText: '输入版本号'
		}, {
			xtype: 'checkboxgroup',
			name: 'patterns',
			fieldLabel: '模式代码',
			items: [{
				boxLabel: '厨房模式', name: 'pattern1', inputValue: 'kitchen'
			}, {
				boxLabel: '家庭模式', name: 'pattern2', inputValue: 'family'
			}]
		}, {
			xtype: 'tbtext',
			text: '<strong>多个设备型号，请使用逗号隔开 (' + '<font color="red">,</font>' + ')</strong>',
			margin: '10, 0, 0, 120',
		}, {
			name: 'device_modes',
			allowBlank: false,
			fieldLabel: '*设备型号',
			emptyText: '输入设备型号'
		}, {
			xtype: 'tbtext',
			text: '<strong>多个匹配规则，支持多条，一行一条, 每行均为Java正则表达式，如：<br/><font color="red">UI123.*</font> &nbsp;&nbsp;&nbsp;&nbsp; 会匹配以UI123开头的设备序列号<br/><font color="red">UI123.?</font> &nbsp;&nbsp;&nbsp;&nbsp; 会匹配UI123开头后面包含0或1位其他字符的设备序列号<br/><font color="red">^(?i)UI123[0-9,a-z]{2}$</font> &nbsp;&nbsp;&nbsp;&nbsp; 会匹配UI12300-UI1239zz的设备序列号,且忽略大小写  </strong>',
			margin: '10, 0, 0, 120',
		}, {
			xtype: 'textarea',
			name: 'device_seq_reg',
			allowBlank: false,
			fieldLabel: '*设备序列号匹配规则',
			emptyText: '输入设备序列号匹配规则'
		}, {
			xtype: 'checkbox',
			name: 'is_default',
			inputValue: '1',
			boxLabel: '是否默认白明单',
			margin: '0, 0, 0, 120',
		}, {
			xtype: 'uploadfilefield',
			margin: '10, 0, 10, 0',
			textName: 'wl_xml_file',
			valueName: 'xml_path',
			btnText: '选择',
			fieldLabel: 'XML文件',
	        labelWidth: 120,
	        msgTarget: 'side',
	        anchor: '100%'
		}]
	}],
	buttonAlign: 'center',
	buttons: [{
		text: '提交',
		handler: 'onSubmit'
	}, {
		text: '取消',
		handler: function(btn) {
			btn.up('whitelist-window').hide();
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