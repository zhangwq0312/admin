Ext.define('app.view.module.marriage.Controller', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.Toast'
    ],
    mainViewModel: null,
    alias: 'controller.marriage',
	
	onAddBtn: function() {
    	var win = this.lookupReference('marriage_window');
    	
    	if (!win) {
            win = Ext.create('app.view.module.marriage.MarriageWindow', {
        
            });
            this.getView().add(win);
        }
        this.getView().query("textfield[name=m_id]")[0].setHidden(true);
        this.getView().query("textfield[name=m_tel]")[0].setHidden(false);
        this.getView().query("textfield[name=m_fullname]")[0].setHidden(false);
        this.getView().query("textfield[name=m_sex]")[0].setDisabled(false);
        this.getView().query("textfield[name=m_born_time]")[0].setDisabled(false);    	win.setTitle('添加');
    	win.down('form').reset();
    	win.show();
    },
    onModify: function(grid, row, col, item, e, record) {
    	var win = this.lookupReference('marriage_window');
    	
    	if (!win) {
            win = Ext.create('app.view.module.marriage.MarriageWindow', {
        
            });
            this.getView().add(win);
        }
        
        this.getView().query("textfield[name=m_id]")[0].setHidden(false);
        this.getView().query("textfield[name=m_tel]")[0].setHidden(true);
        this.getView().query("textfield[name=m_fullname]")[0].setHidden(true);
        
        this.getView().query("textfield[name=m_sex]")[0].setDisabled(true);
        this.getView().query("textfield[name=m_born_time]")[0].setDisabled(true);
    	win.setTitle('修改：' + record.raw.m_fullname);
    	win.down('form').loadRecord(record);
    	win.show();
    },
    
    onSubmit: function() {
    	var win = this.lookupReference('marriage_window');
		this.submitCommon(win);
    },
   submitCommon: function(win) {
		var grid = this.getView();
    	var form = win.down('form');
    	var values = form.getValues();
    	
    	var url = 'marriage/update.do';
    	if(values.m_id === "") {
    		url = 'marriage/save.do';
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
	
	parseStatusV: function(v) {
    	var str = '';
    	if(this.mainViewModel != null && this.mainViewModel.get('common_shenhe_StatusStore') != null) {
    		str = this.mainViewModel.parseValue(v, 'common_shenhe_StatusStore', 's_id', 's_name');
    	}
    	return str;
    },

	search: function () {
		var panel = this.getView();
    	var store = this.getView().getStore();
    	store.proxy.extraParams.tel = panel.query("textfield[name=tel]")[0].getValue();
    	store.proxy.extraParams.username = panel.query("textfield[name=username]")[0].getValue();
    	store.proxy.extraParams.sex = panel.query("combo[name=sex]")[0].getValue();
    	store.proxy.extraParams.img = panel.query("combo[name=img]")[0].getValue();
    	store.proxy.extraParams.identity = panel.query("combo[name=identity]")[0].getValue();
    	store.proxy.extraParams.status = panel.query("combo[name=status]")[0].getValue();
		store.load();
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
		    message: '名称：' + record.raw.m_fullname,
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
    		url: 'marriage/change.do',
    		async: true,
    		params: {
				type:type,
    			marriage_id: record.raw.m_id,
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
	
	parseSexStatusV: function(v) {
    	var str = '';
    	if(this.mainViewModel != null && this.mainViewModel.get('sexStatusStore') != null) {
    		str = this.mainViewModel.parseValue(v, 'sexStatusStore', 's_id', 's_name');
    	}
    	return str;
    },
    
	parseImgStatusV: function(v) {
    	var str = '';
    	if(this.mainViewModel != null && this.mainViewModel.get('marriageImgStatusStore') != null) {
    		str = this.mainViewModel.parseValue(v, 'marriageImgStatusStore', 's_id', 's_name');
    	}
    	return str;
    },
    parseTel: function(v) {
    	var n ='________'+v.substr(v.length-4);
    	return n;
    },
    parseName: function(v) {
    	v =v.substr(0,1)+'**';
    	return v;
    },
    parseIdentity: function(v) {
    	var str = '';
    	if(this.mainViewModel != null && this.mainViewModel.get('identityStatusStore') != null) {
    		str = this.mainViewModel.parseValue(v, 'identityStatusStore', 's_id', 's_name');
    	}
    	return str;
    },

});
