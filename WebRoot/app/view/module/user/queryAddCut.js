Ext.define('app.view.module.user.queryAddCut', {
	extend: 'Ext.window.Window',
	alias: 'widget.queryAddCut',
	
	reference: 'queryAddCut',
	
	uses: [
	   'app.ux.form.MultiTextAreaField',
	   'app.view.module.user.queryAddMoneyGrid',
	   'app.view.module.user.queryCutMoneyGrid'
	],
	i_id: null,
	closable: true,
	closeAction: 'destroy',
	resizable: false,
	modal: false,
	draggable: true,
	autoShow: true,
	width: 1020,
	height:450,
	scrollable: true,
	title: '历史记录',
	glyph: 0xf007,
	initComponent: function() {
		this.maxHeight = Ext.getBody().getHeight() - 20;
		this.callParent();
	},
	layout:'hbox',
	layoutConfig:{pack:'start',align:'stretch'},
	items:[{
		xtype:'queryAddMoneyGrid',
		width:350,
		height:400,
	},{
		xtype:'queryCutMoneyGrid',
		width:700,
		height:400,
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