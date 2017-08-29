/**
 * 树状菜单，显示在主界面的左边
 */
Ext.define('app.view.main.menu.TreeMainMenu', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.treemainmenu',
	
	title: '导航菜单',
	glyph: 0xf0c9,
	width: 150,
	
	rootVisible: false,
	lines: false,
    collapsible: true,//往左侧缩回的标识
	
	listeners: {
		itemclick: function(panel, record, item, index, e, eOpts) {
			panel.up('app-main').getController().onMainMenuClick({
				url: record.data.url,
				text: record.data.text
			});
		}
	},
	refreshRoot: function() {
		var menus = this.up('app-main').getViewModel().get('systemMenu');

		var root = this.store.getRoot();
		root.removeAll(root);
		for (var i in menus) {
				
			var menu = menus[i];
			if(typeof menu !== 'object') {
				continue;
			}
			
			var menuitem = root.appendChild({
				text: menu.text,
				expanded: menu.expanded,
			});
			//alert(JSON.stringify(menuitem));
			var index = 0;
			
			for (var j in menu.items) {
				var e = menu.items[j];
				if(typeof e !== 'object') {
					continue;
				}

				var childnode = {
					url:e.url,
					text: e.text,
					leaf: true
				};
				
				menuitem.appendChild(childnode);
				
				index++;
			}
		}
	}
});