Ext.define('app.view.module.role.RoleController', {
    extend: 'app.view.module.Controller',

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
        var window= 'role_window';
        var windowfile='app.view.module.role.RoleWindow';
        this.openAddWindow(window,windowfile);
    },
    
    onModify: function(view,rowIndex,colIndex,item,e,record) {
    
    	var arr = record.raw.module_names.split(',');
    	record.raw.module_names = arr.join('\n');
        /*the next is very import */
        record.raw.o_id=record.raw.r_id;
        var window= 'role_window';
        var windowfile='app.view.module.role.RoleWindow';
        var title='修改：' + record.raw.name;
        this.openEditWindow(view,rowIndex,colIndex,item,e,record,window,windowfile,title);
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
        var w='role_window';
        var update_url='role/update.do';
        var add_url='role/save.do';
		this.submitTwoUrlOid(w,update_url,add_url);
    },
    
    mainViewModel: null
});
