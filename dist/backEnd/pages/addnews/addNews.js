angular.module("add",[]).controller("addCtrl",["$scope","$http","$window",function(t,o,a){t.formData={},t.formData.uname=a.name.split("&")[0],t.editShow=function(t){$.getScript("./js/kindeditor-4.1.10/kindeditor-min.js",function(){KindEditor.basePath="./js/kindeditor-4.1.10/";var o={filterMode:!1,designMode:!0};a.editor=KindEditor.create("#editor_id",o),a.editor.html(t),a.editor.sync()})},t.editShow("请输入内容"),t.add=function(){t.html=a.editor.html();var e=t.html;t.formData.content=e,t.formData.imgArr=e.match(/<img\b[^>]*>/g)+"",o({url:"http://127.0.0.1:9090/api/addnews",method:"post",data:$.param(t.formData),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(t){"true"==t.data&&(alert("添加成功"),a.location.reload())}).catch(function(t){console.log(t)})},t.reset=function(){console.log(t.formData);for(var o in t.formData)"uname"!=o&&(t.formData[o]="")}}]);