Ext.define('app.view.module.software.SoftwareAssetWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.software-asset-window',
	
	reference: 'software_asset_window',
	
	uses: [
	   'app.ux.form.MultiTypeUserGroup',
       'app.store.SoftwareStatusStore',
       'app.store.SoftwareForceStore',
       'app.ux.window.UpdateApkWindow'
    ],
	
	closable: true,
	closeAction: 'hide',
	resizable: false,
	modal: true,
	draggable: true,
	autoShow: true,
	width: 720,
	scrollable: true,
	title: '新建版本信息',
	glyph: 0xf007,
	initComponent: function() {
		this.maxHeight = Ext.getBody().getHeight() - 20;
		this.callParent();
	},
	items:[{
		xtype: 'form',
		bodyPadding: 20,
		fieldDefaults: {
	        labelWidth: 100,
			labelAlign: 'right'
	    },
	    defaultType: 'textfield',
		items: [{
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'middle'
			},
			defaultType: 'textfield',
			items: [{
				name: 'id',
				value: '-1',
				fieldLabel: 'ID',
				readOnly: true,
				flex: 1
			}, {
				name: 'version_number',
				fieldLabel: '版本号',
				allowBlank: true,
				readOnly: true,
				flex: 1,
				emptyText: '上传apk后自动获取'
			}]
		}, {
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'middle'
			},
			defaultType: 'textfield',
			margin: '10, 0, 0, 0',
			items: [{
				name: 'add_plat',
				allowBlank: true,
				readOnly: true,
				flex: 1,
				fieldLabel: '应用包名',
				emptyText: '上传apk后自动获取'
			}, {
				name: 'md5',
				allowBlank: true,
				readOnly: true,
				flex: 1,
				fieldLabel: 'MD5值',
				emptyText: '上传apk后自动获取'
			}]
		}, {
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'middle'
			},
			margin: '10, 0, 0, 0',
			items: [{
				xtype: 'combobox',
				name: 'status',
				displayField: 'status_name',
				valueField:'status_id',
				queryMode: 'local',
				allowBlank: false,
				editable: false,
				flex: 1,
				store: {
	                type: 'software-status-store'
	            },
				fieldLabel: '*状态',
				emptyText: '选择状态'
			}, {
				xtype: 'combobox',
				name: 'file_type',
				allowBlank: false,
				editable: false,
				displayField: 's_name',
				valueField:'s_id',
				queryMode: 'local',
				flex: 1,
				value: '',
				bind: {
					store: '{softwareFileTypeStatusStore}'
				},
				fieldLabel: '*文件类型'
			}]
		}, {
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'middle'
			},
			margin: '10, 0, 0, 0',
			items: [{
				xtype: 'datefield',
				name: 'publish_time',
				fieldLabel: '*发布时间',
				format: 'Y-m-d H:i:s',
				flex: 1,
				allowBlank: false
			}, {
				xtype: 'combobox',
				name: 'enforce_flag',
				displayField: 'force_name',
				valueField:'force_id',
				queryMode: 'local',
				value: '-10000',
				editable: false,
				flex: 1,
				store: {
	                type: 'software-force-store'
	            },
				fieldLabel: '*是否强制升级',
				emptyText: '选择是否强制升级'
			}]
		}, {
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'middle'
			},
			margin: '10, 0, 0, 0',
			items: [{
				xtype: 'textareafield',
				name: 'software_info',
				allowBlank: false,
				flex: 1,
				fieldLabel: '*软件发布信息',
				emptyText: '输入软件发布信息'
			}, {
				xtype: 'textareafield',
				name: 'description',
				flex: 1,
				fieldLabel: '备注',
				emptyText: '输入备注'
			}]
		}, {
			xtype: 'container',
			layout: 'hbox',
	        margin: '10, 0, 0, 0',
	        items: [{
				xtype: 'textfield',
	        	fieldLabel: '普通升级地址id',
	        	name: 'url_general_id',
	        	hidden: true,
	        	value: '-1'
	        }, {
				xtype: 'textfield',
	        	fieldLabel: '升级地址',
	        	name: 'update_url_general',
				readOnly: true,
				flex: 1,
	        	emptyText: '上传apk后自动获取'
	        },{
				xtype: 'button',
				text : '上传',
				disabled : false,
				name : 'app_apk_upload_btn',
				handler : function() {
					var controler = this.up('window').controler;
					var form = this.up('form');
			    	var c_id = form.query('textfield[name=id]')[0].getValue();

					if (c_id == null || c_id == -1){
						Ext.MessageBox.show({
							title : "错误提示",
							msg : "请先提交后再上传APK！",
							width : 110,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.ERROR
						});
						return;
					}

					AppUtil.uploadApk(controler, c_id, function (data){
		        		//form.query('textfield[name=update_url_general]')[0].setValue(data.apk_url);
		        		form.query('textfield[name=update_url_general]')[0].setValue(data.apk_url_show);
		        		form.query('textfield[name=version_number]')[0].setValue(data.version);
		        		form.query('textfield[name=md5]')[0].setValue(data.md5sum);
		        		
		        		var platField = form.query('textfield[name=add_plat]')[0];
		        		//alert("platField.getValue()=" + platField.getValue()+",data.package_name="+data.package_name);
		        		if (platField.getValue() != data.package_name){
			            	Ext.Msg.show({
			        		    title:'警告',
			        		    message: '平台信息【'+platField.getValue()+'】和apk的包名【'+data.package_name+'】不一致，是否更新为apk的包名？',
			        		    buttons: Ext.Msg.YESNO,
			        		    icon: Ext.Msg.QUESTION,
			        		    scope: this,
			        		    fn: function(btn) {
			        		        if (btn === 'yes') {
			        		        	platField.setValue(data.package_name);			        		        	
			        		        }
			        		    }
			        		});
		        		}
		        		else{
							Ext.MessageBox.show({
								title : "提示",
								msg : "APK上传成功",
								width : 110,
								buttons : Ext.Msg.OK
							});
		        		}
		        	});
				}
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
			btn.up('software-asset-window').hide();
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