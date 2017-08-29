Ext.define('app.view.module.theme.ThemeWindow', {
	extend : 'Ext.window.Window',
	alias : 'widget.theme-window',

	reference : 'theme_window',

	uses : ['app.view.module.theme.ThemePreviewPanel',
			'app.view.module.theme.ThemeLittleImagPanel' ],

	closable : true,
	closeAction : 'hide',
	resizable : true,
	modal : true,
	draggable : true,
	autoShow : true,
	width : 720,
	scrollable : true,
	title : '添加主题',
	glyph : 0xf007,
	initComponent : function() {

		this.maxHeight = Ext.getBody().getHeight() - 20;

		this.callParent();
	},

	items : [ {
		xtype : 'form',
		bodyPadding : 20,
		fieldDefaults : {
			labelWidth : 120,
			labelAlign : 'right'
		},
		items : [ {
			xtype : 'textfield',
			name : 'cv_base_info',
			value : 1,
			bind : {
			// value: '{cv_base_info}'
			},
			hidden : true
		}, {
			xtype : 'textfield',
			name : 'package_name',
			value : '',
			hidden : true,
		}, {
			xtype : 'fieldset',
			title : '基本信息',
			collapsible : false,
			defaultType : 'textfield',
			fieldName : 'baseinfo',
			hidden : false,
			bind : {
			// hidden: '{!hasBaseInfo}'
			},
			items : [{
				xtype : 'textfield',
				name : 'c_id',
				hidden : true,
				value : '-1'
			},
//			{
//				xtype : 'container',
//				layout : 'hbox',
//				items : [ {
//					xtype : 'combobox',
//					name : 'c_site',
//					labelAlign : 'right',
//					displayField : 's_name',
//					valueField : 's_id',
//					queryMode : 'local',
//					allowBlank : false,
//					editable : false,
//					bind : {
//						store : '{siteAllStore}'
//					},
//					fieldLabel : '*模式',
//					emptyText : '请选择模式...',
//					listeners : {
//						select : 'onSiteSelect'
//					}
//				} ]
//			}, 
			{
				xtype : 'container',
				layout : 'hbox',
				margin : '10, 0, 0, 0',
				items : [ {
					xtype : 'combobox',
					name : 'c_status',
					allowBlank : false,
					displayField : 's_name',
					valueField : 's_id',
					queryMode : 'local',
					editable : false,
					flex : 1,
					bind : {
						store : '{contStatusStore}'
					},
					fieldLabel : '*主题状态',
					emptyText : '选择主题状态'
				}, {
					xtype : 'combobox',
					name : 'provider_id',
					allowBlank : false,
					displayField : 'CP_NAME',
					valueField : 'CP_ID',
					queryMode : 'local',
					editable : false,
					flex : 1,
					store : Ext.create('Ext.data.JsonStore',{
						fields: ['CP_ID', 'CP_NAME'],
						proxy:{
							 type: 'ajax',
					         url: 'contprovider/query_criteria.do?sourceType=zxzt&p_status=1',
					         reader: {
					             type: 'json',
					             rootProperty: 'data'
					         }
						},
						autoLoad: true
					}),
					fieldLabel : '*来源',
					emptyText : '选择来源'
				} ]
			}, {
				xtype : 'container',
				layout : 'hbox',
				defaultType : 'textfield',
				margin : '10, 0, 0, 0',
				items : [ {
					xtype : 'datefield',
					name : 'active_time',
					allowBlank : false,
					flex : 1,
					fieldLabel : '*生效时间',
					value : new Date(),
					format : 'Y-m-d H:i:s'
				}, {
					xtype : 'datefield',
					name : 'deactive_time',
					allowBlank : false,
					flex : 1,
					fieldLabel : '*失效时间',
					value : Ext.Date.add(new Date(), Ext.Date.YEAR, 50),
					format : 'Y-m-d H:i:s'
				} ]
			}, {
				xtype : 'container',
				layout : 'hbox',
				margin : '10, 0, 0, 0',
				defaultType : 'textfield',
				items : [ {
					name : 'name',
					fieldLabel : '*主题名称',
					allowBlank : false,
					flex : 1,
					emptyText : '输入主题名称'
				} ]
			}
//			, {
//				xtype : 'container',
//				layout : 'hbox',
//				margin : '10, 0, 0, 0',
//				defaultType : 'textfield',
//				items : [ {
//					name : 'package_name',
//					fieldLabel : '*主题包名',
//					allowBlank : false,
//					emptyText : '主题包名',
//					flex : 1
//				} ]
//			}
			, {
				xtype : 'container',
				layout : 'hbox',
				margin : '10, 0, 0, 0',
				defaultType : 'numberfield',
				items : [ {
					name : 'price',
					fieldLabel : '*主题价格',
					allowBlank : false,
					emptyText : '主题价格',
					flex : 1,
					minValue: 0,
					hideTrigger: true,
					allowDecimals : false,
					decimalPrecision:0 
				} ]
			}, {
				xtype : 'container',
				layout : 'hbox',
				margin : '10, 0, 0, 0',
				defaultType : 'textfield',
				items : [ {
					name : 'version',
					fieldLabel : '版本名称',
//					allowBlank : false,
					disabled : true,
					emptyText : '主题版本名称',
					flex : 1
				}, {
//					allowBlank : false,
					disabled : true,
					name : 'version_code',
					flex : 1,
					fieldLabel : '版本代号',
					emptyText : '主题版本代号',
				} ]
			}, {
				xtype : 'textareafield',
				margin : '10, 0, 10, 0',
				anchor : '100%',
				name : 'description',
				fieldLabel : '主题描述',
				emptyText : '请对主题进行描述'
			} ]
		} ]
	} ],
	buttonAlign : 'center',
	buttons : [ {
		text : '提交',
		handler : 'onThemeSubmit'
	}, {
		text : '取消',
		handler : 'onThemeCancel'
	} ],
	listeners : {
		resize : function(win, width, height) {
			var bodyH = Ext.getBody().getHeight();
			var y = (bodyH - height) / 2;
			win.setY(y);
			win.setMaxHeight(bodyH - 20);
		},
		show : function(win) {

		}
	}
});