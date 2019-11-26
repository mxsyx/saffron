{% extends "info/infobase.tpl" %}
{% load tplfilter %}

{% block breadcrumb %}
<!-- 站点导航 -->
<div class="container">
  <ul class="breadcrumb">
    <li><a href="/">首页</a></li>
    <li><a href="/classify/type/15/time/0/area/0/page/0">综艺</a></li>
    <li>
      <a href="/classify/type/{{ info.flag_type|custom_type_to_num }}/time/0/area/0/page/0">{{ info.flag_type}}</a>
    </li>
    <li class="active"><a href="/info/variety/{{ info.id }}">{{ info.name }}</a></li>
  </ul>
</div>
{% endblock%}

{% block playurl %}
<!-- 播放线路容器 -->
<div class="container" id="container_playurl">
  <h3>播放线路</h3>
  <ul class="itemlist">
    {% for url in nums %}
    <li><a href="/play/variety/{{ info.id }}/{{forloop.counter}}">第{{forloop.counter}}期</a></li>
    {% endfor %}
  </ul>
</div>
{% endblock %}

{% block recommendation %}
<div class="panel-body row">
  {% for hit in hits %}
  <div class="col-md-2 col-xs-4 videocon">
    <a href="/info/variety/{{ hit.id }}" class="videoimg"
      style="background-image: url({{ hit.url_img }});"></a>
    <a href="/info/variety/{{ hit.id }}" class="action hidden-xs"><img
        src="/static/images/icon/action.svg"></a>
    <a href="/info/variety/{{ hit.id }}" class="videoname">{{ hit.name }}</a>
    <div class="labelcontent">{{ hit.score }}</div>
  </div>
  {% endfor %}
</div>
{% endblock %}

