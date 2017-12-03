Ext.define('app.view.module.coupon.Controller', {
    extend: 'app.view.module.Controller',

    requires: [
        'Ext.window.Toast'
    ],
    mainViewModel: null,
    alias: 'controller.coupon',
    
	onAddBtn: function() {
        var window= 'coupon_window';
        var windowfile='app.view.module.coupon.CouponWindow';
        this.openAddWindow(window,windowfile);
    },
	onEdit: function(view,rowIndex,colIndex,item,e,record) {
        var window= 'coupon_window';
        var windowfile='app.view.module.coupon.CouponWindow';
        this.openEditWindow(view,rowIndex,colIndex,item,e,record,window,windowfile);
    },
    onSubmit: function() {
        var w='coupon_window';
        var update_url='coupon/update.do';
        var add_url='coupon/save.do';
		this.submitTwoUrlOid(w,update_url,add_url);
    },

  	//主题搜索重置
  	onSearchReset: function () {
		var panel = this.getView();
		panel.query("textfield[name=tel]")[0].setValue("");
		panel.query("textfield[name=company_name]")[0].setValue("");
		panel.query("combo[name=status]")[0].setValue("");
		panel.query("combo[name=type]")[0].setValue("");
	},
	search: function () {
    	var store = this.getView().getStore();
        var panel = this.getView();
    	store.proxy.extraParams.tel = panel.query("textfield[name=tel]")[0].getValue();
    	store.proxy.extraParams.company_name = panel.query("textfield[name=company_name]")[0].getValue();
    	store.proxy.extraParams.type = panel.query("combo[name=type]")[0].getValue();
    	store.proxy.extraParams.status =panel.query("combo[name=status]")[0].getValue();
        store.load();
	},

	onPaySubmit: function() {
        var w='coupon_paywindow';
        var url='coupon/paySubmit.do';
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
		    message: '名称：' + record.raw.coupon_name,
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
    		url: 'coupon/change.do',
    		async: true,
    		params: {
				type:type,
    			coupon_id: record.raw.coupon_id,
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
    
   parseType: function(v) {
        if(v=="1"){return "进行中";}
        if(v=="2"){return "未发布";}
        if(v=="3"){return "已结束";}
        if(v=="-1"){return "时间错误";}
    },
    parseStatus: function(v) {
        var store_name = 'commonStatusStore';
        var key_name = 's_id';
        var value_name = 's_name';
        return this.parseBase(v,store_name,key_name,value_name);
    },
});
