(function(){"use strict";const z=Array.isArray,A=e=>typeof e=="string";var k=Math.pow;function _(e){let r=0,a=0,t=0;return e.length===4?(r=`0x${e[1]}${e[1]}`,a=`0x${e[2]}${e[2]}`,t=`0x${e[3]}${e[3]}`):e.length===7&&(r=`0x${e[1]}${e[2]}`,a=`0x${e[3]}${e[4]}`,t=`0x${e[5]}${e[6]}`),[parseInt(r),parseInt(a),parseInt(t)]}function I(e){let r=e[0]/255,a=e[1]/255,t=e[2]/255,s,h,b;return r=r>.04045?k((r+.055)/1.055,2.4):r/12.92,a=a>.04045?k((a+.055)/1.055,2.4):a/12.92,t=t>.04045?k((t+.055)/1.055,2.4):t/12.92,s=(r*.4124+a*.3576+t*.1805)/.95047,h=(r*.2126+a*.7152+t*.0722)/1,b=(r*.0193+a*.1192+t*.9505)/1.08883,s=s>.008856?k(s,1/3):7.787*s+16/116,h=h>.008856?k(h,1/3):7.787*h+16/116,b=b>.008856?k(b,1/3):7.787*b+16/116,[116*h-16,500*(s-h),200*(h-b)]}function q([e,r,a]){return`hsl(${e},${r},${a})`}const S=e=>{const r=e.match(/\d+/g);return r||[0,0,0]},O={rgb:S,hex:_,hsl:e=>{let[r,a,t]=S(e);a/=100,t/=100,e.includes("rad")?r=Math.round(r*(180/Math.PI)):e.includes("turn")&&(r=Math.round(r*360)),r>=360&&(r%=360);const s=(1-Math.abs(2*t-1))*a,h=s*(1-Math.abs(r/60%2-1)),b=t-s/2;let i=0,c=0,l=0;return r>=0&&r<60?(i=s,c=h,l=0):r>=60&&r<120?(i=h,c=s,l=0):r>=120&&r<180?(i=0,c=s,l=h):r>=180&&r<240?(i=0,c=h,l=s):r>=240&&r<300?(i=h,c=0,l=s):r>=300&&r<360&&(i=s,c=0,l=h),i=Math.round((i+b)*255),c=Math.round((c+b)*255),l=Math.round((l+b)*255),[i,c,l]},lab:S},E={rgb:e=>I(e),hsl:e=>I(O.hsl(q(e))),lab:e=>e};function N(e){return e.slice(0,3).includes("rgb")?"rgb":e.slice(0,3).includes("hsl")?"hsl":e.slice(0,3).includes("#")?"hex":e.slice(0,3).includes("lab")?"lab":"rgb"}function D(e){const r=N(e),a=O[r](e);return T(a,"rgb")}function T(e,r){return E[r](e)}function $(e){return z(e)&&e.length===3}const L=new Map;function j(e,r,a){if(A(e))e=D(e);else if($(e))e=T(e,a||"rgb");else throw new Error(`${e} type could not be infered if is string, otherwise type has not been provided as an option if passing a tuple`);if(A(r))r=D(r);else if($(r))r=T(r,a||"rgb");else throw new Error(`${r} type could not be infered if is string, otherwise type has not been provided as an option `);const t=L.get(JSON.stringify([e,r]));if(t)return t;if(!$(e)||!$(r))throw new Error(`colors: ${e} and ${r} could type could not be infered or converted`);const s=e,h=r,b=s[0]-h[0],i=s[1]-h[1],c=s[2]-h[2],l=Math.sqrt(s[1]*s[1]+s[2]*s[2]),d=Math.sqrt(h[1]*h[1]+h[2]*h[2]),u=l-d;let m=i*i+c*c-u*u;m=m<0?0:Math.sqrt(m);const w=1+.045*l,x=1+.015*l,p=b/1,v=u/w,y=m/x,C=p*p+v*v+y*y,M=C<0?0:Math.sqrt(C);return L.set(JSON.stringify([e,r]),M),M}const P=(e,r,a)=>{const{width:t,height:s,channels:h}=r,b=Math.floor(s*a),i=Math.floor(t*a),c={...r,width:i,height:b},l=new Uint8ClampedArray(i*b*h),d=a>=1?1:(1/a)**2;for(let u=0;u<b;u++)for(let m=0;m<i;m++){const w=Array(h).fill(0);for(let x=0;x<1/a;x++)for(let p=0;p<1/a;p++){const v=Math.floor(u*1/a)+x,y=Math.floor(m*1/a)+p,C=h*(v*t+y);for(let M=0;M<h;M++)w[M]+=e[C+M]/d}for(let x=0;x<r.channels;x++){const p=h*(u*i+m)+x;l[p]=w[x]}}return{data:l,info:c}},J=(e,r,a,t)=>{const s=a.length**.5,{width:h,height:b,channels:i}=r;for(let c=0;c<b;c++)for(let l=0;l<h;l++){const d=i*(c*h+l),u=c%s*s+l%s,m=t*a[u];for(let w=0;w<i;w++){const x=e[d+w]+m;e[d+w]=x<=255?x>=0?x:0:255}}},U=(e,r,a,t)=>{const{width:s,height:h,channels:b}=r,i=a.length;for(let c=0;c<h;c++)for(let l=0;l<s;l++){const d=b*(c*s+l);let u=1/0,m=0;for(let w=0;w<i;w++){const x=a[w],p=Array(b);for(let y=0;y<b;y++)p[y]=e[d+y];const v=t?j([p[0],p[1],p[2]],[x[0],x[1],x[2]],"rgb"):Math.abs(p[0]-x[0])+Math.abs(p[1]-x[1])+Math.abs(p[2]-x[2]);v<u&&(u=v,m=w)}for(let w=0;w<b;w++)e[d+w]=a[m][w]}},H=e=>{if(e===0)return[0,2,3,1];const r=H(e-1),a=r.length**.5,t=4**(e+1),s=t**.5;return Array.from({length:t},(h,b)=>{const i=b%s,c=Math.floor(b/s),l=i<s/2,d=c<s/2,u=l?d?0:3:d?2:1;return r[c%a*a+i%a]*4+u})},W=e=>H(e).map(r=>r/4**(e+1)-.5),g={rosewater:{hex:"#dc8a78",rgb:"rgb(220, 138, 120)",hsl:"hsl(11, 59%, 67%)",raw:"220, 138, 120"},flamingo:{hex:"#dd7878",rgb:"rgb(221, 120, 120)",hsl:"hsl(0, 60%, 67%)",raw:"221, 120, 120"},pink:{hex:"#ea76cb",rgb:"rgb(234, 118, 203)",hsl:"hsl(316, 73%, 69%)",raw:"234, 118, 203"},mauve:{hex:"#8839ef",rgb:"rgb(136, 57, 239)",hsl:"hsl(266, 85%, 58%)",raw:"136, 57, 239"},red:{hex:"#d20f39",rgb:"rgb(210, 15, 57)",hsl:"hsl(347, 87%, 44%)",raw:"210, 15, 57"},maroon:{hex:"#e64553",rgb:"rgb(230, 69, 83)",hsl:"hsl(355, 76%, 59%)",raw:"230, 69, 83"},peach:{hex:"#fe640b",rgb:"rgb(254, 100, 11)",hsl:"hsl(22, 99%, 52%)",raw:"254, 100, 11"},yellow:{hex:"#df8e1d",rgb:"rgb(223, 142, 29)",hsl:"hsl(35, 77%, 49%)",raw:"223, 142, 29"},green:{hex:"#40a02b",rgb:"rgb(64, 160, 43)",hsl:"hsl(109, 58%, 40%)",raw:"64, 160, 43"},teal:{hex:"#179299",rgb:"rgb(23, 146, 153)",hsl:"hsl(183, 74%, 35%)",raw:"23, 146, 153"},sky:{hex:"#04a5e5",rgb:"rgb(4, 165, 229)",hsl:"hsl(197, 97%, 46%)",raw:"4, 165, 229"},sapphire:{hex:"#209fb5",rgb:"rgb(32, 159, 181)",hsl:"hsl(189, 70%, 42%)",raw:"32, 159, 181"},blue:{hex:"#1e66f5",rgb:"rgb(30, 102, 245)",hsl:"hsl(220, 91%, 54%)",raw:"30, 102, 245"},lavender:{hex:"#7287fd",rgb:"rgb(114, 135, 253)",hsl:"hsl(231, 97%, 72%)",raw:"114, 135, 253"},text:{hex:"#4c4f69",rgb:"rgb(76, 79, 105)",hsl:"hsl(234, 16%, 35%)",raw:"76, 79, 105"},subtext1:{hex:"#5c5f77",rgb:"rgb(92, 95, 119)",hsl:"hsl(233, 13%, 41%)",raw:"92, 95, 119"},subtext0:{hex:"#6c6f85",rgb:"rgb(108, 111, 133)",hsl:"hsl(233, 10%, 47%)",raw:"108, 111, 133"},overlay2:{hex:"#7c7f93",rgb:"rgb(124, 127, 147)",hsl:"hsl(232, 10%, 53%)",raw:"124, 127, 147"},overlay1:{hex:"#8c8fa1",rgb:"rgb(140, 143, 161)",hsl:"hsl(231, 10%, 59%)",raw:"140, 143, 161"},overlay0:{hex:"#9ca0b0",rgb:"rgb(156, 160, 176)",hsl:"hsl(228, 11%, 65%)",raw:"156, 160, 176"},surface2:{hex:"#acb0be",rgb:"rgb(172, 176, 190)",hsl:"hsl(227, 12%, 71%)",raw:"172, 176, 190"},surface1:{hex:"#bcc0cc",rgb:"rgb(188, 192, 204)",hsl:"hsl(225, 14%, 77%)",raw:"188, 192, 204"},surface0:{hex:"#ccd0da",rgb:"rgb(204, 208, 218)",hsl:"hsl(223, 16%, 83%)",raw:"204, 208, 218"},base:{hex:"#eff1f5",rgb:"rgb(239, 241, 245)",hsl:"hsl(220, 23%, 95%)",raw:"239, 241, 245"},mantle:{hex:"#e6e9ef",rgb:"rgb(230, 233, 239)",hsl:"hsl(220, 22%, 92%)",raw:"230, 233, 239"},crust:{hex:"#dce0e8",rgb:"rgb(220, 224, 232)",hsl:"hsl(220, 21%, 89%)",raw:"220, 224, 232"}},n={rosewater:{hex:"#f2d5cf",rgb:"rgb(242, 213, 207)",hsl:"hsl(10, 57%, 88%)",raw:"242, 213, 207"},flamingo:{hex:"#eebebe",rgb:"rgb(238, 190, 190)",hsl:"hsl(0, 59%, 84%)",raw:"238, 190, 190"},pink:{hex:"#f4b8e4",rgb:"rgb(244, 184, 228)",hsl:"hsl(316, 73%, 84%)",raw:"244, 184, 228"},mauve:{hex:"#ca9ee6",rgb:"rgb(202, 158, 230)",hsl:"hsl(277, 59%, 76%)",raw:"202, 158, 230"},red:{hex:"#e78284",rgb:"rgb(231, 130, 132)",hsl:"hsl(359, 68%, 71%)",raw:"231, 130, 132"},maroon:{hex:"#ea999c",rgb:"rgb(234, 153, 156)",hsl:"hsl(358, 66%, 76%)",raw:"234, 153, 156"},peach:{hex:"#ef9f76",rgb:"rgb(239, 159, 118)",hsl:"hsl(20, 79%, 70%)",raw:"239, 159, 118"},yellow:{hex:"#e5c890",rgb:"rgb(229, 200, 144)",hsl:"hsl(40, 62%, 73%)",raw:"229, 200, 144"},green:{hex:"#a6d189",rgb:"rgb(166, 209, 137)",hsl:"hsl(96, 44%, 68%)",raw:"166, 209, 137"},teal:{hex:"#81c8be",rgb:"rgb(129, 200, 190)",hsl:"hsl(172, 39%, 65%)",raw:"129, 200, 190"},sky:{hex:"#99d1db",rgb:"rgb(153, 209, 219)",hsl:"hsl(189, 48%, 73%)",raw:"153, 209, 219"},sapphire:{hex:"#85c1dc",rgb:"rgb(133, 193, 220)",hsl:"hsl(199, 55%, 69%)",raw:"133, 193, 220"},blue:{hex:"#8caaee",rgb:"rgb(140, 170, 238)",hsl:"hsl(222, 74%, 74%)",raw:"140, 170, 238"},lavender:{hex:"#babbf1",rgb:"rgb(186, 187, 241)",hsl:"hsl(239, 66%, 84%)",raw:"186, 187, 241"},text:{hex:"#c6d0f5",rgb:"rgb(198, 208, 245)",hsl:"hsl(227, 70%, 87%)",raw:"198, 208, 245"},subtext1:{hex:"#b5bfe2",rgb:"rgb(181, 191, 226)",hsl:"hsl(227, 44%, 80%)",raw:"181, 191, 226"},subtext0:{hex:"#a5adce",rgb:"rgb(165, 173, 206)",hsl:"hsl(228, 29%, 73%)",raw:"165, 173, 206"},overlay2:{hex:"#949cbb",rgb:"rgb(148, 156, 187)",hsl:"hsl(228, 22%, 66%)",raw:"148, 156, 187"},overlay1:{hex:"#838ba7",rgb:"rgb(131, 139, 167)",hsl:"hsl(227, 17%, 58%)",raw:"131, 139, 167"},overlay0:{hex:"#737994",rgb:"rgb(115, 121, 148)",hsl:"hsl(229, 13%, 52%)",raw:"115, 121, 148"},surface2:{hex:"#626880",rgb:"rgb(98, 104, 128)",hsl:"hsl(228, 13%, 44%)",raw:"98, 104, 128"},surface1:{hex:"#51576d",rgb:"rgb(81, 87, 109)",hsl:"hsl(227, 15%, 37%)",raw:"81, 87, 109"},surface0:{hex:"#414559",rgb:"rgb(65, 69, 89)",hsl:"hsl(230, 16%, 30%)",raw:"65, 69, 89"},base:{hex:"#303446",rgb:"rgb(48, 52, 70)",hsl:"hsl(229, 19%, 23%)",raw:"48, 52, 70"},mantle:{hex:"#292c3c",rgb:"rgb(41, 44, 60)",hsl:"hsl(231, 19%, 20%)",raw:"41, 44, 60"},crust:{hex:"#232634",rgb:"rgb(35, 38, 52)",hsl:"hsl(229, 20%, 17%)",raw:"35, 38, 52"}},o={rosewater:{hex:"#f4dbd6",rgb:"rgb(244, 219, 214)",hsl:"hsl(10, 58%, 90%)",raw:"244, 219, 214"},flamingo:{hex:"#f0c6c6",rgb:"rgb(240, 198, 198)",hsl:"hsl(0, 58%, 86%)",raw:"240, 198, 198"},pink:{hex:"#f5bde6",rgb:"rgb(245, 189, 230)",hsl:"hsl(316, 74%, 85%)",raw:"245, 189, 230"},mauve:{hex:"#c6a0f6",rgb:"rgb(198, 160, 246)",hsl:"hsl(267, 83%, 80%)",raw:"198, 160, 246"},red:{hex:"#ed8796",rgb:"rgb(237, 135, 150)",hsl:"hsl(351, 74%, 73%)",raw:"237, 135, 150"},maroon:{hex:"#ee99a0",rgb:"rgb(238, 153, 160)",hsl:"hsl(355, 71%, 77%)",raw:"238, 153, 160"},peach:{hex:"#f5a97f",rgb:"rgb(245, 169, 127)",hsl:"hsl(21, 86%, 73%)",raw:"245, 169, 127"},yellow:{hex:"#eed49f",rgb:"rgb(238, 212, 159)",hsl:"hsl(40, 70%, 78%)",raw:"238, 212, 159"},green:{hex:"#a6da95",rgb:"rgb(166, 218, 149)",hsl:"hsl(105, 48%, 72%)",raw:"166, 218, 149"},teal:{hex:"#8bd5ca",rgb:"rgb(139, 213, 202)",hsl:"hsl(171, 47%, 69%)",raw:"139, 213, 202"},sky:{hex:"#91d7e3",rgb:"rgb(145, 215, 227)",hsl:"hsl(189, 59%, 73%)",raw:"145, 215, 227"},sapphire:{hex:"#7dc4e4",rgb:"rgb(125, 196, 228)",hsl:"hsl(199, 66%, 69%)",raw:"125, 196, 228"},blue:{hex:"#8aadf4",rgb:"rgb(138, 173, 244)",hsl:"hsl(220, 83%, 75%)",raw:"138, 173, 244"},lavender:{hex:"#b7bdf8",rgb:"rgb(183, 189, 248)",hsl:"hsl(234, 82%, 85%)",raw:"183, 189, 248"},text:{hex:"#cad3f5",rgb:"rgb(202, 211, 245)",hsl:"hsl(227, 68%, 88%)",raw:"202, 211, 245"},subtext1:{hex:"#b8c0e0",rgb:"rgb(184, 192, 224)",hsl:"hsl(228, 39%, 80%)",raw:"184, 192, 224"},subtext0:{hex:"#a5adcb",rgb:"rgb(165, 173, 203)",hsl:"hsl(227, 27%, 72%)",raw:"165, 173, 203"},overlay2:{hex:"#939ab7",rgb:"rgb(147, 154, 183)",hsl:"hsl(228, 20%, 65%)",raw:"147, 154, 183"},overlay1:{hex:"#8087a2",rgb:"rgb(128, 135, 162)",hsl:"hsl(228, 15%, 57%)",raw:"128, 135, 162"},overlay0:{hex:"#6e738d",rgb:"rgb(110, 115, 141)",hsl:"hsl(230, 12%, 49%)",raw:"110, 115, 141"},surface2:{hex:"#5b6078",rgb:"rgb(91, 96, 120)",hsl:"hsl(230, 14%, 41%)",raw:"91, 96, 120"},surface1:{hex:"#494d64",rgb:"rgb(73, 77, 100)",hsl:"hsl(231, 16%, 34%)",raw:"73, 77, 100"},surface0:{hex:"#363a4f",rgb:"rgb(54, 58, 79)",hsl:"hsl(230, 19%, 26%)",raw:"54, 58, 79"},base:{hex:"#24273a",rgb:"rgb(36, 39, 58)",hsl:"hsl(232, 23%, 18%)",raw:"36, 39, 58"},mantle:{hex:"#1e2030",rgb:"rgb(30, 32, 48)",hsl:"hsl(233, 23%, 15%)",raw:"30, 32, 48"},crust:{hex:"#181926",rgb:"rgb(24, 25, 38)",hsl:"hsl(236, 23%, 12%)",raw:"24, 25, 38"}},f={rosewater:{hex:"#f5e0dc",rgb:"rgb(245, 224, 220)",hsl:"hsl(10, 56%, 91%)",raw:"245, 224, 220"},flamingo:{hex:"#f2cdcd",rgb:"rgb(242, 205, 205)",hsl:"hsl(0, 59%, 88%)",raw:"242, 205, 205"},pink:{hex:"#f5c2e7",rgb:"rgb(245, 194, 231)",hsl:"hsl(316, 72%, 86%)",raw:"245, 194, 231"},mauve:{hex:"#cba6f7",rgb:"rgb(203, 166, 247)",hsl:"hsl(267, 84%, 81%)",raw:"203, 166, 247"},red:{hex:"#f38ba8",rgb:"rgb(243, 139, 168)",hsl:"hsl(343, 81%, 75%)",raw:"243, 139, 168"},maroon:{hex:"#eba0ac",rgb:"rgb(235, 160, 172)",hsl:"hsl(350, 65%, 77%)",raw:"235, 160, 172"},peach:{hex:"#fab387",rgb:"rgb(250, 179, 135)",hsl:"hsl(23, 92%, 75%)",raw:"250, 179, 135"},yellow:{hex:"#f9e2af",rgb:"rgb(249, 226, 175)",hsl:"hsl(41, 86%, 83%)",raw:"249, 226, 175"},green:{hex:"#a6e3a1",rgb:"rgb(166, 227, 161)",hsl:"hsl(115, 54%, 76%)",raw:"166, 227, 161"},teal:{hex:"#94e2d5",rgb:"rgb(148, 226, 213)",hsl:"hsl(170, 57%, 73%)",raw:"148, 226, 213"},sky:{hex:"#89dceb",rgb:"rgb(137, 220, 235)",hsl:"hsl(189, 71%, 73%)",raw:"137, 220, 235"},sapphire:{hex:"#74c7ec",rgb:"rgb(116, 199, 236)",hsl:"hsl(199, 76%, 69%)",raw:"116, 199, 236"},blue:{hex:"#89b4fa",rgb:"rgb(137, 180, 250)",hsl:"hsl(217, 92%, 76%)",raw:"137, 180, 250"},lavender:{hex:"#b4befe",rgb:"rgb(180, 190, 254)",hsl:"hsl(232, 97%, 85%)",raw:"180, 190, 254"},text:{hex:"#cdd6f4",rgb:"rgb(205, 214, 244)",hsl:"hsl(226, 64%, 88%)",raw:"205, 214, 244"},subtext1:{hex:"#bac2de",rgb:"rgb(186, 194, 222)",hsl:"hsl(227, 35%, 80%)",raw:"186, 194, 222"},subtext0:{hex:"#a6adc8",rgb:"rgb(166, 173, 200)",hsl:"hsl(228, 24%, 72%)",raw:"166, 173, 200"},overlay2:{hex:"#9399b2",rgb:"rgb(147, 153, 178)",hsl:"hsl(228, 17%, 64%)",raw:"147, 153, 178"},overlay1:{hex:"#7f849c",rgb:"rgb(127, 132, 156)",hsl:"hsl(230, 13%, 55%)",raw:"127, 132, 156"},overlay0:{hex:"#6c7086",rgb:"rgb(108, 112, 134)",hsl:"hsl(231, 11%, 47%)",raw:"108, 112, 134"},surface2:{hex:"#585b70",rgb:"rgb(88, 91, 112)",hsl:"hsl(233, 12%, 39%)",raw:"88, 91, 112"},surface1:{hex:"#45475a",rgb:"rgb(69, 71, 90)",hsl:"hsl(234, 13%, 31%)",raw:"69, 71, 90"},surface0:{hex:"#313244",rgb:"rgb(49, 50, 68)",hsl:"hsl(237, 16%, 23%)",raw:"49, 50, 68"},base:{hex:"#1e1e2e",rgb:"rgb(30, 30, 46)",hsl:"hsl(240, 21%, 15%)",raw:"30, 30, 46"},mantle:{hex:"#181825",rgb:"rgb(24, 24, 37)",hsl:"hsl(240, 21%, 12%)",raw:"24, 24, 37"},crust:{hex:"#11111b",rgb:"rgb(17, 17, 27)",hsl:"hsl(240, 23%, 9%)",raw:"17, 17, 27"}},G={variants:{latte:g,frappe:n,macchiato:o,mocha:f},labels:{rosewater:{latte:g.rosewater,frappe:n.rosewater,macchiato:o.rosewater,mocha:f.rosewater},flamingo:{latte:g.flamingo,frappe:n.flamingo,macchiato:o.flamingo,mocha:f.flamingo},pink:{latte:g.pink,frappe:n.pink,macchiato:o.pink,mocha:f.pink},mauve:{latte:g.mauve,frappe:n.mauve,macchiato:o.mauve,mocha:f.mauve},red:{latte:g.red,frappe:n.red,macchiato:o.red,mocha:f.red},maroon:{latte:g.maroon,frappe:n.maroon,macchiato:o.maroon,mocha:f.maroon},peach:{latte:g.peach,frappe:n.peach,macchiato:o.peach,mocha:f.peach},yellow:{latte:g.yellow,frappe:n.yellow,macchiato:o.yellow,mocha:f.yellow},green:{latte:g.green,frappe:n.green,macchiato:o.green,mocha:f.green},teal:{latte:g.teal,frappe:n.teal,macchiato:o.teal,mocha:f.teal},sky:{latte:g.sky,frappe:n.sky,macchiato:o.sky,mocha:f.sky},sapphire:{latte:g.sapphire,frappe:n.sapphire,macchiato:o.sapphire,mocha:f.sapphire},blue:{latte:g.blue,frappe:n.blue,macchiato:o.blue,mocha:f.blue},lavender:{latte:g.lavender,frappe:n.lavender,macchiato:o.lavender,mocha:f.lavender},text:{latte:g.text,frappe:n.text,macchiato:o.text,mocha:f.text},subtext1:{latte:g.subtext1,frappe:n.subtext1,macchiato:o.subtext1,mocha:f.subtext1},subtext0:{latte:g.subtext0,frappe:n.subtext0,macchiato:o.subtext0,mocha:f.subtext0},overlay2:{latte:g.overlay2,frappe:n.overlay2,macchiato:o.overlay2,mocha:f.overlay2},overlay1:{latte:g.overlay1,frappe:n.overlay1,macchiato:o.overlay1,mocha:f.overlay1},overlay0:{latte:g.overlay0,frappe:n.overlay0,macchiato:o.overlay0,mocha:f.overlay0},surface2:{latte:g.surface2,frappe:n.surface2,macchiato:o.surface2,mocha:f.surface2},surface1:{latte:g.surface1,frappe:n.surface1,macchiato:o.surface1,mocha:f.surface1},surface0:{latte:g.surface0,frappe:n.surface0,macchiato:o.surface0,mocha:f.surface0},base:{latte:g.base,frappe:n.base,macchiato:o.base,mocha:f.base},mantle:{latte:g.mantle,frappe:n.mantle,macchiato:o.mantle,mocha:f.mantle},crust:{latte:g.crust,frappe:n.crust,macchiato:o.crust,mocha:f.crust}}},{variants:B,labels:Q}=G,K=Object.keys(B).reduce((e,r)=>(e[r]=Object.entries(B[r]).map(([a,t])=>[...t.raw.split(", ").map(s=>parseInt(s)),255]),e),{}),R=(e,r,a)=>{const{pixelSize:t,palette:s,toDither:h,bayerLevel:b,noiseLevel:i,labComparison:c,rescaleBack:l}=a;return t>1&&({data:e,info:r}=P(e,r,1/t)),h&&J(e,r,W(b),i),U(e,r,K[s],c),t>1&&l&&({data:e,info:r}=P(e,r,t)),new ImageData(e,r.width,r.height)};onmessage=({data:e})=>{const r=Date.now(),a=R(e.data,e.info,e.config);postMessage({imageData:a,tookMS:Date.now()-r})}})();
