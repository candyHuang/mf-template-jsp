<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="/fis" prefix="fis"%>
<fis:root>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>index</title>
	<%-- 使用<fis:require>替代传统<link href>、<script src>标签来加载静态资源 --%>
    <fis:require id="static/lib/mod/mod.js"/>
    <%-- 使用<fis:styles/>标签显示<fis:require>标签收集到的所有css资源 --%>
    <fis:styles/>
</head>
<body>
	<%@ include file="../widget/header/header.jsp"%>
    <c:forEach var="item" begin="1" end="10" step="1"> 
		${item }
    </c:forEach>
	<%-- 使用<fis:scripts/>标签显示<fis:require>标签收集到的所有js资源 --%>
    <fis:scripts/>
</body>
</html>
</fis:root>