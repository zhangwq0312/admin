Ext.define('app.view.module.credit.CreditUpdateController', {
	extend : 'Ext.app.ViewController',

	requires : [ 'Ext.window.Toast' ],

	alias : 'controller.creditUpdate',

	onAddBtn : function(btn, e) {
		var win = this.lookupReference('creditUpdate_window');

		if (!win) {
			win = Ext.create('app.view.module.credit.CreditActionWindow', {
				viewModel : this.getView().getViewModel()
			});
			this.getView().add(win);
		}

		win.setTitle('新增积分场景');
		win.down('form').reset();

		win.show();
	},

	onRefreshBtn : function(btn, e) {
		Ext.Msg.show({
			title : '刷新缓存',
			message : '清除积分行为缓存数据，重新加载',
			buttons : Ext.Msg.YESNO,
			icon : Ext.Msg.QUESTION,
			scope : this,
			fn : function(btn) {
				if (btn === 'yes') {
					this.refreshCache();
				}
			}
		});
	},

	refreshCache : function() {
		var p = this.getView();
		p.mask('刷新中...');

		Ext.Ajax.request({
			url : 'creditAction/refresh.do',
			async : true,
			scope : this,
			success : function(resp, opt) {
				var respJson = Ext.JSON.decode(resp.responseText);
				// if (respJson.issuc) {
				// grid.getStore().remove(record);
				// }
				p.unmask();
				Ext.Msg.alert('提示', respJson.msg);
			}
		});
	},

	onModify : function(grid, row, col, item, e, record) {

		if (!this.getViewModel().isAdmin()) {
			return;
		}

		var win = this.lookupReference('creditUpdate_window');

		if (!win) {
			win = Ext.create('app.view.module.credit.CreditActionWindow', {
				viewModel : this.getView().getViewModel()
			});
			this.getView().add(win);
		}

		win.setTitle('修改：[' + record.raw.creditName + ']积分场景');
		// var arr = record.raw.role_names.split(',');
		// record.raw.role_names = arr.join('\n');
		win.down('form').loadRecord(record);
		win.show();
	},

	onModifyPsd : function(grid, row, col, item, e, record) {
		Ext.Msg.prompt('修改密码', '输入新密码：', function(btn, psd) {
			if (btn == 'ok') {
				this.modifyOperatorPsd(grid, record, psd);
			}
		}, this, false, record.raw.password);
	},

	modifyOperatorPsd : function(grid, record, psd) {
		psd = Ext.String.trim(psd);

		if (Ext.isEmpty(psd)) {
			Ext.Msg.alert('提示', '密码不能为空');

			return;
		}

		Ext.Ajax.request({
			url : 'operator/change_password.do',
			async : true,
			params : {
				o_id : record.raw.o_id,
				psd : psd
			},
			scope : this,
			timeout : 5 * 60 * 1000,
			success : function(resp, opt) {
				var respJson = Ext.JSON.decode(resp.responseText);
				if (respJson.issuc) {
					grid.getStore().reload();
				}

				Ext.Msg.alert('提示', respJson.msg);
			}
		});
	},

	onRemove : function(grid, row, col, item, e, record) {

		Ext.Msg.show({
			title : '删除',
			message : '积分场景名称：' + record.raw.creditName,
			buttons : Ext.Msg.YESNO,
			icon : Ext.Msg.QUESTION,
			scope : this,
			fn : function(btn) {
				if (btn === 'yes') {
					this.del(grid, record);
				}
			}
		});
	},

	del : function(grid, record) {
		var p = this.getView();
		p.mask('删除中...');

		Ext.Ajax.request({
			url : 'creditAction/del.do',
			async : true,
			params : {
				o_id : record.raw.o_id
			},
			scope : this,
			success : function(resp, opt) {
				var respJson = Ext.JSON.decode(resp.responseText);
				if (respJson.issuc) {
					grid.getStore().remove(record);
				}

				p.unmask();

				Ext.Msg.alert('提示', respJson.msg);
			}
		});
	},

	onChoiceRole : function(btn, e) {
		AppUtil.showChoiceWindow({
			view : this,
			btn : btn,
			mWin : this.lookupReference('creditUpdate_window'),
			win_title : '选择角色',
			url : 'role/query_all.do',
			d_key : 'roleArr',
			d_id : 'r_id',
			d_name : 'r_name'
		});
	},

	onSubmit : function() {
		var grid = this.getView();
		var win = this.lookupReference('creditUpdate_window');
		var form = win.down('form');
		var values = form.getValues();

		var url = 'creditAction/update.do';
		if (values.o_id === "-1") {
			url = 'creditAction/save.do';
		}

		if (form.isValid()) {
			win.mask('正在保存...');

			form.submit({
				clientValidation : true,
				url : url,
				params : values,
				submitEmptyText : false,
				success : function(form, action) {
					if (action.result.issuc) {
						form.reset();
						win.hide();
						// win.destroy();

						grid.getStore().reload();
					}
					win.unmask();

					Ext.Msg.alert('提示', action.result.msg);
				}
			});
		}
	},

	mainViewModel : null,

	parseCreditTypeV : function(v) {

		var str = '';
		var store = 'creditActionTypeStore';

		var vm = this.mainViewModel;

		if (vm != null && vm.get(store) != null) {
			str = vm.parseValue(v, store, 's_id', 's_name');
		}

		return str;
	},

	parseCreditStattypeV : function(v) {

		var str = '';
		var store = 'creditActionStatTypeStore';

		var vm = this.mainViewModel;

		if (vm != null && vm.get(store) != null) {
			str = vm.parseValue(v, store, 's_id', 's_name');
		}

		return str;
	}
});
