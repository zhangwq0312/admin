Ext.define('app.ux.form.UploadFileField', {
	extend: 'Ext.container.Container',
	alias: 'widget.uploadfilefield',
	
	initComponent: function() {
		
		if(Ext.isEmpty(this.fieldLabel)) {
			this.fieldLabel = '';
		}
		
		if(Ext.isEmpty(this.allowBlank)) {
			this.allowBlank = true;
		}
		
		if(Ext.isEmpty(this.labelWidth)) {
			this.labelWidth = 0;
		}
		/* 设置事件监听 */
		this.listeners = {
				afterrender: function() {
					console.log("--:here 11111,afterrender");
					var url = this.down('textfield').getValue();
					if(Ext.isEmpty(url)) {
						//var img = this.down('image');
						//img.setSrc(Ext.BLANK_IMAGE_URL);
					}
				}
		}
		
		this.items = [{
			xtype: 'textfield',
			name: this.valueName,
			hidden: true,
			value: '',
			listeners: {
				change: function(self, newValue, oldValue) {
				},
				scope: this
			}
		}, {
			xtype: 'container',
			layout: 'hbox',
			items: [{
				xtype: 'filefield',
				name: this.textName,
				fieldLabel: this.fieldLabel,
		        buttonText: this.btnText,
		        labelWidth: this.labelWidth,
		        msgTarget: 'side',
		        allowBlank: this.allowBlank,
				flex: 1,
				listeners: {
					change: function(self, v) {
					}
				}
			}]
		}];
		
		this.setValue = function(v) {
			this.down('textfield').setValue(v);
		};
		
		this.callParent();
	}
});