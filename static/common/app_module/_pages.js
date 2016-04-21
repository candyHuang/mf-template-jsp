/**
 * 
 * 页面控制器
 *
 * require: _loading.js
 */
(function($, exports) {
	var TAB_PREFIX = 'TAB_',
        PANE_PREFIX = 'TABPANE_',
        NAV_TABS_SELECTOR = '.main-content-tabs>.nav-tabs',
        NAV_CONTENTS_SELECTOR = '.content>.tab-content',
        INDEX_CONTENT_SELECTOR = '.main-content>.index-content',

		isMultiTabs = exports.options.isMultiTabs,
		loading = exports.loading,

		cache_uid = 1,
		cache_module_uid = {},   // 模块-uid
        cache_module_history = {},   // 模块-访问记录
		cache_module_close_cb = {},  // 模块-关闭-回调
		cache_dom = {},

        $navTabs,
        $navContents,
        $indexContent;

	exports.pages = {
		// 执行初始化
        activate: function() {
        	$navTabs = $(NAV_TABS_SELECTOR);
    		$navContents = $(NAV_CONTENTS_SELECTOR);
    		$indexContent = $(INDEX_CONTENT_SELECTOR);

    		// 只保留当前活动页面dom
    		$navTabs.on('hide.bs.tab', 'a[data-toggle="tab"]', function(e) {
    		    var href = $(this).attr('href')
    		    var target = $(href)

    		    if (target && target.length) {
    		        target.find('script').remove();
    		        cache_dom[href] = target.detach();
    		    }
    		})
    		.on('show.bs.tab', 'a[data-toggle="tab"]', function(e) {
    		    var href = $(this).attr('href');
    		    var cacheJq = cache_dom[href];

    		    if ( cacheJq ) {
    		        $navContents.append(cacheJq);
    		    }
    		});


            if (isMultiTabs) {
                this._bindTabClose();
                // this._bindBreadcrumb();
                this.showIndex();
                // 拖动标签
                $.fn.draggable && 
                $navTabs.draggable({ 
                    axis: "x",
                    stop: function(event, ui) {
                        if (ui.position.left >= 0) {
                            ui.helper.animate({'left': 0});
                        } 
                        else {
                            var wrap_width = $navTabs.parent().width(),
                                lastTab = $navTabs.children().last(),
                                edge;

                            if (lastTab) {
                                edge = lastTab.position().left + lastTab.width() - wrap_width
                                // 未满
                                if (edge < 0) {
                                    ui.helper.animate({'left': 0});
                                }
                                else if ( Math.abs(ui.position.left) > edge ){
                                    ui.helper.animate({'left': '-' + edge + 'px'});
                                }
                            }
                        }
                    }
                });
            }

            // this._formFreshSelf()
        },
        // 显示首页
        showIndex: function() {
            $navTabs.parent().addClass('hide');
            $navContents.parent().addClass('hide');
            $indexContent.removeClass('hide');
            // $.MFT.layout.fix();
        },
        hideIndex: function() {
            $indexContent.addClass('hide');
            $navTabs.parent().removeClass('hide');
            $navContents.parent().removeClass('hide');
            // $.MFT.layout.fix();
        },
        addTab: function(name, url) {
        	// 处理空或者首页
        	var _this = this;

            if ( !name || !url || url === '#') {
                this.showIndex();
                return;
            }
            name = (name+'').trim();
            if ( cache_module_uid[name] ) {
                // 每次点击菜单树重新刷新
                _this.refreshTab(url, name)
            } 
            else {
                loading.open()
                $.ajax({
                    cache: false,
                    url: url
                })
                .done(function(text) {
                    _this._closeActiveTab();
                    _this._appendTab(name, text, url);
                    _this._showTab(name);
                    _this._pushModuleHistory(name, url)
                })
                .always(loading.close);
            }

        },
        removeTab: function(name) {
        	name = name ||  this._getActiveTabName(); // 默认关闭活动tab   

            var uid = cache_module_uid[name];

            if (uid) {
                var nav_li = $('#'+TAB_PREFIX+uid),
                    href = '#'+PANE_PREFIX + uid,
                    pane = $(href),
                    slidbing = nav_li.siblings(),
                    callback = cache_module_close_cb[name];

                if (!slidbing.length) {
                    this.showIndex();
                }

                slidbing.length && nav_li.hasClass('active') && slidbing.first().children('a').tab('show');

                // 删除之前回调
                if (typeof callback === 'function') {
                    callback(pane);
                    cache_module_close_cb[name] = null
                }
                
                cache_dom[href] = null;
                cache_module_uid[name] = null;
                cache_module_history[name] = null;

                pane.remove();
                nav_li.remove();
            }
        },
        refreshTab: function(url, name) {
        	var _this = this;
        	// 指定模块
        	if (name) {
        	    // 未载入页面
        	    if (!cache_module_uid[name]) {
        	        this.addTab(name, url);
        	        return;
        	    }
        	    else {
        	        this._showTab(name);
        	        var conf = window.confirm('当前页面未保存，即将跳转到其他页面，是否跳转？')
        	        if (conf) {
        	            this.refreshTab(url)
        	        }
        	    }
        	}
        	// 未指定模块
        	else {
        	    var $pane = _this._getActivePane(),
        	        name = _this._getActiveTab().data('name'),
        	        callback = cache_module_close_cb[name];

        	    loading.open();
        	    $.ajax({
        	        cache: false,
        	        url: url
        	    })
        	    .done(function(text) {
        	        // 删除之前回调
        	        if (typeof callback === 'function') {
        	            callback($pane);
        	            cache_module_close_cb[name] = null;
        	        }
        	        $pane.html(text);
        	        _this._pushModuleHistory(name, url);
        	        _this._defaultDeal($pane);
        	    })
        	    .always(loading.close);
        	}
        },
        back: function() {
            var moduleName = this._getActiveTabName();

            if (moduleName) {
                var stack = cache_module_history[moduleName]

                if( stack && stack.length > 1  ) {
                    stack.pop()
                    this.refreshTab( stack.pop() ) // pop 两次，最新的url又会被加入进stack
                }
                // 特殊处理 直接跳到二级页面类型 TODO
            }
        },
        _bindTabClose: function() {
        	var _this = this;
        	// 删除
        	$navTabs.on('click', 'li>a>i', function(e) {
        	    _this.removeTab( $(this).parent().parent().data('name') )
        	});
        },
        _appendTab: function(name, text, url) {
            var uid = cache_uid++;
            var temp = [
                '<li id="'+TAB_PREFIX+uid+'" data-name="' + name + '" data-url="' + url +'">',
                    '<a href="#'+PANE_PREFIX+uid+'" data-toggle="tab"> ',
                        '<span>'+name+'</span>',
                        '<i>&times;</i>',
                    ' </a>',
                '</li>'
            ]
            var pane = $('<div class="tab-pane" id="'+PANE_PREFIX+uid+'"></div>')
                .html(text)
                .appendTo($navContents);

            this._defaultDeal(pane);
            $navTabs.append( temp.join('') );
            cache_module_uid[name] = uid;
            return uid;
        },
        _defaultDeal: function(pane) {
            // pane.find('select').select2()
            // pane.find('input:checkbox, input:radio').iCheck();
        },
        _showTab: function(name) {
            var uid = cache_module_uid[name];

            this.hideIndex();
            $('#'+TAB_PREFIX+uid).find('>a').tab('show');
        },
        _getActiveTabName: function() {
        	var navTabs = ($navTabs && $navTabs.length) ? $navTabs : $(NAV_TABS_SELECTOR);

            return navTabs.children('.active').first();
        },
        _getActivePane: function() {
            var navContents = ($navContents && $navContents.length) ? $navContents : $(NAV_CONTENTS_SELECTOR);

            return navContents.children('.active').first()
        },
        _closeActiveTab: function() {
            var tabName = this._getActiveTabName();
            var uid = cache_module_uid[tabName];

            if (tabName && uid) {
                $('#'+TAB_PREFIX+uid).find('>a').trigger('hide.bs.tab');
            }
        },
        _pushModuleHistory: function(name, url) {
        	if ( !cache_module_history[name] ) {
        	    cache_module_history[name] = [];
        	}
        	cache_module_history[name].push(url);
        }

	}
})($, exports)
