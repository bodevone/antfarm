!function(e){function t(t){for(var r,l,s=t[0],a=t[1],c=t[2],f=0,d=[];f<s.length;f++)l=s[f],Object.prototype.hasOwnProperty.call(o,l)&&o[l]&&d.push(o[l][0]),o[l]=0;for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r]);for(u&&u(t);d.length;)d.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,s=1;s<n.length;s++){var a=n[s];0!==o[a]&&(r=!1)}r&&(i.splice(t--,1),e=l(l.s=n[0]))}return e}var r={},o={0:0},i=[];function l(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=e,l.c=r,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)l.d(n,r,function(t){return e[t]}.bind(null,r));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="";var s=window.webpackJsonp=window.webpackJsonp||[],a=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=a;i.push([122,1]),n()}({122:function(e,t,n){n(123),e.exports=n(309)},309:function(e,t,n){"use strict";n.r(t),function(e){var t=n(38);n(319),n(320),n(321);function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var l,s=e[Symbol.iterator]();!(r=(l=s.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==s.return||s.return()}finally{if(o)throw i}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var i=new t.Canvas("c");i.selection=!1,i.setDimensions({width:window.innerWidth,height:window.innerHeight});var l={},s={},a={ants:1},c=!1,u=0,f=!1;function d(e,n,r){var o=new t.Circle({radius:50,fill:r,left:e,top:n,id:u});console.log(o),o.hasControls=!1,o.lines1=[],o.lines2=[],i.add(o),i.bringToFront(o),l[u]=o,0!=u&&1!=u&&i.setActiveObject(o),u++,function(e){e.on("mousedown",(function(n){if(c&&c!=e){var r=p(c.id,e.id);if(console.log(s),!(r in s)){if(c.id<e.id){var o=new t.Line([c.left+50,c.top+50,e.left+50,e.top+50],{stroke:"#747474",strokeWidth:10,id:r});c.lines1.push(o),e.lines2.push(o)}else{o=new t.Line([e.left+50,e.top+50,c.left+50,c.top+50],{stroke:"#747474",strokeWidth:10,id:r});e.lines1.push(o),c.lines2.push(o)}o.room1=e,o.room2=c,console.log(o),o.lockMovementX=!0,o.lockMovementY=!0,o.lockScalingX=!0,o.lockScalingY=!0,o.lockUniScaling=!0,o.lockRotation=!0,o.hasControls=!1,i.add(o),i.sendToBack(o);var l=p(c.id,e.id);s[l]=o,c=!1,i.discardActiveObject(),i.requestRenderAll()}}else c=e}))}(o)}function p(e,t){var n=e.toString(),r=t.toString();return e<t?n+r:r+n}function v(e){i.remove(e);var t=e.room1,n=e.room2;t.lines1=t.lines1.filter((function(t){return t.id!==e.id})),t.lines2=t.lines2.filter((function(t){return t.id!==e.id})),n.lines1=n.lines1.filter((function(t){return t.id!==e.id})),n.lines2=n.lines2.filter((function(t){return t.id!==e.id})),delete s[e.id]}d(300,200,"#FF652F"),d(700,200,"#FF652F"),document.getElementById("add-room").addEventListener("click",(function(){f?h("Animation in progress"):d(500,200,"#FFE400")})),i.on("mouse:up",(function(e){var t=e.target;t?"circle"!=t.type&&(c=!1):c=!1})),i.on("object:moving",(function(e){var t=e.target,n=0,r=0;t.lines1&&(n=t.lines1.length),t.lines2&&(r=t.lines2.length);for(var o=Math.max(n,r),l=0;l<o;l++)t.lines1[l]&&t.lines1[l].set({x1:t.left+50,y1:t.top+50}),t.lines1[l]&&t.lines1[l].setCoords(),t.lines2[l]&&t.lines2[l].set({x2:t.left+50,y2:t.top+50}),t.lines2[l]&&t.lines2[l].setCoords();i.renderAll()})),document.getElementById("rangePicker").addEventListener("input",(function(e){var t=e.target.value;a.ants=parseInt(t),document.getElementById("ants").textContent=t})),document.getElementById("delete").addEventListener("click",(function(){if(f)h("Animation in progress");else{var e=i.getActiveObject();if(e)if("line"==e.type)v(e);else if(0==e.id||1==e.id)h("Cannot delete main rooms");else{if(i.remove(e),c=!1,delete l[e.id],e.lines1)for(var t=0;t<e.lines1.length;t++)v(e.lines1[t]);if(e.lines2)for(t=0;t<e.lines2.length;t++)v(e.lines2[t])}else h("No object selected")}}));var m={};console.log(e.env.SERVER),document.getElementById("start").addEventListener("click",(function(){if(f)h("Animation in progress");else{for(var e in console.log(a),a.rooms=[],l)a.rooms.push(parseInt(e));for(var n in a.connections=[],s)a.connections.push(n);console.log(a),fetch("http://165.22.28.236:8080/algo",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then((function(e){return e.json()})).then((function(e){console.log("Success:",e),m=e,function(){if(m.Error)h(m.ErrorMessage);else{console.log(m.Steps),f=!0,function(){for(var e in l)l[e].hasControls=!1,l[e].evented=!1;for(var t in s)s[t].hasControls=!1,s[t].evented=!1}();for(var e=l[0].left+50-20,n=l[0].top+50-20,r=0;r<a.ants;r++){var o=new t.Circle({radius:20,fill:"#14A76C",left:e,top:n,hasControls:!1,evented:!1});y[r+1]=o,b[r+1]=l[0],i.add(o)}for(r=0;r<=m.Steps.length;r++)S.push(!1);setTimeout(w(0),1e3)}}()})).catch((function(e){console.error("Error:",e),h("Error from server")}))}}));var g=!1;function h(e){if(!g){g=!0;var t=document.createElement("span");t.classList.add("tag","is-large","is-warning");var n=document.createTextNode(e);t.appendChild(n);var r=document.getElementById("show");r.appendChild(t),r.style.position="absolute",r.style.left="50%",r.style.zIndex=100,r.style.paddingTop="5em",setTimeout((function(){var e=1,n=setInterval((function(){e<=.1&&(clearInterval(n),t.remove(),r.removeAttribute("style"),g=!1),t.style.opacity=e,t.style.filter="alpha(opacity="+100*e+")",e-=.1*e}),30)}),2e3)}}var y={},b={},S=[];function w(e){var t=0;for(var n in m.Steps[e])t++;for(var o=0,i=0,l=Object.entries(m.Steps[e]);i<l.length;i++){var s=r(l[i],2);j(s[0],s[1],e,++o==t)}}function j(e,n,o,c){var u=b[e].left+50-20,d=b[e].top+50-20,p=l[n].left+50-20,v=l[n].top+50-20,g=(p-u)/100,h=(v-d)/100;t.util.animate({startValue:0,endValue:100,duration:1e3,onChange:function(t){var n=g*t,r=h*t;y[e].set({left:u+n,top:d+r}),c&&(y[e].setCoords(),i.renderAll())},onComplete:function(){if(m.Steps[o]&&!S[o]){for(var e=0,t=Object.entries(m.Steps[o]);e<t.length;e++){var n=r(t[e],2),c=n[0],u=n[1];b[c]=l[u]}S[o]=!0,m.Steps[o+1]?setTimeout(w(o+1),1e3):function(){f=!1,function(){for(var e in l)l[e].evented=!0;for(var t in s)s[t].evented=!0}();for(var e=0;e<a.ants;e++)i.remove(y[e+1]);y={},b={},S=[]}()}}})}}.call(this,n(310))},316:function(e,t){},317:function(e,t){},318:function(e,t){},319:function(e,t,n){},320:function(e,t,n){},321:function(e,t,n){"use strict";n.p}});