/**
 * 系统主页的左边区域，可以放树形菜单或折叠菜单
 */
Ext.define('app.view.main.region.Left', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.mainleft',
	
	uses: [
       'app.view.main.menu.TreeMainMenu'
	],
	
	layout: {
		type : 'accordion',
		animate : true
	}
});