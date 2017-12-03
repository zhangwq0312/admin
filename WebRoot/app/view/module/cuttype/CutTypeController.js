Ext.define('app.view.module.cuttype.CutTypeController', {
    extend: 'app.view.module.Controller',

	mainViewModel: null,
    requires: [
        'Ext.window.Toast'
    ],

    alias: 'controller.cuttype',
    
    onAddBtn: function() {
        var window= 'cuttype_window';
        var windowfile='app.view.module.cuttype.CutTypeWindow';
        this.openAddWindow(window,windowfile);
    },
    
    onModify: function(view,rowIndex,colIndex,item,e,record) {
    	if(!this.getViewModel().isAdmin()) {
    		return;
    	}
        var window= 'cuttypeedit_window';
        var windowfile='app.view.module.cuttype.CutTypeEditWindow';
        this.openEditWindow(view,rowIndex,colIndex,item,e,record,window,windowfile);
    },
	onDelete: function(grid, row, col, item, e, record) {
    	Ext.Msg.show({
		    title:'删除',
		    message: '业务名称：' + record.raw.name,
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
        var w='cuttype_window';
        var update_url='cutType/update.do';
        var add_url='cutType/save.do';
		this.submitTwoUrlOid(w,update_url,add_url);
    },
    onEditSubmit: function() {
        var w='cuttypeedit_window';
        var update_url='cutType/update.do';
        var add_url='cutType/save.do';
		this.submitTwoUrlOid(w,update_url,add_url);
    },
    onChangeTypeNumWeekText: function (combo,records,eOpts) {
        var win = this.lookupReference('cuttype_window');
        var t = win.query("numberfield[name=unit_contain_weeks]")[0];

        if(records.raw.s_id == "company_valid"){
           t.setFieldLabel('*月数')
        } else if(records.raw.s_id == "marriage_valid"){
           t.setFieldLabel('*次数')
        } else if(records.raw.s_id == "post_flush"){
           t.setFieldLabel('*天数')
        } else {
           t.setFieldLabel('*内含数量')
        }
    },

	parseUnit_price: function(v) {
    	return '共'+v+'元';
    },
    parseStatusV: function(v) {
        var store_name = 'commonStatusStore';
        var key_name = 's_id';
        var value_name = 's_name';
        return this.parseBase(v,store_name,key_name,value_name);
    },
	parseType: function(v) {
        var store_name = 'cutTypeTypeStore';
        var key_name = 's_id';
        var value_name = 's_name';
        return this.parseBase(v,store_name,key_name,value_name);
    },
});
