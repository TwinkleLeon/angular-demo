KindEditor.plugin("anchor",function(e){var n=this,a="anchor",i=n.lang(a+".");n.plugin.anchor={edit:function(){var t=['<div style="padding:20px;">','<div class="ke-dialog-row">','<label for="keName">'+i.name+"</label>",'<input class="ke-input-text" type="text" id="keName" name="name" value="" style="width:100px;" />',"</div>","</div>"].join(""),l=n.createDialog({name:a,width:300,title:n.lang(a),body:t,yesBtn:{name:n.lang("yes"),click:function(e){n.insertHtml('<a name="'+c.val()+'">').hideDialog().focus()}}}).div,c=e('input[name="name"]',l),o=n.plugin.getSelectedAnchor();o&&c.val(unescape(o.attr("data-ke-name"))),c[0].focus(),c[0].select()},delete:function(){n.plugin.getSelectedAnchor().remove()}},n.clickToolbar(a,n.plugin.anchor.edit)});