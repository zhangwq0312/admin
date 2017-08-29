/**
 * 系统主页的顶部区域，主要放置系统Logo，名称，菜单，帮助，退出等待
 */
Ext.define('app.view.main.region.Top', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.maintop',
	
	uses: [
       'app.ux.button.TransparentButton',
       'app.view.main.menu.SettingMenu'
	],
	
	height: 50,
	
	items: [{
		xtype: 'image',
		bind: {
			hidden: '{!system.iconUrl}',
			src: '{system.iconUrl}'
		},
		style: 'height: 40px; width: 40px;'
	}, {
		xtype: 'label',
		bind: {
			text: '{system.name}'
		},
		style: 'font-size: 30px;'
	}, {
		xtype: 'label',
		style: 'color:grey;',
		bind: {
			text: '({system.version})'
		}
	}, '->', ' ', ' ', {
		xtype: 'transparentbutton',
		text: '首页',
		glyph: 0xf015,
		handler: 'goHomePage'
	}, {
		xtype: 'settingmenu'
	}, '->', '->', {
		xtype: 'transparentbutton',
		text : '注销',
		glyph: 0xf011,
		handler: 'onUnlogin'
	}]
});