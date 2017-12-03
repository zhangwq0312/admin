Ext.define('app.view.module.operator.OperatorController', {
    extend: 'app.view.module.Controller',

    requires: [
        'Ext.window.Toast'
    ],

    alias: 'controller.operator',
    
    onAddBtn: function() {
        var window= 'operator_window';
        var windowfile='app.view.module.operator.OperatorWindow';
        this.openAddWindow(window,windowfile);
    },
    
    onModify: function(view,rowIndex,colIndex,item,e,record) {
    	
    	if(!this.getViewModel().isAdmin()) {
    		return;
    	}
    	
    	var arr = record.raw.role_names.split(',');
    	record.raw.role_names = arr.join('\n');
    	
        var window= 'operator_window';
        var windowfile='app.view.module.operator.OperatorWindow';
        var title='修改：' + record.raw.name;
        this.openEditWindow(view,rowIndex,colIndex,item,e,record,window,windowfile,title);
    },
    
    onModifyPsd: function(grid, row, col, item, e, record) {
    	Ext.Msg.prompt('修改密码', '输入新密码：', function(btn, psd){
    	    if (btn == 'ok'){
    	        this.modifyOperatorPsd(grid, record, psd);
    	    }
    	}, this, false, record.raw.password);
    },
    
    modifyOperatorPsd: function(grid, record, psd) {
    	psd = Ext.String.trim(psd);
    	
    	if(Ext.isEmpty(psd)) {
    		Ext.Msg.alert('提示', '密码不能为空');
    		
    		return;
    	}
    	
    	Ext.Ajax.request({
    		url: 'operator/change_password.do',
    		async: true,
    		params: {
    			o_id: record.raw.o_id,
    			psd: psd
    		},
    		scope: this,
    		timeout: 5*60*1000,
    		success: function(resp, opt) {
    			var respJson = Ext.JSON.decode(resp.responseText);
    			if(respJson.issuc) {
    				grid.getStore().reload();
    			}
    			
    			Ext.Msg.alert('提示', respJson.msg);
    		}
    	});
    },

    onRemove: function(grid, row, col, item, e, record) {
    	
    	Ext.Msg.show({
		    title:'删除',
		    message: '用户名称：' + record.raw.name,
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
    		url: 'operator/del.do',
    		async: true,
    		params: {
    			o_id: record.raw.o_id
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
    
    onChoiceRole: function(btn, e) {
    	AppUtil.showChoiceWindow({
			view: this,
			btn: btn,
			mWin: this.lookupReference('operator_window'),
			win_title: '选择角色',
			url: 'role/query_all.do',
			d_key: 'roleArr',
			d_id: 'r_id',
			d_name: 'r_name'
		});
    },
    
    onSubmit: function() {
        var w='operator_window';
        var update_url='operator/update.do';
        var add_url='operator/save.do';
		this.submitTwoUrlOid(w,update_url,add_url);
    },
    
    mainViewModel: null,
    
    parseStatusV: function(v) {
        var store_name = 'commonStatusStore';
        var key_name = 's_id';
        var value_name = 's_name';
        return this.parseBase(v,store_name,key_name,value_name);
    }
});
