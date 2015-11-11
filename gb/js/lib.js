/* Zepto v1.1.6 - zepto event ajax form ie - zeptojs.com/license */
var Zepto=function(){function L(t){return null==t?String(t):j[S.call(t)]||"object"}function Z(t){return"function"==L(t)}function _(t){return null!=t&&t==t.window}function $(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function D(t){return"object"==L(t)}function M(t){return D(t)&&!_(t)&&Object.getPrototypeOf(t)==Object.prototype}function R(t){return"number"==typeof t.length}function k(t){return s.call(t,function(t){return null!=t})}function z(t){return t.length>0?n.fn.concat.apply([],t):t}function F(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function q(t){return t in f?f[t]:f[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function H(t,e){return"number"!=typeof e||c[F(t)]?e:e+"px"}function I(t){var e,n;return u[t]||(e=a.createElement(t),a.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),u[t]=n),u[t]}function V(t){return"children"in t?o.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function B(n,i,r){for(e in i)r&&(M(i[e])||A(i[e]))?(M(i[e])&&!M(n[e])&&(n[e]={}),A(i[e])&&!A(n[e])&&(n[e]=[]),B(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function U(t,e){return null==e?n(t):n(t).filter(e)}function J(t,e,n,i){return Z(e)?e.call(t,n,i):e}function X(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function W(e,n){var i=e.className||"",r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function Y(t){try{return t?"true"==t||("false"==t?!1:"null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?n.parseJSON(t):t):t}catch(e){return t}}function G(t,e){e(t);for(var n=0,i=t.childNodes.length;i>n;n++)G(t.childNodes[n],e)}var t,e,n,i,C,N,r=[],o=r.slice,s=r.filter,a=window.document,u={},f={},c={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,h=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,p=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,d=/^(?:body|html)$/i,m=/([A-Z])/g,g=["val","css","html","text","data","width","height","offset"],v=["after","prepend","before","append"],y=a.createElement("table"),x=a.createElement("tr"),b={tr:a.createElement("tbody"),tbody:y,thead:y,tfoot:y,td:x,th:x,"*":a.createElement("div")},w=/complete|loaded|interactive/,E=/^[\w-]*$/,j={},S=j.toString,T={},O=a.createElement("div"),P={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};return T.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~T.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},C=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},N=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},T.fragment=function(e,i,r){var s,u,f;return h.test(e)&&(s=n(a.createElement(RegExp.$1))),s||(e.replace&&(e=e.replace(p,"<$1></$2>")),i===t&&(i=l.test(e)&&RegExp.$1),i in b||(i="*"),f=b[i],f.innerHTML=""+e,s=n.each(o.call(f.childNodes),function(){f.removeChild(this)})),M(r)&&(u=n(s),n.each(r,function(t,e){g.indexOf(t)>-1?u[t](e):u.attr(t,e)})),s},T.Z=function(t,e){return t=t||[],t.__proto__=n.fn,t.selector=e||"",t},T.isZ=function(t){return t instanceof T.Z},T.init=function(e,i){var r;if(!e)return T.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&l.test(e))r=T.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=T.qsa(a,e)}else{if(Z(e))return n(a).ready(e);if(T.isZ(e))return e;if(A(e))r=k(e);else if(D(e))r=[e],e=null;else if(l.test(e))r=T.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=T.qsa(a,e)}}return T.Z(r,e)},n=function(t,e){return T.init(t,e)},n.extend=function(t){var e,n=o.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){B(t,n,e)}),t},T.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],s=i||r?e.slice(1):e,a=E.test(s);return $(t)&&a&&i?(n=t.getElementById(s))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:o.call(a&&!i?r?t.getElementsByClassName(s):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=a.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},n.type=L,n.isFunction=Z,n.isWindow=_,n.isArray=A,n.isPlainObject=M,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=C,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.map=function(t,e){var n,r,o,i=[];if(R(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return z(i)},n.each=function(t,e){var n,i;if(R(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,indexOf:r.indexOf,concat:r.concat,map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(o.apply(this,arguments))},ready:function(t){return w.test(a.readyState)&&a.body?t(n):a.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?o.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return Z(t)?this.not(this.not(t)):n(s.call(this,function(e){return T.matches(e,t)}))},add:function(t,e){return n(N(this.concat(n(t,e))))},is:function(t){return this.length>0&&T.matches(this[0],t)},not:function(e){var i=[];if(Z(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):R(e)&&Z(e.item)?o.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return D(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!D(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!D(t)?t:n(t)},find:function(t){var e,i=this;return e=t?"object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(T.qsa(this[0],t)):this.map(function(){return T.qsa(this,t)}):n()},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:T.matches(i,t));)i=i!==e&&!$(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!$(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return U(e,t)},parent:function(t){return U(N(this.pluck("parentNode")),t)},children:function(t){return U(this.map(function(){return V(this)}),t)},contents:function(){return this.map(function(){return o.call(this.childNodes)})},siblings:function(t){return U(this.map(function(t,e){return s.call(V(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=I(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=Z(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=Z(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var i=this.innerHTML;n(this).empty().append(J(this,t,e,i))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=J(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this[0].textContent:null},attr:function(n,i){var r;return"string"!=typeof n||1 in arguments?this.each(function(t){if(1===this.nodeType)if(D(n))for(e in n)X(this,e,n[e]);else X(this,n,J(this,i,t,this.getAttribute(n)))}):this.length&&1===this[0].nodeType?!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:t},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){X(this,t)},this)})},prop:function(t,e){return t=P[t]||t,1 in arguments?this.each(function(n){this[t]=J(this,e,n,this[t])}):this[0]&&this[0][t]},data:function(e,n){var i="data-"+e.replace(m,"-$1").toLowerCase(),r=1 in arguments?this.attr(i,n):this.attr(i);return null!==r?Y(r):t},val:function(t){return 0 in arguments?this.each(function(e){this.value=J(this,t,e,this.value)}):this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=J(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(!this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r,o=this[0];if(!o)return;if(r=getComputedStyle(o,""),"string"==typeof t)return o.style[C(t)]||r.getPropertyValue(t);if(A(t)){var s={};return n.each(t,function(t,e){s[e]=o.style[C(e)]||r.getPropertyValue(e)}),s}}var a="";if("string"==L(t))i||0===i?a=F(t)+":"+H(t,i):this.each(function(){this.style.removeProperty(F(t))});else for(e in t)t[e]||0===t[e]?a+=F(e)+":"+H(e,t[e])+";":this.each(function(){this.style.removeProperty(F(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(W(t))},q(t)):!1},addClass:function(t){return t?this.each(function(e){if("className"in this){i=[];var r=W(this),o=J(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&W(this,r+(r?" ":"")+i.join(" "))}}):this},removeClass:function(e){return this.each(function(n){if("className"in this){if(e===t)return W(this,"");i=W(this),J(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(q(t)," ")}),W(this,i.trim())}})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=J(this,e,r,W(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=d.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||a.body;t&&!d.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?_(s)?s["inner"+i]:$(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,J(this,r,t,s[e]()))})}}),v.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=L(e),"object"==t||"array"==t||null==e?e:T.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,u){o=i?u:u.parentNode,u=0==e?u.nextSibling:1==e?u.firstChild:2==e?u:null;var f=n.contains(a.documentElement,o);r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();o.insertBefore(t,u),f&&G(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),T.Z.prototype=n.fn,T.uniq=N,T.deserializeValue=Y,n.zepto=T,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=j(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function j(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=x,r&&r.apply(i,arguments)},e[n]=b}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=x)),e}function S(t){var e,i={originalEvent:t};for(e in t)w.test(e)||t[e]===n||(i[e]=t[e]);return j(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){var s=2 in arguments&&i.call(arguments,2);if(r(e)){var a=function(){return e.apply(n,s?s.concat(i.call(arguments)):arguments)};return a._zid=l(e),a}if(o(n))return s?(s.unshift(e[n],e),t.proxy.apply(null,s)):t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var x=function(){return!0},b=function(){return!1},w=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(r(a)||a===!1)&&(u=a,a=n),u===!1&&(u=b),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(S(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=b),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):j(e),e._args=n,this.each(function(){e.type in f&&"function"==typeof this[e.type]?this[e.type]():"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=S(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return 0 in arguments?this.bind(e,t):this.trigger(e)}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),j(n)}}(Zepto),function(t){function h(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function p(t,e,i,r){return t.global?h(e||n,i,r):void 0}function d(e){e.global&&0===t.active++&&p(e,null,"ajaxStart")}function m(e){e.global&&!--t.active&&p(e,null,"ajaxStop")}function g(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||p(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void p(e,n,"ajaxSend",[t,e])}function v(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),p(n,r,"ajaxSuccess",[e,n,t]),x(o,e,n)}function y(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),p(i,o,"ajaxError",[n,i,t||e]),x(e,n,i)}function x(t,e,n){var i=n.context;n.complete.call(i,e,t),p(n,i,"ajaxComplete",[e,n]),m(n)}function b(){}function w(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function E(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function j(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=E(e.url,e.data),e.data=void 0)}function S(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function C(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?C(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/,l=n.createElement("a");l.href=window.location.href,t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?v(f[0],l,i,r):y(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),g(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:b,success:b,error:b,complete:b,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var a,o=t.extend({},e||{}),s=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===o[i]&&(o[i]=t.ajaxSettings[i]);d(o),o.crossDomain||(a=n.createElement("a"),a.href=o.url,a.href=a.href,o.crossDomain=l.protocol+"//"+l.host!=a.protocol+"//"+a.host),o.url||(o.url=window.location.toString()),j(o);var u=o.dataType,f=/\?.+=\?/.test(o.url);if(f&&(u="jsonp"),o.cache!==!1&&(e&&e.cache===!0||"script"!=u&&"jsonp"!=u)||(o.url=E(o.url,"_="+Date.now())),"jsonp"==u)return f||(o.url=E(o.url,o.jsonp?o.jsonp+"=?":o.jsonp===!1?"":"callback=?")),t.ajaxJSONP(o,s);var C,h=o.accepts[u],p={},m=function(t,e){p[t.toLowerCase()]=[t,e]},x=/^([\w-]+:)\/\//.test(o.url)?RegExp.$1:window.location.protocol,S=o.xhr(),T=S.setRequestHeader;if(s&&s.promise(S),o.crossDomain||m("X-Requested-With","XMLHttpRequest"),m("Accept",h||"*/*"),(h=o.mimeType||h)&&(h.indexOf(",")>-1&&(h=h.split(",",2)[0]),S.overrideMimeType&&S.overrideMimeType(h)),(o.contentType||o.contentType!==!1&&o.data&&"GET"!=o.type.toUpperCase())&&m("Content-Type",o.contentType||"application/x-www-form-urlencoded"),o.headers)for(r in o.headers)m(r,o.headers[r]);if(S.setRequestHeader=m,S.onreadystatechange=function(){if(4==S.readyState){S.onreadystatechange=b,clearTimeout(C);var e,n=!1;if(S.status>=200&&S.status<300||304==S.status||0==S.status&&"file:"==x){u=u||w(o.mimeType||S.getResponseHeader("content-type")),e=S.responseText;try{"script"==u?(1,eval)(e):"xml"==u?e=S.responseXML:"json"==u&&(e=c.test(e)?null:t.parseJSON(e))}catch(i){n=i}n?y(n,"parsererror",S,o,s):v(e,S,o,s)}else y(S.statusText||null,S.status?"error":"abort",S,o,s)}},g(S,o)===!1)return S.abort(),y(null,"abort",S,o,s),S;if(o.xhrFields)for(r in o.xhrFields)S[r]=o.xhrFields[r];var N="async"in o?o.async:!0;S.open(o.type,o.url,N,o.username,o.password);for(r in p)T.apply(S,p[r]);return o.timeout>0&&(C=setTimeout(function(){S.onreadystatechange=b,S.abort(),y(null,"timeout",S,o,s)},o.timeout)),S.send(o.data?o.data:null),S},t.get=function(){return t.ajax(S.apply(null,arguments))},t.post=function(){var e=S.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=S.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=S(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var T=encodeURIComponent;t.param=function(e,n){var i=[];return i.add=function(e,n){t.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(T(e)+"="+T(n))},C(i,e,n),i.join("&").replace(/%20/g,"+")}}(Zepto),function(t){t.fn.serializeArray=function(){var e,n,i=[],r=function(t){return t.forEach?t.forEach(r):void i.push({name:e,value:t})};return this[0]&&t.each(this[0].elements,function(i,o){n=o.type,e=o.name,e&&"fieldset"!=o.nodeName.toLowerCase()&&!o.disabled&&"submit"!=n&&"reset"!=n&&"button"!=n&&"file"!=n&&("radio"!=n&&"checkbox"!=n||o.checked)&&r(t(o).val())}),i},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(0 in arguments)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(Zepto),function(t){"__proto__"in{}||t.extend(t.zepto,{Z:function(e,n){return e=e||[],t.extend(e,t.fn),e.selector=n||"",e.__Z=!0,e},isZ:function(e){return"array"===t.type(e)&&"__Z"in e}});try{getComputedStyle(void 0)}catch(e){var n=getComputedStyle;window.getComputedStyle=function(t){try{return n(t)}catch(e){return null}}}}(Zepto);

//     Zepto.js
//     (c) 2010-2015 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($){
  var touch = {},
    touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
    longTapDelay = 750,
    gesture

  function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >=
      Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
  }

  function longTap() {
    longTapTimeout = null
    if (touch.last) {
      touch.el.trigger('longTap')
      touch = {}
    }
  }

  function cancelLongTap() {
    if (longTapTimeout) clearTimeout(longTapTimeout)
    longTapTimeout = null
  }

  function cancelAll() {
    if (touchTimeout) clearTimeout(touchTimeout)
    if (tapTimeout) clearTimeout(tapTimeout)
    if (swipeTimeout) clearTimeout(swipeTimeout)
    if (longTapTimeout) clearTimeout(longTapTimeout)
    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
    touch = {}
  }

  function isPrimaryTouch(event){
    return (event.pointerType == 'touch' ||
      event.pointerType == event.MSPOINTER_TYPE_TOUCH)
      && event.isPrimary
  }

  function isPointerEventType(e, type){
    return (e.type == 'pointer'+type ||
      e.type.toLowerCase() == 'mspointer'+type)
  }

  $(document).ready(function(){
    var now, delta, deltaX = 0, deltaY = 0, firstTouch, _isPointerType

    if ('MSGesture' in window) {
      gesture = new MSGesture()
      gesture.target = document.body
    }

    $(document)
      .bind('MSGestureEnd', function(e){
        var swipeDirectionFromVelocity =
          e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null;
        if (swipeDirectionFromVelocity) {
          touch.el.trigger('swipe')
          touch.el.trigger('swipe'+ swipeDirectionFromVelocity)
        }
      })
      .on('touchstart MSPointerDown pointerdown', function(e){
        if((_isPointerType = isPointerEventType(e, 'down')) &&
          !isPrimaryTouch(e)) return
        firstTouch = _isPointerType ? e : e.touches[0]
        if (e.touches && e.touches.length === 1 && touch.x2) {
          // Clear out touch movement data if we have it sticking around
          // This can occur if touchcancel doesn't fire due to preventDefault, etc.
          touch.x2 = undefined
          touch.y2 = undefined
        }
        now = Date.now()
        delta = now - (touch.last || now)
        touch.el = $('tagName' in firstTouch.target ?
          firstTouch.target : firstTouch.target.parentNode)
        touchTimeout && clearTimeout(touchTimeout)
        touch.x1 = firstTouch.pageX
        touch.y1 = firstTouch.pageY
        if (delta > 0 && delta <= 250) touch.isDoubleTap = true
        touch.last = now
        longTapTimeout = setTimeout(longTap, longTapDelay)
        // adds the current touch contact for IE gesture recognition
        if (gesture && _isPointerType) gesture.addPointer(e.pointerId);
      })
      .on('touchmove MSPointerMove pointermove', function(e){
        if((_isPointerType = isPointerEventType(e, 'move')) &&
          !isPrimaryTouch(e)) return
        firstTouch = _isPointerType ? e : e.touches[0]
        cancelLongTap()
        touch.x2 = firstTouch.pageX
        touch.y2 = firstTouch.pageY

        deltaX += Math.abs(touch.x1 - touch.x2)
        deltaY += Math.abs(touch.y1 - touch.y2)
      })
      .on('touchend MSPointerUp pointerup', function(e){
        if((_isPointerType = isPointerEventType(e, 'up')) &&
          !isPrimaryTouch(e)) return
        cancelLongTap()

        // swipe
        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
            (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))

          swipeTimeout = setTimeout(function() {
            touch.el.trigger('swipe')
            touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
            touch = {}
          }, 0)

        // normal tap
        else if ('last' in touch)
          // don't fire tap when delta position changed by more than 30 pixels,
          // for instance when moving to a point and back to origin
          if (deltaX < 30 && deltaY < 30) {
            // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
            // ('tap' fires before 'scroll')
            tapTimeout = setTimeout(function() {

              // trigger universal 'tap' with the option to cancelTouch()
              // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
              var event = $.Event('tap')
              event.cancelTouch = cancelAll
              touch.el.trigger(event)

              // trigger double tap immediately
              if (touch.isDoubleTap) {
                if (touch.el) touch.el.trigger('doubleTap')
                touch = {}
              }

              // trigger single tap after 250ms of inactivity
              else {
                touchTimeout = setTimeout(function(){
                  touchTimeout = null
                  if (touch.el) touch.el.trigger('singleTap')
                  touch = {}
                }, 250)
              }
            }, 0)
          } else {
            touch = {}
          }
          deltaX = deltaY = 0

      })
      // when the browser window loses focus,
      // for example when a modal dialog is shown,
      // cancel all ongoing events
      .on('touchcancel MSPointerCancel pointercancel', cancelAll)

    // scrolling the window indicates intention of the user
    // to scroll, not tap or swipe, so cancel all ongoing events
    $(window).on('scroll', cancelAll)
  })

  ;['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',
    'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(eventName){
    $.fn[eventName] = function(callback){ return this.on(eventName, callback) }
  })
})(Zepto);

/*!
 * A module loader
 */

(function (global) {
  'use strict';
  var PP = {
    version: '0.0.1'
  };

  var config = {
    baseUrl: undefined
  };

  // 一些简单方法
  var Util = {

    /** 模拟数组的遍历方法 */
    forEach: function (arg, fn) {
      var type = Object.prototype.toString.call(arg);
      if (type === '[object Array]') {
        for (var i = 0; i < arg.length; i++) {
          if (fn.call(arg[i], arg[i], i) === false) {
            return;
          }
        }
      } else if (type === '[object Object]') {
        for (var j in arg) {
          if (arg.hasOwnProperty(j)) {
            if (fn.call(arg[j], arg[j], j) === false) {
              return;
            }
          }
        }
      }
    }
  };

  // 模块相关数据池
  var ModulesDataPool = {
    // 已经下载完成的js文件
    loadedPaths: {},
    // 模块实例的缓存
    cache: {},
    // 标记对应路径模块加载状态
    loadingPaths: {},
    // 标记模块初始化状态
    initingModules: {},
    // 异步模块列表
    requiredPaths: {},
    // 暂时缓存需要加载的模块
    lazyLoadPaths: {}
  };

  /**
   * 模块类
   * @constructor
   * @param {string} path - 文件全路径.
   * @param {string} name - 模块名.
   */
  function Module (path, name) {
    this.name = name;
    this.path = path;

    // 模块包装的方法
    this.fn = null;
    // 模块暴露对象
    this.exports = {};

    // 模块（包括依赖）是否全部加载完成
    this._loaded = false;
    // 完成后需要触发的方法
    this._readyStack = [];

    // 实例化之后将当前模块实例添加到缓存中
    ModulesDataPool.cache[this.name] = this;
  }

  /** @lends Module */
  Module.prototype = {

    /**
     * @description 初始化模块，执行模块的方法
     */
    init: function () {
      if (!this._inited) {
        this._inited = true;
        if (!this.fn) {
          throw new Error('Module ' + this.name + ' not found!');
        }
        var result = null;
        ModulesDataPool.initingModules[this.name] = true;

        // 执行方法，传入参数有require
        result = this.fn.call(null, require, this.exports, this);
        if (result) {
          this.exports = result;
        }

        ModulesDataPool.initingModules[this.name] = false;
      }
    },

    /**
     * @description 加载模块
     */
    load: function () {
      var path = this.path;
      ModulesDataPool.loadingPaths[path] = true;
      Script.load({
        src: path
      });
    },

    /**
     * @description 模块加载完成
     */
    ready: function (fn) {
      var stack = this._readyStack;
      if (this._loaded) {
        this.init();
        fn();
      } else {
        stack.push(fn);
      }
    },

    /**
     * @description 触发方法栈的执行
     */
    triggerStack: function () {
      if (this._readyStack.length > 0) {
        this.init();
        Util.forEach(this._readyStack, function (func) {
          if (!func.excuting) {
            func.excuting = true;
            func();
          }
        });

        this._readyStack = [];
      }
    },

    /**
     * @description 标记模块加载完成，并执行相关初始化操作
     */
    define: function (){
      this._loaded = true;
      ModulesDataPool.loadedPaths[this.path] = true;
      delete ModulesDataPool.loadingPaths[this.path];
      this.triggerStack();
    },

    /**
     * @description 延后加载模块
     */
    lazyLoad: function () {
      var name = this.name;
      var path = this.path;

      if (ModulesDataPool.lazyLoadPaths[name]) {
        this.define();
        delete ModulesDataPool.lazyLoadPaths[name];
      } else {
        if (ModulesDataPool.loadedPaths[path]) {
          this.triggerStack();
        } else {
          ModulesDataPool.requiredPaths[this.name] = true;
          this.load();
        }
      }
    }

  };

  /**
   * @description 定义require方法
   */
  function require(name) {
    var mod = getModule(name);
    if (!ModulesDataPool.initingModules[name]) {
      mod.init();
    }

    return mod.exports;
  }

  /**
   * @description 检查给定路径数组的路径是否都已加载完成
   */
  function checkPathsLoaded(paths) {
    for (var i = 0; i < paths.length; i++) {
      if (!(paths[i] in ModulesDataPool.loadedPaths)) {
        return false;
      }
    }

    return true;
  }

  /**
   * @description 通过名称获取对应路径
   */
  function getPathByName (name) {
    return config.baseUrl ? (config.baseUrl) + name : name;
  }

  /**
   * @description 通过名称或路径获取模块
   */
  function getModule(name) {
    var path = name.indexOf(':') > -1 ? name : getPathByName(name);
    if (ModulesDataPool.cache[name]) {
      return ModulesDataPool.cache[name];
    }

    return new Module(path, name);
  }

  // 脚本加载器
  var Script = {
    // 缓存已经加载过的路径
    _paths: {},

    // 路径规则的配置
    _rules: [],
    load: function (opt) {
      if (opt.src in this._paths) {
        return;
      }

      this._paths[opt.src] = true;
      Util.forEach(this._rules, function (modify) {
        modify.call(null, opt);
      });

      var head = document.getElementsByTagName('head')[0];
      var node = document.createElement('script');
      node.type = opt.type || 'text/javascript';
      if (opt.charset) {
        node.charset = opt.charset;
      }
      node.src = opt.src;
      node.onload = node.onerror = node.onreadystatechange = function () {
        if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
          // 确保这些方法只执行一次
          node.onload = node.onerror = node.onreadystatechange = null;
          // 加载完js后会立即初始化模块，并将结果装载到内存中
          // 所以可以将script标签移除
          if (node.parentNode) {
            head.removeChild(node);
          }
          node = undefined;
          if (typeof opt.loaded === 'function') {
            opt.loaded();
          }
        }
      };
      head.insertBefore(node, head.firstChild);
    },

    // 增加路径规则
    addPathRule: function (modify) {
      if (modify) {
        this._rules.push(modify);
      }
    }
  };

  // 创建模块
  PP.define = function (name, fn) {
    var mod = getModule(name);
    mod.fn = fn;
    if (ModulesDataPool.requiredPaths[name]) {
      mod.define();
    } else {
      ModulesDataPool.lazyLoadPaths[name] = true;
    }
  };

  // 指定一个或多个模块名，待模块加载完成后执行回调方法，并将模块对象按照次序作为参数一次传递
  PP.use = function (names, fn) {
    if (typeof names === 'string') {
      names = [names];
    }

    var args = [];
    var flags = [];

    Util.forEach(names, function (name, i) {
      flags[i] = false;
    });

    Util.forEach(names, function (name, i) {
      var mod = getModule(name);
      mod.ready(function () {
        args[i] = mod.exports;
        flags[i] = true;
        var done = true;
        Util.forEach(flags, function (flag) {
          if (flag === false) {
            done = false;
            return done;
          }
        });
        if (fn && done) {
          fn.apply(null, args);
        }
      });
      mod.lazyLoad();
    });
  };

  // 异步加载模块
  require.async = PP.use;

  // 全局的require
  PP.require = require;

  // 暴露增加路径规则配置的方法
  PP.addPathRule = function (modify) {
    Script.addPathRule(modify);
  };

  // 配置baseUrl
  PP.config = function (option) {
    var baseUrl = option.baseUrl;
    if (typeof baseUrl === 'string') {
      if (baseUrl && baseUrl.charAt(baseUrl.length - 1) === '/') {
        baseUrl = baseUrl.substr(0, baseUrl.length - 1);
      }
      config.baseUrl = baseUrl;
    }
  };

  if (!('PP' in global)) {
    global.PP = PP;
  }
})(window, undefined);

/*!
 * A class factory
 */

(function (global) {
  'use strict';
  var _ = global._ || (global._ = { });
  function type (arg) {
    var class2type = {};
    var toString = class2type.toString;
    var types = 'Boolean Number String Function Array Date RegExp Object Error'.split(' ');
    for (var i = 0; i < types.length; i++) {
      var typeItem = types[i];
      class2type['[object ' + typeItem + ']'] = typeItem.toLowerCase();
    }

    if (arg === null) {
      return arg + '';
    }

    return (typeof arg === 'object' || typeof arg === 'function') ?
      class2type[toString.call(arg)] || 'object' :
      typeof arg;
  }

  function isFunction (arg) {
    return type(arg) === 'function';
  }

  var initializing = false;
  // 目的是为了检测Function.prototype.toString能否打印出函数内部信息
  var fnTest = /xyz/.test(function() {var xyz;}) ? /\bsuper\b/ : /.*/;
  _.Class = function () {};

  _.Class.extend = function class_extend (properties) {
    var _super = this.prototype;

    initializing = true;
    var subPrototype = new this();
    initializing = false;
    for (var prop in properties) {
      if (prop === 'statics') {
        var staticObj = properties[prop];
        for (var staticProp in staticObj) {
          Klass[staticProp] = staticObj[staticProp];
        }
      } else {
        if (isFunction(_super[prop]) &&
          isFunction(properties[prop]) &&
          fnTest.test(properties[prop])) {
          subPrototype[prop] = wrapper(_super, prop, properties[prop]);
        } else {
          subPrototype[prop] = properties[prop];
        }
      }
    }

    function wrapper (superObj, prop, fn) {
      return function () {
        this.super = superObj[prop];
        return fn.apply(this, arguments);
      };
    }

    function Klass () {
      if (!initializing && isFunction(this.construct)) {
        this.construct.apply(this, arguments);
      }
    }

    Klass.prototype = subPrototype;

    Klass.prototype.constructor = Klass;

    Klass.extend = class_extend;

    return Klass;

  };

})(window, undefined);

/*!
 * Custom events
 */

(function (global) {
  'use strict';

  var eventSplitter = /\s+/;
  var slice = [].slice;

  /*
   * @desc 函数继承
   * @function inherits
   * @param {Function} parent 父类
   * @param {Object} protoProps 子类的扩展属性和方法
   * @param {Object} staticProps 要子类添加的额外扩展方法或属性
   */
  var inherits = function(parent, protoProps, staticProps) {
    var child;
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
      child = protoProps.constructor;
    } else {
      child = function() {
        parent.apply(this, arguments);
      };
    }
    $.extend(child, parent);

    ctor.prototype = parent.prototype;
    child.prototype = new ctor();

    if (protoProps) $.extend(child.prototype, protoProps);
    if (staticProps) $.extend(child, staticProps);
    child.prototype.constructor = child;
    child.__super__ = parent.prototype;
    return child;
  };
  /**
   * @function extend
   * @desc 继承的快捷写法
   * @param {Object} protoProps 子类的扩展属性和方法
   * @param {Object} classProps 要子类添加的额外扩展方法或属性
   * @example _.Widget.extend=_.extend;_.Widget.extend({...});
   */
  var extend = function(protoProps, classProps) {
    var child = inherits(this, protoProps, classProps);
    child.extend = this.extend;
    return child;
  };

  var _ = global._ || (global._ = { });

  /**
   * @function Events
   * @desc 自定义事件
   * @param {Object} opts
   * @param {Function} opts.callbacks
   * @constructor
   * @example 通常用在类定义中扩展自定义事件功能：$.extend(this, new _.Events())
   */
  function Events(opts) {

    if (typeof opts != 'undefined' && opts.callbacks) {
      this.callbacks = opts.callbacks;
    } else {
      this.callbacks = {};
    }

  }
  Events.extend = extend;
  Events.prototype = {
    /**
     * @function on
     * @memberof Events
     * @desc 注册事件
     * @param {String} events 事件名称
     * @param {Function} callback 回调函数
     * @param {Object} context
     */
    on: function(events, callback, context) {
      var calls, event, node, tail, list;
      if (!callback) return this;
      events = events.split(eventSplitter);
      calls = this.callbacks;
      while (event = events.shift()) {
        list = calls[event];
        node = list ? list.tail : {};
        node.next = tail = {};
        node.context = context;
        node.callback = callback;
        calls[event] = {
          tail: tail,
          next: list ? list.next : node
        };
      }

      return this;
    },
    /**
     * @function off
     * @memberof Events
     * @desc 移除自定义事件
     * @param {String} events 事件名称
     * @param {Function} callback 回调函数
     * @param {Object} context 函数执行context
     */
    off: function(events, callback, context) {
      var event, calls, node, tail, cb, ctx;

      // No events, or removing *all* events.
      // if (!(calls = this._callbacks)) return;
      if (!(calls = this.callbacks)) return;
      if (!(events || callback || context)) {
        delete this.callbacks;
        return this;
      }
      events = events ? events.split(eventSplitter) : _.keys(calls);
      while (event = events.shift()) {
        node = calls[event];
        delete calls[event];
        if (!node || !(callback || context)) continue;
        // Create a new list, omitting the indicated callbacks.
        tail = node.tail;
        while ((node = node.next) !== tail) {
          cb = node.callback;
          ctx = node.context;
          if ((callback && cb !== callback) || (context && ctx !== context)) {
            this.on(event, cb, ctx);
          }
        }
      }
      return this;
    },
    /**
     * @function trigger
     * @memberof Events
     * @desc 触发自定义事件
     * @param {String} events 事件名称
     */
    trigger: function(events) {
      var event, node, calls, tail, args, all, rest;
      if (!(calls = this.callbacks)) return this;
      all = calls.all;
      events = events.split(eventSplitter);
      rest = slice.call(arguments, 1);

      while (event = events.shift()) {
        if (node = calls[event]) {
          tail = node.tail;
          while ((node = node.next) !== tail) {
            node.callback.apply(node.context || this, rest);
          }
        }
        if (node = all) {
          tail = node.tail;
          args = [event].concat(rest);
          while ((node = node.next) !== tail) {
            node.callback.apply(node.context || this, args);
          }
        }
      }
      return this;
    }
  };

  _.Events = Events;
  _.eventCenter = new Events();
})(window, undefined);

/**
 * cookie操作组件
 * @module cookie
 * @author liweitao
 */

PP.define('cookie', function () {
  'use strict';

  /**
   * @description cookie的存操作
   * @param {String} key - cookie的key
   * @param {String} value - cookie中key对应的值
   * @param {Number} [expires] - 过期时间
   * @param {String} [path] - 设置cookie的path
   * @param {String} [domain] - 设置cookie的domain
   * @param {Boolean} [secure] - 设置cookie是否只在安全连接https下起作用
   */
  function setCookie (key, value, expires, path, domain, secure) {
    if (arguments.length <= 1) {
      throw new Error('Parameters can not be less than 1');
    }
    if (expires) {
      var date = null;
      if (typeof expires === 'number') {
        date = new Date();
        date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
      } else if (expires.toUTCString) {
        date = expires;
      }
      if (typeof expires === 'string') {
        secure = domain;
        domain = path;
        path = expires;
      } else {
        expires = '; expires=' + date.toUTCString();
      }
    }

    if (!expires) {
      expires = undefined;
    }
    path = path ? '; path=' + path : '; path=/';
    domain = domain ? '; domain=' + domain : '';
    secure = secure ? '; secure' : '';
    /** 使用数组join方法可以避开undefined或null的情况 */
    document.cookie = [key, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
  }

  /**
   * @description cookie的取操作
   * @param {String} key - cookie的key
   * @return {String} cookie
   */
  function getCookie (key) {
    if (typeof key === 'string') {
      var arr = document.cookie.match(new RegExp('(^| )' + key + '=([^;]*)(;|$)'));
      if (arr) {
        return decodeURIComponent(arr[2]);
      }
    }
    return false;
  }

  /**
   * @description 删除某一cookie
   * @param {String} key - cookie的key
   * @return {Boolean} 是否成功
   */
  function deleteCookie (key) {
    if (getCookie(key) !== null) {
      setCookie(key, null, -1);
      return true;
    }
    return false;
  }

  return {
    get: getCookie,
    set: setCookie,
    delete: deleteCookie
  };
});

/**
 * 覆盖层组件
 * @module Overlay
 * @author liweitao
 */

PP.define('overlay', function () {
  'use strict';

  /**
   * @class Overlay
   * @classdesc 遮罩层类
   * @alias module:Overlay
   */
  var Overlay = _.Class.extend({

    /**
     * @description 静态成员
     */
    statics: {
      /**
       * @static
       * @description 渐入进入之前的状态
       */
      BEFORE_FADE_IN: 0,
      /**
       * @static
       * @description 正在展现时的状态
       */
      ONSHOW: 1,
      /**
       * @static
       * @description 渐隐消失之后的状态
       */
      AFTER_FADE_OUT: 2
    },

    /**
     * overlay.
     * @constructor
     * @param {Object} options
     * @param {String|HTMLElement|Zepto} [options.content] - 遮罩层要包含的内容
     * @param {Boolen} [options.mask] - 是否展现遮罩
     * @param {Boolean} [options.modal] - 是否是模态的
     */
    construct: function (options) {
      this.conf = $.extend({
        content: '',
        mask: true,
        modal: true
      }, options);

      this.$overlayContainer = $('<div class="overlay_container before_fade_in"></div>');
      this.$overlayContentContainer = $('<div class="overlay_content_container"></div>');
      this.$overlayContent = $('<div class="overlay_content"></div>');

      var conf = this.conf;
      this.$overlayContainer.on('webkitTransitionEnd.overlay', $.proxy(function() {
        if (this.status === Overlay.AFTER_FADE_OUT) {
          this.status = Overlay.BEFORE_FADE_IN;
          this.$overlayContainer.hide().removeClass('after_fade_out').addClass('before_fade_in');
        }
      }, this));
      if (!conf.mask) {
        this.$overlayContainer.addClass('unmask');
      } else {
        this.$overlayContainer.on('touchmove', function (e) {
          e.preventDefault();
        });
      }

      if (!conf.modal) {
        this.$overlayContainer.on('touchend', $.proxy(function (e) {
          var $target = $(e.target);
          if (!$target.is('.overlay_content')) {
            this.destroy();
          }
        }, this));
      }

      this.content(conf.content);
      this.$overlayContainer.append(this.$overlayContentContainer.append(this.$overlayContent)).appendTo($('body'));
      this.status = Overlay.BEFORE_FADE_IN;
      this.show();
    },

    /**
     * @description 展示遮罩层
     * @return {Object} this - 实例本身，方便链式调用
     */
    show: function () {
      this.status = Overlay.ONSHOW;
      this.$overlayContainer.show().removeClass('before_fade_in');
      return this;
    },

    /**
     * @description 隐藏遮罩层
     * @return {Object} this - 实例本身，方便链式调用
     */
    hide: function () {
      if (this.status === Overlay.ONSHOW) {
        this.status = Overlay.AFTER_FADE_OUT;
        this.$overlayContainer.addClass('after_fade_out');
      } else {
        this.status = Overlay.BEFORE_FADE_IN;
      }
      return this;
    },

    /**
     * @description 给遮罩层内容绑定事件
     * @return {Object} this - 实例本身，方便链式调用
     */
    on: function () {
      $.fn.on.apply(this.$overlayContent, arguments);
      return this;
    },

    /**
     * @description 清除遮罩层内容事件绑定
     * @return {Object} this - 实例本身，方便链式调用
     */
    off: function () {
      $.fn.off.apply(this.$overlayContent, arguments);
      return this;
    },

    /**
     * @description 销毁遮罩层
     */
    destroy: function () {
      this.off();
      if (this.status !== Overlay.ONSHOW) {
        this.$overlayContainer.remove();
      } else {
        this.hide();
        this.$overlayContainer.off('webkitTransitionEnd.overlay')
          .on('webkitTransitionEnd', $.proxy(function () {
            this.$overlayContainer.off('webkitTransitionEnd').remove();
        }, this));
      }
    },

    /**
     * @description 获取/填充内容
     * @param {String|HTMLElement|Zepto} [content] - 当conten为空时是获取，否则是填充内容
     */
    content: function (content) {
      if (content === undefined) {
        return this.$overlayContent.children();
      } else {
        this.$overlayContent.html(content);
        return this;
      }
    }
  });

  return Overlay;
});

/**
 * 简易消息提示框组件
 * @module Toast
 * @author liweitao
 */

PP.define('toast', function (require) {
  // 调用遮罩层组件
  var Overlay = require('overlay');
  // 实例，单例模式
  var instance = null;

  /**
   * @class Toast
   * @classdesc 提示框类，单例
   * @alias module:Toast
   */
  var Toast = _.Class.extend({

    /**
     * toast.
     * @constructor
     * @param {Object|String} options
     * @param {String|HTMLElement|Zepto} [options.content] - 提示信息内容
     * @param {Number} [options.duration] - 提示持续时间
     */
    construct: function (options) {
      if (typeof options === 'string') {
        options = {
          content: options
        };
      }
      this.conf = $.extend({
        content: '',
        duration: 3000
      }, options);
      // 单例
      if (instance) {
        instance.setTimer.call(instance);
        instance.content(this.conf.content);
        instance.show();
        return instance;
      }
      this.$dom = $('<div class="toast"></div>');
      this.content(this.conf.content);
      this.setTimer();
      this.overlay = new Overlay({
        content: this.$dom,
        mask: false,
        modal: false
      });
      this.show();
      instance = this;
      return instance;
    },

    /*
     * @description 设置定时器
     */
    setTimer: function () {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout($.proxy(function () {
        this.hide();
      }, this), this.conf.duration);
    },

    /**
     * @description 展示提示信息框
     * @return {Object} this - 实例本身，方便链式调用
     */
    show: function () {
      this.overlay.show();
      return this;
    },

    /**
     * @description 隐藏提示信息框
     * @return {Object} this - 实例本身，方便链式调用
     */
    hide: function () {
      this.overlay.hide();
      return this;
    },

    /**
     * @description 获取/填充内容
     * @param {String|HTMLElement|Zepto} [content] - 当conten为空时是获取，否则是填充内容
     */
    content: function (content) {
      if (content === undefined) {
        return this.$dom.html();
      } else {
        this.$dom.html(content);
      }
    }
  });

  return Toast;
});

/**
 * @module Uri
 * @author liweitao
 */

PP.define('uri', function () {
  'use strict';

  function parseUri (str) {
    var o   = parseUri.options,
      m   = o.parser[o.strictMode ? 'strict' : 'loose'].exec(str),
      uri = {},
      i   = 14;

    while (i--) uri[o.key[i]] = m[i] || '';

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
      if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
  }

  parseUri.options = {
    strictMode: false,
    key: ['source','protocol','authority','userInfo','user','password','host','port','relative','path','directory','file','query','anchor'],
    q: {
      name:   'queryKey',
      parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
  };

  /**
   * @author (c) Steven Levithan <stevenlevithan.com>
   * @constructor Uri
   * @desc 处理、匹配url中的各个参数
   * @param {String} str 待处理的url
   * @constructor
   */
  var Uri = function (str) {
    this.url = str;
    this.data = parseUri(str);
  };
  Uri.prototype = {
    getQueryParamValue: function(param) {
      return this.data.queryKey[param];
    },
    /**
     * @function
     * @memberof Uri.ptototype
     * @desc 替换url中的querystring为给定的值
     * @param {String} param 要替换的key
     * @param {String} value 替换后的值
     * @inner
     */
    replaceQueryParam: function(param, value) {
      this.data.queryKey[param] = value.toString();
    },
    getKeyValue: function(key) {
      return this.data[key];
    },
    toString: function(){
      var url = this.data.protocol + '://' + this.data.authority + this.data.path;
      if (this.data.queryKey) {
        url += '?';
        for (var key in this.data.queryKey) {
          url += key + '=' + this.data.queryKey[key] + '&';
        }
      }
      return url;
    }
  };
  return Uri;
});

/**
 * @module Util
 * @author liweitao
 */

PP.define('util', function (require, exports, module) {
  var Util = {
    ua: navigator.userAgent.toLowerCase(),
    /**
     * @description 滚动到页面某一位置
     * @param {String|HTMLElement|Zepto|Number} selector - 可以是选择器，Dom，Zepto对象，或是数字
     * @param {Function} [callback] 滚完后的回调
     * @param {Number} [delay] - 延时时间
     * @param {Number} [duration] - 动画过渡时间
     */
    scrollToPosition: function (selector, callback, delay, duration) {
      if (selector === undefined) {
        return;
      }
      if (typeof callback === 'number') {
        if (arguments.length === 3) {
          duration = delay;
          delay = callback;
        } else if (arguments.length === 2) {
          delay = callback;
        }
      }
      var top = (typeof selector === 'number') ?
        selector : ($(selector).length ? $(selector).offset().top : 0);

      delay = typeof delay === 'number' ? delay : 0;

      setTimeout(function () {
        if (typeof duration === 'number' && duration) {
          var pageHeight = document.documentElement.scrollHeight;
          top = Math.min(top, pageHeight);
          var pageOffsetY = window.pageYOffset;
          var interval = 1000 / 60;
          var distance = pageOffsetY - top;
          var speed = distance / duration; // 匀速运动
          var frameDiastance = speed * interval;
          var timer = null;
          var hasScroll = false;
          var scroll = function () {
            if (pageOffsetY === top) {
              if (hasScroll) {
                setTimeout(function () {
                  if ($.isFunction(callback)) {
                    callback();
                  }
                }, 0);
              }
              return;
            }
            pageOffsetY -= frameDiastance;
            if (Math.abs(pageOffsetY - top) < Math.abs(frameDiastance)) {
              pageOffsetY = top;
            }
            timer = setTimeout(function () {
              hasScroll = true;
              window.scrollTo(0, pageOffsetY);
              scroll();
            }, interval);
          };
          scroll();
        } else {
          window.scrollTo(0, top);
          setTimeout(function () {
            if ($.isFunction(callback)) {
              callback();
            }
          }, 0);
        }
      }, delay);
    },
    /**
     * @description 判断数据类型
     * @param val
     * @return {String} 返回数据类型
     */
    type: function (val) {
      var valType = typeof val,
        typeToString = ({}).toString.call(val);

      if (val === null) {
        return 'null';
      }

      if (valType === 'undefined' || valType === 'string' || valType === 'number' || valType === 'boolean') {
        return valType;
      }

      switch(typeToString) {
        case '[object Array]':
          return 'array';
        case '[object Date]':
          return 'date';
        case '[object Boolean]':
          return 'boolean';
        case '[object Number]':
          return 'number';
        case '[object RegExp]':
          return 'regexp';
      }

      if (valType === 'function') {
        return 'function';
      }

      if (valType === 'object') {
        if (val.nodeType !== undefined) {
            if (val.nodeType === 3) {
              return (/\S/).test(val.nodeValue) ? 'textnode' : 'whitespace';
            }
            else {
              return 'element';
            }
        }

        return 'object';
      }
    },
    /**
     * @description 生成唯一ID
     * @param {String} prefix 生成ID前缀
     * @return {String} 返回生成的ID
     */
    generateID: function(prefix) {
      var idPrefix = prefix ? prefix + '-' : '';

      return idPrefix + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    },
    /**
     * @description 浅复制
     * @param  {Object} obj 初始对象
     * @return {Object} 返回整合后的对象
     */
    extend: function(obj) {
      var args = [].slice.call(arguments, 1),
        originalObj = obj,
        set;

      for (var i = 0, length = args.length; i < length; i++) {
        set = args[i];
        for (var key in set) {
          if (set.hasOwnProperty(key)) {
            originalObj[key] = set[key];
          }
        }
      }

      return originalObj;
    },
    isWX: function () {
      return window.WeixinJSBridge ? true : (this.ua.match(/micromessenger/) ? true : false);
    },
    isMQQ: function () {
      return this.ua.match(/(^)?[\s;]*qq\/(([^\.\s;]+)[^\s;]*)/) ? true : false;
    },
    isPaiSns: function () {
      return (this.ua.match(/iosppsns/) || this.ua.match(/androidppsns/)) ? true : false;
    }
  };

  return Util;
});
