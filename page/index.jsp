<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="/fis" prefix="fis"%>
<fis:root>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
	<title>index</title>
	<%-- 使用<fis:require>替代传统<link href>、<script src>标签来加载静态资源 --%>
    <fis:require id="static/lib/mod/mod.js"/>
    <fis:require id="static/lib/jquery/1.11.3/jquery.min.js" />
    <fis:require id="static/lib/bootstrap/3.3.5/bootstrap.js" />
    <fis:require id="static/lib/bootstrap/3.3.5/bootstrap.scss" />
    <fis:require id="static/common/1.0.0/app.scss" />
    <fis:require id="static/common/1.0.0/app.js" />


    <fis:script>
    $(function () {
        $.MFT.activate()
    });
    </fis:script>
    <%-- 使用<fis:styles/>标签显示<fis:require>标签收集到的所有css资源 --%>
    <fis:styles/>
</head>
<body>
    <div class="wrapper">
        <%@ include file="../widget/header/header.jsp"%>
        <%@ include file="../widget/aside/aside.jsp"%>

        <div class="main-content">
            <!-- 顶部标签页 -->
            <section class="main-content-tabs hide">
                <ul class="nav nav-tabs nav-blue draggable"></ul>
            </section>
            <!-- 内容区 -->
            <section class="content hide">
                <div class="tab-content"></div>
            </section>
            <!-- 首页内容 -->
            <section class="index-content"></section>
        </div>
    </div>
    <%-- <ul>
		<c:forEach var="item" items="${list}" varStatus="status">    
        <li>第${status.index}个： ${item.name }---${item.age }</li>    
    	</c:forEach>
    </ul> --%>
	<%-- 使用<fis:scripts/>标签显示<fis:require>标签收集到的所有js资源 --%>
    <fis:scripts/>
</body>
</html>
</fis:root>