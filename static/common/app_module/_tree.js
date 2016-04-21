/**
 * 侧边栏目录 tree
 *
 *  require: _pages.js
 */
exports.tree = function () {
    var _this = this,
        sidebarSelector = this.options.sidebarSelector,
    	$slider = $(sidebarSelector);

    // 绑定选择效果
    $slider.on('click', 'li .list-group-item', function(e) {
        var $this = $(this);
        var href = $this.attr('href');

        e.preventDefault();

        if ( _this.options.isMultiTabs ) {
            var tabName = $this.data('name') || $this.text().trim();

            _this.pages.addTab( tabName, href );
        } 

    });
}
