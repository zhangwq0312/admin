Ext.define('app.view.module.Controller', {
    extend: 'Ext.app.ViewController',
    
    openAddWindow: function(window,windowfile) {
	   	var title='添加';
        openAddWindow(window,windowfile,title);
    },
    openAddWindow: function(window,windowfile,title) {
        var win = this.lookupReference(window);
    	if (!win) {
            win = Ext.create(windowfile, {
            	viewModel: this.getView().getViewModel()
            });
            this.getView().add(win);
        }
    	win.setTitle(title);
    	win.down('form').reset();
    	win.show();
    },
	openEditWindow: function(view,rowIndex,colIndex,item,e,record,window,windowfile) {
	   	var title='修改：';
        openEditWindow(view,rowIndex,colIndex,item,e,record,window,windowfile,title)
    },
    
	openEditWindow: function(view,rowIndex,colIndex,item,e,record,window,windowfile,title) {
        var win = this.lookupReference(window);
    	if (!win) {
            win = Ext.create(windowfile, {
            	viewModel: this.getView().getViewModel()
            });
            this.getView().add(win);
        }
    	win.setTitle(title);
    	win.down('form').loadRecord(record);
    	win.show();
   },
   
   submitTwoUrlOid: function(window,update_url,add_url) {
        var win = this.lookupReference(window);
		var grid = this.getView();
    	var form = win.down('form');
    	var values = form.getValues();
    	
    	var url = update_url;
    	if(values.o_id === "-1") {
    		url = add_url;
    	};
    	
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
    	}else{
            Ext.Msg.alert('提示', '格式有误');
        };
	},
   
   submitCommon: function(window,url) {
        var win = this.lookupReference(window);
		var grid = this.getView();
    	var form = win.down('form');
    	var values = form.getValues();
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
    
	parseBase: function(v,store_name,key_name,value_name) {
    	var str = '';
    	if(this.mainViewModel != null && this.mainViewModel.get(store_name) != null) {
    		str = this.mainViewModel.parseValue(v, store_name, key_name, value_name);
    	}
    	return str;
	},
});
