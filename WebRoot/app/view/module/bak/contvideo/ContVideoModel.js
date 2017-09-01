Ext.define('app.view.module.contvideo.ContVideoModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.cont-video',

    data: {
    	
    	search_provider: '-10000',
    	search_type: '-10000',
    	search_status: '-10000',
    	search_name: '',
    	
    	cv_base_info: 1,
    	cv_img_info: 1,
    	
    	videoProgTypeStore: Ext.create('app.store.VideoProgTypeStore'),
    	videoContTypeStore: Ext.create('app.store.VideoContTypeStore'),
    	videoRegionStore: Ext.create('app.store.VideoRegionStore'),
    	videoQualityStore: Ext.create('app.store.VideoQualityStore'),
    	videoHasVolumeStore: Ext.create('app.store.VideoHasVolumeStore'),
    	videoAdTypeStore: Ext.create('app.store.VideoAdTypeStore'),
    },
    
    formulas: {
    	canModify: function(get) {
			return get('c_id') >= 0;
		},
    	canSearch: function(get) {
			return get('search_provider') > -1;
		},
		hasBaseInfo: function(get) {
			return get('cv_base_info') == 1;
		},
		hasImgInfo: function(get) {
			return get('cv_img_info') == 1;
		},
		canModifyVF: function(get) {
			return get('vf_id') >= 0;
		}
    }
	
});