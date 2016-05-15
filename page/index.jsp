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
    <!-- __MOCK_PLACEHOLDER__ -->
    <fis:require id="static/lib/mod/mod.js"/>
    <fis:require id="static/lib/handlebars/handlebars.runtime-v4.0.5.js" />
    <link href="http://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
    <fis:styles/>
</head>
<body>
    <div class="wrapper">
        <link rel="import" href="widget/header/header.jsp?__inline">
        <div class="main-content">
            <p>内容区</p>
            <ul>
                <c:forEach var="item" items="${list}" varStatus="status">    
                <li>第${status.index}个： ${item.name }---${item.age }</li>    
                </c:forEach>
            </ul>
        </div>
    </div>
    
    <script src="http://cdn.bootcss.com/jquery/2.2.3/jquery.min.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <fis:scripts/>
</body>
</html>
</fis:root>