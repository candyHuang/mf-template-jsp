<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>

<div class="header">这是头部组件</div>

<fis:require id="widget/header/header.css"/>
<fis:require id="widget/header/header.js"/>
<fis:script>
    var header = require('widget/header/header');
    header.show('header loaded');
</fis:script>
