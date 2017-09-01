Ext.define('app.view.module.theme.ThemeDownloadUrlListWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.theme-downloadurl-window',
	
	reference: 'theme_downloadurl_window',
	
    closable: true,
	closeAction: 'hide',
	resizable: false,
	modal: true,
	draggable: true,
	autoShow: true,
	width: 1020,
	height: 520,
	scrollable: true,
	title: '下载地址列表',
	glyph: 0xf007,
	layout: 'fit',
	ca_id:-1,
	initComponent: function() {
		
		this.maxHeight = Ext.getBody().getHeight() - 20;
		
		this.controller = this.onController;
		
		var store = Ext.create('app.store.ContAppDownloadUrlStore');

		var pgSize = store.getPageSize(); // 分页数
		var app_apk_fileUploadField = new Ext.form.FileUploadField({
			xtype : 'fileuploadfield',
			height : 20,
	        allowBlank: false,
			width : 450,
			blankText : 'APK地址不能为空，请选择一个APK',
			emptyText : '请选择一个APK',
			regex : /^.*(.apk|.APK)$/,
			regexText : '请选择APK文件（文件扩展名必须为.apk）',
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
			layout : 'column',
			border : false,
			margin : '15,15,15,15',
			items : [app_apk_fileUploadField],
			buttons : [{
				text : '上传',
				disabled : false,
				name : 'app_apk_upload_btn',
				handler : function() {
					if (app_apk_fileUpload_form.getForm().isValid()) {
						var c_id = cont_id_form.getValue();
						Ext.MessageBox.show({
							title : '提示',
							msg : "上传进度",
							progressText : '0%',
							width : 300,
							progress : true,
							closable : true
						});
						app_apk_fileUpload_form.getForm().submit({
							url : 'files/file_upload.do?obj_id=' + c_id
								+ '&type=apk'
								+'&urlType=1'
								+'&upload_type=theme'
								+'&date='+ Ext.util.Format.date(new Date(),	"YmdHis"),
								timeout : 1800000,
								success : function(form, action) {
									clearInterval(_interval);
									downloadurl_window.hide();
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
										app_download_url_grid_store.reload();

										Ext.MessageBox.show({
											title : "提示",
											msg : "APK上传成功",
											width : 110,
											buttons : Ext.Msg.OK
										});
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

		var app_download_url_grid_store = new Ext.data.JsonStore({
			pageSize : pgSize,
			fields : ['id', 'c_id', 'app_name', 'package_name',
					'provider_id', 'version', 'version_code', 'site',
					'capacity', 'md5sum', 'add_time', 'create_time',
					'modify_time', 'download_url', 'url_type',
					'url_type_desc', 'upgrade_temp_url',
					'temp_url_exepire_time', 'share_password'],
			proxy : {
				type : 'ajax',
				url : 'app/query_download_url.do',
				reader : {
					totalProperty : "results",
					root : "datastr",
					idProperty : 'id'
				},
				extraParams : {
					c_id : 0
				}
			}
		});

		var downloadurl_window = new Ext.Window({
			title : '上传apk',
			resizable : false,
			autoHeight : true,
			autoScroll : true,
			modal : true,
			closable : true,
			closeAction : 'hide',
			items : [cont_id_form,app_apk_fileUpload_form],
		});
		var contAppPanel_downloadurl_new = function() {
			var c_id = this.ca_id;
			cont_id_form.setValue(c_id);
			downloadurl_window.show();
		}
		var contAppPanel_downloadurl_download = function() {
			var rows = app_download_url_grid.getSelectionModel().getSelection();// 返回值为Record数组
			if (rows.length == 1) {
				var show_url = rows[0].get('upgrade_temp_url');

				if (show_url != null && show_url != '') {
					pic = window.open(show_url, "a1");
					pic.document.execCommand("SaveAs");
				} else {
					Ext.MessageBox.show({
								title : "提示",
								msg : "APK不存在，无法下载",
								width : 180,
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.ERROR
							});
				}
			} else {
				Ext.MessageBox.show({
							title : "提示",
							msg : "请先选择要下载的一项",
							width : 160,
							buttons : Ext.Msg.OK
						});
			}
		}
		var contAppPanel_downloadurl_delete = function() {
			var rows = app_download_url_grid.getSelectionModel().getSelection();// 返回值为Record数组
			if (rows.length == 1) {
				var urlID = rows[0].get('id');
				Ext.MessageBox.confirm('提示框', '您确定要进行该操作？', function(btn) {
					if (btn == 'yes') {
						Ext.Ajax.request({
							url : 'app/delete_download.do?id=' + urlID,
							waitMsg : '正在提交,请稍等',
							success : function(response, opts) {
								var result = Ext
								.decode(response.responseText);
								if (!result.success) {
									Ext.Msg.show({
										title : '错误提示',
										msg : result.info,
										buttons : Ext.Msg.OK,
										icon : Ext.Msg.ERROR
									});
								} else {
									app_download_url_grid_store.load();
								}
							},
							failure : function(response, opts) {
								Ext.Msg.show({
									title : '错误提示',
									msg : '删除时发生错误!',
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.ERROR
								});
							}
						});
					}
				});
			} else {
				Ext.MessageBox.show({
							title : "提示",
							msg : "请先选择删除的一项",
							width : 160,
							buttons : Ext.Msg.OK
						});
			}
		}
		var default_downloadurl_form = new Ext.form.TextField({// 保留
			xtype : 'textfield',
			fieldLabel : '正式环境默认下载地址',
			allowBlank : true,
			blankText : '',
			readOnly : true,
			editable : false,
			value: 'http://tv.duolebo.com/apkDownload/?c='+this.ca_id,
			labelAlign : 'right',
			labelWidth : 150,
			width : 500
		});

		var app_download_url_grid = new Ext.grid.GridPanel({
			xtype: 'gridpanel',
			store : app_download_url_grid_store,
			selModel : {
				selType : 'checkboxmodel',
				mode : 'SIMPLE'
				//mode : 'SINGLE'
			},
			columns : [{
				header : "ID",
				width : 80,
				dataIndex : 'id'
			}, {
				header : "主题ID",
				width : 80,
				dataIndex : 'c_id'
			}, {
				header : '主题名称',
				width : 100,
				dataIndex : 'app_name'
			}, {
				header : "下载地址/分享地址",
				width : 180,
				dataIndex : 'download_url'
			}, {
				header : "临时地址",
				width : 160,
				dataIndex : 'upgrade_temp_url'
			}, {
				header : "应用类型",
				width : 80,
				dataIndex : 'c_type',
				hidden : true
			}, {
				header : "包名",
				width : 80,
				dataIndex : 'package_name',
				hidden : true
			}, {
				header : "ProviderId",
				width : 80,
				dataIndex : 'provider_id'
			}, {
				header : "VersionName",
				width : 80,
				dataIndex : 'version'
			}, {
				header : "VersionCode",
				width : 80,
				dataIndex : 'version_code'
			}, {
				header : "网站",
				width : 80,
				dataIndex : 'site'
			}, {
				header : "大小",
				width : 80,
				dataIndex : 'capacity'
			}, {
				header : "MD5值",
				width : 80,
				dataIndex : 'md5sum'
			}, {
				header : "上架时间",
				width : 80,
				dataIndex : 'add_time'
			}, {
				header : "创建时间",
				width : 80,
				dataIndex : 'create_time'
			}, {
				header : "更新时间",
				width : 80,
				dataIndex : 'modify_time'
			}, {
				header : "地址类型",
				width : 80,
				dataIndex : 'url_type',
				hidden : true
			}, {
				header : "地址类型",
				width : 80,
				dataIndex : 'url_type_desc'
			}, {
				header : "临时地址过期时间",
				width : 80,
				dataIndex : 'temp_url_exepire_time'
			}, {
				header : "分享密码",
				width : 80,
				dataIndex : 'share_password'
			}],
			tbar : [{
				text : '上传',
		    	iconCls: 'add',
				handler : contAppPanel_downloadurl_new,
				scope : this
			}, {
				text : '删除',
		    	iconCls: 'delete',
				handler : contAppPanel_downloadurl_delete,
				scope : this
			}, {
				text : '下载apk',
				handler : contAppPanel_downloadurl_download,
				scope : this
			}, ' ', '-', ' ', default_downloadurl_form],
            viewConfig: {
            	stripeRows: true,
            	enableTextSelection:true
            },
			bbar : new Ext.PagingToolbar({
				pageSize : pgSize,
				// width: 358,
				store : app_download_url_grid_store,
				displayInfo : true,
				displayMsg : '第 {0}-- {1}条    共 {2}条',
				emptyMsg : '没有记录'
			})
		});
		
		this.items = [app_download_url_grid];
		
		this.buttons = [{
			text: '关闭',
			scope: this,
			handler: function() {
				this.hide();
				this.up('themeManage').getStore().load();
			}
		}];
		
		this.callParent();
	},
	items:[],
	buttonAlign: 'center',
	listeners : {
		close :function(){
			this.up('grid').store.load();
		}
	}
});