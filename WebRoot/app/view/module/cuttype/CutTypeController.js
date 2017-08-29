Ext.define('app.view.module.cuttype.CutTypeController', {
    extend: 'Ext.app.ViewController',

	mainViewModel: null,
    requires: [
        'Ext.window.Toast'
    ],

    alias: 'controller.cuttype',
    
    onAddBtn: function() {
    	var win = this.lookupReference('cuttype_window');
    	
    	if (!win) {
            win = Ext.create('app.view.module.cuttype.CutTypeWindow', {
            	viewModel: this.getView().getViewModel()
            });
            this.getView().add(win);
        }
    	
    	win.setTitle('添加');
    	win.down('form').reset();
    	
    	win.show();
    },
    
    onModify: function(grid, row, col, item, e, record) {
    	if(!this.getViewModel().isAdmin()) {
    		return;
    	}
    	
    	var win = this.lookupReference('cuttypeedit_window');
    	
    	if (!win) {
            win = Ext.create('app.view.module.cuttype.CutTypeEditWindow', {
            	viewModel: this.getView().getViewModel()
            });
            this.getView().add(win);
			
        }
		
    	win.setTitle('修改：' + record.raw.name);
    	
    	win.down('form').loadRecord(record);
    	
    	win.show();
    },
	onDelete: function(grid, row, col, item, e, record) {
    	Ext.Msg.show({
		    title:'删除',
		    message: '套餐名称：' + record.raw.name,
		    buttons: Ext.Msg.YESNO,
		    icon: Ext.Msg.QUESTION,
		    scope: this,
		    fn: function(btn) {
		        if (btn === 'yes') {
		        	this.del(grid, record);
		        }
		    }
		});
    },
    del: function(grid, record) {
    	var p = this.getView();
    	p.mask('删除中...');
    	
    	Ext.Ajax.request({
    		url: 'cutType/del.do',
    		async: true,
    		params: {
    			c_id: record.raw.c_id
    		},
    		scope: this,
    		success: function(resp, opt) {
    			var respJson = Ext.JSON.decode(resp.responseText);
    			if(respJson.issuc) {
    				grid.getStore().remove(record);
    			}
    			
    			p.unmask();
    			
    			Ext.Msg.alert('提示', respJson.msg);
    		}
    	});
    },
    
    onSubmit: function() {
    	var win = this.lookupReference('cuttype_window');
		this.submitCommon(win);
    },
    onEditSubmit: function() {
    	var win = this.lookupReference('cuttypeedit_window');
		this.submitCommon(win);
    },
    submitCommon: function(win) {
		var grid = this.getView();
    	var form = win.down('form');
    	var values = form.getValues();
    	
    	var url = 'cutType/update.do';
    	if(values.o_id === "-1") {
    		url = 'cutType/save.do';
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
			
			
    	};

	},
    
    parseStatusV: function(v) {
    	var str = '';
    	if(this.mainViewModel != null && this.mainViewModel.get('commonStatusStore') != null) {
    		str = this.mainViewModel.parseValue(v, 'commonStatusStore', 's_id', 's_name');
    	}
    	return str;
    },
	parseUnit_price: function(v) {
    	return '共'+v+'元';
    },
	parseType: function(v) {
    	var str = '';
    	if(this.mainViewModel != null && this.mainViewModel.get('cutTypeTypeStore') != null) {
    		str = this.mainViewModel.parseValue(v, 'cutTypeTypeStore', 's_id', 's_name');
    	}
    	return str;
    },
});
