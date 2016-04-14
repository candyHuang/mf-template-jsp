// fis3 release

var devDomain = ''
var deployAddr = '/Users/candy/Documents/software/tomcat/apache-tomcat-7.0.68/webapps' + devDomain

/**
 * 前端调试 fis3 release
 */
fis
.hook('commonjs', {
  // 配置项
})
.match('{page,widget}/**.jsp', {
	release: '/views/$0'
})

.match('({widget,ui}/**.{js,css})', {
	isMod: true,
	useHash: true,
	release: '/public/$1',
	url: devDomain + '/public/$1'
})

.match('static/(**)', {
	useHash: true,
	release: '/public/$1',
	url: devDomain + '/public/$1'
})

.match('package.json', {
	release: false
})


/**
 * 后端联调时  fis3 release backend
 */
fis.media('backend')
.match('{WEB-INF/**,test/**}', {
	release: false
})
.match('*', {
  deploy: fis.plugin('local-deliver', {
    to: deployAddr
  })
})

/**
 * 提交代码前 fis3 release commit
 */
fis.media('commit')

.match('{WEB-INF/**,test/**}', {
	release: false
})
.match('*', {
  deploy: fis.plugin('local-deliver', {
    to: "../"
  })
})


// .match('**.js', {
//     optimizer: fis.plugin('uglify-js')
// })

// .match('**.css', {
//     optimizer: fis.plugin('clean-css')
// })
// 
// fis.match('*.png', {
  // optimizer: fis.plugin('png-compressor')
// });

//替换里面的 <fis:widget id="widget/header/header"/>

//fis.match('::package', {
//	postpackager: function(ret, conf, settings, opt) {
//		// ret.src 所有的源码，结构是 {'<subpath>': <File 对象>}
//	    // ret.ids 所有源码列表，结构是 {'<id>': <File 对象>}
//	    // ret.map 如果是 spriter、postpackager 这时候已经能得到打包结果了，
//	    //         可以修改静态资源列表或者其他
//		
//		
//	    fis.util.map(ret.src, function(subpath, file){
//	        //有isViews标记才需要做替换
//	        if(file.isViews){
//	            var content = file.getContent();
//	            //替换文件内容
//	            content = content.replace(/<fis:widget [^>]*id=['"]([^'"]+)[^>]*>/gi, function (match, id) {
//	        	    var release = ret.ids[id].release
//	        	     
//	        	    return '<%@ include file="' + release + '"%>'
//	        	});
//	            file.setContent(content);
//	        }
//	    });
//	}
//});
