<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<aside class="main-sidebar">
    <h1 class="logo">
        <a href="#"></a>
    </h1>
    <nav class="sidebar">
        <ul class="nav nav-stacked">
            <li role="presentation">发车操作
                <div class="list-group">
                    <a href="/public/page/template/standby-list/index.html" class="list-group-item">
                        <span class="glyphicon glyphicon-list"></span> 待发车列表
                    </a>
                </div>
            </li>
            <li role="presentation">订单
                <div class="list-group">
                    <a href="/public/page/template/order-management/index.html" class="list-group-item">
                    <span class="glyphicon glyphicon-list-alt"></span> 订单管理</a>
                </div>
            </li>
        </ul>
    </nav>
</aside>
<fis:require id="widget/aside/aside.scss"/>

