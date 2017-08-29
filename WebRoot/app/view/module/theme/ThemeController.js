Ext.define('app.view.module.theme.ThemeController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.Toast'
    ],

    alias: 'controller.cont-theme',
    
    onSiteSelect: function(combo, record) {
    	var viewModel = this.getView().getViewModel();
    	viewModel.set('search_site', record.raw.s_id);
    },
    //上传主题apk
    onAddThemeApkBtn : function(btn, e){
    	var view = this.getView();
    	var record = view.getSelectionModel().lastSelected;
		var rows = view.getSelectionModel().getSelection();// 返回值为Record数组

		if(rows.length != 1) {
			Ext.toast({
 				html: '请选择一项',
 				title: '提示',
 				saveDelay: 10,
 				align: 'tr',
 				closable: true,
 				width: 200,
 				useXAxis: true,
 				slideInDuration: 500
 			});
		} else {
			var win = this.lookupReference('theme_downloadurl_window');

			if (!win) {
            	win = Ext.create('app.view.module.theme.ThemeDownloadUrlListWindow', {
	            	onController: this.getView().getController(),
	            	appGridStore: this.getView().getStore(),
	            	ca_id: record.raw.c_id
	            });
	            this.getView().add(win);
	        }
	    	win.ca_id = record.raw.c_id;
            console.log("-----:win.ca_id=" + win.ca_id);
            
	    	var store = win.down('gridpanel').getStore();
	    	store.proxy.extraParams.c_id = record.raw.c_id;
			store.proxy.extraParams.c_name = record.raw.name;
			
	    	win.show();
	    	store.removeAll();
			store.load();
		}
    },
    //添加主题按钮
    onAddThemeBtn: function(btn, e) {
    	var viewModel = this.getView().getViewModel();
    	var win = this.lookupReference('theme_window');
    	if (win){//不重用，解决上次新建时的残留图片预览
    		win = null;
    	}
    	if (!win) {
            win = Ext.create('app.view.module.theme.ThemeWindow', {
            	viewModel: viewModel
            });
            this.getView().add(win);
        }
    	
    	win.setTitle('新建');
    	var form = win.down('form');
    	form.reset();
    	win.show();
    },
    //添加主题图片
    onAddThemeImgBtn : function(){
    	var me = this;
    	var gird = me.getView();
    	var viewModel = gird.getViewModel();
    	var selectModel = gird.getSelectionModel().getSelection(); 
    	if (selectModel.length <=0) {
    		Ext.MessageBox.show({
				title : "提示",
				msg : "请选择要添加的记录",
				width : 150,
				buttons : Ext.Msg.OK
			});
    		return;
		}
    	if (selectModel.length == 1) {
    		var win = Ext.create('app.view.module.theme.ThemeImgWindow',{
    			viewModel: viewModel
    		}).hide();
    		gird.add(win);
    		
    		var winForm = win.down('form');
    		winForm.reset();
    		winForm.loadRecord(selectModel[0]);
    		winForm.down('themepreviewpanel').down('form').loadRecord(selectModel[0]);
    		winForm.down('themelittleimagpanel').down('form').loadRecord(selectModel[0]);
    		win.show();
		}
    },
    //主题删除
    onThemeDelete: function(tree, row, col, item, e, record) {
    	Ext.Msg.show({
		    title:'删除',
		    message: '视频名称：' + record.raw.name,
		    buttons: Ext.Msg.YESNO,
		    icon: Ext.Msg.QUESTION,
		    scope: this,
		    fn: function(btn) {
		        if (btn === 'yes') {
		        	this.delTheme(tree, record);
		        }
		    }
		});
    },
    
    
    delTheme: function(grid, record) {
    	var p = this.getView();
    	p.mask('删除中...');
    	Ext.Ajax.request({
    		url: 'theme/del.do',
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
    			Ext.toast({
     				html: respJson.msg,
     				title: '提示',
     				saveDelay: 10,
     				align: 'tr',
     				closable: true,
     				width: 200,
     				useXAxis: true,
     				slideInDuration: 500
     			});
    		}
    	});
    },
    //主题图片预览
    onThemePreviewClick: function(tree, row, col, item, e, record) {
    	var me = this;
    	me.getView().mask('载入图片...');

    	Ext.Ajax.request({
    		url: 'img/query_by_cid.do?type=',
    		async: true,
    		params: {
    			c_id: record.raw.c_id
    		},
    		scope: this,
    		success: function(resp, opt) {
    			me.getView().unmask();
    			var respJson = Ext.JSON.decode(resp.responseText);
    			if(respJson.issuc) {
    				imgObj = {
	    				c_img_url: respJson.imgData.c_img_url,
	    				c_img_little_url: respJson.imgData.c_img_little_url,
	    				c_img_icon_url: respJson.imgData.c_img_icon_url
    				};

    				record.raw.c_img_rec_postion = respJson.imgData.c_img_rec_postion;
    				me.showPreviewWin(record, imgObj);
    			} else {
    				Ext.toast({
         				html: respJson.msg,
         				title: '预览失败',
         				saveDelay: 10,
         				align: 'tr',
         				closable: true,
         				width: 200,
         				useXAxis: true,
         				slideInDuration: 500
         			});
    			}
    		},
    		failure : function(form, action) {
    			me.getView().unmask();
    				Ext.toast({
    					title: '提示',
         				html: '预览失败',
         				saveDelay: 10,
         				align: 'tr',
         				closable: true,
         				width: 200,
         				useXAxis: true,
         				slideInDuration: 500
         			});
			}
    	});
    },
    
    showPreviewWin: function(record, columnImg) {
    	var win = this.lookupReference('previewimg_window');
    	var viewModel = this.getView().getViewModel();
    	if (!win) {
    		win = Ext.create('app.view.module.column.PreviewImgWindow', {
            	viewModel: viewModel,
            	reference: 'previewimg_window'
            });
            this.getView().add(win);
        }
    	
    	win.setTitle('“' + record.raw.c_name + '” 资产图片');
    	var winForm = win.down('form');
    	winForm.reset();
    	
    	/*columnImg.c_img_url = 'http://pic13.nipic.com/20110415/1347158_132411659346_2.jpg';
    	columnImg.c_img_icon_url = 'http://pic4.nipic.com/20091113/2036281_160832616864_2.jpg';
    	columnImg.c_img_little_url = 'http://pic28.nipic.com/20130402/9252150_190139450381_2.jpg';*/
    	
//    	var empty = viewModel.get('empty');
    	var empty = 'app/resources/images/transparent_img.png';
    	/*if(!Ext.isEmpty(columnImg.c_img_url))
    		viewModel.set('c_img_url', columnImg.c_img_url);
    	else
    		viewModel.set('c_img_url', empty);
    	if(!Ext.isEmpty(columnImg.c_img_icon_url))
    		viewModel.set('c_img_icon_url', columnImg.c_img_icon_url);
    	else
    		viewModel.set('c_img_icon_url', empty);
    	if(!Ext.isEmpty(columnImg.c_img_little_url))
    		viewModel.set('c_img_little_url', columnImg.c_img_little_url);
    	else
    		viewModel.set('c_img_little_url', empty);*/
    	if(Ext.isEmpty(columnImg.c_img_url))
    		columnImg.c_img_url = empty;
    	
    	if(Ext.isEmpty(columnImg.c_img_icon_url))
    		columnImg.c_img_icon_url = empty;
    	
    	if(Ext.isEmpty(columnImg.c_img_little_url))
    		columnImg.c_img_little_url = empty;

    	win.resetData(columnImg);
    	//winForm.loadRecord(record);
    	win.show();
    },
    videoFileDistinctStore: false,
    
    showVideoInfo: function(btn, e) {
    	var view = this.getView();
    	var record = view.getSelectionModel().lastSelected;
		var rows = view.getSelectionModel().getSelection();// 返回值为Record数组

		if(rows.length != 1) {
			Ext.toast({
 				html: '请选择一项',
 				title: '提示',
 				saveDelay: 10,
 				align: 'tr',
 				closable: true,
 				width: 200,
 				useXAxis: true,
 				slideInDuration: 500
 			});
		} else {
			var win = this.lookupReference('cs_videofilelist_window');
			
			if(!this.videoFileDistinctStore) {
				this.videoFileDistinctStore = Ext.create('app.store.VideoFileDistinctStore');
			}

	    	if (!win) {
	            win = Ext.create('app.view.module.contsales.ContVideoFileListWindow', {
	            	onController: this.getView().getController(),
	            	videoFileDistinctStore: this.videoFileDistinctStore,
	            	cs_id: record.raw.c_id,
	            	provider_id: record.raw.provider_id
	            });
	            this.getView().add(win);
	        }
	    	
	    	var store = win.down('gridpanel').getStore();
	    	store.proxy.extraParams.c_id = record.raw.c_id;
			store.proxy.extraParams.c_name = record.raw.c_name;
			
	    	win.show();
	    	store.removeAll();
			store.load();
		}
		
    },
    
    onAddCVI: function(vfdStore, csviStore, cs_id, provider_id) {
    	var win = this.lookupReference('contvideofile_addmod_window');
    	
    	if (!win) {
	    	var win = Ext.create('app.view.module.contsales.ContVideoFileAddModWindow', {
				videoFileDistinctStore: vfdStore,
				csviStore: csviStore
			});
	        this.getView().add(win);
    	}
		
		var form = win.down('form');
    	form.reset();
    	
    	var cidComp = form.query('textfield[name=c_id]');
    	if(cidComp && cidComp.length > 0) {
    		cidComp = cidComp[0];
    		cidComp.setValue(cs_id);
    	}
    	
    	var pComp = form.query('textfield[name=provider_id]');
    	if(pComp && pComp.length > 0) {
    		pComp = pComp[0];
    		pComp.setValue(provider_id);
    	}
    	
    	win.show();
    },
    //主题编辑
    onThemeModify : function(view, rowIndex, colIndex, item, e, record){
    	var me = this;
    	var win = me.lookupReference('theme_window');
    	if (!win) {
    		var win = Ext.create('app.view.module.theme.ThemeWindow');
    		me.getView().add(win);
		}
    	win.setTitle('修改： ' + record.raw.name);
    	var form = win.down('form');
    	form.reset();
    	form.loadRecord(record);
    	win.show();
    },
    
    onThemeModifyCVI: function(vfdStore, csviStore, record) {
    	var win = this.lookupReference('contvideofile_addmod_window');
    	
    	if (!win) {
	    	var win = Ext.create('app.view.module.contsales.ContVideoFileAddModWindow', {
				videoFileDistinctStore: vfdStore,
				csviStore: csviStore
			});
	        this.getView().add(win);
    	}
		
		var form = win.down('form');
    	form.reset();
    	
    	console.log(record);
    	
    	form.loadRecord(record);
    	
    	win.show();
    },
    
    onThemeSubmit: function() {
    	var grid = this.getView();
    	var win = this.lookupReference('theme_window');
    	var form = win.down('form');
    	var values = form.getValues();
    	var url = 'theme/update.do';
    	if(values.c_id === "-1") {
    		url = 'theme/save.do';
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
	    			
	    			Ext.toast({
	     				html: action.result.msg,
	     				title: '提示',
	     				saveDelay: 10,
	     				align: 'tr',
	     				closable: true,
	     				width: 200,
	     				useXAxis: true,
	     				slideInDuration: 500
	     			});
	    		}
	    	});
    	}
    },
    
    onThemeCancel: function() {
    	var win = this.lookupReference('theme_window');
    	win.down('form').reset();
    	win.hide();
//        win.destroy();
    	win = null;
    },
    
    showChoiceWindow: function(title, btn, allData) {
    	var win = this.lookupReference('checkboxgroup_window');
    	var ids = this.lookupReference(btn.rValueName);
    	var checkedData = [];
    	
    	var ids_v = ids.getValue();
    	if(ids_v != null && ids_v != undefined && ids_v.length > 0) {
    		checkedData = ids_v.split(',');
    	}
    	
    	
    	var names = this.lookupReference(btn.rTextName);
    	
    	if (win) {
    		win.destroy();
        }
    	
    	win = Ext.create('app.ux.window.CheckboxGroupWindow', {
        	width: 600,
        	title: title,
        	allData: allData,
        	checkedData: checkedData,
        	onSubmit: function(w, vArr, tArr) {
        		ids.setValue(vArr.join(','));
            	names.setValue(tArr.join('， '));
        		w.destroy();
        	},
        	onCancel: function(w) {
        		w.destroy();
        	}
        });
    	
        this.getView().add(win);
    	
    	win.show();
    },
    
    requestChoiceD: function(win, url, reader, cb) {
    	
    	win.mask('读取中...');
    	Ext.Ajax.request({
    		url: url,
    		async: true,
    		scope: this,
    		success: function(resp){
    			var respJson = Ext.JSON.decode(resp.responseText);
    			
    			var data = [];
    			var root = reader.root;
    			if(root != null && root != undefined && root.length > 0) {
    				data = respJson[root];
    			} else {
    				data = respJson;
    			}
    			
    			var allData = [];
    			var id = reader.id;
    			var name = reader.name;
    			Ext.Array.each(data, function(item, index) {
    				if(item[id] > -1) {
    					allData.push({
    						text: item[name],
    						value: item[id]
    					});
    				}
				});
    			
    			cb(allData, this);
    			win.unmask();
    	    }
    	});
    },
    // 搜索主题按钮
    onSearchTheme: function() {
    	var store = this.getView().getStore();
    	var viewModel = this.getView().getViewModel();
    	
//    	store.proxy.extraParams.c_site = viewModel.get('search_site');
    	store.proxy.extraParams.provider_id = viewModel.get('search_provider');
    	store.proxy.extraParams.name = viewModel.get('search_name');
    	store.proxy.extraParams.c_status = viewModel.get('search_status');
    	store.proxy.extraParams.price = viewModel.get('search_price');
    	store.proxy.extraParams.c_version = viewModel.get('search_version');
    	store.load();
    	viewModel.set('c_id', -1);
    },
    
    onThemeProviderSelect: function(combo, record) {
    	var viewModel = this.getView().getViewModel();
    	viewModel.set('search_provider', record.raw.cp_id);
    },
    
    onTypeSelect: function(combo, record) {
    	var viewModel = this.getView().getViewModel();
    	viewModel.set('search_type', record.raw.s_id);
    },
    
    onStatusSelect: function(combo, record) {
    	var viewModel = this.getView().getViewModel();
    	viewModel.set('search_status', record.raw.s_id);
    },
    //搜索主题名称改变是触发
    onThemeNameChange: function(tf, newValue, oldValue, eOpts) {
    	var viewModel = this.getView().getViewModel();
    	viewModel.set('search_name', newValue);
    },
    
    //搜索主题价格改变时触发
    onThemePriceChange : function(tf, newValue, oldValue, eOpts){
    	var viewModel = this.getView().getViewModel();
    	viewModel.set('search_price', newValue);
    },
    
    //搜索主题版本改变时触发
    onThemeVersionChange : function(tf, newValue, oldValue, eOpts){
    	var viewModel = this.getView().getViewModel();
    	viewModel.set('search_version', newValue);
    },
    
    parseValue: function(key, store, k, v) {
    	
    	if(!this.kvData[store]) {
    		this.kvData[store] = {};
    	}
    	
    	var kv = this.kvData[store];
    	
    	if(!kv['k' + key]) {
    		var items = this.getView().getViewModel().get(store).getData().items;
    		
    		Ext.Array.each(items, function(item, index) {
    			kv['k' + item.raw[k]] = item.raw[v];
			});
    		
    		this.kvData[store] = kv;
    	}
    	
    	return kv['k' + key];
    },
    
    mainViewModel: null,
    
    parseStatusV: function(v) {
    	var str = '';
    	var store = 'contStatusStore';
    	
    	var vm = this.mainViewModel;
    	
    	if(vm != null && vm.get(store) != null) {
    		str = vm.parseValue(v, store, 's_id', 's_name');
    	}
    	
    	return str;
    },
    
    parseTypeV: function(v) {
    	var str = '';
    	var store = 'contTypeStore';
    	
    	var vm = this.mainViewModel;
    	
    	if(vm != null && vm.get(store) != null) {
    		str = vm.parseValue(v, store, 's_id', 's_name');
    	}
    	
    	return str;
    },
    
    parseProviderV: function(v) {
    	var str = '';
    	var store = 'contProviderByAuthStore';
    	
    	var vm = this.mainViewModel;
    	
    	if(vm != null && vm.get(store) != null) {
    		str = vm.parseValue(v, store, 'cp_id', 'cp_name');
    	}
    	
    	return str;
    },
    
    parseProgTypeV: function(v) {
    	return this.parseValue(v, 'videoProgTypeStore', 'progTypeId', 'progTypeName');
    },
    
    parseContTypeV: function(v) {
    	return this.parseValue(v, 'videoContTypeStore', 'conttypeId', 'conttypeName');
    },
    
    parseRegionV: function(v) {
    	return this.parseValue(v, 'videoRegionStore', 'regionId', 'regionName');
    },
    
    parseQualityV: function(v) {
    	return this.parseValue(v, 'videoQualityStore', 'qualityTypeId', 'qualityTypeName');
    },
    
    parseHasVolumeV: function(v) {
    	return this.parseValue(v, 'videoHasVolumeStore', 'hasVolumeId', 'hasVolumeName');
    },
    
    parseAdTypeV: function(v) {
    	return this.parseValue(v, 'videoAdTypeStore', 'contAdTypeId', 'contAdTypeName');
    },
    
    onChoiceMac: function(btn, e) {
    	
    	AppUtil.showChoiceWindow({
			view: this,
			btn: btn,
			mWin: this.lookupReference('cont_video_window'),
			viewModel: this.mainViewModel,
			storeRef: 'testGroupByMacStore',
			store: 'app.store.TestGroupByMacStore',
			win_title: '选择网卡地址测试组',
			url: 'usergroup/query_all.do?type=mac',
			d_key: 'ugByMacArr',
			d_id: 'ug_id',
			d_name: 'ug_name'
		});
    	
    },
    
    onChoiceZone: function(btn, e) {
    	
    	AppUtil.showChoiceWindow({
			view: this,
			btn: btn,
			mWin: this.lookupReference('cont_video_window'),
			viewModel: this.mainViewModel,
			storeRef: 'testGroupByZoneStore',
			store: 'app.store.TestGroupByZoneStore',
			win_title: '选择地区测试组',
			url: 'usergroup/query_all.do?type=zone',
			d_key: 'ugByZoneArr',
			d_id: 'ug_id',
			d_name: 'ug_name'
		});
    },
    
    onChoiceModel: function(btn, e) {
    	
    	AppUtil.showChoiceWindow({
			view: this,
			btn: btn,
			mWin: this.lookupReference('cont_video_window'),
			viewModel: this.mainViewModel,
			storeRef: 'testGroupByModelStore',
			store: 'app.store.TestGroupByModelStore',
			win_title: '选择型号测试组',
			url: 'usergroup/query_all.do?type=model',
			d_key: 'ugByModelArr',
			d_id: 'ug_id',
			d_name: 'ug_name'
		});
    },
    
    onChoiceChannel: function(btn, e) {
    	
    	AppUtil.showChoiceWindow({
			view: this,
			btn: btn,
			mWin: this.lookupReference('cont_video_window'),
			viewModel: this.mainViewModel,
			storeRef: 'testGroupByChannelStore',
			store: 'app.store.TestGroupByChannelStore',
			win_title: '选择渠道测试组',
			url: 'usergroup/query_all.do?type=channel',
			d_key: 'ugByChannelArr',
			d_id: 'ug_id',
			d_name: 'ug_name'
		});
    },
	/*
	内容类型：1文章,2音乐,3视频,4静态链接,5图片,6推荐小吃,7应用商店,8购物,9剧集综艺,10电影,
	11电视剧,12视频新闻,13广告,15直播,16 html,17 栏目
	*/
  	contChangCmpVisible: function (cont_video_type){
		if(cont_video_type==4 || cont_video_type==13 || cont_video_type==16){
//			contZipPanel_form.show();
//			button_url_link.show();
//			videofile_grid.hide();//视频播放地址列表
//            //修改fieldLabel   
//			if (cont_video_type==16)
//			   cont_video_play_url_form.setFieldLabel('关于预览地址:');
//			else
//			   cont_video_play_url_form.setFieldLabel('静态链接地址:');
//			changestatus(true);
		}else{
//			contZipPanel_form.hide();
//			button_url_link.hide();
//			videofile_grid.show();//视频播放地址列表
//	 		//修改fieldLabel   
//			cont_video_play_url_form.setFieldLabel('视频播放地址:');
//			changestatus(false);
		}
  	},
  	//主题搜索重置
  	onSearchThemeReset: function () {
		var panel = this.getView();
		panel.query("combobox[name=provider_id]")[0].setValue("");
		panel.query("combobox[name=c_status]")[0].setValue("");
		panel.query("textfield[name=name]")[0].setValue("");
		panel.query("textfield[name=price]")[0].setValue("");
		panel.query("textfield[name=version_code]")[0].setValue("");
//		panel.query("textfield[name=c_site]")[0].setValue("");
    	var viewModel = this.getView().getViewModel();
    	
    	viewModel.set('provider_id', -10000);
    	viewModel.set('search_provider', -10000);
    	viewModel.set('search_status', -10000);
    	viewModel.set('search_price', "");
    	viewModel.set('search_name', "");
    	viewModel.set('search_version', "");
//    	viewModel.set('search_site', -10000);
	}
});
