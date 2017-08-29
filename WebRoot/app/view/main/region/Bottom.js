/**
 * 系统主页的底部区域，主要放置用户单位信息，服务单位和服务人员信息
 */
Ext.define('app.view.main.region.Bottom', {

    extend: 'Ext.toolbar.Toolbar',

    alias: 'widget.mainbottom',

    items: [{
        bind: {
            text: '登录用户:{username}'
        }
    }, '->', {
        bind: {
            text: '制作单位:{service.company}'
        }
    }, {
        bind: {
            text: '维护电话:{service.phonenumber}'
        }
    }, {
        bind: {
            text: '维护邮件:{service.email}'
        }
    }]
});