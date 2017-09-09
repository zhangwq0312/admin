Ext.define('app.view.module.post.PostController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.Toast'
    ],
    mainViewModel: null,
    alias: 'controller.post',
	
	parseStatusV: function(v) {
    	var str = '';
    	if(this.mainViewModel != null && this.mainViewModel.get('common_shenhe_StatusStore') != null) {
    		str = this.mainViewModel.parseValue(v, 'common_shenhe_StatusStore', 's_id', 's_name');
    	}
    	return str;
    },
	OnPostType: function(v) {
    	if(v=="zl_tel"){
			return "便民";
		}
    	if(v=="zl_house"){
			return "住房";
		}
    	if(v=="zl_employ"){
			return "工作";
		}
    },
  	//主题搜索重置
  	onSearchReset: function () {
		var panel = this.getView();
		panel.query("textfield[name=tel]")[0].setValue("");
		panel.query("textfield[name=title]")[0].setValue("");
		panel.query("combo[name=status]")[0].setValue("");
		panel.query("combo[name=type]")[0].setValue("");
		
    	var viewModel = this.getView().getViewModel();
    	viewModel.set('search_tel', '');
    	viewModel.set('search_title', '');
    	viewModel.set('search_status', '');
    	viewModel.set('search_type', '');
	},
	search: function () {
    	var store = this.getView().getStore();
    	var viewModel = this.getView().getViewModel();
    	store.proxy.extraParams.tel = viewModel.get('search_tel');
    	store.proxy.extraParams.title = viewModel.get('search_title');
    	store.proxy.extraParams.type = viewModel.get('search_type');
    	store.proxy.extraParams.status = viewModel.get('search_status');
    	store.proxy.extraParams.orderby = viewModel.get('search_orderby');
    	console.log('----------'+viewModel.get('search_orderby'));
		store.load();
    	//viewModel.set('c_id', -1);
	},


	onSearchChangeTel : function(tf, newValue, oldValue, eOpts){
    	var viewModel = this.getView().getViewModel();
    	viewModel.set('search_tel', newValue);
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
		viewModel.set('search_type', record.raw.type_id);
    },
	onSearchChangeOrderBy : function(combo, record) {
    	var viewModel = this.getView().getViewModel();
		viewModel.set('search_orderby', record.raw.orderField);
    },
	onPass: function(view,rowIndex,colIndex,item,e,record) {
		var type='pass';
		var title='审核通过';
		this.change(view,rowIndex,colIndex,item,e,record,type,title);
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
		    message: '帖子标题：' + record.raw.post_title,
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
    		url: 'post/change.do',
    		async: true,
    		params: {
				type:type,
    			post_id: record.raw.post_id,
				post_table:record.raw.post_table,
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
	
	onPay:function(view,rowIndex,colIndex,item,e,record) {
	
	  	var s = this.mainViewModel.get('cutTypeStore');
		s.clearFilter(); 
		s.filterBy(function(record){  
			return record.raw.status > -1&&record.raw.type=='post_flush';  
		});  
		//s.reload();
	
	   	var win = this.lookupReference('post_paywindow');
    	
    	if (!win) {
            win = Ext.create('app.view.module.post.PayWindow', {
            	viewModel: this.getView().getViewModel()
            });
            this.getView().add(win);
			
        }
    	
    	win.down('form').loadRecord(record);
    	
    	win.show();
	},
	
	onPaySubmit: function() {
    	var grid = this.getView();
    	var win = this.lookupReference('post_paywindow');
    	var form = win.down('form');
    	var values = form.getValues();
    	var url = 'post/paySubmit.do';
		
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
