/**
 * 显示在系统主页顶部的设置按钮，可以切换至标准菜单，菜单树等
 */
Ext.define('app.view.main.menu.SettingMenu', {
	extend: 'app.ux.button.TransparentButton',
	alias: 'widget.settingmenu',
	
	text: '设置',
	glyph: 0xf013,
	
	initComponent: function() {
		this.menu = [];
		this.menu.push( {
			text: '主题样式',
			menu: [{
				text: '海王星',
				value: 'neptune',
				checked: false,
				group: 'theme',
				listeners: {
					click: 'showTheme'
				}
				
			}, {
				text: '清新',
				value: 'crisp',
				checked: false,
				group: 'theme',
				listeners: {
					click: 'showTheme'
				}
			}, {
				text: '经典',
				value: 'classic',
				checked: true,
				group: 'theme',
				listeners: {
					click: 'showTheme'
				}
			}, {
				text: '灰色',
				value: 'gray',
				checked: false,
				group: 'theme',
				listeners: {
					click: 'showTheme'
				}
			}, {
				text: 'Archive',
				value: 'aria',
				checked: false,
				group: 'theme',
				listeners: {
					click: 'showTheme'
				}
			}]
		});
		
		this.callParent();
	}
});