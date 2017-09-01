Ext.define('app.view.module.credit.CreditUpdateToolbar', {
	extend : 'Ext.toolbar.Toolbar',

	alias : 'widget.credit-update-toolbar',

	initComponent : function() {
		var viewModel = this.up('creditUpdate').getViewModel();

		this.items = [ {
			xtype : 'form',
			bodyPadding : 10,
			fieldDefaults : {
				labelWidth : 100,
				labelAlign : 'right'
			},
			items : [ {
				xtype : 'container',
				layout : 'hbox',
				defaultType : 'textfield',
				items : [ {
					name : 's_userid',
					fieldLabel : '用户ID',
					flex : 1
				} ]
			}, {
				xtype : 'container',
				layout : 'hbox',
				margin : '8, 0, 8, 0',
				items : [ {
					xtype : 'textfield',
					editable : false,
					name : 's_credit',
					fieldLabel : '当前积分',
					flex : 1
				}, {
					xtype : 'button',
					text : '刷新',
					glyph : 0xf021,
					width : 60,
					margin : '0, 0, 0, 20',
					handler : function() {
						var values = this.up('form').getValues();
						if (values.s_userid == null || values.s_userid == "") {
							Ext.Msg.alert('提示', '用户ID不能为空.');
							return;
						}
						
//						var p = this.getView();
//						p.mask('刷新中...');
						Ext.Ajax.request({
							url : 'creditAction/getCreditByUserID.do',
							async : true,
							scope : this,
							params : {
								s_userid : values.s_userid
							},
							success : function(resp, opt) {
								var respJson = Ext.JSON.decode(resp.responseText);
//								p.unmask();
								if(respJson.issuc){
									//Ext.Msg.alert('提示', respJson.credit);
									//this.up('form').??
								}else{
									Ext.Msg.alert('提示', respJson.msg);
								}
							}
						});
					}
				} ]
			}, {
				xtype : 'container',
				layout : 'hbox',
				margin : '8, 0, 8, 0',
				items : [ {
					xtype : 'textfield',
					name : 's_new_credit',
					fieldLabel : '更新积分',
					flex : 1
				} ]
			}, {
				xtype : 'container',
				layout : 'hbox',
				margin : '8, 0, 8, 0',
				items : [ {
					xtype : 'container',
					flex : 1,
					layout : 'hbox',
					items : [ {
						xtype : 'button',
						text : '确定',
						glyph : 0xf00c,
						width : 60,
						margin : '20, 0, 0, 105',
						handler : function() {
							// var values = this.up('form').getValues();
							// var store = this.up('softwareAsset').getStore();
							// store.getProxy().extraParams = {
							// version_number: values.s_v_num,
							// software_info: values.s_info,
							// plat: values.s_plat,
							// enforce_flag: values.s_enforce,
							// usergroup_id: values.s_tg_id,
							// file_type: values.s_file_type,
							// description: values.s_desc,
							// status: values.s_status
							// };
							//        					
							// store.load({
							// params:{
							// start: 0,
							// limit: store.getPageSize()
							// }
							// });
						}
					} /*
						 * , { xtype : 'button', text : '重置', glyph : 0xf112,
						 * width : 60, handler : function() {
						 * this.up('form').reset(); } }
						 */]
				} ]
			} ]
		} ];

		this.callParent();
	},

	dockedItems : [ {
		xtype : 'toolbar',
		dock : 'top',
		items : []
	} ]
});