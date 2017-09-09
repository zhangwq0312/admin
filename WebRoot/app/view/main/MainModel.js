Ext.define('app.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: '客服系统',
		commonStatusStore: null,
		common_shenhe_StatusStore: null,
		sexStatusStore:null,
		cutTypeTypeStore:null,
		cutTypeStore:null,
        marriageImgStatusStore:null,
        identityStatusStore:null,
        msgStatusStore:null,
        system: {
        	name: '客服操作平台',
        	version: 'v1.0',
        	iconUrl: 'app/resources/icons/1.png'
        },
		service:{company:'凤凰鸣工作室',phonenumber:'18701690961',email:'874386619@qq.com'},
        systemMenu: [],
        
		appTheme: {
			value: 'classic'
		},
		
		username: ''
    },
    
    formulas: {
		isAdmin: function(get) {
			return get('username') == 'admin';
		},
	},
	
	isAdmin: function() {
		return this.get('username') == 'admin';
	},

	kvData: {
    	
    },
    
    parseValue: function(key, store, k, v) {
    	if(!this.kvData[store]) {
    		this.kvData[store] = {};
    	}
    	
    	var kv = this.kvData[store];
    	if(!kv['k' + key]) {
    		var items = this.get(store).getData().items;
    		
    		Ext.Array.each(items, function(item, index) {
	
    			kv['k' + item.raw[k]] = item.raw[v];
			});
    		
    		this.kvData[store] = kv;
    	}
    	
    	return kv['k' + key];
    }
	
});