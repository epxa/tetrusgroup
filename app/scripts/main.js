// Foggy, v1.1.1
//
// Description: jQuery plugin for blurring page elements
// Homepage:    http://nbartlomiej.github.com/foggy
// Author:      nbartlomiej@gmail.com

(function(e){e.fn.foggy=function(t){var n={opacity:.8,blurRadius:2,quality:16,cssFilterSupport:true};var r={opacity:1,blurRadius:0};var i;if(t==false){i=e.extend(n,r)}else{i=e.extend(n,t)}var s=function(e,t,n,r){this.content=e;this.position=t;this.offset=n;this.opacity=r};s.prototype.render=function(t){e("<div/>",{html:this.content,"class":"foggy-pass-"+this.position}).css({position:this.position,opacity:this.opacity,top:this.offset[0],left:this.offset[1]}).appendTo(t)};var o=function(e){this.radius=e};o.prototype.includes=function(e,t){if(Math.pow(e,2)+Math.pow(t,2)<=Math.pow(this.radius,2)){return true}else{return false}};o.prototype.points=function(){var e=[];for(var t=-this.radius;t<=this.radius;t++){for(var n=-this.radius;n<=this.radius;n++){if(this.includes(t,n)){e.push([t,n])}}}return e};var u=function(e,t){this.element=e;this.settings=t};u.prototype.calculateOffsets=function(t,n){var r=e.grep((new o(t)).points(),function(e){return e[0]!=0||e[1]!=0});var i;if(r.length<=n){i=r}else{var s=r.length-n;var u=[];for(var a=0;a<s;a++){u.push(Math.round(a*(r.length/s)))}i=e.grep(r,function(t,n){if(e.inArray(n,u)>=0){return false}else{return true}})}return i};u.prototype.getContent=function(){var t=e(this.element).find(".foggy-pass-relative")[0];if(t){return e(t).html()}else{return e(this.element).html()}};u.prototype.render=function(){var t=this.getContent();e(this.element).empty();var n=e("<div/>").css({position:"relative"});var r=this.calculateOffsets(this.settings.blurRadius*2,this.settings.quality);var i=this.settings.opacity*1.2/(r.length+1);(new s(t,"relative",[0,0],i)).render(n);e(r).each(function(e,r){(new s(t,"absolute",r,i)).render(n)});n.appendTo(this.element)};var a=function(e,t){this.element=e;this.settings=t};a.prototype.render=function(){var t=(""+i.opacity).slice(2,4);var n=this.settings.blurRadius;e(this.element).css({"-webkit-filter":"blur("+n+"px)",opacity:i.opacity})};return this.each(function(e,t){if(i.cssFilterSupport&&"-webkit-filter"in document.body.style){(new a(t,i)).render()}else{(new u(t,i)).render()}})}})(jQuery)
/**
 * Featherlight - ultra slim jQuery lightbox
 * Version 0.4.10 - http://noelboss.github.io/featherlight/
 *
 * Copyright 2014, Noël Raoul Bossart (http://www.noelboss.com)
 * MIT Licensed.
**/
!function(a){"use strict";if("undefined"==typeof a)return void("console"in window&&window.console.info("Too much lightness, Featherlight needs jQuery."));var b=a.featherlight=function(c,d){if(this.constructor===b)this.id=b.id++;else{if("string"==typeof c||!1!=c instanceof a){var e=(new b).setup(c,d);return e.config.open.call(e),e}d=a.extend({},b.defaults,c||{}),a(d.selector,d.context).featherlight()}},c=function(a){if(27===a.keyCode&&!a.isDefaultPrevented()){var c=b.current();c&&c.config.closeOnEsc&&(c.$instance.find("."+c.config.namespace+"-close:first").click(),a.preventDefault())}};a.extend(b,{id:0,defaults:{autostart:!0,namespace:"featherlight",selector:"[data-featherlight]",context:"body",type:{image:!1,ajax:!1},targetAttr:"data-featherlight",variant:null,resetCss:!1,background:null,openTrigger:"click",closeTrigger:"click",openSpeed:250,closeSpeed:250,closeOnClick:"background",closeOnEsc:!0,closeIcon:"&#10005;",beforeOpen:a.noop,beforeClose:a.noop,afterOpen:a.noop,afterClose:a.noop,contentFilters:["jquery","image","html","ajax"],open:function(a){var b=this.config.beforeOpen.call(this,a);return!1!==b&&(b=this.open(a)),!1!==b&&this.config.afterOpen.call(this,a),b},close:function(a){var b=this.config.beforeClose.call(this,a);!1!==b&&this.close(a)}},methods:{setup:function(c,d){"object"!=typeof c||c instanceof a!=!1||d||(d=c,c=void 0),d=a.extend({},b.defaults,d);var e=d.resetCss?d.namespace+"-reset":d.namespace,f=a(d.background||'<div class="'+e+'"><div class="'+e+'-content"><span class="'+e+"-close-icon "+d.namespace+'-close">'+d.closeIcon+"</span></div></div>"),g=this;return a.extend(g,{config:d,target:c,$instance:f.clone().addClass(d.variant)}),g.$instance.on(d.closeTrigger+"."+d.namespace,function(b){var c=a(b.target);("background"===d.closeOnClick&&c.is("."+d.namespace)||"anywhere"===d.closeOnClick||c.is("."+d.namespace+"-close"))&&(b.preventDefault(),d.close.call(g))}),this},attach:function(b,c,d){var e={};return a.each(b[0].attributes,function(){var b=this.name.match(/^data-featherlight-(.*)/);if(b){var c=this.value;try{c=a.parseJSON(c)}catch(d){}e[a.camelCase(b[1])]=c}}),this.$elm=b,this.setup(c,a.extend(e,d)),b.on(this.config.openTrigger+"."+this.config.namespace,a.proxy(this.config.open,this)),this},getContent:function(){var c,d=this,e=d.target||d.$elm.attr(d.config.targetAttr)||"";for(var f in d.config.type)d.config.type[f]===!0&&(c=b.contentFilters[f]);if(!c&&e in b.contentFilters&&(c=b.contentFilters[e],e=d.target&&d.$elm.attr(d.config.targetAttr)),e=e||d.$elm.attr("href")||"",!c){var g=e;if(e=null,a.each(d.config.contentFilters,function(){return c=b.contentFilters[this],c.test&&(e=c.test(g)),!e&&c.regex&&g.match&&g.match(c.regex)&&(e=g),!e}),!e)return"console"in window&&window.console.error("Featherlight: no content filter found "+(g?' for "'+g+'"':" (no target specified)")),!1}return c.process.call(d,e)},setContent:function(b){var c=this;(b.is("iframe")||a("iframe",b).length>0)&&c.$instance.addClass(c.config.namespace+"-iframe"),c.$content=b.clone().addClass(c.config.namespace+"-inner"),c.$instance.find("."+c.config.namespace+"-inner").remove(),c.$instance.find("."+c.config.namespace+"-content").append(c.$content)},open:function(d){var e=this;d&&d.preventDefault();var f=this.getContent();return f?(e.constructor._opened.add(e._openedCallback=function(a){e.$instance.closest("body").length>0&&(a.currentFeatherlight=e)}),this.config.closeOnEsc&&c&&(a(document).bind("keyup."+b.defaults.namespace,c),c=null),this.setContent(f),this.$instance.appendTo("body").fadeIn(this.config.openSpeed),void 0):!1},close:function(a){var b=this;b.constructor._opened.remove(b._openedCallback),b.$instance.fadeOut(b.config.closeSpeed,function(){b.$instance.detach(),b.config.afterClose.call(b,a)})}},contentFilters:{jquery:{regex:/^[#.]\w/,test:function(b){return b instanceof a&&b},process:function(b){return a(b)}},image:{regex:/\.(png|jpg|jpeg|gif|tiff|bmp)(\?\S*)?$/i,process:function(b){return a('<img src="'+b+'" alt="" class="'+this.config.namespace+'-image" />')}},html:{regex:/^\s*<[\w!][^<]*>/,process:function(b){return a(b)}},ajax:{regex:/./,process:function(b){var c=this,d=a("<div></div>").load(b,function(b,e){"error"!==e&&a.featherlight(d.html(),a.extend({},c.config,{type:{html:!0}}))})}}},current:function(){var a={};return this._opened.fire(a),a.currentFeatherlight},close:function(){var a=b.current();a&&a.config.close.call(a)},_opened:a.Callbacks()}),b.prototype=a.extend({constructor:b},b.methods),a.fn.featherlight=function(c,d){return this.each(function(){(new b).attach(a(this),d,c)}),this},a(document).ready(function(){var c=b.defaults;c.autostart&&a(c.selector,c.context).featherlight()})}(jQuery);
/**
 * Featherlight Gallery – an extension for the ultra slim jQuery lightbox
 * Version 0.4.10 - http://noelboss.github.io/featherlight/
 *
 * Copyright 2014, Noël Raoul Bossart (http://www.noelboss.com)
 * MIT Licensed.
**/!function(a){"use strict";if("undefined"==typeof a)return void("console"in window&&(window.console.info("Too much lightness, Featherlight needs jQuery."),"featherlight"in a||window.console.info("Load the featherlight plugin before the gallery plugin")));var b="ontouchstart"in document.documentElement,c=a.event&&a.event.special.swipeleft&&a,d="Hammer"in window&&function(){new window.Hammer(el[0])},e=b&&(c||d);a.fn.featherlightGallery=function(b){var c=a(this),d={gallery:{previous:"&#9664;",next:"&#9654;",fadeIn:100,fadeOut:300},type:{image:!0}},f=b&&b.afterOpen,g=b&&b.afterClose,h={afterClose:function(a){var b=this;b.$instance.off("next."+b.config.namespace+" previous."+b.config.namespace),e&&(b.$instance.off("swipeleft"),b.$instance.off("swiperight")),"function"==typeof g&&g.call(this,a)},afterOpen:function(b){var d=this,g=d.$instance.find("img");if(d.$currentTarget=a(b.currentTarget),g.load(function(){g.stop().fadeTo(d.config.gallery.fadeIn,1)}),d.$instance.on("next."+d.config.namespace+" previous."+d.config.namespace,function(a){var b="next"===a.type?1:-1,e=c.eq((c.index(d.$currentTarget)+b)%c.length);g.fadeTo(d.config.gallery.fadeOut,.2),d.$currentTarget=e,g[0].src=e.attr("href")}),e)e(d.$instance).on("swipeleft",function(){d.$instance.trigger("next")}).on("swiperight",function(){d.$instance.trigger("previous")});else{var h=function(b){return a('<span title="'+b+'" class="'+d.config.namespace+"-"+b+'"><span>'+d.config.gallery[b]+"</span></span>").click(function(){a(this).trigger(b+"."+d.config.namespace)})};g.after(h("previous")).after(h("next"))}"function"==typeof f&&f.call(this,b)}};c.featherlight(a.extend(!0,{},d,b,h))},a.featherlightGallery=function(b,c){"object"!=typeof b&&(b=a(b)),b.featherlightGallery(c)}}(jQuery);

$('.fogg').foggy({
   blurRadius: 10,          // In pixels.
   opacity: 0.8,           // Falls back to a filter for IE.
   cssFilterSupport: true  // Use "-webkit-filter" where available.
 }); 

$('.thumbnail').featherlightGallery();

var Myd = new Date();

var MyMonth = Myd.getMonth()+1;
var MyDay = Myd.getDate();

var MyDate = Myd.getFullYear() + '-' +
    ((''+MyMonth).length<2 ? '0' : '') + MyMonth + '-' +
    ((''+MyDay).length<2 ? '0' : '') + MyDay;

$('.date').html(MyDate);
/*
   * Replace all SVG images with inline SVG
   */
      jQuery('img.svg').each(function(){
          var $img = jQuery(this);
          var imgID = $img.attr('id');
          var imgClass = $img.attr('class');
          var imgURL = $img.attr('src');

          jQuery.get(imgURL, function(data) {
              // Get the SVG tag, ignore the rest
              var $svg = jQuery(data).find('svg');

              // Add replaced image's ID to the new SVG
              if(typeof imgID !== 'undefined') {
                  $svg = $svg.attr('id', imgID);
              }
              // Add replaced image's classes to the new SVG
              if(typeof imgClass !== 'undefined') {
                  $svg = $svg.attr('class', imgClass+' replaced-svg');
              }

              // Remove any invalid XML tags as per http://validator.w3.org
              $svg = $svg.removeAttr('xmlns:a');

              // Replace image with new SVG
              $img.replaceWith($svg);

          }, 'xml');

      });