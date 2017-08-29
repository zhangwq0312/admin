Ext.define('app.view.module.role.RoleController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.Toast'
    ],

    alias: 'controller.role',
    
    refreshBaseStore: function(){
    	console.log("--refreshBaseStore:roleArr");
    	if (AppUtil.ChoiceData["roleArr"]){
    		AppUtil.ChoiceData["roleArr"] = null;
    	}
    },

    onAddBtn: function(btn, e) {
    	var win = this.lookupReference('role_window');
    	
    	if (!win) {
            win = Ext.create('app.view.module.role.RoleWindow');
            this.getView().add(win);
        }
    	
    	win.setTitle('新增');
    	win.down('form').reset();
    	
    	win.show();
    },
    
    onModify: function(grid, row, col, item, e, record) {
    	var win = this.lookupReference('role_window');
    	
    	if (!win) {
            win = Ext.create('app.view.module.role.RoleWindow');
            this.getView().add(win);
        }
    	
    	win.setTitle('修改：' + record.raw.name);
    	
    	var arr = record.raw.module_names.split(',');
    	record.raw.module_names = arr.join('\n');
    	
    	win.down('form').loadRecord(record);
    	
    	win.show();
    },

    onRemove: function(grid, row, col, item, e, record) {
    	var username = record.raw.name;
    	
    	if('超级管理员' === username) {
    		Ext.toast({
 				html: '【超级管理员】不能删除',
 				title: '提示',
 				saveDelay: 10,
 				align: 'tr',
 				closable: true,
 				width: 200,
 				useXAxis: true,
 				slideInDuration: 500
 			});
    		
    		return;
    	}
    	
    	Ext.Msg.show({
		    title:'删除',
		    message: '角色名称：' + username,
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
    	var self = this;

    	Ext.Ajax.request({
    		url: 'role/del.do',
    		async: true,
    		params: {
    			r_id: record.raw.r_id
    		},
    		scope: this,
    		success: function(resp, opt) {
    			var respJson = Ext.JSON.decode(resp.responseText);
    			if(respJson.issuc) {
    				grid.getStore().remove(record);
    			}
    			
    			p.unmask();
    			
    			Ext.Msg.alert('提示', respJson.msg);
    			self.refreshBaseStore();
    		}
    	});
    },
    
    onChoiceModule: function(btn, e) {
    	
    	AppUtil.showChoiceWindow({
			view: this,
			btn: btn,
			mWin: this.lookupReference('role_window'),
			//viewModel: this.mainViewModel,
			//storeRef: 'moduleAllStore',
			//store: 'app.store.ModuleAllStore',
			win_title: '选择模块',
			url: 'module/query_all.do',
			d_key: 'moduleArr',
			d_id: 'm_id',
			d_name: 'm_name'
		});
    },
  
    onSubmit: function() {
    	var grid = this.getView();
    	var win = this.lookupReference('role_window');
    	var form = win.down('form');
    	var values = form.getValues();
        var self = this;

    	var url = 'role/update.do';
    	if(values.r_id === "-1") {
    		url = 'role/save.do';
    	}
    	
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
	    			self.refreshBaseStore();
	    		}
	    	});
    	}
    },
    
    mainViewModel: null
});
