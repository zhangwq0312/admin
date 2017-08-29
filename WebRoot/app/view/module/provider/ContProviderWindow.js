Ext.define('app.view.module.provider.ContProviderWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.cont-provider-window',
	
	reference: 'cont_provider_window',
	
	uses: [
       'app.ux.form.MultiTextField',
       'app.ux.form.PreviewFileField'
    ],
	
    closable: true,
	closeAction: 'hide',
	resizable: true,
	modal: true,
	draggable: true,
	autoShow: true,
	width: 720,
	scrollable: true,
	title: '添加来源',
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
		items: [{
			xtype: 'textfield',
			name: 'cp_id',
			hidden: true,
			value: '-1'
		},{
			xtype: 'textfield',
			name: 'name',
			fieldLabel: '*来源名称',
			allowBlank: false,
			flex: 1,
			emptyText: '输入来源名称'
		},{
			xtype: 'combobox',
			name: 'sourcetype',
			allowBlank: false,
			displayField: 's_name',
			valueField:'s_id',
			queryMode: 'local',
			flex: 1,
			value: '',
			bind: {
				store: '{providerTypeStore}'
			},
			fieldLabel: '*来源类型'
		},{
			xtype: 'combobox',
			name: 'p_status',
			fieldLabel: '来源状态',
			displayField: 's_name',
			valueField:'s_id',
			editable: false,
			flex: 1,
			value: '',
			store: {
				xtype: 'Ext.data.Store',
			    fields:['s_name','s_id'],
			    data: [
			        {s_name:'禁用',s_id:'-1'},
			        {s_name:'待审',s_id : '0'},
			        {s_name:'正常',s_id : '1'}
			    ]
			}
		},{
			xtype: 'textfield',
			name: 'packagename',
			fieldLabel: '应用包名',
			allowBlank: true,
			flex: 1,
			emptyText: '输入应用包名'
		},{
			xtype: 'textfield',
			name: 'intent_uri',
			fieldLabel: '启动参数（0.8屏）',
			allowBlank: true,
			flex: 1,
			emptyText: '输入启动参数（0.8屏）'
		},{
			xtype: 'textfield',
			name: 'intent_uri2',
			fieldLabel: '启动参数（全屏）',
			allowBlank: true,
			flex: 1,
			emptyText: '输入启动参数（全屏）'
		},{
			xtype: 'container',
			layout: 'hbox',
			margin: '10, 0, 10, 0',
	        items: [{
				xtype: 'textfield',
				name: 'download_url',
				fieldLabel: '应用下载地址',
				allowBlank: true,
				flex: 1,
				emptyText: '输入应用下载地址'
			}, {
		    	xtype:'button',
		    	text:'上传',
		    	//width: 120,
				//height: 35,
				handler: function() {
					var controler = this.up('window').controler;
					var form = this.up('form');
			    	var cp_id = form.query('textfield[name=cp_id]')[0].getValue();
					if (cp_id == null || cp_id == -1){
						Ext.MessageBox.show({
							title : "错误提示",
							msg : "请先提交后再上传APK！",
							width : 110,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.ERROR
						});
						return;
					}

					AppUtil.uploadApk(controler, cp_id, "0", function (data){
		        		//form.query('textfield[name=packagename]')[0].setValue(data.package_name);
		        		form.query('textfield[name=download_url]')[0].setValue(data.apk_url_show);
		        		
		        		var platField = form.query('textfield[name=packagename]')[0];
		        		if (platField.getValue() != data.package_name){
			            	Ext.Msg.show({
			        		    title:'警告',
			        		    message: '应用包名【'+platField.getValue()+'】和apk的包名【'+data.package_name+'】不一致，是否更新为apk的包名？',
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
		},{
			xtype: 'textfield',
			name: 'model_ids',
			fieldLabel: '*机型',
			allowBlank: false,
			flex: 1,
			emptyText: '输入设备型号，多个机型用 ,号分隔，如：xess,xessmini'
		},{
			xtype: 'textareafield',
			name: 'description',
			fieldLabel: '备注',
			flex: 1,
			emptyText: '输入备注'
		},{
			xtype: 'fieldset',
			title: '菜谱一拖三启动信息',
			collapsible: true,
			margin: '10, 0, 10, 0',
	        items: [{
				xtype: 'textareafield',
				name: 'actionlist',
				fieldLabel: '一拖三启动ActionList\n(字符【\\】将被忽略)',
				allowBlank: true,
				flex: 1,
				value: '',
				emptyText: '一拖三启动ActionList'
			}, {
		    	xtype:'button',
		    	text:'查看样例',
		    	//width: 120,
				//height: 35,
				handler: function() {
			    	alert('{"name": "显示名称","action": "action名称"},\n{"name": "显示名称","action": "action名称"},\n{"name": "显示名称","action": "action名称"}');
		    	}
	        }, {
		    	xtype:'button',
		    	text:'验证',
		    	//width: 120,
				//height: 35,
				handler: function() {
					var controler = this.up('window').controler;
					var form = this.up('form');
			    	var actionlist = form.query('textareafield[name=actionlist]')[0].getValue();
			    	
			    	var re;
			    	re = /\\/g;
			    	actionlist = actionlist.replace(re,"");
			    	//alert(actionlist);
			    	var str = "{actionlist:["+actionlist+"]}";
	    			try {
	    				var respJson = Ext.JSON.decode(str);//x = y
	    				var jsonArray = respJson.actionlist;
	    				var info = "";
	    				var isOK = true;
	    				var arr = [];
	    				arr['0'] = '一';arr['1']='二';arr['2']='三';
	    				for (index in jsonArray){
	    					info += "\n一拖三之"+arr[index]+":";
	    					info += "name="+jsonArray[index].name;
	    					if (jsonArray[index].name == null || jsonArray[index].name == "" || jsonArray[index].name == 'undefined'){
	    						info += "-->值不能为空";
	    						isOK = false;
	    						break;
	    					}
	    					info += ",action="+jsonArray[index].action;
	    					if (jsonArray[index].action == null || jsonArray[index].action == "" || jsonArray[index].action == 'undefined'){
	    						info += "-->值不能为空";
	    						isOK = false;
	    						break;
	    					}
	    					if (index.startsWith('2')){
	    						break;
	    					}
	    				}
                        if (isOK){
                        	alert("验证成功:"+info);
                        }
                        else {
                        	alert("验证失败:"+info);
                        }
	    			}catch(e){                         // 创建局部变量 e。
                    	alert("验证失败:\n"+actionlist);
	    			}
		    	}
	        }]
		},{
			xtype: 'fieldset',
			title: '健康类来源其他信息',
			collapsible: true,
			margin: '10, 0, 10, 0',
	        items: [{
				xtype: 'textfield',
				name: 'trd_login_way',
				fieldLabel: '登录方式：web/phone/client等',
				allowBlank: true,
				flex: 1,
				emptyText: '输入登录方式：web/phone/client等'
			},{
				xtype: 'textfield',
				name: 'trd_login_way_web',
				fieldLabel: 'web登录url连接',
				allowBlank: true,
				flex: 1,
				emptyText: '输入 web登录url连接'
			},{
				xtype: 'textfield',
				name: 'trd_get_date_current',
				fieldLabel: '获取数据的接口地址',
				allowBlank: true,
				flex: 1,
				emptyText: '输入获取数据的接口地址'
			},{
				xtype: 'fieldset',
				title: '手机端应用信息',
				collapsible: true,
				defaultType: 'textfield',
				fieldName: 'imginfo',
				margin: '10, 2, 0, 0',
				items: [{
					xtype: 'textfield',
					name: 'trd_model',
					fieldLabel: 'apk的唯一标签',
					allowBlank: true,
					flex: 1,
					emptyText: '输入apk的唯一标签'
				},{
					xtype: 'textfield',
					name: 'trd_name',
					fieldLabel: 'apk名称',
					allowBlank: true,
					flex: 1,
					emptyText: '输入apk名称'
				},{
					xtype: 'textfield',
					name: 'trd_downloadurl',
					fieldLabel: 'apk下载路径，用于在客户端生成二维码形式',
					allowBlank: true,
					flex: 1,
					emptyText: '输入apk下载路径'
				},{
					xtype: 'textfield',
					name: 'trd_apk_info',
					fieldLabel: 'apk介绍',
					allowBlank: true,
					flex: 1,
					emptyText: '输入apk介绍'
				},{
					xtype: 'textfield',
					name: 'trd_apk_icon',
					fieldLabel: 'apk图标',
					allowBlank: true,
					flex: 1,
					emptyText: '输入apk图标'
				},{
					xtype: 'textareafield',
					name: 'trd_other',
					fieldLabel: '备注信息',
					allowBlank: true,
					flex: 1,
					emptyText: '输入备注信息'
				}]
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
			btn.up('cont-provider-window').hide();
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