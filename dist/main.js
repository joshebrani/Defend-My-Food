!function(){"use strict";var t=50;function e(e){e.fillStyle="#7cfc00",e.fillRect(0,t,canvas.width-200,t),e.fillStyle="#7cfc00",e.fillRect(canvas.width-200,t,t,canvas.height-100),e.fillStyle="#7cfc00",e.fillRect(t,canvas.height-100,canvas.width-200,t),e.fillStyle="#7cfc00",e.fillRect(t,200,t,300),e.fillStyle="#7cfc00",e.fillRect(t,200,550,t),e.fillStyle="#7cfc00",e.fillRect(550,200,t,200)}function i(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var n={x:void 0,y:void 0,width:.1,height:.1},h=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.canvas=document.getElementById("canvas"),this.ctx=this.canvas.getContext("2d"),this.x=e,this.y=i,this.width=50,this.height=50,this.canvas.addEventListener("mousemove",(function(t){n.x=t.offsetX,n.y=t.offsetY})),this.canvas.addEventListener("mouseleave",(function(){n.x=void 0,n.y=void 0}))}var e,h;return e=t,(h=[{key:"draw",value:function(){n.x&&n.y&&function(t,e){if(!(t.x>e.x+e.width||t.x+t.width<e.x||t.y>e.y+e.height||t.y+t.height<e.y))return!0}(this,n)&&(this.ctx.strokeStyle="red",this.ctx.strokeRect(this.x,this.y,this.width,this.height))}}])&&i(e.prototype,h),t}();function a(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var l=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.canvas=document.getElementById("canvas"),this.ctx=this.canvas.getContext("2d"),this.x=e,this.y=i,this.width=50,this.height=50,this.shooting=!1,this.projectiles=[]}var e,i;return e=t,(i=[{key:"draw",value:function(){this.ctx.fillStyle="blue",this.ctx.fillRect(this.x,this.y,this.width,this.height),this.ctx.fillStyle="gold",this.ctx.font="10px Arial",this.ctx.fillText("Goku",this.x+15,this.y+30)}}])&&a(e.prototype,i),t}();document.addEventListener("DOMContentLoaded",(function(){var t=document.getElementById("canvas");t.width=900,t.height=600;var i=t.getContext("2d"),n=[],a=[],c=1e3,o={x:void 0,y:void 0,width:.1,height:.1};t.addEventListener("mousemove",(function(t){o.x=t.offsetX,o.y=t.offsetY})),t.addEventListener("mouseleave",(function(){o.x=void 0,o.y=void 0})),function(){for(var e=0;e<t.height;e+=50)for(var i=0;i<t.width-100;i+=50)n.push(new h(i,e))}(),t.addEventListener("click",(function(){var e=o.x-o.x%50,i=o.y-o.y%50;if(!(e>t.width-150)){for(var n=0;n<a.length;n++)if(a[n].x===e&&a[n].y===i)return;c>=250&&(a.push(new l(e,i)),c-=250)}})),function h(){i.clearRect(0,0,t.width,t.height),i.fillStyle="lightgray",i.fillRect(t.width-100,0,100,t.height),e(i),function(){for(var t=0;t<n.length;t++)n[t].draw()}(),function(){for(var t=0;t<a.length;t++)a[t].draw()}(),c>400?(i.fillStyle="green",i.font="15px Arial"):(i.fillStyle="red",i.font="15px Arial"),i.fillText("Money: $"+c,802,30),requestAnimationFrame(h)}()}))}();
//# sourceMappingURL=main.js.map