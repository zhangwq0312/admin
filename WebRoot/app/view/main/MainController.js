Ext.define('app.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox',
        'Ext.window.Toast'
    ],
    
	uses: [	
		'app.view.module.operator.Operator',
		'app.view.module.role.Role',
		'app.view.module.user.User',
		'app.view.module.cuttype.CutType',
		'app.view.module.post.Post'
	],

    alias: 'controller.main',

    goHomePage: function() {
    	var maincenter = this.getView().down('maincenter');
    	var homePage = this.getView().down('homepage');
    	maincenter.setActiveTab(homePage);
    },
    
	/* 响应主菜单单击事件 */
	onMainMenuClick: function(menuItem) {
		var maincenter = this.getView().down('maincenter');
		var tab = maincenter.down(menuItem.url);
		
		if(tab) {
			maincenter.setActiveTab(tab);
		} else {
			maincenter.setActiveTab(maincenter.add({
				xtype : menuItem.url,
				title: menuItem.text,
				closable : true,
				reorderable : true
			}));
		}
	},

	showTheme: function(menu) {
		var viewModel = this.getView().getViewModel();
		var theme = menu.value;
		if(theme !== viewModel.get('appTheme.value')) {
			console.log(theme);
			
			var href = 'ext/packages/ext-theme-'+theme+'/build/resources/ext-theme-'+theme+'-all.css';
			var link = Ext.fly('theme');
			
			if(!link) {
				link = Ext.getHead().appendChild({
					tag:'link',
					id:'theme',
					rel:'stylesheet',
					href:''
				});
			};
			
			link.set({href:Ext.String.format(href, theme)});
			
			viewModel.set('appTheme.value', theme);
		}
		
		viewModel = null;
		theme = null;
	},
	
	onUnlogin: function() {
		Ext.Ajax.request({
    		url: 'operator/unlogin.do',
    		async: true,
    		scope: this,
    		success: 'onUnloginSuccess',
			failure: 'onUnloginFailure'
    	});
	},
	
	onUnloginSuccess: function(resp, opt) {
    	var respJson = Ext.JSON.decode(resp.responseText);
    	
    	if(respJson.issuc === true) {
    		this.getView().destroy();
			location.href = respJson.url;
		} else {
			Ext.Msg.alert('提示', respJson.msg);
		}
    },
    
    onUnloginFailure: function() {
    	Ext.getBody().unmask();
    }
});
