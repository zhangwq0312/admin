Ext.define('app.ux.window.UpdateApkWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.update-apk-window',
	
	reference: 'update_apk_window',
	
	closable: true,
	closeAction: 'destroy',
	resizable: true,
	modal: true,
	draggable: true,
	autoShow: true,
	width: 720,
	scrollable: true,
	title: '上传apk',
	glyph: 0xf007,
	initComponent: function() {
		this.maxHeight = Ext.getBody().getHeight() - 20;
        var thisWindow = this;

		var cont_id_form = new Ext.form.TextField({// 保留
			xtype : 'textfield',
			fieldLabel : '内容ID',
			allowBlank : true,
			blankText : '',
			readOnly : true,
			hidden : true,
			editable : false,
			// id:'contAppId_temp',
			name : 'c_id',
			width : 260
		});
		
		var upload_type = new Ext.form.TextField({// 如 theme or provider or app
			xtype : 'textfield',
			allowBlank : true,
			blankText : '',
			readOnly : true,
			hidden : true,
			editable : false,
			name : 'upload_type',
		});

		var app_apk_fileUploadField = new Ext.form.FileUploadField({
			xtype : 'fileuploadfield',
			height : 20,
			width : 550,
			blankText : 'APK地址不能为空，请选择一个APK',
			emptyText : '请选择一个APK',
			regex : /^.*(.apk|.APK)$/,
			regexText : '请选择APK文件（文件扩展名必须为.apk）',
			fieldLabel : '*上传APK',
			name : 'imgFile',
			buttonText : '',
			baseCls : 'x-plain',
			buttonConfig : {
				iconCls : 'upload-icon'
			}
		});

		var _interval;

		var app_apk_fileUpload_form = new Ext.FormPanel({
			fileUpload : true,
			baseCls : 'x-plain',
			defaults : {
				baseCls : 'x-plain'
			},
			buttonAlign : 'center',
			width : 580,
			layout : 'column',
			border : false,
			items : [{
				layout : 'column',
				items : [{
					columnWidth : .7,
					// layout:'form',
					baseCls : 'x-plain',
					items : [app_apk_fileUploadField]
				}, {
					columnWidth : .3,
					// layout:'form',
					baseCls : 'x-plain',
					items : []
				}]
			}],
			buttons : [{
				text : '上传',
				disabled : false,
				// id:'app_apk_upload_btn',
				name : 'app_apk_upload_btn',
				handler : function() {
					if (app_apk_fileUploadField.getValue() == ""){
						Ext.MessageBox.show({
							title : "错误提示",
							msg : "请先选择要上传的APK！",
							width : 110,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.ERROR
						});
						return;
					}
					
					if (app_apk_fileUpload_form.getForm().isValid()) {
						var c_id = cont_id_form.getValue();
						console.info(c_id);
						if (c_id == null || c_id == -1){
							Ext.MessageBox.show({
								title : "错误提示",
								msg : "请先提交或保存后再上传APK！",
								width : 110,
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.ERROR
							});
							return;
						}
						
						// msgWin.show();
						Ext.MessageBox.show({
							title : '提示',
							msg : "上传进度",
							progressText : '0%',
							width : 300,
							progress : true,
							closable : true
						});
						app_apk_fileUpload_form.getForm().submit({
							url : 'files/file_upload.do?obj_id=' + c_id + 
								  '&type=apk' +
								  '&urlType=0' + 
								  '&date=' + Ext.util.Format.date(new Date(), "YmdHis"),
								// waitMsg:'正在上传...',
								timeout : 1800000,//30mins
								success : function(form, action) {
									clearInterval(_interval);
									//alert("---here:"+thisWindow);
									thisWindow.hide();
									var result = Ext.decode(action.response.responseText);
									if (!result.success) {
										Ext.MessageBox.show({
											title : "错误提示",
											msg : result.info,
											width : 110,
											buttons : Ext.Msg.OK,
											icon : Ext.Msg.ERROR
										});
									} else {
//										cont_app_download_url_form.setValue(result.apk_url);
//										cont_app_version_form.setValue(result.version);
//										cont_app_version_code_form.setValue(result.version_code);
//										cont_app_capacity_form.setValue(result.file_size);
//										cont_app_package_name_form.setValue(result.package_name);
//										cont_app_md5_form.setValue(result.md5sum);
//										app_download_url_grid_store.load();

										thisWindow.callback(result);
									}
								},
								failure : function(form, action) {
									clearInterval(_interval);
									var msg = "未知错误！";
									if (action != null && action.result != null && action.result.info != null){
										msg = action.result.info;
									}
									Ext.MessageBox.show({
										title : "提示",
										msg : "APK上传失败!" + msg,
										width : 110,
										buttons : Ext.Msg.OK,
										icon : Ext.Msg.ERROR
									});

								}
						});
						clearInterval(_interval);
						_interval = setInterval(showProgress, 2000);
					}
				}
			}]
		});
		var zeroRepeat = 0;
		function showProgress() {
			var c_id = cont_id_form.getValue();
			Ext.Ajax.request({
				url : 'files/file_upload_progress.do?obj_id=' + c_id,
				method : 'get',
				timeout : 60000,
				success : function(data, options) {
					var i = (data.responseText.substring(0,
							data.responseText.length - 1))
							/ 100;
					Ext.MessageBox.updateProgress(i, data.responseText);
					if (data.responseText == '100%') {
						clearInterval(_interval);
						Ext.MessageBox.updateProgress(i, "信息提取中...");
						return;
					} else if (data.responseText == '0%') {
						zeroRepeat++;
						if (zeroRepeat > 500) {
							clearInterval(_interval);
							zeroRepeat = 0;
							Ext.MessageBox.show({
								title : "提示",
								msg : "APK上传失败!!",
								width : 110,
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.ERROR
							});
						}
					}
				},
				failure : function(data, options) {
					clearInterval(_interval);
					Ext.MessageBox.show({
						title : "提示",
						msg : "APK上传失败!",
						width : 110,
						buttons : Ext.Msg.OK
					});
				}
			});
		}

		this.items = [cont_id_form,upload_type,{
			xtype : 'label',
			text : '注意：新增信息时，需要先保存后再上传APK！',
			style : 'background-color:#ffff00;font-size: 13px,margin-left: 50px;'
		   },app_apk_fileUpload_form];
		
		this.buttons = [{
			text: '取消',
			scope: this,
			handler: function() {
				this.destroy();
			}
		}];
		
		this.callParent();
	},
	buttonAlign: 'center',
	listeners: {
		resize: function(win, width, height) {
			var bodyH = Ext.getBody().getHeight();
			var y = (bodyH-height)/2;
			win.setY(y);
			win.setMaxHeight(bodyH-20);
		}
	}
});