Ext.define('app.view.main.Main', {
    extend: 'Ext.container.Viewport',
    requires: [//一定会加载
        'app.view.main.MainController',
        'app.view.main.MainModel'
    ],
    uses: [//不一定会用到，运行时候根据需要才加载
		'app.view.main.region.Top',
		'app.view.main.region.Bottom',
		'app.view.main.region.Left',
		'app.view.main.region.Center',
		'app.view.main.menu.TreeMainMenu'
	],
	
    xtype: 'app-main',
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },
    items: [{
    	xtype: 'maintop',
    	region: 'north'
    }, {
        xtype: 'mainbottom',
        region: 'south' // 把他放在最底下
    }, {
    	xtype: 'treemainmenu',
        region: 'west',
        //split: true,
    },{
        region: 'center',
        xtype: 'maincenter'
    }],
	
    initComponent: function() {
    	Ext.setGlyphFontFamily('FontAwesome');
    	this.callParent();
		
		Ext.MessageBox.wait('载入中，请稍后...');
    	Ext.Ajax.request({
    		timeout:2*60*1000,
    		url: 'module/query_with_auth.do',
    		async: true,
    		scope: this,
    		success: function(resp, opt) {
    			Ext.MessageBox.hide();
    			var respText = Ext.JSON.decode(resp.responseText);
    			
    			if(respText == null || respText == undefined) {
    				return;
    			}
    			
    			var menu = [{
					text: '菜单组',
		        	expanded: true,
		        	items: []
    			}];
    			
    			var menus = respText.menus;
    			Ext.Array.each(menus, function(m, index) {
    			    menu[0].items.push({
    			    	text: m.name,
    	            	url: m.url
    			    });
    			});
    			//alert(JSON.stringify(menu));
    			this.getViewModel().set('username', respText.username);
    			this.getViewModel().set('systemMenu', menu);
    			this.down('treemainmenu').refreshRoot();
    			
    			respText = null;
    		}
    	});

		var s = this.getViewModel();
		
		if(s.get('commonStatusStore') == null) {
			s.set('commonStatusStore', Ext.create('app.store.CommonStatusStore'));
		};
		if(s.get('sexStatusStore') == null) {
			s.set('sexStatusStore', Ext.create('app.store.SexStatusStore'));
		};
		if(s.get('common_shenhe_StatusStore') == null) {
			s.set('common_shenhe_StatusStore', Ext.create('app.store.Common_shenhe_StatusStore'));
		};
		if(s.get('cutTypeTypeStore') == null) {
			s.set('cutTypeTypeStore', Ext.create('app.store.CutTypeTypeStore'));
		};
		if(s.get('cutTypeStore') == null) {
			s.set('cutTypeStore', Ext.create('app.store.CutTypeStore'));
		};
		if(s.get('companyTypeStore') == null) {
			s.set('companyTypeStore', Ext.create('app.store.CompanyTypeStore'));
		};
		if(s.get('marriageImgStatusStore') == null) {
			s.set('marriageImgStatusStore', Ext.create('app.store.MarriageImgStatusStore'));
		};
		if(s.get('identityStatusStore') == null) {
			s.set('identityStatusStore', Ext.create('app.store.IdentityStatusStore'));
		};
    },
    
    listeners: {

	}
	
	
});
