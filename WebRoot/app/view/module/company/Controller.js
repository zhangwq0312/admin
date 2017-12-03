Ext.define('app.view.module.company.Controller', {
    extend: 'app.view.module.Controller',

    requires: [
        'Ext.window.Toast'
    ],
    mainViewModel: null,
    alias: 'controller.company',
	
	onAddBtn: function() {
        var window= 'company_window';
        var windowfile='app.view.module.company.CompanyWindow';
        this.openAddWindow(window,windowfile);
    },
	onPay: function(view,rowIndex,colIndex,item,e,record) {
	
	  	var s = this.mainViewModel.get('cutTypeStore');
		s.clearFilter(); 
		s.filterBy(function(record){  
			return record.raw.status > -1&&record.raw.type=='company_valid';  
		});  

        var window= 'company_paywindow';
        var windowfile='app.view.module.company.PayWindow';
        this.openEditWindow(view,rowIndex,colIndex,item,e,record,window,windowfile);
    },
    onSubmit: function() {
        var w='company_window';
        var update_url='company/update.do';
        var add_url='company/save.do';
		this.submitTwoUrlOid(w,update_url,add_url);
    },
  	//主题搜索重置
  	onSearchReset: function () {
		var panel = this.getView();
		panel.query("textfield[name=tel]")[0].setValue("");
		panel.query("textfield[name=company_tel]")[0].setValue("");
		panel.query("textfield[name=title]")[0].setValue("");
		panel.query("combo[name=status]")[0].setValue("");
		panel.query("combo[name=type]")[0].setValue("");
		
    	var viewModel = this.getView().getViewModel();
    	viewModel.set('search_tel', '');
    	viewModel.set('search_company_tel', '');
    	viewModel.set('search_title', '');
    	viewModel.set('search_status', '');
    	viewModel.set('search_type', '');
	},
	search: function () {
    	var store = this.getView().getStore();
    	var viewModel = this.getView().getViewModel();
    	store.proxy.extraParams.tel = viewModel.get('search_tel');
    	store.proxy.extraParams.company_tel = viewModel.get('search_company_tel');
    	store.proxy.extraParams.title = viewModel.get('search_title');
    	store.proxy.extraParams.type = viewModel.get('search_type');
    	store.proxy.extraParams.status = viewModel.get('search_status');
		store.load();
    	//viewModel.set('c_id', -1);
	},

	onSearchChangeTel : function(tf, newValue, oldValue, eOpts){
    	var viewModel = this.getView().getViewModel();
    	viewModel.set('search_tel', newValue);
    },
	onSearchChangeCompanyTel : function(tf, newValue, oldValue, eOpts){
    	var viewModel = this.getView().getViewModel();
    	viewModel.set('search_company_tel', newValue);
    },
	onSearchChangeTitle : function(tf, newValue, oldValue, eOpts){
    	var viewModel = this.getView().getViewModel();
    	viewModel.set('search_title', newValue);
    },
	onSearchChangeStatus : function(combo, record) {
    	var viewModel = this.getView().getViewModel();
		viewModel.set('search_status', record.raw.status_id);
    },
	onSearchChangeType : function(combo, record) {
    	var viewModel = this.getView().getViewModel();
		viewModel.set('search_type', record.raw.s_id);
    },

	onPaySubmit: function() {
        var w='company_paywindow';
        var url='company/paySubmit.do';
		this.submitCommon(w,url);
    },

	onNo: function(view,rowIndex,colIndex,item,e,record) {
		var type='no';
		var title='禁用';
		this.change(view,rowIndex,colIndex,item,e,record,type,title);
    },
	onYes: function(view,rowIndex,colIndex,item,e,record) {
		var type='yes';
		var title='启用';
		this.change(view,rowIndex,colIndex,item,e,record,type,title);
    },


	change: function(view,rowIndex,colIndex,item,e,record,type,title) {
	
		Ext.Msg.show({
		    title:title,
		    message: '名称：' + record.raw.company_name,
		    buttons: Ext.Msg.YESNO,
		    icon: Ext.Msg.QUESTION,
		    scope: this,
		    fn: function(btn) {
		        if (btn === 'yes') {
		        	this.core(view,rowIndex,colIndex,item,e,record,type);
		        }
		    }
		});
    },
	
	core: function(view,rowIndex,colIndex,item,e,record,type) {
    	view.mask('执行中...');
    	
    	Ext.Ajax.request({
    		url: 'company/change.do',
    		async: true,
    		params: {
				type:type,
    			company_id: record.raw.company_id,
    		},
    		scope: this,
    		success: function(resp, opt) {
    			var respJson = Ext.JSON.decode(resp.responseText);
    			if(respJson.issuc) {
    				view.getStore().reload();
    			}
    			
    			view.unmask();
    			
    			Ext.Msg.alert('提示', respJson.msg);
    		}
    	});
    },
	
	parseCompanyTypeV: function(v) {
        var store_name = 'companyTypeStore';
        var key_name = 's_id';
        var value_name = 's_name';
        return this.parseBase(v,store_name,key_name,value_name);
    },
	parseStatusV: function(v) {
        var store_name = 'common_shenhe_StatusStore';
        var key_name = 's_id';
        var value_name = 's_name';
        return this.parseBase(v,store_name,key_name,value_name);
    },
});
