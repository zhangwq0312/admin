Ext.define('app.view.module.post.PostToolbar', {
	extend: 'Ext.toolbar.Toolbar',
    
	alias: 'widget.post-toolbar',
	
	defaultType: 'textfield',
		items: [{  	
					name: 'tel',
					fieldLabel: '发帖手机',
					labelAlign: 'right',
					flex: 1,
					listeners: {
						change: 'onSearchChangeTel'
					}
				},{  	
					name: 'post_tel',
					fieldLabel: '联系手机',
					labelAlign: 'right',
					flex: 1,
					listeners: {
						change: 'onSearchChangePostTel'
					}
				}, {
					name: 'title',
					fieldLabel: '标题',
					labelAlign: 'right',
					flex: 1,
					listeners: {
						change: 'onSearchChangeTitle'
					}
				}, {
					xtype:'combobox',
					name: 'type',
					fieldLabel: '类型',
					labelAlign: 'right',
					editable: false,
					displayField: 'type_name',
					valueField:'type_id',
					flex: 1,
                    value:'',
					store: {
						xtype: 'Ext.data.Store',
						fields:['type_name','type_id'],
						data: [
							{type_name:'请选择',type_id:''},
							{type_name:'住房',type_id : 'zl_house'},
							{type_name:'工作',type_id : 'zl_employ'},
							{type_name:'便民',type_id : 'zl_tel'}
						]
					},
					listeners: {
						select: 'onSearchChangeType'
					}
					
				}, {
					xtype:'combobox',
					name: 'status',
					fieldLabel: '状态',
					labelAlign: 'right',
					editable: false,
					displayField: 'status_name',
					valueField:'status_id',
					flex: 1,
                    value:'',
					store: {
						xtype: 'Ext.data.Store',
						fields:['status_name','status_id'],
						data: [
							{status_name:'请选择',status_id:''},
							{status_name:'正常',status_id : '0'},
							{status_name:'禁用',status_id : '-1'},
							{status_name:'待审核',status_id : '-2'}
						]
					},
					listeners: {
						select: 'onSearchChangeStatus'
					}
					
				}, {
					xtype:'combobox',
					name: 'orderBy',
					fieldLabel: '排序',
					labelAlign: 'right',
					editable: false,
					displayField: 'orderBy_name',
					valueField:'orderField',
					flex: 1,
                    value:'0',
					store: {
						xtype: 'Ext.data.Store',
						fields:['orderBy_name','orderField'],
						data: [
							{orderBy_name:'默认（创建时间）',orderField:'0'},
							{orderBy_name:'发布时间',orderField : '1'}
						]
					},
					listeners: {
						select: 'onSearchChangeOrderBy'
					}
					
				},{
					xtype: 'button',
					text: '搜索',
					glyph: 0xf002,
					width: 60,
					margin: '0, 20, 0, 80',
					handler: 'search'
				}, {
					xtype: 'button',
					text: '重置',
					glyph: 0xf112,
					width: 60,
					handler: 'onSearchReset'
	
				}]


});