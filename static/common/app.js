/**
 * 全局公用 脚本
 * @param  {[type]} $ [description]
 */
;(function ($) {
	'use strict';
    if (typeof jQuery === "undefined") {
    	throw new Error("MFT requires jQuery");
    }

    var exports = {};
    exports.options = {
    	isMultiTabs: true,             // 多标签
        sidebarSelector: '.sidebar',   // 左侧菜单选择器
        base: ''                       // basepath
    }
    /**
     * 初始化激活方法
     * @param  {[objext]} options [配置项目]
     */
    exports.activate = function(options) {
        $.extend(true, this.options, options);
        // basepath
        this.BASE = this.options.base;
        // 菜单树
        this.tree();
        // 触发页面控制器
        this.pages.activate();
        // 布局
        this.layout.activate()
        // // box 控制
        // $.MFT.boxWidget.activate()
        // // 全局事件处理
        // $.MFT.globalHandler();
    }
    __inline('./app_module/_loading.js');
    __inline('./app_module/_tree.js');
    __inline('./app_module/_pages.js');
    __inline('./app_module/_layout.js');

    // 输出
    $.MFT = exports;

})(jQuery);
