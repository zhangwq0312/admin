AppUtil = {};

AppUtil.baseid = 100;

AppUtil.createId =  function() {
	return AppUtil.baseid++;
};

AppUtil.imgnofind =  function(me) {
    me.src="app/resources/images/transparent_img.png";
};

AppUtil.ChoiceData = [];

AppUtil.showChoiceWindow = function(p) {
	if(AppUtil.ChoiceData[p.d_key]) {
		var allData = AppUtil.ChoiceData[p.d_key];
		AppUtil.choiceWindow(p.view, p.btn, p.win_title, allData);
	} else {
		
		var store = null;
		if(p.viewModel) {
			var store = p.viewModel.get(p.storeRef);
		}
		
		if(store != null && store != undefined && Ext.isObject(store)) {
			AppUtil.parserChoiceStore(p, store);
		} else {
			if(p.store) {	//Ext.data.Store优先于Ajax请求
				p.mWin.mask('正在获取数据...');
				var store = Ext.create(p.store, {
					listeners: {
						load: function(self, records, successful) {
							p.mWin.unmask();
							p.viewModel.set(p.storeRef, store);
							AppUtil.parserChoiceStore(p, store);
						}
					}
				})
			} else {
				AppUtil.requestChoiceData(p);
			}
		}
		
//		
		/*AppUtil.requestChoiceData({
			view: '',
			mWin: '',
			btn: '',
			viewModel: '',
			storeRef: '',
			store: '',
			win_title: '',
			url: '',
			d_key: '',
			d_id: '',
			d_name: '',
		});*/
	}
}

AppUtil.parserChoiceStore = function(p, store) {
	
	if(!Ext.isObject(p)) return;
	
	var allData = [];
	var id = p.d_id;
	var name = p.d_name;
	store.each(function(record, index, total) {
		allData.push({
			text: record.raw[name],
			value: record.raw[id]
		});
	});
	
	AppUtil.ChoiceData[p.d_key] = allData;
	
	AppUtil.choiceWindow(p.view, p.btn, p.win_title, allData);
}

AppUtil.choiceWindow = function(view, btn, title, data) {
	var win = view.lookupReference('checkboxgroup_window');
	var ids = view.lookupReference(btn.rValueName);
	var checkedData = [];
	
	var ids_v = ids.getValue();
	if(ids_v != null && ids_v != undefined && ids_v.length > 0) {
		checkedData = ids_v.split(',');
	}
	
	
	var names = view.lookupReference(btn.rTextName);
	
	var joinStr = '\n';
	if(names.getXType() === "textfield") {
		joinStr = ','
	}
	
	if (win) {
		win.destroy();
    }
	
	win = Ext.create('app.ux.window.CheckboxGroupWindow', {
    	width: 600,
    	title: title,
    	allData: data,
    	checkedData: checkedData,
    	onSubmit: function(w, vArr, tArr) {
    		ids.setValue(vArr.join(','));
        	names.setValue(tArr.join(joinStr));
    		w.destroy();
    	},
    	onCancel: function(w) {
    		w.destroy();
    	}
    });
	
	view.getView().add(win);
	
	win.show();
}

AppUtil.requestChoiceData = function(p) {
	
	if(!Ext.isObject(p)) return;
	
	p.mWin.mask('正在获取数据...');
	
	Ext.Ajax.request({
		url: p.url,
		async: true,
		scope: this,
		timeout: 5*60*1000,
		success: function(resp){
			var respJson = Ext.JSON.decode(resp.responseText);
			
			var data = respJson.data;
			
			var allData = [];
			var id = p.d_id;
			var name = p.d_name;
			Ext.Array.each(data, function(item, index) {
				if(item[id] > -1) {
					allData.push({
						text: item[name],
						value: item[id]
					});
				}
			});
			
			AppUtil.ChoiceData[p.d_key] = allData;
			AppUtil.choiceWindow(p.view, p.btn, p.win_title, allData);
			p.mWin.unmask();
	    },
	    failure: function() {
	    	AppUtil.ChoiceData[p.d_key] = [];
			AppUtil.choiceWindow(p.view, p.btn, p.win_title, []);
	    	win.unmask();
	    }
	});
}

AppUtil.previewHtml = function(show_url) {
						//var show_url = link_url_hf.getValue();
						if(show_url!=null && show_url!=''&& show_url!='http://') {
							//cont_linkUrl_window.show();
							//Ext.get('main').dom.src = show_url;
							var width = 500;
							var height = 300;
							var top = (document.body.clientHeight-height)/2;
							var left = (document.body.clientWidth-width)/2;
							var params = 'height='+height+',width='+width+',top='+top+',left='+left+',toolbar=yes,menubar=yes,scrollbars=yes, resizable=yes,location=yes, status=yes';
							window.open(show_url,'预览页面',params);
						} else {
							Ext.MessageBox.show({
								title:"提示",
								msg:"链接不存在，无法预览",
								width:180,
								buttons:Ext.Msg.OK
							});
						}
}

AppUtil.uploadApk = function(controler, c_id, upload_type, callback) {
	//var controler = this.up('window').controler;
	var win = controler.lookupReference('update_apk_window');
	if(win) {
		win.destroy();
	}
	win = Ext.create('app.ux.window.UpdateApkWindow', {
    	title: '上传apk文件',
    	callback:callback
    });
	controler.getView().add(win);

	win.down('textfield[name=c_id]').setValue(c_id);
	win.down('textfield[name=upload_type]').setValue(upload_type);
	
	win.show();
}