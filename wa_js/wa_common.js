function waDebug(b){var a=new Date();console.log("DEBUG : "+a.getUTCMinutes()+":"+a.getUTCSeconds()+":"+a.getUTCMilliseconds()+" \t"+b)}String.prototype.replaceAll=function(a,b){var c=this;return c.replace(new RegExp(a,"g"),b)};if(!String.prototype.startsWith){String.prototype.startsWith=function(b,a){a=a||0;return this.substr(a,b.length)===b}}if(!String.prototype.endsWith){String.prototype.endsWith=function(c,b){var a=this.toString();if(typeof b!=="number"||!isFinite(b)||Math.floor(b)!==b||b>a.length){b=a.length}b-=c.length;var d=a.indexOf(c,b);return d!==-1&&d===b}}var WaGui={};WaGui.alert=function(a){alert(a)};var waAlignResizeEvent={};waAlignResizeEvent.rtime=0;waAlignResizeEvent.timeout=false;waAlignResizeEvent.delta=30;waAlignResizeEvent.resizeend=function(){if(new Date()-this.rtime<this.delta){setTimeout("waAlignResizeEvent.resizeend()",this.delta)}else{this.timeout=false;waManageComVAlign("align","resize")}};waAlignResizeEvent.restartTimer=function(){this.rtime=new Date();if(this.timeout===false){this.timeout=true;setTimeout("waAlignResizeEvent.resizeend()",this.delta)}};function resizeUpdate(){waManageComVAlign("reset","resize");waAlignResizeEvent.restartTimer()}wa$(window).resize(function(){resizeUpdate()});function waBuildSubRowStructure(){var a=new Array();wa$.each(wa$(".row-align"),function(d,f){var h=wa$(f);var g=new Array();g.h_valid=false;var c=0;var e=h.children();var b=new Array();wa$.each(e,function(j,k){var l=wa$(k);if(l.filter(":visible").length>0){var i=l.hasClass("clearfix");if(i==false){g.push(l)}else{if(g.length>0){b.push(g);g=new Array();g.h_valid=false}}}});if(g.length>0){b.push(g)}a.push(b)});return a}function waDumpSubRowStructure(k){var l="";l+="row ("+k.length+")\n";for(var e=0;e<k.length;e++){var j=k[e];l+="row:"+e+" subrow ("+j.length+")\n";for(var d=0;d<j.length;d++){var a=j[d];l+="sub_row:"+d+" elem "+a.length+" valid h="+a.h_valid+"\n";for(var c=0;c<a.length;c++){var b=a[c];var g=b.position();var f=b.data("wa-height");l+="elem:"+c+" h="+f+" y="+g.top+"\n"}}}return l}function waSetHeightElements(q,b){for(var j=0;j<q.length;j++){var p=q[j];for(var f=0;f<p.length;f++){var c=0;var a=p[f];var l=true;for(var e=0;e<a.length;e++){var d=a[e];var k=d.data("wa-height");if((k==undefined)||(k<=0)){var g=d.attr("data-typeCalculHeight");var n=d.attr("data-ratioWidth");var m=d.attr("data-ratioHeight");k=d.height();var o=d.attr("data-typeCalculHeight");if((b!="load")&&(o=="aft_load")){k=0}if((n!=undefined)&&(n>0)){k=d.width()*m/n}}d.data("wa-height",k);c=Math.max(c,k);if(k==0){l=false}}a.h_valid=l;a.height=c}}}function waResetHeightElements(f,h){for(var b=0;b<f.length;b++){var g=f[b];for(var c=0;c<g.length;c++){var e=g[c];e.h_valid=false;e.height=0;for(var a=0;a<e.length;a++){var d=e[a];d.data("wa-height",d.height());d.css({top:0,opacity:1})}}}f=waBuildSubRowStructure();waSetHeightElements(f,h);waAlignElements(f)}function waAlignElements(j){for(var e=0;e<j.length;e++){var h=j[e];for(var d=0;d<h.length;d++){var a=h[d];if(a.h_valid){for(var c=0;c<a.length;c++){var b=a[c];var g=b.data("wa-height");var f=0;if(b.hasClass("wa-valign-middle")){f+=(a.height-g)/2}if(b.hasClass("wa-valign-bottom")){f+=(a.height-g)}f=Math.max(f,0);b.css({top:f,opacity:1})}}else{for(var c=0;c<a.length;c++){var b=a[c];if(b.hasClass("wa-valign-middle")||b.hasClass("wa-valign-bottom")){b.css({top:0,opacity:0})}}}}}}function waManageComVAlign(a,c){var b=waBuildSubRowStructure();if(a=="reset"){waResetHeightElements(b,c)}b=waBuildSubRowStructure();waSetHeightElements(b,c);waAlignElements(b)}function bindSmoothScroll(a){if(a===undefined){a=".scrollTo:not(.wa-compmenu .scrollTo)"}else{a+=" .scrollTo"}wa$(a).click(function(){var d=0;if(wa$(".wa-compmenu>.wa-always-on-top").length>0&&ResponsiveBootstrapToolkit.is(">xs")){d=52}var c=wa$(this).attr("href");var b=750;wa$("html, body").animate({scrollTop:wa$(c).offset().top-d},b);return false})}function createToTheTopButton(){var a;wa$("body").append('<div id="wa_to_the_top"><a id="wa_to_the_top_button" class="scrollTo" href="#wa-anchor-top"></a></div>');wa$(window).scroll(function(c){var b=wa$("#wa_to_the_top");if(wa$(window).scrollTop()===0||ResponsiveBootstrapToolkit.is("lg")){clearTimeout(a);b.fadeOut(200)}else{b.fadeIn(500,function(){clearTimeout(a);a=setTimeout(function(){b.fadeOut(500)},3000)})}})}wa$().ready(function(){var a=wa$(".wa-parallax");wa$.each(a,function(c,d){var b=wa$(d);if(ResponsiveBootstrapToolkit.is("xs")){}else{b.css({"background-image":"url()"})}})});wa$(window).load(function(){waManageComVAlign("align","load")});wa$(window).load(function(){wa$(".g_recaptcha").each(function(a){grecaptcha.render(wa$(this).attr("id"),{sitekey:wa$(this).data("sitekey")})})});wa$().ready(function(){waManageComVAlign("align","ready");createToTheTopButton();bindSmoothScroll();wa$(".wa-img-rollover").hover(function(){var n=wa$(this).find(".wa-over1");var m=wa$(this).find(".wa-over2");var i=n.parent();var l=n.width();var k=n.height();m.width(l);m.height(k);m.css({opacity:"0"});m.css({top:n.position().top+"px",left:n.position().left+"px"});m.show();n.stop().animate({opacity:"0"},"slow");m.stop().animate({opacity:"1"},"slow")},function(){var k=wa$(this).find(".wa-over1");var i=wa$(this).find(".wa-over2");k.stop().animate({opacity:"1"},"slow");i.stop().animate({opacity:"0"},"slow")});if(WaComponentContext.array_maps!=undefined){for(var e=0;e<WaComponentContext.array_maps.length;e++){var h=WaComponentContext.array_maps[e];var f=h.lat;var a=h["long"];var g=h.waid;var c=new google.maps.LatLng(f,a);var j={zoom:16,zoomControl:true,panControl:true,center:c,mapTypeId:google.maps.MapTypeId.ROADMAP};var b=new google.maps.Map(document.getElementById("wa-gmap-"+g),j);var d=new google.maps.Marker({position:c});d.setMap(b)}}});wa$().ready(function(){wa$.extend(wa$.validator.messages,{required:WaTranslator.tr("This field is mandatory")})});