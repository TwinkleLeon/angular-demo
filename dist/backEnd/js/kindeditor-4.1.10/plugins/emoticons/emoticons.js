KindEditor.plugin("emoticons",function(e){var i=this,n=i.emoticonsPath||i.pluginsPath+"emoticons/images/",o=void 0===i.allowPreviewEmoticons||i.allowPreviewEmoticons,s=1;i.clickToolbar("emoticons",function(){function a(o,s,a){k?o.mouseover(function(){s>m?(k.css("left",0),k.css("right","")):(k.css("left",""),k.css("right",0)),b.attr("src",n+a+".gif"),e(this).addClass("ke-on")}):o.mouseover(function(){e(this).addClass("ke-on")}),o.mouseout(function(){e(this).removeClass("ke-on")}),o.click(function(e){i.insertHtml('<img src="'+n+a+'.gif" border="0" alt="" />').hideMenu().focus(),e.stop()})}function t(i,o){var s=document.createElement("table");o.append(s),k&&(e(s).mouseover(function(){k.show("block")}),e(s).mouseout(function(){k.hide()}),h.push(e(s))),s.className="ke-table",s.cellPadding=0,s.cellSpacing=0,s.border=0;for(var t=(i-1)*v+d,c=0;c<p;c++)for(var r=s.insertRow(c),l=0;l<u;l++){var f=e(r.insertCell(l));f.addClass("ke-cell"),a(f,l,t);var m=e('<span class="ke-img"></span>').css("background-position","-"+24*t+"px 0px").css("background-image","url("+n+"static.gif)");f.append(m),h.push(f),t++}return s}function c(){e.each(h,function(){this.unbind()})}function r(e,i){e.click(function(e){c(),C.parentNode.removeChild(C),w.remove(),C=t(i,g),l(i),s=i,e.stop()})}function l(i){w=e('<div class="ke-page"></div>'),g.append(w);for(var n=1;n<=f;n++){if(i!==n){var o=e('<a href="javascript:;">['+n+"]</a>");r(o,n),w.append(o),h.push(o)}else w.append(e("@["+n+"]"));w.append(e("@&nbsp;"))}}var p=5,u=9,d=0,v=p*u,f=Math.ceil(135/v),m=Math.floor(u/2),g=e('<div class="ke-plugin-emoticons"></div>'),h=[];i.createMenu({name:"emoticons",beforeRemove:function(){c()}}).div.append(g);var k,b;o&&(k=e('<div class="ke-preview"></div>').css("right",0),b=e('<img class="ke-preview-img" src="'+n+d+'.gif" />'),g.append(k),k.append(b));var w,C=t(s,g);l(s)})});