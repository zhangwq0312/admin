Ext.define('app.view.module.user.UserController', {
    extend: 'app.view.module.Controller',

    requires: [
        'Ext.window.Toast'
    ],
    mainViewModel: null,
    alias: 'controller.user',

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

    onAddMoney: function(view,rowIndex,colIndex,item,e,record,window,windowfile) {
        var window= 'add_money_window';
        var windowfile='app.view.module.user.AddMoneyWindow';
        this.openEditWindow(view,rowIndex,colIndex,item,e,record,window,windowfile);
    },
	
    onAddMoneySubmit: function() {
        var w='add_money_window';
        var url='user/addMoney.do';
		this.submitCommon(w,url);	
    },
    
	parseStatusV: function(v) {
        var store_name = 'commonStatusStore';
        var key_name = 's_id';
        var value_name = 's_name';
        return this.parseBase(v,store_name,key_name,value_name);
    },
	parseSexStatusV: function(v) {
        var store_name = 'sexStatusStore';
        var key_name = 's_id';
        var value_name = 's_name';
        return this.parseBase(v,store_name,key_name,value_name);
    },
});
