Ext.define('app.view.module.whitelist.WhiteListController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.Toast'
    ],

    alias: 'controller.whitelist',
    
    onAddBtn: function(btn, e) {
    	var win = this.lookupReference('whitelist_window');
    	
    	if (!win) {
            win = Ext.create('app.view.module.whitelist.WhiteListWindow', {
            	viewModel: this.getView().getViewModel()
            });
            this.getView().add(win);
        }
    	
    	win.setTitle('添加');
    	win.down('form').reset();
    	
    	win.show();
    },
    
    onModify: function(grid, row, col, item, e, record) {
    	var win = this.lookupReference('whitelist_window');
    	
    	if (!win) {
            win = Ext.create('app.view.module.whitelist.WhiteListWindow', {
            	viewModel: this.getView().getViewModel()
            });
            this.getView().add(win);
        }
    	
    	win.setTitle('修改');
    	win.down('form').loadRecord(record);
    	
    	win.show();
    },
	onDownload: function(grid, row, col, item, e, record) {
		var iWidth=800; //弹出窗口的宽度;
		var iHeight=500; //弹出窗口的高度;
		var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
		var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
		window.open(record.raw.http_xml_path,"xml","height=500,width=800,top="+iTop+",left="+iLeft+"status=no,toolbar=no, menubar=no,location=no");
	},

    onRemove: function(grid, row, col, item, e, record) {
    	
    	Ext.Msg.show({
		    title:'删除',
		    message: '版本号：' + record.raw.version,
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
    		url: 'whitelist/del.do',
    		async: true,
    		params: {
    			wl_id: record.raw.wl_id
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
    
    onSubmit: function() {
    	var grid = this.getView();
    	var win = this.lookupReference('whitelist_window');
    	var form = win.down('form');
    	var values = form.getValues();
    	var self = this;

    	var url = 'whitelist/update.do';
    	if(values.wl_id === "-1") {
    		url = 'whitelist/save.do';
    	}
    	
    	/*var patterns = form.down('checkboxgroup').getValue();
    	values.pattern1 = "";
    	if(patterns.pattern1 != undefined && patterns.pattern1 != null) {
    		values.pattern1 = patterns.pattern1;
    	}
    	
    	values.pattern2 = "";
    	if(patterns.pattern2 != undefined && patterns.pattern2 != null) {
    		values.pattern2 = patterns.pattern2;
    	}*/
    	
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
    
    parseIsDefaultV: function(v) {
    	
    	var str = '否';
    	if(v == '1') {
    		str = '是';
    	}
    	
    	return str;
    }
});
