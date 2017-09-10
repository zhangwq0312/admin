Ext.define('app.view.module.msg.Controller', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.Toast'
    ],
    mainViewModel: null,
    alias: 'controller.msg',

	parseStatusV: function(v) {
    	var str = '';
    	if(this.mainViewModel != null && this.mainViewModel.get('msgStatusStore') != null) {
    		str = this.mainViewModel.parseValue(v, 'msgStatusStore', 's_id', 's_name');
    	}
    	return str;
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
    onModify: function(grid, row, col, item, e, record) {
    	var win = this.lookupReference('msg_window');
    	
    	if (!win) {
            win = Ext.create('app.view.module.msg.MsgWindow', {
        
            });
            this.getView().add(win);
        }
        
    	win.setTitle('来自：' + record.raw.from_tel);
    	win.down('form').loadRecord(record);
    	win.show();
    },
    onSubmit: function() {
    	var win = this.lookupReference('msg_window');
		this.submitCommon(win);
    },
   submitCommon: function(win) {
		var grid = this.getView();
    	var form = win.down('form');
    	var values = form.getValues();
    	
    	var url = 'msg/update.do';
    	
    	if (form.isValid()){
    		win.mask('正在保存...');
    		
	    	form.submit({
	    		clientValidation: true,
	    	    url: url,
	    		params: values,
	    		submitEmptyText: false,
	    		success: function(form, action) {
	    			if(action.result.issuc) {
	    				form.reset();
	    				win.hide();
	    				grid.getStore().reload();
	    			}
					win.unmask();
	    			Ext.Msg.alert('提示', action.result.msg);
	    		}
				
	    	});
			
			
    	};

	},
});
