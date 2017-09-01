Ext.define('app.view.module.credit.CreditAward', {
	extend: 'Ext.grid.Panel',
	requires: [
       'app.view.module.credit.CreditAwardController',
    ],
    
	alias: 'widget.creditAward',
	
	uses: ['app.view.module.credit.CreditAwardToolbar'],
	
	title: '管理员用户',
	controller: 'creditAward',
	
	frame: true,
    columnLines: true,
	
	initComponent: function() {
		
		var mainViewModel = this.up('app-main').getViewModel();
		this.getController().mainViewModel = mainViewModel;
		
        this.callParent();
	},
    
    dockedItems : [{
		xtype : 'credit-award-toolbar',
		dock : 'top',
	}]
});