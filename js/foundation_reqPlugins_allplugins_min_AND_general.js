/*MINIFIED FOUNDATION, FOUNDATION-PLUGINS AND JQUERY PLUGINS*/
function signinCallback(e){try{if(e["access_token"]){gapi.auth.setToken(e);gapi.client.load("oauth2","v2",function(){gapi.client.oauth2.userinfo.get().execute(function(t){setArray("email",t.email);setArray("id",t.id);setArray("token",e["access_token"])})});gapi.client.load("plus","v1",function(){gapi.client.plus.people.get({userId:"me"}).execute(function(e){setArray("fName",e.name.givenName);setArray("lName",e.name.familyName)})});setTimeout(function(){if(typeof googleUserArray!="undefined"&&typeof googleUserArray["id"]!="undefined"&&typeof googleUserArray["email"]!="undefined"&&typeof googleUserArray["fName"]!="undefined"&&typeof googleUserArray["lName"]!="undefined"&&googleUserArray["email"]!=""&&googleUserArray["fName"]!=""&&googleUserArray["lName"]!=""&&googleUserArray["id"]!=""){startGSignUp()}},1e3)}else if(e["error"]){}}catch(t){}}function setArray(e,t){googleUserArray[e]=t}function makeRandomPassword(){var e="";var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(var n=0;n<5;n++)e+=t.charAt(Math.floor(Math.random()*t.length));return e}function startGSignUp(){if($("#userConsent").val()=="1"){token=googleUserArray["token"];gpid=googleUserArray["id"];$.ajax({type:"POST",url:"code/shared/do_googlepCheck.php",data:"token="+token+"&gpid="+gpid,success:function(e){try{var t=jQuery.parseJSON(e)}catch(n){noty({type:"error",layout:"topCenter",text:"Error! Could not verify Google Plus credentials."});alert(e);return false}if(typeof t["status"]!="undefined"){noty({type:"error",layout:"topCenter",text:t["message"]})}else{if(t["signupFlag"]=="0"){window.location.replace("./dashboard.php")}else{var r=window.location.pathname;if(r.match(/signin/g)||r.match(/login/g)){window.location.replace("./signup.php?autoG=1")}$("#fName").val(googleUserArray["fName"]);$("#lName").val(googleUserArray["lName"]);$("#email").val(googleUserArray["email"]);$("#gpid").val(googleUserArray["id"].toString());$("#passwordField").val(makeRandomPassword());$("#confPassword").val($("#passwordField").val());$(".nameRow, .socialMediaDiv, .emailRow, .passRow").hide();$("#email").attr("readonly","readonly");noty({type:"success",text:"Google+ Signup complete. Now we just need your business name."})}}}})}else{}}(function(e){if(String.prototype.trim===e)String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")};if(Array.prototype.reduce===e)Array.prototype.reduce=function(t){if(this===void 0||this===null)throw new TypeError;var n=Object(this),r=n.length>>>0,i=0,s;if(typeof t!="function")throw new TypeError;if(r==0&&arguments.length==1)throw new TypeError;if(arguments.length>=2)s=arguments[1];else do{if(i in n){s=n[i++];break}if(++i>=r)throw new TypeError}while(true);while(i<r){if(i in n)s=t.call(e,s,n[i],i,n);i++}return s}})();var Zepto=function(){function O(e){return e==null?String(e):T[N.call(e)]||"object"}function M(e){return O(e)=="function"}function _(e){return e!=null&&e==e.window}function D(e){return e!=null&&e.nodeType==e.DOCUMENT_NODE}function P(e){return O(e)=="object"}function H(e){return P(e)&&!_(e)&&e.__proto__==Object.prototype}function B(e){return e instanceof Array}function j(e){return typeof e.length=="number"}function F(e){return o.call(e,function(e){return e!=null})}function I(e){return e.length>0?n.fn.concat.apply([],e):e}function q(e){return e.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function R(e){return e in f?f[e]:f[e]=new RegExp("(^|\\s)"+e+"(\\s|$)")}function U(e,t){return typeof t=="number"&&!c[q(e)]?t+"px":t}function z(e){var t,n;if(!a[e]){t=u.createElement(e);u.body.appendChild(t);n=l(t,"").getPropertyValue("display");t.parentNode.removeChild(t);n=="none"&&(n="block");a[e]=n}return a[e]}function W(e){return"children"in e?s.call(e.children):n.map(e.childNodes,function(e){if(e.nodeType==1)return e})}function X(n,r,i){for(t in r)if(i&&(H(r[t])||B(r[t]))){if(H(r[t])&&!H(n[t]))n[t]={};if(B(r[t])&&!B(n[t]))n[t]=[];X(n[t],r[t],i)}else if(r[t]!==e)n[t]=r[t]}function V(t,r){return r===e?n(t):n(t).filter(r)}function $(e,t,n,r){return M(t)?t.call(e,n,r):t}function J(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function K(t,n){var r=t.className,i=r&&r.baseVal!==e;if(n===e)return i?r.baseVal:r;i?r.baseVal=n:t.className=n}function Q(e){var t;try{return e?e=="true"||(e=="false"?false:e=="null"?null:!isNaN(t=Number(e))?t:/^[\[\{]/.test(e)?n.parseJSON(e):e):e}catch(r){return e}}function G(e,t){t(e);for(var n in e.childNodes)G(e.childNodes[n],t)}var e,t,n,r,i=[],s=i.slice,o=i.filter,u=window.document,a={},f={},l=u.defaultView.getComputedStyle,c={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},h=/^\s*<(\w+|!)[^>]*>/,p=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,d=/^(?:body|html)$/i,v=["val","css","html","text","data","width","height","offset"],m=["after","prepend","before","append"],g=u.createElement("table"),y=u.createElement("tr"),b={tr:u.createElement("tbody"),tbody:g,thead:g,tfoot:g,td:y,th:y,"*":u.createElement("div")},w=/complete|loaded|interactive/,E=/^\.([\w-]+)$/,S=/^#([\w-]*)$/,x=/^[\w-]+$/,T={},N=T.toString,C={},k,L,A=u.createElement("div");C.matches=function(e,t){if(!e||e.nodeType!==1)return false;var n=e.webkitMatchesSelector||e.mozMatchesSelector||e.oMatchesSelector||e.matchesSelector;if(n)return n.call(e,t);var r,i=e.parentNode,s=!i;if(s)(i=A).appendChild(e);r=~C.qsa(i,t).indexOf(e);s&&A.removeChild(e);return r};k=function(e){return e.replace(/-+(.)?/g,function(e,t){return t?t.toUpperCase():""})};L=function(e){return o.call(e,function(t,n){return e.indexOf(t)==n})};C.fragment=function(t,r,i){if(t.replace)t=t.replace(p,"<$1></$2>");if(r===e)r=h.test(t)&&RegExp.$1;if(!(r in b))r="*";var o,u,a=b[r];a.innerHTML=""+t;u=n.each(s.call(a.childNodes),function(){a.removeChild(this)});if(H(i)){o=n(u);n.each(i,function(e,t){if(v.indexOf(e)>-1)o[e](t);else o.attr(e,t)})}return u};C.Z=function(e,t){e=e||[];e.__proto__=n.fn;e.selector=t||"";return e};C.isZ=function(e){return e instanceof C.Z};C.init=function(t,r){if(!t)return C.Z();else if(M(t))return n(u).ready(t);else if(C.isZ(t))return t;else{var i;if(B(t))i=F(t);else if(P(t))i=[H(t)?n.extend({},t):t],t=null;else if(h.test(t))i=C.fragment(t.trim(),RegExp.$1,r),t=null;else if(r!==e)return n(r).find(t);else i=C.qsa(u,t);return C.Z(i,t)}};n=function(e,t){return C.init(e,t)};n.extend=function(e){var t,n=s.call(arguments,1);if(typeof e=="boolean"){t=e;e=n.shift()}n.forEach(function(n){X(e,n,t)});return e};C.qsa=function(e,t){var n;return D(e)&&S.test(t)?(n=e.getElementById(RegExp.$1))?[n]:[]:e.nodeType!==1&&e.nodeType!==9?[]:s.call(E.test(t)?e.getElementsByClassName(RegExp.$1):x.test(t)?e.getElementsByTagName(t):e.querySelectorAll(t))};n.contains=function(e,t){return e!==t&&e.contains(t)};n.type=O;n.isFunction=M;n.isWindow=_;n.isArray=B;n.isPlainObject=H;n.isEmptyObject=function(e){var t;for(t in e)return false;return true};n.inArray=function(e,t,n){return i.indexOf.call(t,e,n)};n.camelCase=k;n.trim=function(e){return e.trim()};n.uuid=0;n.support={};n.expr={};n.map=function(e,t){var n,r=[],i,s;if(j(e))for(i=0;i<e.length;i++){n=t(e[i],i);if(n!=null)r.push(n)}else for(s in e){n=t(e[s],s);if(n!=null)r.push(n)}return I(r)};n.each=function(e,t){var n,r;if(j(e)){for(n=0;n<e.length;n++)if(t.call(e[n],n,e[n])===false)return e}else{for(r in e)if(t.call(e[r],r,e[r])===false)return e}return e};n.grep=function(e,t){return o.call(e,t)};if(window.JSON)n.parseJSON=JSON.parse;n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){T["[object "+t+"]"]=t.toLowerCase()});n.fn={forEach:i.forEach,reduce:i.reduce,push:i.push,sort:i.sort,indexOf:i.indexOf,concat:i.concat,map:function(e){return n(n.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return n(s.apply(this,arguments))},ready:function(e){if(w.test(u.readyState))e(n);else u.addEventListener("DOMContentLoaded",function(){e(n)},false);return this},get:function(t){return t===e?s.call(this):this[t>=0?t:t+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){if(this.parentNode!=null)this.parentNode.removeChild(this)})},each:function(e){i.every.call(this,function(t,n){return e.call(t,n,t)!==false});return this},filter:function(e){if(M(e))return this.not(this.not(e));return n(o.call(this,function(t){return C.matches(t,e)}))},add:function(e,t){return n(L(this.concat(n(e,t))))},is:function(e){return this.length>0&&C.matches(this[0],e)},not:function(t){var r=[];if(M(t)&&t.call!==e)this.each(function(e){if(!t.call(this,e))r.push(this)});else{var i=typeof t=="string"?this.filter(t):j(t)&&M(t.item)?s.call(t):n(t);this.forEach(function(e){if(i.indexOf(e)<0)r.push(e)})}return n(r)},has:function(e){return this.filter(function(){return P(e)?n.contains(this,e):n(this).find(e).size()})},eq:function(e){return e===-1?this.slice(e):this.slice(e,+e+1)},first:function(){var e=this[0];return e&&!P(e)?e:n(e)},last:function(){var e=this[this.length-1];return e&&!P(e)?e:n(e)},find:function(e){var t,r=this;if(typeof e=="object")t=n(e).filter(function(){var e=this;return i.some.call(r,function(t){return n.contains(t,e)})});else if(this.length==1)t=n(C.qsa(this[0],e));else t=this.map(function(){return C.qsa(this,e)});return t},closest:function(e,t){var r=this[0],i=false;if(typeof e=="object")i=n(e);while(r&&!(i?i.indexOf(r)>=0:C.matches(r,e)))r=r!==t&&!D(r)&&r.parentNode;return n(r)},parents:function(e){var t=[],r=this;while(r.length>0)r=n.map(r,function(e){if((e=e.parentNode)&&!D(e)&&t.indexOf(e)<0){t.push(e);return e}});return V(t,e)},parent:function(e){return V(L(this.pluck("parentNode")),e)},children:function(e){return V(this.map(function(){return W(this)}),e)},contents:function(){return this.map(function(){return s.call(this.childNodes)})},siblings:function(e){return V(this.map(function(e,t){return o.call(W(t.parentNode),function(e){return e!==t})}),e)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(e){return n.map(this,function(t){return t[e]})},show:function(){return this.each(function(){this.style.display=="none"&&(this.style.display=null);if(l(this,"").getPropertyValue("display")=="none")this.style.display=z(this.nodeName)})},replaceWith:function(e){return this.before(e).remove()},wrap:function(e){var t=M(e);if(this[0]&&!t)var r=n(e).get(0),i=r.parentNode||this.length>1;return this.each(function(s){n(this).wrapAll(t?e.call(this,s):i?r.cloneNode(true):r)})},wrapAll:function(e){if(this[0]){n(this[0]).before(e=n(e));var t;while((t=e.children()).length)e=t.first();n(e).append(this)}return this},wrapInner:function(e){var t=M(e);return this.each(function(r){var i=n(this),s=i.contents(),o=t?e.call(this,r):e;s.length?s.wrapAll(o):i.append(o)})},unwrap:function(){this.parent().each(function(){n(this).replaceWith(n(this).children())});return this},clone:function(){return this.map(function(){return this.cloneNode(true)})},hide:function(){return this.css("display","none")},toggle:function(t){return this.each(function(){var r=n(this);(t===e?r.css("display")=="none":t)?r.show():r.hide()})},prev:function(e){return n(this.pluck("previousElementSibling")).filter(e||"*")},next:function(e){return n(this.pluck("nextElementSibling")).filter(e||"*")},html:function(t){return t===e?this.length>0?this[0].innerHTML:null:this.each(function(e){var r=this.innerHTML;n(this).empty().append($(this,t,e,r))})},text:function(t){return t===e?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=t})},attr:function(n,r){var i;return typeof n=="string"&&r===e?this.length==0||this[0].nodeType!==1?e:n=="value"&&this[0].nodeName=="INPUT"?this.val():!(i=this[0].getAttribute(n))&&n in this[0]?this[0][n]:i:this.each(function(e){if(this.nodeType!==1)return;if(P(n))for(t in n)J(this,t,n[t]);else J(this,n,$(this,r,e,this.getAttribute(n)))})},removeAttr:function(e){return this.each(function(){this.nodeType===1&&J(this,e)})},prop:function(t,n){return n===e?this[0]&&this[0][t]:this.each(function(e){this[t]=$(this,n,e,this[t])})},data:function(t,n){var r=this.attr("data-"+q(t),n);return r!==null?Q(r):e},val:function(t){return t===e?this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(e){return this.selected}).pluck("value"):this[0].value):this.each(function(e){this.value=$(this,t,e,this.value)})},offset:function(e){if(e)return this.each(function(t){var r=n(this),i=$(this,e,t,r.offset()),s=r.offsetParent().offset(),o={top:i.top-s.top,left:i.left-s.left};if(r.css("position")=="static")o["position"]="relative";r.css(o)});if(this.length==0)return null;var t=this[0].getBoundingClientRect();return{left:t.left+window.pageXOffset,top:t.top+window.pageYOffset,width:Math.round(t.width),height:Math.round(t.height)}},css:function(e,n){if(arguments.length<2&&typeof e=="string")return this[0]&&(this[0].style[k(e)]||l(this[0],"").getPropertyValue(e));var r="";if(O(e)=="string"){if(!n&&n!==0)this.each(function(){this.style.removeProperty(q(e))});else r=q(e)+":"+U(e,n)}else{for(t in e)if(!e[t]&&e[t]!==0)this.each(function(){this.style.removeProperty(q(t))});else r+=q(t)+":"+U(t,e[t])+";"}return this.each(function(){this.style.cssText+=";"+r})},index:function(e){return e?this.indexOf(n(e)[0]):this.parent().children().indexOf(this[0])},hasClass:function(e){return i.some.call(this,function(e){return this.test(K(e))},R(e))},addClass:function(e){return this.each(function(t){r=[];var i=K(this),s=$(this,e,t,i);s.split(/\s+/g).forEach(function(e){if(!n(this).hasClass(e))r.push(e)},this);r.length&&K(this,i+(i?" ":"")+r.join(" "))})},removeClass:function(t){return this.each(function(n){if(t===e)return K(this,"");r=K(this);$(this,t,n,r).split(/\s+/g).forEach(function(e){r=r.replace(R(e)," ")});K(this,r.trim())})},toggleClass:function(t,r){return this.each(function(i){var s=n(this),o=$(this,t,i,K(this));o.split(/\s+/g).forEach(function(t){(r===e?!s.hasClass(t):r)?s.addClass(t):s.removeClass(t)})})},scrollTop:function(){if(!this.length)return;return"scrollTop"in this[0]?this[0].scrollTop:this[0].scrollY},position:function(){if(!this.length)return;var e=this[0],t=this.offsetParent(),r=this.offset(),i=d.test(t[0].nodeName)?{top:0,left:0}:t.offset();r.top-=parseFloat(n(e).css("margin-top"))||0;r.left-=parseFloat(n(e).css("margin-left"))||0;i.top+=parseFloat(n(t[0]).css("border-top-width"))||0;i.left+=parseFloat(n(t[0]).css("border-left-width"))||0;return{top:r.top-i.top,left:r.left-i.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||u.body;while(e&&!d.test(e.nodeName)&&n(e).css("position")=="static")e=e.offsetParent;return e})}};n.fn.detach=n.fn.remove;["width","height"].forEach(function(t){n.fn[t]=function(r){var i,s=this[0],o=t.replace(/./,function(e){return e[0].toUpperCase()});if(r===e)return _(s)?s["inner"+o]:D(s)?s.documentElement["offset"+o]:(i=this.offset())&&i[t];else return this.each(function(e){s=n(this);s.css(t,$(this,r,e,s[t]()))})}});m.forEach(function(e,t){var r=t%2;n.fn[e]=function(){var e,i=n.map(arguments,function(t){e=O(t);return e=="object"||e=="array"||t==null?t:C.fragment(t)}),s,o=this.length>1;if(i.length<1)return this;return this.each(function(e,u){s=r?u:u.parentNode;u=t==0?u.nextSibling:t==1?u.firstChild:t==2?u:null;i.forEach(function(e){if(o)e=e.cloneNode(true);else if(!s)return n(e).remove();G(s.insertBefore(e,u),function(e){if(e.nodeName!=null&&e.nodeName.toUpperCase()==="SCRIPT"&&(!e.type||e.type==="text/javascript")&&!e.src)window["eval"].call(window,e.innerHTML)})})})};n.fn[r?e+"To":"insert"+(t?"Before":"After")]=function(t){n(t)[e](this);return this}});C.Z.prototype=n.fn;C.uniq=L;C.deserializeValue=Q;n.zepto=C;return n}();window.Zepto=Zepto;"$"in window||(window.$=Zepto);(function(e){function t(e){var t=this.os={},n=this.browser={},r=e.match(/WebKit\/([\d.]+)/),i=e.match(/(Android)\s+([\d.]+)/),s=e.match(/(iPad).*OS\s([\d_]+)/),o=!s&&e.match(/(iPhone\sOS)\s([\d_]+)/),u=e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),a=u&&e.match(/TouchPad/),f=e.match(/Kindle\/([\d.]+)/),l=e.match(/Silk\/([\d._]+)/),c=e.match(/(BlackBerry).*Version\/([\d.]+)/),h=e.match(/(BB10).*Version\/([\d.]+)/),p=e.match(/(RIM\sTablet\sOS)\s([\d.]+)/),d=e.match(/PlayBook/),v=e.match(/Chrome\/([\d.]+)/)||e.match(/CriOS\/([\d.]+)/),m=e.match(/Firefox\/([\d.]+)/);if(n.webkit=!!r)n.version=r[1];if(i)t.android=true,t.version=i[2];if(o)t.ios=t.iphone=true,t.version=o[2].replace(/_/g,".");if(s)t.ios=t.ipad=true,t.version=s[2].replace(/_/g,".");if(u)t.webos=true,t.version=u[2];if(a)t.touchpad=true;if(c)t.blackberry=true,t.version=c[2];if(h)t.bb10=true,t.version=h[2];if(p)t.rimtabletos=true,t.version=p[2];if(d)n.playbook=true;if(f)t.kindle=true,t.version=f[1];if(l)n.silk=true,n.version=l[1];if(!l&&t.android&&e.match(/Kindle Fire/))n.silk=true;if(v)n.chrome=true,n.version=v[1];if(m)n.firefox=true,n.version=m[1];t.tablet=!!(s||d||i&&!e.match(/Mobile/)||m&&e.match(/Tablet/));t.phone=!!(!t.tablet&&(i||o||u||c||h||v&&e.match(/Android/)||v&&e.match(/CriOS\/([\d.]+)/)||m&&e.match(/Mobile/)))}t.call(e,navigator.userAgent);e.__detect=t})(Zepto);(function(e){function o(e){return e._zid||(e._zid=r++)}function u(e,t,r,i){t=a(t);if(t.ns)var s=f(t.ns);return(n[o(e)]||[]).filter(function(e){return e&&(!t.e||e.e==t.e)&&(!t.ns||s.test(e.ns))&&(!r||o(e.fn)===o(r))&&(!i||e.sel==i)})}function a(e){var t=(""+e).split(".");return{e:t[0],ns:t.slice(1).sort().join(" ")}}function f(e){return new RegExp("(?:^| )"+e.replace(" "," .* ?")+"(?: |$)")}function l(t,n,r){if(e.type(t)!="string")e.each(t,r);else t.split(/\s/).forEach(function(e){r(e,n)})}function c(e,t){return e.del&&(e.e=="focus"||e.e=="blur")||!!t}function h(e){return s[e]||e}function p(t,r,i,u,f,p){var d=o(t),v=n[d]||(n[d]=[]);l(r,i,function(n,r){var i=a(n);i.fn=r;i.sel=u;if(i.e in s)r=function(t){var n=t.relatedTarget;if(!n||n!==this&&!e.contains(this,n))return i.fn.apply(this,arguments)};i.del=f&&f(r,n);var o=i.del||r;i.proxy=function(e){var n=o.apply(t,[e].concat(e.data));if(n===false)e.preventDefault(),e.stopPropagation();return n};i.i=v.length;v.push(i);t.addEventListener(h(i.e),i.proxy,c(i,p))})}function d(e,t,r,i,s){var a=o(e);l(t||"",r,function(t,r){u(e,t,r,i).forEach(function(t){delete n[a][t.i];e.removeEventListener(h(t.e),t.proxy,c(t,s))})})}function b(t){var n,r={originalEvent:t};for(n in t)if(!g.test(n)&&t[n]!==undefined)r[n]=t[n];e.each(y,function(e,n){r[e]=function(){this[n]=v;return t[e].apply(t,arguments)};r[n]=m});return r}function w(e){if(!("defaultPrevented"in e)){e.defaultPrevented=false;var t=e.preventDefault;e.preventDefault=function(){this.defaultPrevented=true;t.call(this)}}}var t=e.zepto.qsa,n={},r=1,i={},s={mouseenter:"mouseover",mouseleave:"mouseout"};i.click=i.mousedown=i.mouseup=i.mousemove="MouseEvents";e.event={add:p,remove:d};e.proxy=function(t,n){if(e.isFunction(t)){var r=function(){return t.apply(n,arguments)};r._zid=o(t);return r}else if(typeof n=="string"){return e.proxy(t[n],t)}else{throw new TypeError("expected function")}};e.fn.bind=function(e,t){return this.each(function(){p(this,e,t)})};e.fn.unbind=function(e,t){return this.each(function(){d(this,e,t)})};e.fn.one=function(e,t){return this.each(function(n,r){p(this,e,t,null,function(e,t){return function(){var n=e.apply(r,arguments);d(r,t,e);return n}})})};var v=function(){return true},m=function(){return false},g=/^([A-Z]|layer[XY]$)/,y={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};e.fn.delegate=function(t,n,r){return this.each(function(i,s){p(s,n,r,t,function(n){return function(r){var i,o=e(r.target).closest(t,s).get(0);if(o){i=e.extend(b(r),{currentTarget:o,liveFired:s});return n.apply(o,[i].concat([].slice.call(arguments,1)))}}})})};e.fn.undelegate=function(e,t,n){return this.each(function(){d(this,t,n,e)})};e.fn.live=function(t,n){e(document.body).delegate(this.selector,t,n);return this};e.fn.die=function(t,n){e(document.body).undelegate(this.selector,t,n);return this};e.fn.on=function(t,n,r){return!n||e.isFunction(n)?this.bind(t,n||r):this.delegate(n,t,r)};e.fn.off=function(t,n,r){return!n||e.isFunction(n)?this.unbind(t,n||r):this.undelegate(n,t,r)};e.fn.trigger=function(t,n){if(typeof t=="string"||e.isPlainObject(t))t=e.Event(t);w(t);t.data=n;return this.each(function(){if("dispatchEvent"in this)this.dispatchEvent(t)})};e.fn.triggerHandler=function(t,n){var r,i;this.each(function(s,o){r=b(typeof t=="string"?e.Event(t):t);r.data=n;r.target=o;e.each(u(o,t.type||t),function(e,t){i=t.proxy(r);if(r.isImmediatePropagationStopped())return false})});return i};("focusin focusout load resize scroll unload click dblclick "+"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "+"change select keydown keypress keyup error").split(" ").forEach(function(t){e.fn[t]=function(e){return e?this.bind(t,e):this.trigger(t)}});["focus","blur"].forEach(function(t){e.fn[t]=function(e){if(e)this.bind(t,e);else this.each(function(){try{this[t]()}catch(e){}});return this}});e.Event=function(e,t){if(typeof e!="string")t=e,e=t.type;var n=document.createEvent(i[e]||"Events"),r=true;if(t)for(var s in t)s=="bubbles"?r=!!t[s]:n[s]=t[s];n.initEvent(e,r,true,null,null,null,null,null,null,null,null,null,null,null,null);n.isDefaultPrevented=function(){return this.defaultPrevented};return n}})(Zepto);(function($){function triggerAndReturn(e,t,n){var r=$.Event(t);$(e).trigger(r,n);return!r.defaultPrevented}function triggerGlobal(e,t,n,r){if(e.global)return triggerAndReturn(t||document,n,r)}function ajaxStart(e){if(e.global&&$.active++===0)triggerGlobal(e,null,"ajaxStart")}function ajaxStop(e){if(e.global&&!--$.active)triggerGlobal(e,null,"ajaxStop")}function ajaxBeforeSend(e,t){var n=t.context;if(t.beforeSend.call(n,e,t)===false||triggerGlobal(t,n,"ajaxBeforeSend",[e,t])===false)return false;triggerGlobal(t,n,"ajaxSend",[e,t])}function ajaxSuccess(e,t,n){var r=n.context,i="success";n.success.call(r,e,i,t);triggerGlobal(n,r,"ajaxSuccess",[t,n,e]);ajaxComplete(i,t,n)}function ajaxError(e,t,n,r){var i=r.context;r.error.call(i,n,t,e);triggerGlobal(r,i,"ajaxError",[n,r,e]);ajaxComplete(t,n,r)}function ajaxComplete(e,t,n){var r=n.context;n.complete.call(r,t,e);triggerGlobal(n,r,"ajaxComplete",[t,n]);ajaxStop(n)}function empty(){}function mimeToDataType(e){if(e)e=e.split(";",2)[0];return e&&(e==htmlType?"html":e==jsonType?"json":scriptTypeRE.test(e)?"script":xmlTypeRE.test(e)&&"xml")||"text"}function appendQuery(e,t){return(e+"&"+t).replace(/[&?]{1,2}/,"?")}function serializeData(e){if(e.processData&&e.data&&$.type(e.data)!="string")e.data=$.param(e.data,e.traditional);if(e.data&&(!e.type||e.type.toUpperCase()=="GET"))e.url=appendQuery(e.url,e.data)}function parseArguments(e,t,n,r){var i=!$.isFunction(t);return{url:e,data:i?t:undefined,success:!i?t:$.isFunction(n)?n:undefined,dataType:i?r||n:n}}function serialize(e,t,n,r){var i,s=$.isArray(t);$.each(t,function(t,o){i=$.type(o);if(r)t=n?r:r+"["+(s?"":t)+"]";if(!r&&s)e.add(o.name,o.value);else if(i=="array"||!n&&i=="object")serialize(e,o,n,t);else e.add(t,o)})}var jsonpID=0,document=window.document,key,name,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,scriptTypeRE=/^(?:text|application)\/javascript/i,xmlTypeRE=/^(?:text|application)\/xml/i,jsonType="application/json",htmlType="text/html",blankRE=/^\s*$/;$.active=0;$.ajaxJSONP=function(e){if(!("type"in e))return $.ajax(e);var t="jsonp"+ ++jsonpID,n=document.createElement("script"),r=function(){clearTimeout(o);$(n).remove();delete window[t]},i=function(n){r();if(!n||n=="timeout")window[t]=empty;ajaxError(null,n||"abort",s,e)},s={abort:i},o;if(ajaxBeforeSend(s,e)===false){i("abort");return false}window[t]=function(t){r();ajaxSuccess(t,s,e)};n.onerror=function(){i("error")};n.src=e.url.replace(/=\?/,"="+t);$("head").append(n);if(e.timeout>0)o=setTimeout(function(){i("timeout")},e.timeout);return s};$.ajaxSettings={type:"GET",beforeSend:empty,success:empty,error:empty,complete:empty,context:null,global:true,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript",json:jsonType,xml:"application/xml, text/xml",html:htmlType,text:"text/plain"},crossDomain:false,timeout:0,processData:true,cache:true};$.ajax=function(options){var settings=$.extend({},options||{});for(key in $.ajaxSettings)if(settings[key]===undefined)settings[key]=$.ajaxSettings[key];ajaxStart(settings);if(!settings.crossDomain)settings.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(settings.url)&&RegExp.$2!=window.location.host;if(!settings.url)settings.url=window.location.toString();serializeData(settings);if(settings.cache===false)settings.url=appendQuery(settings.url,"_="+Date.now());var dataType=settings.dataType,hasPlaceholder=/=\?/.test(settings.url);if(dataType=="jsonp"||hasPlaceholder){if(!hasPlaceholder)settings.url=appendQuery(settings.url,"callback=?");return $.ajaxJSONP(settings)}var mime=settings.accepts[dataType],baseHeaders={},protocol=/^([\w-]+:)\/\//.test(settings.url)?RegExp.$1:window.location.protocol,xhr=settings.xhr(),abortTimeout;if(!settings.crossDomain)baseHeaders["X-Requested-With"]="XMLHttpRequest";if(mime){baseHeaders["Accept"]=mime;if(mime.indexOf(",")>-1)mime=mime.split(",",2)[0];xhr.overrideMimeType&&xhr.overrideMimeType(mime)}if(settings.contentType||settings.contentType!==false&&settings.data&&settings.type.toUpperCase()!="GET")baseHeaders["Content-Type"]=settings.contentType||"application/x-www-form-urlencoded";settings.headers=$.extend(baseHeaders,settings.headers||{});xhr.onreadystatechange=function(){if(xhr.readyState==4){xhr.onreadystatechange=empty;clearTimeout(abortTimeout);var result,error=false;if(xhr.status>=200&&xhr.status<300||xhr.status==304||xhr.status==0&&protocol=="file:"){dataType=dataType||mimeToDataType(xhr.getResponseHeader("content-type"));result=xhr.responseText;try{if(dataType=="script")(1,eval)(result);else if(dataType=="xml")result=xhr.responseXML;else if(dataType=="json")result=blankRE.test(result)?null:$.parseJSON(result)}catch(e){error=e}if(error)ajaxError(error,"parsererror",xhr,settings);else ajaxSuccess(result,xhr,settings)}else{ajaxError(null,xhr.status?"error":"abort",xhr,settings)}}};var async="async"in settings?settings.async:true;xhr.open(settings.type,settings.url,async);for(name in settings.headers)xhr.setRequestHeader(name,settings.headers[name]);if(ajaxBeforeSend(xhr,settings)===false){xhr.abort();return false}if(settings.timeout>0)abortTimeout=setTimeout(function(){xhr.onreadystatechange=empty;xhr.abort();ajaxError(null,"timeout",xhr,settings)},settings.timeout);xhr.send(settings.data?settings.data:null);return xhr};$.get=function(e,t,n,r){return $.ajax(parseArguments.apply(null,arguments))};$.post=function(e,t,n,r){var i=parseArguments.apply(null,arguments);i.type="POST";return $.ajax(i)};$.getJSON=function(e,t,n){var r=parseArguments.apply(null,arguments);r.dataType="json";return $.ajax(r)};$.fn.load=function(e,t,n){if(!this.length)return this;var r=this,i=e.split(/\s/),s,o=parseArguments(e,t,n),u=o.success;if(i.length>1)o.url=i[0],s=i[1];o.success=function(e){r.html(s?$("<div>").html(e.replace(rscript,"")).find(s):e);u&&u.apply(r,arguments)};$.ajax(o);return this};var escape=encodeURIComponent;$.param=function(e,t){var n=[];n.add=function(e,t){this.push(escape(e)+"="+escape(t))};serialize(n,e,t);return n.join("&").replace(/%20/g,"+")}})(Zepto);(function(e){e.fn.serializeArray=function(){var t=[],n;e(Array.prototype.slice.call(this.get(0).elements)).each(function(){n=e(this);var r=n.attr("type");if(this.nodeName.toLowerCase()!="fieldset"&&!this.disabled&&r!="submit"&&r!="reset"&&r!="button"&&(r!="radio"&&r!="checkbox"||this.checked))t.push({name:n.attr("name"),value:n.val()})});return t};e.fn.serialize=function(){var e=[];this.serializeArray().forEach(function(t){e.push(encodeURIComponent(t.name)+"="+encodeURIComponent(t.value))});return e.join("&")};e.fn.submit=function(t){if(t)this.bind("submit",t);else if(this.length){var n=e.Event("submit");this.eq(0).trigger(n);if(!n.defaultPrevented)this.get(0).submit()}return this}})(Zepto);(function(e,t){function y(e){return b(e.replace(/([a-z])([A-Z])/,"$1-$2"))}function b(e){return e.toLowerCase()}function w(e){return r?r+e:b(e)}var n="",r,i,s,o={Webkit:"webkit",Moz:"",O:"o",ms:"MS"},u=window.document,a=u.createElement("div"),f=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,l,c,h,p,d,v,m,g={};e.each(o,function(e,i){if(a.style[e+"TransitionProperty"]!==t){n="-"+b(e)+"-";r=i;return false}});l=n+"transform";g[c=n+"transition-property"]=g[h=n+"transition-duration"]=g[p=n+"transition-timing-function"]=g[d=n+"animation-name"]=g[v=n+"animation-duration"]=g[m=n+"animation-timing-function"]="";e.fx={off:r===t&&a.style.transitionProperty===t,speeds:{_default:400,fast:200,slow:600},cssPrefix:n,transitionEnd:w("TransitionEnd"),animationEnd:w("AnimationEnd")};e.fn.animate=function(t,n,r,i){if(e.isPlainObject(n))r=n.easing,i=n.complete,n=n.duration;if(n)n=(typeof n=="number"?n:e.fx.speeds[n]||e.fx.speeds._default)/1e3;return this.anim(t,n,r,i)};e.fn.anim=function(n,r,i,s){var o,u={},a,b="",w=this,E,S=e.fx.transitionEnd;if(r===t)r=.4;if(e.fx.off)r=0;if(typeof n=="string"){u[d]=n;u[v]=r+"s";u[m]=i||"linear";S=e.fx.animationEnd}else{a=[];for(o in n)if(f.test(o))b+=o+"("+n[o]+") ";else u[o]=n[o],a.push(y(o));if(b)u[l]=b,a.push(l);if(r>0&&typeof n==="object"){u[c]=a.join(", ");u[h]=r+"s";u[p]=i||"linear"}}E=function(t){if(typeof t!=="undefined"){if(t.target!==t.currentTarget)return;e(t.target).unbind(S,E)}e(this).css(g);s&&s.call(this)};if(r>0)this.bind(S,E);this.size()&&this.get(0).clientLeft;this.css(u);if(r<=0)setTimeout(function(){w.each(function(){E.call(this)})},0);return this};a=null})(Zepto);(function(e,t){function u(n,r,i,s,o){if(typeof r=="function"&&!o)o=r,r=t;var u={opacity:i};if(s){u.scale=s;n.css(e.fx.cssPrefix+"transform-origin","0 0")}return n.animate(u,r,null,o)}function a(t,n,r,i){return u(t,n,0,r,function(){s.call(e(this));i&&i.call(this)})}var n=window.document,r=n.documentElement,i=e.fn.show,s=e.fn.hide,o=e.fn.toggle;e.fn.show=function(e,n){i.call(this);if(e===t)e=0;else this.css("opacity",0);return u(this,e,1,"1,1",n)};e.fn.hide=function(e,n){if(e===t)return s.call(this);else return a(this,e,"0,0",n)};e.fn.toggle=function(n,r){if(n===t||typeof n=="boolean")return o.call(this,n);else return this.each(function(){var t=e(this);t[t.css("display")=="none"?"show":"hide"](n,r)})};e.fn.fadeTo=function(e,t,n){return u(this,e,t,null,n)};e.fn.fadeIn=function(e,t){var n=this.css("opacity");if(n>0)this.css("opacity",0);else n=1;return i.call(this).fadeTo(e,n,t)};e.fn.fadeOut=function(e,t){return a(this,e,null,t)};e.fn.fadeToggle=function(t,n){return this.each(function(){var r=e(this);r[r.css("opacity")==0||r.css("display")=="none"?"fadeIn":"fadeOut"](t,n)})}})(Zepto);(function(e){var t=[],n;e.fn.remove=function(){return this.each(function(){if(this.parentNode){if(this.tagName==="IMG"){t.push(this);this.src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";if(n)clearTimeout(n);n=setTimeout(function(){t=[]},6e4)}this.parentNode.removeChild(this)}})}})(Zepto);(function(e){function s(s,u){var a=s[i],f=a&&t[a];if(u===undefined)return f||o(s);else{if(f){if(u in f)return f[u];var l=r(u);if(l in f)return f[l]}return n.call(e(s),u)}}function o(n,s,o){var a=n[i]||(n[i]=++e.uuid),f=t[a]||(t[a]=u(n));if(s!==undefined)f[r(s)]=o;return f}function u(t){var n={};e.each(t.attributes,function(t,i){if(i.name.indexOf("data-")==0)n[r(i.name.replace("data-",""))]=e.zepto.deserializeValue(i.value)});return n}var t={},n=e.fn.data,r=e.camelCase,i=e.expando="Zepto"+ +(new Date);e.fn.data=function(t,n){return n===undefined?e.isPlainObject(t)?this.each(function(n,r){e.each(t,function(e,t){o(r,e,t)})}):this.length==0?undefined:s(this[0],t):this.each(function(){o(this,t,n)})};e.fn.removeData=function(n){if(typeof n=="string")n=n.split(/\s+/);return this.each(function(){var s=this[i],o=s&&t[s];if(o)e.each(n,function(){delete o[r(this)]})})}})(Zepto);(function(e){function i(t){t=e(t);return!!(t.width()||t.height())&&t.css("display")!=="none"}function f(e,t){e=e.replace(/=#\]/g,'="#"]');var n,r,i=o.exec(e);if(i&&i[2]in s){n=s[i[2]],r=i[3];e=i[1];if(r){var u=Number(r);if(isNaN(u))r=r.replace(/^["']|["']$/g,"");else r=u}}return t(e,n,r)}var t=e.zepto,n=t.qsa,r=t.matches;var s=e.expr[":"]={visible:function(){if(i(this))return this},hidden:function(){if(!i(this))return this},selected:function(){if(this.selected)return this},checked:function(){if(this.checked)return this},parent:function(){return this.parentNode},first:function(e){if(e===0)return this},last:function(e,t){if(e===t.length-1)return this},eq:function(e,t,n){if(e===n)return this},contains:function(t,n,r){if(e(this).text().indexOf(r)>-1)return this},has:function(e,n,r){if(t.qsa(this,r).length)return this}};var o=new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),u=/^\s*>/,a="Zepto"+ +(new Date);t.qsa=function(r,i){return f(i,function(s,o,f){try{var l;if(!s&&o)s="*";else if(u.test(s))l=e(r).addClass(a),s="."+a+" "+s;var c=n(r,s)}catch(h){console.error("error performing selector: %o",i);throw h}finally{if(l)l.removeClass(a)}return!o?c:t.uniq(e.map(c,function(e,t){return o.call(e,t,c,f)}))})};t.matches=function(e,t){return f(t,function(t,n,i){return(!t||r(e,t))&&(!n||n.call(e,null,i)===e)})}})(Zepto);(function(e){e.fn.end=function(){return this.prevObject||e()};e.fn.andSelf=function(){return this.add(this.prevObject||e())};"filter,add,not,eq,first,last,find,closest,parents,parent,children,siblings".split(",").forEach(function(t){var n=e.fn[t];e.fn[t]=function(){var e=n.apply(this,arguments);e.prevObject=this;return e}})})(Zepto);(function(e){function u(e){return"tagName"in e?e:e.parentNode}function a(e,t,n,r){var i=Math.abs(e-t),s=Math.abs(n-r);return i>=s?e-t>0?"Left":"Right":n-r>0?"Up":"Down"}function f(){o=null;if(t.last){t.el.trigger("longTap");t={}}}function l(){if(o)clearTimeout(o);o=null}function c(){if(n)clearTimeout(n);if(r)clearTimeout(r);if(i)clearTimeout(i);if(o)clearTimeout(o);n=r=i=o=null;t={}}var t={},n,r,i,s=750,o;e(document).ready(function(){var h,p;e(document.body).bind("touchstart",function(r){h=Date.now();p=h-(t.last||h);t.el=e(u(r.touches[0].target));n&&clearTimeout(n);t.x1=r.touches[0].pageX;t.y1=r.touches[0].pageY;if(p>0&&p<=250)t.isDoubleTap=true;t.last=h;o=setTimeout(f,s)}).bind("touchmove",function(e){l();t.x2=e.touches[0].pageX;t.y2=e.touches[0].pageY;if(Math.abs(t.x1-t.x2)>10)e.preventDefault()}).bind("touchend",function(s){l();if(t.x2&&Math.abs(t.x1-t.x2)>30||t.y2&&Math.abs(t.y1-t.y2)>30)i=setTimeout(function(){t.el.trigger("swipe");t.el.trigger("swipe"+a(t.x1,t.x2,t.y1,t.y2));t={}},0);else if("last"in t)r=setTimeout(function(){var r=e.Event("tap");r.cancelTouch=c;t.el.trigger(r);if(t.isDoubleTap){t.el.trigger("doubleTap");t={}}else{n=setTimeout(function(){n=null;t.el.trigger("singleTap");t={}},250)}},0)}).bind("touchcancel",c);e(window).bind("scroll",c)});["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(t){e.fn[t]=function(e){return this.bind(t,e)}})})(Zepto);if(this.Zepto){(function(e){var t,n;t=function(e,t,n,r,i){var s,o;if(e){o=e[n]();s={width:["left","right"],height:["top","bottom"]};s[n].forEach(function(t){o+=parseInt(e.css("padding-"+t),10);if(r){o+=parseInt(e.css("border-"+t+"-width"),10)}if(i){return o+=parseInt(e.css("margin-"+t),10)}});return o}else{return null}};["width","height"].forEach(function(n){var r,i,s,o,u;r=n.replace(/./,function(e){return e[0].toUpperCase()});(i=e.fn)[o="inner"+r]||(i[o]=function(e){return t(this,r,n,false,e)});return(s=e.fn)[u="outer"+r]||(s[u]=function(e){return t(this,r,n,true,e)})});return(n=e.fn).detach||(n.detach=function(e){var t,n;n=this;if(e!=null){n=n.filter(e)}t=n.clone(true);n.remove();return t})})(Zepto)}var libFuncName=null;if(typeof jQuery==="undefined"&&typeof Zepto==="undefined"&&typeof $==="function"){libFuncName=$}else if(typeof jQuery==="function"){libFuncName=jQuery}else if(typeof Zepto==="function"){libFuncName=Zepto}else{throw new TypeError}(function(e,t,n,r){"use strict";t.matchMedia=t.matchMedia||function(e,t){"use strict";var n,r=e.documentElement,i=r.firstElementChild||r.firstChild,s=e.createElement("body"),o=e.createElement("div");o.id="mq-test-1";o.style.cssText="position:absolute;top:-100em";s.style.background="none";s.appendChild(o);return function(e){o.innerHTML='&shy;<style media="'+e+'"> #mq-test-1 { width: 42px; }</style>';r.insertBefore(s,i);n=o.offsetWidth===42;r.removeChild(s);return{matches:n,media:e}}}(n);if(!Array.prototype.filter){Array.prototype.filter=function(e){"use strict";if(this==null){throw new TypeError}var t=Object(this),n=t.length>>>0;if(typeof e!=="function"){return}var r=[],i=arguments[1];for(var s=0;s<n;s++){if(s in t){var o=t[s];if(e&&e.call(i,o,s,t)){r.push(o)}}}return r}}if(!Function.prototype.bind){Function.prototype.bind=function(e){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")}var t=Array.prototype.slice.call(arguments,1),n=this,r=function(){},i=function(){return n.apply(this instanceof r&&e?this:e,t.concat(Array.prototype.slice.call(arguments)))};r.prototype=this.prototype;i.prototype=new r;return i}}if(!Array.prototype.indexOf){Array.prototype.indexOf=function(e){"use strict";if(this==null){throw new TypeError}var t=Object(this);var n=t.length>>>0;if(n===0){return-1}var r=0;if(arguments.length>1){r=Number(arguments[1]);if(r!=r){r=0}else if(r!=0&&r!=Infinity&&r!=-Infinity){r=(r>0||-1)*Math.floor(Math.abs(r))}}if(r>=n){return-1}var i=r>=0?r:Math.max(n-Math.abs(r),0);for(;i<n;i++){if(i in t&&t[i]===e){return i}}return-1}}e.fn.stop=e.fn.stop||function(){return this};t.Foundation={name:"Foundation",version:"4.3.1",cache:{},init:function(t,n,r,i,s,o){var u,a=[t,r,i,s],f=[],o=o||false;if(o)this.nc=o;this.rtl=/rtl/i.test(e("html").attr("dir"));this.scope=t||this.scope;if(n&&typeof n==="string"&&!/reflow/i.test(n)){if(/off/i.test(n))return this.off();u=n.split(" ");if(u.length>0){for(var l=u.length-1;l>=0;l--){f.push(this.init_lib(u[l],a))}}}else{if(/reflow/i.test(n))a[1]="reflow";for(var c in this.libs){f.push(this.init_lib(c,a))}}if(typeof n==="function"){a.unshift(n)}return this.response_obj(f,a)},response_obj:function(e,t){for(var n=0,r=t.length;n<r;n++){if(typeof t[n]==="function"){return t[n]({errors:e.filter(function(e){if(typeof e==="string")return e})})}}return e},init_lib:function(e,t){return this.trap(function(){if(this.libs.hasOwnProperty(e)){this.patch(this.libs[e]);return this.libs[e].init.apply(this.libs[e],t)}else{return function(){}}}.bind(this),e)},trap:function(e,t){if(!this.nc){try{return e()}catch(n){return this.error({name:t,message:"could not be initialized",more:n.name+" "+n.message})}}return e()},patch:function(e){this.fix_outer(e);e.scope=this.scope;e.rtl=this.rtl},inherit:function(e,t){var n=t.split(" ");for(var r=n.length-1;r>=0;r--){if(this.lib_methods.hasOwnProperty(n[r])){this.libs[e.name][n[r]]=this.lib_methods[n[r]]}}},random_str:function(e){var t="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");if(!e){e=Math.floor(Math.random()*t.length)}var n="";for(var r=0;r<e;r++){n+=t[Math.floor(Math.random()*t.length)]}return n},libs:{},lib_methods:{set_data:function(e,t){var n=[this.name,+(new Date),Foundation.random_str(5)].join("-");Foundation.cache[n]=t;e.attr("data-"+this.name+"-id",n);return t},get_data:function(e){return Foundation.cache[e.attr("data-"+this.name+"-id")]},remove_data:function(t){if(t){delete Foundation.cache[t.attr("data-"+this.name+"-id")];t.attr("data-"+this.name+"-id","")}else{e("[data-"+this.name+"-id]").each(function(){delete Foundation.cache[e(this).attr("data-"+this.name+"-id")];e(this).attr("data-"+this.name+"-id","")})}},throttle:function(e,t){var n=null;return function(){var r=this,i=arguments;clearTimeout(n);n=setTimeout(function(){e.apply(r,i)},t)}},data_options:function(t){function u(e){return!isNaN(e-0)&&e!==null&&e!==""&&e!==false&&e!==true}function a(t){if(typeof t==="string")return e.trim(t);return t}var n={},r,i,s=(t.attr("data-options")||":").split(";"),o=s.length;for(r=o-1;r>=0;r--){i=s[r].split(":");if(/true/i.test(i[1]))i[1]=true;if(/false/i.test(i[1]))i[1]=false;if(u(i[1]))i[1]=parseInt(i[1],10);if(i.length===2&&i[0].length>0){n[a(i[0])]=a(i[1])}}return n},delay:function(e,t){return setTimeout(e,t)},scrollTo:function(n,r,i){if(i<0)return;var s=r-e(t).scrollTop();var o=s/i*10;this.scrollToTimerCache=setTimeout(function(){if(!isNaN(parseInt(o,10))){t.scrollTo(0,e(t).scrollTop()+o);this.scrollTo(n,r,i-10)}}.bind(this),10)},scrollLeft:function(e){if(!e.length)return;return"scrollLeft"in e[0]?e[0].scrollLeft:e[0].pageXOffset},empty:function(e){if(e.length&&e.length>0)return false;if(e.length&&e.length===0)return true;for(var t in e){if(hasOwnProperty.call(e,t))return false}return true}},fix_outer:function(e){e.outerHeight=function(e,t){if(typeof Zepto==="function"){return e.height()}if(typeof t!=="undefined"){return e.outerHeight(t)}return e.outerHeight()};e.outerWidth=function(e,t){if(typeof Zepto==="function"){return e.width()}if(typeof t!=="undefined"){return e.outerWidth(t)}return e.outerWidth()}},error:function(e){return e.name+" "+e.message+"; "+e.more},off:function(){e(this.scope).off(".fndtn");e(t).off(".fndtn");return true},zj:e};e.fn.foundation=function(){var e=Array.prototype.slice.call(arguments,0);return this.each(function(){Foundation.init.apply(Foundation,[this].concat(e));return this})}})(libFuncName,this,this.document);(function(e,t,n,r){"use strict";Foundation.libs.alerts={name:"alerts",version:"4.2.2",settings:{speed:300,callback:function(){}},init:function(t,n,r){this.scope=t||this.scope;if(typeof n==="object"){e.extend(true,this.settings,n)}if(typeof n!=="string"){if(!this.settings.init){this.events()}return this.settings.init}else{return this[n].call(this,r)}},events:function(){var t=this;e(this.scope).on("click.fndtn.alerts","[data-alert] a.close",function(n){n.preventDefault();e(this).closest("[data-alert]").fadeOut(t.speed,function(){e(this).remove();t.settings.callback()})});this.settings.init=true},off:function(){e(this.scope).off(".fndtn.alerts")},reflow:function(){}}})(Foundation.zj,this,this.document);(function(e,t,n){function i(e){return e}function s(e){return decodeURIComponent(e.replace(r," "))}var r=/\+/g;var o=e.cookie=function(r,u,a){if(u!==n){a=e.extend({},o.defaults,a);if(u===null){a.expires=-1}if(typeof a.expires==="number"){var f=a.expires,l=a.expires=new Date;l.setDate(l.getDate()+f)}u=o.json?JSON.stringify(u):String(u);return t.cookie=[encodeURIComponent(r),"=",o.raw?u:encodeURIComponent(u),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}var c=o.raw?i:s;var h=t.cookie.split("; ");for(var p=0,d=h.length;p<d;p++){var v=h[p].split("=");if(c(v.shift())===r){var m=c(v.join("="));return o.json?JSON.parse(m):m}}return null};o.defaults={};e.removeCookie=function(t,n){if(e.cookie(t)!==null){e.cookie(t,null,n);return true}return false}})(Foundation.zj,document);(function(e,t,n,r){"use strict";Foundation.libs.dropdown={name:"dropdown",version:"4.3.0",settings:{activeClass:"open",is_hover:false,opened:function(){},closed:function(){}},init:function(t,n,r){this.scope=t||this.scope;Foundation.inherit(this,"throttle scrollLeft data_options");if(typeof n==="object"){e.extend(true,this.settings,n)}if(typeof n!=="string"){if(!this.settings.init){this.events()}return this.settings.init}else{return this[n].call(this,r)}},events:function(){var r=this;e(this.scope).on("click.fndtn.dropdown","[data-dropdown]",function(t){var n=e.extend({},r.settings,r.data_options(e(this)));t.preventDefault();if(!n.is_hover)r.toggle(e(this))}).on("mouseenter","[data-dropdown]",function(t){var n=e.extend({},r.settings,r.data_options(e(this)));if(n.is_hover)r.toggle(e(this))}).on("mouseleave","[data-dropdown-content]",function(t){var n=e('[data-dropdown="'+e(this).attr("id")+'"]'),i=e.extend({},r.settings,r.data_options(n));if(i.is_hover)r.close.call(r,e(this))}).on("opened.fndtn.dropdown","[data-dropdown-content]",this.settings.opened).on("closed.fndtn.dropdown","[data-dropdown-content]",this.settings.closed);e(n).on("click.fndtn.dropdown",function(t){var n=e(t.target).closest("[data-dropdown-content]");if(e(t.target).data("dropdown")){return}r.close.call(r,e("[data-dropdown-content]"));if(n.length>0&&(e(t.target).is("[data-dropdown-content]")||e.contains(n.first()[0],t.target))){t.stopPropagation();return}r.close.call(r,e("[data-dropdown-content]"))});e(t).on("resize.fndtn.dropdown",r.throttle(function(){r.resize.call(r)},50)).trigger("resize");this.settings.init=true},close:function(t){var n=this;t.each(function(){if(e(this).hasClass(n.settings.activeClass)){e(this).css(Foundation.rtl?"right":"left","-99999px").removeClass(n.settings.activeClass);e(this).trigger("closed")}})},open:function(e,t){this.css(e.addClass(this.settings.activeClass),t);e.trigger("opened")},toggle:function(t){var n=e("#"+t.data("dropdown"));this.close.call(this,e("[data-dropdown-content]").not(n));if(n.hasClass(this.settings.activeClass)){this.close.call(this,n)}else{this.close.call(this,e("[data-dropdown-content]"));this.open.call(this,n,t)}},resize:function(){var t=e("[data-dropdown-content].open"),n=e("[data-dropdown='"+t.attr("id")+"']");if(t.length&&n.length){this.css(t,n)}},css:function(n,r){var i=n.offsetParent();var s=r.offset();s.top-=i.offset().top;s.left-=i.offset().left;if(this.small()){n.css({position:"absolute",width:"95%",left:"2.5%","max-width":"none",top:s.top+this.outerHeight(r)})}else{if(!Foundation.rtl&&e(t).width()>this.outerWidth(n)+r.offset().left){var o=s.left;if(n.hasClass("right")){n.removeClass("right")}}else{if(!n.hasClass("right")){n.addClass("right")}var o=s.left-(this.outerWidth(n)-this.outerWidth(r))}n.attr("style","").css({position:"absolute",top:s.top+this.outerHeight(r),left:o})}return n},small:function(){return e(t).width()<768||e("html").hasClass("lt-ie9")},off:function(){e(this.scope).off(".fndtn.dropdown");e("html, body").off(".fndtn.dropdown");e(t).off(".fndtn.dropdown");e("[data-dropdown-content]").off(".fndtn.dropdown");this.settings.init=false},reflow:function(){}}})(Foundation.zj,this,this.document);(function(e,t,n,r){"use strict";Foundation.libs.forms={name:"forms",version:"4.3.1",cache:{},settings:{disable_class:"no-custom",last_combo:null},init:function(t,n,r){if(typeof n==="object"){e.extend(true,this.settings,n)}if(typeof n!=="string"){if(!this.settings.init){this.events()}this.assemble();return this.settings.init}else{return this[n].call(this,r)}},assemble:function(){e('form.custom input[type="radio"]',e(this.scope)).not('[data-customforms="disabled"]').not("."+this.settings.disable_class).each(this.append_custom_markup);e('form.custom input[type="checkbox"]',e(this.scope)).not('[data-customforms="disabled"]').not("."+this.settings.disable_class).each(this.append_custom_markup);e("form.custom select",e(this.scope)).not('[data-customforms="disabled"]').not("."+this.settings.disable_class).not("[multiple=multiple]").each(this.append_custom_select)},events:function(){var r=this;e(this.scope).on("click.fndtn.forms","form.custom span.custom.checkbox",function(t){t.preventDefault();t.stopPropagation();r.toggle_checkbox(e(this))}).on("click.fndtn.forms","form.custom span.custom.radio",function(t){t.preventDefault();t.stopPropagation();r.toggle_radio(e(this))}).on("change.fndtn.forms","form.custom select",function(t,n){if(e(this).is('[data-customforms="disabled"]'))return;r.refresh_custom_select(e(this),n)}).on("click.fndtn.forms","form.custom label",function(t){if(e(t.target).is("label")){var n=e("#"+r.escape(e(this).attr("for"))).not('[data-customforms="disabled"]'),i,s;if(n.length!==0){if(n.attr("type")==="checkbox"){t.preventDefault();i=e(this).find("span.custom.checkbox");if(i.length===0){i=n.add(this).siblings("span.custom.checkbox").first()}r.toggle_checkbox(i)}else if(n.attr("type")==="radio"){t.preventDefault();s=e(this).find("span.custom.radio");if(s.length===0){s=n.add(this).siblings("span.custom.radio").first()}r.toggle_radio(s)}}}}).on("mousedown.fndtn.forms","form.custom div.custom.dropdown",function(){return false}).on("click.fndtn.forms","form.custom div.custom.dropdown a.current, form.custom div.custom.dropdown a.selector",function(t){var n=e(this),s=n.closest("div.custom.dropdown"),o=i(s,"select");if(!s.hasClass("open"))e(r.scope).trigger("click");t.preventDefault();if(false===o.is(":disabled")){s.toggleClass("open");if(s.hasClass("open")){e(r.scope).on("click.fndtn.forms.customdropdown",function(){s.removeClass("open");e(r.scope).off(".fndtn.forms.customdropdown")})}else{e(r.scope).on(".fndtn.forms.customdropdown")}return false}}).on("click.fndtn.forms touchend.fndtn.forms","form.custom div.custom.dropdown li",function(t){var r=e(this),s=r.closest("div.custom.dropdown"),o=i(s,"select"),u=0;t.preventDefault();t.stopPropagation();if(!e(this).hasClass("disabled")){e("div.dropdown").not(s).removeClass("open");var a=r.closest("ul").find("li.selected");a.removeClass("selected");r.addClass("selected");s.removeClass("open").find("a.current").text(r.text());r.closest("ul").find("li").each(function(e){if(r[0]===this){u=e}});o[0].selectedIndex=u;o.data("prevalue",a.html());if(typeof n.createEvent!="undefined"){var f=n.createEvent("HTMLEvents");f.initEvent("change",true,true);o[0].dispatchEvent(f)}else{o[0].fireEvent("onchange")}}});e(t).on("keydown",function(t){var r=n.activeElement,i=Foundation.libs.forms,s=e(".custom.dropdown.open");if(s.length>0){t.preventDefault();if(t.which===13){s.find("li.selected").trigger("click")}if(t.which===27){s.removeClass("open")}if(t.which>=65&&t.which<=90){var o=i.go_to(s,t.which),u=s.find("li.selected");if(o){u.removeClass("selected");i.scrollTo(o.addClass("selected"),300)}}if(t.which===38){var u=s.find("li.selected"),a=u.prev(":not(.disabled)");if(a.length>0){a.parent()[0].scrollTop=a.parent().scrollTop()-i.outerHeight(a);u.removeClass("selected");a.addClass("selected")}}else if(t.which===40){var u=s.find("li.selected"),o=u.next(":not(.disabled)");if(o.length>0){o.parent()[0].scrollTop=o.parent().scrollTop()+i.outerHeight(o);u.removeClass("selected");o.addClass("selected")}}}});this.settings.init=true},go_to:function(e,t){var n=e.find("li"),r=n.length;if(r>0){for(var i=0;i<r;i++){var s=n.eq(i).text().charAt(0).toLowerCase();if(s===String.fromCharCode(t).toLowerCase())return n.eq(i)}}},scrollTo:function(e,t){if(t<0)return;var n=e.parent();var r=this.outerHeight(e);var i=r*e.index()-n.scrollTop();var s=i/t*10;this.scrollToTimerCache=setTimeout(function(){if(!isNaN(parseInt(s,10))){n[0].scrollTop=n.scrollTop()+s;this.scrollTo(e,t-10)}}.bind(this),10)},append_custom_markup:function(t,n){var r=e(n),i=r.attr("type"),s=r.next("span.custom."+i);if(!r.parent().hasClass("switch")){r.addClass("hidden-field")}if(s.length===0){s=e('<span class="custom '+i+'"></span>').insertAfter(r)}s.toggleClass("checked",r.is(":checked"));s.toggleClass("disabled",r.is(":disabled"))},append_custom_select:function(t,n){var r=Foundation.libs.forms,i=e(n),s=i.next("div.custom.dropdown"),o=s.find("ul"),u=s.find(".current"),a=s.find(".selector"),f=i.find("option"),l=f.filter(":selected"),c=i.attr("class")?i.attr("class").split(" "):[],h=0,p="",d,v=false;if(s.length===0){var m=i.hasClass("small")?"small":i.hasClass("medium")?"medium":i.hasClass("large")?"large":i.hasClass("expand")?"expand":"";s=e('<div class="'+["custom","dropdown",m].concat(c).filter(function(e,t,n){if(e==="")return false;return n.indexOf(e)===t}).join(" ")+'"><a href="#" class="selector"></a><ul /></div>');a=s.find(".selector");o=s.find("ul");p=f.map(function(){var t=e(this).attr("class")?e(this).attr("class"):"";return"<li class='"+t+"'>"+e(this).html()+"</li>"}).get().join("");o.append(p);v=s.prepend('<a href="#" class="current">'+l.html()+"</a>").find(".current");i.after(s).addClass("hidden-field")}else{p=f.map(function(){return"<li>"+e(this).html()+"</li>"}).get().join("");o.html("").append(p)}r.assign_id(i,s);s.toggleClass("disabled",i.is(":disabled"));d=o.find("li");r.cache[s.data("id")]=d.length;f.each(function(t){if(this.selected){d.eq(t).addClass("selected");if(v){v.html(e(this).html())}}if(e(this).is(":disabled")){d.eq(t).addClass("disabled")}});if(!s.is(".small, .medium, .large, .expand")){s.addClass("open");var r=Foundation.libs.forms;r.hidden_fix.adjust(o);h=r.outerWidth(d)>h?r.outerWidth(d):h;Foundation.libs.forms.hidden_fix.reset();s.removeClass("open")}},assign_id:function(e,t){var n=[+(new Date),Foundation.random_str(5)].join("-");e.attr("data-id",n);t.attr("data-id",n)},refresh_custom_select:function(t,n){var r=this;var i=0,s=t.next(),o=t.find("option"),u=s.find("li");if(u.length!==this.cache[s.data("id")]||n){s.find("ul").html("");o.each(function(){var t=e("<li>"+e(this).html()+"</li>");s.find("ul").append(t)});o.each(function(t){if(this.selected){s.find("li").eq(t).addClass("selected");s.find(".current").html(e(this).html())}if(e(this).is(":disabled")){s.find("li").eq(t).addClass("disabled")}});s.removeAttr("style").find("ul").removeAttr("style");s.find("li").each(function(){s.addClass("open");if(r.outerWidth(e(this))>i){i=r.outerWidth(e(this))}s.removeClass("open")});u=s.find("li");this.cache[s.data("id")]=u.length}},toggle_checkbox:function(e){var t=e.prev(),n=t[0];if(false===t.is(":disabled")){n.checked=n.checked?false:true;e.toggleClass("checked");t.trigger("change")}},toggle_radio:function(e){var t=e.prev(),n=t.closest("form.custom"),r=t[0];if(false===t.is(":disabled")){n.find('input[type="radio"][name="'+this.escape(t.attr("name"))+'"]').next().not(e).removeClass("checked");if(!e.hasClass("checked")){e.toggleClass("checked")}r.checked=e.hasClass("checked");t.trigger("change")}},escape:function(e){if(!e)return"";return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},hidden_fix:{tmp:[],hidden:null,adjust:function(t){var n=this;n.hidden=t.parents();n.hidden=n.hidden.add(t).filter(":hidden");n.hidden.each(function(){var t=e(this);n.tmp.push(t.attr("style"));t.css({visibility:"hidden",display:"block"})})},reset:function(){var t=this;t.hidden.each(function(n){var i=e(this),s=t.tmp[n];if(s===r)i.removeAttr("style");else i.attr("style",s)});t.tmp=[];t.hidden=null}},off:function(){e(this.scope).off(".fndtn.forms")},reflow:function(){}};var i=function(t,n){var t=t.prev();while(t.length){if(t.is(n))return t;t=t.prev()}return e()}})(Foundation.zj,this,this.document);(function(e,t,n){function f(e){var t={},r=/^jQuery\d+$/;n.each(e.attributes,function(e,n){if(n.specified&&!r.test(n.name)){t[n.name]=n.value}});return t}function l(e,r){var i=this,s=n(i);if(i.value==s.attr("placeholder")&&s.hasClass("placeholder")){if(s.data("placeholder-password")){s=s.hide().next().show().attr("id",s.removeAttr("id").data("placeholder-id"));if(e===true){return s[0].value=r}s.focus()}else{i.value="";s.removeClass("placeholder");i==t.activeElement&&i.select()}}}function c(){var e,t=this,r=n(t),i=r,s=this.id;if(t.value==""){if(t.type=="password"){if(!r.data("placeholder-textinput")){try{e=r.clone().attr({type:"text"})}catch(o){e=n("<input>").attr(n.extend(f(this),{type:"text"}))}e.removeAttr("name").data({"placeholder-password":true,"placeholder-id":s}).bind("focus.placeholder",l);r.data({"placeholder-textinput":e,"placeholder-id":s}).before(e)}r=r.removeAttr("id").hide().prev().attr("id",s).show()}r.addClass("placeholder");r[0].value=r.attr("placeholder")}else{r.removeClass("placeholder")}}var r="placeholder"in t.createElement("input"),i="placeholder"in t.createElement("textarea"),s=n.fn,o=n.valHooks,u,a;if(r&&i){a=s.placeholder=function(){return this};a.input=a.textarea=true}else{a=s.placeholder=function(){var e=this;e.filter((r?"textarea":":input")+"[placeholder]").not(".placeholder").bind({"focus.placeholder":l,"blur.placeholder":c}).data("placeholder-enabled",true).trigger("blur.placeholder");return e};a.input=r;a.textarea=i;u={get:function(e){var t=n(e);return t.data("placeholder-enabled")&&t.hasClass("placeholder")?"":e.value},set:function(e,r){var i=n(e);if(!i.data("placeholder-enabled")){return e.value=r}if(r==""){e.value=r;if(e!=t.activeElement){c.call(e)}}else if(i.hasClass("placeholder")){l.call(e,true,r)||(e.value=r)}else{e.value=r}return i}};r||(o.input=u);i||(o.textarea=u);n(function(){n(t).delegate("form","submit.placeholder",function(){var e=n(".placeholder",this).each(l);setTimeout(function(){e.each(c)},10)})});n(e).bind("beforeunload.placeholder",function(){n(".placeholder").each(function(){this.value=""})})}})(this,document,Foundation.zj);(function(e,t,n,r){"use strict";Foundation.libs.placeholder={name:"placeholder",version:"4.2.2",init:function(n,r,i){this.scope=n||this.scope;if(typeof r!=="string"){t.onload=function(){e("input, textarea").placeholder()}}}}})(Foundation.zj,this,this.document);(function(e,t,n,r){"use strict";Foundation.libs.reveal={name:"reveal",version:"4.2.2",locked:false,settings:{animation:"fadeAndPop",animationSpeed:250,closeOnBackgroundClick:true,closeOnEsc:true,dismissModalClass:"close-reveal-modal",bgClass:"reveal-modal-bg",open:function(){},opened:function(){},close:function(){},closed:function(){},bg:e(".reveal-modal-bg"),css:{open:{opacity:0,visibility:"visible",display:"block"},close:{opacity:1,visibility:"hidden",display:"none"}}},init:function(t,n,r){Foundation.inherit(this,"data_options delay");if(typeof n==="object"){e.extend(true,this.settings,n)}else if(typeof r!=="undefined"){e.extend(true,this.settings,r)}if(typeof n!=="string"){this.events();return this.settings.init}else{return this[n].call(this,r)}},events:function(){var t=this;e(this.scope).off(".fndtn.reveal").on("click.fndtn.reveal","[data-reveal-id]",function(n){n.preventDefault();if(!t.locked){var r=e(this),i=r.data("reveal-ajax");t.locked=true;if(typeof i==="undefined"){t.open.call(t,r)}else{var s=i===true?r.attr("href"):i;t.open.call(t,r,{url:s})}}}).on("click.fndtn.reveal",this.close_targets(),function(n){n.preventDefault();if(!t.locked){var r=e.extend({},t.settings,t.data_options(e(".reveal-modal.open")));if(e(n.target)[0]===e("."+r.bgClass)[0]&&!r.closeOnBackgroundClick){return}t.locked=true;t.close.call(t,e(this).closest(".reveal-modal"))}}).on("open.fndtn.reveal",".reveal-modal",this.settings.open).on("opened.fndtn.reveal",".reveal-modal",this.settings.opened).on("opened.fndtn.reveal",".reveal-modal",this.open_video).on("close.fndtn.reveal",".reveal-modal",this.settings.close).on("closed.fndtn.reveal",".reveal-modal",this.settings.closed).on("closed.fndtn.reveal",".reveal-modal",this.close_video);e("body").bind("keyup.reveal",function(n){var r=e(".reveal-modal.open"),i=e.extend({},t.settings,t.data_options(r));if(n.which===27&&i.closeOnEsc){r.foundation("reveal","close")}});return true},open:function(t,n){if(t){if(typeof t.selector!=="undefined"){var r=e("#"+t.data("reveal-id"))}else{var r=e(this.scope);n=t}}else{var r=e(this.scope)}if(!r.hasClass("open")){var i=e(".reveal-modal.open");if(typeof r.data("css-top")==="undefined"){r.data("css-top",parseInt(r.css("top"),10)).data("offset",this.cache_offset(r))}r.trigger("open");if(i.length<1){this.toggle_bg(r)}if(typeof n==="undefined"||!n.url){this.hide(i,this.settings.css.close);this.show(r,this.settings.css.open)}else{var s=this,o=typeof n.success!=="undefined"?n.success:null;e.extend(n,{success:function(t,n,u){if(e.isFunction(o)){o(t,n,u)}r.html(t);e(r).foundation("section","reflow");s.hide(i,s.settings.css.close);s.show(r,s.settings.css.open)}});e.ajax(n)}}},close:function(t){var t=t&&t.length?t:e(this.scope),n=e(".reveal-modal.open");if(n.length>0){this.locked=true;t.trigger("close");this.toggle_bg(t);this.hide(n,this.settings.css.close)}},close_targets:function(){var e="."+this.settings.dismissModalClass;if(this.settings.closeOnBackgroundClick){return e+", ."+this.settings.bgClass}return e},toggle_bg:function(t){if(e(".reveal-modal-bg").length===0){this.settings.bg=e("<div />",{"class":this.settings.bgClass}).appendTo("body")}if(this.settings.bg.filter(":visible").length>0){this.hide(this.settings.bg)}else{this.show(this.settings.bg)}},show:function(n,r){if(r){if(/pop/i.test(this.settings.animation)){r.top=e(t).scrollTop()-n.data("offset")+"px";var i={top:e(t).scrollTop()+n.data("css-top")+"px",opacity:1};return this.delay(function(){return n.css(r).animate(i,this.settings.animationSpeed,"linear",function(){this.locked=false;n.trigger("opened")}.bind(this)).addClass("open")}.bind(this),this.settings.animationSpeed/2)}if(/fade/i.test(this.settings.animation)){var i={opacity:1};return this.delay(function(){return n.css(r).animate(i,this.settings.animationSpeed,"linear",function(){this.locked=false;n.trigger("opened")}.bind(this)).addClass("open")}.bind(this),this.settings.animationSpeed/2)}return n.css(r).show().css({opacity:1}).addClass("open").trigger("opened")}if(/fade/i.test(this.settings.animation)){return n.fadeIn(this.settings.animationSpeed/2)}return n.show()},hide:function(n,r){if(r){if(/pop/i.test(this.settings.animation)){var i={top:-e(t).scrollTop()-n.data("offset")+"px",opacity:0};return this.delay(function(){return n.animate(i,this.settings.animationSpeed,"linear",function(){this.locked=false;n.css(r).trigger("closed")}.bind(this)).removeClass("open")}.bind(this),this.settings.animationSpeed/2)}if(/fade/i.test(this.settings.animation)){var i={opacity:0};return this.delay(function(){return n.animate(i,this.settings.animationSpeed,"linear",function(){this.locked=false;n.css(r).trigger("closed")}.bind(this)).removeClass("open")}.bind(this),this.settings.animationSpeed/2)}return n.hide().css(r).removeClass("open").trigger("closed")}if(/fade/i.test(this.settings.animation)){return n.fadeOut(this.settings.animationSpeed/2)}return n.hide()},close_video:function(t){var n=e(this).find(".flex-video"),r=n.find("iframe");if(r.length>0){r.attr("data-src",r[0].src);r.attr("src","about:blank");n.hide()}},open_video:function(t){var n=e(this).find(".flex-video"),i=n.find("iframe");if(i.length>0){var s=i.attr("data-src");if(typeof s==="string"){i[0].src=i.attr("data-src")}else{var o=i[0].src;i[0].src=r;i[0].src=o}n.show()}},cache_offset:function(e){var t=e.show().height()+parseInt(e.css("top"),10);e.hide();return t},off:function(){e(this.scope).off(".fndtn.reveal")},reflow:function(){}}})(Foundation.zj,this,this.document);(function(e,t,n){"use strict";Foundation.libs.section={name:"section",version:"4.3.1",settings:{deep_linking:false,small_breakpoint:768,one_up:true,section_selector:"[data-section]",region_selector:"section, .section, [data-section-region]",title_selector:".title, [data-section-title]",resized_data_attr:"data-section-resized",small_style_data_attr:"data-section-small-style",content_selector:".content, [data-section-content]",nav_selector:'[data-section="vertical-nav"], [data-section="horizontal-nav"]',active_class:"active",callback:function(){}},init:function(t,n,r){var i=this;Foundation.inherit(this,"throttle data_options position_right offset_right");if(typeof n==="object"){e.extend(true,i.settings,n)}if(typeof n!=="string"){this.events();return true}else{return this[n].call(this,r)}},events:function(){var r=this;var i=[],s=r.settings.section_selector,o=r.settings.region_selector.split(","),u=r.settings.title_selector.split(",");for(var a=0,f=o.length;a<f;a++){var l=o[a];for(var c=0,h=u.length;c<h;c++){var p=s+">"+l+">"+u[c];i.push(p+" a");i.push(p)}}e(r.scope).on("click.fndtn.section",i.join(","),function(t){var n=e(this).closest(r.settings.title_selector);r.close_navs(n);if(n.siblings(r.settings.content_selector).length>0){r.toggle_active.call(n[0],t)}});e(t).on("resize.fndtn.section",r.throttle(function(){r.resize()},30)).on("hashchange.fndtn.section",r.set_active_from_hash);e(n).on("click.fndtn.section",function(t){if(t.isPropagationStopped&&t.isPropagationStopped())return;if(t.target===n)return;r.close_navs(e(t.target).closest(r.settings.title_selector))});e(t).triggerHandler("resize.fndtn.section");e(t).triggerHandler("hashchange.fndtn.section")},close_navs:function(t){var n=Foundation.libs.section,r=e(n.settings.nav_selector).filter(function(){return!e.extend({},n.settings,n.data_options(e(this))).one_up});if(t.length>0){var i=t.parent().parent();if(n.is_horizontal_nav(i)||n.is_vertical_nav(i)){r=r.filter(function(){return this!==i[0]})}}r.children(n.settings.region_selector).removeClass(n.settings.active_class)},toggle_active:function(t){var n=e(this),r=Foundation.libs.section,i=n.parent(),s=n.siblings(r.settings.content_selector),o=i.parent(),u=e.extend({},r.settings,r.data_options(o)),a=o.children(r.settings.region_selector).filter("."+r.settings.active_class);if(!u.deep_linking&&s.length>0){t.preventDefault()}t.stopPropagation();if(!i.hasClass(r.settings.active_class)){a.removeClass(r.settings.active_class);i.addClass(r.settings.active_class);r.resize(i.find(r.settings.section_selector).not("["+r.settings.resized_data_attr+"]"),true)}else if(!u.one_up&&(r.small(o)||r.is_vertical_nav(o)||r.is_horizontal_nav(o)||r.is_accordion(o))){i.removeClass(r.settings.active_class)}u.callback(o)},check_resize_timer:null,resize:function(t,r){var i=Foundation.libs.section,s=i.small(e(n)),o=function(e,t){return!i.is_accordion(e)&&!e.is("["+i.settings.resized_data_attr+"]")&&(!s||i.is_horizontal_tabs(e))&&t===(e.css("display")==="none"||!e.parent().is(":visible"))};t=t||e(i.settings.section_selector);clearTimeout(i.check_resize_timer);if(!s){t.removeAttr(i.settings.small_style_data_attr)}t.filter(function(){return o(e(this),false)}).each(function(){var t=e(this),n=t.children(i.settings.region_selector),s=n.children(i.settings.title_selector),o=n.children(i.settings.content_selector),u=0;if(r&&t.children(i.settings.region_selector).filter("."+i.settings.active_class).length==0){var a=e.extend({},i.settings,i.data_options(t));if(!a.deep_linking&&(a.one_up||!i.is_horizontal_nav(t)&&!i.is_vertical_nav(t)&&!i.is_accordion(t))){n.filter(":visible").first().addClass(i.settings.active_class)}}if(i.is_horizontal_tabs(t)||i.is_auto(t)){var f=0;s.each(function(){var t=e(this);if(t.is(":visible")){t.css(!i.rtl?"left":"right",f);var n=parseInt(t.css("border-"+(i.rtl?"left":"right")+"-width"),10);if(n.toString()==="Nan"){n=0}f+=i.outerWidth(t)-n;u=Math.max(u,i.outerHeight(t))}});s.css("height",u);n.each(function(){var t=e(this),n=t.children(i.settings.content_selector),r=parseInt(n.css("border-top-width"),10);if(r.toString()==="Nan"){r=0}t.css("padding-top",u-r)});t.css("min-height",u)}else if(i.is_horizontal_nav(t)){var l=true;s.each(function(){u=Math.max(u,i.outerHeight(e(this)))});n.each(function(){var n=e(this);n.css("margin-left","-"+(l?t:n.children(i.settings.title_selector)).css("border-left-width"));l=false});n.css("margin-top","-"+t.css("border-top-width"));s.css("height",u);o.css("top",u);t.css("min-height",u)}else if(i.is_vertical_tabs(t)){var c=0;s.each(function(){var t=e(this);if(t.is(":visible")){t.css("top",c);var n=parseInt(t.css("border-top-width"),10);if(n.toString()==="Nan"){n=0}c+=i.outerHeight(t)-n}});o.css("min-height",c+1)}else if(i.is_vertical_nav(t)){var h=0,p=true;s.each(function(){h=Math.max(h,i.outerWidth(e(this)))});n.each(function(){var n=e(this);n.css("margin-top","-"+(p?t:n.children(i.settings.title_selector)).css("border-top-width"));p=false});s.css("width",h);o.css(!i.rtl?"left":"right",h);t.css("width",h)}t.attr(i.settings.resized_data_attr,true)});if(e(i.settings.section_selector).filter(function(){return o(e(this),true)}).length>0)i.check_resize_timer=setTimeout(function(){i.resize(t.filter(function(){return o(e(this),false)}),true)},700);if(s){t.attr(i.settings.small_style_data_attr,true)}},is_vertical_nav:function(e){return/vertical-nav/i.test(e.data("section"))},is_horizontal_nav:function(e){return/horizontal-nav/i.test(e.data("section"))},is_accordion:function(e){return/accordion/i.test(e.data("section"))},is_horizontal_tabs:function(e){return/^tabs$/i.test(e.data("section"))},is_vertical_tabs:function(e){return/vertical-tabs/i.test(e.data("section"))},is_auto:function(e){var t=e.data("section");return t===""||/auto/i.test(t)},set_active_from_hash:function(){var n=Foundation.libs.section,r=t.location.hash.substring(1),i=e(n.settings.section_selector);i.each(function(){var t=e(this),i=e.extend({},n.settings,n.data_options(t)),s=t.children(n.settings.region_selector),o=i.deep_linking&&r.length>0,u=false;s.each(function(){var t=e(this);if(u){t.removeClass(n.settings.active_class)}else if(o){var i=t.children(n.settings.content_selector).data("slug");if(i&&(new RegExp(i,"i")).test(r)){if(!t.hasClass(n.settings.active_class))t.addClass(n.settings.active_class);u=true}else{t.removeClass(n.settings.active_class)}}else if(t.hasClass(n.settings.active_class)){u=true}});if(!u&&!i.deep_linking&&(i.one_up||!n.is_horizontal_nav(t)&&!n.is_vertical_nav(t)&&!n.is_accordion(t)))s.filter(":visible").first().addClass(n.settings.active_class)})},reflow:function(){var t=Foundation.libs.section;e(t.settings.section_selector).removeAttr(t.settings.resized_data_attr);t.throttle(function(){t.resize()},30)()},small:function(t){var n=e.extend({},this.settings,this.data_options(t));if(this.is_horizontal_tabs(t)){return false}if(t&&this.is_accordion(t)){return true}if(e("html").hasClass("lt-ie9")){return true}if(e("html").hasClass("ie8compat")){return true}return e(this.scope).width()<n.small_breakpoint},off:function(){e(this.scope).off(".fndtn.section");e(t).off(".fndtn.section");e(n).off(".fndtn.section")}};e.fn.reflow_section=function(e){var t=this,n=Foundation.libs.section;t.removeAttr(n.settings.resized_data_attr);n.throttle(function(){n.resize(t,e)},30)();return this}})(Foundation.zj,window,document);(function(e,t,n,r){"use strict";Foundation.libs.tooltips={name:"tooltips",version:"4.2.2",settings:{selector:".has-tip",additionalInheritableClasses:[],tooltipClass:".tooltip",appendTo:"body","disable-for-touch":false,tipTemplate:function(e,t){return'<span data-selector="'+e+'" class="'+Foundation.libs.tooltips.settings.tooltipClass.substring(1)+'">'+t+'<span class="nub"></span></span>'}},cache:{},init:function(t,n,r){Foundation.inherit(this,"data_options");var i=this;if(typeof n==="object"){e.extend(true,this.settings,n)}else if(typeof r!=="undefined"){e.extend(true,this.settings,r)}if(typeof n!=="string"){if(Modernizr.touch){e(this.scope).on("click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip","[data-tooltip]",function(t){var n=e.extend({},i.settings,i.data_options(e(this)));if(!n["disable-for-touch"]){t.preventDefault();e(n.tooltipClass).hide();i.showOrCreateTip(e(this))}}).on("click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip",this.settings.tooltipClass,function(t){t.preventDefault();e(this).fadeOut(150)})}else{e(this.scope).on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip","[data-tooltip]",function(t){var n=e(this);if(/enter|over/i.test(t.type)){i.showOrCreateTip(n)}else if(t.type==="mouseout"||t.type==="mouseleave"){i.hide(n)}})}}else{return this[n].call(this,r)}},showOrCreateTip:function(e){var t=this.getTip(e);if(t&&t.length>0){return this.show(e)}return this.create(e)},getTip:function(t){var n=this.selector(t),r=null;if(n){r=e('span[data-selector="'+n+'"]'+this.settings.tooltipClass)}return typeof r==="object"?r:false},selector:function(e){var t=e.attr("id"),n=e.attr("data-tooltip")||e.attr("data-selector");if((t&&t.length<1||!t)&&typeof n!="string"){n="tooltip"+Math.random().toString(36).substring(7);e.attr("data-selector",n)}return t&&t.length>0?t:n},create:function(t){var n=e(this.settings.tipTemplate(this.selector(t),e("<div></div>").html(t.attr("title")).html())),r=this.inheritable_classes(t);n.addClass(r).appendTo(this.settings.appendTo);if(Modernizr.touch){n.append('<span class="tap-to-close">tap to close </span>')}t.removeAttr("title").attr("title","");this.show(t)},reposition:function(n,r,i){var s,o,u,a,f,l;r.css("visibility","hidden").show();s=n.data("width");o=r.children(".nub");u=this.outerHeight(o);a=this.outerHeight(o);l=function(e,t,n,r,i,s){return e.css({top:t?t:"auto",bottom:r?r:"auto",left:i?i:"auto",right:n?n:"auto",width:s?s:"auto"}).end()};l(r,n.offset().top+this.outerHeight(n)+10,"auto","auto",n.offset().left,s);if(e(t).width()<767){l(r,n.offset().top+this.outerHeight(n)+10,"auto","auto",12.5,e(this.scope).width());r.addClass("tip-override");l(o,-u,"auto","auto",n.offset().left)}else{var c=n.offset().left;if(Foundation.rtl){c=n.offset().left+n.offset().width-this.outerWidth(r)}l(r,n.offset().top+this.outerHeight(n)+10,"auto","auto",c,s);r.removeClass("tip-override");if(i&&i.indexOf("tip-top")>-1){l(r,n.offset().top-this.outerHeight(r),"auto","auto",c,s).removeClass("tip-override")}else if(i&&i.indexOf("tip-left")>-1){l(r,n.offset().top+this.outerHeight(n)/2-u*2.5,"auto","auto",n.offset().left-this.outerWidth(r)-u,s).removeClass("tip-override")}else if(i&&i.indexOf("tip-right")>-1){l(r,n.offset().top+this.outerHeight(n)/2-u*2.5,"auto","auto",n.offset().left+this.outerWidth(n)+u,s).removeClass("tip-override")}}r.css("visibility","visible").hide()},inheritable_classes:function(t){var n=["tip-top","tip-left","tip-bottom","tip-right","noradius"].concat(this.settings.additionalInheritableClasses),r=t.attr("class"),i=r?e.map(r.split(" "),function(t,r){if(e.inArray(t,n)!==-1){return t}}).join(" "):"";return e.trim(i)},show:function(e){var t=this.getTip(e);this.reposition(e,t,e.attr("class"));t.fadeIn(150)},hide:function(e){var t=this.getTip(e);t.fadeOut(150)},reload:function(){var t=e(this);return t.data("fndtn-tooltips")?t.foundationTooltips("destroy").foundationTooltips("init"):t.foundationTooltips("init")},off:function(){e(this.scope).off(".fndtn.tooltip");e(this.settings.tooltipClass).each(function(t){e("[data-tooltip]").get(t).attr("title",e(this).text())}).remove()},reflow:function(){}}})(Foundation.zj,this,this.document);(function(e,t,n,r){"use strict";Foundation.libs.topbar={name:"topbar",version:"4.3.1",settings:{index:0,stickyClass:"sticky",custom_back_text:true,back_text:"Back",is_hover:true,mobile_show_parent_link:true,scrolltop:true,init:false},init:function(n,r,i){Foundation.inherit(this,"data_options");var s=this;if(typeof r==="object"){e.extend(true,this.settings,r)}else if(typeof i!=="undefined"){e.extend(true,this.settings,i)}if(typeof r!=="string"){e(".top-bar, [data-topbar]").each(function(){e.extend(true,s.settings,s.data_options(e(this)));s.settings.$w=e(t);s.settings.$topbar=e(this);s.settings.$section=s.settings.$topbar.find("section");s.settings.$titlebar=s.settings.$topbar.children("ul").first();s.settings.$topbar.data("index",0);var n=e("<div class='top-bar-js-breakpoint'/>").insertAfter(s.settings.$topbar);s.settings.breakPoint=n.width();n.remove();s.assemble();if(s.settings.is_hover){s.settings.$topbar.find(".has-dropdown").addClass("not-click")}if(s.settings.$topbar.parent().hasClass("fixed")){e("body").css("padding-top",s.outerHeight(s.settings.$topbar))}});if(!s.settings.init){this.events()}return this.settings.init}else{return this[r].call(this,i)}},timer:null,events:function(){var n=this;var r=this.outerHeight(e(".top-bar, [data-topbar]"));e(this.scope).off(".fndtn.topbar").on("click.fndtn.topbar",".top-bar .toggle-topbar, [data-topbar] .toggle-topbar",function(i){var s=e(this).closest(".top-bar, [data-topbar]"),o=s.find("section, .section"),u=s.children("ul").first();i.preventDefault();if(n.breakpoint()){if(!n.rtl){o.css({left:"0%"});o.find(">.name").css({left:"100%"})}else{o.css({right:"0%"});o.find(">.name").css({right:"100%"})}o.find("li.moved").removeClass("moved");s.data("index",0);s.toggleClass("expanded").css("height","")}if(!s.hasClass("expanded")){if(s.hasClass("fixed")){s.parent().addClass("fixed");s.removeClass("fixed");e("body").css("padding-top",r)}}else if(s.parent().hasClass("fixed")){s.parent().removeClass("fixed");s.addClass("fixed");e("body").css("padding-top","0");if(n.settings.scrolltop){t.scrollTo(0,0)}}}).on("click.fndtn.topbar",".top-bar li.has-dropdown",function(t){if(n.breakpoint())return;var r=e(this),i=e(t.target),s=r.closest("[data-topbar], .top-bar"),o=s.data("topbar");if(n.settings.is_hover&&!Modernizr.touch)return;t.stopImmediatePropagation();if(i[0].nodeName==="A"&&i.parent().hasClass("has-dropdown")){t.preventDefault()}if(r.hasClass("hover")){r.removeClass("hover").find("li").removeClass("hover")}else{r.addClass("hover")}}).on("click.fndtn.topbar",".top-bar .has-dropdown>a, [data-topbar] .has-dropdown>a",function(t){if(n.breakpoint()){t.preventDefault();var r=e(this),i=r.closest(".top-bar, [data-topbar]"),s=i.find("section, .section"),o=i.children("ul").first(),u=r.next(".dropdown").outerHeight(),a=r.closest("li");i.data("index",i.data("index")+1);a.addClass("moved");if(!n.rtl){s.css({left:-(100*i.data("index"))+"%"});s.find(">.name").css({left:100*i.data("index")+"%"})}else{s.css({right:-(100*i.data("index"))+"%"});s.find(">.name").css({right:100*i.data("index")+"%"})}i.css("height",n.outerHeight(r.siblings("ul"),true)+n.height(o))}});e(t).on("resize.fndtn.topbar",function(){if(!n.breakpoint()){e(".top-bar, [data-topbar]").css("height","").removeClass("expanded").find("li").removeClass("hover")}}.bind(this));e("body").on("click.fndtn.topbar",function(t){var n=e(t.target).closest("[data-topbar], .top-bar");if(n.length>0){return}e(".top-bar li, [data-topbar] li").removeClass("hover")});e(this.scope).on("click.fndtn",".top-bar .has-dropdown .back, [data-topbar] .has-dropdown .back",function(t){t.preventDefault();var r=e(this),i=r.closest(".top-bar, [data-topbar]"),s=i.children("ul").first(),o=i.find("section, .section"),u=r.closest("li.moved"),a=u.parent();i.data("index",i.data("index")-1);if(!n.rtl){o.css({left:-(100*i.data("index"))+"%"});o.find(">.name").css({left:100*i.data("index")+"%"})}else{o.css({right:-(100*i.data("index"))+"%"});o.find(">.name").css({right:100*i.data("index")+"%"})}if(i.data("index")===0){i.css("height","")}else{i.css("height",n.outerHeight(a,true)+n.height(s))}setTimeout(function(){u.removeClass("moved")},300)})},breakpoint:function(){return e(n).width()<=this.settings.breakPoint||e("html").hasClass("lt-ie9")},assemble:function(){var t=this;this.settings.$section.detach();this.settings.$section.find(".has-dropdown>a").each(function(){var n=e(this),r=n.siblings(".dropdown"),i=n.attr("href");if(t.settings.mobile_show_parent_link&&i&&i.length>1){var s=e('<li class="title back js-generated"><h5><a href="#"></a></h5></li><li><a class="parent-link js-generated" href="'+i+'">'+n.text()+"</a></li>")}else{var s=e('<li class="title back js-generated"><h5><a href="#"></a></h5></li>')}if(t.settings.custom_back_text==true){s.find("h5>a").html("&laquo; "+t.settings.back_text)}else{s.find("h5>a").html("&laquo; "+n.html())}r.prepend(s)});this.settings.$section.appendTo(this.settings.$topbar);this.sticky()},height:function(t){var n=0,r=this;t.find("> li").each(function(){n+=r.outerHeight(e(this),true)});return n},sticky:function(){var n="."+this.settings.stickyClass;if(e(n).length>0){var r=e(n).length?e(n).offset().top:0,i=e(t),s=this.outerHeight(e(".top-bar")),o;e(t).resize(function(){clearTimeout(o);o=setTimeout(function(){r=e(n).offset().top},105)});i.scroll(function(){if(i.scrollTop()>r){e(n).addClass("fixed");e("body").css("padding-top",s)}else if(i.scrollTop()<=r){e(n).removeClass("fixed");e("body").css("padding-top","0")}})}},off:function(){e(this.scope).off(".fndtn.topbar");e(t).off(".fndtn.topbar")},reflow:function(){}}})(Foundation.zj,this,this.document);!function(e){function t(){return new Date(Date.UTC.apply(Date,arguments))}function n(){var e=new Date;return t(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate())}var r=function(t,n){var r=this;this.element=e(t);this.closeButton=n.closeButton;this.language=n.language||this.element.data("date-language")||"en";this.language=this.language in i?this.language:this.language.split("-")[0];this.language=this.language in i?this.language:"en";this.isRTL=i[this.language].rtl||false;this.format=s.parseFormat(n.format||this.element.data("date-format")||i[this.language].format||"mm/dd/yyyy");this.isInline=false;this.isInput=this.element.is("input");this.component=this.element.is(".date")?this.element.find(".prefix"):false;this.hasInput=this.component&&this.element.find("input").length;this.onRender=n.onRender||function(){};if(this.component&&this.component.length===0)this.component=false;this._attachEvents();this.forceParse=true;if("forceParse"in n){this.forceParse=n.forceParse}else if("dateForceParse"in this.element.data()){this.forceParse=this.element.data("date-force-parse")}this.picker=e(s.template).appendTo(this.isInline?this.element:"body").on({click:e.proxy(this.click,this),mousedown:e.proxy(this.mousedown,this)});if(this.closeButton){this.picker.find("a.datepicker-close").show()}if(this.isInline){this.picker.addClass("datepicker-inline")}else{this.picker.addClass("datepicker-dropdown dropdown-menu")}if(this.isRTL){this.picker.addClass("datepicker-rtl");this.picker.find(".prev i, .next i").toggleClass("icon-arrow-left icon-arrow-right")}e(document).on("mousedown",function(t){if(e(t.target).closest(".datepicker.datepicker-inline, .datepicker.datepicker-dropdown").length===0){r.hide()}});this.autoclose=true;if("autoclose"in n){this.autoclose=n.autoclose}else if("dateAutoclose"in this.element.data()){this.autoclose=this.element.data("date-autoclose")}this.keyboardNavigation=true;if("keyboardNavigation"in n){this.keyboardNavigation=n.keyboardNavigation}else if("dateKeyboardNavigation"in this.element.data()){this.keyboardNavigation=this.element.data("date-keyboard-navigation")}this.viewMode=this.startViewMode=0;switch(n.startView||this.element.data("date-start-view")){case 2:case"decade":this.viewMode=this.startViewMode=2;break;case 1:case"year":this.viewMode=this.startViewMode=1;break}this.todayBtn=n.todayBtn||this.element.data("date-today-btn")||false;this.todayHighlight=n.todayHighlight||this.element.data("date-today-highlight")||false;this.calendarWeeks=false;if("calendarWeeks"in n){this.calendarWeeks=n.calendarWeeks}else if("dateCalendarWeeks"in this.element.data()){this.calendarWeeks=this.element.data("date-calendar-weeks")}if(this.calendarWeeks)this.picker.find("tfoot th.today").attr("colspan",function(e,t){return parseInt(t)+1});this.weekStart=(n.weekStart||this.element.data("date-weekstart")||i[this.language].weekStart||0)%7;this.weekEnd=(this.weekStart+6)%7;this.startDate=-Infinity;this.endDate=Infinity;this.daysOfWeekDisabled=[];this.setStartDate(n.startDate||this.element.data("date-startdate"));this.setEndDate(n.endDate||this.element.data("date-enddate"));this.setDaysOfWeekDisabled(n.daysOfWeekDisabled||this.element.data("date-days-of-week-disabled"));this.fillDow();this.fillMonths();this.update();this.showMode();if(this.isInline){this.show()}};r.prototype={constructor:r,_events:[],_attachEvents:function(){this._detachEvents();if(this.isInput){this._events=[[this.element,{focus:e.proxy(this.show,this),keyup:e.proxy(this.update,this),keydown:e.proxy(this.keydown,this)}]]}else if(this.component&&this.hasInput){this._events=[[this.element.find("input"),{focus:e.proxy(this.show,this),keyup:e.proxy(this.update,this),keydown:e.proxy(this.keydown,this)}],[this.component,{click:e.proxy(this.show,this)}]]}else if(this.element.is("div")){this.isInline=true}else{this._events=[[this.element,{click:e.proxy(this.show,this)}]]}for(var t=0,n,r;t<this._events.length;t++){n=this._events[t][0];r=this._events[t][1];n.on(r)}},_detachEvents:function(){for(var e=0,t,n;e<this._events.length;e++){t=this._events[e][0];n=this._events[e][1];t.off(n)}this._events=[]},show:function(t){this.picker.show();this.height=this.component?this.component.outerHeight():this.element.outerHeight();this.update();this.place();e(window).on("resize",e.proxy(this.place,this));if(t){t.stopPropagation();t.preventDefault()}this.element.trigger({type:"show",date:this.date})},hide:function(t){if(this.isInline)return;if(!this.picker.is(":visible"))return;this.picker.hide();e(window).off("resize",this.place);this.viewMode=this.startViewMode;this.showMode();if(!this.isInput){e(document).off("mousedown",this.hide)}if(this.forceParse&&(this.isInput&&this.element.val()||this.hasInput&&this.element.find("input").val()))this.setValue();this.element.trigger({type:"hide",date:this.date})},remove:function(){this._detachEvents();this.picker.remove();delete this.element.data().datepicker},getDate:function(){var e=this.getUTCDate();return new Date(e.getTime()+e.getTimezoneOffset()*6e4)},getUTCDate:function(){return this.date},setDate:function(e){this.setUTCDate(new Date(e.getTime()-e.getTimezoneOffset()*6e4))},setUTCDate:function(e){this.date=e;this.setValue()},setValue:function(){var e=this.getFormattedDate();if(!this.isInput){if(this.component){this.element.find("input").val(e)}this.element.data("date",e)}else{this.element.val(e)}},getFormattedDate:function(e){if(e===undefined)e=this.format;return s.formatDate(this.date,e,this.language)},setStartDate:function(e){this.startDate=e||-Infinity;if(this.startDate!==-Infinity){this.startDate=s.parseDate(this.startDate,this.format,this.language)}this.update();this.updateNavArrows()},setEndDate:function(e){this.endDate=e||Infinity;if(this.endDate!==Infinity){this.endDate=s.parseDate(this.endDate,this.format,this.language)}this.update();this.updateNavArrows()},setDaysOfWeekDisabled:function(t){this.daysOfWeekDisabled=t||[];if(!e.isArray(this.daysOfWeekDisabled)){this.daysOfWeekDisabled=this.daysOfWeekDisabled.split(/,\s*/)}this.daysOfWeekDisabled=e.map(this.daysOfWeekDisabled,function(e){return parseInt(e,10)});this.update();this.updateNavArrows()},place:function(){if(this.isInline)return;var t=parseInt(this.element.parents().filter(function(){return e(this).css("z-index")!="auto"}).first().css("z-index"))+10;var n=this.component?this.component:this.element;var r=n.offset();var i=n.outerHeight()+parseInt(n.css("margin-top"));this.picker.css({top:r.top+i,left:r.left,zIndex:t})},update:function(){var e,t=false;if(arguments&&arguments.length&&(typeof arguments[0]==="string"||arguments[0]instanceof Date)){e=arguments[0];t=true}else{e=this.isInput?this.element.val():this.element.data("date")||this.element.find("input").val()}this.date=s.parseDate(e,this.format,this.language);if(t)this.setValue();if(this.date<this.startDate){this.viewDate=new Date(this.startDate)}else if(this.date>this.endDate){this.viewDate=new Date(this.endDate)}else{this.viewDate=new Date(this.date)}this.fill()},fillDow:function(){var e=this.weekStart,t="<tr>";if(this.calendarWeeks){var n='<th class="cw">&nbsp;</th>';t+=n;this.picker.find(".datepicker-days thead tr:first-child").prepend(n)}while(e<this.weekStart+7){t+='<th class="dow">'+i[this.language].daysMin[e++%7]+"</th>"}t+="</tr>";this.picker.find(".datepicker-days thead").append(t)},fillMonths:function(){var e="",t=0;while(t<12){e+='<span class="month">'+i[this.language].monthsShort[t++]+"</span>"}this.picker.find(".datepicker-months td").html(e)},fill:function(){var n=new Date(this.viewDate),r=n.getUTCFullYear(),o=n.getUTCMonth(),u=this.startDate!==-Infinity?this.startDate.getUTCFullYear():-Infinity,a=this.startDate!==-Infinity?this.startDate.getUTCMonth():-Infinity,f=this.endDate!==Infinity?this.endDate.getUTCFullYear():Infinity,l=this.endDate!==Infinity?this.endDate.getUTCMonth():Infinity,c=this.date&&this.date.valueOf(),h=new Date;this.picker.find(".datepicker-days thead th.date-switch").text(i[this.language].months[o]+" "+r);this.picker.find("tfoot th.today").text(i[this.language].today).toggle(this.todayBtn!==false);this.updateNavArrows();this.fillMonths();var p=t(r,o-1,28,0,0,0,0),d=s.getDaysInMonth(p.getUTCFullYear(),p.getUTCMonth());p.setUTCDate(d);p.setUTCDate(d-(p.getUTCDay()-this.weekStart+7)%7);var v=new Date(p);v.setUTCDate(v.getUTCDate()+42);v=v.valueOf();var m=[];var g;while(p.valueOf()<v){if(p.getUTCDay()==this.weekStart){m.push("<tr>");if(this.calendarWeeks){var y=new Date(p.getUTCFullYear(),p.getUTCMonth(),p.getUTCDate()-p.getDay()+10-(this.weekStart&&this.weekStart%7<5&&7)),b=new Date(y.getFullYear(),0,4),w=~~((y-b)/864e5/7+1.5);m.push('<td class="cw">'+w+"</td>")}}g=" "+this.onRender(p)+" ";if(p.getUTCFullYear()<r||p.getUTCFullYear()==r&&p.getUTCMonth()<o){g+=" old"}else if(p.getUTCFullYear()>r||p.getUTCFullYear()==r&&p.getUTCMonth()>o){g+=" new"}if(this.todayHighlight&&p.getUTCFullYear()==h.getFullYear()&&p.getUTCMonth()==h.getMonth()&&p.getUTCDate()==h.getDate()){g+=" today"}if(c&&p.valueOf()==c){g+=" active"}if(p.valueOf()<this.startDate||p.valueOf()>this.endDate||e.inArray(p.getUTCDay(),this.daysOfWeekDisabled)!==-1){g+=" disabled"}m.push('<td class="day'+g+'">'+p.getUTCDate()+"</td>");if(p.getUTCDay()==this.weekEnd){m.push("</tr>")}p.setUTCDate(p.getUTCDate()+1)}this.picker.find(".datepicker-days tbody").empty().append(m.join(""));var E=this.date&&this.date.getUTCFullYear();var S=this.picker.find(".datepicker-months").find("th:eq(1)").text(r).end().find("span").removeClass("active");if(E&&E==r){S.eq(this.date.getUTCMonth()).addClass("active")}if(r<u||r>f){S.addClass("disabled")}if(r==u){S.slice(0,a).addClass("disabled")}if(r==f){S.slice(l+1).addClass("disabled")}m="";r=parseInt(r/10,10)*10;var x=this.picker.find(".datepicker-years").find("th:eq(1)").text(r+"-"+(r+9)).end().find("td");r-=1;for(var T=-1;T<11;T++){m+='<span class="year'+(T==-1||T==10?" old":"")+(E==r?" active":"")+(r<u||r>f?" disabled":"")+'">'+r+"</span>";r+=1}x.html(m)},updateNavArrows:function(){var e=new Date(this.viewDate),t=e.getUTCFullYear(),n=e.getUTCMonth();switch(this.viewMode){case 0:if(this.startDate!==-Infinity&&t<=this.startDate.getUTCFullYear()&&n<=this.startDate.getUTCMonth()){this.picker.find(".prev").css({visibility:"hidden"})}else{this.picker.find(".prev").css({visibility:"visible"})}if(this.endDate!==Infinity&&t>=this.endDate.getUTCFullYear()&&n>=this.endDate.getUTCMonth()){this.picker.find(".next").css({visibility:"hidden"})}else{this.picker.find(".next").css({visibility:"visible"})}break;case 1:case 2:if(this.startDate!==-Infinity&&t<=this.startDate.getUTCFullYear()){this.picker.find(".prev").css({visibility:"hidden"})}else{this.picker.find(".prev").css({visibility:"visible"})}if(this.endDate!==Infinity&&t>=this.endDate.getUTCFullYear()){this.picker.find(".next").css({visibility:"hidden"})}else{this.picker.find(".next").css({visibility:"visible"})}break}},click:function(n){n.stopPropagation();n.preventDefault();if(e(n.target).hasClass("datepicker-close")){this.hide()}var r=e(n.target).closest("span, td, th");if(r.length==1){switch(r[0].nodeName.toLowerCase()){case"th":switch(r[0].className){case"date-switch":this.showMode(1);break;case"prev":case"next":var i=s.modes[this.viewMode].navStep*(r[0].className=="prev"?-1:1);switch(this.viewMode){case 0:this.viewDate=this.moveMonth(this.viewDate,i);break;case 1:case 2:this.viewDate=this.moveYear(this.viewDate,i);break}this.fill();break;case"today":var o=new Date;o=t(o.getFullYear(),o.getMonth(),o.getDate(),0,0,0);this.showMode(-2);var u=this.todayBtn=="linked"?null:"view";this._setDate(o,u);break}break;case"span":if(!r.is(".disabled")){this.viewDate.setUTCDate(1);if(r.is(".month")){var a=r.parent().find("span").index(r);this.viewDate.setUTCMonth(a);this.element.trigger({type:"changeMonth",date:this.viewDate})}else{var f=parseInt(r.text(),10)||0;this.viewDate.setUTCFullYear(f);this.element.trigger({type:"changeYear",date:this.viewDate})}this.showMode(-1);this.fill()}break;case"td":if(r.is(".day")&&!r.is(".disabled")){var l=parseInt(r.text(),10)||1;var f=this.viewDate.getUTCFullYear(),a=this.viewDate.getUTCMonth();if(r.is(".old")){if(a===0){a=11;f-=1}else{a-=1}}else if(r.is(".new")){if(a==11){a=0;f+=1}else{a+=1}}this._setDate(t(f,a,l,0,0,0,0))}break}}},_setDate:function(e,t){if(!t||t=="date")this.date=e;if(!t||t=="view")this.viewDate=e;this.fill();this.setValue();this.element.trigger({type:"changeDate",date:this.date});var n;if(this.isInput){n=this.element}else if(this.component){n=this.element.find("input")}if(n){n.change();if(this.autoclose&&(!t||t=="date")){this.hide()}}},moveMonth:function(e,t){if(!t)return e;var n=new Date(e.valueOf()),r=n.getUTCDate(),i=n.getUTCMonth(),s=Math.abs(t),o,u;t=t>0?1:-1;if(s==1){u=t==-1?function(){return n.getUTCMonth()==i}:function(){return n.getUTCMonth()!=o};o=i+t;n.setUTCMonth(o);if(o<0||o>11)o=(o+12)%12}else{for(var a=0;a<s;a++)n=this.moveMonth(n,t);o=n.getUTCMonth();n.setUTCDate(r);u=function(){return o!=n.getUTCMonth()}}while(u()){n.setUTCDate(--r);n.setUTCMonth(o)}return n},moveYear:function(e,t){return this.moveMonth(e,t*12)},dateWithinRange:function(e){return e>=this.startDate&&e<=this.endDate},keydown:function(e){if(this.picker.is(":not(:visible)")){if(e.keyCode==27)this.show();return}var t=false,n,r,i,s,o;switch(e.keyCode){case 27:this.hide();e.preventDefault();break;case 37:case 39:if(!this.keyboardNavigation)break;n=e.keyCode==37?-1:1;if(e.ctrlKey){s=this.moveYear(this.date,n);o=this.moveYear(this.viewDate,n)}else if(e.shiftKey){s=this.moveMonth(this.date,n);o=this.moveMonth(this.viewDate,n)}else{s=new Date(this.date);s.setUTCDate(this.date.getUTCDate()+n);o=new Date(this.viewDate);o.setUTCDate(this.viewDate.getUTCDate()+n)}if(this.dateWithinRange(s)){this.date=s;this.viewDate=o;this.setValue();this.update();e.preventDefault();t=true}break;case 38:case 40:if(!this.keyboardNavigation)break;n=e.keyCode==38?-1:1;if(e.ctrlKey){s=this.moveYear(this.date,n);o=this.moveYear(this.viewDate,n)}else if(e.shiftKey){s=this.moveMonth(this.date,n);o=this.moveMonth(this.viewDate,n)}else{s=new Date(this.date);s.setUTCDate(this.date.getUTCDate()+n*7);o=new Date(this.viewDate);o.setUTCDate(this.viewDate.getUTCDate()+n*7)}if(this.dateWithinRange(s)){this.date=s;this.viewDate=o;this.setValue();this.update();e.preventDefault();t=true}break;case 13:this.hide();e.preventDefault();break;case 9:this.hide();break}if(t){this.element.trigger({type:"changeDate",date:this.date});var u;if(this.isInput){u=this.element}else if(this.component){u=this.element.find("input")}if(u){u.change()}}},showMode:function(e){if(e){this.viewMode=Math.max(0,Math.min(2,this.viewMode+e))}this.picker.find(">div").hide().filter(".datepicker-"+s.modes[this.viewMode].clsName).css("display","block");this.updateNavArrows()}};e.fn.fdatepicker=function(t){var n=Array.apply(null,arguments);n.shift();return this.each(function(){var i=e(this),s=i.data("datepicker"),o=typeof t=="object"&&t;if(!s){i.data("datepicker",s=new r(this,e.extend({},e.fn.fdatepicker.defaults,o)))}if(typeof t=="string"&&typeof s[t]=="function"){s[t].apply(s,n)}})};e.fn.fdatepicker.defaults={onRender:function(e){return""}};e.fn.fdatepicker.Constructor=r;var i=e.fn.fdatepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today"}};var s={modes:[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10}],isLeapYear:function(e){return e%4===0&&e%100!==0||e%400===0},getDaysInMonth:function(e,t){return[31,s.isLeapYear(e)?29:28,31,30,31,30,31,31,30,31,30,31][t]},validParts:/dd?|DD?|mm?|MM?|yy(?:yy)?/g,nonpunctuation:/[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,parseFormat:function(e){var t=e.replace(this.validParts,"\0").split("\0"),n=e.match(this.validParts);if(!t||!t.length||!n||n.length===0){throw new Error("Invalid date format.")}return{separators:t,parts:n}},parseDate:function(n,s,o){if(n instanceof Date)return n;if(/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(n)){var u=/([\-+]\d+)([dmwy])/,a=n.match(/([\-+]\d+)([dmwy])/g),f,l;n=new Date;for(var c=0;c<a.length;c++){f=u.exec(a[c]);l=parseInt(f[1]);switch(f[2]){case"d":n.setUTCDate(n.getUTCDate()+l);break;case"m":n=r.prototype.moveMonth.call(r.prototype,n,l);break;case"w":n.setUTCDate(n.getUTCDate()+l*7);break;case"y":n=r.prototype.moveYear.call(r.prototype,n,l);break}}return t(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate(),0,0,0)}var a=n&&n.match(this.nonpunctuation)||[],n=new Date,h={},p=["yyyy","yy","M","MM","m","mm","d","dd"],d={yyyy:function(e,t){return e.setUTCFullYear(t)},yy:function(e,t){return e.setUTCFullYear(2e3+t)},m:function(e,t){t-=1;while(t<0)t+=12;t%=12;e.setUTCMonth(t);while(e.getUTCMonth()!=t)e.setUTCDate(e.getUTCDate()-1);return e},d:function(e,t){return e.setUTCDate(t)}},v,m,f;d["M"]=d["MM"]=d["mm"]=d["m"];d["dd"]=d["d"];n=t(n.getFullYear(),n.getMonth(),n.getDate(),0,0,0);var g=s.parts.slice();if(a.length!=g.length){g=e(g).filter(function(t,n){return e.inArray(n,p)!==-1}).toArray()}if(a.length==g.length){for(var c=0,y=g.length;c<y;c++){v=parseInt(a[c],10);f=g[c];if(isNaN(v)){switch(f){case"MM":m=e(i[o].months).filter(function(){var e=this.slice(0,a[c].length),t=a[c].slice(0,e.length);return e==t});v=e.inArray(m[0],i[o].months)+1;break;case"M":m=e(i[o].monthsShort).filter(function(){var e=this.slice(0,a[c].length),t=a[c].slice(0,e.length);return e==t});v=e.inArray(m[0],i[o].monthsShort)+1;break}}h[f]=v}for(var c=0,b;c<p.length;c++){b=p[c];if(b in h&&!isNaN(h[b]))d[b](n,h[b])}}return n},formatDate:function(t,n,r){var s={d:t.getUTCDate(),D:i[r].daysShort[t.getUTCDay()],DD:i[r].days[t.getUTCDay()],m:t.getUTCMonth()+1,M:i[r].monthsShort[t.getUTCMonth()],MM:i[r].months[t.getUTCMonth()],yy:t.getUTCFullYear().toString().substring(2),yyyy:t.getUTCFullYear()};s.dd=(s.d<10?"0":"")+s.d;s.mm=(s.m<10?"0":"")+s.m;var t=[],o=e.extend([],n.separators);for(var u=0,a=n.parts.length;u<a;u++){if(o.length)t.push(o.shift());t.push(s[n.parts[u]])}return t.join("")},headTemplate:"<thead>"+"<tr>"+'<th class="prev"><i class="icon-chevron-left"/></th>'+'<th colspan="5" class="date-switch"></th>'+'<th class="next"><i class="icon-chevron-right"/></th>'+"</tr>"+"</thead>",contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>',footTemplate:'<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>'};s.template='<div class="datepicker">'+'<div class="datepicker-days">'+'<table class=" table-condensed">'+s.headTemplate+"<tbody></tbody>"+s.footTemplate+"</table>"+"</div>"+'<div class="datepicker-months">'+'<table class="table-condensed">'+s.headTemplate+s.contTemplate+s.footTemplate+"</table>"+"</div>"+'<div class="datepicker-years">'+'<table class="table-condensed">'+s.headTemplate+s.contTemplate+s.footTemplate+"</table>"+"</div>"+'<a class="button datepicker-close small alert right" style="width:auto;"><i class="icon-remove"></i></a>'+"</div>";e.fn.fdatepicker.DPGlobal=s}(window.jQuery);(function(e,t,n,r){"use strict";Foundation.libs.abide={name:"abide",version:"4.3.0",settings:{live_validate:true,focus_on_invalid:true,timeout:1e3,patterns:{alpha:/[a-zA-Z]+/,alpha_numeric:/[a-zA-Z0-9]+/,integer:/-?\d+/,number:/-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?/,password:/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,card:/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,cvv:/^([0-9]){3,4}$/,email:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,url:/(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?/,domain:/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/,datetime:/([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))/,date:/(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/,time:/(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}/,dateISO:/\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/,month_day_year:/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/,color:/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/}},timer:null,init:function(t,n,r){if(typeof n==="object"){e.extend(true,this.settings,n)}if(typeof n!=="string"){if(!this.settings.init){this.events()}}else{return this[n].call(this,r)}},events:function(){var t=this,n=e("form[data-abide]",this.scope).attr("novalidate","novalidate");n.on("submit validate",function(n){return t.validate(e(this).find("input, textarea, select").get(),n)});this.settings.init=true;if(!this.settings.live_validate)return;n.find("input, textarea, select").on("blur change",function(e){t.validate([this],e)})},validate:function(t,n){var r=this.parse_patterns(t),i=r.length,s=e(t[0]).closest("form");while(i--){if(!r[i]&&/submit/.test(n.type)){if(this.settings.focus_on_invalid)t[i].focus();s.trigger("invalid");e(t[i]).closest("form").attr("data-invalid","");return false}}if(/submit/.test(n.type)){s.trigger("valid")}s.removeAttr("data-invalid");return false},parse_patterns:function(e){var t=e.length,n=[];for(var r=t-1;r>=0;r--){n.push(this.pattern(e[r]))}return this.check_validation_and_apply_styles(n)},pattern:function(e){var t=e.getAttribute("type"),n=typeof e.getAttribute("required")==="string";if(this.settings.patterns.hasOwnProperty(t)){return[e,this.settings.patterns[t],n]}var r=e.getAttribute("pattern")||"";if(this.settings.patterns.hasOwnProperty(r)&&r.length>0){return[e,this.settings.patterns[r],n]}else if(r.length>0){return[e,new RegExp(r),n]}r=/.*/;return[e,r,n]},check_validation_and_apply_styles:function(t){var n=t.length,r=[];for(var i=n-1;i>=0;i--){var s=t[i][0],o=t[i][2],u=s.value,a=s.getAttribute("data-equalto"),f=s.type==="radio",l=o?s.value.length>0:true;if(f&&o){r.push(this.valid_radio(s,o))}else if(a&&o){r.push(this.valid_equal(s,o))}else{if(t[i][1].test(u)&&l||!o&&s.value.length<1){e(s).removeAttr("data-invalid").parent().removeClass("error");r.push(true)}else{e(s).attr("data-invalid","").parent().addClass("error");r.push(false)}}}return r},valid_radio:function(t,r){var i=t.getAttribute("name"),s=n.getElementsByName(i),o=s.length,u=false;for(var a=0;a<o;a++){if(s[a].checked)u=true}for(var a=0;a<o;a++){if(u){e(s[a]).removeAttr("data-invalid").parent().removeClass("error")}else{e(s[a]).attr("data-invalid","").parent().addClass("error")}}return u},valid_equal:function(t,r){var i=n.getElementById(t.getAttribute("data-equalto")).value,s=t.value,o=i===s;if(o){e(t).removeAttr("data-invalid").parent().removeClass("error")}else{e(t).attr("data-invalid","").parent().addClass("error")}return o}}})(Foundation.zj,this,this.document);if(typeof Object.create!=="function"){Object.create=function(e){function t(){}t.prototype=e;return new t}}(function(e){var t={init:function(t){this.options=e.extend({},e.noty.defaults,t);this.options.layout=this.options.custom?e.noty.layouts["inline"]:e.noty.layouts[this.options.layout];this.options.theme=e.noty.themes[this.options.theme];delete t.layout;delete t.theme;this.options=e.extend({},this.options,this.options.layout.options);this.options.id="noty_"+(new Date).getTime()*Math.floor(Math.random()*1e6);this.options=e.extend({},this.options,t);this._build();return this},_build:function(){var t=e('<div class="noty_bar"></div>').attr("id",this.options.id);t.append(this.options.template).find(".noty_text").html(this.options.text);this.$bar=this.options.layout.parent.object!==null?e(this.options.layout.parent.object).css(this.options.layout.parent.css).append(t):t;if(this.options.buttons){this.options.closeWith=[];this.options.timeout=false;var n=e("<div/>").addClass("noty_buttons");this.options.layout.parent.object!==null?this.$bar.find(".noty_bar").append(n):this.$bar.append(n);var r=this;e.each(this.options.buttons,function(t,n){var i=e("<button/>").addClass(n.addClass?n.addClass:"gray").html(n.text).appendTo(r.$bar.find(".noty_buttons")).bind("click",function(){if(e.isFunction(n.onClick)){n.onClick.call(i,r)}})})}this.$message=this.$bar.find(".noty_message");this.$closeButton=this.$bar.find(".noty_close");this.$buttons=this.$bar.find(".noty_buttons");e.noty.store[this.options.id]=this},show:function(){var t=this;e(t.options.layout.container.selector).append(t.$bar);t.options.theme.style.apply(t);e.type(t.options.layout.css)==="function"?this.options.layout.css.apply(t.$bar):t.$bar.css(this.options.layout.css||{});t.$bar.addClass(t.options.layout.addClass);t.options.layout.container.style.apply(e(t.options.layout.container.selector));t.options.theme.callback.onShow.apply(this);if(e.inArray("click",t.options.closeWith)>-1)t.$bar.css("cursor","pointer").one("click",function(e){t.stopPropagation(e);if(t.options.callback.onCloseClick){t.options.callback.onCloseClick.apply(t)}t.close()});if(e.inArray("hover",t.options.closeWith)>-1)t.$bar.one("mouseenter",function(){t.close()});if(e.inArray("button",t.options.closeWith)>-1)t.$closeButton.one("click",function(e){t.stopPropagation(e);t.close()});if(e.inArray("button",t.options.closeWith)==-1)t.$closeButton.remove();if(t.options.callback.onShow)t.options.callback.onShow.apply(t);t.$bar.animate(t.options.animation.open,t.options.animation.speed,t.options.animation.easing,function(){if(t.options.callback.afterShow)t.options.callback.afterShow.apply(t);t.shown=true});if(t.options.timeout)t.$bar.delay(t.options.timeout).promise().done(function(){t.close()});return this},close:function(){if(this.closed)return;if(this.$bar&&this.$bar.hasClass("i-am-closing-now"))return;var t=this;if(!this.shown){var n=[];e.each(e.noty.queue,function(e,r){if(r.options.id!=t.options.id){n.push(r)}});e.noty.queue=n;return}t.$bar.addClass("i-am-closing-now");if(t.options.callback.onClose){t.options.callback.onClose.apply(t)}t.$bar.clearQueue().stop().animate(t.options.animation.close,t.options.animation.speed,t.options.animation.easing,function(){if(t.options.callback.afterClose)t.options.callback.afterClose.apply(t)}).promise().done(function(){if(t.options.modal){e.notyRenderer.setModalCount(-1);if(e.notyRenderer.getModalCount()==0)e(".noty_modal").fadeOut("fast",function(){e(this).remove()})}e.notyRenderer.setLayoutCountFor(t,-1);if(e.notyRenderer.getLayoutCountFor(t)==0)e(t.options.layout.container.selector).remove();if(typeof t.$bar!=="undefined"&&t.$bar!==null){t.$bar.remove();t.$bar=null;t.closed=true}delete e.noty.store[t.options.id];t.options.theme.callback.onClose.apply(t);if(!t.options.dismissQueue){e.noty.ontap=true;e.notyRenderer.render()}if(t.options.maxVisible>0&&t.options.dismissQueue){e.notyRenderer.render()}})},setText:function(e){if(!this.closed){this.options.text=e;this.$bar.find(".noty_text").html(e)}return this},setType:function(e){if(!this.closed){this.options.type=e;this.options.theme.style.apply(this);this.options.theme.callback.onShow.apply(this)}return this},setTimeout:function(e){if(!this.closed){var t=this;this.options.timeout=e;t.$bar.delay(t.options.timeout).promise().done(function(){t.close()})}return this},stopPropagation:function(e){e=e||window.event;if(typeof e.stopPropagation!=="undefined"){e.stopPropagation()}else{e.cancelBubble=true}},closed:false,shown:false};e.notyRenderer={};e.notyRenderer.init=function(n){var r=Object.create(t).init(n);r.options.force?e.noty.queue.unshift(r):e.noty.queue.push(r);e.notyRenderer.render();return e.noty.returns=="object"?r:r.options.id};e.notyRenderer.render=function(){var t=e.noty.queue[0];if(e.type(t)==="object"){if(t.options.dismissQueue){if(t.options.maxVisible>0){if(e(t.options.layout.container.selector+" li").length<t.options.maxVisible){e.notyRenderer.show(e.noty.queue.shift())}else{}}else{e.notyRenderer.show(e.noty.queue.shift())}}else{if(e.noty.ontap){e.notyRenderer.show(e.noty.queue.shift());e.noty.ontap=false}}}else{e.noty.ontap=true}};e.notyRenderer.show=function(t){if(t.options.modal){e.notyRenderer.createModalFor(t);e.notyRenderer.setModalCount(+1)}if(e(t.options.layout.container.selector).length==0){if(t.options.custom){t.options.custom.append(e(t.options.layout.container.object).addClass("i-am-new"))}else{e("body").append(e(t.options.layout.container.object).addClass("i-am-new"))}}else{e(t.options.layout.container.selector).removeClass("i-am-new")}e.notyRenderer.setLayoutCountFor(t,+1);t.show()};e.notyRenderer.createModalFor=function(t){if(e(".noty_modal").length==0)e("<div/>").addClass("noty_modal").data("noty_modal_count",0).css(t.options.theme.modal.css).prependTo(e("body")).fadeIn("fast")};e.notyRenderer.getLayoutCountFor=function(t){return e(t.options.layout.container.selector).data("noty_layout_count")||0};e.notyRenderer.setLayoutCountFor=function(t,n){return e(t.options.layout.container.selector).data("noty_layout_count",e.notyRenderer.getLayoutCountFor(t)+n)};e.notyRenderer.getModalCount=function(){return e(".noty_modal").data("noty_modal_count")||0};e.notyRenderer.setModalCount=function(t){return e(".noty_modal").data("noty_modal_count",e.notyRenderer.getModalCount()+t)};e.fn.noty=function(t){t.custom=e(this);return e.notyRenderer.init(t)};e.noty={};e.noty.queue=[];e.noty.ontap=true;e.noty.layouts={};e.noty.themes={};e.noty.returns="object";e.noty.store={};e.noty.get=function(t){return e.noty.store.hasOwnProperty(t)?e.noty.store[t]:false};e.noty.close=function(t){return e.noty.get(t)?e.noty.get(t).close():false};e.noty.setText=function(t,n){return e.noty.get(t)?e.noty.get(t).setText(n):false};e.noty.setType=function(t,n){return e.noty.get(t)?e.noty.get(t).setType(n):false};e.noty.clearQueue=function(){e.noty.queue=[]};e.noty.closeAll=function(){e.noty.clearQueue();e.each(e.noty.store,function(e,t){t.close()})};var n=window.alert;e.noty.consumeAlert=function(t){window.alert=function(n){if(t)t.text=n;else t={text:n};e.notyRenderer.init(t)}};e.noty.stopConsumeAlert=function(){window.alert=n};e.noty.defaults={layout:"topCenter",theme:"defaultTheme",type:"alert",text:"",dismissQueue:true,template:'<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',animation:{open:{height:"toggle"},close:{height:"toggle"},easing:"swing",speed:250},timeout:7500,force:false,modal:false,maxVisible:10,closeWith:["hover"],callback:{onShow:function(){},afterShow:function(){},onClose:function(){},afterClose:function(){},onCloseClick:function(){}},buttons:false};e(window).resize(function(){e.each(e.noty.layouts,function(t,n){n.container.style.apply(e(n.container.selector))})})})(jQuery);window.noty=function(t){var n=0,r={animateOpen:"animation.open",animateClose:"animation.close",easing:"animation.easing",speed:"animation.speed",onShow:"callback.onShow",onShown:"callback.afterShow",onClose:"callback.onClose",onCloseClick:"callback.onCloseClick",onClosed:"callback.afterClose"};jQuery.each(t,function(e,i){if(r[e]){n++;var s=r[e].split(".");if(!t[s[0]])t[s[0]]={};t[s[0]][s[1]]=i?i:function(){};delete t[e]}});if(!t.closeWith){t.closeWith=jQuery.noty.defaults.closeWith}if(t.hasOwnProperty("closeButton")){n++;if(t.closeButton)t.closeWith.push("button");delete t.closeButton}if(t.hasOwnProperty("closeOnSelfClick")){n++;if(t.closeOnSelfClick)t.closeWith.push("click");delete t.closeOnSelfClick}if(t.hasOwnProperty("closeOnSelfOver")){n++;if(t.closeOnSelfOver)t.closeWith.push("hover");delete t.closeOnSelfOver}if(t.hasOwnProperty("custom")){n++;if(t.custom.container!="null")t.custom=t.custom.container}if(t.hasOwnProperty("cssPrefix")){n++;delete t.cssPrefix}if(t.theme=="noty_theme_default"){n++;t.theme="defaultTheme"}if(!t.hasOwnProperty("dismissQueue")){t.dismissQueue=jQuery.noty.defaults.dismissQueue}if(!t.hasOwnProperty("maxVisible")){t.maxVisible=jQuery.noty.defaults.maxVisible}if(t.buttons){jQuery.each(t.buttons,function(e,t){if(t.click){n++;t.onClick=t.click;delete t.click}if(t.type){n++;t.addClass=t.type;delete t.type}})}if(n){if(typeof console!=="undefined"&&console.warn){console.warn("You are using noty v2 with v1.x.x options. @deprecated until v2.2.0 - Please update your options.")}}return jQuery.notyRenderer.init(t)};(function(e){e.noty.layouts.top={name:"top",options:{},container:{object:'<ul id="noty_top_layout_container" />',selector:"ul#noty_top_layout_container",style:function(){e(this).css({top:0,left:"5%",position:"fixed",width:"90%",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:9999999})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none"},addClass:""}})(jQuery);(function(e){e.noty.layouts.inline={name:"inline",options:{},container:{object:'<ul id="noty_inline_layout_container" />',selector:"ul#noty_inline_layout_container",style:function(){e(this).css({width:"100%",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:9999999})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none"},addClass:""}})(jQuery);(function(e){e.noty.layouts.topCenter={name:"topCenter",options:{},container:{object:'<ul id="noty_topCenter_layout_container" />',selector:"ul#noty_topCenter_layout_container",style:function(){e(this).css({top:20,left:0,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7});e(this).css({left:(e(window).width()-e(this).outerWidth(false))/2+"px"})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""}})(jQuery);(function(e){e.noty.layouts.center={name:"center",options:{},container:{object:'<ul id="noty_center_layout_container" />',selector:"ul#noty_center_layout_container",style:function(){e(this).css({position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7});var t=e(this).clone().css({visibility:"hidden",display:"block",position:"absolute",top:0,left:0}).attr("id","dupe");e("body").append(t);t.find(".i-am-closing-now").remove();t.find("li").css("display","block");var n=t.height();t.remove();if(e(this).hasClass("i-am-new")){e(this).css({left:(e(window).width()-e(this).outerWidth(false))/2+"px",top:(e(window).height()-n)/2+"px"})}else{e(this).animate({left:(e(window).width()-e(this).outerWidth(false))/2+"px",top:(e(window).height()-n)/2+"px"},500)}}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""}})(jQuery);(function(e){e.noty.themes.defaultTheme={name:"defaultTheme",helpers:{borderFix:function(){if(this.options.dismissQueue){var e=this.options.layout.container.selector+" "+this.options.layout.parent.selector}}},modal:{css:{position:"fixed",width:"100%",height:"100%",backgroundColor:"#000",zIndex:1e4,opacity:.6,display:"none",left:0,top:0}},style:function(){this.$bar.css({overflow:"hidden"});this.$message.css({fontSize:"13px",lineHeight:"16px",textAlign:"center",padding:"8px 10px 9px",width:"auto",position:"relative"});this.$closeButton.css({position:"absolute",top:4,right:4,width:10,height:10,background:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAATpJREFUeNoszrFqVFEUheG19zlz7sQ7ijMQBAvfYBqbpJCoZSAQbOwEE1IHGytbLQUJ8SUktW8gCCFJMSGSNxCmFBJO7j5rpXD6n5/P5vM53H3b3T9LOiB5AQDuDjM7BnA7DMPHDGBH0nuSzwHsRcRVRNRSysuU0i6AOwA/02w2+9Fae00SEbEh6SGAR5K+k3zWWptKepCm0+kpyRoRGyRBcpPkDsn1iEBr7drdP2VJZyQXERGSPpiZAViTBACXKaV9kqd5uVzCzO5KKb/d/UZSDwD/eyxqree1VqSu6zKAF2Z2RPJJaw0rAkjOJT0m+SuT/AbgDcmnkmBmfwAsJL1dXQ8lWY6IGwB1ZbrOOb8zs8thGP4COFwx/mE8Ho9Go9ErMzvJOW/1fY/JZIJSypqZfXX3L13X9fcDAKJct1sx3OiuAAAAAElFTkSuQmCC)",display:"none",cursor:"pointer"});this.$buttons.css({padding:5,textAlign:"right",borderTop:"1px solid #ccc",backgroundColor:"#fff"});this.$buttons.find("button").css({marginLeft:5});this.$buttons.find("button:first").css({marginLeft:0});this.$bar.bind({mouseenter:function(){e(this).find(".noty_close").stop().fadeTo("normal",1)},mouseleave:function(){e(this).find(".noty_close").stop().fadeTo("normal",0)}});switch(this.options.layout.name){case"top":this.$bar.css({borderBottom:"2px solid #eee",borderLeft:"2px solid #eee",borderRight:"2px solid #eee",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"});break;case"topCenter":case"center":case"bottomCenter":case"inline":this.$bar.css({border:"1px solid #eee",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"});this.$message.css({fontSize:"13px",textAlign:"center"});break;case"topLeft":case"topRight":case"bottomLeft":case"bottomRight":case"centerLeft":case"centerRight":this.$bar.css({border:"1px solid #eee",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"});this.$message.css({fontSize:"13px",textAlign:"left"});break;case"bottom":this.$bar.css({borderTop:"2px solid #eee",borderLeft:"2px solid #eee",borderRight:"2px solid #eee",boxShadow:"0 -2px 4px rgba(0, 0, 0, 0.1)"});break;default:this.$bar.css({border:"2px solid #eee",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"});break}switch(this.options.type){case"alert":case"notification":this.$bar.css({backgroundColor:"#FFF",borderColor:"#FFF",color:"#444"});break;case"warning":this.$bar.css({backgroundColor:"#FFEAA8",borderColor:"#FFEAA8",color:"#826200"});this.$buttons.css({borderTop:"1px solid #FFC237"});break;case"error":this.$bar.css({backgroundColor:"#E60049",borderColor:"#E60049",color:"#FFF"});this.$message.css({fontWeight:"bold"});this.$buttons.css({borderTop:"1px solid darkred"});break;case"information":this.$bar.css({backgroundColor:"#57B7E2",borderColor:"#57B7E2",color:"#FFF"});this.$buttons.css({borderTop:"1px solid #0B90C4"});break;case"success":this.$bar.css({backgroundColor:"#8AC33F",borderColor:"#8AC33F",color:"#FFF"});this.$buttons.css({borderTop:"1px solid #50C24E"});break;case"confirm":this.$bar.css({backgroundColor:"#E9E9E9",borderColor:"#E9E9E9",color:"#000"});this.$buttons.css({backgroundColor:"#F7F7F7"});break;default:this.$bar.css({backgroundColor:"#FFF",borderColor:"#FFF",color:"#444"});break}},callback:{onShow:function(){e.noty.themes.defaultTheme.helpers.borderFix.apply(this)},onClose:function(){e.noty.themes.defaultTheme.helpers.borderFix.apply(this)}}}})(jQuery);var jscolor={dir:"",bindClass:"color",binding:true,preloading:true,install:function(){jscolor.addEvent(window,"load",jscolor.init)},init:function(){if(jscolor.binding){jscolor.bind()}if(jscolor.preloading){jscolor.preload()}},getDir:function(){if(!jscolor.dir){var e=jscolor.detectDir();jscolor.dir=e!==false?e:"js/jsColor/"}return jscolor.dir},detectDir:function(){var e=location.href;var t=document.getElementsByTagName("base");for(var n=0;n<t.length;n+=1){if(t[n].href){e=t[n].href}}var t=document.getElementsByTagName("script");for(var n=0;n<t.length;n+=1){if(t[n].src&&/(^|\/)jscolor\.js([?#].*)?$/i.test(t[n].src)){var r=new jscolor.URI(t[n].src);var i=r.toAbsolute(e);i.path=i.path.replace(/[^\/]+$/,"");i.query=null;i.fragment=null;return i.toString()}}return false},bind:function(){var e=new RegExp("(^|\\s)("+jscolor.bindClass+")\\s*(\\{[^}]*\\})?","i");var t=document.getElementsByTagName("input");for(var n=0;n<t.length;n+=1){var r;if(!t[n].color&&t[n].className&&(r=t[n].className.match(e))){var i={};if(r[3]){try{i=(new Function("return ("+r[3]+")"))()}catch(s){}}t[n].color=new jscolor.color(t[n],i)}}},preload:function(){for(var e in jscolor.imgRequire){if(jscolor.imgRequire.hasOwnProperty(e)){jscolor.loadImage(e)}}},images:{pad:[181,101],sld:[16,101],cross:[15,15],arrow:[7,11]},imgRequire:{},imgLoaded:{},requireImage:function(e){jscolor.imgRequire[e]=true},loadImage:function(e){if(!jscolor.imgLoaded[e]){jscolor.imgLoaded[e]=new Image;jscolor.imgLoaded[e].src=jscolor.getDir()+e}},fetchElement:function(e){return typeof e==="string"?document.getElementById(e):e},addEvent:function(e,t,n){if(e.addEventListener){e.addEventListener(t,n,false)}else if(e.attachEvent){e.attachEvent("on"+t,n)}},fireEvent:function(e,t){if(!e){return}if(document.createEvent){var n=document.createEvent("HTMLEvents");n.initEvent(t,true,true);e.dispatchEvent(n)}else if(document.createEventObject){var n=document.createEventObject();e.fireEvent("on"+t,n)}else if(e["on"+t]){e["on"+t]()}},getElementPos:function(e){var t=e,n=e;var r=0,i=0;if(t.offsetParent){do{r+=t.offsetLeft;i+=t.offsetTop}while(t=t.offsetParent)}while((n=n.parentNode)&&n.nodeName.toUpperCase()!=="BODY"){r-=n.scrollLeft;i-=n.scrollTop}return[r,i]},getElementSize:function(e){return[e.offsetWidth,e.offsetHeight]},getRelMousePos:function(e){var t=0,n=0;if(!e){e=window.event}if(typeof e.offsetX==="number"){t=e.offsetX;n=e.offsetY}else if(typeof e.layerX==="number"){t=e.layerX;n=e.layerY}return{x:t,y:n}},getViewPos:function(){if(typeof window.pageYOffset==="number"){return[window.pageXOffset,window.pageYOffset]}else if(document.body&&(document.body.scrollLeft||document.body.scrollTop)){return[document.body.scrollLeft,document.body.scrollTop]}else if(document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)){return[document.documentElement.scrollLeft,document.documentElement.scrollTop]}else{return[0,0]}},getViewSize:function(){if(typeof window.innerWidth==="number"){return[window.innerWidth,window.innerHeight]}else if(document.body&&(document.body.clientWidth||document.body.clientHeight)){return[document.body.clientWidth,document.body.clientHeight]}else if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){return[document.documentElement.clientWidth,document.documentElement.clientHeight]}else{return[0,0]}},URI:function(e){function t(e){var t="";while(e){if(e.substr(0,3)==="../"||e.substr(0,2)==="./"){e=e.replace(/^\.+/,"").substr(1)}else if(e.substr(0,3)==="/./"||e==="/."){e="/"+e.substr(3)}else if(e.substr(0,4)==="/../"||e==="/.."){e="/"+e.substr(4);t=t.replace(/\/?[^\/]*$/,"")}else if(e==="."||e===".."){e=""}else{var n=e.match(/^\/?[^\/]*/)[0];e=e.substr(n.length);t=t+n}}return t}this.scheme=null;this.authority=null;this.path="";this.query=null;this.fragment=null;this.parse=function(e){var t=e.match(/^(([A-Za-z][0-9A-Za-z+.-]*)(:))?((\/\/)([^\/?#]*))?([^?#]*)((\?)([^#]*))?((#)(.*))?/);this.scheme=t[3]?t[2]:null;this.authority=t[5]?t[6]:null;this.path=t[7];this.query=t[9]?t[10]:null;this.fragment=t[12]?t[13]:null;return this};this.toString=function(){var e="";if(this.scheme!==null){e=e+this.scheme+":"}if(this.authority!==null){e=e+"//"+this.authority}if(this.path!==null){e=e+this.path}if(this.query!==null){e=e+"?"+this.query}if(this.fragment!==null){e=e+"#"+this.fragment}return e};this.toAbsolute=function(e){var e=new jscolor.URI(e);var n=this;var r=new jscolor.URI;if(e.scheme===null){return false}if(n.scheme!==null&&n.scheme.toLowerCase()===e.scheme.toLowerCase()){n.scheme=null}if(n.scheme!==null){r.scheme=n.scheme;r.authority=n.authority;r.path=t(n.path);r.query=n.query}else{if(n.authority!==null){r.authority=n.authority;r.path=t(n.path);r.query=n.query}else{if(n.path===""){r.path=e.path;if(n.query!==null){r.query=n.query}else{r.query=e.query}}else{if(n.path.substr(0,1)==="/"){r.path=t(n.path)}else{if(e.authority!==null&&e.path===""){r.path="/"+n.path}else{r.path=e.path.replace(/[^\/]+$/,"")+n.path}r.path=t(r.path)}r.query=n.query}r.authority=e.authority}r.scheme=e.scheme}r.fragment=n.fragment;return r};if(e){this.parse(e)}},color:function(e,t){function r(e,t,n){var r=Math.min(Math.min(e,t),n);var i=Math.max(Math.max(e,t),n);var s=i-r;if(s===0){return[null,0,i]}var o=e===r?3+(n-t)/s:t===r?5+(e-n)/s:1+(t-e)/s;return[o===6?0:o,s/i,i]}function i(e,t,n){if(e===null){return[n,n,n]}var r=Math.floor(e);var i=r%2?e-r:1-(e-r);var s=n*(1-t);var o=n*(1-t*i);switch(r){case 6:case 0:return[n,o,s];case 1:return[o,n,s];case 2:return[s,n,o];case 3:return[s,o,n];case 4:return[o,s,n];case 5:return[n,s,o]}}function s(){delete jscolor.picker.owner;document.getElementsByTagName("body")[0].removeChild(jscolor.picker.boxB)}function o(t,n){function h(){var e=m.pickerInsetColor.split(/\s+/);var t=e.length<2?e[0]:e[1]+" "+e[0]+" "+e[0]+" "+e[1];o.btn.style.borderColor=t}if(!jscolor.picker){jscolor.picker={box:document.createElement("div"),boxB:document.createElement("div"),pad:document.createElement("div"),padB:document.createElement("div"),padM:document.createElement("div"),sld:document.createElement("div"),sldB:document.createElement("div"),sldM:document.createElement("div"),btn:document.createElement("div"),btnS:document.createElement("span"),btnT:document.createTextNode(m.pickerCloseText)};for(var r=0,i=4;r<jscolor.images.sld[1];r+=i){var s=document.createElement("div");s.style.height=i+"px";s.style.fontSize="1px";s.style.lineHeight="0";jscolor.picker.sld.appendChild(s)}jscolor.picker.sldB.appendChild(jscolor.picker.sld);jscolor.picker.box.appendChild(jscolor.picker.sldB);jscolor.picker.box.appendChild(jscolor.picker.sldM);jscolor.picker.padB.appendChild(jscolor.picker.pad);jscolor.picker.box.appendChild(jscolor.picker.padB);jscolor.picker.box.appendChild(jscolor.picker.padM);jscolor.picker.btnS.appendChild(jscolor.picker.btnT);jscolor.picker.btn.appendChild(jscolor.picker.btnS);jscolor.picker.box.appendChild(jscolor.picker.btn);jscolor.picker.boxB.appendChild(jscolor.picker.box)}var o=jscolor.picker;o.box.onmouseup=o.box.onmouseout=function(){e.focus()};o.box.onmousedown=function(){y=true};o.box.onmousemove=function(e){if(E||S){E&&p(e);S&&d(e);if(document.selection){document.selection.empty()}else if(window.getSelection){window.getSelection().removeAllRanges()}v()}};if("ontouchstart"in window){o.box.addEventListener("touchmove",function(e){var t={offsetX:e.touches[0].pageX-x.X,offsetY:e.touches[0].pageY-x.Y};if(E||S){E&&p(t);S&&d(t);v()}e.stopPropagation();e.preventDefault()},false)}o.padM.onmouseup=o.padM.onmouseout=function(){if(E){E=false;jscolor.fireEvent(b,"change")}};o.padM.onmousedown=function(e){switch(g){case 0:if(m.hsv[2]===0){m.fromHSV(null,null,1)}break;case 1:if(m.hsv[1]===0){m.fromHSV(null,1,null)}break}S=false;E=true;p(e);v()};if("ontouchstart"in window){o.padM.addEventListener("touchstart",function(e){x={X:e.target.offsetParent.offsetLeft,Y:e.target.offsetParent.offsetTop};this.onmousedown({offsetX:e.touches[0].pageX-x.X,offsetY:e.touches[0].pageY-x.Y})})}o.sldM.onmouseup=o.sldM.onmouseout=function(){if(S){S=false;jscolor.fireEvent(b,"change")}};o.sldM.onmousedown=function(e){E=false;S=true;d(e);v()};if("ontouchstart"in window){o.sldM.addEventListener("touchstart",function(e){x={X:e.target.offsetParent.offsetLeft,Y:e.target.offsetParent.offsetTop};this.onmousedown({offsetX:e.touches[0].pageX-x.X,offsetY:e.touches[0].pageY-x.Y})})}var l=u(m);o.box.style.width=l[0]+"px";o.box.style.height=l[1]+"px";o.boxB.style.position="absolute";o.boxB.style.clear="both";o.boxB.style.left=t+"px";o.boxB.style.top=n+"px";o.boxB.style.zIndex=m.pickerZIndex;o.boxB.style.border=m.pickerBorder+"px solid";o.boxB.style.borderColor=m.pickerBorderColor;o.boxB.style.background=m.pickerFaceColor;o.pad.style.width=jscolor.images.pad[0]+"px";o.pad.style.height=jscolor.images.pad[1]+"px";o.padB.style.position="absolute";o.padB.style.left=m.pickerFace+"px";o.padB.style.top=m.pickerFace+"px";o.padB.style.border=m.pickerInset+"px solid";o.padB.style.borderColor=m.pickerInsetColor;o.padM.style.position="absolute";o.padM.style.left="0";o.padM.style.top="0";o.padM.style.width=m.pickerFace+2*m.pickerInset+jscolor.images.pad[0]+jscolor.images.arrow[0]+"px";o.padM.style.height=o.box.style.height;o.padM.style.cursor="crosshair";o.sld.style.overflow="hidden";o.sld.style.width=jscolor.images.sld[0]+"px";o.sld.style.height=jscolor.images.sld[1]+"px";o.sldB.style.display=m.slider?"block":"none";o.sldB.style.position="absolute";o.sldB.style.right=m.pickerFace+"px";o.sldB.style.top=m.pickerFace+"px";o.sldB.style.border=m.pickerInset+"px solid";o.sldB.style.borderColor=m.pickerInsetColor;o.sldM.style.display=m.slider?"block":"none";o.sldM.style.position="absolute";o.sldM.style.right="0";o.sldM.style.top="0";o.sldM.style.width=jscolor.images.sld[0]+jscolor.images.arrow[0]+m.pickerFace+2*m.pickerInset+"px";o.sldM.style.height=o.box.style.height;try{o.sldM.style.cursor="pointer"}catch(c){o.sldM.style.cursor="hand"}o.btn.style.display=m.pickerClosable?"block":"none";o.btn.style.position="absolute";o.btn.style.left=m.pickerFace+"px";o.btn.style.bottom=m.pickerFace+"px";o.btn.style.padding="0 15px";o.btn.style.height="18px";o.btn.style.border=m.pickerInset+"px solid";h();o.btn.style.color=m.pickerButtonColor;o.btn.style.font="12px sans-serif";o.btn.style.textAlign="center";try{o.btn.style.cursor="pointer"}catch(c){o.btn.style.cursor="hand"}o.btn.onmousedown=function(){m.hidePicker()};o.btnS.style.lineHeight=o.btn.style.height;switch(g){case 0:var w="hs.png";break;case 1:var w="hv.png";break}o.padM.style.backgroundImage="url('"+jscolor.getDir()+"cross.gif')";o.padM.style.backgroundRepeat="no-repeat";o.sldM.style.backgroundImage="url('"+jscolor.getDir()+"arrow.gif')";o.sldM.style.backgroundRepeat="no-repeat";o.pad.style.backgroundImage="url('"+jscolor.getDir()+w+"')";o.pad.style.backgroundRepeat="no-repeat";o.pad.style.backgroundPosition="0 0";a();f();jscolor.picker.owner=m;document.getElementsByTagName("body")[0].appendChild(o.boxB)}function u(e){var t=[2*e.pickerInset+2*e.pickerFace+jscolor.images.pad[0]+(e.slider?2*e.pickerInset+2*jscolor.images.arrow[0]+jscolor.images.sld[0]:0),e.pickerClosable?4*e.pickerInset+3*e.pickerFace+jscolor.images.pad[1]+e.pickerButtonHeight:2*e.pickerInset+2*e.pickerFace+jscolor.images.pad[1]];return t}function a(){switch(g){case 0:var e=1;break;case 1:var e=2;break}var t=Math.round(m.hsv[0]/6*(jscolor.images.pad[0]-1));var n=Math.round((1-m.hsv[e])*(jscolor.images.pad[1]-1));jscolor.picker.padM.style.backgroundPosition=m.pickerFace+m.pickerInset+t-Math.floor(jscolor.images.cross[0]/2)+"px "+(m.pickerFace+m.pickerInset+n-Math.floor(jscolor.images.cross[1]/2))+"px";var r=jscolor.picker.sld.childNodes;switch(g){case 0:var s=i(m.hsv[0],m.hsv[1],1);for(var o=0;o<r.length;o+=1){r[o].style.backgroundColor="rgb("+s[0]*(1-o/r.length)*100+"%,"+s[1]*(1-o/r.length)*100+"%,"+s[2]*(1-o/r.length)*100+"%)"}break;case 1:var s,u,a=[m.hsv[2],0,0];var o=Math.floor(m.hsv[0]);var f=o%2?m.hsv[0]-o:1-(m.hsv[0]-o);switch(o){case 6:case 0:s=[0,1,2];break;case 1:s=[1,0,2];break;case 2:s=[2,0,1];break;case 3:s=[2,1,0];break;case 4:s=[1,2,0];break;case 5:s=[0,2,1];break}for(var o=0;o<r.length;o+=1){u=1-1/(r.length-1)*o;a[1]=a[0]*(1-u*f);a[2]=a[0]*(1-u);r[o].style.backgroundColor="rgb("+a[s[0]]*100+"%,"+a[s[1]]*100+"%,"+a[s[2]]*100+"%)"}break}}function f(){switch(g){case 0:var e=2;break;case 1:var e=1;break}var t=Math.round((1-m.hsv[e])*(jscolor.images.sld[1]-1));jscolor.picker.sldM.style.backgroundPosition="0 "+(m.pickerFace+m.pickerInset+t-Math.floor(jscolor.images.arrow[1]/2))+"px"}function l(){return jscolor.picker&&jscolor.picker.owner===m}function c(){if(b===e){m.importColor()}if(m.pickerOnfocus){m.hidePicker()}}function h(){if(b!==e){m.importColor()}}function p(e){var t=jscolor.getRelMousePos(e);var n=t.x-m.pickerFace-m.pickerInset;var r=t.y-m.pickerFace-m.pickerInset;switch(g){case 0:m.fromHSV(n*(6/(jscolor.images.pad[0]-1)),1-r/(jscolor.images.pad[1]-1),null,k);break;case 1:m.fromHSV(n*(6/(jscolor.images.pad[0]-1)),null,1-r/(jscolor.images.pad[1]-1),k);break}}function d(e){var t=jscolor.getRelMousePos(e);var n=t.y-m.pickerFace-m.pickerInset;switch(g){case 0:m.fromHSV(null,null,1-n/(jscolor.images.sld[1]-1),C);break;case 1:m.fromHSV(null,1-n/(jscolor.images.sld[1]-1),null,C);break}}function v(){if(m.onImmediateChange){var e;if(typeof m.onImmediateChange==="string"){e=new Function(m.onImmediateChange)}else{e=m.onImmediateChange}e.call(m)}}this.required=true;this.adjust=true;this.hash=false;this.caps=true;this.slider=true;this.valueElement=e;this.styleElement=e;this.onImmediateChange=null;this.hsv=[0,0,1];this.rgb=[1,1,1];this.minH=0;this.maxH=6;this.minS=0;this.maxS=1;this.minV=0;this.maxV=1;this.pickerOnfocus=true;this.pickerMode="HSV";this.pickerPosition="bottom";this.pickerSmartPosition=true;this.pickerButtonHeight=20;this.pickerClosable=false;this.pickerCloseText="Close";this.pickerButtonColor="ButtonText";this.pickerFace=10;this.pickerFaceColor="ThreeDFace";this.pickerBorder=1;this.pickerBorderColor="ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight";this.pickerInset=1;this.pickerInsetColor="ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow";this.pickerZIndex=1e4;for(var n in t){if(t.hasOwnProperty(n)){this[n]=t[n]}}this.hidePicker=function(){if(l()){s()}};this.showPicker=function(){if(!l()){var t=jscolor.getElementPos(e);var n=jscolor.getElementSize(e);var r=jscolor.getViewPos();var i=jscolor.getViewSize();var s=u(this);var a,f,c;switch(this.pickerPosition.toLowerCase()){case"left":a=1;f=0;c=-1;break;case"right":a=1;f=0;c=1;break;case"top":a=0;f=1;c=-1;break;default:a=0;f=1;c=1;break}var h=(n[f]+s[f])/2;if(!this.pickerSmartPosition){var p=[t[a],t[f]+n[f]-h+h*c]}else{var p=[-r[a]+t[a]+s[a]>i[a]?-r[a]+t[a]+n[a]/2>i[a]/2&&t[a]+n[a]-s[a]>=0?t[a]+n[a]-s[a]:t[a]:t[a],-r[f]+t[f]+n[f]+s[f]-h+h*c>i[f]?-r[f]+t[f]+n[f]/2>i[f]/2&&t[f]+n[f]-h-h*c>=0?t[f]+n[f]-h-h*c:t[f]+n[f]-h+h*c:t[f]+n[f]-h+h*c>=0?t[f]+n[f]-h+h*c:t[f]+n[f]-h-h*c]}o(p[a],p[f])}};this.importColor=function(){if(!b){this.exportColor()}else{if(!this.adjust){if(!this.fromString(b.value,T)){w.style.backgroundImage=w.jscStyle.backgroundImage;w.style.backgroundColor=w.jscStyle.backgroundColor;w.style.color=w.jscStyle.color;this.exportColor(T|N)}}else if(!this.required&&/^\s*$/.test(b.value)){b.value="";w.style.backgroundImage=w.jscStyle.backgroundImage;w.style.backgroundColor=w.jscStyle.backgroundColor;w.style.color=w.jscStyle.color;this.exportColor(T|N)}else if(this.fromString(b.value)){}else{this.exportColor()}}};this.exportColor=function(e){if(!(e&T)&&b){var t=this.toString();if(this.caps){t=t.toUpperCase()}if(this.hash){t="#"+t}b.value=t}if(!(e&N)&&w){w.style.backgroundImage="none";w.style.backgroundColor="#"+this.toString();w.style.color=.213*this.rgb[0]+.715*this.rgb[1]+.072*this.rgb[2]<.5?"#FFF":"#000"}if(!(e&C)&&l()){a()}if(!(e&k)&&l()){f()}};this.fromHSV=function(e,t,n,r){if(e!==null){e=Math.max(0,this.minH,Math.min(6,this.maxH,e))}if(t!==null){t=Math.max(0,this.minS,Math.min(1,this.maxS,t))}if(n!==null){n=Math.max(0,this.minV,Math.min(1,this.maxV,n))}this.rgb=i(e===null?this.hsv[0]:this.hsv[0]=e,t===null?this.hsv[1]:this.hsv[1]=t,n===null?this.hsv[2]:this.hsv[2]=n);this.exportColor(r)};this.fromRGB=function(e,t,n,s){if(e!==null){e=Math.max(0,Math.min(1,e))}if(t!==null){t=Math.max(0,Math.min(1,t))}if(n!==null){n=Math.max(0,Math.min(1,n))}var o=r(e===null?this.rgb[0]:e,t===null?this.rgb[1]:t,n===null?this.rgb[2]:n);if(o[0]!==null){this.hsv[0]=Math.max(0,this.minH,Math.min(6,this.maxH,o[0]))}if(o[2]!==0){this.hsv[1]=o[1]===null?null:Math.max(0,this.minS,Math.min(1,this.maxS,o[1]))}this.hsv[2]=o[2]===null?null:Math.max(0,this.minV,Math.min(1,this.maxV,o[2]));var u=i(this.hsv[0],this.hsv[1],this.hsv[2]);this.rgb[0]=u[0];this.rgb[1]=u[1];this.rgb[2]=u[2];this.exportColor(s)};this.fromString=function(e,t){var n=e.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);if(!n){return false}else{if(n[1].length===6){this.fromRGB(parseInt(n[1].substr(0,2),16)/255,parseInt(n[1].substr(2,2),16)/255,parseInt(n[1].substr(4,2),16)/255,t)}else{this.fromRGB(parseInt(n[1].charAt(0)+n[1].charAt(0),16)/255,parseInt(n[1].charAt(1)+n[1].charAt(1),16)/255,parseInt(n[1].charAt(2)+n[1].charAt(2),16)/255,t)}return true}};this.toString=function(){return(256|Math.round(255*this.rgb[0])).toString(16).substr(1)+(256|Math.round(255*this.rgb[1])).toString(16).substr(1)+(256|Math.round(255*this.rgb[2])).toString(16).substr(1)};var m=this;var g=this.pickerMode.toLowerCase()==="hvs"?1:0;var y=false;var b=jscolor.fetchElement(this.valueElement),w=jscolor.fetchElement(this.styleElement);var E=false,S=false,x={};var T=1<<0,N=1<<1,C=1<<2,k=1<<3;jscolor.addEvent(e,"focus",function(){if(m.pickerOnfocus){m.showPicker()}});jscolor.addEvent(e,"blur",function(){if(!y){window.setTimeout(function(){y||c();y=false},0)}else{y=false}});if(b){var L=function(){m.fromString(b.value,T);v()};jscolor.addEvent(b,"keyup",L);jscolor.addEvent(b,"input",L);jscolor.addEvent(b,"blur",h);b.setAttribute("autocomplete","off")}if(w){w.jscStyle={backgroundImage:w.style.backgroundImage,backgroundColor:w.style.backgroundColor,color:w.style.color}}switch(g){case 0:jscolor.requireImage("hs.png");break;case 1:jscolor.requireImage("hv.png");break}jscolor.requireImage("cross.gif");jscolor.requireImage("arrow.gif");this.importColor()}};jscolor.install();(function(e){"use strict";function t(t){var n=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).ajaxSubmit(n))}function n(t){var n=t.target,r=e(n);if(!r.is("[type=submit],[type=image]")){var i=r.closest("[type=submit]");if(0===i.length)return;n=i[0]}var s=this;if(s.clk=n,"image"==n.type)if(void 0!==t.offsetX)s.clk_x=t.offsetX,s.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=r.offset();s.clk_x=t.pageX-o.left,s.clk_y=t.pageY-o.top}else s.clk_x=t.pageX-n.offsetLeft,s.clk_y=t.pageY-n.offsetTop;setTimeout(function(){s.clk=s.clk_x=s.clk_y=null},100)}function r(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var i={};i.fileapi=void 0!==e("<input type='file'/>").get(0).files,i.formdata=void 0!==window.FormData;var s=!!e.fn.prop;e.fn.attr2=function(){if(!s)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t){function n(n){var r,i,s=e.param(n,t.traditional).split("&"),o=s.length,u=[];for(r=0;o>r;r++)s[r]=s[r].replace(/\+/g," "),i=s[r].split("="),u.push([decodeURIComponent(i[0]),decodeURIComponent(i[1])]);return u}function o(r){for(var i=new FormData,s=0;r.length>s;s++)i.append(r[s].name,r[s].value);if(t.extraData){var o=n(t.extraData);for(s=0;o.length>s;s++)o[s]&&i.append(o[s][0],o[s][1])}t.data=null;var u=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:f||"POST"});t.uploadProgress&&(u.xhr=function(){var n=e.ajaxSettings.xhr();return n.upload&&n.upload.addEventListener("progress",function(e){var n=0,r=e.loaded||e.position,i=e.total;e.lengthComputable&&(n=Math.ceil(100*(r/i))),t.uploadProgress(e,r,i,n)},!1),n}),u.data=null;var a=u.beforeSend;return u.beforeSend=function(e,t){t.data=i,a&&a.call(this,e,t)},e.ajax(u)}function u(n){function i(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(n){r("cannot get iframe.contentWindow document: "+n)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(n){r("cannot get iframe.contentDocument: "+n),t=e.document}return t}function o(){function t(){try{var e=i(y).readyState;r("state = "+e),e&&"uninitialized"==e.toLowerCase()&&setTimeout(t,50)}catch(n){r("Server abort: ",n," (",n.name,")"),u(k),x&&clearTimeout(x),x=void 0}}var n=h.attr2("target"),s=h.attr2("action");T.setAttribute("target",v),(!f||/post/i.test(f))&&T.setAttribute("method","POST"),s!=p.url&&T.setAttribute("action",p.url),p.skipEncodingOverride||f&&!/post/i.test(f)||h.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),p.timeout&&(x=setTimeout(function(){S=!0,u(C)},p.timeout));var o=[];try{if(p.extraData)for(var l in p.extraData)p.extraData.hasOwnProperty(l)&&(e.isPlainObject(p.extraData[l])&&p.extraData[l].hasOwnProperty("name")&&p.extraData[l].hasOwnProperty("value")?o.push(e('<input type="hidden" name="'+p.extraData[l].name+'">').val(p.extraData[l].value).appendTo(T)[0]):o.push(e('<input type="hidden" name="'+l+'">').val(p.extraData[l]).appendTo(T)[0]));p.iframeTarget||g.appendTo("body"),y.attachEvent?y.attachEvent("onload",u):y.addEventListener("load",u,!1),setTimeout(t,15);try{T.submit()}catch(c){var d=document.createElement("form").submit;d.apply(T)}}finally{T.setAttribute("action",s),n?T.setAttribute("target",n):h.removeAttr("target"),e(o).remove()}}function u(t){if(!b.aborted&&!_){if(M=i(y),M||(r("cannot access response document"),t=k),t===C&&b)return b.abort("timeout"),N.reject(b,"timeout"),void 0;if(t==k&&b)return b.abort("server abort"),N.reject(b,"error","server abort"),void 0;if(M&&M.location.href!=p.iframeSrc||S){y.detachEvent?y.detachEvent("onload",u):y.removeEventListener("load",u,!1);var n,s="success";try{if(S)throw"timeout";var o="xml"==p.dataType||M.XMLDocument||e.isXMLDoc(M);if(r("isXml="+o),!o&&window.opera&&(null===M.body||!M.body.innerHTML)&&--D)return r("requeing onLoad callback, DOM not available"),setTimeout(u,250),void 0;var f=M.body?M.body:M.documentElement;b.responseText=f?f.innerHTML:null,b.responseXML=M.XMLDocument?M.XMLDocument:M,o&&(p.dataType="xml"),b.getResponseHeader=function(e){var t={"content-type":p.dataType};return t[e.toLowerCase()]},f&&(b.status=Number(f.getAttribute("status"))||b.status,b.statusText=f.getAttribute("statusText")||b.statusText);var l=(p.dataType||"").toLowerCase(),c=/(json|script|text)/.test(l);if(c||p.textarea){var h=M.getElementsByTagName("textarea")[0];if(h)b.responseText=h.value,b.status=Number(h.getAttribute("status"))||b.status,b.statusText=h.getAttribute("statusText")||b.statusText;else if(c){var v=M.getElementsByTagName("pre")[0],m=M.getElementsByTagName("body")[0];v?b.responseText=v.textContent?v.textContent:v.innerText:m&&(b.responseText=m.textContent?m.textContent:m.innerText)}}else"xml"==l&&!b.responseXML&&b.responseText&&(b.responseXML=P(b.responseText));try{O=B(b,l,p)}catch(w){s="parsererror",b.error=n=w||s}}catch(w){r("error caught: ",w),s="error",b.error=n=w||s}b.aborted&&(r("upload aborted"),s=null),b.status&&(s=b.status>=200&&300>b.status||304===b.status?"success":"error"),"success"===s?(p.success&&p.success.call(p.context,O,"success",b),N.resolve(b.responseText,"success",b),d&&e.event.trigger("ajaxSuccess",[b,p])):s&&(void 0===n&&(n=b.statusText),p.error&&p.error.call(p.context,b,s,n),N.reject(b,"error",n),d&&e.event.trigger("ajaxError",[b,p,n])),d&&e.event.trigger("ajaxComplete",[b,p]),d&&!--e.active&&e.event.trigger("ajaxStop"),p.complete&&p.complete.call(p.context,b,s),_=!0,p.timeout&&clearTimeout(x),setTimeout(function(){p.iframeTarget?g.attr("src",p.iframeSrc):g.remove(),b.responseXML=null},100)}}}var l,c,p,d,v,g,y,b,w,E,S,x,T=h[0],N=e.Deferred();if(N.abort=function(e){b.abort(e)},n)for(c=0;m.length>c;c++)l=e(m[c]),s?l.prop("disabled",!1):l.removeAttr("disabled");if(p=e.extend(!0,{},e.ajaxSettings,t),p.context=p.context||p,v="jqFormIO"+(new Date).getTime(),p.iframeTarget?(g=e(p.iframeTarget),E=g.attr2("name"),E?v=E:g.attr2("name",v)):(g=e('<iframe name="'+v+'" src="'+p.iframeSrc+'" />'),g.css({position:"absolute",top:"-1000px",left:"-1000px"})),y=g[0],b={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var n="timeout"===t?"timeout":"aborted";r("aborting upload... "+n),this.aborted=1;try{y.contentWindow.document.execCommand&&y.contentWindow.document.execCommand("Stop")}catch(i){}g.attr("src",p.iframeSrc),b.error=n,p.error&&p.error.call(p.context,b,n,t),d&&e.event.trigger("ajaxError",[b,p,n]),p.complete&&p.complete.call(p.context,b,n)}},d=p.global,d&&0===e.active++&&e.event.trigger("ajaxStart"),d&&e.event.trigger("ajaxSend",[b,p]),p.beforeSend&&p.beforeSend.call(p.context,b,p)===!1)return p.global&&e.active--,N.reject(),N;if(b.aborted)return N.reject(),N;w=T.clk,w&&(E=w.name,E&&!w.disabled&&(p.extraData=p.extraData||{},p.extraData[E]=w.value,"image"==w.type&&(p.extraData[E+".x"]=T.clk_x,p.extraData[E+".y"]=T.clk_y)));var C=1,k=2,L=e("meta[name=csrf-token]").attr("content"),A=e("meta[name=csrf-param]").attr("content");A&&L&&(p.extraData=p.extraData||{},p.extraData[A]=L),p.forceSync?o():setTimeout(o,10);var O,M,_,D=50,P=e.parseXML||function(e,t){return window.ActiveXObject?(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},H=e.parseJSON||function(e){return window.eval("("+e+")")},B=function(t,n,r){var i=t.getResponseHeader("content-type")||"",s="xml"===n||!n&&i.indexOf("xml")>=0,o=s?t.responseXML:t.responseText;return s&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),r&&r.dataFilter&&(o=r.dataFilter(o,n)),"string"==typeof o&&("json"===n||!n&&i.indexOf("json")>=0?o=H(o):("script"===n||!n&&i.indexOf("javascript")>=0)&&e.globalEval(o)),o};return N}if(!this.length)return r("ajaxSubmit: skipping submit process - no element selected"),this;var f,l,c,h=this;"function"==typeof t?t={success:t}:void 0===t&&(t={}),f=t.type||this.attr2("method"),l=t.url||this.attr2("action"),c="string"==typeof l?e.trim(l):"",c=c||window.location.href||"",c&&(c=(c.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:c,success:e.ajaxSettings.success,type:f||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var p={};if(this.trigger("form-pre-serialize",[this,t,p]),p.veto)return r("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&t.beforeSerialize(this,t)===!1)return r("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var d=t.traditional;void 0===d&&(d=e.ajaxSettings.traditional);var v,m=[],g=this.formToArray(t.semantic,m);if(t.data&&(t.extraData=t.data,v=e.param(t.data,d)),t.beforeSubmit&&t.beforeSubmit(g,this,t)===!1)return r("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[g,this,t,p]),p.veto)return r("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var y=e.param(g,d);v&&(y=y?y+"&"+v:v),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+y,t.data=null):t.data=y;var b=[];if(t.resetForm&&b.push(function(){h.resetForm()}),t.clearForm&&b.push(function(){h.clearForm(t.includeHidden)}),!t.dataType&&t.target){var w=t.success||function(){};b.push(function(n){var r=t.replaceTarget?"replaceWith":"html";e(t.target)[r](n).each(w,arguments)})}else t.success&&b.push(t.success);if(t.success=function(e,n,r){for(var i=t.context||this,s=0,o=b.length;o>s;s++)b[s].apply(i,[e,n,r||h,h])},t.error){var E=t.error;t.error=function(e,n,r){var i=t.context||this;E.apply(i,[e,n,r,h])}}if(t.complete){var S=t.complete;t.complete=function(e,n){var r=t.context||this;S.apply(r,[e,n,h])}}var x=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}),T=x.length>0,N="multipart/form-data",C=h.attr("enctype")==N||h.attr("encoding")==N,k=i.fileapi&&i.formdata;r("fileAPI :"+k);var L,A=(T||C)&&!k;t.iframe!==!1&&(t.iframe||A)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){L=u(g)}):L=u(g):L=(T||C)&&k?o(g):e.ajax(t),h.removeData("jqxhr").data("jqxhr",L);for(var O=0;m.length>O;O++)m[O]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(i){if(i=i||{},i.delegation=i.delegation&&e.isFunction(e.fn.on),!i.delegation&&0===this.length){var s={s:this.selector,c:this.context};return!e.isReady&&s.s?(r("DOM not ready, queuing ajaxForm"),e(function(){e(s.s,s.c).ajaxForm(i)}),this):(r("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return i.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,n).on("submit.form-plugin",this.selector,i,t).on("click.form-plugin",this.selector,i,n),this):this.ajaxFormUnbind().bind("submit.form-plugin",i,t).bind("click.form-plugin",i,n)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,n){var r=[];if(0===this.length)return r;var s=this[0],o=t?s.getElementsByTagName("*"):s.elements;if(!o)return r;var u,a,f,l,c,h,p;for(u=0,h=o.length;h>u;u++)if(c=o[u],f=c.name,f&&!c.disabled)if(t&&s.clk&&"image"==c.type)s.clk==c&&(r.push({name:f,value:e(c).val(),type:c.type}),r.push({name:f+".x",value:s.clk_x},{name:f+".y",value:s.clk_y}));else if(l=e.fieldValue(c,!0),l&&l.constructor==Array)for(n&&n.push(c),a=0,p=l.length;p>a;a++)r.push({name:f,value:l[a]});else if(i.fileapi&&"file"==c.type){n&&n.push(c);var d=c.files;if(d.length)for(a=0;d.length>a;a++)r.push({name:f,value:d[a],type:c.type});else r.push({name:f,value:"",type:c.type})}else null!==l&&l!==void 0&&(n&&n.push(c),r.push({name:f,value:l,type:c.type,required:c.required}));if(!t&&s.clk){var v=e(s.clk),m=v[0];f=m.name,f&&!m.disabled&&"image"==m.type&&(r.push({name:f,value:v.val()}),r.push({name:f+".x",value:s.clk_x},{name:f+".y",value:s.clk_y}))}return r},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var n=[];return this.each(function(){var r=this.name;if(r){var i=e.fieldValue(this,t);if(i&&i.constructor==Array)for(var s=0,o=i.length;o>s;s++)n.push({name:r,value:i[s]});else null!==i&&i!==void 0&&n.push({name:this.name,value:i})}}),e.param(n)},e.fn.fieldValue=function(t){for(var n=[],r=0,i=this.length;i>r;r++){var s=this[r],o=e.fieldValue(s,t);null===o||void 0===o||o.constructor==Array&&!o.length||(o.constructor==Array?e.merge(n,o):n.push(o))}return n},e.fieldValue=function(t,n){var r=t.name,i=t.type,s=t.tagName.toLowerCase();if(void 0===n&&(n=!0),n&&(!r||t.disabled||"reset"==i||"button"==i||("checkbox"==i||"radio"==i)&&!t.checked||("submit"==i||"image"==i)&&t.form&&t.form.clk!=t||"select"==s&&-1==t.selectedIndex))return null;if("select"==s){var o=t.selectedIndex;if(0>o)return null;for(var u=[],a=t.options,f="select-one"==i,l=f?o+1:a.length,c=f?o:0;l>c;c++){var h=a[c];if(h.selected){var p=h.value;if(p||(p=h.attributes&&h.attributes.value&&!h.attributes.value.specified?h.text:h.value),f)return p;u.push(p)}}return u}return e(t).val()},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var n=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var r=this.type,i=this.tagName.toLowerCase();n.test(r)||"textarea"==i?this.value="":"checkbox"==r||"radio"==r?this.checked=!1:"select"==i?this.selectedIndex=-1:"file"==r?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(t===!0&&/hidden/.test(r)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var n=this.type;if("checkbox"==n||"radio"==n)this.checked=t;else if("option"==this.tagName.toLowerCase()){var r=e(this).parent("select");t&&r[0]&&"select-one"==r[0].type&&r.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1})("undefined"!=typeof jQuery?jQuery:window.Zepto);(function(e,t){function n(t,n){var i,s,o,u=t.nodeName.toLowerCase();return"area"===u?(i=t.parentNode,s=i.name,t.href&&s&&"map"===i.nodeName.toLowerCase()?(o=e("img[usemap=#"+s+"]")[0],!!o&&r(o)):!1):(/input|select|textarea|button|object/.test(u)?!t.disabled:"a"===u?t.href||n:n)&&r(t)}function r(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}var i=0,s=/^ui-id-\d+$/;e.ui=e.ui||{},e.extend(e.ui,{version:"1.10.3",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({focus:function(t){return function(n,r){return"number"==typeof n?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),r&&r.call(t)},n)}):t.apply(this,arguments)}}(e.fn.focus),scrollParent:function(){var t;return t=e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(n){if(n!==t)return this.css("zIndex",n);if(this.length)for(var r,i,s=e(this[0]);s.length&&s[0]!==document;){if(r=s.css("position"),("absolute"===r||"relative"===r||"fixed"===r)&&(i=parseInt(s.css("zIndex"),10),!isNaN(i)&&0!==i))return i;s=s.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++i)})},removeUniqueId:function(){return this.each(function(){s.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(n){return!!e.data(n,t)}}):function(t,n,r){return!!e.data(t,r[3])},focusable:function(t){return n(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var r=e.attr(t,"tabindex"),i=isNaN(r);return(i||r>=0)&&n(t,!i)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(n,r){function i(t,n,r,i){return e.each(s,function(){n-=parseFloat(e.css(t,"padding"+this))||0,r&&(n-=parseFloat(e.css(t,"border"+this+"Width"))||0),i&&(n-=parseFloat(e.css(t,"margin"+this))||0)}),n}var s="Width"===r?["Left","Right"]:["Top","Bottom"],o=r.toLowerCase(),u={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+r]=function(n){return n===t?u["inner"+r].call(this):this.each(function(){e(this).css(o,i(this,n)+"px")})},e.fn["outer"+r]=function(t,n){return"number"!=typeof t?u["outer"+r].call(this,t):this.each(function(){e(this).css(o,i(this,t,!0,n)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(n){return arguments.length?t.call(this,e.camelCase(n)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.support.selectstart="onselectstart"in document.createElement("div"),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,n,r){var i,s=e.ui[t].prototype;for(i in r)s.plugins[i]=s.plugins[i]||[],s.plugins[i].push([n,r[i]])},call:function(e,t,n){var r,i=e.plugins[t];if(i&&e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType)for(r=0;i.length>r;r++)e.options[i[r][0]]&&i[r][1].apply(e.element,n)}},hasScroll:function(t,n){if("hidden"===e(t).css("overflow"))return!1;var r=n&&"left"===n?"scrollLeft":"scrollTop",i=!1;return t[r]>0?!0:(t[r]=1,i=t[r]>0,t[r]=0,i)}})})(jQuery);(function(e,t){var n=0,r=Array.prototype.slice,i=e.cleanData;e.cleanData=function(t){for(var n,r=0;null!=(n=t[r]);r++)try{e(n).triggerHandler("remove")}catch(s){}i(t)},e.widget=function(n,r,i){var s,o,u,a,f={},l=n.split(".")[0];n=n.split(".")[1],s=l+"-"+n,i||(i=r,r=e.Widget),e.expr[":"][s.toLowerCase()]=function(t){return!!e.data(t,s)},e[l]=e[l]||{},o=e[l][n],u=e[l][n]=function(e,n){return this._createWidget?(arguments.length&&this._createWidget(e,n),t):new u(e,n)},e.extend(u,o,{version:i.version,_proto:e.extend({},i),_childConstructors:[]}),a=new r,a.options=e.widget.extend({},a.options),e.each(i,function(n,i){return e.isFunction(i)?(f[n]=function(){var e=function(){return r.prototype[n].apply(this,arguments)},t=function(e){return r.prototype[n].apply(this,e)};return function(){var n,r=this._super,s=this._superApply;return this._super=e,this._superApply=t,n=i.apply(this,arguments),this._super=r,this._superApply=s,n}}(),t):(f[n]=i,t)}),u.prototype=e.widget.extend(a,{widgetEventPrefix:o?a.widgetEventPrefix:n},f,{constructor:u,namespace:l,widgetName:n,widgetFullName:s}),o?(e.each(o._childConstructors,function(t,n){var r=n.prototype;e.widget(r.namespace+"."+r.widgetName,u,n._proto)}),delete o._childConstructors):r._childConstructors.push(u),e.widget.bridge(n,u)},e.widget.extend=function(n){for(var i,o,u=r.call(arguments,1),a=0,f=u.length;f>a;a++)for(i in u[a])o=u[a][i],u[a].hasOwnProperty(i)&&o!==t&&(n[i]=e.isPlainObject(o)?e.isPlainObject(n[i])?e.widget.extend({},n[i],o):e.widget.extend({},o):o);return n},e.widget.bridge=function(n,i){var o=i.prototype.widgetFullName||n;e.fn[n]=function(u){var a="string"==typeof u,f=r.call(arguments,1),l=this;return u=!a&&f.length?e.widget.extend.apply(null,[u].concat(f)):u,a?this.each(function(){var r,i=e.data(this,o);return i?e.isFunction(i[u])&&"_"!==u.charAt(0)?(r=i[u].apply(i,f),r!==i&&r!==t?(l=r&&r.jquery?l.pushStack(r.get()):r,!1):t):e.error("no such method '"+u+"' for "+n+" widget instance"):e.error("cannot call methods on "+n+" prior to initialization; "+"attempted to call method '"+u+"'")}):this.each(function(){var t=e.data(this,o);t?t.option(u||{})._init():e.data(this,o,new i(u,this))}),l}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,r){r=e(r||this.defaultElement||this)[0],this.element=e(r),this.uuid=n++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),r!==this&&(e.data(r,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===r&&this.destroy()}}),this.document=e(r.style?r.ownerDocument:r.document||r),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(n,r){var i,s,o,u=n;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof n)if(u={},i=n.split("."),n=i.shift(),i.length){for(s=u[n]=e.widget.extend({},this.options[n]),o=0;i.length-1>o;o++)s[i[o]]=s[i[o]]||{},s=s[i[o]];if(n=i.pop(),r===t)return s[n]===t?null:s[n];s[n]=r}else{if(r===t)return this.options[n]===t?null:this.options[n];u[n]=r}return this._setOptions(u),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(n,r,i){var s,o=this;"boolean"!=typeof n&&(i=r,r=n,n=!1),i?(r=s=e(r),this.bindings=this.bindings.add(r)):(i=r,r=this.element,s=this.widget()),e.each(i,function(i,u){function f(){return n||o.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof u?o[u]:u).apply(o,arguments):t}"string"!=typeof u&&(f.guid=u.guid=u.guid||f.guid||e.guid++);var l=i.match(/^(\w+)\s*(.*)$/),c=l[1]+o.eventNamespace,h=l[2];h?s.delegate(h,c,f):r.bind(c,f)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function n(){return("string"==typeof e?r[e]:e).apply(r,arguments)}var r=this;return setTimeout(n,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,n,r){var i,s,o=this.options[t];if(r=r||{},n=e.Event(n),n.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),n.target=this.element[0],s=n.originalEvent)for(i in s)i in n||(n[i]=s[i]);return this.element.trigger(n,r),!(e.isFunction(o)&&o.apply(this.element[0],[n].concat(r))===!1||n.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,n){e.Widget.prototype["_"+t]=function(r,i,s){"string"==typeof i&&(i={effect:i});var o,u=i?i===!0||"number"==typeof i?n:i.effect||n:t;i=i||{},"number"==typeof i&&(i={duration:i}),o=!e.isEmptyObject(i),i.complete=s,i.delay&&r.delay(i.delay),o&&e.effects&&e.effects.effect[u]?r[t](i):u!==t&&r[u]?r[u](i.duration,i.easing,s):r.queue(function(n){e(this)[t](),s&&s.call(r[0]),n()})}})})(jQuery);(function(e){var t=!1;e(document).mouseup(function(){t=!1}),e.widget("ui.mouse",{version:"1.10.3",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(n){return!0===e.data(n.target,t.widgetName+".preventClickEvent")?(e.removeData(n.target,t.widgetName+".preventClickEvent"),n.stopImmediatePropagation(),!1):undefined}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(n){if(!t){this._mouseStarted&&this._mouseUp(n),this._mouseDownEvent=n;var r=this,i=1===n.which,s="string"==typeof this.options.cancel&&n.target.nodeName?e(n.target).closest(this.options.cancel).length:!1;return i&&!s&&this._mouseCapture(n)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){r.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(n)&&this._mouseDelayMet(n)&&(this._mouseStarted=this._mouseStart(n)!==!1,!this._mouseStarted)?(n.preventDefault(),!0):(!0===e.data(n.target,this.widgetName+".preventClickEvent")&&e.removeData(n.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return r._mouseMove(e)},this._mouseUpDelegate=function(e){return r._mouseUp(e)},e(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),n.preventDefault(),t=!0,!0)):!0}},_mouseMove:function(t){return e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button?this._mouseUp(t):this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){return e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})})(jQuery);(function(e,t){function n(e,t,n){return[parseFloat(e[0])*(p.test(e[0])?t/100:1),parseFloat(e[1])*(p.test(e[1])?n/100:1)]}function r(t,n){return parseInt(e.css(t,n),10)||0}function i(t){var n=t[0];return 9===n.nodeType?{width:t.width(),height:t.height(),offset:{top:0,left:0}}:e.isWindow(n)?{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}:n.preventDefault?{width:0,height:0,offset:{top:n.pageY,left:n.pageX}}:{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()}}e.ui=e.ui||{};var s,o=Math.max,u=Math.abs,a=Math.round,f=/left|center|right/,l=/top|center|bottom/,c=/[\+\-]\d+(\.[\d]+)?%?/,h=/^\w+/,p=/%$/,d=e.fn.position;e.position={scrollbarWidth:function(){if(s!==t)return s;var n,r,i=e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=i.children()[0];return e("body").append(i),n=o.offsetWidth,i.css("overflow","scroll"),r=o.offsetWidth,n===r&&(r=i[0].clientWidth),i.remove(),s=n-r},getScrollInfo:function(t){var n=t.isWindow?"":t.element.css("overflow-x"),r=t.isWindow?"":t.element.css("overflow-y"),i="scroll"===n||"auto"===n&&t.width<t.element[0].scrollWidth,s="scroll"===r||"auto"===r&&t.height<t.element[0].scrollHeight;return{width:s?e.position.scrollbarWidth():0,height:i?e.position.scrollbarWidth():0}},getWithinInfo:function(t){var n=e(t||window),r=e.isWindow(n[0]);return{element:n,isWindow:r,offset:n.offset()||{left:0,top:0},scrollLeft:n.scrollLeft(),scrollTop:n.scrollTop(),width:r?n.width():n.outerWidth(),height:r?n.height():n.outerHeight()}}},e.fn.position=function(t){if(!t||!t.of)return d.apply(this,arguments);t=e.extend({},t);var s,p,v,m,g,y,b=e(t.of),w=e.position.getWithinInfo(t.within),E=e.position.getScrollInfo(w),S=(t.collision||"flip").split(" "),x={};return y=i(b),b[0].preventDefault&&(t.at="left top"),p=y.width,v=y.height,m=y.offset,g=e.extend({},m),e.each(["my","at"],function(){var e,n,r=(t[this]||"").split(" ");1===r.length&&(r=f.test(r[0])?r.concat(["center"]):l.test(r[0])?["center"].concat(r):["center","center"]),r[0]=f.test(r[0])?r[0]:"center",r[1]=l.test(r[1])?r[1]:"center",e=c.exec(r[0]),n=c.exec(r[1]),x[this]=[e?e[0]:0,n?n[0]:0],t[this]=[h.exec(r[0])[0],h.exec(r[1])[0]]}),1===S.length&&(S[1]=S[0]),"right"===t.at[0]?g.left+=p:"center"===t.at[0]&&(g.left+=p/2),"bottom"===t.at[1]?g.top+=v:"center"===t.at[1]&&(g.top+=v/2),s=n(x.at,p,v),g.left+=s[0],g.top+=s[1],this.each(function(){var i,f,l=e(this),c=l.outerWidth(),h=l.outerHeight(),d=r(this,"marginLeft"),y=r(this,"marginTop"),T=c+d+r(this,"marginRight")+E.width,N=h+y+r(this,"marginBottom")+E.height,C=e.extend({},g),L=n(x.my,l.outerWidth(),l.outerHeight());"right"===t.my[0]?C.left-=c:"center"===t.my[0]&&(C.left-=c/2),"bottom"===t.my[1]?C.top-=h:"center"===t.my[1]&&(C.top-=h/2),C.left+=L[0],C.top+=L[1],e.support.offsetFractions||(C.left=a(C.left),C.top=a(C.top)),i={marginLeft:d,marginTop:y},e.each(["left","top"],function(n,r){e.ui.position[S[n]]&&e.ui.position[S[n]][r](C,{targetWidth:p,targetHeight:v,elemWidth:c,elemHeight:h,collisionPosition:i,collisionWidth:T,collisionHeight:N,offset:[s[0]+L[0],s[1]+L[1]],my:t.my,at:t.at,within:w,elem:l})}),t.using&&(f=function(e){var n=m.left-C.left,r=n+p-c,i=m.top-C.top,s=i+v-h,a={target:{element:b,left:m.left,top:m.top,width:p,height:v},element:{element:l,left:C.left,top:C.top,width:c,height:h},horizontal:0>r?"left":n>0?"right":"center",vertical:0>s?"top":i>0?"bottom":"middle"};c>p&&p>u(n+r)&&(a.horizontal="center"),h>v&&v>u(i+s)&&(a.vertical="middle"),a.important=o(u(n),u(r))>o(u(i),u(s))?"horizontal":"vertical",t.using.call(this,e,a)}),l.offset(e.extend(C,{using:f}))})},e.ui.position={fit:{left:function(e,t){var n,r=t.within,i=r.isWindow?r.scrollLeft:r.offset.left,s=r.width,u=e.left-t.collisionPosition.marginLeft,a=i-u,f=u+t.collisionWidth-s-i;t.collisionWidth>s?a>0&&0>=f?(n=e.left+a+t.collisionWidth-s-i,e.left+=a-n):e.left=f>0&&0>=a?i:a>f?i+s-t.collisionWidth:i:a>0?e.left+=a:f>0?e.left-=f:e.left=o(e.left-u,e.left)},top:function(e,t){var n,r=t.within,i=r.isWindow?r.scrollTop:r.offset.top,s=t.within.height,u=e.top-t.collisionPosition.marginTop,a=i-u,f=u+t.collisionHeight-s-i;t.collisionHeight>s?a>0&&0>=f?(n=e.top+a+t.collisionHeight-s-i,e.top+=a-n):e.top=f>0&&0>=a?i:a>f?i+s-t.collisionHeight:i:a>0?e.top+=a:f>0?e.top-=f:e.top=o(e.top-u,e.top)}},flip:{left:function(e,t){var n,r,i=t.within,s=i.offset.left+i.scrollLeft,o=i.width,a=i.isWindow?i.scrollLeft:i.offset.left,f=e.left-t.collisionPosition.marginLeft,l=f-a,c=f+t.collisionWidth-o-a,h="left"===t.my[0]?-t.elemWidth:"right"===t.my[0]?t.elemWidth:0,p="left"===t.at[0]?t.targetWidth:"right"===t.at[0]?-t.targetWidth:0,d=-2*t.offset[0];0>l?(n=e.left+h+p+d+t.collisionWidth-o-s,(0>n||u(l)>n)&&(e.left+=h+p+d)):c>0&&(r=e.left-t.collisionPosition.marginLeft+h+p+d-a,(r>0||c>u(r))&&(e.left+=h+p+d))},top:function(e,t){var n,r,i=t.within,s=i.offset.top+i.scrollTop,o=i.height,a=i.isWindow?i.scrollTop:i.offset.top,f=e.top-t.collisionPosition.marginTop,l=f-a,c=f+t.collisionHeight-o-a,h="top"===t.my[1],p=h?-t.elemHeight:"bottom"===t.my[1]?t.elemHeight:0,d="top"===t.at[1]?t.targetHeight:"bottom"===t.at[1]?-t.targetHeight:0,v=-2*t.offset[1];0>l?(r=e.top+p+d+v+t.collisionHeight-o-s,e.top+p+d+v>l&&(0>r||u(l)>r)&&(e.top+=p+d+v)):c>0&&(n=e.top-t.collisionPosition.marginTop+p+d+v-a,e.top+p+d+v>c&&(n>0||c>u(n))&&(e.top+=p+d+v))}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments),e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments),e.ui.position.fit.top.apply(this,arguments)}}},function(){var t,n,r,i,s,o=document.getElementsByTagName("body")[0],u=document.createElement("div");t=document.createElement(o?"div":"body"),r={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},o&&e.extend(r,{position:"absolute",left:"-1000px",top:"-1000px"});for(s in r)t.style[s]=r[s];t.appendChild(u),n=o||document.documentElement,n.insertBefore(t,n.firstChild),u.style.cssText="position: absolute; left: 10.7432222px;",i=e(u).offset().left,e.support.offsetFractions=i>10&&11>i,t.innerHTML="",n.removeChild(t)}()})(jQuery);(function(e){e.widget("ui.draggable",e.ui.mouse,{version:"1.10.3",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"!==this.options.helper||/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},_destroy:function(){this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy()},_mouseCapture:function(n){var r=this.options;return this.helper||r.disabled||e(n.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(n),this.handle?(e(r.iframeFix===!0?"iframe":r.iframeFix).each(function(){e("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(e(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(n){var r=this.options;return this.helper=this._createHelper(n),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offsetParent=this.helper.offsetParent(),this.offsetParentCssPosition=this.offsetParent.css("position"),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},this.offset.scroll=!1,e.extend(this.offset,{click:{left:n.pageX-this.offset.left,top:n.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(n),this.originalPageX=n.pageX,this.originalPageY=n.pageY,r.cursorAt&&this._adjustOffsetFromHelper(r.cursorAt),this._setContainment(),this._trigger("start",n)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!r.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,n),this._mouseDrag(n,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,n),!0)},_mouseDrag:function(n,r){if("fixed"===this.offsetParentCssPosition&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(n),this.positionAbs=this._convertPositionTo("absolute"),!r){var i=this._uiHash();if(this._trigger("drag",n,i)===!1)return this._mouseUp({}),!1;this.position=i.position}return this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),e.ui.ddmanager&&e.ui.ddmanager.drag(this,n),!1},_mouseStop:function(n){var r=this,i=!1;return e.ui.ddmanager&&!this.options.dropBehaviour&&(i=e.ui.ddmanager.drop(this,n)),this.dropped&&(i=this.dropped,this.dropped=!1),"original"!==this.options.helper||e.contains(this.element[0].ownerDocument,this.element[0])?("invalid"===this.options.revert&&!i||"valid"===this.options.revert&&i||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,i)?e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){r._trigger("stop",n)!==!1&&r._clear()}):this._trigger("stop",n)!==!1&&this._clear(),!1):!1},_mouseUp:function(n){return e("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,n),e.ui.mouse.prototype._mouseUp.call(this,n)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(n){return this.options.handle?!!e(n.target).closest(this.element.find(this.options.handle)).length:!0},_createHelper:function(n){var r=this.options,i=e.isFunction(r.helper)?e(r.helper.apply(this.element[0],[n])):"clone"===r.helper?this.element.clone().removeAttr("id"):this.element;return i.parents("body").length||i.appendTo("parent"===r.appendTo?this.element[0].parentNode:r.appendTo),i[0]===this.element[0]||/(fixed|absolute)/.test(i.css("position"))||i.css("position","absolute"),i},_adjustOffsetFromHelper:function(n){"string"==typeof n&&(n=n.split(" ")),e.isArray(n)&&(n={left:+n[0],top:+n[1]||0}),"left"in n&&(this.offset.click.left=n.left+this.margins.left),"right"in n&&(this.offset.click.left=this.helperProportions.width-n.right+this.margins.left),"top"in n&&(this.offset.click.top=n.top+this.margins.top),"bottom"in n&&(this.offset.click.top=this.helperProportions.height-n.bottom+this.margins.top)},_getParentOffset:function(){var n=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(n.left+=this.scrollParent.scrollLeft(),n.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(n={top:0,left:0}),{top:n.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:n.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var e=this.element.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var n,r,i,s=this.options;return s.containment?"window"===s.containment?(this.containment=[e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,e(window).scrollLeft()+e(window).width()-this.helperProportions.width-this.margins.left,e(window).scrollTop()+(e(window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],undefined):"document"===s.containment?(this.containment=[0,0,e(document).width()-this.helperProportions.width-this.margins.left,(e(document).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],undefined):s.containment.constructor===Array?(this.containment=s.containment,undefined):("parent"===s.containment&&(s.containment=this.helper[0].parentNode),r=e(s.containment),i=r[0],i&&(n="hidden"!==r.css("overflow"),this.containment=[(parseInt(r.css("borderLeftWidth"),10)||0)+(parseInt(r.css("paddingLeft"),10)||0),(parseInt(r.css("borderTopWidth"),10)||0)+(parseInt(r.css("paddingTop"),10)||0),(n?Math.max(i.scrollWidth,i.offsetWidth):i.offsetWidth)-(parseInt(r.css("borderRightWidth"),10)||0)-(parseInt(r.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(n?Math.max(i.scrollHeight,i.offsetHeight):i.offsetHeight)-(parseInt(r.css("borderBottomWidth"),10)||0)-(parseInt(r.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=r),undefined):(this.containment=null,undefined)},_convertPositionTo:function(n,r){r||(r=this.position);var i="absolute"===n?1:-1,s="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent;return this.offset.scroll||(this.offset.scroll={top:s.scrollTop(),left:s.scrollLeft()}),{top:r.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():this.offset.scroll.top)*i,left:r.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():this.offset.scroll.left)*i}},_generatePosition:function(n){var r,i,s,o,u=this.options,a="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,f=n.pageX,l=n.pageY;return this.offset.scroll||(this.offset.scroll={top:a.scrollTop(),left:a.scrollLeft()}),this.originalPosition&&(this.containment&&(this.relative_container?(i=this.relative_container.offset(),r=[this.containment[0]+i.left,this.containment[1]+i.top,this.containment[2]+i.left,this.containment[3]+i.top]):r=this.containment,n.pageX-this.offset.click.left<r[0]&&(f=r[0]+this.offset.click.left),n.pageY-this.offset.click.top<r[1]&&(l=r[1]+this.offset.click.top),n.pageX-this.offset.click.left>r[2]&&(f=r[2]+this.offset.click.left),n.pageY-this.offset.click.top>r[3]&&(l=r[3]+this.offset.click.top)),u.grid&&(s=u.grid[1]?this.originalPageY+Math.round((l-this.originalPageY)/u.grid[1])*u.grid[1]:this.originalPageY,l=r?s-this.offset.click.top>=r[1]||s-this.offset.click.top>r[3]?s:s-this.offset.click.top>=r[1]?s-u.grid[1]:s+u.grid[1]:s,o=u.grid[0]?this.originalPageX+Math.round((f-this.originalPageX)/u.grid[0])*u.grid[0]:this.originalPageX,f=r?o-this.offset.click.left>=r[0]||o-this.offset.click.left>r[2]?o:o-this.offset.click.left>=r[0]?o-u.grid[0]:o+u.grid[0]:o)),{top:l-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():this.offset.scroll.top),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():this.offset.scroll.left)}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(n,r,i){return i=i||this._uiHash(),e.ui.plugin.call(this,n,[r,i]),"drag"===n&&(this.positionAbs=this._convertPositionTo("absolute")),e.Widget.prototype._trigger.call(this,n,r,i)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(n,r){var i=e(this).data("ui-draggable"),s=i.options,o=e.extend({},r,{item:i.element});i.sortables=[],e(s.connectToSortable).each(function(){var r=e.data(this,"ui-sortable");r&&!r.options.disabled&&(i.sortables.push({instance:r,shouldRevert:r.options.revert}),r.refreshPositions(),r._trigger("activate",n,o))})},stop:function(n,r){var i=e(this).data("ui-draggable"),s=e.extend({},r,{item:i.element});e.each(i.sortables,function(){this.instance.isOver?(this.instance.isOver=0,i.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=this.shouldRevert),this.instance._mouseStop(n),this.instance.options.helper=this.instance.options._helper,"original"===i.options.helper&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",n,s))})},drag:function(n,r){var i=e(this).data("ui-draggable"),s=this;e.each(i.sortables,function(){var o=!1,u=this;this.instance.positionAbs=i.positionAbs,this.instance.helperProportions=i.helperProportions,this.instance.offset.click=i.offset.click,this.instance._intersectsWith(this.instance.containerCache)&&(o=!0,e.each(i.sortables,function(){return this.instance.positionAbs=i.positionAbs,this.instance.helperProportions=i.helperProportions,this.instance.offset.click=i.offset.click,this!==u&&this.instance._intersectsWith(this.instance.containerCache)&&e.contains(u.instance.element[0],this.instance.element[0])&&(o=!1),o})),o?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=e(s).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return r.helper[0]},n.target=this.instance.currentItem[0],this.instance._mouseCapture(n,!0),this.instance._mouseStart(n,!0,!0),this.instance.offset.click.top=i.offset.click.top,this.instance.offset.click.left=i.offset.click.left,this.instance.offset.parent.left-=i.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=i.offset.parent.top-this.instance.offset.parent.top,i._trigger("toSortable",n),i.dropped=this.instance.element,i.currentItem=i.element,this.instance.fromOutside=i),this.instance.currentItem&&this.instance._mouseDrag(n)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",n,this.instance._uiHash(this.instance)),this.instance._mouseStop(n,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),i._trigger("fromSortable",n),i.dropped=!1)})}}),e.ui.plugin.add("draggable","cursor",{start:function(){var n=e("body"),r=e(this).data("ui-draggable").options;n.css("cursor")&&(r._cursor=n.css("cursor")),n.css("cursor",r.cursor)},stop:function(){var n=e(this).data("ui-draggable").options;n._cursor&&e("body").css("cursor",n._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(n,r){var i=e(r.helper),s=e(this).data("ui-draggable").options;i.css("opacity")&&(s._opacity=i.css("opacity")),i.css("opacity",s.opacity)},stop:function(n,r){var i=e(this).data("ui-draggable").options;i._opacity&&e(r.helper).css("opacity",i._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(){var n=e(this).data("ui-draggable");n.scrollParent[0]!==document&&"HTML"!==n.scrollParent[0].tagName&&(n.overflowOffset=n.scrollParent.offset())},drag:function(n){var r=e(this).data("ui-draggable"),i=r.options,s=!1;r.scrollParent[0]!==document&&"HTML"!==r.scrollParent[0].tagName?(i.axis&&"x"===i.axis||(r.overflowOffset.top+r.scrollParent[0].offsetHeight-n.pageY<i.scrollSensitivity?r.scrollParent[0].scrollTop=s=r.scrollParent[0].scrollTop+i.scrollSpeed:n.pageY-r.overflowOffset.top<i.scrollSensitivity&&(r.scrollParent[0].scrollTop=s=r.scrollParent[0].scrollTop-i.scrollSpeed)),i.axis&&"y"===i.axis||(r.overflowOffset.left+r.scrollParent[0].offsetWidth-n.pageX<i.scrollSensitivity?r.scrollParent[0].scrollLeft=s=r.scrollParent[0].scrollLeft+i.scrollSpeed:n.pageX-r.overflowOffset.left<i.scrollSensitivity&&(r.scrollParent[0].scrollLeft=s=r.scrollParent[0].scrollLeft-i.scrollSpeed))):(i.axis&&"x"===i.axis||(n.pageY-e(document).scrollTop()<i.scrollSensitivity?s=e(document).scrollTop(e(document).scrollTop()-i.scrollSpeed):e(window).height()-(n.pageY-e(document).scrollTop())<i.scrollSensitivity&&(s=e(document).scrollTop(e(document).scrollTop()+i.scrollSpeed))),i.axis&&"y"===i.axis||(n.pageX-e(document).scrollLeft()<i.scrollSensitivity?s=e(document).scrollLeft(e(document).scrollLeft()-i.scrollSpeed):e(window).width()-(n.pageX-e(document).scrollLeft())<i.scrollSensitivity&&(s=e(document).scrollLeft(e(document).scrollLeft()+i.scrollSpeed)))),s!==!1&&e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(r,n)}}),e.ui.plugin.add("draggable","snap",{start:function(){var n=e(this).data("ui-draggable"),r=n.options;n.snapElements=[],e(r.snap.constructor!==String?r.snap.items||":data(ui-draggable)":r.snap).each(function(){var r=e(this),i=r.offset();this!==n.element[0]&&n.snapElements.push({item:this,width:r.outerWidth(),height:r.outerHeight(),top:i.top,left:i.left})})},drag:function(n,r){var i,s,o,u,a,f,l,c,h,p,d=e(this).data("ui-draggable"),v=d.options,m=v.snapTolerance,g=r.offset.left,y=g+d.helperProportions.width,b=r.offset.top,w=b+d.helperProportions.height;for(h=d.snapElements.length-1;h>=0;h--)a=d.snapElements[h].left,f=a+d.snapElements[h].width,l=d.snapElements[h].top,c=l+d.snapElements[h].height,a-m>y||g>f+m||l-m>w||b>c+m||!e.contains(d.snapElements[h].item.ownerDocument,d.snapElements[h].item)?(d.snapElements[h].snapping&&d.options.snap.release&&d.options.snap.release.call(d.element,n,e.extend(d._uiHash(),{snapItem:d.snapElements[h].item})),d.snapElements[h].snapping=!1):("inner"!==v.snapMode&&(i=m>=Math.abs(l-w),s=m>=Math.abs(c-b),o=m>=Math.abs(a-y),u=m>=Math.abs(f-g),i&&(r.position.top=d._convertPositionTo("relative",{top:l-d.helperProportions.height,left:0}).top-d.margins.top),s&&(r.position.top=d._convertPositionTo("relative",{top:c,left:0}).top-d.margins.top),o&&(r.position.left=d._convertPositionTo("relative",{top:0,left:a-d.helperProportions.width}).left-d.margins.left),u&&(r.position.left=d._convertPositionTo("relative",{top:0,left:f}).left-d.margins.left)),p=i||s||o||u,"outer"!==v.snapMode&&(i=m>=Math.abs(l-b),s=m>=Math.abs(c-w),o=m>=Math.abs(a-g),u=m>=Math.abs(f-y),i&&(r.position.top=d._convertPositionTo("relative",{top:l,left:0}).top-d.margins.top),s&&(r.position.top=d._convertPositionTo("relative",{top:c-d.helperProportions.height,left:0}).top-d.margins.top),o&&(r.position.left=d._convertPositionTo("relative",{top:0,left:a}).left-d.margins.left),u&&(r.position.left=d._convertPositionTo("relative",{top:0,left:f-d.helperProportions.width}).left-d.margins.left)),!d.snapElements[h].snapping&&(i||s||o||u||p)&&d.options.snap.snap&&d.options.snap.snap.call(d.element,n,e.extend(d._uiHash(),{snapItem:d.snapElements[h].item})),d.snapElements[h].snapping=i||s||o||u||p)}}),e.ui.plugin.add("draggable","stack",{start:function(){var n,r=this.data("ui-draggable").options,i=e.makeArray(e(r.stack)).sort(function(n,r){return(parseInt(e(n).css("zIndex"),10)||0)-(parseInt(e(r).css("zIndex"),10)||0)});i.length&&(n=parseInt(e(i[0]).css("zIndex"),10)||0,e(i).each(function(r){e(this).css("zIndex",n+r)}),this.css("zIndex",n+i.length))}}),e.ui.plugin.add("draggable","zIndex",{start:function(n,r){var i=e(r.helper),s=e(this).data("ui-draggable").options;i.css("zIndex")&&(s._zIndex=i.css("zIndex")),i.css("zIndex",s.zIndex)},stop:function(n,r){var i=e(this).data("ui-draggable").options;i._zIndex&&e(r.helper).css("zIndex",i._zIndex)}})})(jQuery);(function(e){function t(e){return parseInt(e,10)||0}function n(e){return!isNaN(parseInt(e,10))}e.widget("ui.resizable",e.ui.mouse,{version:"1.10.3",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_create:function(){var t,n,r,i,s,o=this,u=this.options;if(this.element.addClass("ui-resizable"),e.extend(this,{_aspectRatio:!!u.aspectRatio,aspectRatio:u.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:u.helper||u.ghost||u.animate?u.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.data("ui-resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=u.handles||(e(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),t=this.handles.split(","),this.handles={},n=0;t.length>n;n++)r=e.trim(t[n]),s="ui-resizable-"+r,i=e("<div class='ui-resizable-handle "+s+"'></div>"),i.css({zIndex:u.zIndex}),"se"===r&&i.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[r]=".ui-resizable-"+r,this.element.append(i);this._renderAxis=function(t){var n,r,i,s;t=t||this.element;for(n in this.handles)this.handles[n].constructor===String&&(this.handles[n]=e(this.handles[n],this.element).show()),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)&&(r=e(this.handles[n],this.element),s=/sw|ne|nw|se|n|s/.test(n)?r.outerHeight():r.outerWidth(),i=["padding",/ne|nw|n/.test(n)?"Top":/se|sw|s/.test(n)?"Bottom":/^e$/.test(n)?"Right":"Left"].join(""),t.css(i,s),this._proportionallyResize()),e(this.handles[n]).length},this._renderAxis(this.element),this._handles=e(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){o.resizing||(this.className&&(i=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),o.axis=i&&i[1]?i[1]:"se")}),u.autoHide&&(this._handles.hide(),e(this.element).addClass("ui-resizable-autohide").mouseenter(function(){u.disabled||(e(this).removeClass("ui-resizable-autohide"),o._handles.show())}).mouseleave(function(){u.disabled||o.resizing||(e(this).addClass("ui-resizable-autohide"),o._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var t,n=function(t){e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(n(this.element),t=this.element,this.originalElement.css({position:t.css("position"),width:t.outerWidth(),height:t.outerHeight(),top:t.css("top"),left:t.css("left")}).insertAfter(t),t.remove()),this.originalElement.css("resize",this.originalResizeStyle),n(this.originalElement),this},_mouseCapture:function(t){var n,r,i=!1;for(n in this.handles)r=e(this.handles[n])[0],(r===t.target||e.contains(r,t.target))&&(i=!0);return!this.options.disabled&&i},_mouseStart:function(n){var r,i,s,o=this.options,u=this.element.position(),a=this.element;return this.resizing=!0,/absolute/.test(a.css("position"))?a.css({position:"absolute",top:a.css("top"),left:a.css("left")}):a.is(".ui-draggable")&&a.css({position:"absolute",top:u.top,left:u.left}),this._renderProxy(),r=t(this.helper.css("left")),i=t(this.helper.css("top")),o.containment&&(r+=e(o.containment).scrollLeft()||0,i+=e(o.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:r,top:i},this.size=this._helper?{width:a.outerWidth(),height:a.outerHeight()}:{width:a.width(),height:a.height()},this.originalSize=this._helper?{width:a.outerWidth(),height:a.outerHeight()}:{width:a.width(),height:a.height()},this.originalPosition={left:r,top:i},this.sizeDiff={width:a.outerWidth()-a.width(),height:a.outerHeight()-a.height()},this.originalMousePosition={left:n.pageX,top:n.pageY},this.aspectRatio="number"==typeof o.aspectRatio?o.aspectRatio:this.originalSize.width/this.originalSize.height||1,s=e(".ui-resizable-"+this.axis).css("cursor"),e("body").css("cursor","auto"===s?this.axis+"-resize":s),a.addClass("ui-resizable-resizing"),this._propagate("start",n),!0},_mouseDrag:function(t){var n,r=this.helper,i={},s=this.originalMousePosition,o=this.axis,u=this.position.top,a=this.position.left,f=this.size.width,l=this.size.height,c=t.pageX-s.left||0,h=t.pageY-s.top||0,p=this._change[o];return p?(n=p.apply(this,[t,c,h]),this._updateVirtualBoundaries(t.shiftKey),(this._aspectRatio||t.shiftKey)&&(n=this._updateRatio(n,t)),n=this._respectSize(n,t),this._updateCache(n),this._propagate("resize",t),this.position.top!==u&&(i.top=this.position.top+"px"),this.position.left!==a&&(i.left=this.position.left+"px"),this.size.width!==f&&(i.width=this.size.width+"px"),this.size.height!==l&&(i.height=this.size.height+"px"),r.css(i),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),e.isEmptyObject(i)||this._trigger("resize",t,this.ui()),!1):!1},_mouseStop:function(t){this.resizing=!1;var n,r,i,s,o,u,a,f=this.options,l=this;return this._helper&&(n=this._proportionallyResizeElements,r=n.length&&/textarea/i.test(n[0].nodeName),i=r&&e.ui.hasScroll(n[0],"left")?0:l.sizeDiff.height,s=r?0:l.sizeDiff.width,o={width:l.helper.width()-s,height:l.helper.height()-i},u=parseInt(l.element.css("left"),10)+(l.position.left-l.originalPosition.left)||null,a=parseInt(l.element.css("top"),10)+(l.position.top-l.originalPosition.top)||null,f.animate||this.element.css(e.extend(o,{top:a,left:u})),l.helper.height(l.size.height),l.helper.width(l.size.width),this._helper&&!f.animate&&this._proportionallyResize()),e("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1},_updateVirtualBoundaries:function(e){var t,r,s,o,u,a=this.options;u={minWidth:n(a.minWidth)?a.minWidth:0,maxWidth:n(a.maxWidth)?a.maxWidth:1/0,minHeight:n(a.minHeight)?a.minHeight:0,maxHeight:n(a.maxHeight)?a.maxHeight:1/0},(this._aspectRatio||e)&&(t=u.minHeight*this.aspectRatio,s=u.minWidth/this.aspectRatio,r=u.maxHeight*this.aspectRatio,o=u.maxWidth/this.aspectRatio,t>u.minWidth&&(u.minWidth=t),s>u.minHeight&&(u.minHeight=s),u.maxWidth>r&&(u.maxWidth=r),u.maxHeight>o&&(u.maxHeight=o)),this._vBoundaries=u},_updateCache:function(e){this.offset=this.helper.offset(),n(e.left)&&(this.position.left=e.left),n(e.top)&&(this.position.top=e.top),n(e.height)&&(this.size.height=e.height),n(e.width)&&(this.size.width=e.width)},_updateRatio:function(e){var t=this.position,r=this.size,s=this.axis;return n(e.height)?e.width=e.height*this.aspectRatio:n(e.width)&&(e.height=e.width/this.aspectRatio),"sw"===s&&(e.left=t.left+(r.width-e.width),e.top=null),"nw"===s&&(e.top=t.top+(r.height-e.height),e.left=t.left+(r.width-e.width)),e},_respectSize:function(e){var t=this._vBoundaries,r=this.axis,s=n(e.width)&&t.maxWidth&&t.maxWidth<e.width,o=n(e.height)&&t.maxHeight&&t.maxHeight<e.height,u=n(e.width)&&t.minWidth&&t.minWidth>e.width,a=n(e.height)&&t.minHeight&&t.minHeight>e.height,f=this.originalPosition.left+this.originalSize.width,l=this.position.top+this.size.height,c=/sw|nw|w/.test(r),h=/nw|ne|n/.test(r);return u&&(e.width=t.minWidth),a&&(e.height=t.minHeight),s&&(e.width=t.maxWidth),o&&(e.height=t.maxHeight),u&&c&&(e.left=f-t.minWidth),s&&c&&(e.left=f-t.maxWidth),a&&h&&(e.top=l-t.minHeight),o&&h&&(e.top=l-t.maxHeight),e.width||e.height||e.left||!e.top?e.width||e.height||e.top||!e.left||(e.left=null):e.top=null,e},_proportionallyResize:function(){if(this._proportionallyResizeElements.length){var e,t,n,r,i,s=this.helper||this.element;for(e=0;this._proportionallyResizeElements.length>e;e++){if(i=this._proportionallyResizeElements[e],!this.borderDif)for(this.borderDif=[],n=[i.css("borderTopWidth"),i.css("borderRightWidth"),i.css("borderBottomWidth"),i.css("borderLeftWidth")],r=[i.css("paddingTop"),i.css("paddingRight"),i.css("paddingBottom"),i.css("paddingLeft")],t=0;n.length>t;t++)this.borderDif[t]=(parseInt(n[t],10)||0)+(parseInt(r[t],10)||0);i.css({height:s.height()-this.borderDif[0]-this.borderDif[2]||0,width:s.width()-this.borderDif[1]-this.borderDif[3]||0})}}},_renderProxy:function(){var t=this.element,n=this.options;this.elementOffset=t.offset(),this._helper?(this.helper=this.helper||e("<div style='overflow:hidden;'></div>"),this.helper.addClass(this._helper).css({width:this.element.outerWidth()-1,height:this.element.outerHeight()-1,position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++n.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(e,t){return{width:this.originalSize.width+t}},w:function(e,t){var n=this.originalSize,r=this.originalPosition;return{left:r.left+t,width:n.width-t}},n:function(e,t,n){var r=this.originalSize,i=this.originalPosition;return{top:i.top+n,height:r.height-n}},s:function(e,t,n){return{height:this.originalSize.height+n}},se:function(t,n,r){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,n,r]))},sw:function(t,n,r){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,n,r]))},ne:function(t,n,r){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,n,r]))},nw:function(t,n,r){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,n,r]))}},_propagate:function(t,n){e.ui.plugin.call(this,t,[n,this.ui()]),"resize"!==t&&this._trigger(t,n,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),e.ui.plugin.add("resizable","animate",{stop:function(t){var n=e(this).data("ui-resizable"),r=n.options,i=n._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),o=s&&e.ui.hasScroll(i[0],"left")?0:n.sizeDiff.height,u=s?0:n.sizeDiff.width,a={width:n.size.width-u,height:n.size.height-o},f=parseInt(n.element.css("left"),10)+(n.position.left-n.originalPosition.left)||null,l=parseInt(n.element.css("top"),10)+(n.position.top-n.originalPosition.top)||null;n.element.animate(e.extend(a,l&&f?{top:l,left:f}:{}),{duration:r.animateDuration,easing:r.animateEasing,step:function(){var r={width:parseInt(n.element.css("width"),10),height:parseInt(n.element.css("height"),10),top:parseInt(n.element.css("top"),10),left:parseInt(n.element.css("left"),10)};i&&i.length&&e(i[0]).css({width:r.width,height:r.height}),n._updateCache(r),n._propagate("resize",t)}})}}),e.ui.plugin.add("resizable","containment",{start:function(){var n,r,i,s,o,u,a,f=e(this).data("ui-resizable"),l=f.options,c=f.element,h=l.containment,p=h instanceof e?h.get(0):/parent/.test(h)?c.parent().get(0):h;p&&(f.containerElement=e(p),/document/.test(h)||h===document?(f.containerOffset={left:0,top:0},f.containerPosition={left:0,top:0},f.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}):(n=e(p),r=[],e(["Top","Right","Left","Bottom"]).each(function(e,i){r[e]=t(n.css("padding"+i))}),f.containerOffset=n.offset(),f.containerPosition=n.position(),f.containerSize={height:n.innerHeight()-r[3],width:n.innerWidth()-r[1]},i=f.containerOffset,s=f.containerSize.height,o=f.containerSize.width,u=e.ui.hasScroll(p,"left")?p.scrollWidth:o,a=e.ui.hasScroll(p)?p.scrollHeight:s,f.parentData={element:p,left:i.left,top:i.top,width:u,height:a}))},resize:function(t){var n,r,i,s,o=e(this).data("ui-resizable"),u=o.options,a=o.containerOffset,f=o.position,l=o._aspectRatio||t.shiftKey,c={top:0,left:0},h=o.containerElement;h[0]!==document&&/static/.test(h.css("position"))&&(c=a),f.left<(o._helper?a.left:0)&&(o.size.width=o.size.width+(o._helper?o.position.left-a.left:o.position.left-c.left),l&&(o.size.height=o.size.width/o.aspectRatio),o.position.left=u.helper?a.left:0),f.top<(o._helper?a.top:0)&&(o.size.height=o.size.height+(o._helper?o.position.top-a.top:o.position.top),l&&(o.size.width=o.size.height*o.aspectRatio),o.position.top=o._helper?a.top:0),o.offset.left=o.parentData.left+o.position.left,o.offset.top=o.parentData.top+o.position.top,n=Math.abs((o._helper?o.offset.left-c.left:o.offset.left-c.left)+o.sizeDiff.width),r=Math.abs((o._helper?o.offset.top-c.top:o.offset.top-a.top)+o.sizeDiff.height),i=o.containerElement.get(0)===o.element.parent().get(0),s=/relative|absolute/.test(o.containerElement.css("position")),i&&s&&(n-=o.parentData.left),n+o.size.width>=o.parentData.width&&(o.size.width=o.parentData.width-n,l&&(o.size.height=o.size.width/o.aspectRatio)),r+o.size.height>=o.parentData.height&&(o.size.height=o.parentData.height-r,l&&(o.size.width=o.size.height*o.aspectRatio))},stop:function(){var t=e(this).data("ui-resizable"),n=t.options,r=t.containerOffset,i=t.containerPosition,s=t.containerElement,o=e(t.helper),u=o.offset(),a=o.outerWidth()-t.sizeDiff.width,f=o.outerHeight()-t.sizeDiff.height;t._helper&&!n.animate&&/relative/.test(s.css("position"))&&e(this).css({left:u.left-i.left-r.left,width:a,height:f}),t._helper&&!n.animate&&/static/.test(s.css("position"))&&e(this).css({left:u.left-i.left-r.left,width:a,height:f})}}),e.ui.plugin.add("resizable","alsoResize",{start:function(){var t=e(this).data("ui-resizable"),n=t.options,r=function(t){e(t).each(function(){var t=e(this);t.data("ui-resizable-alsoresize",{width:parseInt(t.width(),10),height:parseInt(t.height(),10),left:parseInt(t.css("left"),10),top:parseInt(t.css("top"),10)})})};"object"!=typeof n.alsoResize||n.alsoResize.parentNode?r(n.alsoResize):n.alsoResize.length?(n.alsoResize=n.alsoResize[0],r(n.alsoResize)):e.each(n.alsoResize,function(e){r(e)})},resize:function(t,n){var r=e(this).data("ui-resizable"),i=r.options,s=r.originalSize,o=r.originalPosition,u={height:r.size.height-s.height||0,width:r.size.width-s.width||0,top:r.position.top-o.top||0,left:r.position.left-o.left||0},a=function(t,r){e(t).each(function(){var t=e(this),i=e(this).data("ui-resizable-alsoresize"),s={},o=r&&r.length?r:t.parents(n.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(o,function(e,t){var n=(i[t]||0)+(u[t]||0);n&&n>=0&&(s[t]=n||null)}),t.css(s)})};"object"!=typeof i.alsoResize||i.alsoResize.nodeType?a(i.alsoResize):e.each(i.alsoResize,function(e,t){a(e,t)})},stop:function(){e(this).removeData("resizable-alsoresize")}}),e.ui.plugin.add("resizable","ghost",{start:function(){var t=e(this).data("ui-resizable"),n=t.options,r=t.size;t.ghost=t.originalElement.clone(),t.ghost.css({opacity:.25,display:"block",position:"relative",height:r.height,width:r.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof n.ghost?n.ghost:""),t.ghost.appendTo(t.helper)},resize:function(){var t=e(this).data("ui-resizable");t.ghost&&t.ghost.css({position:"relative",height:t.size.height,width:t.size.width})},stop:function(){var t=e(this).data("ui-resizable");t.ghost&&t.helper&&t.helper.get(0).removeChild(t.ghost.get(0))}}),e.ui.plugin.add("resizable","grid",{resize:function(){var t=e(this).data("ui-resizable"),n=t.options,r=t.size,i=t.originalSize,s=t.originalPosition,o=t.axis,u="number"==typeof n.grid?[n.grid,n.grid]:n.grid,a=u[0]||1,f=u[1]||1,l=Math.round((r.width-i.width)/a)*a,c=Math.round((r.height-i.height)/f)*f,h=i.width+l,p=i.height+c,d=n.maxWidth&&h>n.maxWidth,v=n.maxHeight&&p>n.maxHeight,m=n.minWidth&&n.minWidth>h,g=n.minHeight&&n.minHeight>p;n.grid=u,m&&(h+=a),g&&(p+=f),d&&(h-=a),v&&(p-=f),/^(se|s|e)$/.test(o)?(t.size.width=h,t.size.height=p):/^(ne)$/.test(o)?(t.size.width=h,t.size.height=p,t.position.top=s.top-c):/^(sw)$/.test(o)?(t.size.width=h,t.size.height=p,t.position.left=s.left-l):(t.size.width=h,t.size.height=p,t.position.top=s.top-c,t.position.left=s.left-l)}})})(jQuery);(function(e){function t(e,t,n){return e>t&&t+n>e}function n(e){return/left|right/.test(e.css("float"))||/inline|table-cell/.test(e.css("display"))}e.widget("ui.sortable",e.ui.mouse,{version:"1.10.3",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_create:function(){var e=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?"x"===e.axis||n(this.items[0].item):!1,this.offset=this.element.offset(),this._mouseInit(),this.ready=!0},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();for(var e=this.items.length-1;e>=0;e--)this.items[e].item.removeData(this.widgetName+"-item");return this},_setOption:function(t,n){"disabled"===t?(this.options[t]=n,this.widget().toggleClass("ui-sortable-disabled",!!n)):e.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(t,n){var r=null,i=!1,s=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(t),e(t.target).parents().each(function(){return e.data(this,s.widgetName+"-item")===s?(r=e(this),!1):undefined}),e.data(t.target,s.widgetName+"-item")===s&&(r=e(t.target)),r?!this.options.handle||n||(e(this.options.handle,r).find("*").addBack().each(function(){this===t.target&&(i=!0)}),i)?(this.currentItem=r,this._removeCurrentsFromItems(),!0):!1:!1)},_mouseStart:function(t,n,r){var i,s,o=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(t),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),o.containment&&this._setContainment(),o.cursor&&"auto"!==o.cursor&&(s=this.document.find("body"),this.storedCursor=s.css("cursor"),s.css("cursor",o.cursor),this.storedStylesheet=e("<style>*{ cursor: "+o.cursor+" !important; }</style>").appendTo(s)),o.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",o.opacity)),o.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",o.zIndex)),this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",t,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!r)for(i=this.containers.length-1;i>=0;i--)this.containers[i]._trigger("activate",t,this._uiHash(this));return e.ui.ddmanager&&(e.ui.ddmanager.current=this),e.ui.ddmanager&&!o.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(t),!0},_mouseDrag:function(t){var n,r,i,s,o=this.options,u=!1;for(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<o.scrollSensitivity?this.scrollParent[0].scrollTop=u=this.scrollParent[0].scrollTop+o.scrollSpeed:t.pageY-this.overflowOffset.top<o.scrollSensitivity&&(this.scrollParent[0].scrollTop=u=this.scrollParent[0].scrollTop-o.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<o.scrollSensitivity?this.scrollParent[0].scrollLeft=u=this.scrollParent[0].scrollLeft+o.scrollSpeed:t.pageX-this.overflowOffset.left<o.scrollSensitivity&&(this.scrollParent[0].scrollLeft=u=this.scrollParent[0].scrollLeft-o.scrollSpeed)):(t.pageY-e(document).scrollTop()<o.scrollSensitivity?u=e(document).scrollTop(e(document).scrollTop()-o.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<o.scrollSensitivity&&(u=e(document).scrollTop(e(document).scrollTop()+o.scrollSpeed)),t.pageX-e(document).scrollLeft()<o.scrollSensitivity?u=e(document).scrollLeft(e(document).scrollLeft()-o.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<o.scrollSensitivity&&(u=e(document).scrollLeft(e(document).scrollLeft()+o.scrollSpeed))),u!==!1&&e.ui.ddmanager&&!o.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),n=this.items.length-1;n>=0;n--)if(r=this.items[n],i=r.item[0],s=this._intersectsWithPointer(r),s&&r.instance===this.currentContainer&&i!==this.currentItem[0]&&this.placeholder[1===s?"next":"prev"]()[0]!==i&&!e.contains(this.placeholder[0],i)&&("semi-dynamic"===this.options.type?!e.contains(this.element[0],i):!0)){if(this.direction=1===s?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(r))break;this._rearrange(t,r),this._trigger("change",t,this._uiHash());break}return this._contactContainers(t),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t,n){if(t){if(e.ui.ddmanager&&!this.options.dropBehaviour&&e.ui.ddmanager.drop(this,t),this.options.revert){var r=this,i=this.placeholder.offset(),s=this.options.axis,o={};s&&"x"!==s||(o.left=i.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollLeft)),s&&"y"!==s||(o.top=i.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,e(this.helper).animate(o,parseInt(this.options.revert,10)||500,function(){r._clear(t)})}else this._clear(t,n);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var t=this.containers.length-1;t>=0;t--)this.containers[t]._trigger("deactivate",null,this._uiHash(this)),this.containers[t].containerCache.over&&(this.containers[t]._trigger("out",null,this._uiHash(this)),this.containers[t].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),e.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?e(this.domPosition.prev).after(this.currentItem):e(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(t){var n=this._getItemsAsjQuery(t&&t.connected),r=[];return t=t||{},e(n).each(function(){var n=(e(t.item||this).attr(t.attribute||"id")||"").match(t.expression||/(.+)[\-=_](.+)/);n&&r.push((t.key||n[1]+"[]")+"="+(t.key&&t.expression?n[1]:n[2]))}),!r.length&&t.key&&r.push(t.key+"="),r.join("&")},toArray:function(t){var n=this._getItemsAsjQuery(t&&t.connected),r=[];return t=t||{},n.each(function(){r.push(e(t.item||this).attr(t.attribute||"id")||"")}),r},_intersectsWith:function(e){var t=this.positionAbs.left,n=t+this.helperProportions.width,r=this.positionAbs.top,i=r+this.helperProportions.height,s=e.left,o=s+e.width,u=e.top,a=u+e.height,f=this.offset.click.top,l=this.offset.click.left,c="x"===this.options.axis||r+f>u&&a>r+f,h="y"===this.options.axis||t+l>s&&o>t+l,p=c&&h;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>e[this.floating?"width":"height"]?p:t+this.helperProportions.width/2>s&&o>n-this.helperProportions.width/2&&r+this.helperProportions.height/2>u&&a>i-this.helperProportions.height/2},_intersectsWithPointer:function(e){var n="x"===this.options.axis||t(this.positionAbs.top+this.offset.click.top,e.top,e.height),r="y"===this.options.axis||t(this.positionAbs.left+this.offset.click.left,e.left,e.width),i=n&&r,s=this._getDragVerticalDirection(),o=this._getDragHorizontalDirection();return i?this.floating?o&&"right"===o||"down"===s?2:1:s&&("down"===s?2:1):!1},_intersectsWithSides:function(e){var n=t(this.positionAbs.top+this.offset.click.top,e.top+e.height/2,e.height),r=t(this.positionAbs.left+this.offset.click.left,e.left+e.width/2,e.width),i=this._getDragVerticalDirection(),s=this._getDragHorizontalDirection();return this.floating&&s?"right"===s&&r||"left"===s&&!r:i&&("down"===i&&n||"up"===i&&!n)},_getDragVerticalDirection:function(){var e=this.positionAbs.top-this.lastPositionAbs.top;return 0!==e&&(e>0?"down":"up")},_getDragHorizontalDirection:function(){var e=this.positionAbs.left-this.lastPositionAbs.left;return 0!==e&&(e>0?"right":"left")},refresh:function(e){return this._refreshItems(e),this.refreshPositions(),this},_connectWith:function(){var e=this.options;return e.connectWith.constructor===String?[e.connectWith]:e.connectWith},_getItemsAsjQuery:function(t){var n,r,i,s,o=[],u=[],a=this._connectWith();if(a&&t)for(n=a.length-1;n>=0;n--)for(i=e(a[n]),r=i.length-1;r>=0;r--)s=e.data(i[r],this.widgetFullName),s&&s!==this&&!s.options.disabled&&u.push([e.isFunction(s.options.items)?s.options.items.call(s.element):e(s.options.items,s.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),s]);for(u.push([e.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):e(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),n=u.length-1;n>=0;n--)u[n][0].each(function(){o.push(this)});return e(o)},_removeCurrentsFromItems:function(){var t=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=e.grep(this.items,function(e){for(var n=0;t.length>n;n++)if(t[n]===e.item[0])return!1;return!0})},_refreshItems:function(t){this.items=[],this.containers=[this];var n,r,i,s,o,u,a,f,l=this.items,c=[[e.isFunction(this.options.items)?this.options.items.call(this.element[0],t,{item:this.currentItem}):e(this.options.items,this.element),this]],h=this._connectWith();if(h&&this.ready)for(n=h.length-1;n>=0;n--)for(i=e(h[n]),r=i.length-1;r>=0;r--)s=e.data(i[r],this.widgetFullName),s&&s!==this&&!s.options.disabled&&(c.push([e.isFunction(s.options.items)?s.options.items.call(s.element[0],t,{item:this.currentItem}):e(s.options.items,s.element),s]),this.containers.push(s));for(n=c.length-1;n>=0;n--)for(o=c[n][1],u=c[n][0],r=0,f=u.length;f>r;r++)a=e(u[r]),a.data(this.widgetName+"-item",o),l.push({item:a,instance:o,width:0,height:0,left:0,top:0})},refreshPositions:function(t){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var n,r,i,s;for(n=this.items.length-1;n>=0;n--)r=this.items[n],r.instance!==this.currentContainer&&this.currentContainer&&r.item[0]!==this.currentItem[0]||(i=this.options.toleranceElement?e(this.options.toleranceElement,r.item):r.item,t||(r.width=i.outerWidth(),r.height=i.outerHeight()),s=i.offset(),r.left=s.left,r.top=s.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(n=this.containers.length-1;n>=0;n--)s=this.containers[n].element.offset(),this.containers[n].containerCache.left=s.left,this.containers[n].containerCache.top=s.top,this.containers[n].containerCache.width=this.containers[n].element.outerWidth(),this.containers[n].containerCache.height=this.containers[n].element.outerHeight();return this},_createPlaceholder:function(t){t=t||this;var n,r=t.options;r.placeholder&&r.placeholder.constructor!==String||(n=r.placeholder,r.placeholder={element:function(){var r=t.currentItem[0].nodeName.toLowerCase(),s=e("<"+r+">",t.document[0]).addClass(n||t.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper");return"tr"===r?t.currentItem.children().each(function(){e("<td>&#160;</td>",t.document[0]).attr("colspan",e(this).attr("colspan")||1).appendTo(s)}):"img"===r&&s.attr("src",t.currentItem.attr("src")),n||s.css("visibility","hidden"),s},update:function(e,o){(!n||r.forcePlaceholderSize)&&(o.height()||o.height(t.currentItem.innerHeight()-parseInt(t.currentItem.css("paddingTop")||0,10)-parseInt(t.currentItem.css("paddingBottom")||0,10)),o.width()||o.width(t.currentItem.innerWidth()-parseInt(t.currentItem.css("paddingLeft")||0,10)-parseInt(t.currentItem.css("paddingRight")||0,10)))}}),t.placeholder=e(r.placeholder.element.call(t.element,t.currentItem)),t.currentItem.after(t.placeholder),r.placeholder.update(t,t.placeholder)},_contactContainers:function(r){var s,o,u,a,f,l,c,h,p,d,v=null,m=null;for(s=this.containers.length-1;s>=0;s--)if(!e.contains(this.currentItem[0],this.containers[s].element[0]))if(this._intersectsWith(this.containers[s].containerCache)){if(v&&e.contains(this.containers[s].element[0],v.element[0]))continue;v=this.containers[s],m=s}else this.containers[s].containerCache.over&&(this.containers[s]._trigger("out",r,this._uiHash(this)),this.containers[s].containerCache.over=0);if(v)if(1===this.containers.length)this.containers[m].containerCache.over||(this.containers[m]._trigger("over",r,this._uiHash(this)),this.containers[m].containerCache.over=1);else{for(u=1e4,a=null,d=v.floating||n(this.currentItem),f=d?"left":"top",l=d?"width":"height",c=this.positionAbs[f]+this.offset.click[f],o=this.items.length-1;o>=0;o--)e.contains(this.containers[m].element[0],this.items[o].item[0])&&this.items[o].item[0]!==this.currentItem[0]&&(!d||t(this.positionAbs.top+this.offset.click.top,this.items[o].top,this.items[o].height))&&(h=this.items[o].item.offset()[f],p=!1,Math.abs(h-c)>Math.abs(h+this.items[o][l]-c)&&(p=!0,h+=this.items[o][l]),u>Math.abs(h-c)&&(u=Math.abs(h-c),a=this.items[o],this.direction=p?"up":"down"));if(!a&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[m])return;a?this._rearrange(r,a,null,!0):this._rearrange(r,null,this.containers[m].element,!0),this._trigger("change",r,this._uiHash()),this.containers[m]._trigger("change",r,this._uiHash(this)),this.currentContainer=this.containers[m],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[m]._trigger("over",r,this._uiHash(this)),this.containers[m].containerCache.over=1}},_createHelper:function(t){var n=this.options,r=e.isFunction(n.helper)?e(n.helper.apply(this.element[0],[t,this.currentItem])):"clone"===n.helper?this.currentItem.clone():this.currentItem;return r.parents("body").length||e("parent"!==n.appendTo?n.appendTo:this.currentItem[0].parentNode)[0].appendChild(r[0]),r[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!r[0].style.width||n.forceHelperSize)&&r.width(this.currentItem.width()),(!r[0].style.height||n.forceHelperSize)&&r.height(this.currentItem.height()),r},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var e=this.currentItem.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,n,r,i=this.options;"parent"===i.containment&&(i.containment=this.helper[0].parentNode),("document"===i.containment||"window"===i.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,e("document"===i.containment?document:window).width()-this.helperProportions.width-this.margins.left,(e("document"===i.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(i.containment)||(t=e(i.containment)[0],n=e(i.containment).offset(),r="hidden"!==e(t).css("overflow"),this.containment=[n.left+(parseInt(e(t).css("borderLeftWidth"),10)||0)+(parseInt(e(t).css("paddingLeft"),10)||0)-this.margins.left,n.top+(parseInt(e(t).css("borderTopWidth"),10)||0)+(parseInt(e(t).css("paddingTop"),10)||0)-this.margins.top,n.left+(r?Math.max(t.scrollWidth,t.offsetWidth):t.offsetWidth)-(parseInt(e(t).css("borderLeftWidth"),10)||0)-(parseInt(e(t).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,n.top+(r?Math.max(t.scrollHeight,t.offsetHeight):t.offsetHeight)-(parseInt(e(t).css("borderTopWidth"),10)||0)-(parseInt(e(t).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(t,n){n||(n=this.position);var r="absolute"===t?1:-1,i="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,s=/(html|body)/i.test(i[0].tagName);return{top:n.top+this.offset.relative.top*r+this.offset.parent.top*r-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():s?0:i.scrollTop())*r,left:n.left+this.offset.relative.left*r+this.offset.parent.left*r-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():s?0:i.scrollLeft())*r}},_generatePosition:function(t){var n,r,i=this.options,s=t.pageX,o=t.pageY,u="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,a=/(html|body)/i.test(u[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==document&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(t.pageX-this.offset.click.left<this.containment[0]&&(s=this.containment[0]+this.offset.click.left),t.pageY-this.offset.click.top<this.containment[1]&&(o=this.containment[1]+this.offset.click.top),t.pageX-this.offset.click.left>this.containment[2]&&(s=this.containment[2]+this.offset.click.left),t.pageY-this.offset.click.top>this.containment[3]&&(o=this.containment[3]+this.offset.click.top)),i.grid&&(n=this.originalPageY+Math.round((o-this.originalPageY)/i.grid[1])*i.grid[1],o=this.containment?n-this.offset.click.top>=this.containment[1]&&n-this.offset.click.top<=this.containment[3]?n:n-this.offset.click.top>=this.containment[1]?n-i.grid[1]:n+i.grid[1]:n,r=this.originalPageX+Math.round((s-this.originalPageX)/i.grid[0])*i.grid[0],s=this.containment?r-this.offset.click.left>=this.containment[0]&&r-this.offset.click.left<=this.containment[2]?r:r-this.offset.click.left>=this.containment[0]?r-i.grid[0]:r+i.grid[0]:r)),{top:o-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():a?0:u.scrollTop()),left:s-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():a?0:u.scrollLeft())}},_rearrange:function(e,t,n,r){n?n[0].appendChild(this.placeholder[0]):t.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?t.item[0]:t.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var i=this.counter;this._delay(function(){i===this.counter&&this.refreshPositions(!r)})},_clear:function(e,t){this.reverting=!1;var n,r=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(n in this._storedCSS)("auto"===this._storedCSS[n]||"static"===this._storedCSS[n])&&(this._storedCSS[n]="");this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!t&&r.push(function(e){this._trigger("receive",e,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||t||r.push(function(e){this._trigger("update",e,this._uiHash())}),this!==this.currentContainer&&(t||(r.push(function(e){this._trigger("remove",e,this._uiHash())}),r.push(function(e){return function(t){e._trigger("receive",t,this._uiHash(this))}}.call(this,this.currentContainer)),r.push(function(e){return function(t){e._trigger("update",t,this._uiHash(this))}}.call(this,this.currentContainer)))),n=this.containers.length-1;n>=0;n--)t||r.push(function(e){return function(t){e._trigger("deactivate",t,this._uiHash(this))}}.call(this,this.containers[n])),this.containers[n].containerCache.over&&(r.push(function(e){return function(t){e._trigger("out",t,this._uiHash(this))}}.call(this,this.containers[n])),this.containers[n].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,this.cancelHelperRemoval){if(!t){for(this._trigger("beforeStop",e,this._uiHash()),n=0;r.length>n;n++)r[n].call(this,e);this._trigger("stop",e,this._uiHash())}return this.fromOutside=!1,!1}if(t||this._trigger("beforeStop",e,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null,!t){for(n=0;r.length>n;n++)r[n].call(this,e);this._trigger("stop",e,this._uiHash())}return this.fromOutside=!1,!0},_trigger:function(){e.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(t){var n=t||this;return{helper:n.helper,placeholder:n.placeholder||e([]),position:n.position,originalPosition:n.originalPosition,offset:n.positionAbs,item:n.currentItem,sender:t?t.element:null}}})})(jQuery);(function(e){var t=0,n={},r={};n.height=n.paddingTop=n.paddingBottom=n.borderTopWidth=n.borderBottomWidth="hide",r.height=r.paddingTop=r.paddingBottom=r.borderTopWidth=r.borderBottomWidth="show",e.widget("ui.accordion",{version:"1.10.3",options:{active:0,animate:{},collapsible:!1,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},_create:function(){var t=this.options;this.prevShow=this.prevHide=e(),this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role","tablist"),t.collapsible||t.active!==!1&&null!=t.active||(t.active=0),this._processPanels(),0>t.active&&(t.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():e(),content:this.active.length?this.active.next():e()}},_createIcons:function(){var t=this.options.icons;t&&(e("<span>").addClass("ui-accordion-header-icon ui-icon "+t.header).prependTo(this.headers),this.active.children(".ui-accordion-header-icon").removeClass(t.header).addClass(t.activeHeader),this.headers.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()},_destroy:function(){var e;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function(){/^ui-accordion/.test(this.id)&&this.removeAttribute("id")}),this._destroyIcons(),e=this.headers.next().css("display","").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function(){/^ui-accordion/.test(this.id)&&this.removeAttribute("id")}),"content"!==this.options.heightStyle&&e.css("height","")},_setOption:function(e,t){return"active"===e?(this._activate(t),undefined):("event"===e&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(t)),this._super(e,t),"collapsible"!==e||t||this.options.active!==!1||this._activate(0),"icons"===e&&(this._destroyIcons(),t&&this._createIcons()),"disabled"===e&&this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",!!t),undefined)},_keydown:function(t){if(!t.altKey&&!t.ctrlKey){var n=e.ui.keyCode,r=this.headers.length,i=this.headers.index(t.target),s=!1;switch(t.keyCode){case n.RIGHT:case n.DOWN:s=this.headers[(i+1)%r];break;case n.LEFT:case n.UP:s=this.headers[(i-1+r)%r];break;case n.SPACE:case n.ENTER:this._eventHandler(t);break;case n.HOME:s=this.headers[0];break;case n.END:s=this.headers[r-1]}s&&(e(t.target).attr("tabIndex",-1),e(s).attr("tabIndex",0),s.focus(),t.preventDefault())}},_panelKeyDown:function(t){t.keyCode===e.ui.keyCode.UP&&t.ctrlKey&&e(t.currentTarget).prev().focus()},refresh:function(){var t=this.options;this._processPanels(),t.active===!1&&t.collapsible===!0||!this.headers.length?(t.active=!1,this.active=e()):t.active===!1?this._activate(0):this.active.length&&!e.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(t.active=!1,this.active=e()):this._activate(Math.max(0,t.active-1)):t.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){this.headers=this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"),this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()},_refresh:function(){var n,r=this.options,i=r.heightStyle,s=this.element.parent(),o=this.accordionId="ui-accordion-"+(this.element.attr("id")||++t);this.active=this._findActive(r.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"),this.active.next().addClass("ui-accordion-content-active").show(),this.headers.attr("role","tab").each(function(t){var n=e(this),r=n.attr("id"),i=n.next(),s=i.attr("id");r||(r=o+"-header-"+t,n.attr("id",r)),s||(s=o+"-panel-"+t,i.attr("id",s)),n.attr("aria-controls",s),i.attr("aria-labelledby",r)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false",tabIndex:-1}).next().attr({"aria-expanded":"false","aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true",tabIndex:0}).next().attr({"aria-expanded":"true","aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(r.event),"fill"===i?(n=s.height(),this.element.siblings(":visible").each(function(){var t=e(this),r=t.css("position");"absolute"!==r&&"fixed"!==r&&(n-=t.outerHeight(!0))}),this.headers.each(function(){n-=e(this).outerHeight(!0)}),this.headers.next().each(function(){e(this).height(Math.max(0,n-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):"auto"===i&&(n=0,this.headers.next().each(function(){n=Math.max(n,e(this).css("height","").height())}).height(n))},_activate:function(t){var n=this._findActive(t)[0];n!==this.active[0]&&(n=n||this.active[0],this._eventHandler({target:n,currentTarget:n,preventDefault:e.noop}))},_findActive:function(t){return"number"==typeof t?this.headers.eq(t):e()},_setupEvents:function(t){var n={keydown:"_keydown"};t&&e.each(t.split(" "),function(e,t){n[t]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,n),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(t){var n=this.options,r=this.active,i=e(t.currentTarget),s=i[0]===r[0],o=s&&n.collapsible,u=o?e():i.next(),a=r.next(),f={oldHeader:r,oldPanel:a,newHeader:o?e():i,newPanel:u};t.preventDefault(),s&&!n.collapsible||this._trigger("beforeActivate",t,f)===!1||(n.active=o?!1:this.headers.index(i),this.active=s?e():i,this._toggle(f),r.removeClass("ui-accordion-header-active ui-state-active"),n.icons&&r.children(".ui-accordion-header-icon").removeClass(n.icons.activeHeader).addClass(n.icons.header),s||(i.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),n.icons&&i.children(".ui-accordion-header-icon").removeClass(n.icons.header).addClass(n.icons.activeHeader),i.next().addClass("ui-accordion-content-active")))},_toggle:function(t){var n=t.newPanel,r=this.prevShow.length?this.prevShow:t.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=n,this.prevHide=r,this.options.animate?this._animate(n,r,t):(r.hide(),n.show(),this._toggleComplete(t)),r.attr({"aria-expanded":"false","aria-hidden":"true"}),r.prev().attr("aria-selected","false"),n.length&&r.length?r.prev().attr("tabIndex",-1):n.length&&this.headers.filter(function(){return 0===e(this).attr("tabIndex")}).attr("tabIndex",-1),n.attr({"aria-expanded":"true","aria-hidden":"false"}).prev().attr({"aria-selected":"true",tabIndex:0})},_animate:function(e,t,s){var o,u,f,l=this,c=0,h=e.length&&(!t.length||e.index()<t.index()),p=this.options.animate||{},d=h&&p.down||p,v=function(){l._toggleComplete(s)};return"number"==typeof d&&(f=d),"string"==typeof d&&(u=d),u=u||d.easing||p.easing,f=f||d.duration||p.duration,t.length?e.length?(o=e.show().outerHeight(),t.animate(n,{duration:f,easing:u,step:function(e,t){t.now=Math.round(e)}}),e.hide().animate(r,{duration:f,easing:u,complete:v,step:function(e,n){n.now=Math.round(e),"height"!==n.prop?c+=n.now:"content"!==l.options.heightStyle&&(n.now=Math.round(o-t.outerHeight()-c),c=0)}}),undefined):t.animate(n,f,u,v):e.animate(r,f,u,v)},_toggleComplete:function(e){var t=e.oldPanel;t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),t.length&&(t.parent()[0].className=t.parent()[0].className),this._trigger("activate",null,e)}})})(jQuery);(function(e){var t=0;e.widget("ui.autocomplete",{version:"1.10.3",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},pending:0,_create:function(){var t,n,r,i=this.element[0].nodeName.toLowerCase(),s="textarea"===i,o="input"===i;this.isMultiLine=s?!0:o?!1:this.element.prop("isContentEditable"),this.valueMethod=this.element[s||o?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(i){if(this.element.prop("readOnly"))return t=!0,r=!0,n=!0,undefined;t=!1,r=!1,n=!1;var s=e.ui.keyCode;switch(i.keyCode){case s.PAGE_UP:t=!0,this._move("previousPage",i);break;case s.PAGE_DOWN:t=!0,this._move("nextPage",i);break;case s.UP:t=!0,this._keyEvent("previous",i);break;case s.DOWN:t=!0,this._keyEvent("next",i);break;case s.ENTER:case s.NUMPAD_ENTER:this.menu.active&&(t=!0,i.preventDefault(),this.menu.select(i));break;case s.TAB:this.menu.active&&this.menu.select(i);break;case s.ESCAPE:this.menu.element.is(":visible")&&(this._value(this.term),this.close(i),i.preventDefault());break;default:n=!0,this._searchTimeout(i)}},keypress:function(r){if(t)return t=!1,(!this.isMultiLine||this.menu.element.is(":visible"))&&r.preventDefault(),undefined;if(!n){var i=e.ui.keyCode;switch(r.keyCode){case i.PAGE_UP:this._move("previousPage",r);break;case i.PAGE_DOWN:this._move("nextPage",r);break;case i.UP:this._keyEvent("previous",r);break;case i.DOWN:this._keyEvent("next",r)}}},input:function(e){return r?(r=!1,e.preventDefault(),undefined):(this._searchTimeout(e),undefined)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){return this.cancelBlur?(delete this.cancelBlur,undefined):(clearTimeout(this.searching),this.close(e),this._change(e),undefined)}}),this._initSource(),this.menu=e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role:null}).hide().data("ui-menu"),this._on(this.menu.element,{mousedown:function(t){t.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var n=this.menu.element[0];e(t.target).closest(".ui-menu-item").length||this._delay(function(){var t=this;this.document.one("mousedown",function(r){r.target===t.element[0]||r.target===n||e.contains(n,r.target)||t.close()})})},menufocus:function(t,n){if(this.isNewMenu&&(this.isNewMenu=!1,t.originalEvent&&/^mouse/.test(t.originalEvent.type)))return this.menu.blur(),this.document.one("mousemove",function(){e(t.target).trigger(t.originalEvent)}),undefined;var r=n.item.data("ui-autocomplete-item");!1!==this._trigger("focus",t,{item:r})?t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(r.value):this.liveRegion.text(r.value)},menuselect:function(e,t){var n=t.item.data("ui-autocomplete-item"),r=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=r,this._delay(function(){this.previous=r,this.selectedItem=n})),!1!==this._trigger("select",e,{item:n})&&this._value(n.value),this.term=this._value(),this.close(e),this.selectedItem=n}}),this.liveRegion=e("<span>",{role:"status","aria-live":"polite"}).addClass("ui-helper-hidden-accessible").insertBefore(this.element),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),"source"===e&&this._initSource(),"appendTo"===e&&this.menu.element.appendTo(this._appendTo()),"disabled"===e&&t&&this.xhr&&this.xhr.abort()},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t||(t=this.element.closest(".ui-front")),t.length||(t=this.document[0].body),t},_initSource:function(){var t,n,r=this;e.isArray(this.options.source)?(t=this.options.source,this.source=function(n,r){r(e.ui.autocomplete.filter(t,n.term))}):"string"==typeof this.options.source?(n=this.options.source,this.source=function(t,o){r.xhr&&r.xhr.abort(),r.xhr=e.ajax({url:n,data:t,dataType:"json",success:function(e){o(e)},error:function(){o([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay(function(){this.term!==this._value()&&(this.selectedItem=null,this.search(null,e))},this.options.delay)},search:function(e,t){return e=null!=e?e:this._value(),this.term=this._value(),e.length<this.options.minLength?this.close(t):this._trigger("search",t)!==!1?this._search(e):undefined},_search:function(e){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var e=this,n=++t;return function(r){n===t&&e.__response(r),e.pending--,e.pending||e.element.removeClass("ui-autocomplete-loading")}},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){return t.length&&t[0].label&&t[0].value?t:e.map(t,function(t){return"string"==typeof t?{label:t,value:t}:e.extend({label:t.label||t.value,value:t.value||t.label},t)})},_suggest:function(t){var n=this.menu.element.empty();this._renderMenu(n,t),this.isNewMenu=!0,this.menu.refresh(),n.show(),this._resizeMenu(),n.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,n){var r=this;e.each(n,function(e,n){r._renderItemData(t,n)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,n){return e("<li>").append(e("<a>").text(n.label)).appendTo(t)},_move:function(e,t){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)?(this._value(this.term),this.menu.blur(),undefined):(this.menu[e](t),undefined):(this.search(null,t),undefined)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(e,t),t.preventDefault())}}),e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,n){var r=RegExp(e.ui.autocomplete.escapeRegex(n),"i");return e.grep(t,function(e){return r.test(e.label||e.value||e)})}}),e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"",results:function(e){return""}}},__response:function(e){var t;this._superApply(arguments),this.options.disabled||this.cancelSearch||(t=e&&e.length?this.options.messages.results(e.length):this.options.messages.noResults,this.liveRegion.text(t))}})})(jQuery);(function(e){var t,n,r,i,s="ui-button ui-widget ui-state-default ui-corner-all",o="ui-state-hover ui-state-active ",u="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",a=function(){var t=e(this);setTimeout(function(){t.find(":ui-button").button("refresh")},1)},f=function(t){var n=t.name,r=t.form,i=e([]);return n&&(n=n.replace(/'/g,"\\'"),i=r?e(r).find("[name='"+n+"']"):e("[name='"+n+"']",t.ownerDocument).filter(function(){return!this.form})),i};e.widget("ui.button",{version:"1.10.3",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,a),"boolean"!=typeof this.options.disabled?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var o=this,u=this.options,l="checkbox"===this.type||"radio"===this.type,c=l?"":"ui-state-active",p="ui-state-focus";null===u.label&&(u.label="input"===this.type?this.buttonElement.val():this.buttonElement.html()),this._hoverable(this.buttonElement),this.buttonElement.addClass(s).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){u.disabled||this===t&&e(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){u.disabled||e(this).removeClass(c)}).bind("click"+this.eventNamespace,function(e){u.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}),this.element.bind("focus"+this.eventNamespace,function(){o.buttonElement.addClass(p)}).bind("blur"+this.eventNamespace,function(){o.buttonElement.removeClass(p)}),l&&(this.element.bind("change"+this.eventNamespace,function(){i||o.refresh()}),this.buttonElement.bind("mousedown"+this.eventNamespace,function(e){u.disabled||(i=!1,n=e.pageX,r=e.pageY)}).bind("mouseup"+this.eventNamespace,function(e){u.disabled||(n!==e.pageX||r!==e.pageY)&&(i=!0)})),"checkbox"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){return u.disabled||i?!1:undefined}):"radio"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(u.disabled||i)return!1;e(this).addClass("ui-state-active"),o.buttonElement.attr("aria-pressed","true");var t=o.element[0];f(t).not(t).map(function(){return e(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){return u.disabled?!1:(e(this).addClass("ui-state-active"),t=this,o.document.one("mouseup",function(){t=null}),undefined)}).bind("mouseup"+this.eventNamespace,function(){return u.disabled?!1:(e(this).removeClass("ui-state-active"),undefined)}).bind("keydown"+this.eventNamespace,function(t){return u.disabled?!1:((t.keyCode===e.ui.keyCode.SPACE||t.keyCode===e.ui.keyCode.ENTER)&&e(this).addClass("ui-state-active"),undefined)}).bind("keyup"+this.eventNamespace+" blur"+this.eventNamespace,function(){e(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(t){t.keyCode===e.ui.keyCode.SPACE&&e(this).click()})),this._setOption("disabled",u.disabled),this._resetButton()},_determineButtonType:function(){var e,t,n;this.type=this.element.is("[type=checkbox]")?"checkbox":this.element.is("[type=radio]")?"radio":this.element.is("input")?"input":"button","checkbox"===this.type||"radio"===this.type?(e=this.element.parents().last(),t="label[for='"+this.element.attr("id")+"']",this.buttonElement=e.find(t),this.buttonElement.length||(e=e.length?e.siblings():this.element.siblings(),this.buttonElement=e.filter(t),this.buttonElement.length||(this.buttonElement=e.find(t))),this.element.addClass("ui-helper-hidden-accessible"),n=this.element.is(":checked"),n&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",n)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(s+" "+o+" "+u).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(e,t){return this._super(e,t),"disabled"===e?(t?this.element.prop("disabled",!0):this.element.prop("disabled",!1),undefined):(this._resetButton(),undefined)},refresh:function(){var t=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");t!==this.options.disabled&&this._setOption("disabled",t),"radio"===this.type?f(this.element[0]).each(function(){e(this).is(":checked")?e(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):"checkbox"===this.type&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if("input"===this.type)return this.options.label&&this.element.val(this.options.label),undefined;var t=this.buttonElement.removeClass(u),n=e("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),r=this.options.icons,i=r.primary&&r.secondary,s=[];r.primary||r.secondary?(this.options.text&&s.push("ui-button-text-icon"+(i?"s":r.primary?"-primary":"-secondary")),r.primary&&t.prepend("<span class='ui-button-icon-primary ui-icon "+r.primary+"'></span>"),r.secondary&&t.append("<span class='ui-button-icon-secondary ui-icon "+r.secondary+"'></span>"),this.options.text||(s.push(i?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||t.attr("title",e.trim(n)))):s.push("ui-button-text-only"),t.addClass(s.join(" "))}}),e.widget("ui.buttonset",{version:"1.10.3",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(e,t){"disabled"===e&&this.buttons.button("option",e,t),this._super(e,t)},refresh:function(){var t="rtl"===this.element.css("direction");this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return e(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(t?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return e(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}})})(jQuery);(function(e,t){function n(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},e.extend(this._defaults,this.regional[""]),this.dpDiv=r(e("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function r(t){var n="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return t.delegate(n,"mouseout",function(){e(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).removeClass("ui-datepicker-next-hover")}).delegate(n,"mouseover",function(){e.datepicker._isDisabledDatepicker(s.inline?t.parent()[0]:s.input[0])||(e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),e(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).addClass("ui-datepicker-next-hover"))})}function i(t,n){e.extend(t,n);for(var r in n)null==n[r]&&(t[r]=n[r]);return t}e.extend(e.ui,{datepicker:{version:"1.10.3"}});var s,o="datepicker";e.extend(n.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(e){return i(this._defaults,e||{}),this},_attachDatepicker:function(t,n){var r,i,s;r=t.nodeName.toLowerCase(),i="div"===r||"span"===r,t.id||(this.uuid+=1,t.id="dp"+this.uuid),s=this._newInst(e(t),i),s.settings=e.extend({},n||{}),"input"===r?this._connectDatepicker(t,s):i&&this._inlineDatepicker(t,s)},_newInst:function(t,n){var i=t[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return{id:i,input:t,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:n,dpDiv:n?r(e("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(t,n){var r=e(t);n.append=e([]),n.trigger=e([]),r.hasClass(this.markerClassName)||(this._attachments(r,n),r.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),this._autoSize(n),e.data(t,o,n),n.settings.disabled&&this._disableDatepicker(t))},_attachments:function(t,n){var r,i,s,o=this._get(n,"appendText"),u=this._get(n,"isRTL");n.append&&n.append.remove(),o&&(n.append=e("<span class='"+this._appendClass+"'>"+o+"</span>"),t[u?"before":"after"](n.append)),t.unbind("focus",this._showDatepicker),n.trigger&&n.trigger.remove(),r=this._get(n,"showOn"),("focus"===r||"both"===r)&&t.focus(this._showDatepicker),("button"===r||"both"===r)&&(i=this._get(n,"buttonText"),s=this._get(n,"buttonImage"),n.trigger=e(this._get(n,"buttonImageOnly")?e("<img/>").addClass(this._triggerClass).attr({src:s,alt:i,title:i}):e("<button type='button'></button>").addClass(this._triggerClass).html(s?e("<img/>").attr({src:s,alt:i,title:i}):i)),t[u?"before":"after"](n.trigger),n.trigger.click(function(){return e.datepicker._datepickerShowing&&e.datepicker._lastInput===t[0]?e.datepicker._hideDatepicker():e.datepicker._datepickerShowing&&e.datepicker._lastInput!==t[0]?(e.datepicker._hideDatepicker(),e.datepicker._showDatepicker(t[0])):e.datepicker._showDatepicker(t[0]),!1}))},_autoSize:function(e){if(this._get(e,"autoSize")&&!e.inline){var t,n,r,i,s=new Date(2009,11,20),o=this._get(e,"dateFormat");o.match(/[DM]/)&&(t=function(e){for(n=0,r=0,i=0;e.length>i;i++)e[i].length>n&&(n=e[i].length,r=i);return r},s.setMonth(t(this._get(e,o.match(/MM/)?"monthNames":"monthNamesShort"))),s.setDate(t(this._get(e,o.match(/DD/)?"dayNames":"dayNamesShort"))+20-s.getDay())),e.input.attr("size",this._formatDate(e,s).length)}},_inlineDatepicker:function(t,n){var r=e(t);r.hasClass(this.markerClassName)||(r.addClass(this.markerClassName).append(n.dpDiv),e.data(t,o,n),this._setDate(n,this._getDefaultDate(n),!0),this._updateDatepicker(n),this._updateAlternate(n),n.settings.disabled&&this._disableDatepicker(t),n.dpDiv.css("display","block"))},_dialogDatepicker:function(t,n,r,s,u){var a,f,l,c,h,p=this._dialogInst;return p||(this.uuid+=1,a="dp"+this.uuid,this._dialogInput=e("<input type='text' id='"+a+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.keydown(this._doKeyDown),e("body").append(this._dialogInput),p=this._dialogInst=this._newInst(this._dialogInput,!1),p.settings={},e.data(this._dialogInput[0],o,p)),i(p.settings,s||{}),n=n&&n.constructor===Date?this._formatDate(p,n):n,this._dialogInput.val(n),this._pos=u?u.length?u:[u.pageX,u.pageY]:null,this._pos||(f=document.documentElement.clientWidth,l=document.documentElement.clientHeight,c=document.documentElement.scrollLeft||document.body.scrollLeft,h=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[f/2-100+c,l/2-150+h]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),p.settings.onSelect=r,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),e.blockUI&&e.blockUI(this.dpDiv),e.data(this._dialogInput[0],o,p),this},_destroyDatepicker:function(t){var n,r=e(t),i=e.data(t,o);r.hasClass(this.markerClassName)&&(n=t.nodeName.toLowerCase(),e.removeData(t,o),"input"===n?(i.append.remove(),i.trigger.remove(),r.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):("div"===n||"span"===n)&&r.removeClass(this.markerClassName).empty())},_enableDatepicker:function(t){var n,r,i=e(t),s=e.data(t,o);i.hasClass(this.markerClassName)&&(n=t.nodeName.toLowerCase(),"input"===n?(t.disabled=!1,s.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):("div"===n||"span"===n)&&(r=i.children("."+this._inlineClass),r.children().removeClass("ui-state-disabled"),r.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}))},_disableDatepicker:function(t){var n,r,i=e(t),s=e.data(t,o);i.hasClass(this.markerClassName)&&(n=t.nodeName.toLowerCase(),"input"===n?(t.disabled=!0,s.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):("div"===n||"span"===n)&&(r=i.children("."+this._inlineClass),r.children().addClass("ui-state-disabled"),r.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}),this._disabledInputs[this._disabledInputs.length]=t)},_isDisabledDatepicker:function(e){if(!e)return!1;for(var t=0;this._disabledInputs.length>t;t++)if(this._disabledInputs[t]===e)return!0;return!1},_getInst:function(t){try{return e.data(t,o)}catch(n){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(n,r,s){var o,u,a,f,l=this._getInst(n);return 2===arguments.length&&"string"==typeof r?"defaults"===r?e.extend({},e.datepicker._defaults):l?"all"===r?e.extend({},l.settings):this._get(l,r):null:(o=r||{},"string"==typeof r&&(o={},o[r]=s),l&&(this._curInst===l&&this._hideDatepicker(),u=this._getDateDatepicker(n,!0),a=this._getMinMaxDate(l,"min"),f=this._getMinMaxDate(l,"max"),i(l.settings,o),null!==a&&o.dateFormat!==t&&o.minDate===t&&(l.settings.minDate=this._formatDate(l,a)),null!==f&&o.dateFormat!==t&&o.maxDate===t&&(l.settings.maxDate=this._formatDate(l,f)),"disabled"in o&&(o.disabled?this._disableDatepicker(n):this._enableDatepicker(n)),this._attachments(e(n),l),this._autoSize(l),this._setDate(l,u),this._updateAlternate(l),this._updateDatepicker(l)),t)},_changeDatepicker:function(e,t,n){this._optionDatepicker(e,t,n)},_refreshDatepicker:function(e){var t=this._getInst(e);t&&this._updateDatepicker(t)},_setDateDatepicker:function(e,t){var n=this._getInst(e);n&&(this._setDate(n,t),this._updateDatepicker(n),this._updateAlternate(n))},_getDateDatepicker:function(e,t){var n=this._getInst(e);return n&&!n.inline&&this._setDateFromField(n,t),n?this._getDate(n):null},_doKeyDown:function(t){var n,r,i,s=e.datepicker._getInst(t.target),o=!0,u=s.dpDiv.is(".ui-datepicker-rtl");if(s._keyEvent=!0,e.datepicker._datepickerShowing)switch(t.keyCode){case 9:e.datepicker._hideDatepicker(),o=!1;break;case 13:return i=e("td."+e.datepicker._dayOverClass+":not(."+e.datepicker._currentClass+")",s.dpDiv),i[0]&&e.datepicker._selectDay(t.target,s.selectedMonth,s.selectedYear,i[0]),n=e.datepicker._get(s,"onSelect"),n?(r=e.datepicker._formatDate(s),n.apply(s.input?s.input[0]:null,[r,s])):e.datepicker._hideDatepicker(),!1;case 27:e.datepicker._hideDatepicker();break;case 33:e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(s,"stepBigMonths"):-e.datepicker._get(s,"stepMonths"),"M");break;case 34:e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(s,"stepBigMonths"):+e.datepicker._get(s,"stepMonths"),"M");break;case 35:(t.ctrlKey||t.metaKey)&&e.datepicker._clearDate(t.target),o=t.ctrlKey||t.metaKey;break;case 36:(t.ctrlKey||t.metaKey)&&e.datepicker._gotoToday(t.target),o=t.ctrlKey||t.metaKey;break;case 37:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,u?1:-1,"D"),o=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(s,"stepBigMonths"):-e.datepicker._get(s,"stepMonths"),"M");break;case 38:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,-7,"D"),o=t.ctrlKey||t.metaKey;break;case 39:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,u?-1:1,"D"),o=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(s,"stepBigMonths"):+e.datepicker._get(s,"stepMonths"),"M");break;case 40:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,7,"D"),o=t.ctrlKey||t.metaKey;break;default:o=!1}else 36===t.keyCode&&t.ctrlKey?e.datepicker._showDatepicker(this):o=!1;o&&(t.preventDefault(),t.stopPropagation())},_doKeyPress:function(n){var r,i,s=e.datepicker._getInst(n.target);return e.datepicker._get(s,"constrainInput")?(r=e.datepicker._possibleChars(e.datepicker._get(s,"dateFormat")),i=String.fromCharCode(null==n.charCode?n.keyCode:n.charCode),n.ctrlKey||n.metaKey||" ">i||!r||r.indexOf(i)>-1):t},_doKeyUp:function(t){var n,r=e.datepicker._getInst(t.target);if(r.input.val()!==r.lastVal)try{n=e.datepicker.parseDate(e.datepicker._get(r,"dateFormat"),r.input?r.input.val():null,e.datepicker._getFormatConfig(r)),n&&(e.datepicker._setDateFromField(r),e.datepicker._updateAlternate(r),e.datepicker._updateDatepicker(r))}catch(i){}return!0},_showDatepicker:function(t){if(t=t.target||t,"input"!==t.nodeName.toLowerCase()&&(t=e("input",t.parentNode)[0]),!e.datepicker._isDisabledDatepicker(t)&&e.datepicker._lastInput!==t){var n,r,s,o,u,a,f;n=e.datepicker._getInst(t),e.datepicker._curInst&&e.datepicker._curInst!==n&&(e.datepicker._curInst.dpDiv.stop(!0,!0),n&&e.datepicker._datepickerShowing&&e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])),r=e.datepicker._get(n,"beforeShow"),s=r?r.apply(t,[t,n]):{},s!==!1&&(i(n.settings,s),n.lastVal=null,e.datepicker._lastInput=t,e.datepicker._setDateFromField(n),e.datepicker._inDialog&&(t.value=""),e.datepicker._pos||(e.datepicker._pos=e.datepicker._findPos(t),e.datepicker._pos[1]+=t.offsetHeight),o=!1,e(t).parents().each(function(){return o|="fixed"===e(this).css("position"),!o}),u={left:e.datepicker._pos[0],top:e.datepicker._pos[1]},e.datepicker._pos=null,n.dpDiv.empty(),n.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),e.datepicker._updateDatepicker(n),u=e.datepicker._checkOffset(n,u,o),n.dpDiv.css({position:e.datepicker._inDialog&&e.blockUI?"static":o?"fixed":"absolute",display:"none",left:u.left+"px",top:u.top+"px"}),n.inline||(a=e.datepicker._get(n,"showAnim"),f=e.datepicker._get(n,"duration"),n.dpDiv.zIndex(e(t).zIndex()+1),e.datepicker._datepickerShowing=!0,e.effects&&e.effects.effect[a]?n.dpDiv.show(a,e.datepicker._get(n,"showOptions"),f):n.dpDiv[a||"show"](a?f:null),e.datepicker._shouldFocusInput(n)&&n.input.focus(),e.datepicker._curInst=n))}},_updateDatepicker:function(t){this.maxRows=4,s=t,t.dpDiv.empty().append(this._generateHTML(t)),this._attachHandlers(t),t.dpDiv.find("."+this._dayOverClass+" a").mouseover();var n,r=this._getNumberOfMonths(t),i=r[1],o=17;t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),i>1&&t.dpDiv.addClass("ui-datepicker-multi-"+i).css("width",o*i+"em"),t.dpDiv[(1!==r[0]||1!==r[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),t.dpDiv[(this._get(t,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),t===e.datepicker._curInst&&e.datepicker._datepickerShowing&&e.datepicker._shouldFocusInput(t)&&t.input.focus(),t.yearshtml&&(n=t.yearshtml,setTimeout(function(){n===t.yearshtml&&t.yearshtml&&t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml),n=t.yearshtml=null},0))},_shouldFocusInput:function(e){return e.input&&e.input.is(":visible")&&!e.input.is(":disabled")&&!e.input.is(":focus")},_checkOffset:function(t,n,r){var i=t.dpDiv.outerWidth(),s=t.dpDiv.outerHeight(),o=t.input?t.input.outerWidth():0,u=t.input?t.input.outerHeight():0,a=document.documentElement.clientWidth+(r?0:e(document).scrollLeft()),f=document.documentElement.clientHeight+(r?0:e(document).scrollTop());return n.left-=this._get(t,"isRTL")?i-o:0,n.left-=r&&n.left===t.input.offset().left?e(document).scrollLeft():0,n.top-=r&&n.top===t.input.offset().top+u?e(document).scrollTop():0,n.left-=Math.min(n.left,n.left+i>a&&a>i?Math.abs(n.left+i-a):0),n.top-=Math.min(n.top,n.top+s>f&&f>s?Math.abs(s+u):0),n},_findPos:function(t){for(var n,r=this._getInst(t),i=this._get(r,"isRTL");t&&("hidden"===t.type||1!==t.nodeType||e.expr.filters.hidden(t));)t=t[i?"previousSibling":"nextSibling"];return n=e(t).offset(),[n.left,n.top]},_hideDatepicker:function(t){var n,r,i,s,u=this._curInst;!u||t&&u!==e.data(t,o)||this._datepickerShowing&&(n=this._get(u,"showAnim"),r=this._get(u,"duration"),i=function(){e.datepicker._tidyDialog(u)},e.effects&&(e.effects.effect[n]||e.effects[n])?u.dpDiv.hide(n,e.datepicker._get(u,"showOptions"),r,i):u.dpDiv["slideDown"===n?"slideUp":"fadeIn"===n?"fadeOut":"hide"](n?r:null,i),n||i(),this._datepickerShowing=!1,s=this._get(u,"onClose"),s&&s.apply(u.input?u.input[0]:null,[u.input?u.input.val():"",u]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),e.blockUI&&(e.unblockUI(),e("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(e){e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(t){if(e.datepicker._curInst){var n=e(t.target),r=e.datepicker._getInst(n[0]);(n[0].id!==e.datepicker._mainDivId&&0===n.parents("#"+e.datepicker._mainDivId).length&&!n.hasClass(e.datepicker.markerClassName)&&!n.closest("."+e.datepicker._triggerClass).length&&e.datepicker._datepickerShowing&&(!e.datepicker._inDialog||!e.blockUI)||n.hasClass(e.datepicker.markerClassName)&&e.datepicker._curInst!==r)&&e.datepicker._hideDatepicker()}},_adjustDate:function(t,n,r){var i=e(t),s=this._getInst(i[0]);this._isDisabledDatepicker(i[0])||(this._adjustInstDate(s,n+("M"===r?this._get(s,"showCurrentAtPos"):0),r),this._updateDatepicker(s))},_gotoToday:function(t){var n,r=e(t),i=this._getInst(r[0]);this._get(i,"gotoCurrent")&&i.currentDay?(i.selectedDay=i.currentDay,i.drawMonth=i.selectedMonth=i.currentMonth,i.drawYear=i.selectedYear=i.currentYear):(n=new Date,i.selectedDay=n.getDate(),i.drawMonth=i.selectedMonth=n.getMonth(),i.drawYear=i.selectedYear=n.getFullYear()),this._notifyChange(i),this._adjustDate(r)},_selectMonthYear:function(t,n,r){var i=e(t),s=this._getInst(i[0]);s["selected"+("M"===r?"Month":"Year")]=s["draw"+("M"===r?"Month":"Year")]=parseInt(n.options[n.selectedIndex].value,10),this._notifyChange(s),this._adjustDate(i)},_selectDay:function(t,n,r,i){var s,o=e(t);e(i).hasClass(this._unselectableClass)||this._isDisabledDatepicker(o[0])||(s=this._getInst(o[0]),s.selectedDay=s.currentDay=e("a",i).html(),s.selectedMonth=s.currentMonth=n,s.selectedYear=s.currentYear=r,this._selectDate(t,this._formatDate(s,s.currentDay,s.currentMonth,s.currentYear)))},_clearDate:function(t){var n=e(t);this._selectDate(n,"")},_selectDate:function(t,n){var r,i=e(t),s=this._getInst(i[0]);n=null!=n?n:this._formatDate(s),s.input&&s.input.val(n),this._updateAlternate(s),r=this._get(s,"onSelect"),r?r.apply(s.input?s.input[0]:null,[n,s]):s.input&&s.input.trigger("change"),s.inline?this._updateDatepicker(s):(this._hideDatepicker(),this._lastInput=s.input[0],"object"!=typeof s.input[0]&&s.input.focus(),this._lastInput=null)},_updateAlternate:function(t){var n,r,i,s=this._get(t,"altField");s&&(n=this._get(t,"altFormat")||this._get(t,"dateFormat"),r=this._getDate(t),i=this.formatDate(n,r,this._getFormatConfig(t)),e(s).each(function(){e(this).val(i)}))},noWeekends:function(e){var t=e.getDay();return[t>0&&6>t,""]},iso8601Week:function(e){var t,n=new Date(e.getTime());return n.setDate(n.getDate()+4-(n.getDay()||7)),t=n.getTime(),n.setMonth(0),n.setDate(1),Math.floor(Math.round((t-n)/864e5)/7)+1},parseDate:function(n,r,i){if(null==n||null==r)throw"Invalid arguments";if(r="object"==typeof r?""+r:r+"",""===r)return null;var s,o,u,a,f=0,l=(i?i.shortYearCutoff:null)||this._defaults.shortYearCutoff,c="string"!=typeof l?l:(new Date).getFullYear()%100+parseInt(l,10),h=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,p=(i?i.dayNames:null)||this._defaults.dayNames,d=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,v=(i?i.monthNames:null)||this._defaults.monthNames,m=-1,g=-1,y=-1,b=-1,w=!1,E=function(e){var t=n.length>s+1&&n.charAt(s+1)===e;return t&&s++,t},S=function(e){var t=E(e),n="@"===e?14:"!"===e?20:"y"===e&&t?4:"o"===e?3:2,i=RegExp("^\\d{1,"+n+"}"),s=r.substring(f).match(i);if(!s)throw"Missing number at position "+f;return f+=s[0].length,parseInt(s[0],10)},x=function(n,i,s){var o=-1,u=e.map(E(n)?s:i,function(e,t){return[[t,e]]}).sort(function(e,t){return-(e[1].length-t[1].length)});if(e.each(u,function(e,n){var i=n[1];return r.substr(f,i.length).toLowerCase()===i.toLowerCase()?(o=n[0],f+=i.length,!1):t}),-1!==o)return o+1;throw"Unknown name at position "+f},T=function(){if(r.charAt(f)!==n.charAt(s))throw"Unexpected literal at position "+f;f++};for(s=0;n.length>s;s++)if(w)"'"!==n.charAt(s)||E("'")?T():w=!1;else switch(n.charAt(s)){case"d":y=S("d");break;case"D":x("D",h,p);break;case"o":b=S("o");break;case"m":g=S("m");break;case"M":g=x("M",d,v);break;case"y":m=S("y");break;case"@":a=new Date(S("@")),m=a.getFullYear(),g=a.getMonth()+1,y=a.getDate();break;case"!":a=new Date((S("!")-this._ticksTo1970)/1e4),m=a.getFullYear(),g=a.getMonth()+1,y=a.getDate();break;case"'":E("'")?T():w=!0;break;default:T()}if(r.length>f&&(u=r.substr(f),!/^\s+/.test(u)))throw"Extra/unparsed characters found in date: "+u;if(-1===m?m=(new Date).getFullYear():100>m&&(m+=(new Date).getFullYear()-(new Date).getFullYear()%100+(c>=m?0:-100)),b>-1)for(g=1,y=b;;){if(o=this._getDaysInMonth(m,g-1),o>=y)break;g++,y-=o}if(a=this._daylightSavingAdjust(new Date(m,g-1,y)),a.getFullYear()!==m||a.getMonth()+1!==g||a.getDate()!==y)throw"Invalid date";return a},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:1e7*60*60*24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925)),formatDate:function(e,t,n){if(!t)return"";var r,i=(n?n.dayNamesShort:null)||this._defaults.dayNamesShort,s=(n?n.dayNames:null)||this._defaults.dayNames,o=(n?n.monthNamesShort:null)||this._defaults.monthNamesShort,u=(n?n.monthNames:null)||this._defaults.monthNames,a=function(t){var n=e.length>r+1&&e.charAt(r+1)===t;return n&&r++,n},f=function(e,t,n){var r=""+t;if(a(e))for(;n>r.length;)r="0"+r;return r},l=function(e,t,n,r){return a(e)?r[t]:n[t]},c="",h=!1;if(t)for(r=0;e.length>r;r++)if(h)"'"!==e.charAt(r)||a("'")?c+=e.charAt(r):h=!1;else switch(e.charAt(r)){case"d":c+=f("d",t.getDate(),2);break;case"D":c+=l("D",t.getDay(),i,s);break;case"o":c+=f("o",Math.round(((new Date(t.getFullYear(),t.getMonth(),t.getDate())).getTime()-(new Date(t.getFullYear(),0,0)).getTime())/864e5),3);break;case"m":c+=f("m",t.getMonth()+1,2);break;case"M":c+=l("M",t.getMonth(),o,u);break;case"y":c+=a("y")?t.getFullYear():(10>t.getYear()%100?"0":"")+t.getYear()%100;break;case"@":c+=t.getTime();break;case"!":c+=1e4*t.getTime()+this._ticksTo1970;break;case"'":a("'")?c+="'":h=!0;break;default:c+=e.charAt(r)}return c},_possibleChars:function(e){var t,n="",r=!1,i=function(n){var r=e.length>t+1&&e.charAt(t+1)===n;return r&&t++,r};for(t=0;e.length>t;t++)if(r)"'"!==e.charAt(t)||i("'")?n+=e.charAt(t):r=!1;else switch(e.charAt(t)){case"d":case"m":case"y":case"@":n+="0123456789";break;case"D":case"M":return null;case"'":i("'")?n+="'":r=!0;break;default:n+=e.charAt(t)}return n},_get:function(e,n){return e.settings[n]!==t?e.settings[n]:this._defaults[n]},_setDateFromField:function(e,t){if(e.input.val()!==e.lastVal){var n=this._get(e,"dateFormat"),r=e.lastVal=e.input?e.input.val():null,i=this._getDefaultDate(e),s=i,o=this._getFormatConfig(e);try{s=this.parseDate(n,r,o)||i}catch(u){r=t?"":r}e.selectedDay=s.getDate(),e.drawMonth=e.selectedMonth=s.getMonth(),e.drawYear=e.selectedYear=s.getFullYear(),e.currentDay=r?s.getDate():0,e.currentMonth=r?s.getMonth():0,e.currentYear=r?s.getFullYear():0,this._adjustInstDate(e)}},_getDefaultDate:function(e){return this._restrictMinMax(e,this._determineDate(e,this._get(e,"defaultDate"),new Date))},_determineDate:function(t,n,r){var i=function(e){var t=new Date;return t.setDate(t.getDate()+e),t},s=function(n){try{return e.datepicker.parseDate(e.datepicker._get(t,"dateFormat"),n,e.datepicker._getFormatConfig(t))}catch(r){}for(var i=(n.toLowerCase().match(/^c/)?e.datepicker._getDate(t):null)||new Date,s=i.getFullYear(),o=i.getMonth(),u=i.getDate(),a=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,f=a.exec(n);f;){switch(f[2]||"d"){case"d":case"D":u+=parseInt(f[1],10);break;case"w":case"W":u+=7*parseInt(f[1],10);break;case"m":case"M":o+=parseInt(f[1],10),u=Math.min(u,e.datepicker._getDaysInMonth(s,o));break;case"y":case"Y":s+=parseInt(f[1],10),u=Math.min(u,e.datepicker._getDaysInMonth(s,o))}f=a.exec(n)}return new Date(s,o,u)},o=null==n||""===n?r:"string"==typeof n?s(n):"number"==typeof n?isNaN(n)?r:i(n):new Date(n.getTime());return o=o&&"Invalid Date"==""+o?r:o,o&&(o.setHours(0),o.setMinutes(0),o.setSeconds(0),o.setMilliseconds(0)),this._daylightSavingAdjust(o)},_daylightSavingAdjust:function(e){return e?(e.setHours(e.getHours()>12?e.getHours()+2:0),e):null},_setDate:function(e,t,n){var r=!t,i=e.selectedMonth,s=e.selectedYear,o=this._restrictMinMax(e,this._determineDate(e,t,new Date));e.selectedDay=e.currentDay=o.getDate(),e.drawMonth=e.selectedMonth=e.currentMonth=o.getMonth(),e.drawYear=e.selectedYear=e.currentYear=o.getFullYear(),i===e.selectedMonth&&s===e.selectedYear||n||this._notifyChange(e),this._adjustInstDate(e),e.input&&e.input.val(r?"":this._formatDate(e))},_getDate:function(e){var t=!e.currentYear||e.input&&""===e.input.val()?null:this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return t},_attachHandlers:function(t){var n=this._get(t,"stepMonths"),r="#"+t.id.replace(/\\\\/g,"\\");t.dpDiv.find("[data-handler]").map(function(){var t={prev:function(){e.datepicker._adjustDate(r,-n,"M")},next:function(){e.datepicker._adjustDate(r,+n,"M")},hide:function(){e.datepicker._hideDatepicker()},today:function(){e.datepicker._gotoToday(r)},selectDay:function(){return e.datepicker._selectDay(r,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return e.datepicker._selectMonthYear(r,this,"M"),!1},selectYear:function(){return e.datepicker._selectMonthYear(r,this,"Y"),!1}};e(this).bind(this.getAttribute("data-event"),t[this.getAttribute("data-handler")])})},_generateHTML:function(e){var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D,P,H,B,j,F,I,q=new Date,R=this._daylightSavingAdjust(new Date(q.getFullYear(),q.getMonth(),q.getDate())),U=this._get(e,"isRTL"),z=this._get(e,"showButtonPanel"),W=this._get(e,"hideIfNoPrevNext"),X=this._get(e,"navigationAsDateFormat"),V=this._getNumberOfMonths(e),$=this._get(e,"showCurrentAtPos"),J=this._get(e,"stepMonths"),K=1!==V[0]||1!==V[1],Q=this._daylightSavingAdjust(e.currentDay?new Date(e.currentYear,e.currentMonth,e.currentDay):new Date(9999,9,9)),G=this._getMinMaxDate(e,"min"),Y=this._getMinMaxDate(e,"max"),Z=e.drawMonth-$,et=e.drawYear;if(0>Z&&(Z+=12,et--),Y)for(t=this._daylightSavingAdjust(new Date(Y.getFullYear(),Y.getMonth()-V[0]*V[1]+1,Y.getDate())),t=G&&G>t?G:t;this._daylightSavingAdjust(new Date(et,Z,1))>t;)Z--,0>Z&&(Z=11,et--);for(e.drawMonth=Z,e.drawYear=et,n=this._get(e,"prevText"),n=X?this.formatDate(n,this._daylightSavingAdjust(new Date(et,Z-J,1)),this._getFormatConfig(e)):n,r=this._canAdjustMonth(e,-1,et,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(U?"e":"w")+"'>"+n+"</span></a>":W?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(U?"e":"w")+"'>"+n+"</span></a>",i=this._get(e,"nextText"),i=X?this.formatDate(i,this._daylightSavingAdjust(new Date(et,Z+J,1)),this._getFormatConfig(e)):i,s=this._canAdjustMonth(e,1,et,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(U?"w":"e")+"'>"+i+"</span></a>":W?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(U?"w":"e")+"'>"+i+"</span></a>",o=this._get(e,"currentText"),u=this._get(e,"gotoCurrent")&&e.currentDay?Q:R,o=X?this.formatDate(o,u,this._getFormatConfig(e)):o,a=e.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(e,"closeText")+"</button>",f=z?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(U?a:"")+(this._isInRange(e,u)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+o+"</button>":"")+(U?"":a)+"</div>":"",l=parseInt(this._get(e,"firstDay"),10),l=isNaN(l)?0:l,c=this._get(e,"showWeek"),h=this._get(e,"dayNames"),p=this._get(e,"dayNamesMin"),d=this._get(e,"monthNames"),v=this._get(e,"monthNamesShort"),m=this._get(e,"beforeShowDay"),g=this._get(e,"showOtherMonths"),y=this._get(e,"selectOtherMonths"),b=this._getDefaultDate(e),w="",S=0;V[0]>S;S++){for(x="",this.maxRows=4,T=0;V[1]>T;T++){if(N=this._daylightSavingAdjust(new Date(et,Z,e.selectedDay)),C=" ui-corner-all",k="",K){if(k+="<div class='ui-datepicker-group",V[1]>1)switch(T){case 0:k+=" ui-datepicker-group-first",C=" ui-corner-"+(U?"right":"left");break;case V[1]-1:k+=" ui-datepicker-group-last",C=" ui-corner-"+(U?"left":"right");break;default:k+=" ui-datepicker-group-middle",C=""}k+="'>"}for(k+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+C+"'>"+(/all|left/.test(C)&&0===S?U?s:r:"")+(/all|right/.test(C)&&0===S?U?r:s:"")+this._generateMonthYearHeader(e,Z,et,G,Y,S>0||T>0,d,v)+"</div><table class='ui-datepicker-calendar'><thead>"+"<tr>",L=c?"<th class='ui-datepicker-week-col'>"+this._get(e,"weekHeader")+"</th>":"",E=0;7>E;E++)A=(E+l)%7,L+="<th"+((E+l+6)%7>=5?" class='ui-datepicker-week-end'":"")+">"+"<span title='"+h[A]+"'>"+p[A]+"</span></th>";for(k+=L+"</tr></thead><tbody>",O=this._getDaysInMonth(et,Z),et===e.selectedYear&&Z===e.selectedMonth&&(e.selectedDay=Math.min(e.selectedDay,O)),M=(this._getFirstDayOfMonth(et,Z)-l+7)%7,_=Math.ceil((M+O)/7),D=K?this.maxRows>_?this.maxRows:_:_,this.maxRows=D,P=this._daylightSavingAdjust(new Date(et,Z,1-M)),H=0;D>H;H++){for(k+="<tr>",B=c?"<td class='ui-datepicker-week-col'>"+this._get(e,"calculateWeek")(P)+"</td>":"",E=0;7>E;E++)j=m?m.apply(e.input?e.input[0]:null,[P]):[!0,""],F=P.getMonth()!==Z,I=F&&!y||!j[0]||G&&G>P||Y&&P>Y,B+="<td class='"+((E+l+6)%7>=5?" ui-datepicker-week-end":"")+(F?" ui-datepicker-other-month":"")+(P.getTime()===N.getTime()&&Z===e.selectedMonth&&e._keyEvent||b.getTime()===P.getTime()&&b.getTime()===N.getTime()?" "+this._dayOverClass:"")+(I?" "+this._unselectableClass+" ui-state-disabled":"")+(F&&!g?"":" "+j[1]+(P.getTime()===Q.getTime()?" "+this._currentClass:"")+(P.getTime()===R.getTime()?" ui-datepicker-today":""))+"'"+(F&&!g||!j[2]?"":" title='"+j[2].replace(/'/g,"&#39;")+"'")+(I?"":" data-handler='selectDay' data-event='click' data-month='"+P.getMonth()+"' data-year='"+P.getFullYear()+"'")+">"+(F&&!g?"&#xa0;":I?"<span class='ui-state-default'>"+P.getDate()+"</span>":"<a class='ui-state-default"+(P.getTime()===R.getTime()?" ui-state-highlight":"")+(P.getTime()===Q.getTime()?" ui-state-active":"")+(F?" ui-priority-secondary":"")+"' href='#'>"+P.getDate()+"</a>")+"</td>",P.setDate(P.getDate()+1),P=this._daylightSavingAdjust(P);k+=B+"</tr>"}Z++,Z>11&&(Z=0,et++),k+="</tbody></table>"+(K?"</div>"+(V[0]>0&&T===V[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),x+=k}w+=x}return w+=f,e._keyEvent=!1,w},_generateMonthYearHeader:function(e,t,n,r,i,s,o,u){var a,f,l,c,h,p,d,v,m=this._get(e,"changeMonth"),g=this._get(e,"changeYear"),y=this._get(e,"showMonthAfterYear"),b="<div class='ui-datepicker-title'>",w="";if(s||!m)w+="<span class='ui-datepicker-month'>"+o[t]+"</span>";else{for(a=r&&r.getFullYear()===n,f=i&&i.getFullYear()===n,w+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",l=0;12>l;l++)(!a||l>=r.getMonth())&&(!f||i.getMonth()>=l)&&(w+="<option value='"+l+"'"+(l===t?" selected='selected'":"")+">"+u[l]+"</option>");w+="</select>"}if(y||(b+=w+(!s&&m&&g?"":"&#xa0;")),!e.yearshtml)if(e.yearshtml="",s||!g)b+="<span class='ui-datepicker-year'>"+n+"</span>";else{for(c=this._get(e,"yearRange").split(":"),h=(new Date).getFullYear(),p=function(e){var t=e.match(/c[+\-].*/)?n+parseInt(e.substring(1),10):e.match(/[+\-].*/)?h+parseInt(e,10):parseInt(e,10);return isNaN(t)?h:t},d=p(c[0]),v=Math.max(d,p(c[1]||"")),d=r?Math.max(d,r.getFullYear()):d,v=i?Math.min(v,i.getFullYear()):v,e.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";v>=d;d++)e.yearshtml+="<option value='"+d+"'"+(d===n?" selected='selected'":"")+">"+d+"</option>";e.yearshtml+="</select>",b+=e.yearshtml,e.yearshtml=null}return b+=this._get(e,"yearSuffix"),y&&(b+=(!s&&m&&g?"":"&#xa0;")+w),b+="</div>"},_adjustInstDate:function(e,t,n){var r=e.drawYear+("Y"===n?t:0),i=e.drawMonth+("M"===n?t:0),s=Math.min(e.selectedDay,this._getDaysInMonth(r,i))+("D"===n?t:0),o=this._restrictMinMax(e,this._daylightSavingAdjust(new Date(r,i,s)));e.selectedDay=o.getDate(),e.drawMonth=e.selectedMonth=o.getMonth(),e.drawYear=e.selectedYear=o.getFullYear(),("M"===n||"Y"===n)&&this._notifyChange(e)},_restrictMinMax:function(e,t){var n=this._getMinMaxDate(e,"min"),r=this._getMinMaxDate(e,"max"),i=n&&n>t?n:t;return r&&i>r?r:i},_notifyChange:function(e){var t=this._get(e,"onChangeMonthYear");t&&t.apply(e.input?e.input[0]:null,[e.selectedYear,e.selectedMonth+1,e])},_getNumberOfMonths:function(e){var t=this._get(e,"numberOfMonths");return null==t?[1,1]:"number"==typeof t?[1,t]:t},_getMinMaxDate:function(e,t){return this._determineDate(e,this._get(e,t+"Date"),null)},_getDaysInMonth:function(e,t){return 32-this._daylightSavingAdjust(new Date(e,t,32)).getDate()},_getFirstDayOfMonth:function(e,t){return(new Date(e,t,1)).getDay()},_canAdjustMonth:function(e,t,n,r){var i=this._getNumberOfMonths(e),s=this._daylightSavingAdjust(new Date(n,r+(0>t?t:i[0]*i[1]),1));return 0>t&&s.setDate(this._getDaysInMonth(s.getFullYear(),s.getMonth())),this._isInRange(e,s)},_isInRange:function(e,t){var n,r,i=this._getMinMaxDate(e,"min"),s=this._getMinMaxDate(e,"max"),o=null,u=null,a=this._get(e,"yearRange");return a&&(n=a.split(":"),r=(new Date).getFullYear(),o=parseInt(n[0],10),u=parseInt(n[1],10),n[0].match(/[+\-].*/)&&(o+=r),n[1].match(/[+\-].*/)&&(u+=r)),(!i||t.getTime()>=i.getTime())&&(!s||t.getTime()<=s.getTime())&&(!o||t.getFullYear()>=o)&&(!u||u>=t.getFullYear())},_getFormatConfig:function(e){var t=this._get(e,"shortYearCutoff");return t="string"!=typeof t?t:(new Date).getFullYear()%100+parseInt(t,10),{shortYearCutoff:t,dayNamesShort:this._get(e,"dayNamesShort"),dayNames:this._get(e,"dayNames"),monthNamesShort:this._get(e,"monthNamesShort"),monthNames:this._get(e,"monthNames")}},_formatDate:function(e,t,n,r){t||(e.currentDay=e.selectedDay,e.currentMonth=e.selectedMonth,e.currentYear=e.selectedYear);var i=t?"object"==typeof t?t:this._daylightSavingAdjust(new Date(r,n,t)):this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return this.formatDate(this._get(e,"dateFormat"),i,this._getFormatConfig(e))}}),e.fn.datepicker=function(t){if(!this.length)return this;e.datepicker.initialized||(e(document).mousedown(e.datepicker._checkExternalClick),e.datepicker.initialized=!0),0===e("#"+e.datepicker._mainDivId).length&&e("body").append(e.datepicker.dpDiv);var n=Array.prototype.slice.call(arguments,1);return"string"!=typeof t||"isDisabled"!==t&&"getDate"!==t&&"widget"!==t?"option"===t&&2===arguments.length&&"string"==typeof arguments[1]?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(n)):this.each(function(){"string"==typeof t?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this].concat(n)):e.datepicker._attachDatepicker(this,t)}):e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(n))},e.datepicker=new n,e.datepicker.initialized=!1,e.datepicker.uuid=(new Date).getTime(),e.datepicker.version="1.10.3"})(jQuery);(function(e){var t={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},n={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0};e.widget("ui.dialog",{version:"1.10.3",options:{appendTo:"body",autoOpen:!0,buttons:[],closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(t){var n=e(this).css(t).offset().top;0>n&&e(this).css("top",t.top-n)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),this.options.title=this.options.title||this.originalTitle,this._createWrapper(),this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&e.fn.draggable&&this._makeDraggable(),this.options.resizable&&e.fn.resizable&&this._makeResizable(),this._isOpen=!1},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var t=this.options.appendTo;return t&&(t.jquery||t.nodeType)?e(t):this.document.find(t||"body").eq(0)},_destroy:function(){var e,t=this.originalPosition;this._destroyOverlay(),this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(),this.uiDialog.stop(!0,!0).remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),e=t.parent.children().eq(t.index),e.length&&e[0]!==this.element[0]?e.before(this.element):t.parent.append(this.element)},widget:function(){return this.uiDialog},disable:e.noop,enable:e.noop,close:function(t){var n=this;this._isOpen&&this._trigger("beforeClose",t)!==!1&&(this._isOpen=!1,this._destroyOverlay(),this.opener.filter(":focusable").focus().length||e(this.document[0].activeElement).blur(),this._hide(this.uiDialog,this.options.hide,function(){n._trigger("close",t)}))},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(e,t){var n=!!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;return n&&!t&&this._trigger("focus",e),n},open:function(){var t=this;return this._isOpen?(this._moveToTop()&&this._focusTabbable(),undefined):(this._isOpen=!0,this.opener=e(this.document[0].activeElement),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this._show(this.uiDialog,this.options.show,function(){t._focusTabbable(),t._trigger("focus")}),this._trigger("open"),undefined)},_focusTabbable:function(){var e=this.element.find("[autofocus]");e.length||(e=this.element.find(":tabbable")),e.length||(e=this.uiDialogButtonPane.find(":tabbable")),e.length||(e=this.uiDialogTitlebarClose.filter(":tabbable")),e.length||(e=this.uiDialog),e.eq(0).focus()},_keepFocus:function(t){function n(){var t=this.document[0].activeElement,n=this.uiDialog[0]===t||e.contains(this.uiDialog[0],t);n||this._focusTabbable()}t.preventDefault(),n.call(this),this._delay(n)},_createWrapper:function(){this.uiDialog=e("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front "+this.options.dialogClass).hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._on(this.uiDialog,{keydown:function(t){if(this.options.closeOnEscape&&!t.isDefaultPrevented()&&t.keyCode&&t.keyCode===e.ui.keyCode.ESCAPE)return t.preventDefault(),this.close(t),undefined;if(t.keyCode===e.ui.keyCode.TAB){var n=this.uiDialog.find(":tabbable"),r=n.filter(":first"),i=n.filter(":last");t.target!==i[0]&&t.target!==this.uiDialog[0]||t.shiftKey?t.target!==r[0]&&t.target!==this.uiDialog[0]||!t.shiftKey||(i.focus(1),t.preventDefault()):(r.focus(1),t.preventDefault())}},mousedown:function(e){this._moveToTop(e)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var t;this.uiDialogTitlebar=e("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog),this._on(this.uiDialogTitlebar,{mousedown:function(t){e(t.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.focus()}}),this.uiDialogTitlebarClose=e("<button></button>").button({label:this.options.closeText,icons:{primary:"ui-icon-closethick"},text:!1}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar),this._on(this.uiDialogTitlebarClose,{click:function(e){e.preventDefault(),this.close(e)}}),t=e("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar),this._title(t),this.uiDialog.attr({"aria-labelledby":t.attr("id")})},_title:function(e){this.options.title||e.html("&#160;"),e.text(this.options.title)},_createButtonPane:function(){this.uiDialogButtonPane=e("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),this.uiButtonSet=e("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane),this._createButtons()},_createButtons:function(){var t=this,n=this.options.buttons;return this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),e.isEmptyObject(n)||e.isArray(n)&&!n.length?(this.uiDialog.removeClass("ui-dialog-buttons"),undefined):(e.each(n,function(n,r){var i,s;r=e.isFunction(r)?{click:r,text:n}:r,r=e.extend({type:"button"},r),i=r.click,r.click=function(){i.apply(t.element[0],arguments)},s={icons:r.icons,text:r.showText},delete r.icons,delete r.showText,e("<button></button>",r).button(s).appendTo(t.uiButtonSet)}),this.uiDialog.addClass("ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog),undefined)},_makeDraggable:function(){function t(e){return{position:e.position,offset:e.offset}}var n=this,r=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(r,s){e(this).addClass("ui-dialog-dragging"),n._blockFrames(),n._trigger("dragStart",r,t(s))},drag:function(e,r){n._trigger("drag",e,t(r))},stop:function(s,o){r.position=[o.position.left-n.document.scrollLeft(),o.position.top-n.document.scrollTop()],e(this).removeClass("ui-dialog-dragging"),n._unblockFrames(),n._trigger("dragStop",s,t(o))}})},_makeResizable:function(){function t(e){return{originalPosition:e.originalPosition,originalSize:e.originalSize,position:e.position,size:e.size}}var n=this,r=this.options,i=r.resizable,s=this.uiDialog.css("position"),o="string"==typeof i?i:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:r.maxWidth,maxHeight:r.maxHeight,minWidth:r.minWidth,minHeight:this._minHeight(),handles:o,start:function(r,i){e(this).addClass("ui-dialog-resizing"),n._blockFrames(),n._trigger("resizeStart",r,t(i))},resize:function(e,r){n._trigger("resize",e,t(r))},stop:function(i,s){r.height=e(this).height(),r.width=e(this).width(),e(this).removeClass("ui-dialog-resizing"),n._unblockFrames(),n._trigger("resizeStop",i,t(s))}}).css("position",s)},_minHeight:function(){var e=this.options;return"auto"===e.height?e.minHeight:Math.min(e.minHeight,e.height)},_position:function(){var e=this.uiDialog.is(":visible");e||this.uiDialog.show(),this.uiDialog.position(this.options.position),e||this.uiDialog.hide()},_setOptions:function(r){var s=this,o=!1,u={};e.each(r,function(e,r){s._setOption(e,r),e in t&&(o=!0),e in n&&(u[e]=r)}),o&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",u)},_setOption:function(e,t){var n,r,i=this.uiDialog;"dialogClass"===e&&i.removeClass(this.options.dialogClass).addClass(t),"disabled"!==e&&(this._super(e,t),"appendTo"===e&&this.uiDialog.appendTo(this._appendTo()),"buttons"===e&&this._createButtons(),"closeText"===e&&this.uiDialogTitlebarClose.button({label:""+t}),"draggable"===e&&(n=i.is(":data(ui-draggable)"),n&&!t&&i.draggable("destroy"),!n&&t&&this._makeDraggable()),"position"===e&&this._position(),"resizable"===e&&(r=i.is(":data(ui-resizable)"),r&&!t&&i.resizable("destroy"),r&&"string"==typeof t&&i.resizable("option","handles",t),r||t===!1||this._makeResizable()),"title"===e&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var e,t,n,r=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),r.minWidth>r.width&&(r.width=r.minWidth),e=this.uiDialog.css({height:"auto",width:r.width}).outerHeight(),t=Math.max(0,r.minHeight-e),n="number"==typeof r.maxHeight?Math.max(0,r.maxHeight-e):"none","auto"===r.height?this.element.css({minHeight:t,maxHeight:n,height:"auto"}):this.element.height(Math.max(0,r.height-e)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var t=e(this);return e("<div>").css({position:"absolute",width:t.outerWidth(),height:t.outerHeight()}).appendTo(t.parent()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(t){return e(t.target).closest(".ui-dialog").length?!0:!!e(t.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var t=this,n=this.widgetFullName;e.ui.dialog.overlayInstances||this._delay(function(){e.ui.dialog.overlayInstances&&this.document.bind("focusin.dialog",function(r){t._allowInteraction(r)||(r.preventDefault(),e(".ui-dialog:visible:last .ui-dialog-content").data(n)._focusTabbable())})}),this.overlay=e("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()),this._on(this.overlay,{mousedown:"_keepFocus"}),e.ui.dialog.overlayInstances++}},_destroyOverlay:function(){this.options.modal&&this.overlay&&(e.ui.dialog.overlayInstances--,e.ui.dialog.overlayInstances||this.document.unbind("focusin.dialog"),this.overlay.remove(),this.overlay=null)}}),e.ui.dialog.overlayInstances=0,e.uiBackCompat!==!1&&e.widget("ui.dialog",e.ui.dialog,{_position:function(){var t,n=this.options.position,r=[],i=[0,0];n?(("string"==typeof n||"object"==typeof n&&"0"in n)&&(r=n.split?n.split(" "):[n[0],n[1]],1===r.length&&(r[1]=r[0]),e.each(["left","top"],function(e,t){+r[e]===r[e]&&(i[e]=r[e],r[e]=t)}),n={my:r[0]+(0>i[0]?i[0]:"+"+i[0])+" "+r[1]+(0>i[1]?i[1]:"+"+i[1]),at:r.join(" ")}),n=e.extend({},e.ui.dialog.prototype.options.position,n)):n=e.ui.dialog.prototype.options.position,t=this.uiDialog.is(":visible"),t||this.uiDialog.show(),this.uiDialog.position(n),t||this.uiDialog.hide()}})})(jQuery);(function(e){e.widget("ui.menu",{version:"1.10.3",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}).bind("click"+this.eventNamespace,e.proxy(function(e){this.options.disabled&&e.preventDefault()},this)),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item > a":function(e){e.preventDefault()},"click .ui-state-disabled > a":function(e){e.preventDefault()},"click .ui-menu-item:has(a)":function(n){var r=e(n.target).closest(".ui-menu-item");!this.mouseHandled&&r.not(".ui-state-disabled").length&&(this.mouseHandled=!0,this.select(n),r.has(".ui-menu").length?this.expand(n):this.element.is(":focus")||(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(n){var r=e(n.currentTarget);r.siblings().children(".ui-state-active").removeClass("ui-state-active"),this.focus(n,r)},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,t){var n=this.active||this.element.children(".ui-menu-item").eq(0);t||this.focus(e,n)},blur:function(n){this._delay(function(){e.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(n)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(n){e(n.target).closest(".ui-menu").length||this.collapseAll(n),this.mouseHandled=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var n=e(this);n.data("ui-menu-submenu-carat")&&n.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(n){function r(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}var i,s,o,u,a,f=!0;switch(n.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(n);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(n);break;case e.ui.keyCode.HOME:this._move("first","first",n);break;case e.ui.keyCode.END:this._move("last","last",n);break;case e.ui.keyCode.UP:this.previous(n);break;case e.ui.keyCode.DOWN:this.next(n);break;case e.ui.keyCode.LEFT:this.collapse(n);break;case e.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(n);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(n);break;case e.ui.keyCode.ESCAPE:this.collapse(n);break;default:f=!1,s=this.previousFilter||"",o=String.fromCharCode(n.keyCode),u=!1,clearTimeout(this.filterTimer),o===s?u=!0:o=s+o,a=RegExp("^"+r(o),"i"),i=this.activeMenu.children(".ui-menu-item").filter(function(){return a.test(e(this).children("a").text())}),i=u&&-1!==i.index(this.active.next())?this.active.nextAll(".ui-menu-item"):i,i.length||(o=String.fromCharCode(n.keyCode),a=RegExp("^"+r(o),"i"),i=this.activeMenu.children(".ui-menu-item").filter(function(){return a.test(e(this).children("a").text())})),i.length?(this.focus(n,i),i.length>1?(this.previousFilter=o,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter):delete this.previousFilter}f&&n.preventDefault()},_activate:function(e){this.active.is(".ui-state-disabled")||(this.active.children("a[aria-haspopup='true']").length?this.expand(e):this.select(e))},refresh:function(){var n,r=this.options.icons.submenu,i=this.element.find(this.options.menus);i.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var n=e(this),i=n.prev("a"),s=e("<span>").addClass("ui-menu-icon ui-icon "+r).data("ui-menu-submenu-carat",!0);i.attr("aria-haspopup","true").prepend(s),n.attr("aria-labelledby",i.attr("id"))}),n=i.add(this.element),n.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","presentation").children("a").uniqueId().addClass("ui-corner-all").attr({tabIndex:-1,role:this._itemRole()}),n.children(":not(.ui-menu-item)").each(function(){var n=e(this);/[^\-\u2014\u2013\s]/.test(n.text())||n.addClass("ui-widget-content ui-menu-divider")}),n.children(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!e.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(e,t){"icons"===e&&this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu),this._super(e,t)},focus:function(e,t){var n,r;this.blur(e,e&&"focus"===e.type),this._scrollIntoView(t),this.active=t.first(),r=this.active.children("a").addClass("ui-state-focus"),this.options.role&&this.element.attr("aria-activedescendant",r.attr("id")),this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"),e&&"keydown"===e.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),n=t.children(".ui-menu"),n.length&&/^mouse/.test(e.type)&&this._startOpening(n),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t})},_scrollIntoView:function(n){var r,i,s,o,u,a;this._hasScroll()&&(r=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,i=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,s=n.offset().top-this.activeMenu.offset().top-r-i,o=this.activeMenu.scrollTop(),u=this.activeMenu.height(),a=n.height(),0>s?this.activeMenu.scrollTop(o+s):s+a>u&&this.activeMenu.scrollTop(o+s-u+a))},blur:function(e,t){t||clearTimeout(this.timer),this.active&&(this.active.children("a").removeClass("ui-state-focus"),this.active=null,this._trigger("blur",e,{item:this.active}))},_startOpening:function(e){clearTimeout(this.timer),"true"===e.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(e)},this.delay))},_open:function(n){var r=e.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(n.parents(".ui-menu")).hide().attr("aria-hidden","true"),n.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(r)},collapseAll:function(n,r){clearTimeout(this.timer),this.timer=this._delay(function(){var s=r?this.element:e(n&&n.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(n),this.activeMenu=s},this.delay)},_close:function(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find("a.ui-state-active").removeClass("ui-state-active")},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t))},expand:function(e){var t=this.active&&this.active.children(".ui-menu ").children(".ui-menu-item").first();t&&t.length&&(this._open(t.parent()),this._delay(function(){this.focus(e,t)}))},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(e,t,n){var r;this.active&&(r="first"===e||"last"===e?this.active["first"===e?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[e+"All"](".ui-menu-item").eq(0)),r&&r.length&&this.active||(r=this.activeMenu.children(".ui-menu-item")[t]()),this.focus(n,r)},nextPage:function(n){var r,i,s;return this.active?(this.isLastItem()||(this._hasScroll()?(i=this.active.offset().top,s=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return r=e(this),0>r.offset().top-i-s}),this.focus(n,r)):this.focus(n,this.activeMenu.children(".ui-menu-item")[this.active?"last":"first"]())),undefined):(this.next(n),undefined)},previousPage:function(n){var r,i,s;return this.active?(this.isFirstItem()||(this._hasScroll()?(i=this.active.offset().top,s=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return r=e(this),r.offset().top-i+s>0}),this.focus(n,r)):this.focus(n,this.activeMenu.children(".ui-menu-item").first())),undefined):(this.next(n),undefined)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(n){this.active=this.active||e(n.target).closest(".ui-menu-item");var r={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(n,!0),this._trigger("select",n,r)}})})(jQuery);(function(e,t){e.widget("ui.progressbar",{version:"1.10.3",options:{max:100,value:0,change:null,complete:null},min:0,_create:function(){this.oldValue=this.options.value=this._constrainedValue(),this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min}),this.valueDiv=e("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this._refreshValue()},_destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove()},value:function(e){return e===t?this.options.value:(this.options.value=this._constrainedValue(e),this._refreshValue(),t)},_constrainedValue:function(e){return e===t&&(e=this.options.value),this.indeterminate=e===!1,"number"!=typeof e&&(e=0),this.indeterminate?!1:Math.min(this.options.max,Math.max(this.min,e))},_setOptions:function(e){var t=e.value;delete e.value,this._super(e),this.options.value=this._constrainedValue(t),this._refreshValue()},_setOption:function(e,t){"max"===e&&(t=Math.max(this.min,t)),this._super(e,t)},_percentage:function(){return this.indeterminate?100:100*(this.options.value-this.min)/(this.options.max-this.min)},_refreshValue:function(){var t=this.options.value,n=this._percentage();this.valueDiv.toggle(this.indeterminate||t>this.min).toggleClass("ui-corner-right",t===this.options.max).width(n.toFixed(0)+"%"),this.element.toggleClass("ui-progressbar-indeterminate",this.indeterminate),this.indeterminate?(this.element.removeAttr("aria-valuenow"),this.overlayDiv||(this.overlayDiv=e("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))):(this.element.attr({"aria-valuemax":this.options.max,"aria-valuenow":t}),this.overlayDiv&&(this.overlayDiv.remove(),this.overlayDiv=null)),this.oldValue!==t&&(this.oldValue=t,this._trigger("change")),t===this.options.max&&this._trigger("complete")}})})(jQuery);(function(e){var t=5;e.widget("ui.slider",e.ui.mouse,{version:"1.10.3",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var t,n,r=this.options,i=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),s="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",o=[];for(n=r.values&&r.values.length||1,i.length>n&&(i.slice(n).remove(),i=i.slice(0,n)),t=i.length;n>t;t++)o.push(s);this.handles=i.add(e(o.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(t){e(this).data("ui-slider-handle-index",t)})},_createRange:function(){var t=this.options,n="";t.range?(t.range===!0&&(t.values?t.values.length&&2!==t.values.length?t.values=[t.values[0],t.values[0]]:e.isArray(t.values)&&(t.values=t.values.slice(0)):t.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=e("<div></div>").appendTo(this.element),n="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(n+("min"===t.range||"max"===t.range?" ui-slider-range-"+t.range:""))):this.range=e([])},_setupEvents:function(){var e=this.handles.add(this.range).filter("a");this._off(e),this._on(e,this._handleEvents),this._hoverable(e),this._focusable(e)},_destroy:function(){this.handles.remove(),this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(t){var n,r,i,s,o,u,a,f,l=this,c=this.options;return c.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),n={x:t.pageX,y:t.pageY},r=this._normValueFromMouse(n),i=this._valueMax()-this._valueMin()+1,this.handles.each(function(t){var n=Math.abs(r-l.values(t));(i>n||i===n&&(t===l._lastChangedValue||l.values(t)===c.min))&&(i=n,s=e(this),o=t)}),u=this._start(t,o),u===!1?!1:(this._mouseSliding=!0,this._handleIndex=o,s.addClass("ui-state-active").focus(),a=s.offset(),f=!e(t.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=f?{left:0,top:0}:{left:t.pageX-a.left-s.width()/2,top:t.pageY-a.top-s.height()/2-(parseInt(s.css("borderTopWidth"),10)||0)-(parseInt(s.css("borderBottomWidth"),10)||0)+(parseInt(s.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(t,o,r),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(e){var t={x:e.pageX,y:e.pageY},n=this._normValueFromMouse(t);return this._slide(e,this._handleIndex,n),!1},_mouseStop:function(e){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(e,this._handleIndex),this._change(e,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(e){var t,n,r,i,s;return"horizontal"===this.orientation?(t=this.elementSize.width,n=e.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(t=this.elementSize.height,n=e.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),r=n/t,r>1&&(r=1),0>r&&(r=0),"vertical"===this.orientation&&(r=1-r),i=this._valueMax()-this._valueMin(),s=this._valueMin()+r*i,this._trimAlignValue(s)},_start:function(e,t){var n={handle:this.handles[t],value:this.value()};return this.options.values&&this.options.values.length&&(n.value=this.values(t),n.values=this.values()),this._trigger("start",e,n)},_slide:function(e,t,n){var r,i,s;this.options.values&&this.options.values.length?(r=this.values(t?0:1),2===this.options.values.length&&this.options.range===!0&&(0===t&&n>r||1===t&&r>n)&&(n=r),n!==this.values(t)&&(i=this.values(),i[t]=n,s=this._trigger("slide",e,{handle:this.handles[t],value:n,values:i}),r=this.values(t?0:1),s!==!1&&this.values(t,n,!0))):n!==this.value()&&(s=this._trigger("slide",e,{handle:this.handles[t],value:n}),s!==!1&&this.value(n))},_stop:function(e,t){var n={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(n.value=this.values(t),n.values=this.values()),this._trigger("stop",e,n)},_change:function(e,t){if(!this._keySliding&&!this._mouseSliding){var n={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(n.value=this.values(t),n.values=this.values()),this._lastChangedValue=t,this._trigger("change",e,n)}},value:function(e){return arguments.length?(this.options.value=this._trimAlignValue(e),this._refreshValue(),this._change(null,0),undefined):this._value()},values:function(t,n){var r,i,s;if(arguments.length>1)return this.options.values[t]=this._trimAlignValue(n),this._refreshValue(),this._change(null,t),undefined;if(!arguments.length)return this._values();if(!e.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(t):this.value();for(r=this.options.values,i=arguments[0],s=0;r.length>s;s+=1)r[s]=this._trimAlignValue(i[s]),this._change(null,s);this._refreshValue()},_setOption:function(t,n){var r,i=0;switch("range"===t&&this.options.range===!0&&("min"===n?(this.options.value=this._values(0),this.options.values=null):"max"===n&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),e.isArray(this.options.values)&&(i=this.options.values.length),e.Widget.prototype._setOption.apply(this,arguments),t){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),r=0;i>r;r+=1)this._change(null,r);this._animateOff=!1;break;case"min":case"max":this._animateOff=!0,this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var e=this.options.value;return e=this._trimAlignValue(e)},_values:function(e){var t,n,r;if(arguments.length)return t=this.options.values[e],t=this._trimAlignValue(t);if(this.options.values&&this.options.values.length){for(n=this.options.values.slice(),r=0;n.length>r;r+=1)n[r]=this._trimAlignValue(n[r]);return n}return[]},_trimAlignValue:function(e){if(this._valueMin()>=e)return this._valueMin();if(e>=this._valueMax())return this._valueMax();var t=this.options.step>0?this.options.step:1,n=(e-this._valueMin())%t,r=e-n;return 2*Math.abs(n)>=t&&(r+=n>0?t:-t),parseFloat(r.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var t,n,r,i,s,o=this.options.range,u=this.options,a=this,f=this._animateOff?!1:u.animate,l={};this.options.values&&this.options.values.length?this.handles.each(function(r){n=100*((a.values(r)-a._valueMin())/(a._valueMax()-a._valueMin())),l["horizontal"===a.orientation?"left":"bottom"]=n+"%",e(this).stop(1,1)[f?"animate":"css"](l,u.animate),a.options.range===!0&&("horizontal"===a.orientation?(0===r&&a.range.stop(1,1)[f?"animate":"css"]({left:n+"%"},u.animate),1===r&&a.range[f?"animate":"css"]({width:n-t+"%"},{queue:!1,duration:u.animate})):(0===r&&a.range.stop(1,1)[f?"animate":"css"]({bottom:n+"%"},u.animate),1===r&&a.range[f?"animate":"css"]({height:n-t+"%"},{queue:!1,duration:u.animate}))),t=n}):(r=this.value(),i=this._valueMin(),s=this._valueMax(),n=s!==i?100*((r-i)/(s-i)):0,l["horizontal"===this.orientation?"left":"bottom"]=n+"%",this.handle.stop(1,1)[f?"animate":"css"](l,u.animate),"min"===o&&"horizontal"===this.orientation&&this.range.stop(1,1)[f?"animate":"css"]({width:n+"%"},u.animate),"max"===o&&"horizontal"===this.orientation&&this.range[f?"animate":"css"]({width:100-n+"%"},{queue:!1,duration:u.animate}),"min"===o&&"vertical"===this.orientation&&this.range.stop(1,1)[f?"animate":"css"]({height:n+"%"},u.animate),"max"===o&&"vertical"===this.orientation&&this.range[f?"animate":"css"]({height:100-n+"%"},{queue:!1,duration:u.animate}))},_handleEvents:{keydown:function(n){var r,i,s,o,u=e(n.target).data("ui-slider-handle-index");switch(n.keyCode){case e.ui.keyCode.HOME:case e.ui.keyCode.END:case e.ui.keyCode.PAGE_UP:case e.ui.keyCode.PAGE_DOWN:case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(n.preventDefault(),!this._keySliding&&(this._keySliding=!0,e(n.target).addClass("ui-state-active"),r=this._start(n,u),r===!1))return}switch(o=this.options.step,i=s=this.options.values&&this.options.values.length?this.values(u):this.value(),n.keyCode){case e.ui.keyCode.HOME:s=this._valueMin();break;case e.ui.keyCode.END:s=this._valueMax();break;case e.ui.keyCode.PAGE_UP:s=this._trimAlignValue(i+(this._valueMax()-this._valueMin())/t);break;case e.ui.keyCode.PAGE_DOWN:s=this._trimAlignValue(i-(this._valueMax()-this._valueMin())/t);break;case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:if(i===this._valueMax())return;s=this._trimAlignValue(i+o);break;case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(i===this._valueMin())return;s=this._trimAlignValue(i-o)}this._slide(n,u,s)},click:function(e){e.preventDefault()},keyup:function(t){var n=e(t.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(t,n),this._change(t,n),e(t.target).removeClass("ui-state-active"))}}})})(jQuery);(function(e){function t(e){return function(){var t=this.element.val();e.apply(this,arguments),this._refresh(),t!==this.element.val()&&this._trigger("change")}}e.widget("ui.spinner",{version:"1.10.3",defaultElement:"<input>",widgetEventPrefix:"spin",options:{culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var t={},n=this.element;return e.each(["min","max","step"],function(e,r){var s=n.attr(r);void 0!==s&&s.length&&(t[r]=s)}),t},_events:{keydown:function(e){this._start(e)&&this._keydown(e)&&e.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(e){return this.cancelBlur?(delete this.cancelBlur,void 0):(this._stop(),this._refresh(),this.previous!==this.element.val()&&this._trigger("change",e),void 0)},mousewheel:function(e,t){if(t){if(!this.spinning&&!this._start(e))return!1;this._spin((t>0?1:-1)*this.options.step,e),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(e)},100),e.preventDefault()}},"mousedown .ui-spinner-button":function(t){function n(){var e=this.element[0]===this.document[0].activeElement;e||(this.element.focus(),this.previous=r,this._delay(function(){this.previous=r}))}var r;r=this.element[0]===this.document[0].activeElement?this.previous:this.element.val(),t.preventDefault(),n.call(this),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,n.call(this)}),this._start(t)!==!1&&this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(t){return e(t.currentTarget).hasClass("ui-state-active")?this._start(t)===!1?!1:(this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t),void 0):void 0},"mouseleave .ui-spinner-button":"_stop"},_draw:function(){var e=this.uiSpinner=this.element.addClass("ui-spinner-input").attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());this.element.attr("role","spinbutton"),this.buttons=e.find(".ui-spinner-button").attr("tabIndex",-1).button().removeClass("ui-corner-all"),this.buttons.height()>Math.ceil(.5*e.height())&&e.height()>0&&e.height(e.height()),this.options.disabled&&this.disable()},_keydown:function(t){var n=this.options,r=e.ui.keyCode;switch(t.keyCode){case r.UP:return this._repeat(null,1,t),!0;case r.DOWN:return this._repeat(null,-1,t),!0;case r.PAGE_UP:return this._repeat(null,n.page,t),!0;case r.PAGE_DOWN:return this._repeat(null,-n.page,t),!0}return!1},_uiSpinnerHtml:function(){return"<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"},_buttonHtml:function(){return"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon "+this.options.icons.up+"'>&#9650;</span>"+"</a>"+"<a class='ui-spinner-button ui-spinner-down ui-corner-br'>"+"<span class='ui-icon "+this.options.icons.down+"'>&#9660;</span>"+"</a>"},_start:function(e){return this.spinning||this._trigger("start",e)!==!1?(this.counter||(this.counter=1),this.spinning=!0,!0):!1},_repeat:function(e,t,n){e=e||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,t,n)},e),this._spin(t*this.options.step,n)},_spin:function(e,t){var n=this.value()||0;this.counter||(this.counter=1),n=this._adjustValue(n+e*this._increment(this.counter)),this.spinning&&this._trigger("spin",t,{value:n})===!1||(this._value(n),this.counter++)},_increment:function(t){var n=this.options.incremental;return n?e.isFunction(n)?n(t):Math.floor(t*t*t/5e4-t*t/500+17*t/200+1):1},_precision:function(){var e=this._precisionOf(this.options.step);return null!==this.options.min&&(e=Math.max(e,this._precisionOf(this.options.min))),e},_precisionOf:function(e){var t=""+e,n=t.indexOf(".");return-1===n?0:t.length-n-1},_adjustValue:function(e){var t,n,r=this.options;return t=null!==r.min?r.min:0,n=e-t,n=Math.round(n/r.step)*r.step,e=t+n,e=parseFloat(e.toFixed(this._precision())),null!==r.max&&e>r.max?r.max:null!==r.min&&r.min>e?r.min:e},_stop:function(e){this.spinning&&(clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",e))},_setOption:function(e,t){if("culture"===e||"numberFormat"===e){var n=this._parse(this.element.val());return this.options[e]=t,this.element.val(this._format(n)),void 0}("max"===e||"min"===e||"step"===e)&&"string"==typeof t&&(t=this._parse(t)),"icons"===e&&(this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(t.up),this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(t.down)),this._super(e,t),"disabled"===e&&(t?(this.element.prop("disabled",!0),this.buttons.button("disable")):(this.element.prop("disabled",!1),this.buttons.button("enable")))},_setOptions:t(function(e){this._super(e),this._value(this.element.val())}),_parse:function(e){return"string"==typeof e&&""!==e&&(e=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(e,10,this.options.culture):+e),""===e||isNaN(e)?null:e},_format:function(e){return""===e?"":window.Globalize&&this.options.numberFormat?Globalize.format(e,this.options.numberFormat,this.options.culture):e},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},_value:function(e,t){var n;""!==e&&(n=this._parse(e),null!==n&&(t||(n=this._adjustValue(n)),e=this._format(n))),this.element.val(e),this._refresh()},_destroy:function(){this.element.removeClass("ui-spinner-input").prop("disabled",!1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:t(function(e){this._stepUp(e)}),_stepUp:function(e){this._start()&&(this._spin((e||1)*this.options.step),this._stop())},stepDown:t(function(e){this._stepDown(e)}),_stepDown:function(e){this._start()&&(this._spin((e||1)*-this.options.step),this._stop())},pageUp:t(function(e){this._stepUp((e||1)*this.options.page)}),pageDown:t(function(e){this._stepDown((e||1)*this.options.page)}),value:function(e){return arguments.length?(t(this._value).call(this,e),void 0):this._parse(this.element.val())},widget:function(){return this.uiSpinner}})})(jQuery);(function(e,t){function n(){return++i}function r(e){return e.hash.length>1&&decodeURIComponent(e.href.replace(s,""))===decodeURIComponent(location.href.replace(s,""))}var i=0,s=/#.*$/;e.widget("ui.tabs",{version:"1.10.3",delay:300,options:{active:null,collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_create:function(){var t=this,n=this.options;this.running=!1,this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",n.collapsible).delegate(".ui-tabs-nav > li","mousedown"+this.eventNamespace,function(t){e(this).is(".ui-state-disabled")&&t.preventDefault()}).delegate(".ui-tabs-anchor","focus"+this.eventNamespace,function(){e(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this._processTabs(),n.active=this._initialActive(),e.isArray(n.disabled)&&(n.disabled=e.unique(n.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"),function(e){return t.tabs.index(e)}))).sort()),this.active=this.options.active!==!1&&this.anchors.length?this._findActive(n.active):e(),this._refresh(),this.active.length&&this.load(n.active)},_initialActive:function(){var n=this.options.active,r=this.options.collapsible,i=location.hash.substring(1);return null===n&&(i&&this.tabs.each(function(r,s){return e(s).attr("aria-controls")===i?(n=r,!1):t}),null===n&&(n=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),(null===n||-1===n)&&(n=this.tabs.length?0:!1)),n!==!1&&(n=this.tabs.index(this.tabs.eq(n)),-1===n&&(n=r?!1:0)),!r&&n===!1&&this.anchors.length&&(n=0),n},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):e()}},_tabKeydown:function(n){var r=e(this.document[0].activeElement).closest("li"),i=this.tabs.index(r),s=!0;if(!this._handlePageNav(n)){switch(n.keyCode){case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:i++;break;case e.ui.keyCode.UP:case e.ui.keyCode.LEFT:s=!1,i--;break;case e.ui.keyCode.END:i=this.anchors.length-1;break;case e.ui.keyCode.HOME:i=0;break;case e.ui.keyCode.SPACE:return n.preventDefault(),clearTimeout(this.activating),this._activate(i),t;case e.ui.keyCode.ENTER:return n.preventDefault(),clearTimeout(this.activating),this._activate(i===this.options.active?!1:i),t;default:return}n.preventDefault(),clearTimeout(this.activating),i=this._focusNextTab(i,s),n.ctrlKey||(r.attr("aria-selected","false"),this.tabs.eq(i).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",i)},this.delay))}},_panelKeydown:function(t){this._handlePageNav(t)||t.ctrlKey&&t.keyCode===e.ui.keyCode.UP&&(t.preventDefault(),this.active.focus())},_handlePageNav:function(n){return n.altKey&&n.keyCode===e.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):n.altKey&&n.keyCode===e.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):t},_findNextTab:function(t,n){function r(){return t>i&&(t=0),0>t&&(t=i),t}for(var i=this.tabs.length-1;-1!==e.inArray(r(),this.options.disabled);)t=n?t+1:t-1;return t},_focusNextTab:function(e,t){return e=this._findNextTab(e,t),this.tabs.eq(e).focus(),e},_setOption:function(e,n){return"active"===e?(this._activate(n),t):"disabled"===e?(this._setupDisabled(n),t):(this._super(e,n),"collapsible"===e&&(this.element.toggleClass("ui-tabs-collapsible",n),n||this.options.active!==!1||this._activate(0)),"event"===e&&this._setupEvents(n),"heightStyle"===e&&this._setupHeightStyle(n),t)},_tabId:function(e){return e.attr("aria-controls")||"ui-tabs-"+n()},_sanitizeSelector:function(e){return e?e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var t=this.options,n=this.tablist.children(":has(a[href])");t.disabled=e.map(n.filter(".ui-state-disabled"),function(e){return n.index(e)}),this._processTabs(),t.active!==!1&&this.anchors.length?this.active.length&&!e.contains(this.tablist[0],this.active[0])?this.tabs.length===t.disabled.length?(t.active=!1,this.active=e()):this._activate(this._findNextTab(Math.max(0,t.active-1),!1)):t.active=this.tabs.index(this.active):(t.active=!1,this.active=e()),this._refresh()},_refresh:function(){this._setupDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-expanded":"false","aria-hidden":"true"}),this.active.length?(this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true",tabIndex:0}),this._getPanelForTab(this.active).show().attr({"aria-expanded":"true","aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var t=this;this.tablist=this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist"),this.tabs=this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1}),this.anchors=this.tabs.map(function(){return e("a",this)[0]}).addClass("ui-tabs-anchor").attr({role:"presentation",tabIndex:-1}),this.panels=e(),this.anchors.each(function(n,i){var s,o,u,a=e(i).uniqueId().attr("id"),f=e(i).closest("li"),l=f.attr("aria-controls");r(i)?(s=i.hash,o=t.element.find(t._sanitizeSelector(s))):(u=t._tabId(f),s="#"+u,o=t.element.find(s),o.length||(o=t._createPanel(u),o.insertAfter(t.panels[n-1]||t.tablist)),o.attr("aria-live","polite")),o.length&&(t.panels=t.panels.add(o)),l&&f.data("ui-tabs-aria-controls",l),f.attr({"aria-controls":s.substring(1),"aria-labelledby":a}),o.attr("aria-labelledby",a)}),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role","tabpanel")},_getList:function(){return this.element.find("ol,ul").eq(0)},_createPanel:function(t){return e("<div>").attr("id",t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)},_setupDisabled:function(t){e.isArray(t)&&(t.length?t.length===this.anchors.length&&(t=!0):t=!1);for(var n,r=0;n=this.tabs[r];r++)t===!0||-1!==e.inArray(r,t)?e(n).addClass("ui-state-disabled").attr("aria-disabled","true"):e(n).removeClass("ui-state-disabled").removeAttr("aria-disabled");this.options.disabled=t},_setupEvents:function(t){var n={click:function(e){e.preventDefault()}};t&&e.each(t.split(" "),function(e,t){n[t]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(this.anchors,n),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(t){var n,r=this.element.parent();"fill"===t?(n=r.height(),n-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var t=e(this),r=t.css("position");"absolute"!==r&&"fixed"!==r&&(n-=t.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){n-=e(this).outerHeight(!0)}),this.panels.each(function(){e(this).height(Math.max(0,n-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):"auto"===t&&(n=0,this.panels.each(function(){n=Math.max(n,e(this).height("").height())}).height(n))},_eventHandler:function(t){var n=this.options,r=this.active,i=e(t.currentTarget),s=i.closest("li"),o=s[0]===r[0],u=o&&n.collapsible,a=u?e():this._getPanelForTab(s),f=r.length?this._getPanelForTab(r):e(),l={oldTab:r,oldPanel:f,newTab:u?e():s,newPanel:a};t.preventDefault(),s.hasClass("ui-state-disabled")||s.hasClass("ui-tabs-loading")||this.running||o&&!n.collapsible||this._trigger("beforeActivate",t,l)===!1||(n.active=u?!1:this.tabs.index(s),this.active=o?e():s,this.xhr&&this.xhr.abort(),f.length||a.length||e.error("jQuery UI Tabs: Mismatching fragment identifier."),a.length&&this.load(this.tabs.index(s),t),this._toggle(t,l))},_toggle:function(t,n){function r(){s.running=!1,s._trigger("activate",t,n)}function i(){n.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),o.length&&s.options.show?s._show(o,s.options.show,r):(o.show(),r())}var s=this,o=n.newPanel,u=n.oldPanel;this.running=!0,u.length&&this.options.hide?this._hide(u,this.options.hide,function(){n.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),i()}):(n.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),u.hide(),i()),u.attr({"aria-expanded":"false","aria-hidden":"true"}),n.oldTab.attr("aria-selected","false"),o.length&&u.length?n.oldTab.attr("tabIndex",-1):o.length&&this.tabs.filter(function(){return 0===e(this).attr("tabIndex")}).attr("tabIndex",-1),o.attr({"aria-expanded":"true","aria-hidden":"false"}),n.newTab.attr({"aria-selected":"true",tabIndex:0})},_activate:function(t){var n,r=this._findActive(t);r[0]!==this.active[0]&&(r.length||(r=this.active),n=r.find(".ui-tabs-anchor")[0],this._eventHandler({target:n,currentTarget:n,preventDefault:e.noop}))},_findActive:function(t){return t===!1?e():this.tabs.eq(t)},_getIndex:function(e){return"string"==typeof e&&(e=this.anchors.index(this.anchors.filter("[href$='"+e+"']"))),e},_destroy:function(){this.xhr&&this.xhr.abort(),this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(),this.tabs.add(this.panels).each(function(){e.data(this,"ui-tabs-destroy")?e(this).remove():e(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")}),this.tabs.each(function(){var t=e(this),n=t.data("ui-tabs-aria-controls");n?t.attr("aria-controls",n).removeData("ui-tabs-aria-controls"):t.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(n){var r=this.options.disabled;r!==!1&&(n===t?r=!1:(n=this._getIndex(n),r=e.isArray(r)?e.map(r,function(e){return e!==n?e:null}):e.map(this.tabs,function(e,t){return t!==n?t:null})),this._setupDisabled(r))},disable:function(n){var r=this.options.disabled;if(r!==!0){if(n===t)r=!0;else{if(n=this._getIndex(n),-1!==e.inArray(n,r))return;r=e.isArray(r)?e.merge([n],r).sort():[n]}this._setupDisabled(r)}},load:function(t,n){t=this._getIndex(t);var i=this,s=this.tabs.eq(t),o=s.find(".ui-tabs-anchor"),u=this._getPanelForTab(s),a={tab:s,panel:u};r(o[0])||(this.xhr=e.ajax(this._ajaxSettings(o,n,a)),this.xhr&&"canceled"!==this.xhr.statusText&&(s.addClass("ui-tabs-loading"),u.attr("aria-busy","true"),this.xhr.success(function(e){setTimeout(function(){u.html(e),i._trigger("load",n,a)},1)}).complete(function(e,t){setTimeout(function(){"abort"===t&&i.panels.stop(!1,!0),s.removeClass("ui-tabs-loading"),u.removeAttr("aria-busy"),e===i.xhr&&delete i.xhr},1)})))},_ajaxSettings:function(t,n,r){var i=this;return{url:t.attr("href"),beforeSend:function(t,s){return i._trigger("beforeLoad",n,e.extend({jqXHR:t,ajaxSettings:s},r))}}},_getPanelForTab:function(t){var n=e(t).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+n))}})})(jQuery);(function(e){function t(t,n){var r=(t.attr("aria-describedby")||"").split(/\s+/);r.push(n),t.data("ui-tooltip-id",n).attr("aria-describedby",e.trim(r.join(" ")))}function n(t){var n=t.data("ui-tooltip-id"),r=(t.attr("aria-describedby")||"").split(/\s+/),i=e.inArray(n,r);-1!==i&&r.splice(i,1),t.removeData("ui-tooltip-id"),r=e.trim(r.join(" ")),r?t.attr("aria-describedby",r):t.removeAttr("aria-describedby")}var r=0;e.widget("ui.tooltip",{version:"1.10.3",options:{content:function(){var t=e(this).attr("title")||"";return e("<a>").text(t).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable()},_setOption:function(t,n){var r=this;return"disabled"===t?(this[n?"_disable":"_enable"](),this.options[t]=n,void 0):(this._super(t,n),"content"===t&&e.each(this.tooltips,function(e,t){r._updateContent(t)}),void 0)},_disable:function(){var t=this;e.each(this.tooltips,function(n,r){var i=e.Event("blur");i.target=i.currentTarget=r[0],t.close(i,!0)}),this.element.find(this.options.items).addBack().each(function(){var t=e(this);t.is("[title]")&&t.data("ui-tooltip-title",t.attr("title")).attr("title","")})},_enable:function(){this.element.find(this.options.items).addBack().each(function(){var t=e(this);t.data("ui-tooltip-title")&&t.attr("title",t.data("ui-tooltip-title"))})},open:function(t){var n=this,r=e(t?t.target:this.element).closest(this.options.items);r.length&&!r.data("ui-tooltip-id")&&(r.attr("title")&&r.data("ui-tooltip-title",r.attr("title")),r.data("ui-tooltip-open",!0),t&&"mouseover"===t.type&&r.parents().each(function(){var t,r=e(this);r.data("ui-tooltip-open")&&(t=e.Event("blur"),t.target=t.currentTarget=this,n.close(t,!0)),r.attr("title")&&(r.uniqueId(),n.parents[this.id]={element:this,title:r.attr("title")},r.attr("title",""))}),this._updateContent(r,t))},_updateContent:function(e,t){var n,r=this.options.content,i=this,s=t?t.type:null;return"string"==typeof r?this._open(t,e,r):(n=r.call(e[0],function(n){e.data("ui-tooltip-open")&&i._delay(function(){t&&(t.type=s),this._open(t,e,n)})}),n&&this._open(t,e,n),void 0)},_open:function(n,r,i){function s(e){f.of=e,o.is(":hidden")||o.position(f)}var o,u,a,f=e.extend({},this.options.position);if(i){if(o=this._find(r),o.length)return o.find(".ui-tooltip-content").html(i),void 0;r.is("[title]")&&(n&&"mouseover"===n.type?r.attr("title",""):r.removeAttr("title")),o=this._tooltip(r),t(r,o.attr("id")),o.find(".ui-tooltip-content").html(i),this.options.track&&n&&/^mouse/.test(n.type)?(this._on(this.document,{mousemove:s}),s(n)):o.position(e.extend({of:r},this.options.position)),o.hide(),this._show(o,this.options.show),this.options.show&&this.options.show.delay&&(a=this.delayedShow=setInterval(function(){o.is(":visible")&&(s(f.of),clearInterval(a))},e.fx.interval)),this._trigger("open",n,{tooltip:o}),u={keyup:function(t){if(t.keyCode===e.ui.keyCode.ESCAPE){var n=e.Event(t);n.currentTarget=r[0],this.close(n,!0)}},remove:function(){this._removeTooltip(o)}},n&&"mouseover"!==n.type||(u.mouseleave="close"),n&&"focusin"!==n.type||(u.focusout="close"),this._on(!0,r,u)}},close:function(t){var r=this,s=e(t?t.currentTarget:this.element),o=this._find(s);this.closing||(clearInterval(this.delayedShow),s.data("ui-tooltip-title")&&s.attr("title",s.data("ui-tooltip-title")),n(s),o.stop(!0),this._hide(o,this.options.hide,function(){r._removeTooltip(e(this))}),s.removeData("ui-tooltip-open"),this._off(s,"mouseleave focusout keyup"),s[0]!==this.element[0]&&this._off(s,"remove"),this._off(this.document,"mousemove"),t&&"mouseleave"===t.type&&e.each(this.parents,function(t,n){e(n.element).attr("title",n.title),delete r.parents[t]}),this.closing=!0,this._trigger("close",t,{tooltip:o}),this.closing=!1)},_tooltip:function(t){var n="ui-tooltip-"+r++,i=e("<div>").attr({id:n,role:"tooltip"}).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||""));return e("<div>").addClass("ui-tooltip-content").appendTo(i),i.appendTo(this.document[0].body),this.tooltips[n]=t,i},_find:function(t){var n=t.data("ui-tooltip-id");return n?e("#"+n):e()},_removeTooltip:function(e){e.remove(),delete this.tooltips[e.attr("id")]},_destroy:function(){var t=this;e.each(this.tooltips,function(n,r){var i=e.Event("blur");i.target=i.currentTarget=r[0],t.close(i,!0),e("#"+n).remove(),r.data("ui-tooltip-title")&&(r.attr("title",r.data("ui-tooltip-title")),r.removeData("ui-tooltip-title"))})}})})(jQuery);(function(e){e.fn.addBack=e.fn.addBack||e.fn.andSelf;e.fn.extend({actual:function(t,n){if(!this[t]){throw'$.actual => The jQuery method "'+t+'" you called does not exist'}var r={absolute:false,clone:false,includeMargin:false};var i=e.extend(r,n);var s=this.eq(0);var o,u;if(i.clone===true){o=function(){var e="position: absolute !important; top: -1000 !important; ";s=s.clone().attr("style",e).appendTo("body")};u=function(){s.remove()}}else{var f=[];var l="";var c;o=function(){c=s.parents().addBack().filter(":hidden");l+="visibility: hidden !important; display: block !important; ";if(i.absolute===true){l+="position: absolute !important; "}c.each(function(){var t=e(this);f.push(t.attr("style"));t.attr("style",l)})};u=function(){c.each(function(t){var n=e(this);var r=f[t];if(r===undefined){n.removeAttr("style")}else{n.attr("style",r)}})}}o();var h=/(outer)/.test(t)?s[t](i.includeMargin):s[t]();u();return h}})})(jQuery);(function(e){var t=0;e.widget("ech.multiselect",{options:{header:!0,height:175,minWidth:225,classes:"",checkAllText:"Check all",uncheckAllText:"Uncheck all",noneSelectedText:"Select options",selectedText:"# selected",selectedList:0,show:null,hide:null,autoOpen:!1,multiple:!0,position:{}},_create:function(){var t=this.element.hide(),n=this.options;this.speed=e.fx.speeds._default;this._isOpen=!1;t=(this.button=e('<button type="button"><span class="ui-icon ui-icon-triangle-2-n-s"></span></button>')).addClass("ui-multiselect ui-widget ui-state-default ui-corner-all").addClass(n.classes).attr({title:t.attr("title"),"aria-haspopup":!0,tabIndex:t.attr("tabIndex")}).insertAfter(t);(this.buttonlabel=e("<span />")).html(n.noneSelectedText).appendTo(t);var t=(this.menu=e("<div />")).addClass("ui-multiselect-menu ui-widget ui-widget-content ui-corner-all").addClass(n.classes).appendTo(document.body),r=(this.header=e("<div />")).addClass("ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix").appendTo(t);(this.headerLinkContainer=e("<ul />")).addClass("ui-helper-reset").html(function(){return!0===n.header?'<li><a class="ui-multiselect-all" href="#"><span class="ui-icon ui-icon-check"></span><span>'+n.checkAllText+'</span></a></li><li><a class="ui-multiselect-none" href="#"><span class="ui-icon ui-icon-closethick"></span><span>'+n.uncheckAllText+"</span></a></li>":"string"===typeof n.header?"<li>"+n.header+"</li>":""}).append('<li class="ui-multiselect-close"><a href="#" class="ui-multiselect-close"><span class="ui-icon ui-icon-circle-close"></span></a></li>').appendTo(r);(this.checkboxContainer=e("<ul />")).addClass("ui-multiselect-checkboxes ui-helper-reset").appendTo(t);this._bindEvents();this.refresh(!0);n.multiple||t.addClass("ui-multiselect-single")},_init:function(){!1===this.options.header&&this.header.hide();this.options.multiple||this.headerLinkContainer.find(".ui-multiselect-all, .ui-multiselect-none").hide();this.options.autoOpen&&this.open();this.element.is(":disabled")&&this.disable()},refresh:function(n){var r=this.element,i=this.options,s=this.menu,o=this.checkboxContainer,u=[],a="",f=r.attr("id")||t++;r.find("option").each(function(t){e(this);var n=this.parentNode,r=this.innerHTML,s=this.title,o=this.value,t="ui-multiselect-"+(this.id||f+"-option-"+t),l=this.disabled,h=this.selected,p=["ui-corner-all"],v=(l?"ui-multiselect-disabled ":" ")+this.className,m;"OPTGROUP"===n.tagName&&(m=n.getAttribute("label"),-1===e.inArray(m,u)&&(a+='<li class="ui-multiselect-optgroup-label '+n.className+'"><a href="#">'+m+"</a></li>",u.push(m)));l&&p.push("ui-state-disabled");h&&!i.multiple&&p.push("ui-state-active");a+='<li class="'+v+'">';a+='<label for="'+t+'" title="'+s+'" class="'+p.join(" ")+'">';a+='<input id="'+t+'" name="multiselect_'+f+'" type="'+(i.multiple?"checkbox":"radio")+'" value="'+o+'" title="'+r+'"';h&&(a+=' checked="checked"',a+=' aria-selected="true"');l&&(a+=' disabled="disabled"',a+=' aria-disabled="true"');a+=" /><span>"+r+"</span></label></li>"});o.html(a);this.labels=s.find("label");this.inputs=this.labels.children("input");this._setButtonWidth();this._setMenuWidth();this.button[0].defaultValue=this.update();n||this._trigger("refresh")},update:function(){var t=this.options,n=this.inputs,r=n.filter(":checked"),i=r.length,t=0===i?t.noneSelectedText:e.isFunction(t.selectedText)?t.selectedText.call(this,i,n.length,r.get()):/\d/.test(t.selectedList)&&0<t.selectedList&&i<=t.selectedList?r.map(function(){return e(this).next().html()}).get().join(", "):t.selectedText.replace("#",i).replace("#",n.length);this.buttonlabel.html(t);return t},_bindEvents:function(){function t(){n[n._isOpen?"close":"open"]();return!1}var n=this,r=this.button;r.find("span").bind("click.multiselect",t);r.bind({click:t,keypress:function(e){switch(e.which){case 27:case 38:case 37:n.close();break;case 39:case 40:n.open()}},mouseenter:function(){r.hasClass("ui-state-disabled")||e(this).addClass("ui-state-hover")},mouseleave:function(){e(this).removeClass("ui-state-hover")},focus:function(){r.hasClass("ui-state-disabled")||e(this).addClass("ui-state-focus")},blur:function(){e(this).removeClass("ui-state-focus")}});this.header.delegate("a","click.multiselect",function(t){if(e(this).hasClass("ui-multiselect-close"))n.close();else n[e(this).hasClass("ui-multiselect-all")?"checkAll":"uncheckAll"]();t.preventDefault()});this.menu.delegate("li.ui-multiselect-optgroup-label a","click.multiselect",function(t){t.preventDefault();var r=e(this),i=r.parent().nextUntil("li.ui-multiselect-optgroup-label").find("input:visible:not(:disabled)"),s=i.get(),r=r.parent().text();!1!==n._trigger("beforeoptgrouptoggle",t,{inputs:s,label:r})&&(n._toggleChecked(i.filter(":checked").length!==i.length,i),n._trigger("optgrouptoggle",t,{inputs:s,label:r,checked:s[0].checked}))}).delegate("label","mouseenter.multiselect",function(){e(this).hasClass("ui-state-disabled")||(n.labels.removeClass("ui-state-hover"),e(this).addClass("ui-state-hover").find("input").focus())}).delegate("label","keydown.multiselect",function(t){t.preventDefault();switch(t.which){case 9:case 27:n.close();break;case 38:case 40:case 37:case 39:n._traverse(t.which,this);break;case 13:e(this).find("input")[0].click()}}).delegate('input[type="checkbox"], input[type="radio"]',"click.multiselect",function(t){var r=e(this),i=this.value,s=this.checked,o=n.element.find("option");this.disabled||!1===n._trigger("click",t,{value:i,text:this.title,checked:s})?t.preventDefault():(r.focus(),r.attr("aria-selected",s),o.each(function(){this.value===i?this.selected=s:n.options.multiple||(this.selected=!1)}),n.options.multiple||(n.labels.removeClass("ui-state-active"),r.closest("label").toggleClass("ui-state-active",s),n.close()),n.element.trigger("change"),setTimeout(e.proxy(n.update,n),10))});e(document).bind("mousedown.multiselect",function(t){n._isOpen&&!e.contains(n.menu[0],t.target)&&!e.contains(n.button[0],t.target)&&t.target!==n.button[0]&&n.close()});e(this.element[0].form).bind("reset.multiselect",function(){setTimeout(e.proxy(n.refresh,n),10)})},_setButtonWidth:function(){var e=this.element.outerWidth(),t=this.options;/\d/.test(t.minWidth)&&e<t.minWidth&&(e=t.minWidth);this.button.width(e)},_setMenuWidth:function(){var e=this.menu,t=this.button.outerWidth()-parseInt(e.css("padding-left"),10)-parseInt(e.css("padding-right"),10)-parseInt(e.css("border-right-width"),10)-parseInt(e.css("border-left-width"),10);e.width(t||this.button.outerWidth())},_traverse:function(t,n){var r=e(n),i=38===t||37===t,r=r.parent()[i?"prevAll":"nextAll"]("li:not(.ui-multiselect-disabled, .ui-multiselect-optgroup-label)")[i?"last":"first"]();r.length?r.find("label").trigger("mouseover"):(r=this.menu.find("ul").last(),this.menu.find("label")[i?"last":"first"]().trigger("mouseover"),r.scrollTop(i?r.height():0))},_toggleState:function(e,t){return function(){this.disabled||(this[e]=t);t?this.setAttribute("aria-selected",!0):this.removeAttribute("aria-selected")}},_toggleChecked:function(t,n){var r=n&&n.length?n:this.inputs,i=this;r.each(this._toggleState("checked",t));r.eq(0).focus();this.update();var s=r.map(function(){return this.value}).get();this.element.find("option").each(function(){!this.disabled&&-1<e.inArray(this.value,s)&&i._toggleState("selected",t).call(this)});r.length&&this.element.trigger("change")},_toggleDisabled:function(t){this.button.attr({disabled:t,"aria-disabled":t})[t?"addClass":"removeClass"]("ui-state-disabled");var n=this.menu.find("input"),n=t?n.filter(":enabled").data("ech-multiselect-disabled",!0):n.filter(function(){return!0===e.data(this,"ech-multiselect-disabled")}).removeData("ech-multiselect-disabled");n.attr({disabled:t,"arial-disabled":t}).parent()[t?"addClass":"removeClass"]("ui-state-disabled");this.element.attr({disabled:t,"aria-disabled":t})},open:function(){var t=this.button,n=this.menu,r=this.speed,i=this.options,s=[];if(!(!1===this._trigger("beforeopen")||t.hasClass("ui-state-disabled")||this._isOpen)){var o=n.find("ul").last(),u=i.show,a=t.offset();e.isArray(i.show)&&(u=i.show[0],r=i.show[1]||this.speed);u&&(s=[u,r]);o.scrollTop(0).height(i.height);e.ui.position&&!e.isEmptyObject(i.position)?(i.position.of=i.position.of||t,n.show().position(i.position).hide()):n.css({top:a.top+t.outerHeight(),left:a.left});e.fn.show.apply(n,s);this.labels.eq(0).trigger("mouseover").trigger("mouseenter").find("input").trigger("focus");t.addClass("ui-state-active");this._isOpen=!0;this._trigger("open")}},close:function(){if(!1!==this._trigger("beforeclose")){var t=this.options,n=t.hide,r=this.speed,i=[];e.isArray(t.hide)&&(n=t.hide[0],r=t.hide[1]||this.speed);n&&(i=[n,r]);e.fn.hide.apply(this.menu,i);this.button.removeClass("ui-state-active").trigger("blur").trigger("mouseleave");this._isOpen=!1;this._trigger("close")}},enable:function(){this._toggleDisabled(!1)},disable:function(){this._toggleDisabled(!0)},checkAll:function(){this._toggleChecked(!0);this._trigger("checkAll")},uncheckAll:function(){this._toggleChecked(!1);this._trigger("uncheckAll")},getChecked:function(){return this.menu.find("input").filter(":checked")},destroy:function(){e.Widget.prototype.destroy.call(this);this.button.remove();this.menu.remove();this.element.show();return this},isOpen:function(){return this._isOpen},widget:function(){return this.menu},getButton:function(){return this.button},_setOption:function(t,n){var r=this.menu;switch(t){case"header":r.find("div.ui-multiselect-header")[n?"show":"hide"]();break;case"checkAllText":r.find("a.ui-multiselect-all span").eq(-1).text(n);break;case"uncheckAllText":r.find("a.ui-multiselect-none span").eq(-1).text(n);break;case"height":r.find("ul").last().height(parseInt(n,10));break;case"minWidth":this.options[t]=parseInt(n,10);this._setButtonWidth();this._setMenuWidth();break;case"selectedText":case"selectedList":case"noneSelectedText":this.options[t]=n;this.update();break;case"classes":r.add(this.button).removeClass(this.options.classes).addClass(n);break;case"multiple":r.toggleClass("ui-multiselect-single",!n),this.options.multiple=n,this.element[0].multiple=n,this.refresh()}e.Widget.prototype._setOption.apply(this,arguments)}})})(jQuery);(function(e){var t={defaults:{slideSpeed:400,easing:false,callback:false},thisCallArgs:{slideSpeed:400,easing:false,callback:false},methods:{up:function(n,r,i){if(typeof n=="object"){for(p in n){t.thisCallArgs.eval(p)=n[p]}}else if(typeof n!="undefined"&&(typeof n=="number"||n=="slow"||n=="fast")){t.thisCallArgs.slideSpeed=n}else{t.thisCallArgs.slideSpeed=t.defaults.slideSpeed}if(typeof r=="string"){t.thisCallArgs.easing=r}else if(typeof r=="function"){t.thisCallArgs.callback=r}else if(typeof r=="undefined"){t.thisCallArgs.easing=t.defaults.easing}if(typeof i=="function"){t.thisCallArgs.callback=i}else if(typeof i=="undefined"&&typeof r!="function"){t.thisCallArgs.callback=t.defaults.callback}var s=e(this).find("td");s.wrapInner('<div class="slideRowUp" />');var o=s.css("padding");$cellContentWrappers=e(this).find(".slideRowUp");$cellContentWrappers.slideUp(t.thisCallArgs.slideSpeed,t.thisCallArgs.easing).parent().animate({paddingTop:"0px",paddingBottom:"0px"},{complete:function(){e(this).children(".slideRowUp").replaceWith(e(this).children(".slideRowUp").contents());e(this).parent().css({display:"none"});e(this).css({padding:o})}});var u=setInterval(function(){if($cellContentWrappers.is(":animated")===false){clearInterval(u);if(typeof t.thisCallArgs.callback=="function"){t.thisCallArgs.callback.call(this)}}},100);return e(this)},down:function(n,r,i){if(typeof n=="object"){for(p in n){t.thisCallArgs.eval(p)=n[p]}}else if(typeof n!="undefined"&&(typeof n=="number"||n=="slow"||n=="fast")){t.thisCallArgs.slideSpeed=n}else{t.thisCallArgs.slideSpeed=t.defaults.slideSpeed}if(typeof r=="string"){t.thisCallArgs.easing=r}else if(typeof r=="function"){t.thisCallArgs.callback=r}else if(typeof r=="undefined"){t.thisCallArgs.easing=t.defaults.easing}if(typeof i=="function"){t.thisCallArgs.callback=i}else if(typeof i=="undefined"&&typeof r!="function"){t.thisCallArgs.callback=t.defaults.callback}var s=e(this).find("td");s.wrapInner('<div class="slideRowDown" style="display:none;" />');$cellContentWrappers=s.find(".slideRowDown");e(this).show();$cellContentWrappers.slideDown(t.thisCallArgs.slideSpeed,t.thisCallArgs.easing,function(){e(this).replaceWith(e(this).contents())});var o=setInterval(function(){if($cellContentWrappers.is(":animated")===false){clearInterval(o);if(typeof t.thisCallArgs.callback=="function"){t.thisCallArgs.callback.call(this)}}},100);return e(this)}}};e.fn.slideRow=function(e,n,r,i){if(typeof e!="undefined"){if(t.methods[e]){return t.methods[e].apply(this,Array.prototype.slice.call(arguments,1))}}}})(jQuery);!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){function t(e){if(e.minTime&&(e.minTime=y(e.minTime)),e.maxTime&&(e.maxTime=y(e.maxTime)),e.durationTime&&"function"!=typeof e.durationTime&&(e.durationTime=y(e.durationTime)),e.disableTimeRanges.length>0){for(var t in e.disableTimeRanges)e.disableTimeRanges[t]=[y(e.disableTimeRanges[t][0]),y(e.disableTimeRanges[t][1])];e.disableTimeRanges=e.disableTimeRanges.sort(function(e,t){return e[0]-t[0]})}return e}function n(t){var n=t.data("timepicker-settings"),r=t.data("timepicker-list");r&&r.length&&(r.remove(),t.data("timepicker-list",!1)),r=e("<ul />",{"class":"ui-timepicker-list"});var i=e("<div />",{"class":"ui-timepicker-wrapper",tabindex:-1});i.css({display:"none",position:"absolute"}).append(r),n.className&&i.addClass(n.className),null===n.minTime&&null===n.durationTime||!n.showDuration||i.addClass("ui-timepicker-with-duration");var s=n.minTime;"function"==typeof n.durationTime?s=y(n.durationTime()):null!==n.durationTime&&(s=n.durationTime);var u=null!==n.minTime?n.minTime:0,f=null!==n.maxTime?n.maxTime:u+E-1;u>=f&&(f+=E);for(var l=n.disableTimeRanges,c=0,h=l.length,p=u;f>=p;p+=60*n.step){var d=p%E,b=e("<li />");if(b.data("time",d),b.text(g(d,n.timeFormat)),(null!==n.minTime||null!==n.durationTime)&&n.showDuration){var w=e("<span />");w.addClass("ui-timepicker-duration"),w.text(" ("+m(p-s)+")"),b.append(w)}h>c&&(d>=l[c][1]&&(c+=1),l[c]&&d>=l[c][0]&&d<l[c][1]&&b.addClass("ui-timepicker-disabled")),r.append(b)}i.data("timepicker-input",t),t.data("timepicker-list",i);var S=n.appendTo;"string"==typeof S?S=e(S):"function"==typeof S&&(S=S(t)),S.append(i),a(t,r),r.on("click","li",function(){t.off("focus.timepicker"),t.on("focus.timepicker-ie-hack",function(){t.off("focus.timepicker-ie-hack"),t.on("focus.timepicker",T.show)}),o(t)||t[0].focus(),r.find("li").removeClass("ui-timepicker-selected"),e(this).addClass("ui-timepicker-selected"),v(t)&&(t.trigger("hideTimepicker"),i.hide())})}function r(){return new Date(1970,1,1,0,0,0)}function i(t){"ontouchstart"in document?e("body").on("touchstart.ui-timepicker",s):(e("body").on("mousedown.ui-timepicker",s),t.closeOnWindowScroll&&e(window).on("scroll.ui-timepicker",s))}function s(t){var n=e(t.target),r=n.closest(".ui-timepicker-input");0===r.length&&0===n.closest(".ui-timepicker-wrapper").length&&(T.hide(),e("body").unbind(".ui-timepicker"),e(window).unbind(".ui-timepicker"))}function o(e){var t=e.data("timepicker-settings");return(window.navigator.msMaxTouchPoints||"ontouchstart"in document)&&t.disableTouchKeyboard}function u(t,n,r){if(!r&&0!==r)return!1;var i=t.data("timepicker-settings"),s=!1,o=30*i.step;return n.find("li").each(function(t,n){var i=e(n),u=i.data("time")-r;return Math.abs(u)<o||u==o?(s=i,!1):void 0}),s}function a(e,t){t.find("li").removeClass("ui-timepicker-selected");var n=y(l(e));if(null!==n){var r=u(e,t,n);if(r){var i=r.offset().top-t.offset().top;(i+r.outerHeight()>t.outerHeight()||0>i)&&t.scrollTop(t.scrollTop()+r.position().top-r.outerHeight()),r.addClass("ui-timepicker-selected")}}}function f(){if(""!==this.value){var t=e(this),n=t.data("timepicker-list");if(!n||!n.is(":visible")){var r=y(this.value);if(null===r)return t.trigger("timeFormatError"),void 0;var i=t.data("timepicker-settings"),s=!1;if(null!==i.minTime&&r<i.minTime?s=!0:null!==i.maxTime&&r>i.maxTime&&(s=!0),e.each(i.disableTimeRanges,function(){return r>=this[0]&&r<this[1]?(s=!0,!1):void 0}),i.forceRoundTime){var o=r%(60*i.step);o>=30*i.step?r+=60*i.step-o:r-=o}var u=g(r,i.timeFormat);s?c(t,u,"error")&&t.trigger("timeRangeError"):c(t,u)}}}function l(e){return e.is("input")?e.val():e.data("ui-timepicker-value")}function c(e,t,n){return e.is("input")&&e.val(t),e.data("ui-timepicker-value")!=t?(e.data("ui-timepicker-value",t),"select"==n?e.trigger("selectTime").trigger("changeTime").trigger("change"):"error"!=n&&e.trigger("changeTime"),!0):(e.trigger("selectTime"),!1)}function h(t){var n=e(this),r=n.data("timepicker-list");if(!r||!r.is(":visible")){if(40!=t.keyCode)return p(t,n);o(n)||n.focus()}switch(t.keyCode){case 13:return v(n)&&T.hide.apply(this),t.preventDefault(),!1;case 38:var i=r.find(".ui-timepicker-selected");return i.length?i.is(":first-child")||(i.removeClass("ui-timepicker-selected"),i.prev().addClass("ui-timepicker-selected"),i.prev().position().top<i.outerHeight()&&r.scrollTop(r.scrollTop()-i.outerHeight())):(r.find("li").each(function(t,n){return e(n).position().top>0?(i=e(n),!1):void 0}),i.addClass("ui-timepicker-selected")),!1;case 40:return i=r.find(".ui-timepicker-selected"),0===i.length?(r.find("li").each(function(t,n){return e(n).position().top>0?(i=e(n),!1):void 0}),i.addClass("ui-timepicker-selected")):i.is(":last-child")||(i.removeClass("ui-timepicker-selected"),i.next().addClass("ui-timepicker-selected"),i.next().position().top+2*i.outerHeight()>r.outerHeight()&&r.scrollTop(r.scrollTop()+i.outerHeight())),!1;case 27:r.find("li").removeClass("ui-timepicker-selected"),T.hide();break;case 9:T.hide();break;default:return p(t,n)}}function p(e,t){return!t.data("timepicker-settings").disableTextInput||e.ctrlKey||e.altKey||e.metaKey||2!=e.keyCode&&8!=e.keyCode&&e.keyCode<46}function d(t){var n=e(this),r=n.data("timepicker-list");if(!r||!r.is(":visible"))return!0;switch(t.keyCode){case 96:case 97:case 98:case 99:case 100:case 101:case 102:case 103:case 104:case 105:case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 65:case 77:case 80:case 186:case 8:case 46:a(n,r);break;default:return}}function v(e){var t=e.data("timepicker-settings"),n=e.data("timepicker-list"),r=null,i=n.find(".ui-timepicker-selected");if(i.hasClass("ui-timepicker-disabled"))return!1;if(i.length?r=i.data("time"):l(e)&&(r=y(l(e)),a(e,n)),null!==r){var s=g(r,t.timeFormat);c(e,s,"select")}return!0}function m(e){var t,n=Math.round(e/60);if(Math.abs(n)<60)t=[n,x.mins];else if(60==n)t=["1",x.hr];else{var r=(n/60).toFixed(1);"."!=x.decimal&&(r=r.replace(".",x.decimal)),t=[r,x.hrs]}return t.join(" ")}function g(e,t){if(null!==e){for(var n,r,i=new Date(w.valueOf()+1e3*e),s="",o=0;o<t.length;o++)switch(r=t.charAt(o)){case"a":s+=i.getHours()>11?"pm":"am";break;case"A":s+=i.getHours()>11?"PM":"AM";break;case"g":n=i.getHours()%12,s+=0===n?"12":n;break;case"G":s+=i.getHours();break;case"h":n=i.getHours()%12,0!==n&&10>n&&(n="0"+n),s+=0===n?"12":n;break;case"H":n=i.getHours(),s+=n>9?n:"0"+n;break;case"i":var u=i.getMinutes();s+=u>9?u:"0"+u;break;case"s":e=i.getSeconds(),s+=e>9?e:"0"+e;break;default:s+=r}return s}}function y(e){if(""===e)return null;if(!e||e+0==e)return e;"object"==typeof e&&(e=e.getHours()+":"+b(e.getMinutes())+":"+b(e.getSeconds())),e=e.toLowerCase(),new Date(0);var t;if(-1===e.indexOf(":")?(t=e.match(/^([0-9]):?([0-5][0-9])?:?([0-5][0-9])?\s*([pa]?)m?$/),t||(t=e.match(/^([0-2][0-9]):?([0-5][0-9])?:?([0-5][0-9])?\s*([pa]?)m?$/))):t=e.match(/^(\d{1,2})(?::([0-5][0-9]))?(?::([0-5][0-9]))?\s*([pa]?)m?$/),!t)return null;var n,r=parseInt(1*t[1],10);n=t[4]?12==r?"p"==t[4]?12:0:r+("p"==t[4]?12:0):r;var i=1*t[2]||0,s=1*t[3]||0;return 3600*n+60*i+s}function b(e){return("0"+e).slice(-2)}var w=r(),E=86400,S={className:null,minTime:null,maxTime:null,durationTime:null,step:30,showDuration:!1,timeFormat:"g:ia",scrollDefaultNow:!1,scrollDefaultTime:!1,selectOnBlur:!1,disableTouchKeyboard:!0,forceRoundTime:!1,appendTo:"body",disableTimeRanges:[],closeOnWindowScroll:!1,disableTextInput:!1},x={decimal:".",mins:"mins",hr:"hr",hrs:"hrs"},T={init:function(n){return this.each(function(){var r=e(this);if("SELECT"==r[0].tagName){for(var i={type:"text",value:r.val()},s=r[0].attributes,o=0;o<s.length;o++)i[s[o].nodeName]=s[o].nodeValue;var u=e("<input />",i);r.replaceWith(u),r=u}var a=e.extend({},S);n&&(a=e.extend(a,n)),a.lang&&(x=e.extend(x,a.lang)),a=t(a),r.data("timepicker-settings",a),r.prop("autocomplete","off"),r.on("click.timepicker focus.timepicker",T.show),r.on("change.timepicker",f),r.on("keydown.timepicker",h),r.on("keyup.timepicker",d),r.addClass("ui-timepicker-input"),f.call(r.get(0))})},show:function(){var t=e(this),r=t.data("timepicker-settings");o(t)&&t.blur();var s=t.data("timepicker-list");if(!t.prop("readonly")&&(s&&0!==s.length&&"function"!=typeof r.durationTime||(n(t),s=t.data("timepicker-list")),!s.is(":visible"))){T.hide(),s.show(),t.offset().top+t.outerHeight(!0)+s.outerHeight()>e(window).height()+e(window).scrollTop()?s.offset({left:t.offset().left+parseInt(s.css("marginLeft").replace("px",""),10),top:t.offset().top-s.outerHeight()+parseInt(s.css("marginTop").replace("px",""),10)}):s.offset({left:t.offset().left+parseInt(s.css("marginLeft").replace("px",""),10),top:t.offset().top+t.outerHeight()+parseInt(s.css("marginTop").replace("px",""),10)});var a=s.find(".ui-timepicker-selected");if(a.length||(l(t)?a=u(t,s,y(l(t))):r.scrollDefaultNow?a=u(t,s,y(new Date)):r.scrollDefaultTime!==!1&&(a=u(t,s,y(r.scrollDefaultTime)))),a&&a.length){var f=s.scrollTop()+a.position().top-a.outerHeight();s.scrollTop(f)}else s.scrollTop(0);i(r),t.trigger("showTimepicker")}},hide:function(){e(".ui-timepicker-wrapper:visible").each(function(){var t=e(this),n=t.data("timepicker-input"),r=n.data("timepicker-settings");r&&r.selectOnBlur&&v(n),t.hide(),n.trigger("hideTimepicker")})},option:function(n,r){var i=this,s=i.data("timepicker-settings"),o=i.data("timepicker-list");if("object"==typeof n)s=e.extend(s,n);else if("string"==typeof n&&"undefined"!=typeof r)s[n]=r;else if("string"==typeof n)return s[n];return s=t(s),i.data("timepicker-settings",s),o&&(o.remove(),i.data("timepicker-list",!1)),i},getSecondsFromMidnight:function(){return y(l(this))},getTime:function(e){var t=this;return e||(e=new Date),e.setHours(0,0,0,0),new Date(e.valueOf()+1e3*y(l(t)))},setTime:function(e){var t=this,n=g(y(e),t.data("timepicker-settings").timeFormat);c(t,n),t.data("timepicker-list")&&a(t,t.data("timepicker-list"))},remove:function(){var e=this;e.hasClass("ui-timepicker-input")&&(e.removeAttr("autocomplete","off"),e.removeClass("ui-timepicker-input"),e.removeData("timepicker-settings"),e.off(".timepicker"),e.data("timepicker-list")&&e.data("timepicker-list").remove(),e.removeData("timepicker-list"))}};e.fn.timepicker=function(t){return T[t]?T[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?(e.error("Method "+t+" does not exist on jQuery.timepicker"),void 0):T.init.apply(this,arguments)}});(function(e){if(typeof define==="function"&&define.amd)define(["jquery"],e);else e(jQuery)})(function(e){e.fn.tweet=function(t){function i(e,t){if(typeof e==="string"){var n=e;for(var r in t){var i=t[r];n=n.replace(new RegExp("{"+r+"}","g"),i===null?"":i)}return n}else return e(t)}function s(t,n){return function(){var r=[];this.each(function(){r.push(this.replace(t,n))});return e(r)}}function o(e){return e.replace(/</g,"&lt;").replace(/>/g,"^&gt;")}function u(e,t){return e.replace(r,function(e){var n=/^[a-z]+:/i.test(e)?e:"http://"+e;var r=e;for(var i=0;i<t.length;++i){var s=t[i];if(s.url==n&&s.expanded_url){n=s.expanded_url;r=s.display_url;break}}return'<a href="'+o(n)+"\"  target='_blank'>"+o(r)+"</a>"})}function a(e){return Date.parse(e.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i,"$1,$2$4$3"))}function f(e){var t=arguments.length>1?arguments[1]:new Date;var n=parseInt((t.getTime()-e)/1e3,10);var r="";if(n<1){r="just now"}else if(n<60){r=n+" seconds ago"}else if(n<120){r="about a minute ago"}else if(n<45*60){r="about "+parseInt(n/60,10).toString()+" minutes ago"}else if(n<2*60*60){r="about an hour ago"}else if(n<24*60*60){r="about "+parseInt(n/3600,10).toString()+" hours ago"}else if(n<48*60*60){r="about a day ago"}else{r="about "+parseInt(n/86400,10).toString()+" days ago"}return r}function l(e){if(e.match(/^(@([A-Za-z0-9-_]+)) .*/i)){return n.auto_join_text_reply}else if(e.match(r)){return n.auto_join_text_url}else if(e.match(/^((\w+ed)|just) .*/im)){return n.auto_join_text_ed}else if(e.match(/^(\w*ing) .*/i)){return n.auto_join_text_ing}else{return n.auto_join_text_default}}function c(){var t=n.modpath,r=n.fetch===null?n.count:n.fetch,i={include_entities:1};if(n.list){return{host:n.twitter_api_url,url:"/1.1/lists/statuses.json",parameters:e.extend({},i,{list_id:n.list_id,slug:n.list,owner_screen_name:n.username,page:n.page,count:r,include_rts:n.retweets?1:0})}}else if(n.favorites){return{host:n.twitter_api_url,url:"/1.1/favorites/list.json",parameters:e.extend({},i,{list_id:n.list_id,screen_name:n.username,page:n.page,count:r})}}else if(n.query===null&&n.username.length===1){return{host:n.twitter_api_url,url:"/1.1/statuses/user_timeline.json",parameters:e.extend({},i,{screen_name:n.username,page:n.page,count:r,include_rts:n.retweets?1:0})}}else{var s=n.query||"from:"+n.username.join(" OR from:");return{host:n.twitter_search_url,url:"/1.1/search/tweets.json",parameters:e.extend({},i,{q:s,count:r})}}}function h(e,t){if(t){return"user"in e?e.user.profile_image_url_https:h(e,false).replace(/^http:\/\/[a-z0-9]{1,3}\.twimg\.com\//,"https://s3.amazonaws.com/twitter_production/")}else{return e.profile_image_url||e.user.profile_image_url}}function p(t){var r={};r.item=t;r.source=t.source;r.name=t.from_user_name||t.user.name;r.screen_name=t.from_user||t.user.screen_name;r.avatar_size=n.avatar_size;r.avatar_url=h(t,document.location.protocol==="https:");r.retweet=typeof t.retweeted_status!="undefined";r.tweet_time=a(t.created_at);r.join_text=n.join_text=="auto"?l(t.text):n.join_text;r.tweet_id=t.id_str;r.twitter_base="http://"+n.twitter_url+"/";r.user_url=r.twitter_base+r.screen_name;r.tweet_url=r.user_url+"/status/"+r.tweet_id;r.reply_url=r.twitter_base+"intent/tweet?in_reply_to="+r.tweet_id;r.retweet_url=r.twitter_base+"intent/retweet?tweet_id="+r.tweet_id;r.favorite_url=r.twitter_base+"intent/favorite?tweet_id="+r.tweet_id;r.retweeted_screen_name=r.retweet&&t.retweeted_status.user.screen_name;r.tweet_relative_time=f(r.tweet_time);r.entities=t.entities?(t.entities.urls||[]).concat(t.entities.media||[]):[];r.tweet_raw_text=r.retweet?"RT @"+r.retweeted_screen_name+" "+t.retweeted_status.text:t.text;r.tweet_text=e([u(r.tweet_raw_text,r.entities)]).linkUser().linkHash()[0];r.tweet_text_fancy=e([r.tweet_text]).makeHeart()[0];r.user=i('<a class="tweet_user" href="{user_url}" target="_blank">{screen_name}</a>',r);r.join=n.join_text?i(' <span class="tweet_join">{join_text}</span> ',r):" ";r.avatar=r.avatar_size?i('<a class="tweet_avatar" href="{user_url}" target="_blank"><img src="{avatar_url}" height="{avatar_size}" width="{avatar_size}" alt="{screen_name}\'s avatar" title="{screen_name}\'s avatar" border="0"/></a>',r):"";r.time="";r.text=i('<span class="tweet_text">{tweet_text_fancy}</span>',r);r.reply_action=i('<a class="tweet_action tweet_reply" href="{reply_url}" target="_blank">reply</a>',r);r.retweet_action=i('<a class="tweet_action tweet_retweet" href="{retweet_url}" target="_blank">retweet</a>',r);r.favorite_action=i('<a class="tweet_action tweet_favorite" href="{favorite_url}" target="_blank">favorite</a>',r);return r}var n=e.extend({modpath:"/twitter/",username:null,list_id:null,list:null,favorites:false,query:null,avatar_size:null,count:3,fetch:null,page:1,retweets:true,intro_text:null,outro_text:null,join_text:null,auto_join_text_default:"i said,",auto_join_text_ed:"i",auto_join_text_ing:"i am",auto_join_text_reply:"i replied to",auto_join_text_url:"i was looking at",loading_text:null,refresh_interval:null,twitter_url:"twitter.com",twitter_api_url:"api.twitter.com",twitter_search_url:"api.twitter.com",template:"{avatar}{time}{join}{text}",comparator:function(e,t){return t["tweet_time"]-e["tweet_time"]},filter:function(e){return true}},t);var r=/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?������]))/gi;e.extend({tweet:{t:i}});e.fn.extend({linkUser:s(/(^|[\W])@(\w+)/gi,'$1<span class="at">@</span><a href="http://'+n.twitter_url+"/$2\" target='_blank'>$2</a>"),linkHash:s(/(?:^| )[\#]+([\w\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0600-\u06ff]+)/gi,' <a href="https://twitter.com/search?q=%23$1'+(n.username&&n.username.length==1&&!n.list?"&from="+n.username.join("%2BOR%2B"):"")+'" class="tweet_hashtag" target="_blank">#$1</a>'),makeHeart:s(/(&lt;)+[3]/gi,"<tt class='heart'>&#x2665;</tt>")});return this.each(function(t,r){var s=e('<ul class="tweet_list">');var o='<p class="tweet_intro">'+n.intro_text+"</p>";var u='<p class="tweet_outro">'+n.outro_text+"</p>";var a=e('<p class="loading">'+n.loading_text+"</p>");if(n.username&&typeof n.username=="string"){n.username=[n.username]}e(r).unbind("tweet:load").bind("tweet:load",function(){if(n.loading_text)e(r).empty().append(a);e.ajax({dataType:"json",type:"post",async:false,url:n.modpath||"/twitter/",data:{request:c()},success:function(t,a){if(t.message){console.log(t.message)}var f=t.response;e(r).empty().append(s);if(n.intro_text)s.before(o);s.empty();if(f.statuses!==undefined){resp=f.statuses}else if(f.results!==undefined){resp=f.results}else{resp=f}var l=e.map(resp,p);l=e.grep(l,n.filter).sort(n.comparator).slice(0,n.count);s.append(e.map(l,function(e){return"<li>"+i(n.template,e)+"</li>"}).join("")).children("li:first").addClass("tweet_first").end().children("li:odd").addClass("tweet_even").end().children("li:even").addClass("tweet_odd");if(n.outro_text)s.after(u);e(r).trigger("loaded").trigger(l?"empty":"full");if(n.refresh_interval){window.setTimeout(function(){e(r).trigger("tweet:load")},1e3*n.refresh_interval)}}})}).trigger("tweet:load")})}});googleUserArray=new Array

/* BESPOKE JS BELOW GENERAL.JS */

//global variables
map = null; // make google maps var global
mapDefaultCenterLat = 54.370559; // make google maps var global = set center as center of UK
mapDefaultCenterLong = -2.510376; // make google maps var global = set center as center of UK
nowTemp = new Date();
now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
submitTime = 0;

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

/**
 * jQuery alterClass plugin
 *
 * Remove element classes with wildcard matching. Optionally add classes:
 *   $( '#foo' ).alterClass( 'foo-* bar-*', 'foobar' )
 *
 * Copyright (c) 2011 Pete Boere (the-echoplex.net)
 * Free under terms of the MIT license: http://www.opensource.org/licenses/mit-license.php
 *
 */
(function ( $ ) {
	
$.fn.alterClass = function ( removals, additions ) {
	
	var self = this;
	
	if ( removals.indexOf( '*' ) === -1 ) {
		// Use native jQuery methods if there is no wildcard matching
		self.removeClass( removals );
		return !additions ? self : self.addClass( additions );
	}
 
	var patt = new RegExp( '\\s' + 
			removals.
				replace( /\*/g, '[A-Za-z0-9-_]+' ).
				split( ' ' ).
				join( '\\s|\\s' ) + 
			'\\s', 'g' );
 
	self.each( function ( i, it ) {
		var cn = ' ' + it.className + ' ';
		while ( patt.test( cn ) ) {
			cn = cn.replace( patt, ' ' );
		}
		it.className = $.trim( cn );
	});
 
	return !additions ? self : self.addClass( additions );
};
 
})( jQuery );

//on page load fire these things!
$(document).ready(function() { 
	//This really should be part of jQuery
	$.fn.exists = function(){return this.length>0;}
	
	//left-right slies
	$.fn.slideLeftHide = function(speed, callback) { 
		this.animate({ 
			width: "hide", 
			paddingLeft: "hide", 
			paddingRight: "hide", 
			marginLeft: "hide", 
			marginRight: "hide" 
		}, speed, callback);
	}

	$.fn.slideLeftShow = function(speed, callback) { 
		this.animate({ 
			width: "show", 
			paddingLeft: "show", 
			paddingRight: "show", 
			marginLeft: "show", 
			marginRight: "show" 
		}, speed, callback);
	}

	//STOP ENTER from FORM SUBMISSION for add event typeahead/////////////
	$(".noEnterSubmit").keypress(function(e){
		if ( e.which == 13 ) return false;
		//or...
		if ( e.which == 13 ) e.preventDefault();  //just need to give class="noEnterSubmit"
	}); 
	//////////////////////////////////////////////////////////////////////

	$("#signupForm").on('valid', function (event) {
		var url = "/doSignUp";

		$.ajax({
			   type: "POST",
			   url: url,
			   data: $(this).serialize(), // serializes the form's elements.
			   success: function(data)
			   {
					try
					{
						var dataArray = jQuery.parseJSON(data); //parsing JSON
					
					}
					catch(e)
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
						});
						//alert(data);
						
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: dataArray['message'] //text: "Sorry, but there's been an error processing your request."
						});
					}
					else
					{	
						$.post("/saveSignUp", 
						'bName='+dataArray['name']+'&bID='+dataArray['id']+'&email='+dataArray['owner']['email']+'&fName='+dataArray['owner']['firstName']+'&lName='+dataArray['owner']['lastName']+'&id='+dataArray['owner']['id'],
						function(response){
							window.location.replace("/dashboard");
						})
						.fail(function(jqxhr) { 
							noty({
								type: 'error',  layout: 'topCenter',
								text: 'Error: '+jqxhr.responseText	
							});
						});
					}
				}
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	///////////////////////////////////////////////////////////////////////////////////////////////
	$("#signinForm").on('valid', function (event) {
		var url = "/doSignIn";

		$.ajax({
			   type: "POST",
			   url: url,
			   data: $(this).serialize(), // serializes the form's elements.
			   success: function(data)
			   {
					try
					{
						var dataArray = jQuery.parseJSON(data); //parsing JSON
					}
					catch(e)
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
						});
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Incorrect credentials or account does not exist." //dataArray['message'] //text: "Sorry, but there's been an error processing your request."
						});
				   
					}
					else
					{	
						$.post("/saveSignIn", 
						'email='+dataArray['email']+'&fName='+dataArray['firstName']+'&lName='+dataArray['lastName']+'&id='+dataArray['id'], 
						function(response){
							window.location.replace("/dashboard");
						})
						.fail(function(jqxhr) { 
							noty({
								type: 'error',  layout: 'topCenter',
								text: 'Error: '+jqxhr.responseText	
							});
						});
					}
				}
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
	$("#forgotPassForm").on('valid', function (event) {
		var url = "/doForgot";

		$.ajax({
			   type: "POST",
			   url: url,
			   data: $(this).serialize(), // serializes the form's elements.
			   success: function(data)
			   {
					try
					{
						var dataArray = jQuery.parseJSON(data); //parsing JSON
					}
					catch(e)
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
						});
						
						//alert(data);
						
						return false;
					}
					
					if(dataArray && typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: dataArray['message']*/
						});
				   
					}
					else
					{	
						noty({
						  type: 'success',
						  text: 'Success! Please check your email for further instructions.'
						});
						
						$("#forgotPassM").foundation('reveal', 'close');
					}
				}
			 });

		return false; // avoid to execute the actual submit of the form.
	});

	///////////////////////////////////////////////////////////////////////////////////////////////////
	$("#resetPassForm").on('valid', function (event) {
		var url = "/doReset";

		$.ajax({
			   type: "POST",
			   url: url,
			   data: $(this).serialize(), // serializes the form's elements.
			   success: function(data)
			   {
					try
					{
						var dataArray = jQuery.parseJSON(data); //parsing JSON
					}
					catch(e)
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." //text: 'Connection Error! Check API endpoint.'
						});
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, incorrect code." //text: dataArray['message']
						});
					}
					else
					{	
						noty({ type: 'success', text: 'Your password has been reset.<br/>You will now be redirected to the login page.' });
						setTimeout(function(){window.location.replace("/login");}, 2500);
					}
				}
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	///////////////////////////////////////////////////////////////////////////////////////////////////

	//change language ajaxy button
	$("a.changeLang").on('click', function () {
		var newLang = $(this).attr('data-new-lang');
		$.post("code/shared/changeLang.php", 'lang='+newLang, function() {window.location.reload();}); 
	});
	
	if($("#map").length > 0)
	{
		//options for the map
		var myOptions = {
			zoom: 5, //zoom level higher is further in
			center: new google.maps.LatLng(mapDefaultCenterLat,mapDefaultCenterLong), //set center as center of UK
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			minZoom: 3, //prevent zoom out that allows grey tiles
			streetViewControl: false, 
			scrollwheel: false, 
			panControl: true, 
			keyboardShortcuts: false,
			mapTypeControl: false
		}
		
		map = new google.maps.Map(document.getElementById("map"), myOptions);
		
		//create cool pins
		pinColor = "2288C1";
		pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
		new google.maps.Size(21, 34),
		new google.maps.Point(0,0),
		new google.maps.Point(10, 34));
		
		//Google Places autocomplete
		var input = document.getElementById("vSug");
		var options = {'types':[ 'establishment']}; //restricted only to business. We dont need country/street/area names now
		var autocomplete = new google.maps.places.Autocomplete(input, options);
		autocomplete.bindTo('bounds', map); //set the guesses to be bound around the map so closer to the location (i.e. UK)
		
		google.maps.event.addListener(autocomplete, 'place_changed', function() {
			place = autocomplete.getPlace();
			
			document.getElementById("vCode").value = place.geometry.location.toString();  
			
			if (place.geometry.viewport) {
				map.fitBounds(place.geometry.viewport);
			} 
			else {
				map.setCenter(place.geometry.location);
				map.setZoom(15);  
			}
			
			var address = '';
			var street_number = '';
			var route = '';
			var locality = '';
			var postal_town = '';
			var postal_code = '';
			var country = '';
			
			if (place.address_components) {
			
			//console.log(place.address_components);
			
			arrLength = place.address_components.length;

			for(var i = 0;i<arrLength;i++)
			{
				//console.log(place.address_components[i].types);
				
				if(place.address_components[i].types == "street_number")
					street_number = place.address_components[i].long_name;
					
				if(place.address_components[i].types == "route")
					route = place.address_components[i].long_name;
					
				if(place.address_components[i].types == "postal_town")
					postal_town = place.address_components[i].long_name;
					
				if(place.address_components[i].types == "postal_code")
					postal_code = place.address_components[i].long_name;
					
				if(place.address_components[i].types[0] == "locality") //comes as array
					locality = place.address_components[i].long_name;
					
				if(place.address_components[i].types[0] == "country")  //comes as an array
					country = place.address_components[i].short_name;
			}
			
			//console.log(street_number+", "+route+", "+locality+", "+postal_town+", "+postal_code+", "+country);
			
			/*address = [(place.address_components[0] &&
						place.address_components[0].short_name || ''),
					   (place.address_components[1] &&
						place.address_components[1].short_name || ''),
					   (place.address_components[2] &&
						place.address_components[2].short_name || ''),
						(place.address_components[4] &&
						place.address_components[4].short_name || '')
					  ].join(', '); */
		}	
			address = '';		  
			
			if(street_number!='')
				address = address + street_number+", ";
			
			if(route!='')
				address = address + route+", ";
			
			if(locality!='')
				address = address + locality;
			
			if(postal_town!='' && postal_town!=locality)
				address = address + ", " + postal_town;
						
			//now to fix whats in venue address
			document.getElementById("vAdd").value = address;
			
			//now to fix whats in venue address
			document.getElementById("vPostal").value = postal_code;
			
			//now to fix whats in venue address
			$('#vCountry').val(country);
			var countryLabel = $('#vCountry option:selected').text();
			$("#vCountry").next('.custom.dropdown').find('li.selected').removeClass('selected');
			$("#vCountry").next('.custom.dropdown').find('li[value="'+countryLabel+'"]').addClass('selected');
			$("#vCountry").next('.custom.dropdown').find('a.current').html(countryLabel);
			
			//now to fix whats in venue name
			document.getElementById("vName").value = place.name;

			marker = new google.maps.Marker({ 
				map: map, 
				animation: google.maps.Animation.DROP,
				icon: pinImage, 
				title: place.name+', '+address
			});
			  
			marker.setPosition(place.geometry.location);
		});
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	$('.eventFlagNoti').on('click', function(){
	
		if( $(this).find("input[type=radio][name=vEvent]:checked").val() == '0')
		{
			$('.leadTimeDiv').slideDown();
			$('.leadTimeDiv').find('input').attr('required','required');
		}
		else
		{
			$('.leadTimeDiv').slideUp();
			$('.leadTimeDiv').find('input').removeAttr('required');
		}
	});
	
	$("#venueConfigForm").on('valid', function (event) {
		var url = "/saveVenue";
		
		$('#venueSave').hide();
		$('#savingButton').show();
		
		$.ajax({
			   type: "POST",
			   url: url,
			   data: $(this).serialize(), // serializes the form's elements.
			   success: function(data)
			   {
					try
					{
						var dataArray = jQuery.parseJSON(data); //parsing JSON
					}
					catch(e)
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
						});
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: dataArray['message']*/
						});
					}
					else
					{	
						noty({ type: 'success', text: 'Venue changes have been saved!' });
						if($('#redirectFlag').val()=='1') { setTimeout(function(){window.location.replace("/homescreen");}, 1000); }
					}
				}
			 }).done(function(){
				if($('#redirectFlag').val()!='1') $('#venueSave').show();
				$('#savingButton').hide();
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	//ajax form upload
	var options = { 
		url: '/uploadLogo',
		success: function(responseText) { 
			noty({
			  type: 'success',
			  text: 'Uploaded!'
			});
			
			//alert(responseText);
			
			responseText=responseText.replace('_thumb.png','');
			
			content="<img src='"+globalLPath+responseText+"_thumb.png'/>";
			$("#appHeading").html(content);
			$("#aHeading").val(' ');
			$("#picFileName").val(responseText);
			
			//clear for new file
			$("#picFile").val('');
			
			//show button again
			$('#lo-loading').hide();
			$('#doLogoUp').show();
		},
		error: function() { 
			noty({
			  type: 'error',  layout: 'topCenter',
			  text: 'Error uploading file'
			});
			
			//clear for new file
			$("#picFile").val('');
			
			//show button again
			$('#lo-loading').hide();
			$('#doLogoUp').show();
		},
		beforeSubmit: function(arr, $form, options) { 
			var acceptedExts = new Array(".png");
			var filename = $("#picFile").val();
			filename = filename.toLowerCase();
			if(searchArray(filename,acceptedExts))
			{
				//hide button again
				$('#doLogoUp').hide();
				$('#lo-loading').show();
				
				return true;
			}
			else
			{
				noty({
				  type: 'error',  layout: 'topCenter',
				  text: 'Incorrect Image File'
				});
				
				//manual reset
				var content = $("#aHeading").val()
				$("#appHeading").html(content);
				$("#picFileName").val('');
				$("#picFile").val('');
				
				return false;
			}
		}
	};
	$("#logoUpForm").ajaxForm(options);
	
	//ajax form upload
	var optionsBG = { 
		url: '/uploadBG',
		success: function(responseText) { 
			noty({
			  type: 'success',
			  text: 'Uploaded!'
			});
			
			//alert(responseText);
			
			$("[id^=thumb]").removeClass('selected');
			var newImgSrc = globalWPath + "wall_wa_" + responseText + ".jpg";
			$("#phoneWallpaper").attr("src", newImgSrc);
			$("#wallPaperID").val(responseText);
			
			$('.customBGArea .customIMG').remove();
			$('<a class="thumb selected customIMG" id="thumb'+responseText+'">	<img src="'+globalWPath+'thumb'+responseText+'.jpg"> </a>').appendTo('.customBGArea');
			
			//clear for new file
			$("#bgFile").val('');
			
			//show button again
			$('#bg-loading').hide();
			$('#doBGUp').show();
			
			//click to get tick icon
			$('#thumb1').addClass('hideAfter');
			$('#thumb1').trigger('click');
			setTimeout(function() { 
				$('#thumb'+responseText).trigger('click'); 
				$('#thumb1').removeClass('hideAfter');
			}, 333);
			
			
		},
		error: function() { 
			noty({
			  type: 'error',  layout: 'topCenter',
			  text: 'Error uploading file'
			});
			
			//clear for new file
			$("#bgFile").val('');
			
			//show button again
			$('#bg-loading').hide();
			$('#doBGUp').show();
		},
		beforeSubmit: function(arr, $form, options) { 
			var acceptedExts = new Array(".jpg",".jpeg");
			var filename = $("#bgFile").val();
			filename = filename.toLowerCase();
			if(searchArray(filename,acceptedExts))
			{	
				//hide button
				$('#doBGUp').hide();
				$('#bg-loading').show();
			
				return true;
			}
			else
			{
				noty({
				  type: 'error',  layout: 'topCenter',
				  text: 'Incorrect Image File'
				});
				
				//manual reset
				$("#bgFile").val('');
				
				return false;
			}
		}
	};
	$("#bgUpForm").ajaxForm(optionsBG);
	
	$(document).on("click", "[id^=thumb]", function() {
		$("[id^=thumb]").removeClass('selected');
		$(this).addClass('selected');
		var tID = $(this).attr('id');
		var wall = tID.replace("thumb","wall");
		var plainID = tID.replace("thumb","");
		
		if(plainID.match(/^\d+$/gi))
			var newImgSrc = "./img/wallpapers/" + wall + ".jpg";
		else
			var newImgSrc = globalWPath + wall + ".jpg";
		
		$("#phoneWallpaper").attr("src", newImgSrc);
		$("#wallPaperID").val(plainID);
	});
	
	$("#sugDrop li a").on('click', function() {
		var content = $(this).html();
		$("#aHeading").val(content);
		$("#appHeading").html(content);
		$("#picFileName").val('');
	});
	
	$("#aHeading").bind('propertychange keyup input paste',function() {
		var content = $(this).val();
		$("#appHeading").html(content);
		$("#picFileName").val('');
	});
	
	$("#sugDrop2 li a").on('click', function() {
		var content = $(this).html();
		$("#aSubheading").val(content);
		$("#subHeading").html(content);
	});
	
	$("#aSubheading").bind('propertychange keyup input paste',function() {
		var content = $(this).val();
		$("#subHeading").html(content);
	});
	
	/* $("#textColour").minicolors({
		change: function(hex, opacity) {
			//alert(hex);
		}
	}); */
	
	$(".visibleUpload, #logoReset").on('click', function() {
		$(".visibleUpload").slideToggle();
		$(".hiddenUpload").slideToggle();
	});
	
	$(".visibleUploadBG, #bgReset").on('click', function() {
		$(".visibleUploadBG").slideToggle();
		$(".hiddenUploadBG").slideToggle();
	});
	
	$("#doBGUp").on('click', function() {
		if($("#bgFile").val()) 
		{
			$("#bgUpForm").submit();
			$("#bgFile").val('');
		}
		else
			$("#bgFile").click();
	});
	
	$("#doLogoUp").on('click', function() {
		if($("#picFile").val())
		{ 
			$("#logoUpForm").submit();
			$("#picFile").val('');
		}
		else
			$("#picFile").click();
	});
	
	$("#picFile").on('change', function(){
		$("#doLogoUp").click();
	});
	
	$("#bgFile").on('change', function(){
		$("#doBGUp").click();
	});
	
	$("#logoReset").on('click', function() {
		var content = $("#aHeading").val()
		$("#appHeading").html(content);
		$("#picFileName").val('');
		$("#picFile").val('');
	});
	
	$("#bgReset").on('click', function() {
		$("#bgFile").val('');
	});
	
	$("#appConfig1Sub").on('click', function() { $("#appConfigForm").submit(); });
	
	$("#appConfigForm").on('valid', function (event) {
		var url = "/saveHomescreen";
		
		$('#appConfig1Sub').hide();
		$('#savingButton').show();

		$.ajax({
			   type: "POST",
			   url: url,
			   data: $(this).serialize(), // serializes the form's elements.
			   success: function(data)
			   {
					try
					{
						var dataArray = jQuery.parseJSON(data); //parsing JSON
					}
					catch(e)
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
						});
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: "Sorry, but there's been an error processing your request." /*text: dataArray['message']*/
						});
						//alert(data);
					}
					else
					{	
						noty({ type: 'success', text: 'App changes have been saved!' });
						if($('#redirectFlag').val()=='1') setTimeout(function(){window.location.replace("/menuscreen");}, 1000);
					}
				}
			 }).done(function(){
				if($('#redirectFlag').val()!='1') $('#appConfig1Sub').show();
				$('#savingButton').hide();
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	$("#vTitle").bind('propertychange keyup input paste',function() {
		var content = $(this).val();
		$("#venTitle").html(content);
	});
	
	$("#appConfig2Form").on('valid', function (event) {
		var url = "/saveMenuscreen";
		
		$('#appConfig2Sub').hide();
		$('#savingButton').show();

		$.ajax({
			   type: "POST",
			   url: url,
			   data: $(this).serialize(), // serializes the form's elements.
			   success: function(data)
			   {
					try
					{
						var dataArray = jQuery.parseJSON(data); //parsing JSON
					}
					catch(e)
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
						});
						
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: dataArray['message']*/
						});
				   
					}
					else
					{	
						noty({ type: 'success', text: 'App changes have been saved!' });
						if($('#redirectFlag').val()=='1') setTimeout(function(){window.location.replace("/dashboard");}, 1000);
					}
				}
			 }).done(function(){
				$('#appConfig2Sub').show();
				$('#savingButton').hide();
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	$(document).on("click", ".optionRowDelete", function(event) {
		//get item number
		$curTable = $(this).closest('table');
		var itemID = $curTable.attr('id');
		
		//get and update current count
		var itemCount = $("#"+itemID+"_optionCountAct").val();
		var newCount = parseInt(parseInt(itemCount) - 1);
		$("#"+itemID+"_optionCountAct").val(newCount);
		
		$ele = $(this).closest('tr');
		
		//add data-attribute
		$ele.find('input[name^=oName]').attr('data-delete', true);
		$ele.find('input[name^=oName]').data('delete', true);
		//remove required
		$ele.find('input[name^=oName], input[name^=oPrice], input[name^=oVisi]').each(function() {
			$(this).removeAttr('required');
		});
		
		if( ($ele.prev().prev().hasClass('subHeaderTR')) && ( ($ele.next().hasClass('subHeaderTR')) || ($ele.next().hasClass('xtraModTR')) ) )
		{	
			//add data-attribute
			$ele.prev().prev('.subHeaderTR').find('input[name^=iMod]').attr('data-delete', true);
			$ele.prev().prev('.subHeaderTR').find('input[name^=iMod]').data('delete', true);
			//remove required
			$ele.prev().prev('.subHeaderTR').find("input[name^=iMod], select[name^=iModType]").each(function() {
				$(this).removeAttr('required');
			});
			
			$ele.prev().prev('.subHeaderTR').hide();
			$ele.prev().hide();
			
			
			$("#"+itemID+"_modCountAct").val(parseInt($("#"+itemID+"_modCountAct").val())-1);
		}
		
		//bye-bye
		$(this).parents("tr:first").hide();
	});
	
	$(document).on("click", ".xtraOpt", function(event) {
	
		//get item number
		$curTable = $(this).closest('table');
		var itemID = $curTable.attr('id');
		
		//get and update current count
		var itemCount = $("#"+itemID+"_modCount").val();
		var newCount = parseInt(parseInt(itemCount) + 1);
		$("#"+itemID+"_modCount").val(newCount);
		$("#"+itemID+"_modCountAct").val(parseInt($("#"+itemID+"_modCountAct").val())+1);
	
	
		$subHeader = $('#item0 .subHeaderTR:first').clone(false);
		$dummyData = $('#item0 .subHeaderTR:first').next().clone(false); //dummy row
		
		$subHeader.find("select").each(function() {
			$(this).hide();
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/m\d+/gi, "m"+newCount);
			$(this).attr('name', newName);

			$(this).attr('required','required'); 
		});
		
		//add autocomplete
		$subHeader.find("input[name^=iMod]").each(function(){
			$(this).autocomplete({ source: [ "Choose a size","Choose a flavour","Choose a topping","Choose some extras","Choose a side dish" ], delay: 10, minLength: 0, position: { my: "left top", at: "left bottom", collision: "none", of: $subHeader.find("input[name^=iMod]") } });
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/m\d+/gi, "m"+newCount);
			$(this).attr('name', newName);
			
			//add data-attribute
			$(this).attr('data-insert', true);
			$(this).data('insert', true);
			$(this).attr('data-id', 'mod'+newCount+'m-'+itemID+'i');
			$(this).data('id', 'mod'+newCount+'m-'+itemID+'i');
		});
		
		$(this).closest('tr.xtraModTR').before($subHeader).before($dummyData);
		
		$subHeader.find('.newOpt').trigger('click');
	});
	
	$(document).on("click", ".newOpt, .optionRowDuplicate", function(event) {
		//new item or duplicate?
		var dup = 0;
		if($(this).hasClass("optionRowDuplicate")) dup = 1;
		
		//get item number
		$curTable = $(this).closest('table');
		var itemID = $curTable.attr('id');
		
		//get and update current count
		var itemCount = $("#"+itemID+"_optionCount").val();
		var newCount = parseInt(parseInt(itemCount) + 1);
		$("#"+itemID+"_optionCount").val(newCount);
		$("#"+itemID+"_optionCountAct").val(parseInt($("#"+itemID+"_optionCountAct").val())+1);
		
		//get mod number
		if(dup)
			var modNumber = $(event.target).parents('.optionTR').first().prevAll('.subHeaderTR').first().find('input[name^=iMod]').attr('name');
		else
			var modNumber = $(event.target).parents('.subHeaderTR').first().find('input[name^=iMod]').attr('name');
			
		modNumber = modNumber.replace(/^iMod.*\[m/gi,'');
		modNumber = modNumber.replace(']','');
		
		if(dup)
		{
			//clone the row in question
			$curRow = $(this).closest('tr');
		}
		else
		{
			//clone the nearest row
			$curRow = $(this).closest("tr").next();
		}
		
        $newRow = $curRow.clone(false);
		$newRow.addClass('optionTR');
		
		if(!dup)
		{
			$(this).parents('.menuEdit').find('.modifierRow').each(function(){
				$(this).slideRow('down');
				//replace ids with incremented value and make value = default value (for !dups)
				$(this).find("input").each(function() {
					//$(this).val( $(this).prop("defaultValue") );
					var tempName = $(this).attr('name');
					var newName = tempName.replace(/item\d+/gi, itemID);
					$(this).attr('name', newName);
					
					//var temp = $(this).val();
					//$(this).val("");
					//$(this).attr('placeholder', temp);
					
					$(this).attr('required','required');
				});
				
				$(this).find("select").each(function() {
					//$(this).val( $(this).prop("defaultValue") );
					var tempName = $(this).attr('name');
					var newName = tempName.replace(/item\d+/gi, itemID);
					$(this).attr('name', newName);
					
					$(this).multiselect({
					   multiple: false,
					   header: false,
					   noneSelectedText: "Pick an option type",
					   selectedList: 1
					});

					$(this).attr('required','required');
				});
			});
		}
		
		//replace ids with incremented value and make value = default value (for !dups)
		$newRow.find("input").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/item\d+/gi, itemID);
			newName = newName.replace(/\[\d+\]/gi, "["+newCount+"]");
			newName = newName.replace(/\[m\d+/gi, '[m'+modNumber);
			$(this).attr('name', newName);
		});
		
		if(!dup){
			//now we fix placeholder
			$newRow.find("input[name^=oName]").each(function() {
				var temp = $(this).val();
				$(this).val("");
				$(this).attr('placeholder', temp);
			});
			
			//now we fix placeholder
			$newRow.find("input[name^=oPrice]").each(function() {
				var temp = $(this).val();
				$(this).val("");
				$(this).attr('placeholder', temp);
			});
		}
		
		//fix the yes/no slider so the label appears correctly
		$newRow.find(".menuTDVisi input").each(function() {
			$(this).trigger('click'); 
		});
		
		//add data-attribute
		$newRow.find("input[name^=oName]").each(function() {
			$(this).attr('data-insert', true);
			$(this).data('insert', true);
			$(this).attr('data-id', 'opt'+newCount+'o-'+itemID+'i');
			$(this).data('id', 'opt'+newCount+'o-'+itemID+'i');
		});
				
		//hide it so we can animate it!
		$newRow.css('display','none');
		
		//now we locate where to place this option row
		if( ($(event.target).closest('.subHeaderTR').nextAll('.subHeaderTR').first().length) && !dup ) //new option button pressed
		{
			//insert just before next heading
			$(event.target).closest('.subHeaderTR').nextAll('.subHeaderTR').first().before($newRow);
			$(event.target).closest('.subHeaderTR').nextAll('.subHeaderTR').first().prev($newRow).slideRow('down');
		}
		else if( ($(event.target).closest('.optionTR').prevAll('.subHeaderTR').first().nextAll('.subHeaderTR').first().length) && dup ) //duplicate button pressed
		{
			//insert just before next heading
			$(event.target).closest('.optionTR').prevAll('.subHeaderTR').first().nextAll('.subHeaderTR').first().before($newRow);
			$newRow.slideRow('down');
		}
		else
		{
			//insert at before "add new option button"
			$("#"+itemID).find('.xtraModTR').before($newRow);
			$newRow.slideRow('down');
		}
		
		$(document).foundation('abide', 'events');
		
		$("html, body").animate({scrollTop: $($newRow).offset().top - ( $(window).height() - $($newRow).outerHeight(true) ) / 2}, 200); //.animate({ scrollTop: $($newRow).offset().top }, 250);
	});
	
	$(document).on("click", ".newItem, .itemDuplicate", function() {
		//new item or duplicate?
		var dup = 0;
		if($(this).hasClass("itemDuplicate")) dup = 1;
			
		//get section
		section = $(this).attr('id');
		
		if(!dup) section = section.replace(/add_/gi,"");
		else section = section.replace(/dup\d+_/gi,"");
		
		//get table item number
		$curTable = $(this).closest('table');
		var itemID = $curTable.attr('id');
		
		//get and update current count
		var itemCount = $("#itemCount").val();
		var newCount = parseInt(parseInt(itemCount) + 1);
		$("#itemCount").val(newCount);
		$("#itemCountAct").val(parseInt($("#itemCountAct").val())+1);
		
		if(dup) //clone an existing row
		{
			//create variables and insert
			$newOCount = $("#"+itemID+"_optionCount").clone(true);
			$newOCount.attr('id','item'+newCount+'_optionCount');
			$newOCount.attr('name','item'+newCount+'_optionCount');
			$newOCountAct = $("#"+itemID+"_optionCountAct").clone(true);
			$newOCountAct.attr('id','item'+newCount+'_optionCountAct');
			$newOCountAct.attr('name','item'+newCount+'_optionCountAct');
			$("#"+itemID+"_optionCountAct").after($newOCountAct);
			$("#"+itemID+"_optionCountAct").after($newOCount);
			
			$newMCount = $("#"+itemID+"_modCount").clone(true);
			$newMCount.attr('id','item'+newCount+'_modCount');
			$newMCount.attr('name','item'+newCount+'_modCount');
			$newMCountAct = $("#"+itemID+"_modCountAct").clone(true);
			$newMCountAct.attr('id','item'+newCount+'_modCountAct');
			$newMCountAct.attr('name','item'+newCount+'_modCountAct');
			$("#"+itemID+"_modCountAct").after($newMCountAct);
			$("#"+itemID+"_modCountAct").after($newMCount);
			
			//clone specific table
			$newTab = $("#"+itemID).clone(false);
			$newTab.attr('id','item'+newCount);
		}
		else //clone a dummy row
		{
			//create variables and insert
			$newOCount = $("#item0_optionCount").clone(true);
			$newOCount.attr('id','item'+newCount+'_optionCount');
			$newOCount.attr('name','item'+newCount+'_optionCount');
			$newOCount.val(0);
			$newOCountAct = $("#item0_optionCountAct").clone(true);
			$newOCountAct.attr('id','item'+newCount+'_optionCountAct');
			$newOCountAct.attr('name','item'+newCount+'_optionCountAct');
			$newOCountAct.val(0);
			$("#item0_optionCountAct").after($newOCountAct);
			$("#item0_optionCountAct").after($newOCount);
			
			$newMCount = $("#item0_modCount").clone(true);
			$newMCount.attr('id','item'+newCount+'_modCount');
			$newMCount.attr('name','item'+newCount+'_modCount');
			$newMCount.val(0);
			$newMCountAct = $("#item0_modCountAct").clone(true);
			$newMCountAct.attr('id','item'+newCount+'_modCountAct');
			$newMCountAct.attr('name','item'+newCount+'_modCountAct');
			$newMCountAct.val(0);
			$("#item0_modCountAct").after($newMCountAct);
			$("#item0_modCountAct").after($newMCount);
			
			//clone dummy table
			$newTab = $("#item0").clone(false);
			$newTab.attr('id','item'+newCount);
			
			//remove dummy modifier as we add it later manually :)
			$newTab.find('.subHeaderTR').remove();
			$newTab.find('.optionTR').remove();
		}
		
			$newTab.addClass('table'+section);
		
		//replace ids with incremented value and make value = default value
		$newTab.find(".itemTR input").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/section\d+/gi, section);
			newName = newName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
		});
		
		//replace ids with incremented value
		$newTab.find(".optionTR input").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/item\d+/gi, 'item'+newCount);
			$(this).attr('name', newName);
		});
		
		if(!dup){
			//now we fix placeholder
			$newTab.find("input[name^=iName]").each(function() {
				var temp = $(this).val();
				$(this).val("");
				$(this).attr('placeholder', temp);
			});
			
			//now we fix placeholder
			$newTab.find("input[name^=iPrice]").each(function() {
				var temp = $(this).val();
				$(this).val("");
				$(this).attr('placeholder', temp);
			});
		}
		
		if(dup) 
		{
			//remove multiselect
			$newTab.find(".ui-multiselect").remove();
		
			$newTab.find('.modifierRow').each(function(){
				if(parseInt($newOCountAct.val())) $(this).slideRow('down');
				//replace ids with incremented value and make value = default value (for !dups)
				$(this).find("input").each(function() {
					var tempName = $(this).attr('name');
					var newName = tempName.replace(/item\d+/gi, 'item'+newCount);
					$(this).attr('name', newName);
				});
				
				$newTab.find('.modifierRow select').each(function() {
					var tempName = $(this).attr('name');
					var newName = tempName.replace(/item\d+/gi, 'item'+newCount);
					$(this).attr('name', newName);
					
					$(this).multiselect({
					   multiple: false,
					   header: false,
					   noneSelectedText: "Pick an option type",
					   selectedList: 1
					}); 
				});
			});
		}
		
		//add data-attribute
		$newTab.find("input[name^=iName]").each(function() {
			$(this).attr('data-insert', true);
			$(this).data('insert', true);
			$(this).attr('data-id', 'item'+newCount+'i');
			$(this).data('id', 'item'+newCount+'i');
		});
		
		if(dup)
		{
			var modCount = 1;
			$newTab.find("input[name^=iMod]").each(function() {
				$(this).attr('data-insert', true);
				$(this).data('insert', true);
				$(this).attr('data-id', 'mod'+modCount+'m-item'+newCount+'i');
				$(this).data('id', 'mod'+modCount+'m-item'+newCount+'i');
				modCount++;
			});
			var optCount = 1;
			$newTab.find("input[name^=oName]").each(function() {
				if($(this).attr('data-id') != 'opt0o-item0i') //skip dummies
				{
					$(this).attr('data-insert', true);
					$(this).data('insert', true);
					$(this).attr('data-id', 'opt'+optCount+'o-item'+newCount+'i');
					$(this).data('id', 'opt'+optCount+'o-item'+newCount+'i');
					optCount++;
				}
			});
		}
		
		//now we give the section id to the duplicate button
		$newTab.find(".itemDuplicate").attr('id',"dup"+newCount+"_"+section);
		
		//add autocomplete
		$newTab.find("input[name^=iMod]").autocomplete({ source: [ "Choose a size","Choose a flavour","Choose a topping","Choose some extras","Choose a side dish" ], delay: 10, minLength: 0, position: { my: "left top", at: "left bottom", collision: "none", of: $newTab.find("input[name^=iMod]") } });
		
		$newTab.css('backgroundColor','#fafafa');
		$newTab.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
		$newTab.css('max-width', '100%'); 
		
		//hide it so we can animate it!
		$newTab.css('display','none');
		
		//insert after section header/before hidden div
		$(".firstItemDiv"+section).prev('.sortWithinDiv').append($newTab); 
		
		$($newTab).slideRow('down');
		if($newTab.find('.itemEdit').is(':visible')) $newTab.find('.itemEdit').trigger('click');
		
		$(document).foundation('abide', 'events');
		
		$("html, body").animate({scrollTop: $($newTab).offset().top - ( $(window).height() - $($newTab).outerHeight(true) ) / 2}, 200);
	});
	
	$(document).on("click", ".itemDelete", function() {
		//get item number
		$curTable = $(this).closest('table');
		var itemID = $curTable.attr('id');
		
		var text = "Are you sure you want to delete this item?";
		
		if($curTable.find("input[name^=iName]").data('mdi')) text = "<strong>This item is part of at least 1 Meal Deal.</strong><br/>This item will be disassociated with any Meal Deals if deleted. Are you sure you want to delete this item?";
		
		noty({
			layout: 'center',
			type: 'confirm',
			text: text,
			buttons: [
			{addClass: 'alert tiny', text: 'Yes, delete this item!', onClick: function($noty) {
				
				//get and update current count
				var itemCount = $("#itemCountAct").val();
				var newCount = parseInt(parseInt(itemCount) - 1);
				$("#itemCountAct").val(newCount);
				
				//add data-attribute
				$curTable.find("input[name^=iName], input[name^=iMod], input[name^=oName]").each(function() {
					$(this).attr('data-delete',true);
					$(this).data('delete',true);
				});
				
				//remove required
				$curTable.find("input[name^=iName], input[name^=iPrice], input[name^=iDesc], input[name^=iQuan], input[name^=iVisi], input[name^=iMod], select[name^=iModType], input[name^=oName], input[name^=oPrice], input[name^=oVisi]").each(function() {
					$(this).removeAttr('required');
				});
				
				//bye-bye
				$("#"+itemID).hide();

				$noty.close();
			  }
			},
			{addClass: 'secondary tiny', text: 'No, go back.', onClick: function($noty) {
				$noty.close();
			  }
			}
		  ]
		});
	});
	
	$(document).on("click", ".itemSave", function() {
		$(this).hide();
		$curItem = $(this).closest('table');
		var itemID = $curItem.attr('id');
		var count = parseInt($("#"+itemID+"_optionCountAct").val());
		
		$curItem.find("tr").removeClass('menuEdit');
		$curItem.find("tr").addClass('savedInput');
		$curItem.find("input").attr("readonly", "readonly");
		$curItem.find(".itemEdit").slideRow('down');
		if(count) $curItem.find(".optionTR").slideRow('up');
		$curItem.find(".itemSubheader").slideRow('up');
		$curItem.find(".subHeaderTR").slideRow('up');
		$curItem.find(".xtraModTD").hide();
		if(count) $curItem.find('.menuEdit').find('.modifierRow').slideRow('up');
		$curItem.css('background', 'transparent');
		$curItem.css('box-shadow', '0px 0px 0px');
		$curItem.css('max-width', '100%'); 
	});
	
	$(document).on("click", ".itemEdit, .itemTR input[readonly='readonly']", function() {
		
		if($(this).hasClass('itemEdit')) $(this).hide();
		else $(this).closest('table').find('.itemEdit').hide();
		
		$curItem = $(this).closest('table');
		var itemID = $curItem.attr('id');
		var count = parseInt($("#"+itemID+"_optionCountAct").val());
		
		$curItem.find("tr").addClass('menuEdit');
		$curItem.find("tr").removeClass('savedInput');
		$curItem.find("input").removeAttr("readonly");
		$curItem.find(".itemSave").slideRow('down');
		if(count) $curItem.find(".optionTR").slideRow('down');
		$curItem.find(".itemSubheader").slideRow('down');
		$curItem.find(".subHeaderTR").slideRow('down');
		$curItem.find(".xtraModTD").slideDown('fast');
		if(count) $curItem.find('.menuEdit').find('.modifierRow').slideRow('down');
		$curItem.css('background', '#fafafa');
		$curItem.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
		$curItem.css('max-width', '100%'); 
		$curItem.find('select[name^=iModType]').each(function(){ //reinitialize to get the right width
			$(this).multiselect({
				   multiple: false,
				   header: false,
				   noneSelectedText: "Pick an option type",
				   selectedList: 1
				}); 
		});
	});
	
	$(document).on("click", ".newSection", function() {
		//get and update current count
		var secCount = $("#sectionCount").val();
		var newCount = parseInt(secCount) + 1;
		$("#sectionCount").val(newCount);
		$("#sectionCountAct").val(parseInt($("#sectionCountAct").val())+1);
	
		//clone dummy section and dummy hook
		$newSec = $("#menuSectionRow").clone(true);
		$newHook = $(".firstItemDiv").clone(true);
		
		//prepare hook
		$newHook.addClass('firstItemDivsection'+newCount);
		$newHook.removeClass('firstItemDiv');
		$newHook.removeClass('hide');
		
		//add section id to add-item button
		var tempID = $newSec.find(".newItem").attr('id');
		var newID = tempID.replace(/\d+/,newCount);
		$newSec.find(".newItem").attr('id', newID);
		
		//add section id to delete-section button
		var tempID = $newSec.find(".deleteSection").attr('id');
		var newID = tempID.replace(/\d+/,newCount);
		$newSec.find(".deleteSection").attr('id', newID);
		
		//now we fix placeholder
		$newSec.find("input[name^=mSectionName]").each(function() {
			var temp = $(this).val();
			$(this).val("");
			$(this).attr('placeholder', temp);
			$(this).attr('name', 'mSectionName['+newCount+']');
			
			//data-attribute
			$(this).attr('data-insert', true);
			$(this).data('insert', true);
			$(this).attr('data-id', 'section'+newCount+'s');
			$(this).data('id', 'section'+newCount+'s');
		});
		
		$newSec.find(".menuSectionField").addClass('section'+newCount);
		
		//sorting
		$newSec.find(".hasTableHeader").after("<div class='sortWithinDiv'> </div>" );
		$newSec.find(".sortWithinDiv").sortable({ 
			opacity: 0.5, 
			axis: "y", 
			cursor: "move", 
			containment: "parent", 
			handle: ".sortHandle", 
			cancel: "input,textarea,select,option",
			placeholder: "sortable-placeholder",
			tolerance: "pointer",
			revert: 100,
			delay: 100,
			start: function(event,ui){
				$("<tbody><tr><td></td></tr></tbody>").appendTo(ui.placeholder);
				oldItemOrder = $(this).sortable('toArray');
				oldItemOrder.clean("");
				if($(ui.item).find('.itemSave').is(":visible")) $(ui.item).find('.itemSave').trigger('click');
				//$('.sortable-placeholder').height($(ui.item).height());
			},
			update: function(event, ui) {
				currentItemOrder = $(this).sortable('toArray');
				$parentDiv = $(ui.item).parent('.sortWithinDiv');

				itemCounter=1;
				$parentDiv.find('table').each(function(){
				
					var newIndex = oldItemOrder[itemCounter-1]; //we need the old order here so the new elements retain DOM order
					newIndex = newIndex.replace("item","");
					
					//update table id
					tempName = $(this).attr('id');
					newName = tempName.replace(/\item\d+/gi, "item"+newIndex+"");
					$(this).attr('id', newName);
					
					//update item_dup button id
					$(this).find('button[id^=dup]').each(function(){
						tempName = $(this).attr('id');
						newName = tempName.replace(/dup\d+_/gi, "dup"+newIndex+"_");
						$(this).attr('id', newName);
					});
					
					//update item inputs
					$(this).find('.itemTR input').each(function(){
						tempName = $(this).attr('name');
						newName = tempName.replace(/\[\d+\]/gi, "["+newIndex+"]");
						$(this).attr('name', newName);
					});
					
					//update modifier and options
					$(this).find('.subHeaderTR input, .subHeaderTR select, .optionTR input').each(function(){
						tempName = $(this).attr('name');
						newName = tempName.replace(/\[item\d+\]/gi, "[item"+newIndex+"]");
						$(this).attr('name', newName);
					});
					
					//add data-attribute
					$(this).find('input[name^=iName]').each(function(){
						$(this).attr('data-edit',true);
						$(this).data('edit',true);
					});
					
					itemCounter++;
				});
				
				//console.log("old:"+oldItemOrder+" new:"+currentItemOrder);
				
				//update item-option counts
				var itemCountArray = new Array();
				var itemCountActArray = new Array();
				
				var modCountArray = new Array();
				var modCountActArray = new Array();
				
				for(var i=0;i<currentItemOrder.length;i++)
				{
					itemCountArray[i] = $("#"+currentItemOrder[i]+"_optionCount").val();
					itemCountActArray[i] = $("#"+currentItemOrder[i]+"_optionCountAct").val();
					
					modCountArray[i] = $("#"+currentItemOrder[i]+"_modCount").val();
					modCountActArray[i] = $("#"+currentItemOrder[i]+"_modCountAct").val();
				}
				
				for(var i=0;i<oldItemOrder.length;i++) //the new values go to the old order. that's how the association is preserved.
				{
					$("#"+oldItemOrder[i]+"_optionCount").val(itemCountArray[i]);
					$("#"+oldItemOrder[i]+"_optionCountAct").val(itemCountActArray[i]);
					
					$("#"+oldItemOrder[i]+"_modCount").val(modCountArray[i]);
					$("#"+oldItemOrder[i]+"_modCountAct").val(modCountActArray[i]);
				}
			}
		});
		
		$newSec.find('.sortWithinDiv').after($newHook);
		
		//insert at the end of the table
		if($('.moveSec:last').length)
		{
			$("body").find('.moveSec:last').after($newSec);
		}
		else
		{
			$(this).parent().parent().before($newSec);
		}
		
		$newSec.slideDown('slow');
		
		$('body').find('.firstItemDivsection'+newCount).parents('#menuSectionRow').wrap('<div class="moveSec"></div>').wrap('<div class="moveSecInner"></div>');
	});
	
	$(document).on("click", ".deleteSection", function(){
		//get id
		sectionID = ($(this).attr('id')).replace("delete_section","");
		$parentSectionHeader = $(this).parents('#menuSectionRow');
		
		mdFlag = false;
		mdiFlag = false;
		
		if($parentSectionHeader.find("input[name^=mSectionName]").data('md')) mdFlag = true;
		
		$parentSectionHeader.find("input[name^=iName]").each(function() { 
			if($(this).data('mdi')) mdiFlag = true; 
		});
		
		var text = "Are you sure you want to delete this section? Note: all items and options will be lost!";
		
		if(mdFlag && !mdiFlag)
			text = "<strong>This section contains at least 1 Meal Deal.</strong><br/>All Meal Deals will be deleted if you continue!";
		else if(!mdFlag && mdiFlag) 
		    text = "<strong>This section contains item(s) that are part of at least 1 Meal Deal.</strong><br/>These items will be disassociated with all Meal Deals if you continue!";
		else if(mdFlag && mdiFlag)
			text = "<strong>This section contains Meal Deal(s) and item(s) that are part of Meal Deals.</strong><br/>All Meal Deals will be deleted and all Meal Deal items will be disassociated from Meal Deals.";
		
		noty({
			layout: 'center',
			type: 'confirm',
			text: text,
			buttons: [
			{addClass: 'alert tiny', text: 'Yes, delete this section and all its contents!', onClick: function($noty) {
				//get and update current count
				var secCount = $("#sectionCountAct").val();
				var newCount = parseInt(parseInt(secCount) - 1);
				$("#sectionCountAct").val(newCount);
				
				//count all items in question and get their ids
				itemCount = 0;
				itemIDArray = new Array();
				$(".tablesection"+sectionID).each(function() {
					itemIDArray[itemCount] = ($(this).attr('id')).replace("item","");
					itemCount++;
				});
				
				for(i=0;i<itemIDArray.length;i++) //remove all option count data for each item and mark for deletion
				{
					$("#item"+itemIDArray[i]+"_optionCount").remove();
					$("#item"+itemIDArray[i]+"_optionCountAct").remove();
					
					//add data-attribute
					$("#item"+itemIDArray[i]).find("input[name^=iName], input[name^=iMod], input[name^=oName]").each(function() {
						$(this).attr('data-delete',true);
						$(this).data('delete',true);
					});
				}
				
				//add data-attribute
				$parentSectionHeader.find("input[name^=mSectionName]").each(function() {
					$(this).attr('data-delete',true);
					$(this).data('delete',true);
				});
				
				//remove required
				$parentSectionHeader.find("input[name^=mSectionName], input[name^=iName], input[name^=iPrice], input[name^=iDesc], input[name^=iQuan], input[name^=iVisi], input[name^=iMod], select[name^=iModType], input[name^=oName], input[name^=oPrice], input[name^=oVisi]").each(function() {
					$(this).removeAttr('required');
				});
				
				
				
				//now we adjust item count
				var itemCounter = $("#itemCountAct").val();
				var newCount = parseInt(parseInt(itemCounter) - itemCount);
				$("#itemCountAct").val(newCount);

				//we hide the section here
				$parentSectionHeader.hide(); //remove section header and buttons!

				$(".tablesection"+sectionID).hide(); //tables of all items gone!
				$(".firstItemDivsection"+sectionID).hide(); //hidden section hook gone!

				$noty.close();
			  }
			},
			{addClass: 'secondary tiny', text: 'No, go back.', onClick: function($noty) {
				$noty.close();
			  }
			}
		  ]
		});
	});
	
	$(".itemMenuSingleSelect").multiselect({
	   multiple: false,
	   header: false,
	   noneSelectedText: "Pick an option type",
	   selectedList: 1
	});
	

	$("input[name^=iMod]").autocomplete({ source: [ "Choose a size","Choose a flavour","Choose a topping","Choose some extras","Choose a side dish" ], delay: 10, minLength: 0 });
	$("input[name^=iMD]").autocomplete({ source: [ "Choose a main","Choose a side","Choose a drink","Choose a curry","Choose a burger" ], delay: 10, minLength: 0 });
	
	$(document).on("click", '.showAChevy', function(){
		$elem = $(this).prevAll('input:first');
		$elem.focus();
		$elem.trigger('click');
	});
	
	$(document).on("click", 'input[name^=iMod], input[name^=iMD]', function(){
		$(this).parent('.modifierRow').find("input[name^=iMod]").autocomplete( "search", "C" );
		$(this).parent('.modifierRow').find("input[name^=iMD]").autocomplete( "search", "C" );
	});
	
	if($("#mName").length > 0)
	{
		$(".sortWithinDiv").sortable({ 
			opacity: 0.5, 
			axis: "y", 
			cursor: "move", 
			containment: "parent", 
			handle: ".sortHandle", 
			cancel: "input,textarea,select,option",
			placeholder: "sortable-placeholder",
			tolerance: "pointer",
			revert: 100,
			delay: 100,
			start: function(event,ui){
				$("<tbody><tr><td></td></tr></tbody>").appendTo(ui.placeholder);
				oldItemOrder = $(this).sortable('toArray');
				oldItemOrder.clean("");
				if($(ui.item).find('.itemSave').is(":visible")) $(ui.item).find('.itemSave').trigger('click');
				//$('.sortable-placeholder').height($(ui.item).height());
			},
			update: function(event, ui) {
				currentItemOrder = $(this).sortable('toArray');
				$parentDiv = $(ui.item).parent('.sortWithinDiv');

				itemCounter=1;
				$parentDiv.find('table').each(function(){
				
					var newIndex = oldItemOrder[itemCounter-1]; //we need the old order here so the new elements retain DOM order
					newIndex = newIndex.replace("item","");
					
					//update table id
					tempName = $(this).attr('id');
					newName = tempName.replace(/\item\d+/gi, "item"+newIndex+"");
					$(this).attr('id', newName);
					
					//update item_dup button id
					$(this).find('button[id^=dup]').each(function(){
						tempName = $(this).attr('id');
						newName = tempName.replace(/dup\d+_/gi, "dup"+newIndex+"_");
						$(this).attr('id', newName);
					});
					
					//update item inputs
					$(this).find('.itemTR input').each(function(){
						tempName = $(this).attr('name');
						newName = tempName.replace(/\[\d+\]/gi, "["+newIndex+"]");
						$(this).attr('name', newName);
					});
					
					//update modifier and options
					$(this).find('.subHeaderTR input, .subHeaderTR select, .optionTR input').each(function(){
						tempName = $(this).attr('name');
						newName = tempName.replace(/\[item\d+\]/gi, "[item"+newIndex+"]");
						$(this).attr('name', newName);
					});
					
					//add data-attribute
					$(this).find('input[name^=iName]').each(function(){
						$(this).attr('data-edit',true);
						$(this).data('edit',true);
					});
					
					itemCounter++;
				});
				
				//console.log("old:"+oldItemOrder+" new:"+currentItemOrder);
				
				//update item-option counts
				var itemCountArray = new Array();
				var itemCountActArray = new Array();
				
				var modCountArray = new Array();
				var modCountActArray = new Array();
				
				for(var i=0;i<currentItemOrder.length;i++)
				{
					itemCountArray[i] = $("#"+currentItemOrder[i]+"_optionCount").val();
					itemCountActArray[i] = $("#"+currentItemOrder[i]+"_optionCountAct").val();
					
					modCountArray[i] = $("#"+currentItemOrder[i]+"_modCount").val();
					modCountActArray[i] = $("#"+currentItemOrder[i]+"_modCountAct").val();
				}
				
				for(var i=0;i<oldItemOrder.length;i++) //the new values go to the old order. that's how the association is preserved.
				{
					$("#"+oldItemOrder[i]+"_optionCount").val(itemCountArray[i]);
					$("#"+oldItemOrder[i]+"_optionCountAct").val(itemCountActArray[i]);
					
					$("#"+oldItemOrder[i]+"_modCount").val(modCountArray[i]);
					$("#"+oldItemOrder[i]+"_modCountAct").val(modCountActArray[i]);
				}
			}
		});
		$(".dynamicDataTable").sortable({ 
			opacity: 0.5, 
			axis: "y", 
			cursor: "move", 
			containment: ".dynamicDataTable", 
			handle: ".sortSecHandle", 
			cancel: "input,textarea,select,option",
			placeholder: "sortable-placeholder-sec",
			tolerance: "pointer",
			items: "> .moveSec",
			revert: 100,
			delay: 100,
			update: function(event, ui) {
				//update all sections from the first one in the doc
				var section = 1 ;
				$('body').find('.moveSec').each(function(){
					//for each section
					$(this).find("input[name^=mSectionName]").attr('name','mSectionName['+section+']'); //update name
					$(this).find("input[name^=mSectionName]").alterClass('section*', "section"+section);
					
					$(this).find("button[id^=add_section]").attr('id','add_section'+section+''); //update add button
					$(this).find("button[id^=delete_section]").attr('id','delete_section'+section+''); //update delete button
					
					
					$(this).find("table.menuTable").alterClass('tablesection*', "tablesection"+section);   
					
					$(this).find("input[name^=iName]").each(function(){
						tempName = $(this).attr('name');
						newName = tempName.replace(/\[section\d+\]/gi, "[section"+section+"]");
						$(this).attr('name', newName);
					});//update name
					
					$(this).find("input[name^=iDesc]").each(function(){
						tempName = $(this).attr('name');
						newName = tempName.replace(/\[section\d+\]/gi, "[section"+section+"]");
						$(this).attr('name', newName);
					});//update name
					
					$(this).find("input[name^=iPrice]").each(function(){
						tempName = $(this).attr('name');
						newName = tempName.replace(/\[section\d+\]/gi, "[section"+section+"]");
						$(this).attr('name', newName);
					});//update name
					
					$(this).find("input[name^=iQuan]").each(function(){
						tempName = $(this).attr('name');
						newName = tempName.replace(/\[section\d+\]/gi, "[section"+section+"]");
						$(this).attr('name', newName);
					});//update name
					
					$(this).find("input[name^=iVisi]").each(function(){
						tempName = $(this).attr('name');
						newName = tempName.replace(/\[section\d+\]/gi, "[section"+section+"]");
						$(this).attr('name', newName);
					});//update name 
					
					$(this).find("button[id^=dup]").each(function(){
						tempName = $(this).attr('id');
						newName = tempName.replace(/_section\d+/gi, "_section"+section);
						$(this).attr('id', newName);
					});//update duplicate button
					
					$(this).find("div").alterClass('firstItemDivsection*', "firstItemDivsection"+section); 
					
					//add data-attribute
					$(this).find('input[name^=mSectionName]').each(function(){
						$(this).attr('data-edit',true);
						$(this).data('edit',true);
					});
					
					section++;
				});
			}
		});
	}
	
	//add data-attribute
	//main entries
	$(document).on("blur", 'input[name^=mName], input[name^=mSectionName], input[name^=iName], input[name^=iMod], input[name^=oName]', function(){
		$(this).attr('data-edit',true);
		$(this).data('edit',true);
	});
	//dependant entries
	//item 
	$(document).on("blur", 'input[name^=iDesc], input[name^=iPrice], input[name^=iQuan], input[name^=iVisi]', function(){
		$(this).parents('.itemTR').first().find('input[name^=iName]').attr('data-edit',true);
		$(this).parents('.itemTR').first().find('input[name^=iName]').data('edit',true);
	});
	//mod 
	$(document).on("change", 'select[name^=iModType]', function(){
		$(this).parents('.subHeaderTR').first().find('input[name^=iMod]').attr('data-edit',true);
		$(this).parents('.subHeaderTR').first().find('input[name^=iMod]').data('edit',true);
	});
	//opt 
	$(document).on("blur", 'input[name^=oPrice], input[name^=oVisi]', function(){
		$(this).parents('.optionTR').first().find('input[name^=oName]').attr('data-edit',true);
		$(this).parents('.optionTR').first().find('input[name^=oName]').data('edit',true);
	});
	
	$('.collapseAllMenu').on('click', function(){
		//lock all
		$("body .itemSave").each(function(){
			if($(this).is(":visible"))
				$(this).trigger('click');
		});
	});
	
	$('#menuConfigForm').click(function(event) {
	  $(this).data('clicked',$(event.target))
	});
	
	$("#menuConfigForm").on('invalid', function (event) {
		//open all error areas
		$("td.error").each(function(){
			if( !$(this).is(":visible") )
			{	
				$currButton = $(this).closest('table').find('.itemEdit');
				if($currButton.is(":visible")) { $currButton.click(); }
					//$currButton.trigger('click'); 
			}
		});
	});
	
	$("#menuConfigForm").on('valid', function (event) {
		//START
		//var start = new Date().getTime();
		
		//prevent multiple submissions
		var newSubmitTime = new Date().getTime();
		
		if( (newSubmitTime - submitTime) > 400 )
		{
			//who be clickin'?
			var editingSkip = 0;
			if ($(this).data('clicked').is('[id=menuSaveButtonE]')) editingSkip = 1;
			
			$('#menuSaveButton').hide();
			if(editingSkip) $('#menuSaveButtonE').hide();
			$('#savingButton').show();
			
			var url = "/saveMenu";
			
			//create menu object
			var menu = {};
			
			//MENU
			menu['id'] 			= $('#menuID').val();
			menu['name']		= $('#mName').val();
			
			menu['edit']		= $('#mName').data('edit');
			
			menu['accountId']	= $('#accountID').val();
			
			//SECTIONS
			menu['sections'] = {};
			secCounter = 1;
			$("input[name^=mSectionName]").each(function(){
				var sID = $(this).data('id');
				
				if(sID != "section0s")
				{
					menu['sections'][secCounter] = {};
					
					menu['sections'][secCounter]['id'] 			= sID.replace(/section/,'');
					menu['sections'][secCounter]['name'] 		= $(this).val();
					menu['sections'][secCounter]['position'] 	= secCounter;
					
					menu['sections'][secCounter]['insert'] 		= $(this).data('insert');
					menu['sections'][secCounter]['edit'] 		= $(this).data('edit');
					menu['sections'][secCounter]['delete'] 		= $(this).data('delete');
					menu['sections'][secCounter]['md'] 			= $(this).data('md');
					
					menu['sections'][secCounter]['menuId'] 		= menu['id'];
					
					//ITEMS
					menu['sections'][secCounter]['items'] = {};
					$fullSection = $(this).parents("#menuSectionRow");
					itemCounter = 1;
					$fullSection.find('.tablesection'+secCounter).each(function(){
						var iID = $(this).find('input[name^=iName]').data('id');
						
						if(iID != "item0i")
						{
							menu['sections'][secCounter]['items'][itemCounter] = {};
							
							menu['sections'][secCounter]['items'][itemCounter]['id'] 			= iID.replace(/item/,'');
							menu['sections'][secCounter]['items'][itemCounter]['name'] 			= $(this).find('input[name^=iName]').val();
							menu['sections'][secCounter]['items'][itemCounter]['description']	= $(this).find('input[name^=iDesc]').val();
							if($(this).find('input[name^=iPrice]').val() == '')
								menu['sections'][secCounter]['items'][itemCounter]['price'] 	= 0;
							else	
								menu['sections'][secCounter]['items'][itemCounter]['price'] 	= $(this).find('input[name^=iPrice]').val();
							menu['sections'][secCounter]['items'][itemCounter]['visible'] 		= 0;
							menu['sections'][secCounter]['items'][itemCounter]['quantity'] 		= 0;
							menu['sections'][secCounter]['items'][itemCounter]['position'] 		= parseInt(itemCounter+1000);
								
							menu['sections'][secCounter]['items'][itemCounter]['insert'] 		= $(this).find('input[name^=iName]').data('insert');
							menu['sections'][secCounter]['items'][itemCounter]['edit'] 			= $(this).find('input[name^=iName]').data('edit');
							menu['sections'][secCounter]['items'][itemCounter]['delete'] 		= $(this).find('input[name^=iName]').data('delete');
							menu['sections'][secCounter]['items'][itemCounter]['mdi'] 			= $(this).find('input[name^=iName]').data('mdi');
								
							menu['sections'][secCounter]['items'][itemCounter]['menuId'] 		= menu['id'];
							menu['sections'][secCounter]['items'][itemCounter]['venueId'] 		= $('#venueID').val();
							menu['sections'][secCounter]['items'][itemCounter]['sectionId'] 	= menu['sections'][secCounter]['id'];
							
							//MODIFIERS
							menu['sections'][secCounter]['items'][itemCounter]['modifiers'] = {};
							$fullItem = $(this).find(".subHeaderTR");
							modCounter = 1;
							$fullItem.each(function(){
								var mID = $(this).find('input[name^=iMod]').data('id');
								
								if(mID != "mod0m")
								{
									menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter] = {};
									
									menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['id'] 		= mID.replace(/mod/,'');
									menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['name'] 	= $(this).find('input[name^=iMod]').val();
									menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['position'] = modCounter;
									menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['type']	 	= $(this).find('select[name^=iModType]').val();
									switch(menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['type'])
									{
										case "S":
										{
											menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['minChoices'] = "1";
											menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['maxChoices'] = "1";
											break;
										}
										case "M":
										{
											menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['minChoices'] = "1";
											menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['maxChoices'] = "-1";
											break;
										}
										case "O":
										{
											menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['minChoices'] = "0";
											menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['maxChoices'] = "-1";
											break;
										}
										default:
										{
											menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['minChoices'] = "0";
											menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['maxChoices'] = "-1";
											break;
										}
									}
									
									menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['insert'] 	= $(this).find('input[name^=iMod]').data('insert');
									menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['edit'] 	= $(this).find('input[name^=iMod]').data('edit');
									menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['delete'] 	= $(this).find('input[name^=iMod]').data('delete');
									
									menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['itemId']	= menu['sections'][secCounter]['items'][itemCounter]['id'];
									
									//OPTIONS
									menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['options'] = {};
									$fullMod = $(this).nextAll("tr"); //THIS TAKES ALL OPTIONS FROM MODS BELOW IT!! (so we break when we get to a separator)
									optCounter = 1;
									$fullMod.each(function(){ 
										if( ($(this).children('.itemSubheader').length) || ($(this).children('.xtraModTD').length) ) return false; //break!
										else if($(this).hasClass('optionTR')) //only see the options row
										{
											var oID = $(this).find('input[name^=oName]').data('id');
											
											if(oID != "opt0o")
											{
												menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['options'][optCounter] = {};
												
												menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['options'][optCounter]['id'] 			= oID.replace(/opt/,'');
												menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['options'][optCounter]['name'] 			= $(this).find('input[name^=oName]').val();
												if($(this).find('input[name^=oPrice]').val() == '')
													menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['options'][optCounter]['price'] 	= 0;
												else	
													menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['options'][optCounter]['price'] 	= $(this).find('input[name^=oPrice]').val();
												menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['options'][optCounter]['visible'] 		= 0;
												menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['options'][optCounter]['position'] 		= optCounter;
													
												menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['options'][optCounter]['insert'] 		= $(this).find('input[name^=oName]').data('insert');
												menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['options'][optCounter]['edit'] 			= $(this).find('input[name^=oName]').data('edit');
												menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['options'][optCounter]['delete'] 		= $(this).find('input[name^=oName]').data('delete');
												
												menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['options'][optCounter]['modifierId']	= menu['sections'][secCounter]['items'][itemCounter]['modifiers'][modCounter]['id']; 
												
												optCounter++;
											}
										}
									});
									modCounter++;
								}
							});
							
							itemCounter++;
						}
					});
					
					secCounter++;
				}
			});
		
			menuData = JSON.stringify(menu);
		
			//console.log(menu);
			//console.log(menuData);
			
			$.ajax({
			   type: "POST",
			   url: url,
			   contentType: "application/json",
			   data: menuData, //custom serialization
			   success: function(data)
			   {
					try
					{
						var dataArray = jQuery.parseJSON(data); //parsing JSON
					}
					catch(e)
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." //text: 'Connection Error! Check API endpoint.'
						});
						
						//alert(data);
						
						return false;
					}
					
					if( typeof dataArray['status'] !='undefined' || (typeof dataArray['result'] !='undefined' && typeof dataArray['result']['status'] !='undefined') ) //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." //text: dataArray['message']
						});
				   
					}
					else
					{	
						newIDs = dataArray['update'];

						if(Object.keys(newIDs).length > 0) //this is an object not array so length and stuff works differently
						{
							$.each(newIDs, function(index, value) {
							if(index.match(/menu/))
							{
							  $('input[value='+index+']').val(value); //find by value and update!
							}
							else  
							{ 
								$('input[data-id='+index+']').attr('data-id',value); //find by value and update!
								$('input[data-id='+value+']').data('id',value); //find by value and update! (use value from top as index as its already applied!)
							}
							});
						}
						
						noty({ type: 'success', text: 'Menu configuration has been saved!' });
						
						//var end = new Date().getTime();
						//var time = end - start;
						//console.log('Execution time: ' + time + "milliseconds");
						
						if($('#redirectFlag').val()=='1' && !editingSkip) setTimeout(function(){window.location.replace("/dashboard");}, 1000);
					}
				}
			 }).done(function() {
				if($('#redirectFlag').val()!='1') $('#menuSaveButton').show(); 
				
				if(editingSkip)
				{ 
					$('#menuSaveButton').show(); 
					$('#menuSaveButtonE').show(); 
				}
				
				//refresh data attributes
				$("#mName").attr('data-edit', false);
				$("#mName").data('edit', false);
				
				$("input[name^=mSectionName], input[name^=iName], input[name^=iMod], input[name^=oName]").each(function() {
					$(this).attr('data-delete', false);
					$(this).attr('data-insert', false);
					$(this).attr('data-edit', false);
					
					$(this).data('delete', false);
					$(this).data('insert', false);
					$(this).data('edit', false);
				});
				
				$('#savingButton').hide();
			 });
		}
		//update Time
		submitTime = new Date().getTime();
		return false; // avoid to execute the actual submit of the form.
	}); 
	
	$(document).on("click", ".newEvent, .eventDuplicate", function() {
		//new item or duplicate?
		var dup = 0;
		if($(this).hasClass("eventDuplicate")) dup = 1;
		
		//get table event number
		$curTable = $(this).closest('table');
		var eventID = $curTable.attr('id');
		
		//get and update current count
		var eventCount = $("#eventCount").val();
		var newCount = parseInt(parseInt(eventCount) + 1);
		$("#eventCount").val(newCount);
		$("#eventCountAct").val(parseInt($("#eventCountAct").val())+1);
		
		if(dup) //clone an existing row
		{
			//create variables and insert
			$newOCount = $("#"+eventID+"_optionCount").clone(true);
			$newOCount.attr('id','event'+newCount+'_optionCount');
			$newOCount.attr('name','event'+newCount+'_optionCount');
			$newOCountAct = $("#"+eventID+"_optionCountAct").clone(true);
			$newOCountAct.attr('id','event'+newCount+'_optionCountAct');
			$newOCountAct.attr('name','event'+newCount+'_optionCountAct');
			$("#"+eventID+"_optionCountAct").after($newOCountAct);
			$("#"+eventID+"_optionCountAct").after($newOCount);
		
			//clone specific table
			$newTab = $("#"+eventID).clone(false);
			$newTab.attr('id','event'+newCount);
		}
		else //clone a dummy row
		{
			//create variables and insert
			$newOCount = $("#event0_optionCount").clone(true);
			$newOCount.attr('id','event'+newCount+'_optionCount');
			$newOCount.attr('name','event'+newCount+'_optionCount');
			$newOCount.val(1);
			$newOCountAct = $("#event0_optionCountAct").clone(true);
			$newOCountAct.attr('id','event'+newCount+'_optionCountAct');
			$newOCountAct.attr('name','event'+newCount+'_optionCountAct');
			$newOCountAct.val(1);
			$("#event0_optionCountAct").after($newOCountAct);
			$("#event0_optionCountAct").after($newOCount);
			
			//clone dummy table
			$newTab = $("#event0").clone(true);
			$newTab.attr('id','event'+newCount);
		}
		
		//Replace ids with incremented value and make value = default value
		$newTab.find(".eventTR input").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
		});
		
		//Replace ids with incremented value and make value = default value
		$newTab.find(".optionTR input").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/event\d+/gi, 'event'+newCount);
			newName = newName.replace(/\[\d+\]/gi, "["+$newOCount.val()+"]");
			$(this).attr('name', newName);
		});
		
		//remove multiselect
		if(dup) $newTab.find(".ui-multiselect").remove();
		
		//Replace ids with incremented value and make value = default value + add multiselect
		$newTab.find(".optionTR select").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/event\d+/gi, 'event'+newCount);
			newName = newName.replace(/\[\d+\]/gi, "["+$newOCount.val()+"]");
			$(this).attr('name', newName);
			
			$(this).multiselect({
			   multiple: false,
			   header: false,
			   noneSelectedText: "Choose a Collection Slot",
			   selectedList: 1,
			   minWidth: 342
			}); 
		});
		
		if(!dup){
			//now we fix placeholder
			$newTab.find("input[name^=eName]").each(function() {
				var temp = $(this).val();
				$(this).val("");
				$(this).attr('placeholder', temp);
			});
			
			//now we fix placeholder
			$newTab.find("input[name^=eTime]").each(function() {
				var temp = $(this).val();
				$(this).val("");
				$(this).attr('placeholder', temp);
				$(this).attr('pattern', "\\d\\d:\\d\\d");
			});
			
			//now we fix placeholder
			$newTab.find("input[name^=eETime]").each(function() {
				var temp = $(this).val();
				$(this).val("");
				$(this).attr('placeholder', temp);
				$(this).attr('pattern', "\\d\\d:\\d\\d");
			});
			
			//now we fix placeholder
			$newTab.find("input[name^=eDate]").each(function() {
				var temp = $(this).val();
				$(this).val("");
				$(this).attr('placeholder', temp);
				$(this).attr('pattern', "^\\d\\d\\/\\d\\d\\/\\d\\d\\d\\d$");
			});
			
			//now we fix placeholder
			$newTab.find("input[name^=eLead]").each(function() {
				var temp = $(this).val();
				$(this).val("");
				$(this).attr('placeholder', temp);
			});
		}
		
		//now we fix eID
		$newTab.find("input[name^=eID]").val("e"+newCount);
				
		//now we give the item id to the duplicate button
		$newTab.find(".eventDuplicate").attr('id',"dup"+newCount);
		
		//now we add datepicker
		$newTab.find(".eventTDDate input").fdatepicker({format:'dd/mm/yyyy', onRender: function(date) {return date.valueOf() < now.valueOf() ? 'disabled' : '';}}); 
		
		//now we add timepicker
		$newTab.find("input[name^=eTime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 }); 
		$newTab.find("input[name^=eETime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 }); 
		
		$newTab.css('backgroundColor','#fafafa');
		$newTab.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
		$newTab.css('max-width', '100%'); 
		
		//hide it so we can animate it!
		$newTab.css('display','none');
		
		//insert before section header/before hidden div
		$(".firstEventDiv").before($newTab); 
		$newTab.slideRow('down');
		if(!$newTab.find('.eventSave').is(':visible')) $newTab.find('.eventTDEdit').trigger('click');
		$("html, body").animate({scrollTop: $($newTab).offset().top - ( $(window).height() - $($newTab).outerHeight(true) ) / 2}, 200);
	});
	
	$("input[name^=eTime]").on('changeTime',function() {
		currTime = $(this).val()+":00";
		
		newTime = extractAMPM("January 01, 2000 "+currTime);
		
		$(this).parents('table').find("input[name^=eETime]").timepicker('remove');
		$(this).parents('table').find("input[name^=eETime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
		$(this).parents('table').find("input[name^=eETime]").timepicker({ 'minTime': newTime, 'timeFormat': 'H:i', 'step': 15 });
		$(this).parents('table').find("input[name^=eETime]").timepicker('setTime', newTime);
	});
	
	$(document).on("click", ".eventSave", function() {
		$(this).hide();
		$curItem = $(this).closest('table');
		$curItem.find("tr").removeClass('eventEdit');
		$curItem.find("tr").addClass('savedInput');
		$curItem.find("input").attr("readonly", "readonly");
		$curItem.find(".eventTDEdit").removeClass('hide');
		$curItem.find(".eventTDEdit").show();
		$curItem.find(".optionTR").slideRow('up');
		$curItem.find(".eventMenuSingleSelect").multiselect("disable");
		$curItem.css('background', 'transparent');
		$curItem.css('box-shadow', '0px 0px 0px');
		$curItem.css('max-width', '100%');
	});
	
	$(document).on("click", ".eventTDEdit, .eventTR input[readonly='readonly']", function() {
		if($(this).hasClass('eventTDEdit')) $(this).hide();
		else $(this).closest('table').find('.eventTDEdit').hide();
		$curItem = $(this).closest('table');
		$curItem.find("tr").addClass('eventEdit');
		$curItem.find("tr").removeClass('savedInput');
		$curItem.find("input").removeAttr("readonly");
		$curItem.find(".eventSave").removeClass('hide');
		$curItem.find(".eventSave").show();
		$curItem.find(".optionTR").slideRow('down');
		$curItem.find(".eventMenuSingleSelect").multiselect("enable");
		$curItem.css('background', '#fafafa');
		$curItem.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
		$curItem.css('max-width', '100%');
		
		$curItem.find("td.eventTDCollection select").each(function() {
			$(this).multiselect({
			   multiple: false,
			   header: false,
			   noneSelectedText: "Choose a Collection Slot",
			   selectedList: 1,
			   minWidth: 342
			}); 
		});
	});
	
	$(document).on("click", ".eventDelete", function() {
		//get event number
		$curTable = $(this).closest('table');
		eventID = $curTable.attr('id');
		
		realEventID = $curTable.find("input[name^=eID]").val();
		
		if(typeof realEventID =='undefined' || realEventID == '' || !realEventID.match(/^\d+?$/gi)) //event not saved in DB
		{
			noty({
				layout: 'center',
				type: 'confirm',
				text: 'Are you sure you want to delete this event? Note: all event data will be lost!',
				buttons: [
				{addClass: 'alert tiny', text: 'Yes, delete this event!', onClick: function($noty) {
					
					//get and update current count
					eventCount = $("#eventCountAct").val();
					newCount = parseInt(parseInt(eventCount) - 1);
					$("#eventCountAct").val(newCount);
					
					//bye-bye
					$("#"+eventID).remove();
					
					$noty.close();
				  }
				},
				{addClass: 'secondary tiny', text: 'No, go back.', onClick: function($noty) {
					$noty.close();
				  }
				}
			  ]
			});
		}
		else //event in DB
		{
			noty({
				layout: 'center',
				type: 'confirm',
				text: 'Are you sure you want to delete this event? Note: all event data will be lost!',
				buttons: [
				{addClass: 'alert tiny', text: 'Yes, delete this event!', onClick: function($noty) {
					
					var url = "/deleteEvent";
					$.ajax({
						   type: "POST",
						   url: url,
						   data: 'eventID='+realEventID, // serializes the form's elements.
						   success: function(data)
						   {
								try
								{
									var dataArray = jQuery.parseJSON(data); //parsing JSON
								}
								catch(e)
								{
									noty({
									  type: 'error',  layout: 'topCenter',
									  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
									});
									
									//alert(data);
									
									return false;
								}
									
								//get and update current count
								eventCount = $("#eventCountAct").val();
								newCount = parseInt(parseInt(eventCount) - 1);
								$("#eventCountAct").val(newCount);
								
								//bye-bye
								$("#"+eventID).remove();
							}
						 });
					$noty.close();
				  }
				},
				{addClass: 'secondary tiny', text: 'No, go back.', onClick: function($noty) {
					$noty.close();
				  }
				}
			  ]
			});
		}
		
	});
	
	$(".eventMenuSingleSelect").multiselect({
	   multiple: false,
	   header: false,
	   noneSelectedText: "Choose a Collection Slot",
	   selectedList: 1,
	   minWidth: 342
	}); 
		
	$(".eventMenuSingleSelect").multiselect('disable');
	
	$(document).on("click", ".newCollSlot", function() {
		//get event number
		$curTable = $(this).closest('table');
		var eventID = $curTable.attr('id');
		 
		//get and update current count
		var eventCount = $("#"+eventID+"_optionCount").val();
		var newCount = parseInt(parseInt(eventCount) + 1);
		$("#"+eventID+"_optionCount").val(newCount);
		$("#"+eventID+"_optionCountAct").val(parseInt($("#"+eventID+"_optionCountAct").val())+1);
		
		//clone the nearest row
		$curRow = $(this).closest("tr"); 
		
        $newRow = $curRow.clone(false);
		
		$newRow.find("td.eventTDAddMore").empty();
		$newRow.find("td.eventTDAddMore").append("<button type='button' class='delCollSlot secondary' title='Delete this slot'><i class='pd-delete'></i></button>");
		$newRow.find(".ui-multiselect").remove();
		
		$newRow.find("td.eventTDCollection select").each(function() {
			$(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
			
			$(this).multiselect({
			   multiple: false,
			   header: false,
			   noneSelectedText: "Choose a Collection Slot",
			   selectedList: 1,
			   minWidth: 342
			}); 
		});
		
		//replace ids with incremented value and make value = default value
		$newRow.find("input").each(function() {
			$(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/event\d+/gi, eventID);
			newName = newName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
		});
		
		//now we fix placeholder
		$newRow.find("input[name^=eLead]").each(function() {
			var temp = $(this).val();
			$(this).val("");
			$(this).attr('placeholder', temp);
		});
				
		//hide it so we can animate it!
		$newRow.css('display','none');
		
		//insert at the end of the table
		$("#"+eventID+" tr:last").after($newRow);
		$("#"+eventID+" tr:last").slideRow('down');

		$(document).foundation('abide', 'events');
		
		$("html, body").animate({scrollTop: $($newRow).offset().top - ( $(window).height() - $($newRow).outerHeight(true) ) / 2}, 200); //.animate({ scrollTop: $($newRow).offset().top }, 250);
	});
	
	$(document).on("click", ".delCollSlot", function() {
		//get item number
		$curTable = $(this).closest('table');
		var eventID = $curTable.attr('id');
		
		//get and update current count
		var eventCount = $("#"+eventID+"_optionCountAct").val();
		var newCount = parseInt(parseInt(eventCount) - 1);
		$("#"+eventID+"_optionCountAct").val(newCount);
		
		//bye-bye
		$(this).parents("tr:first").remove();
	});
	
	$("#eventConfigForm").on('valid', function (event) {
		//prevent multiple submissions
		var newSubmitTime = new Date().getTime();
		
		if( (newSubmitTime - submitTime) > 300 )
		{
			//lock all
			$("body .eventSave").each(function(){
				if($(this).is(":visible"))
					$(this).trigger('click');
			});
			
			//enable dropdowns or we wont get the values!
			$(".eventMenuSingleSelect").multiselect('enable');
			
			var url = "/saveEvent";
			
			$('#eventSubButton').hide();
			$('#savingButton').show();

			$.ajax({
			   type: "POST",
			   url: url,
			   data: $(this).serialize(), // serializes the form's elements.
			   success: function(data)
			   {
					try
					{
						var dataArray = jQuery.parseJSON(data); //parsing JSON
					}
					catch(e)
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
						});
						//alert(data);
						return false;
					}
					
					if( typeof dataArray['status'] !='undefined' || (typeof dataArray['result'] !='undefined' && typeof dataArray['result']['status'] !='undefined') ) //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: dataArray['message']*/
						});
				   
					}
					else
					{	
						newIDs = dataArray['update'];

						if(Object.keys(newIDs).length > 0) //this is an object not array so length and stuff works differently
						{
							$.each(newIDs, function(index, value) {
							  $('input[value='+index+']').val(value); //find by value and update!
							});
						}
						
						noty({ type: 'success', text: 'Event configuration has been saved!' });
						if($('#redirectFlag').val()=='1') setTimeout(function(){window.location.replace("/payment");}, 1000);
					}
				}
			 }).done(function() {
				$('#eventSubButton').show();
				$('#savingButton').hide();
				$(".eventMenuSingleSelect").multiselect('disable');
			 });
		}
		//update Time
		submitTime = new Date().getTime();
		return false; // avoid to execute the actual submit of the form.
	});
	
	$(document).on("click", ".userSave", function() {
		$(this).hide();
		$curItem = $(this).closest('table');
		$curItem.find("tr").removeClass('userEdit');
		$curItem.find("tr").addClass('savedInput');
		$curItem.find("input").attr("readonly", "readonly");
		$curItem.find(".userTDEdit").removeClass('hide');
		$curItem.find(".userTDEdit").show();
		$curItem.find(".userPassTR").hide();
		$curItem.find(".userMenuSingleSelect").multiselect("disable");
		$curItem.css('background', 'transparent');
		$curItem.css('box-shadow', '0px 0px 0px');
		$curItem.css('max-width', '100%'); 
	});
	
	$(document).on("click", ".userTDEdit, .userTR input[readonly='readonly']", function() {
		if($(this).hasClass('userTDEdit')) $(this).hide();
		else $(this).closest('table').find('.userTDEdit').hide();
		$curItem = $(this).closest('table');
		$curItem.find("tr").addClass('userEdit');
		$curItem.find("tr").removeClass('savedInput');
		$curItem.find("input").removeAttr("readonly");
		$curItem.find("input[name^='uEmail']").each(function(){ if($(this).hasClass('preSaved')) $(this).attr("readonly", "readonly"); });
		$curItem.find(".userSave").removeClass('hide');
		$curItem.find(".userSave").show();
		$curItem.find(".userPassTR").show();
		$curItem.find(".userMenuSingleSelect").multiselect("enable");
		$curItem.css('background', '#fafafa');
		$curItem.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
		$curItem.css('max-width', '100%'); 
	});
	
	$(document).on("click", ".newUser", function() {
		//new item or duplicate?
		var dup = 0;
		if($(this).hasClass("userDuplicate")) dup = 1;
		
		//get table user number
		$curTable = $(this).closest('table');
		var eventID = $curTable.attr('id');
		
		//get and update current count
		var userCount = $("#userCount").val();
		var newCount = parseInt(parseInt(userCount) + 1);
		$("#userCount").val(newCount);
		$("#userCountAct").val(parseInt($("#userCountAct").val())+1);
		
		if(dup) //clone an existing row
		{
			//clone specific table
			$newTab = $("#"+eventID).clone(false);
			$newTab.attr('id','user'+newCount);
		}
		else //clone a dummy row
		{
			//clone dummy table
			$newTab = $("#user0").clone(true);
			$newTab.attr('id','user'+newCount);
		}
		
		//replace ids with incremented value and make value = default value
		$newTab.find(".userTR input").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
		});
		
		$newTab.find("input[name^=uPasswordConf]").each(function() {
			var tempName = $(this).attr('data-equalTo');
			var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('data-equalTo', newName);
		});
		
		$newTab.find("input[id^=uPassword]").each(function() {
			var tempName = $(this).attr('id');
			var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('id', newName);
		});
		
		$newTab.find(".userTR select").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
			
			$(this).multiselect({
			   multiple: false,
			   header: false,
			   noneSelectedText: "Role",
			   selectedList: 1,
			   minWidth: 108
			}); 
		});
		
		if(!dup){
			//now we fix placeholder
			$newTab.find("input[name^=uName]").each(function() {
				var temp = $(this).val();
				$(this).val("");
				$(this).attr('placeholder', temp);
			});
		}
		
		//now we fix uID
		$newTab.find("input[name^=uID]").each(function() {
			$(this).val("u"+newCount);
		});
		
		$newTab.find("input[name^=uPass]").attr('required','required');
		$newTab.find("input[name^=uName]").attr('required','required');
		$newTab.find("input[name^=uEmail]").attr('required','required');
				
		//now we give the item id to the duplicate button
		$newTab.find(".userDuplicate").attr('id',"dup"+newCount);
		
		$newTab.css('backgroundColor','#fafafa');
		$newTab.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
		$newTab.css('max-width', '100%'); 
		
		//hide it so we can animate it!
		$newTab.css('display','none');
		
		//insert before section header/before hidden div
		$(".firstUserDiv").before($newTab); 
		$newTab.slideRow('down');
		$("html, body").animate({scrollTop: $($newTab).offset().top - ( $(window).height() - $($newTab).outerHeight(true) ) / 2}, 200);
	});
	
	$(document).on("click", ".userDelete", function() {
		//get event number
		$curTable = $(this).closest('table');
		userID = $curTable.attr('id');
		
		realUserID = $curTable.find("input[name^=uID]").val();
		
		if(typeof realUserID =='undefined' || realUserID == '' || !realUserID.match(/^\d+?$/gi)) //event not saved in DB
		{
			noty({
				layout: 'center',
				type: 'confirm',
				text: 'Are you sure you want to delete this user? Note: all user data will be lost!',
				buttons: [
				{addClass: 'alert tiny', text: 'Yes, delete this user!', onClick: function($noty) {
					
					//get and update current count
					userCount = $("#userCountAct").val();
					newCount = parseInt(parseInt(userCount) - 1);
					$("#userCountAct").val(newCount);
					
					//bye-bye
					$("#"+userID).remove();
					
					$noty.close();
				  }
				},
				{addClass: 'secondary tiny', text: 'No, go back.', onClick: function($noty) {
					$noty.close();
				  }
				}
			  ]
			});
		}
		else //event in DB
		{
			noty({
				layout: 'center',
				type: 'confirm',
				text: 'Are you sure you want to delete this user? Note: all user data will be lost!',
				buttons: [
				{addClass: 'alert tiny', text: 'Yes, delete this user!', onClick: function($noty) {
					
					var url = "/deleteUser";
					$.ajax({
						   type: "POST",
						   url: url,
						   data: 'userID='+realUserID, // serializes the form's elements.
						   success: function(data)
						   {
								try
								{
									var dataArray = jQuery.parseJSON(data); //parsing JSON
								}
								catch(e)
								{
									noty({
									  type: 'error',  layout: 'topCenter',
									  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
									});
									
									//alert(data);
									
									return false;
								}
									
								//get and update current count
								userCount = $("#userCountAct").val();
								newCount = parseInt(parseInt(userCount) - 1);
								$("#userCountAct").val(newCount);
								
								//bye-bye
								$("#"+userID).remove();
							}
						 });
					$noty.close();
				  }
				},
				{addClass: 'secondary tiny', text: 'No, go back.', onClick: function($noty) {
					$noty.close();
				  }
				}
			  ]
			});
		}
		
	});
	
	$(".userMenuSingleSelect").multiselect({
	   multiple: false,
	   header: false,
	   noneSelectedText: "Role",
	   selectedList: 1
	}); 
		
	$(".userMenuSingleSelect").multiselect('disable');
	
	$("#userConfigForm").on('valid', function (event) {
		//lock all
		$("body .userSave").each(function(){
			if($(this).is(":visible"))
				$(this).trigger('click');
		});
		
		$('#userSubButton').hide();
		$('#savingButton').show();
		
		//enable dropdowns or we wont get the values!
		$(".userMenuSingleSelect").multiselect('enable');
		
		var url = "/saveUser";

		var errorFlag = 0;
		
		$.ajax({
			   type: "POST",
			   url: url,
			   data: $(this).serialize(), // serializes the form's elements.
			   success: function(data)
			   {
					try
					{
						var dataArray = jQuery.parseJSON(data); //parsing JSON
					}
					catch(e)
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
						});
						
						errorFlag = 1;
						
						//alert(data);
						return false;
					}
					
					if( typeof dataArray['status'] !='undefined' || (typeof dataArray['result'] !='undefined' && typeof dataArray['result']['status'] !='undefined') ) //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "User already exists!"
						  //text: "Sorry, but there's been an error processing your request." /*text: dataArray['message']*/
						});
						//alert(data);
						errorFlag = 1;
					}
					else
					{	
						newIDs = dataArray['update'];

						if(Object.keys(newIDs).length > 0) //this is an object not array so length and stuff works differently
						{
							$.each(newIDs, function(index, value) {
							  $('input[value='+index+']').val(value); //find by value and update!
							});
						}
						noty({ type: 'success', text: 'User configuration has been saved!' });
						errorFlag = 0;
						
						//alert(data);
					}
				}
			 }).done(function() {
					$('#userSubButton').show();
					$('#savingButton').hide();
					$(".userMenuSingleSelect").multiselect('disable');
					if(!errorFlag) 
					{
						$('table').each(function(){
							if($(this).is(':visible'))
								$(this).find('.userPassTR').remove(); //now all saved users are in edit mode only
						});
						$("input[name^='uEmail']").each(function(){ $(this).addClass("preSaved"); }); //make saved input emails permanently readonly
					}
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	$(document).on("click", ".outletSave", function() {
		$(this).hide();
		$curItem = $(this).closest('table');
		$curItem.find("tr").removeClass('outletEdit');
		$curItem.find("tr").addClass('savedInput');
		$curItem.find("input").attr("readonly", "readonly");
		$curItem.find(".outletTDEdit").removeClass('hide');
		$curItem.find(".outletTDEdit").show();
		$curItem.find(".outletMenuMultiSelect").multiselect("disable");
		$curItem.css('background', 'transparent');
	});
	
	$(document).on("click", ".outletTDEdit", function() {
		$(this).hide();
		$curItem = $(this).closest('table');
		$curItem.find("tr").addClass('outletEdit');
		$curItem.find("tr").removeClass('savedInput');
		$curItem.find("input").removeAttr("readonly");
		$curItem.find(".outletSave").removeClass('hide');
		$curItem.find(".outletSave").show();
		$curItem.find(".outletMenuMultiSelect").multiselect("enable");
		$curItem.css('background', '#fafafa');
	});
	
	$(document).on("click", ".newOutlet", function() {
		//new item or duplicate?
		var dup = 0;
		if($(this).hasClass("outletDuplicate")) dup = 1;
		
		//get table outlet number
		$curTable = $(this).closest('table');
		var outletID = $curTable.attr('id');
		
		//get and update current count
		var outletCount = $("#outletCount").val();
		var newCount = parseInt(parseInt(outletCount) + 1);
		$("#outletCount").val(newCount);
		$("#outletCountAct").val(parseInt($("#outletCountAct").val())+1);
		
		if(dup) //clone an existing row
		{
			//clone specific table
			$newTab = $("#"+outletID).clone(false);
			$newTab.attr('id','outlet'+newCount);
		}
		else //clone a dummy row
		{
			//clone dummy table
			$newTab = $("#outlet0").clone(true);
			$newTab.attr('id','outlet'+newCount);
		}
		
		//replace ids with incremented value and make value = default value
		$newTab.find(".outletTR input").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
		});
		
		$newTab.find(".outletTR select").each(function() {
			if(!dup) $(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
			
			$(this).multiselect({
			   checkAllText: "Select all menus",
			   uncheckAllText: "Unselect all menus",
			   noneSelectedText: "Select menu(s) for this outlet",
			   selectedText: "# of # selected",
			   selectedList: 0
			});
		});
		
		if(!dup){
			//now we fix placeholder
			$newTab.find("input[name^=oName]").each(function() {
				var temp = $(this).val();
				$(this).val("");
				$(this).attr('placeholder', temp);
			});
		}
		else
		{
			//now we fix uID
			$newTab.find("input[name^=oID]").each(function() {
				$(this).val("");
			});
		}
				
		//now we give the item id to the duplicate button
		$newTab.find(".outletDuplicate").attr('id',"dup"+newCount);
		
		$newTab.css('backgroundColor','#fafafa');
		
		//hide it so we can animate it!
		$newTab.css('display','none');
		
		//insert before section header/before hidden div
		$(".firstOutletDiv").before($newTab); 
		$newTab.slideRow('down');
		$("html, body").animate({scrollTop: $($newTab).offset().top - ( $(window).height() - $($newTab).outerHeight(true) ) / 2}, 200);
	});
	
	$("#new_menu").on('click', function(){
		window.location.href = "/newMenu";
	});
	
	$(".outletMenuMultiSelect").multiselect({
	   checkAllText: "Select all menus",
	   uncheckAllText: "Unselect all menus",
	   noneSelectedText: "Select menu(s) for this outlet",
	   selectedText: "# of # selected",
	   selectedList: 0
	}); 
		
	$(".outletMenuMultiSelect").multiselect('disable');
	
	$(document).on("click", ".outletDelete", function() {
		//get outlet number
		$curTable = $(this).closest('table');
		outletID = $curTable.attr('id');
		
		realOutletID = $curTable.find("input[name^=oID]").val();
		
		if(typeof realOutletID =='undefined' || realOutletID == '') //event not saved in DB
		{
			noty({
				layout: 'center',
				type: 'confirm',
				text: 'Are you sure you want to delete this outlet? Note: all outlet data will be lost!',
				buttons: [
				{addClass: 'alert tiny', text: 'Yes, delete this outlet!', onClick: function($noty) {
					
					//get and update current count
					outletCount = $("#outletCountAct").val();
					newCount = parseInt(parseInt(outletCount) - 1);
					$("#outletCountAct").val(newCount);
					
					//bye-bye
					$("#"+outletID).remove();
					
					$noty.close();
				  }
				},
				{addClass: 'secondary tiny', text: 'No, go back.', onClick: function($noty) {
					$noty.close();
				  }
				}
			  ]
			});
		}
		else //event in DB
		{
			noty({
				layout: 'center',
				type: 'confirm',
				text: 'Are you sure you want to delete this outlet? Note: all outlet data will be lost!',
				buttons: [
				{addClass: 'alert tiny', text: 'Yes, delete this outlet!', onClick: function($noty) {
					
					var url = "/deleteOutlet";
					$.ajax({
						   type: "POST",
						   url: url,
						   data: 'outletID='+realOutletID, // serializes the form's elements.
						   success: function(data)
						   {
								try
								{
									var dataArray = jQuery.parseJSON(data); //parsing JSON
								}
								catch(e)
								{
									noty({
									  type: 'error',  layout: 'topCenter',
									  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
									});
									
									//alert(data);
									
									return false;
								}
									
								//get and update current count
								outletCount = $("#outletCountAct").val();
								newCount = parseInt(parseInt(outletCount) - 1);
								$("#outletCountAct").val(newCount);
								
								//bye-bye
								$("#"+outletID).remove();
								
								$noty.close();
							}
						 });
					$noty.close();
				  }
				},
				{addClass: 'secondary tiny', text: 'No, go back.', onClick: function($noty) {
					$noty.close();
				  }
				}
			  ]
			});
		}
		
	});
	
	$("#outletConfigForm").on('valid', function (event) {
		//lock all
		$("body .outletSave").each(function(){
			if($(this).is(":visible"))
				$(this).trigger('click');
		});
		
		//enable dropdowns or we wont get the values!
		$(".outletMenuMultiSelect").multiselect('enable');
		
		var url = "/saveOutlet";
		
		$('#outSubButton').hide();
		$('#savingButton').show();

		$.ajax({
			   type: "POST",
			   url: url,
			   data: $(this).serialize(), // serializes the form's elements.
			   success: function(data)
			   {
					try
					{
						var dataArray = jQuery.parseJSON(data); //parsing JSON
					}
					catch(e)
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
						});
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: dataArray['message']*/
						});
					}
					else
					{	
						noty({ type: 'success', text: 'Outlet configuration has been saved!' });
						
					}
				}
			 }).done(function() {
				$('#outSubButton').show();
				$('#savingButton').hide();
				$(".outletMenuMultiSelect").multiselect('disable');
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	$(".openDay").on('click', function(){
		$(".openDay").addClass('secondary');
		$(this).removeClass('secondary');
		
		id = $(this).attr('id');
		id = id.substring(0, id.length - 1); //delete the 'B' to get just monday, etc.
		
		$(".monday").addClass('hide');
		$(".tuesday").addClass('hide');
		$(".wednesday").addClass('hide');
		$(".thursday").addClass('hide');
		$(".friday").addClass('hide');
		$(".saturday").addClass('hide');
		$(".sunday").addClass('hide');
		
		$("."+id).removeClass('hide');
	});
	
	$("input[name^=ohStartTime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 }); 
	
	$("input[name^=ohEndTime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 }); 
	
	$("input[name^=ohStartTime]").on('changeTime',function() {
		currTime = $(this).val()+":00";
		
		newTime = extractAMPM("January 01, 2000 "+currTime);
		
		$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker('remove');
		$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
		$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker({ 'minTime': newTime, 'timeFormat': 'H:i', 'step': 15 });
		$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker('setTime', newTime);
	});
	
	$(document).on("click", '.addMoreOH', function(){
		$oldDiv = $(this).parents('.openingHoursDiv').find('.openHWrapper:first');
		$newDiv = $oldDiv.clone(false);
		
		$newDiv.find('input').each(function(){
			$(this).val('');
			$(this).timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
		});
		
		$newDiv.find("input[name^=ohStartTime]").on('changeTime',function() {
			currTime = $(this).val()+":00";
			
			newTime = extractAMPM("January 01, 2000 "+currTime);
			
			$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker('remove');
			$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
			$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker({ 'minTime': newTime, 'timeFormat': 'H:i', 'step': 15 });
			$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker('setTime', newTime);
		});
		
		$newDiv.find('.removeOHDiv').show();
		
		//hide it so we can animate it!
		$newDiv.css('display','none');
		
		//insert at the end of the list
		$(this).parents('.openingHoursDiv').find('.openHWrapper:last').after($newDiv);
		$newDiv.slideDown();
	});
	
	$(document).on("click", '.removeOH', function(){
		$ele = $(this).parents('.openHWrapper');
		
		$ele.slideUp();
		
		$ele.remove();
	});
	
	$(document).on("click", ".applyTimesAllDays", function(){
		id = ($(this).parents('div.applyAllDiv')).attr('id');
		id = id.substring(0, id.length - 1); //delete the 'C' to get just monday, etc.
		
		//get data for this day
		$data = $("."+id).clone(true,true);
		
		openData = new Array();
		closeData = new Array();
		
		openCounter = 0;
		closeCounter = 0;
		
		$data.find('input[name^=ohStartTime]').each(function(){
			openData[openCounter] = $(this).val();
			openCounter++;
		});
		
		$data.find('input[name^=ohEndTime]').each(function(){
			closeData[closeCounter] = $(this).val();
			closeCounter++;
		});
		
		$("body").find('.openingHoursDiv').each(function(){
			if(!($(this).hasClass(id)))
			{
				$(this).empty();
				$(this).append($data.html());
				
				openCounter = 0;
				closeCounter = 0;
				
				newID = $(this).attr('id');
				
				$(this).find('.openHWrapper').each(function(){
				
					$(this).find('input').each(function(){
						$(this).timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
						var tempName = $(this).attr('name');
						var newName = tempName.replace(id, newID);
						$(this).attr('name', newName);
					});
					
					$(this).find('input[name^=ohStartTime]').each(function(){
						$(this).val(openData[openCounter]);
						openCounter++;
					});
					
					$(this).find('input[name^=ohEndTime]').each(function(){
						$(this).val(closeData[closeCounter]);
						$(this).timepicker({ 'minTime': closeData[closeCounter], 'timeFormat': 'H:i', 'step': 15 });
						closeCounter++;
					});
					
					$(this).find("input[name^=ohStartTime]").each(function(){
						$(this).on('changeTime',function() {
							currTime = $(this).val()+":00";
							
							newTime = extractAMPM("January 01, 2000 "+currTime);
							
							$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker('remove');
							$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 });
							$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker({ 'minTime': newTime, 'timeFormat': 'H:i', 'step': 15 });
							$(this).parent().next("div").children("input[name^=ohEndTime]").timepicker('setTime', newTime);
						});
					});
				});
			}
		});
		
		//notify!
		noty({
			type: 'success',
			text: 'These times have been applied to all days!'
		});
	});
	
	$("#nonEventConfigForm").on('invalid', function (event) {
		noty({
		  type: 'error',  layout: 'topCenter',
		  text: "We still need some more information. Don't forget to fill out the remaining days of the week!" /*text: dataArray['message']*/
		});
	});
	
	$("#nonEventConfigForm").on('valid', function (event) {
		var url = "/saveHours";
		
		$('#ohSubButton').hide();
		$('#savingButton').show();

		$.ajax({
			   type: "POST",
			   url: url,
			   data: $(this).serialize(), // serializes the form's elements.
			   success: function(data)
			   {
					try
					{
						var dataArray = jQuery.parseJSON(data); //parsing JSON
					}
					catch(e)
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
						});
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." /*text: dataArray['message']*/
						});
					}
					else
					{	
						noty({ type: 'success', text: 'All times has been saved!' });
						if($('#redirectFlag').val()=='1') setTimeout(function(){window.location.replace("/payment");}, 1000);
					}
				}
			}).done(function() {
				if($('#redirectFlag').val()!='1') $('#ohSubButton').show();
				$('#savingButton').hide();
			 });
			 

		return false; // avoid to execute the actual submit of the form.
	});
	
	$(document).on("click", ".newMD", function() {
		//get and update current count
		var mdCount = $("#mdCount").val();
		var newCount = parseInt(parseInt(mdCount) + 1);
		$("#mdCount").val(newCount);
		$("#mdCountAct").val(parseInt($("#mdCountAct").val())+1);
		
		$newOCount = $("#md0_secCount").clone(true);
		$newOCount.attr('id','md'+newCount+'_secCount');
		$newOCount.attr('name','md'+newCount+'_secCount');
		$newOCountAct = $("#md0_secCountAct").clone(true);
		$newOCountAct.attr('id','md'+newCount+'_secCountAct');
		$newOCountAct.attr('name','md'+newCount+'_secCountAct');
		$("#md0_secCountAct").after($newOCountAct);
		$("#md0_secCountAct").after($newOCount);
		
		//clone dummy table
		$newTab = $("#md0").clone(true);
		$newTab.attr('id','md'+newCount);
		
		//replace ids with incremented value and make value = default value
		$newTab.find(".mdTR input, .mdTR select").each(function() {
			//$(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
		});
		
		//replace ids with incremented value and make value = default value
		$newTab.find(".mdTDIName input").each(function() {
			$(this).val( $(this).prop("defaultValue") );
			var tempName = $(this).attr('name');
			var newName = tempName.replace(/\[\d+\]/gi, "["+newCount+"]");
			$(this).attr('name', newName);
		});
		
		//replace ids with incremented value
		$newTab.find(".optionTR span").each(function() {
			var tempName = $(this).attr('id');
			var newName = tempName.replace(/\d+_item/gi, newCount+'_item');
			$(this).attr('id', newName);
		});
		
		//now we fix placeholder
		$newTab.find("input[name^=mdName]").each(function() {
			var temp = $(this).val();
			$(this).val("");
			$(this).attr('placeholder', temp);
		});
		
		//now we fix placeholder
		$newTab.find("input[name^=mdPrice]").each(function() {
			var temp = $(this).val();
			$(this).val("");
			$(this).attr('placeholder', temp);
		});
		
		//now we fix placeholder
		$newTab.find("input[name^=mdTPrice]").each(function() {
			var temp = $(this).val();
			$(this).val("");
			$(this).attr('placeholder', temp);
		});
		
		//add id
		$newTab.find("input[name^=mdID]").each(function() {
			$(this).val('mid'+newCount);
		});
		
		//add autocomplete
		$newTab.find("input[name^=iMD]").autocomplete({ source: [ "Choose a main","Choose a side","Choose a drink","Choose a curry","Choose a burger" ], delay: 10, minLength: 0, position: { my: "left top", at: "left bottom", collision: "none", of: $newTab.find("input[name^=iMD]") } });
		
		$newTab.find('.modifierRow').remove();
		$newTab.find('.mdEdit.optionTR').remove();
		
		$newTab.css('backgroundColor','#fafafa');
		$newTab.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
		$newTab.find('tr').css('border-bottom','0px');
		$newTab.css('max-width', '100%'); 	
		
		//hide it so we can animate it!
		$newTab.css('display','none');
		$newTab.find('select[name^=mdSec]').hide();
		
		//insert after section header/before hidden div
		$(".dynamicDataTable table").last().after($newTab); 
		
		$($newTab).slideRow('down');
		
		$newTab.find('.mdTR select').each(function(){
			$(this).addClass('mdSecSingleSelect');
			$(this).multiselect({
			   multiple: false,
			   header: false,
			   noneSelectedText: "Where should this meal deal appear?",
			   selectedList: 1
			}); 
		});
		
		$("html, body").animate({scrollTop: $($newTab).offset().top - ( $(window).height() - $($newTab).outerHeight(true) ) / 2}, 200);
		
		$newTab.find('.newMDSection').trigger('click');
	});
	
	$(document).on("click", ".mdSectionDelete", function(){
		//get table id
		mdID = $(this).closest('table').attr('id');
		mdIDOnly = mdID.replace('md','');
			
		//update count
		$('#'+mdID+'_secCountAct').val(parseInt($('#'+mdID+'_secCountAct').val())-1);
		
		//byebye
		$(this).parents('.subHeaderTR').first().next().remove();
		$(this).parents('.subHeaderTR').first().remove();
	});
	
	$(document).on("click", ".newMDSection", function(){
		
		//get table id
		mdID = $(this).closest('table').attr('id');
		mdIDOnly = mdID.replace('md','');
		
		//update count
		var newCount = parseInt($('#'+mdID+'_secCount').val())+1;
		$('#'+mdID+'_secCount').val(newCount);
		
		$('#'+mdID+'_secCountAct').val(parseInt($('#'+mdID+'_secCountAct').val())+1);
		
		//start cloning subheader and fixing names
		$subHead = $('#md0').find('.subHeaderTR').clone(false);
		$subHead.find('.mdSubheader h6').html($('.deleteDummy').html());
		$subHead.find('input, select').each(function(){
			var tempName = $(this).attr('name');
			var newName  = tempName.replace(/\[\d+\]/gi, "["+mdIDOnly+"]");
			newName = newName.replace(/\[s\d+\]/gi, "[s"+newCount+"]");
			$(this).attr('name', newName);
			
		});
		$subHead.find('input[name^=iMD]').autocomplete({ source: [ "Choose a main","Choose a side","Choose a drink","Choose a curry","Choose a burger"], delay: 10, minLength: 0 });
		$subHead.find('input[name^=iMD]').attr('required','required');
		
		//start cloning options and fixing names
		$opts = $('#md0').find('.mdEdit.optionTR').clone(false);
		$opts.find('input[name^=mdItems]').each(function(){
			var tempName = $(this).attr('name');
			var newName  = tempName.replace(/\[\d+\]/gi, "["+mdIDOnly+"]");
			newName = newName.replace(/\[s\d+\]/gi, "[s"+newCount+"]");
			$(this).attr('name', newName);
		});
		
		$opts.find('.mdTDIName label span').each(function(){
			var tempName = $(this).attr('id');
			var newName  = tempName.replace(/\d+_item/gi, newCount+"_item");
			$(this).attr('id', newName);
		});
		
		//get position
		$currTR = $(this).parents('.subHeaderTR').first();
		
		//hide so we can animate them
		$subHead.hide();
		$opts.hide();
		
		$currTR.before($subHead).before($opts);
		
		//show!
		$subHead.slideRow('down');
		$opts.show();
		$subHead.find('.modifierRow').fadeIn('slow');
		
		//now for the dropdown as it needs to be done after show
		$subHead.find('select[name^=iMDType]').each(function(){
			$(this).addClass('mdMenuSingleSelect');
			$(this).multiselect({
			   multiple: false,
			   header: false,
			   noneSelectedText: "Choose a menu section",
			   selectedList: 1
			}); 
			$(this).attr('required','required');
		}); 
		
		$(document).foundation('abide', 'events');
	});
	
	$(document).on("click", ".newmdItem", function(){
		
		if($(this).find('i').hasClass('pd-add')) //add
		{
			$(this).find('i').removeClass('pd-add');
			$(this).find('i').addClass('pd-delete');
			$(this).find('i').parent().addClass('secondary');
			
			$theSpan = $(this).closest(".mdItemName").find('span');
			
			//add price
			/*$tempEl = $(this).closest(".mdTable").find('.mdTDTPrice input');
			temp = parseFloat($tempEl.val());
			$theSpan = $(this).closest(".mdItemName").find('span');
			currentPrice = parseFloat($theSpan.attr('data-value'));
			temp = parseFloat(temp + currentPrice).toFixed(2);
			$tempEl.val(temp);*/
			
			//add id to list
			$mdItems = $(this).parents(".mdTDIName").first().find("input[name^=mdItems]");
			allIDs = $mdItems.val();
			thisID = $theSpan.attr('id');
			thisID = thisID.replace(/\d+_item_/gi, "");
			allIDs = allIDs + thisID + ";";
			$mdItems.val(allIDs);
		}
		else
		{
			$(this).find('i').removeClass('pd-delete');
			$(this).find('i').addClass('pd-add');
			$(this).find('i').parent().removeClass('secondary');
			
			$theSpan = $(this).closest(".mdItemName").find('span');
			
			//subtract price
			//$tempEl = $(this).closest(".mdTable").find('.mdTDTPrice input');
			//temp = parseFloat($tempEl.val());
			//$theSpan = $(this).closest(".mdItemName").find('span');
			//currentPrice = parseFloat($theSpan.attr('data-value'));
			//temp = parseFloat(temp - currentPrice).toFixed(2);
			//$tempEl.val(temp);
			
			//remove id from list
			$mdItems = $(this).closest("td.mdTDIName").find("input[name^=mdItems]");
			allIDs = $mdItems.val();
			thisID = $theSpan.attr('id');
			thisID = thisID.replace(/\d+_item_/gi, "");
			allIDs = allIDs.replace(thisID+";", "");
			$mdItems.val(allIDs);
		}
	});
	
	$(document).on("click", ".mdDelete", function() {
		//get event number
		$curTable = $(this).closest('table');
		mdID = $curTable.attr('id');
		
		realmdID = $curTable.find("input[name^=mdID]").val();
		
		if(typeof realmdID =='undefined' || realmdID == '' || !realmdID.match(/^\d+$/)) //event not saved in DB
		{
			noty({
				layout: 'center',
				type: 'confirm',
				text: 'Are you sure you want to delete this meal deal? Note: all associated data will be lost!',
				buttons: [
				{addClass: 'alert tiny', text: 'Yes, delete this meal deal!', onClick: function($noty) {
					
					//get and update current count
					mdCount = $("#mdCountAct").val();
					newCount = parseInt(parseInt(mdCount) - 1);
					$("#mdCountAct").val(newCount);	
					
					//bye-bye
					$("#"+mdID).remove();
					
					$noty.close();
				  }
				},
				{addClass: 'secondary tiny', text: 'No, go back.', onClick: function($noty) {
					$noty.close();
				  }
				}
			  ]
			});
		}
		else //event in DB
		{
			noty({
				layout: 'center',
				type: 'confirm',
				text: 'Are you sure you want to delete this meal deal? Note: all associated data will be lost!',
				buttons: [
				{addClass: 'alert tiny', text: 'Yes, delete this meal deal!', onClick: function($noty) {
					
					var url = "/deleteMealDeal";
					$.ajax({
						   type: "POST",
						   url: url,
						   data: 'mdID='+realmdID, // serializes the form's elements.
						   success: function(data)
						   {
								try
								{
									var dataArray = jQuery.parseJSON(data); //parsing JSON
								}
								catch(e)
								{
									noty({
									  type: 'error',  layout: 'topCenter',
									  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
									});
									
									//alert(data);
									
									return false;
								}
									
								//get and update current count
								mdCount = $("#mdCountAct").val();
								newCount = parseInt(parseInt(mdCount) - 1);
								$("#mdCountAct").val(newCount);
								
								//bye-bye
								$("#"+mdID).remove();
							}
						 });
					$noty.close();
				  }
				},
				{addClass: 'secondary tiny', text: 'No, go back.', onClick: function($noty) {
					$noty.close();
				  }
				}
			  ]
			});
		}
		
	});
	
	$(document).on("click", ".mdSave", function() {
		$(this).hide();
		$curItem = $(this).closest('table');
		$curItem.find("tr").removeClass('mdEdit');
		$curItem.find("tr").addClass('savedInput');
		$curItem.find("input").attr("readonly", "readonly");
		$curItem.find(".mdTDEdit").removeClass('hide');
		$curItem.find(".mdTDEdit").show();
		$curItem.find(".subHeaderTR").slideRow('up');
		$curItem.find(".optionTR").slideRow('up');
		$curItem.find(".modifierRow").hide();
		$curItem.find(".mdTR select").multiselect("disable");
		$curItem.css('background', 'transparent');
		$curItem.css('box-shadow', '0px 0px 0px');
		$curItem.css('max-width', '100%'); 
		$curItem.find('tr').first().css('border-bottom','1px solid #B9BBBD');
	});
	
	$(document).on("click", ".mdTDEdit, .mdTR input[readonly='readonly']", function() {
	
		if($(this).hasClass('mdTDEdit')) $(this).hide();
		else $(this).closest('table').find('.mdTDEdit').hide();

		$curItem = $(this).closest('table');
		$curItem.find("tr").addClass('mdEdit');
		$curItem.find("tr").removeClass('savedInput');
		$curItem.find("input").removeAttr("readonly");
		//$curItem.find("input[name^=mdTPrice]").attr("readonly", "readonly"); //this is always readonly
		$curItem.find(".mdSave").removeClass('hide');
		$curItem.find(".mdSave").show();
		$curItem.find(".mdTR select").multiselect("enable");
		$curItem.find(".optionTR").slideRow('down');
		$curItem.find(".subHeaderTR").slideRow('down');
		$curItem.find(".modifierRow").fadeIn('slow');
		$curItem.css('background', '#fafafa');
		$curItem.css('box-shadow', 'rgba(70, 83, 93, 0.54902) 0px 0px 6px inset');
		$curItem.css('max-width', '100%'); 
		$curItem.find('tr').css('border-bottom','0px');
		
		$curItem.find('select[name^=iMDType]').each(function(){ //reinitialize to get the right width
			$(this).multiselect({
				   multiple: false,
				   header: false,
				   noneSelectedText: "Choose a menu section",
				   selectedList: 1
				}); 
		});
		
		$curItem.find('.mdTDIName label span').each(function() {
			var curHeight = ($(this).actual('height')).toString();
			curHeight = parseInt(curHeight.replace('px',''));
			
			if(curHeight < 39 && !$(this).hasClass('alreadyApplied'))
			{	
				$(this).css('padding-top', '10px');
			}
			
			$(this).addClass('alreadyApplied'); //pass through only once
		});
		
	});
	
	$(document).on("change",'select[name^=iMDType]', function(){
		var selectedID = $(this).selected().val();
		$loc = $(this).parent().parent().next();
		if(selectedID == 'all')
		{
			$loc.find('label').hide();
			$loc.find('label').show();
		}
		else
		{
			$loc.find('label').hide();
			$loc.find('label.sec'+selectedID).show();
		}
		
		$(this).parent().parent().next().find('.mdTDIName label span').each(function() {
			var curHeight =  ($(this).actual('height')).toString();
			curHeight = parseInt(curHeight.replace('px',''));
			
			if(curHeight < 39 && !$(this).hasClass('alreadyApplied'))
			{	
				$(this).css('padding-top', '10px');
			}
			
			$(this).addClass('alreadyApplied'); //pass through only once
		});
		
	});
	
	$('.mdSecSingleSelect').multiselect({
	   multiple: false,
	   header: false,
	   noneSelectedText: "Where should this meal deal appear?",
	   selectedList: 1
	}); 
	
	$('.mdMenuSingleSelect').multiselect({
	   multiple: false,
	   header: false,
	   noneSelectedText: "Choose a menu section",
	   selectedList: 1
	}); 
	
	$('.mdSecSingleSelect').multiselect('disable');
		
	$("#mealDealConfigForm").on('valid', function (event) {
		//prevent multiple submissions
		var newSubmitTime = new Date().getTime();
		
		if( (newSubmitTime - submitTime) > 300 )
		{
			//lock all
			$("body .mdSave").each(function(){
				if($(this).is(":visible"))
					$(this).trigger('click');
			});
		
			var url = "/saveMealDeal";
			
			$('#mdSubButton').hide();
			$('#savingButton').show();
			
			//enable dropdowns or we wont get the values!
			$(".mdSecSingleSelect").multiselect('enable');
			
			$.ajax({
				   type: "POST",
				   url: url,
				   data: $(this).serialize(), // serializes the form's elements.
				   success: function(data)
				   {
						try
						{
							var dataArray = jQuery.parseJSON(data); //parsing JSON
						}
						catch(e)
						{
							noty({
							  type: 'error',  layout: 'topCenter',
							  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
							});
							//alert(data);
							return false;
						}
						
						if( typeof dataArray['status'] !='undefined' || (typeof dataArray['result'] !='undefined' && typeof dataArray['result']['status'] !='undefined') ) //error
						{
							noty({
							  type: 'error',  layout: 'topCenter',
							  text: "Sorry, but there's been an error processing your request." /*text: dataArray['message']*/
							});
						}
						else
						{	
							newIDs = dataArray['update'];

							if(Object.keys(newIDs).length > 0) //this is an object not array so length and stuff works differently
							{
								$.each(newIDs, function(index, value) {
								  $('input[value='+index+']').val(value); //find by value and update!
								});
							}
							
							noty({ type: 'success', text: 'All changes has been saved!' });
						}
					}
				}).done(function() {
					$('#mdSubButton').show();
					$('#savingButton').hide();
					$(".mdSecSingleSelect").multiselect('disable');
				 });
		}
		
		//update Time
		submitTime = new Date().getTime();
		return false; // avoid to execute the actual submit of the form.
	});
	
	// Twitter App
	$(".twitterfeed").tweet({
		username: "PreoDay",
		modpath: 'js/twitter_app/index.php',
		join_text: "auto",
		avatar_size: 48,
		count: 2,
		// auto_join_text_default: "we said,",
		// auto_join_text_ed: "we",
		// auto_join_text_ing: "we were",
		// auto_join_text_reply: "we replied to",
		// auto_join_text_url: "we were checking out"
		auto_join_text_default: "",
		auto_join_text_ed: "",
		auto_join_text_ing: "",
		auto_join_text_reply: "",
		auto_join_text_url: ""
	  });
	  
	$(".showNextPhone, .phoneContainer").on('click', function(){
		if(!$(".phone2").is(':visible'))
		{
			$(".phone1").hide();
			$(".phone2").show();
		}
		else
		{
			$(".phone2").hide();
			$(".phone1").show();
		}
		
		$(".phone1pager").toggle();
		$(".phone2pager").toggle();
	});
	
	$("#changePassTrigger").on('click', function(e) {
		if(!$("#passDiv").is(":visible"))
		{
			$("#passDiv").slideDown();
			$(".passField").attr('required','required');
			$("#passFlag").val(1);
		}
		else
		{
			$("#passDiv").slideUp();
			$(".passField").removeAttr('required');
			$("#passFlag").val(0);
		}
		
	});
	
	$(document).on("click", ".deleteMenu", function() {
		//get menu id
		menuID = $(this).attr('id');
		
		menuID = menuID.replace('dmi-','');
		
		noty({
			layout: 'center',
			type: 'confirm',
			text: 'Are you sure you want to delete this menu? Note: all menu data will be lost!',
			buttons: [
			{addClass: 'alert tiny', text: 'Yes, delete this menu!', onClick: function($noty) {
				
				var url = "/deleteMenu";
				$.ajax({
					   type: "POST",
					   url: url,
					   data: 'menuID='+menuID, // serializes the form's elements.
					   success: function(data)
					   {
							try
							{
								var dataArray = jQuery.parseJSON(data); //parsing JSON
							}
							catch(e)
							{
								noty({
								  type: 'error',  layout: 'topCenter',
								  text: "Sorry, but there's been an error processing your request." /*text: 'Connection Error! Check API endpoint.'*/
								});
								
								//alert(data);
								
								return false;
							}

							//bye-bye
							$("#p-"+menuID).remove();
						}
					 });
				$noty.close();
			  }
			},
			{addClass: 'secondary tiny', text: 'No, go back.', onClick: function($noty) {
				$noty.close();
			  }
			}
		  ]
		});
	});
	
	$("#settingsForm").on('valid', function (event) {
		var url = "/saveProfile";
		$.ajax({
			   type: "POST",
			   url: url,
			   data: $(this).serialize(), // serializes the form's elements.
			   success: function(data)
			   {
					try
					{
						var dataArray = jQuery.parseJSON(data); //parsing JSON
					}
					catch(e)
					{
						noty({
						  type: 'error',  layout: 'topCenter',
						  text: "Sorry, but there's been an error processing your request." //text: 'Connection Error! Check API endpoint.'
						});
						//alert(data);
						return false;
					}
					
					if(typeof dataArray['status'] !='undefined') //error
					{
						if($('#passFlag').val()=='1')
						{
							noty({
							  type: 'error',  layout: 'topCenter',
							  text: "Sorry, incorrect password." //text: dataArray['message']
							});
						}
						else
						{
							noty({
							  type: 'error',  layout: 'topCenter',
							  text: "Sorry, but there's been an error processing your request." //text: dataArray['message']
							});
						}
					}
					else
					{	
						if($('#passFlag').val()=='1')
						{
							noty({ type: 'success', text: 'Settings and Password has been saved!<br/>You will need to log in again with your new password to continue.' });
							setTimeout(function(){window.location.replace("/logout");}, 2500);
						}
						else
						{
							noty({ type: 'success', text: 'Settings have been saved!' });
						}
					}
				}
			 });

		return false; // avoid to execute the actual submit of the form.
	});
	
	$(".moreSelect").multiselect({
	   noneSelectedText: "Please select features you require",
	   selectedText: "# of # selected",
	   checkAllText: "Select all",
	   uncheckAllText: ""
	}); 
	
	$("#moreForm").on('valid', function (event) {
		var url = "/sendForm";
		$.ajax({
		   type: "POST",
		   url: url,
		   data: $(this).serialize(), // serializes the form's elements.
		   success: function(data)
		   {
				$('#moreForm').hide();
				$('#thankyouArea').fadeIn('fast');
			}
		 });
		return false; // avoid to execute the actual submit of the form.
	});
	
	//google+ consent
	$('.g-signin').on('click', function(){
		$('#userConsent').val('1');
	});
	
	//go Demo
	$('#goDemo').on('click', function(){
		var url = "/goDemo";
		$.ajax({
		   type: "POST",
		   url: url,
		   success: function(data)
		   {
				setTimeout(function(){window.location.replace("/dashboard");}, 100);
			}
		 });
		return false; // avoid to execute the actual submit of the form.
	});
	
	//skip stripe connect
	$('#skipStripe').on('click', function(){
		var url = "/skipStripe";
		$.ajax({
		   type: "POST",
		   url: url,
		   success: function(data)
		   {
				setTimeout(function(){window.location.replace("/dashboard");}, 100);
			}
		 });
		return false; // avoid to execute the actual submit of the form.
	});
	
	//back to stripe connect
	$('#startStripe').on('click', function(){
		var url = "/startStripe";
		$.ajax({
		   type: "POST",
		   url: url,
		   success: function(data)
		   {
				setTimeout(function(){window.location.replace("/payment");}, 100);
			}
		 });
		return false; // avoid to execute the actual submit of the form.
	});
	
	//go Offline
	$('.goOffline').on('click', function(){
		$('#offFlag').val(1);
		$('#finishForm').submit();
	});
});

//functions to update phone/app preview
function updateTextColour(color)
{
	$("#appHeading").css('color', '#'+color);
	$("#venSubHeading").css('color', '#'+color);
	$("#subHeading").css('color', '#'+color);
}
function updateButtonColour(color)
{
	$("#buttonIMG").css('background', '#'+color);
}
function updateButtonTextColour(color)
{
	$("#buttonIMG").css('color', '#'+color);
}
function updateButton2Colour(color)
{
	$("#buttonIMG2").css('background', '#'+color);
}
function updateButton2TextColour(color)
{
	$("#buttonIMG2").css('color', '#'+color);
}
function updateButton3Colour(color)
{
	$(".menuMultiButton").css('background', '#'+color);
}
function updateButton3TextColour(color)
{
	$(".menuMultiButton").css('color', '#'+color);
}

//reset button in venueconfig form
function clearMapInput() {
	$("#vSug").val('');
	$("#vName").val('');
	$("#vAdd").val('');
	$("#vPostal").val('');
	$("#vCountry").prop('selectedIndex', 0);
	$("#vCountry").next('.custom.dropdown').find('li.selected').removeClass('selected');
	$("#vCountry").next('.custom.dropdown').find('li:first').addClass('selected');
	$("#vCountry").next('.custom.dropdown').find('a.current').html('United Kingdom');
	$("#vCode").val('(0, 0)');
	if (typeof marker != 'undefined') marker.setMap(null);
}

//search for key in array
function searchArray(string,array){
    var match = false;
    arrLength = array.length;
	while(arrLength--) 
	{
	   if (string.indexOf(array[arrLength])!=-1)
	   match = true;
	}
	return match;
}

function extractAMPM(date) {
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
        h = hh-12;
        dd = "PM";
    }
    if (h == 0) {
        h = 12;
    }
    m = m<10?"0"+m:m;

    s = s<10?"0"+s:s;

    /* if you want 2 digit hours:
    h = h<10?"0"+h:h; */

    var pattern = new RegExp("0?"+hh+":"+m+":"+s);

    var replacement = h+":"+m;
    /* if you want to add seconds
    replacement += ":"+s;  */
    replacement += " "+dd;    

    //return date.replace(pattern,replacement);
	return(replacement);
}

//On window resize
//map resizing with window
$(window).resize(function(){
	if($("#map").length > 0)
	{
		google.maps.event.trigger(map, 'resize');
		if (typeof place != 'undefined') map.setCenter(place.geometry.location);
			else map.setCenter( new google.maps.LatLng(mapDefaultCenterLat,mapDefaultCenterLong) );
	}
});
