(()=>{"use strict";var e,v={},g={};function a(e){var n=g[e];if(void 0!==n)return n.exports;var r=g[e]={id:e,loaded:!1,exports:{}};return v[e].call(r.exports,r,r.exports,a),r.loaded=!0,r.exports}a.m=v,e=[],a.O=(n,r,i,d)=>{if(!r){var t=1/0;for(f=0;f<e.length;f++){for(var[r,i,d]=e[f],u=!0,o=0;o<r.length;o++)(!1&d||t>=d)&&Object.keys(a.O).every(p=>a.O[p](r[o]))?r.splice(o--,1):(u=!1,d<t&&(t=d));if(u){e.splice(f--,1);var l=i();void 0!==l&&(n=l)}}return n}d=d||0;for(var f=e.length;f>0&&e[f-1][2]>d;f--)e[f]=e[f-1];e[f]=[r,i,d]},a.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return a.d(n,{a:n}),n},a.d=(e,n)=>{for(var r in n)a.o(n,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},a.f={},a.e=e=>Promise.all(Object.keys(a.f).reduce((n,r)=>(a.f[r](e,n),n),[])),a.u=e=>(592===e?"common":e)+"."+{3:"f22a28c6b9aca112",35:"9d95575e86fcae6f",87:"7715de4ec7949229",103:"f674516e08ebf136",309:"38e21f22bf583936",497:"52df259845fd1052",585:"3e37f6420702de6e",592:"125f658fee43a311",679:"3f6a9c6af728da84",803:"cf89746e69004ef3",844:"14b56148dc693ea7",871:"1a8233f29c447e8c"}[e]+".js",a.miniCssF=e=>{},a.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={},n="hw-angular:";a.l=(r,i,d,f)=>{if(e[r])e[r].push(i);else{var t,u;if(void 0!==d)for(var o=document.getElementsByTagName("script"),l=0;l<o.length;l++){var c=o[l];if(c.getAttribute("src")==r||c.getAttribute("data-webpack")==n+d){t=c;break}}t||(u=!0,(t=document.createElement("script")).type="module",t.charset="utf-8",t.timeout=120,a.nc&&t.setAttribute("nonce",a.nc),t.setAttribute("data-webpack",n+d),t.src=a.tu(r)),e[r]=[i];var s=(m,p)=>{t.onerror=t.onload=null,clearTimeout(b);var h=e[r];if(delete e[r],t.parentNode&&t.parentNode.removeChild(t),h&&h.forEach(_=>_(p)),m)return m(p)},b=setTimeout(s.bind(null,void 0,{type:"timeout",target:t}),12e4);t.onerror=s.bind(null,t.onerror),t.onload=s.bind(null,t.onload),u&&document.head.appendChild(t)}}})(),a.r=e=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e;a.tt=()=>(void 0===e&&(e={createScriptURL:n=>n},typeof trustedTypes<"u"&&trustedTypes.createPolicy&&(e=trustedTypes.createPolicy("angular#bundler",e))),e)})(),a.tu=e=>a.tt().createScriptURL(e),a.p="",(()=>{var e={666:0};a.f.j=(i,d)=>{var f=a.o(e,i)?e[i]:void 0;if(0!==f)if(f)d.push(f[2]);else if(666!=i){var t=new Promise((c,s)=>f=e[i]=[c,s]);d.push(f[2]=t);var u=a.p+a.u(i),o=new Error;a.l(u,c=>{if(a.o(e,i)&&(0!==(f=e[i])&&(e[i]=void 0),f)){var s=c&&("load"===c.type?"missing":c.type),b=c&&c.target&&c.target.src;o.message="Loading chunk "+i+" failed.\n("+s+": "+b+")",o.name="ChunkLoadError",o.type=s,o.request=b,f[1](o)}},"chunk-"+i,i)}else e[i]=0},a.O.j=i=>0===e[i];var n=(i,d)=>{var o,l,[f,t,u]=d,c=0;if(f.some(b=>0!==e[b])){for(o in t)a.o(t,o)&&(a.m[o]=t[o]);if(u)var s=u(a)}for(i&&i(d);c<f.length;c++)a.o(e,l=f[c])&&e[l]&&e[l][0](),e[l]=0;return a.O(s)},r=self.webpackChunkhw_angular=self.webpackChunkhw_angular||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))})()})();