Ext.define('app.view.module.user.UserController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.Toast'
    ],

    alias: 'controller.user',
	
  	//主题搜索重置
  	onSearchThemeReset: function () {
		var panel = this.getView();
		panel.query("textfield[name=tel]")[0].setValue("");
		panel.query("textfield[name=username]")[0].setValue("");
		panel.query("combo[name=sex]")[0].setValue("");
		
    	var viewModel = this.getView().getViewModel();
    	viewModel.set('tel', '');
    	viewModel.set('username', '');
    	viewModel.set('sex', '0');
	}

});
