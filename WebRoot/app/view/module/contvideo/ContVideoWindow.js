Ext.define('app.view.module.contvideo.ContVideoWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.cont-video-window',
	
	reference: 'cont_video_window',
	
	uses: [
	       'app.store.ColumnShortCutStore',
	       'app.ux.form.MultiTextField',
	       'app.ux.form.MultiTypeUserGroup',
	       'app.ux.form.MultiImgGroup',
	       'app.ux.form.ColumnShortcutTextField',
	       'app.ux.form.PreviewFileField'],
	
    closable: true,
	closeAction: 'hide',
	resizable: true,
	modal: true,
	draggable: true,
	autoShow: true,
	width: 720,
	scrollable: true,
	title: '添加资产',
//	y: 10,
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
			labelAlign: 'right'
	    },
		items: [{
			xtype: 'textfield',
			name: 'cv_base_info',
			value: 1,
			bind: {
				//value: '{cv_base_info}'
			},
			hidden: true
		}, {
			xtype: 'fieldset',
	        title: '基本信息',
	        collapsible: true,
	        defaultType: 'textfield',
	        fieldName: 'baseinfo',
	        hidden: true,
	        bind: {
	        	hidden: '{!hasBaseInfo}'
	        },
	        items: [{
					xtype: 'textfield',
					name: 'c_id',
					hidden: true,
					value: '-1'
				}, {
					xtype: 'textfield',
					name: 'link_url',
					hidden: true,
					value: ''
				}, {
					xtype: 'textfield',
					name: 'zip_download_url_show',
					hidden: true,
					value: '',
					listeners: {
						change: function(combo, newValue, oldValue, eOpts ) {
							var form = this.up('form');
							var btnDownload = form.query('button[fieldName=downloadHtmlZip]')[0];
							console.log('oldValue: ' + oldValue+',newValue: ' + newValue);
								
							var show_url = newValue;
							if (show_url!=null && show_url!='') {
								btnDownload.setDisabled(false);
							}
							else{
								btnDownload.setDisabled(true);
							}
						}
					}
				},{
					xtype: 'container',
					layout: 'hbox',
					defaultType: 'textfield',
					items: [{
						xtype: 'checkboxfield',
						name: 'is_locked',
						fieldLabel: '基本信息锁定',
						value: 0,
						inputValue:1,
						flex: 1
					}, {
						name: 'cv_alias',
						fieldLabel: '资产别名',
						flex: 1,
						emptyText: '输入资产别名'
					}]
				}, {
					xtype: 'container',
					layout: 'hbox',
					defaultType: 'textfield',
					margin: '10, 0, 0, 0',
					items: [{
						name: 'c_name',
						fieldLabel: '*资产名称',
						allowBlank: false,
						flex: 1,
						emptyText: '输入资产名称'
					}, {
						xtype: 'datefield',
						name: 'active_time',
						allowBlank: false,
						flex: 1,
						fieldLabel: '*生效时间',
						value: new Date(),
						format: 'Y-m-d H:i:s'
					}]
				}, {
					xtype: 'container',
					layout: 'hbox',
					margin: '10, 0, 0, 0',
					items: [{
						xtype: 'combobox',
						name: 'c_status',
						allowBlank: false,
						displayField: 's_name',
						valueField:'s_id',
						queryMode: 'local',
						editable: false,
						flex: 1,
						bind: {
							store: '{contStatusStore}'
						},
						fieldLabel: '*资产状态',
						emptyText: '选择资产状态'
					}, {
						xtype: 'datefield',
						name: 'deactive_time',
						allowBlank: false,
						flex: 1,
						fieldLabel: '*失效时间',
						value: Ext.Date.add(new Date(), Ext.Date.YEAR, 50),
						format: 'Y-m-d H:i:s'
					}]
				}, {
					xtype: 'container',
					layout: 'hbox',
					margin: '10, 0, 0, 0',
					items: [{
						xtype: 'combobox',
						name: 'provider_id',
						allowBlank: false,
						displayField: 'cp_name',
						valueField:'cp_id',
						queryMode: 'local',
						editable: false,
						flex: 1,
						bind: {
							store: '{contProviderByAuthStore}'
						},
						fieldLabel: '*来源',
						emptyText: '选择来源'
					}]
				}, {
					xtype: 'container',
					layout: 'hbox',
					margin: '10, 0, 0, 0',
					items: [{
						xtype: 'combobox',
						name: 'c_type',
						allowBlank: false,
						displayField: 's_name',
						valueField:'s_id',
						queryMode: 'local',
						editable: false,
						flex: 1,
						bind: {
							store: '{contTypeStore}'
						},
						fieldLabel: '*资产类型',
						emptyText: '选择资产类型'
					}]
				}, {
					xtype: 'container',
					layout: 'hbox',
					defaultType: 'textfield',
					margin: '10, 0, 0, 0',
					items: [{
						name: 'cv_language',
						fieldLabel: '语言',
						allowBlank: true,
						flex: 1,
						emptyText: '英语en,德语de,中文zh,法语fr'
					}, {
						name: 'cv_country_code',
						fieldLabel: '地区',
						allowBlank: true,
						flex: 1,
						emptyText: '美国us,德国de,中国cn,法国fr'
					}]
				}, {
					xtype: 'textareafield',
					margin: '10, 0, 10, 0',
					anchor: '100%',
					name: 'c_description',
					fieldLabel: '资产描述',
					emptyText: '请对资产进行描述'
				}, {
					xtype: 'textfield',
					margin: '10, 0, 10, 0',
					anchor: '100%',
					name: 'c_isp_cont_code',
					fieldLabel: '合作方内容编码(ID)',
					emptyText: '请输入合作方内容编码或ID'
				}]
			}, {
				xtype: 'textfield',
				name: 'cv_img_info',
				value: 1,
				bind: {
					//value: '{cv_img_info}'
				},
				hidden: true
			}, {
				xtype: 'multiimggroup',
		        title: '图片信息',
		        collapsible: true,
		        defaultType: 'textfield',
		        fieldName: 'imginfo',
				margin: '10, 2, 0, 0'
			}]
		}],
	buttonAlign: 'center',
	buttons: [{
		text: '提交',
		handler: 'onSubmit'
	}, {
		text: '取消',
		handler: 'onCancel'
	}],
	listeners: {
		resize: function(win, width, height) {
			var bodyH = Ext.getBody().getHeight();
			var y = (bodyH-height)/2;
			win.setY(y);
			win.setMaxHeight(bodyH-20);
		},
		show: function(win) {

		}
	}
});