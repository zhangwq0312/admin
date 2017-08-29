Ext.define('app.view.module.theme.ThemePreviewPanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.themepreviewpanel',
	initComponent : function() {
		var theme_previewimg_form;
		var c_id = '-1';
		var provider_id = '0';

		// 应用截图开始
		var app_img_window = new Ext.Window({
			title : '图片预览',
			resizable : false,
			width : 900,
			height : 500,
			autoScroll : true,
			modal : true,
			closable : true,
			closeAction : 'hide',
			items : [{
				baseCls : 'x-plain',
				items : [{
					xtype : 'component',
					id : 'theme_img_window_show',
					border : false,
//					fieldLabel : "预览图片",
					autoEl : {
						height : 430,
						tag : 'img',
						src : Ext.BLANK_IMAGE_URL
					},
					listeners : {
						loadexception : function() {
							Ext.getCmp("theme_img_window_show").getEl().dom.src = 'app/resources/images/empty.JPG';
						}
					}
				}]
			}],
			buttons : [{
				text : '取消',
				handler : function() {
					app_img_window.hide();
					Ext.getCmp("theme_img_window_show").getEl().dom.src = Ext.BLANK_IMAGE_URL;
				}
			}]
		});
		var previewimg_locked_checkbox = new Ext.form.Checkbox({
			// id:'base_locked',
			name : 'snapshotimg_locked',
			 width:160,//宽度
			labelWidth:100,
			align : 'left',
			fieldLabel : '所有截图锁定',
			checked : false,
			disabled : false
		});
		//所属平台
		var theme_previewimg_plat_combo = Ext.create('Ext.form.field.ComboBox', {
			xtype: 'combobox',
			editable: false,
			name: 'c_img_plat_group',
			allowBlank: false,
			displayField: 'plat_groupName',
			valueField:'plat_groupId',
			queryMode: 'local',
			margin : '0,0,10,10',
			flex: 1,
			value: '1',
			bind: {
				store: '{imgPlatStore}'
			},
			fieldLabel: '*所属平台',
			emptyText: '选择平台',
			
		});
		/*-----定义截图下拉列表-----*/
		var theme_previewimg_combo = Ext.create('Ext.form.field.ComboBox', {
			fieldLabel : '已上传截图',
			labelWidth : 80,
			width : 360,
			hideLabel : false,
			labelAlign : 'right',
			displayField : 'theme_img_url',
			valueField : 'theme_img_id',
			disabled : false,
			editable : false,
			margin : '15,0,0,0',
			queryMode : 'local',
			triggerAction : 'all',
			emptyText : '请选择一个截图预览',

			store : new Ext.data.JsonStore({
				//app_img_id app_img_url app_img_url_show snapshotimg_locked
				fields : ['theme_img_id', 'theme_img_url', 'app_img_url_show', 'snapshotimg_locked'],
				autoLoad : false,
				proxy : {
					type : 'ajax',
					url : "theme/query_by_img_id.do",
					reader : {
						root : 'datastr',
						idProperty : 'theme_img_id'
					},
					params : {
						id : c_id,
						useType : '3'
					}
				},

				listeners : {
					select : {
						
						fn : function(combo, value, opts) {
							alert(value.data.theme_img_id);
							alert(value.data.app_img_url_show);
						}
					},
					fn : function(combo, value, opts) {
						alert(value.data.theme_img_id);
						alert(value.data.app_img_url_show);
					},
					load : function(oStore, ayRecords, successful, oOptions) {
						// var records = store.getRange(0, 1);
						// alert('loaded successfully');
						for (var ii = 0; ii < 5 && ii < ayRecords.length; ii++) {
							var imgObj = null;
							switch (ii) {
							case 0 :
								imgObj = app_snapshotimg0;
								break;
							case 1 :
								imgObj = app_snapshotimg1;
								break;
							case 2 :
								imgObj = app_snapshotimg2;
								break;
							case 3 :
								imgObj = app_snapshotimg3;
								break;
							case 4 :
								imgObj = app_snapshotimg4;
								break;
							}
							imgObj.getEl().dom.src = 'app/resources/images/loading.JPG';
							var record = ayRecords[ii];
							imgObj.getEl().dom.src = record.get('app_img_url_show');
							// alert(record.get('app_img_url_show'));
						}
						for (var ii = ayRecords.length; ii < 5; ii++) {
							var imgObj = null;
							switch (ii) {
							case 0 :
								imgObj = app_snapshotimg0;
								break;
							case 1 :
								imgObj = app_snapshotimg1;
								break;
							case 2 :
								imgObj = app_snapshotimg2;
								break;
							case 3 :
								imgObj = app_snapshotimg3;
								break;
							case 4 :
								imgObj = app_snapshotimg4;
								break;
							}
							imgObj.getEl().dom.src = 'app/resources/images/empty.JPG';
						}
						for (var ii = 0; ii < 5 && ii < ayRecords.length; ii++) {
							var record = ayRecords[ii];
							previewimg_locked_checkbox.setValue(record.get('snapshotimg_locked'));
						}
					}
				}
			})
		});

		theme_previewimg_combo.on('select', function(combo, records, eOpts) {
			Ext.getCmp("theme_previewimg_id").setValue(this.getValue());
			Ext.getCmp("theme_previewimg_url_show").setValue(records.data.app_img_url_show);
		});

		var app_snapshotimg_fileUploadField = new Ext.form.FileUploadField({
			xtype : 'fileuploadfield',
			height : 20,
			width : 500,
			allowBlank : true,
			disabled : false,
			blankText : '图片地址不能为空，请选择一张图片',
			emptyText : '请选择一张本地图片',
			regex : /^.*(.JPEG|.jpeg|.JPG|.jpg|.GIF|.gif|.BMP|.bmp|.PNG|.png)$/,
			regexText : '请选择图片文件',
			fieldLabel : '上传预览图',
			name : 'preview_img',
			buttonText : '',
			buttonConfig : {
				iconCls : 'upload-icon'
			},
			listeners: {
				change: function(self, v) {
					theme_previewimg_upload_btn.setDisabled(false);
				}
			}
		});

		var theme_previewimg_delete_btn = new Ext.Button({
			xtype : 'button',
			text : '删除截图',
			// width: 120,
			// height: 30,
			name : 'theme_previewimg_delete_btn',
			handler : function() {
				var id = Ext.getCmp("theme_previewimg_id").getValue();

				if (id == null || id == '') {
					Ext.MessageBox.show({
						title : "提示",
						msg : "请先选择一个截图",
						width : 110,
						buttons : Ext.Msg.OK
					});
				} else {
					Ext.MessageBox.confirm('提示框', '您确定要进行该操作？', function(btn) {
						if (btn == 'yes') {
							Ext.Ajax.request({
								url : 'img/img_delete.do?tag=delete&obj_id=' + id
									+ '&date='	+ Ext.util.Format.date(new Date(), "YmdHis"),
											waitMsg : '正在提交,请稍等',
											success : function(response) {
												theme_previewimg_combo.setValue("");
												theme_previewimg_combo.store.reload();// 刷新
												Ext.MessageBox.show({
													title : "提示",
													msg : "删除成功",
													width : 110,
													buttons : Ext.Msg.OK
												});
											},
											failure : function() {
												Ext.MessageBox.show({
													title : "提示",
													msg : "删除失败",
													width : 110,
													buttons : Ext.Msg.OK
												});
											}
							});
						}
					});
				}
			}
		});

		var app_img_locked_btn = new Ext.Button({
			text : '保存锁定状态',
			disabled : false,
			name : 'app_img_locked_btn',
			handler : function() {
				var targetId = c_id;
				var useType = 2;
				var locked = previewimg_locked_checkbox.getValue() == true ? 1 : 0;
				Ext.Ajax.request({
					url : 'img/img_updatelocked.do?targetId=' + targetId
					+ '&useType=' + useType + '&locked='
					+ locked,
					waitMsg : '正在提交,请稍等',
					success : function(response) {
						var result = Ext.decode(response.responseText);
						Ext.Msg.show({
							title : '温馨提示',
							msg : result.message,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.OK
						});
					},
					failure : function(response) {
						Ext.Msg.show({
							title : '错误提示',
							msg : '操作时发生错误!',
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.ERROR
						});
					}
				});

			}
		});
		var theme_previewimg_upload_btn = new Ext.Button({
			text : '上传',
			disabled : true,
			margin : '15,0,0,0',
			name : 'theme_previewimg_upload_btn',
			handler : function() {
				if (theme_previewimg_form.getForm().isValid()) {
					var id = c_id;
					var locked = previewimg_locked_checkbox.getValue() == true	? 1	: 0;
					theme_previewimg_form.getForm().submit({
						url : 'img/img_file_upload.do?tag=preview&contTypeId=21&locked=' + locked,
							waitMsg : '正在上传...',
							success : function(form, action) {
								theme_previewimg_combo.store.load({
									params : {
										id : id,
										useType : '3'
									}
								});// 刷新
								Ext.MessageBox.show({
									title : "提示",
									msg : "图片上传成功",
									width : 110,
									buttons : Ext.Msg.OK
								});

								var result = Ext.decode(action.response.responseText);
								// Ext.getCmp("app_snapshotimg_url").setValue(result.img_url);
								// Ext.getCmp("theme_previewimg_url_show").setValue(result.img_url_show);
								theme_previewimg_upload_btn.setDisabled(true);
							},
							failure : function(form, action) {
								Ext.MessageBox.show({
									title : "提示",
									msg : "图片上传失败",
									width : 110,
									buttons : Ext.Msg.OK
								});
							}
					});
				}
			}
		});
		var app_snapshotimg0 = new Ext.Component({
			xtype : 'box',
			name : 'img0',
			width : 100,
			height : 100,
			fieldLabel : "预览图片",
			autoEl : {
				tag : 'img',
				src : 'app/resources/images/empty.JPG'
			}
		});
		var app_snapshotimg1 = new Ext.Component({
			xtype : 'box',
			name : 'img1',
			width : 100,
			height : 100,
			fieldLabel : "预览图片",
			autoEl : {
				tag : 'img',
				src : 'app/resources/images/empty.JPG'
			}
		});
		var app_snapshotimg2 = new Ext.Component({
			xtype : 'box',
			name : 'img2',
			width : 100,
			height : 100,
			fieldLabel : "预览图片",
			autoEl : {
				tag : 'img',
				src : 'app/resources/images/empty.JPG'
			}
		});
		var app_snapshotimg3 = new Ext.Component({
			xtype : 'box',
			name : 'img3',
			width : 100,
			height : 100,
			fieldLabel : "预览图片",
			autoEl : {
				tag : 'img',
				src : 'app/resources/images/empty.JPG'
			}
		});
		var app_snapshotimg4 = new Ext.Component({
			xtype : 'box',
			name : 'img4',
			width : 100,
			height : 100,
			fieldLabel : "预览图片",
			autoEl : {
				tag : 'img',
				src : 'app/resources/images/empty.JPG'
			}
		});
		theme_previewimg_form = new Ext.FormPanel({
			fileUpload : true,
			baseCls : 'x-plain',
			border : false,
			fieldDefaults : {
				labelAlign : 'right',
				labelWidth : 70
			},
			defaults : {
				baseCls : 'x-plain'
			},
			buttonAlign : 'center',
			width : 580,
			height : 260,
			bodyStyle : 'padding:5 0 0 10',
			setCID:function(cid){
				c_id = cid;
			},
			items : [{
				xtype : 'textfield',
				name : 'provider_id',
				value : '-1',
				hidden : true,
			}, {
				xtype : 'textfield',
				name : 'c_id',
				value : '-1',
				hidden : true,
			}, {
				xtype : 'textfield',
				name : 'user_type',
				value : '3',
				hidden : true,
			}, {
				xtype : 'hidden',
				name : 'theme_previewimg_id',
				id : 'theme_previewimg_id'
			}, {
				xtype : 'hidden',
				name : 'theme_previewimg_url_show',
				id : 'theme_previewimg_url_show'
			},
			{
				layout : 'column',
				width : 580,
				items : [{
					columnWidth : 0.65,
					baseCls : 'x-plain',
					width : 480,
					items : [theme_previewimg_combo,theme_previewimg_plat_combo ]
				}, {
					columnWidth : 0.3,
					baseCls : 'x-plain',
					width : 100,
					items : [{
						xtype : 'button',
						text : '预览图片',
						// width: 120,
						// height: 30,
						handler : function() {
							var show_url = Ext.getCmp("theme_previewimg_url_show").getValue();
							console.info(show_url);
							// theme_previewimg_combo
							if (show_url != null && show_url != '') {
								app_img_window.show();
								console.info(Ext.getCmp("theme_img_window_show").getEl());
								console.info(Ext.getCmp("theme_img_window_show"));
								Ext.getCmp("theme_img_window_show").getEl().dom.src = 'app/resources/images/loading.JPG';
								Ext.getCmp("theme_img_window_show").getEl().dom.src = show_url;
							} else {
								Ext.MessageBox.show({
									title : "提示",
									msg : "请先选择一个截图",
									width : 180,
									buttons : Ext.Msg.OK
								});
							}
						}
					}, theme_previewimg_delete_btn, app_img_locked_btn,previewimg_locked_checkbox]
				}]
			}, 
			app_snapshotimg0, 
			app_snapshotimg1, 
			app_snapshotimg2,
			app_snapshotimg3, 
			app_snapshotimg4,
			app_snapshotimg_fileUploadField
			],
			buttons : [theme_previewimg_upload_btn]
		});

		// 应用截图结束

		this.items = [theme_previewimg_form];
		this.callParent();
	},
	reload: function(cId){
		this.down("form").setCID(cId);
		var store = this.down("combobox[valueField=theme_img_id]").store;
		store.removeAll();
		store.load({
			params:{ 
				id : cId ,
				useType : '3'
			}
		});
	}
});