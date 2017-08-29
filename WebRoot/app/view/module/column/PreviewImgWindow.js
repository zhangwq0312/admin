Ext.define('app.view.module.column.PreviewImgWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.previewimg-window',
	
//	reference: 'previewimg_window',
	closable: true,
	closeAction: 'hide',
	resizable: true,
	modal: true,
	draggable: true,
	autoShow: true,
	width: 700,
	//height:heightSize*0.7,
	//width: 720,
	height: 400,
	scrollable: true,
	title: '图片预览',
	glyph: 0xf007,
	layout: 'fit',
	initComponent: function() {
        var thisWindow = this;
		this.maxHeight = Ext.getBody().getHeight() - 20;
		//this.width = 1010;
		thisWindow.previewimg_img_url_id = 'previewimg_img_url_' + AppUtil.createId();
		thisWindow.previewimg_img_icon_url_id = 'previewimg_img_icon_url_' + AppUtil.createId();
		thisWindow.previewimg_img_little_url_id = 'previewimg_img_little_url_' + AppUtil.createId();

		this.items = [{
			xtype: 'form',
			bodyPadding: 10,
			items: [{
				xtype: 'radiogroup',
				fieldLabel: '推荐位图片类型',
				margin: '10, 0, 0, 0',
				enableFocusableContainer: false,
				hideLabel: true,
				flex: 1,
				items: [
				    {boxLabel: '观看历史小方图', name: 'c_img_rec_postion', inputValue:'1'},
				    {boxLabel: '海报位推荐图', name: 'c_img_rec_postion', inputValue:'2'},
	                {boxLabel: '海报位推荐图2', name: 'c_img_rec_postion', inputValue:'0'}
	            ]
			}, {
				xtype: 'container',
				layout: 'hbox',
				margin: '10, 0, 0, 0',
				defaultType: 'datefield',
				items: [{
					xtype: 'panel',
					region: 'center',
					layout:'fit',   
//			        bodyStyle : 'background-color:#E5E3DF;', 
			        bodyStyle : 'background-color:#FFFFFF;',    
			        frame:false,   
			        border:false,
			        style: 'height: 100px; width: 100px;',
			        html: '<div class="dlb_img_div_css"><img onerror="AppUtil.imgnofind(this);" id="'+thisWindow.previewimg_img_url_id+'" class="dlb_img_img_css" src="app/resources/images/loading.JPG" /></div>'
				}, {
					xtype: 'panel',
					region: 'center',
					layout:'fit',   
//			        bodyStyle : 'background-color:#E5E3DF;',   
			        bodyStyle : 'background-color:#FFFFFF;',  
			        frame:false,   
			        border:false,
					margin: '0, 10, 0, 10',
			        style: 'height: 100px; width: 100px;',
			        html: '<div class="dlb_img_div_css"><img onerror="AppUtil.imgnofind(this);" id="'+thisWindow.previewimg_img_icon_url_id+'" class="dlb_img_img_css" src="app/resources/images/loading.JPG" /></div>'
				}, {
					xtype: 'panel',
					region: 'center',
					layout:'fit',   
//			        bodyStyle : 'background-color:#E5E3DF;',   
			        bodyStyle : 'background-color:#FFFFFF;',  
			        frame:false,   
			        border:false,
			        style: 'height: 100px; width: 100px;',
			        html: '<div class="dlb_img_div_css"><img onerror="AppUtil.imgnofind(this);" id="'+thisWindow.previewimg_img_little_url_id+'" class="dlb_img_img_css" src="app/resources/images/loading.JPG" /></div>'
				}/* {
					xtype: 'image',
					src: Ext.BLANK_IMAGE_URL,
					bind: {src: '{c_img_url}'},
					style: 'height: 100px; width: 100px;',
					margin: '0, 0, 0, 5'
				}, {
					xtype: 'image',
					src: "app/resources/images/loading.JPG",
					bind: {src: '{c_img_icon_url}'},
					width: 200,
					margin: '0, 0, 0, 5'
				}, {
					xtype: 'image',
					src: "app/resources/images/loading.JPG",
					bind: {src: '{c_img_little_url}'},
					width: 200,
					margin: '0, 0, 0, 5'
				}*/]
			}]
		}];
		
		this.buttons = [{
			text: '关闭',
			scope: this,
			handler: function() {
		    	this.hide();
			}
		}];

		this.listeners = {
			hide: function(self, eOpts) {
		    	/*this.getViewModel().set('c_img_url', "app/resources/images/loading.JPG");
		    	this.getViewModel().set('c_img_icon_url', "app/resources/images/loading.JPG");
		    	this.getViewModel().set('c_img_little_url', "app/resources/images/loading.JPG");*/
				self.resetData({
					c_img_url: 'app/resources/images/loading.JPG',
					c_img_icon_url: 'app/resources/images/loading.JPG',
					c_img_little_url: 'app/resources/images/loading.JPG'
				});
			},
			close: function() {
				this.hide();
			}
		};
		
		this.callParent();
	},
	
	resetData: function(columnImg) {
		
		var img = document.getElementById(this.previewimg_img_url_id);
		img.setAttribute('src', columnImg.c_img_url);
		
		img = document.getElementById(this.previewimg_img_icon_url_id);
		img.setAttribute('src', columnImg.c_img_icon_url);
		
		img = document.getElementById(this.previewimg_img_little_url_id);
		img.setAttribute('src', columnImg.c_img_little_url);
	},
	
	items:[],
	buttonAlign: 'center'
});