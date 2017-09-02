Ext.define('app.view.module.user.UserController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.Toast'
    ],
    mainViewModel: null,
    alias: 'controller.user',
	
	parseStatusV: function(v) {
    	var str = '';
    	if(this.mainViewModel != null && this.mainViewModel.get('commonStatusStore') != null) {
    		str = this.mainViewModel.parseValue(v, 'commonStatusStore', 's_id', 's_name');
    	}
    	return str;
    },
	parseSexStatusV: function(v) {
    	var str = '';
    	if(this.mainViewModel != null && this.mainViewModel.get('sexStatusStore') != null) {
    		str = this.mainViewModel.parseValue(v, 'sexStatusStore', 's_id', 's_name');
    	}
    	return str;
    },
  	//主题搜索重置
  	onSearchReset: function () {
		var panel = this.getView();
		panel.query("textfield[name=tel]")[0].setValue("");
		panel.query("textfield[name=username]")[0].setValue("");
		panel.query("combo[name=status]")[0].setValue("");
		
    	var viewModel = this.getView().getViewModel();
    	viewModel.set('search_tel', '');
    	viewModel.set('search_username', '');
    	viewModel.set('search_status', '');
	},
	search: function () {
    	var store = this.getView().getStore();
    	var viewModel = this.getView().getViewModel();
    	store.proxy.extraParams.tel = viewModel.get('search_tel');
    	store.proxy.extraParams.username = viewModel.get('search_username');
    	store.proxy.extraParams.status = viewModel.get('search_status');
    	store.load();
    	//viewModel.set('c_id', -1);
	},


	onSearchChangeTel : function(tf, newValue, oldValue, eOpts){
    	var viewModel = this.getView().getViewModel();
    	viewModel.set('search_tel', newValue);
    },
	onSearchChangeUsername : function(tf, newValue, oldValue, eOpts){
    	var viewModel = this.getView().getViewModel();
    	viewModel.set('search_username', newValue);
    },
	onSearchChangeStatus : function(combo, record) {
    	var viewModel = this.getView().getViewModel();
		viewModel.set('search_status', record.raw.status_id);
    },
	
	queryAddCut: function(grid, row, col, item, e, record) {
    	var win = this.lookupReference('queryAddCut');
    	
    	if (!win) {
            win = Ext.create('app.view.module.user.queryAddCut', {
            	viewModel: this.getView().getViewModel(),
				
            });
            this.getView().add(win);
			
        }
		
		var store = win.down('queryAddMoneyGrid').getStore();
		store.proxy.extraParams.i_id = record.raw.i_id;
		store.proxy.extraParams.type = 'add';
		store.removeAll();
		store.load();
		
		var store2 = win.down('queryCutMoneyGrid').getStore();
		store2.proxy.extraParams.i_id = record.raw.i_id;
		store2.proxy.extraParams.type = 'cut';
		store2.removeAll();
		store2.load();
		
    	win.show();
    },

    onAddMoney: function(grid, row, col, item, e, record) {

    	var win = this.lookupReference('add_money_window');
    	
    	if (!win) {
            win = Ext.create('app.view.module.user.AddMoneyWindow', {
            	viewModel: this.getView().getViewModel()
            });
            this.getView().add(win);
			
        }
    	
    	win.down('form').loadRecord(record);
    	
    	win.show();
    },
	
    onAddMoneySubmit: function() {
    	var grid = this.getView();
    	var win = this.lookupReference('add_money_window');
    	var form = win.down('form');
    	var values = form.getValues();
    	var url = 'user/addMoney.do';
		
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
	//    				win.destroy();
	    				
	    				grid.getStore().reload();
	    			}
	    			win.unmask();
	    			
	    			Ext.Msg.alert('提示', action.result.msg);
	    		}
	    	});
    	}
    },

});
