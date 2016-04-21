/**
 * 
 * 布局调整
 * 
 */
exports.layout = {
    _resizeTimer: null,
    activate: function() {
        var _this = this;

        _this.fixSidebar();
        $(window).resize(function() {
            clearTimeout(_this._resizeTimer);
            _this._resizeTimer = null;
            _this._resizeTimer = setTimeout(function() {
                _this.fixSidebar();
            }, 300)
        });
    },
    fixSidebar: function() {
        if (typeof $.fn.slimScroll != 'undefined') {
            var $mainSidebar = $('.main-sidebar'),
                wrapHeight = $mainSidebar.height(),
                logo = $mainSidebar.find('.logo'),
                slider = $mainSidebar.find(".sidebar"),
                logoHeight = logo.height() + parseFloat( logo.css('margin-bottom') ) + parseFloat( logo.css('margin-top') );

            slider
            .slimScroll({
                destroy: true
            })
            .slimScroll({
                height: wrapHeight - logoHeight,
                size: "0"
            });
        }
    }
}
