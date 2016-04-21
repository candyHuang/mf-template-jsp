/**
 *  遮罩
 */
exports.loading = (function($) {
    var _this = {},
        $el;

    _this._init = function() {
        if (!$el) {
            var _html = [
                '<div class="loading-layer">',
                '<span class="loading-text">加载中...</span>',
                '</div>'
            ]
            $el = $(_html.join('')).hide().prependTo($('body'))
        }
    }

    _this.open = function() {
        this._init()
        $el.fadeIn()
    }

    _this.close = function() {
        $el.fadeOut()
    }

    return _this
})($)
