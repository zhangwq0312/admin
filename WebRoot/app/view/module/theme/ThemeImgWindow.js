Ext.define('app.view.module.theme.ThemeImgWindow', {
	extend : 'Ext.window.Window',
	alias : 'widget.theme-window',

	reference : 'theme_img_window',

	uses : [ 'app.view.module.theme.ThemePreviewPanel',
			'app.view.module.theme.ThemeLittleImagPanel' ],

	closable : true,
	closeAction : 'hide',
	resizable : true,
	modal : true,
	draggable : true,
	autoShow : true,
	width : 620,
	height : 700,
	scrollable : true,
	title : '添加主题图',
	// y: 10,
	glyph : 0xf007,
	initComponent : function() {
		this.maxHeight = Ext.getBody().getHeight() - 20;
		this.callParent();
	},
	
	items : [ {
		xtype : 'form',
		bodyPadding : 20,
		defaultType: 'textfield',
		fieldDefaults : {
			labelWidth : 120,
			labelAlign : 'right'
		},
		items : [{
			name : 'c_id',
			hidden : true,
			value : '-1',
			listeners : {
				change :  function(combo, newValue, oldValue, eOpts){
					var form = this.up('form');
					var themepreviewpanel = form.down("themepreviewpanel");
					themepreviewpanel.reload(newValue);
					var themelittleimagpanel = form.down("themelittleimagpanel");
					themelittleimagpanel.reload(newValue);
				}
			}
		}, {
			xtype : 'fieldset',
			title : '预览图信息',
			collapsible : false,
			defaultType : 'textfield',
			fieldName : '',
			hidden : false,
			margin : '10, 2, 0, 0',
			items : [ {
				xtype : 'themepreviewpanel',
				name : 'themepreviewpanel',
			} ]
		}, {
			xtype : 'fieldset',
			title : '缩略图信息',
			collapsible : true,
			defaultType : 'textfield',
			fieldName : 'imginfo',
			hidden : false,
			margin : '10, 2, 0, 0',
			items : [ {
				xtype : 'themelittleimagpanel',
				name : 'themelittleimagpanel',
			} ]
		}, {
			xtype : 'textfield',
			name : 'cv_img_info',
			value : 1,
			bind : {
				value : '{cv_img_info}'
			},
			hidden : true
		}, {
			xtype : 'textfield',
			name : 'cv_img_info2',
			value : 1,
			bind : {
				value : '{cv_img_info}'
			},
			hidden : true
		} ]
	} ],
	buttonAlign : 'center',
	buttons : [ {
		text : '确定',
		handler : function(btn){
			btn.up('theme-window').hide();
		}
//		handler : 'onThemeSubmit'
//			, {
//			text : '取消',
//			handler : 'onThemeCancel'
//		} 
	}],
	
	
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