Ext.define('app.view.module.msg.Controller', {
    extend: 'app.view.module.Controller',

    requires: [
        'Ext.window.Toast'
    ],
    mainViewModel: null,
    alias: 'controller.msg',

    onModify: function(view,rowIndex,colIndex,item,e,record) {
        var title='来自：' + record.raw.from_tel;
        var window= 'msg_window';
        var windowfile='app.view.module.msg.MsgWindow';
        this.openEditWindow(view,rowIndex,colIndex,item,e,record,window,windowfile,title);
    },
  	onSearchReset: function () {
		var panel = this.getView();
		panel.query("textfield[name=tel]")[0].setValue("");
		panel.query("textfield[name=username]")[0].setValue("");
		panel.query("combo[name=status]")[0].setValue("");
	},
	search: function () {
		var panel = this.getView();
    	var store = this.getView().getStore();
    	store.proxy.extraParams.tel = panel.query("textfield[name=tel]")[0].getValue();
    	store.proxy.extraParams.username = panel.query("textfield[name=username]")[0].getValue();
    	store.proxy.extraParams.status = panel.query("combo[name=status]")[0].getValue();
		store.load();
	},
    onSubmit: function() {
        var w='msg_window';
        var url='msg/update.do';
		this.submitCommon(w,url);
    },
	parseStatusV: function(v) {
        var store_name = 'msgStatusStore';
        var key_name = 's_id';
        var value_name = 's_name';
        return this.parseBase(v,store_name,key_name,value_name);
    },
});
