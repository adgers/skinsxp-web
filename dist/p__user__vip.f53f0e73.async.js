"use strict";(self.webpackChunkmucsgo=self.webpackChunkmucsgo||[]).push([[749],{36683:function(T,b,t){t.d(b,{Z:function(){return o}});var f=t(87462),x=t(45987),d=t(67294),i=t(1413),j=t(4942),M=t(94184),I=t.n(M),P=t(42550),B=t(63017),C=t(41755),r=["className","component","viewBox","spin","rotate","tabIndex","onClick","children"],h=d.forwardRef(function(n,l){var v=n.className,m=n.component,N=n.viewBox,S=n.spin,R=n.rotate,U=n.tabIndex,Z=n.onClick,A=n.children,O=(0,x.Z)(n,r),L=d.useRef(),H=(0,P.x1)(L,l);(0,C.Kp)(!!(m||A),"Should have `component` prop or `children`."),(0,C.C3)(L);var W=d.useContext(B.Z),$=W.prefixCls,G=$===void 0?"anticon":$,e=W.rootClassName,c=I()(e,G,v),u=I()((0,j.Z)({},"".concat(G,"-spin"),!!S)),a=R?{msTransform:"rotate(".concat(R,"deg)"),transform:"rotate(".concat(R,"deg)")}:void 0,p=(0,i.Z)((0,i.Z)({},C.vD),{},{className:u,style:a,viewBox:N});N||delete p.viewBox;var F=function(){return m?d.createElement(m,p,A):A?((0,C.Kp)(!!N||d.Children.count(A)===1&&d.isValidElement(A)&&d.Children.only(A).type==="use","Make sure that you provide correct `viewBox` prop (default `0 0 1024 1024`) to the icon."),d.createElement("svg",(0,f.Z)({},p,{viewBox:N}),A)):null},K=U;return K===void 0&&Z&&(K=-1),d.createElement("span",(0,f.Z)({role:"img"},O,{ref:H,tabIndex:K,onClick:Z,className:c}),F())});h.displayName="AntdIcon";var E=h,D=["type","children"],s=new Set;function y(n){return!!(typeof n=="string"&&n.length&&!s.has(n))}function g(n){var l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,v=n[l];if(y(v)){var m=document.createElement("script");m.setAttribute("src",v),m.setAttribute("data-namespace",v),n.length>l+1&&(m.onload=function(){g(n,l+1)},m.onerror=function(){g(n,l+1)}),s.add(v),document.body.appendChild(m)}}function o(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},l=n.scriptUrl,v=n.extraCommonProps,m=v===void 0?{}:v;l&&typeof document!="undefined"&&typeof window!="undefined"&&typeof document.createElement=="function"&&(Array.isArray(l)?g(l.reverse()):g([l]));var N=d.forwardRef(function(S,R){var U=S.type,Z=S.children,A=(0,x.Z)(S,D),O=null;return S.type&&(O=d.createElement("use",{xlinkHref:"#".concat(U)})),Z&&(O=Z),d.createElement(E,(0,f.Z)({},m,A,{ref:R}),O)});return N.displayName="Iconfont",N}},41755:function(T,b,t){t.d(b,{C3:function(){return g},H9:function(){return D},Kp:function(){return B},R_:function(){return h},pw:function(){return E},r:function(){return C},vD:function(){return s}});var f=t(1413),x=t(71002),d=t(51461),i=t(67294),j=t(80334),M=t(48981),I=t(27571),P=t(63017);function B(o,n){(0,j.ZP)(o,"[@ant-design/icons] ".concat(n))}function C(o){return(0,x.Z)(o)==="object"&&typeof o.name=="string"&&typeof o.theme=="string"&&((0,x.Z)(o.icon)==="object"||typeof o.icon=="function")}function r(){var o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Object.keys(o).reduce(function(n,l){var v=o[l];switch(l){case"class":n.className=v,delete n.class;break;default:n[l]=v}return n},{})}function h(o,n,l){return l?i.createElement(o.tag,(0,f.Z)((0,f.Z)({key:n},r(o.attrs)),l),(o.children||[]).map(function(v,m){return h(v,"".concat(n,"-").concat(o.tag,"-").concat(m))})):i.createElement(o.tag,(0,f.Z)({key:n},r(o.attrs)),(o.children||[]).map(function(v,m){return h(v,"".concat(n,"-").concat(o.tag,"-").concat(m))}))}function E(o){return(0,d.R_)(o)[0]}function D(o){return o?Array.isArray(o)?o:[o]:[]}var s={width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true",focusable:"false"},y=`
.anticon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`,g=function(n){var l=(0,i.useContext)(P.Z),v=l.csp,m=l.prefixCls,N=y;m&&(N=N.replace(/anticon/g,m)),(0,i.useEffect)(function(){var S=n.current,R=(0,I.A)(S);(0,M.hq)(N,"@ant-design-icons",{prepend:!0,csp:v,attachTo:R})},[])}},51461:function(T,b,t){t.d(b,{iN:function(){return O},R_:function(){return g}});var f=t(86500),x=t(1350),d=2,i=.16,j=.05,M=.05,I=.15,P=5,B=4,C=[{index:7,opacity:.15},{index:6,opacity:.25},{index:5,opacity:.3},{index:5,opacity:.45},{index:5,opacity:.65},{index:5,opacity:.85},{index:4,opacity:.9},{index:3,opacity:.95},{index:2,opacity:.97},{index:1,opacity:.98}];function r(e){var c=e.r,u=e.g,a=e.b,p=(0,f.py)(c,u,a);return{h:p.h*360,s:p.s,v:p.v}}function h(e){var c=e.r,u=e.g,a=e.b;return"#".concat((0,f.vq)(c,u,a,!1))}function E(e,c,u){var a=u/100,p={r:(c.r-e.r)*a+e.r,g:(c.g-e.g)*a+e.g,b:(c.b-e.b)*a+e.b};return p}function D(e,c,u){var a;return Math.round(e.h)>=60&&Math.round(e.h)<=240?a=u?Math.round(e.h)-d*c:Math.round(e.h)+d*c:a=u?Math.round(e.h)+d*c:Math.round(e.h)-d*c,a<0?a+=360:a>=360&&(a-=360),a}function s(e,c,u){if(e.h===0&&e.s===0)return e.s;var a;return u?a=e.s-i*c:c===B?a=e.s+i:a=e.s+j*c,a>1&&(a=1),u&&c===P&&a>.1&&(a=.1),a<.06&&(a=.06),Number(a.toFixed(2))}function y(e,c,u){var a;return u?a=e.v+M*c:a=e.v-I*c,a>1&&(a=1),Number(a.toFixed(2))}function g(e){for(var c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},u=[],a=(0,x.uA)(e),p=P;p>0;p-=1){var F=r(a),K=h((0,x.uA)({h:D(F,p,!0),s:s(F,p,!0),v:y(F,p,!0)}));u.push(K)}u.push(h(a));for(var w=1;w<=B;w+=1){var V=r(a),z=h((0,x.uA)({h:D(V,w),s:s(V,w),v:y(V,w)}));u.push(z)}return c.theme==="dark"?C.map(function(k){var J=k.index,Q=k.opacity,X=h(E((0,x.uA)(c.backgroundColor||"#141414"),(0,x.uA)(u[J]),Q*100));return X}):u}var o={red:"#F5222D",volcano:"#FA541C",orange:"#FA8C16",gold:"#FAAD14",yellow:"#FADB14",lime:"#A0D911",green:"#52C41A",cyan:"#13C2C2",blue:"#1677FF",geekblue:"#2F54EB",purple:"#722ED1",magenta:"#EB2F96",grey:"#666666"},n={},l={};Object.keys(o).forEach(function(e){n[e]=g(o[e]),n[e].primary=n[e][5],l[e]=g(o[e],{theme:"dark",backgroundColor:"#141414"}),l[e].primary=l[e][5]});var v=n.red,m=n.volcano,N=n.gold,S=n.orange,R=n.yellow,U=n.lime,Z=n.green,A=n.cyan,O=n.blue,L=n.geekblue,H=n.purple,W=n.magenta,$=n.grey,G=n.grey},68927:function(T,b,t){t.d(b,{B:function(){return x}});var f=t(36683),x=(0,f.Z)({scriptUrl:["//at.alicdn.com/t/c/font_4204248_ne0cw2rytxj.js"]})},4414:function(T,b,t){t.r(b),t.d(b,{default:function(){return h}});var f=t(68927),x=t(15009),d=t.n(x),i=t(97857),j=t.n(i),M=t(99289),I=t.n(M),P=t(7363);function B(E){return C.apply(this,arguments)}function C(){return C=I()(d()().mark(function E(D){return d()().wrap(function(y){for(;;)switch(y.prev=y.next){case 0:return y.abrupt("return",(0,P.request)("/api/bonus/list",j()({method:"GET"},D||{})));case 1:case"end":return y.stop()}},E)})),C.apply(this,arguments)}var r=t(85893);function h(){var E,D=(0,P.useRequest)(function(){return B()}),s=D.data,y=D.loading;return(0,r.jsx)("div",{className:"w-full flex justify-center",children:!y&&s&&(0,r.jsxs)("div",{className:"flex rounded overflow-hidden ring-1 ring-accent",children:[(0,r.jsxs)("div",{className:"flex flex-col text-sm",style:{background:"linear-gradient(90deg, #44425E 0%, #131314 100%)"},children:[(0,r.jsx)("div",{className:"vip-item",children:"Level"}),(0,r.jsx)("div",{className:"vip-item",children:"total"}),(0,r.jsx)("div",{className:"vip-item",children:"money"}),(0,r.jsx)("div",{className:"vip-item",children:"roll"}),(0,r.jsx)("div",{className:"vip-item",children:"increase"}),(0,r.jsx)("div",{className:"vip-item",children:"voucher"}),(0,r.jsx)("div",{className:"vip-item",children:"cdkey"}),(0,r.jsx)("div",{className:"vip-item",children:"avatar"}),(0,r.jsx)("div",{className:"vip-item",children:"receive"})]}),(0,r.jsxs)("div",{className:"flex flex-row flex-1 overflow-x-auto relative overflow-hidden",children:[(0,r.jsxs)("div",{className:"absolute right-4 w-[1100px] left-4 h-[63px] top-16 bg-base-100 flex flex-col justify-center gap-2",children:[(0,r.jsxs)("div",{className:"text-xs text-secondary",children:[s==null?void 0:s.customerExp,(0,r.jsx)("span",{className:"mx-1",children:"/"}),s==null?void 0:s.maxExp]}),(0,r.jsx)("progress",{className:"progress progress-secondary-l ring-1 ring-secondary bg-base-100 w-full",value:s==null?void 0:s.customerExp,max:s==null?void 0:s.maxExp})]}),s==null||(E=s.customerBounsVos)===null||E===void 0?void 0:E.map(function(g,o){return(0,r.jsxs)("div",{className:"flex flex-col text-sm flex-shrink-0 border-l border-neutral-700",children:[(0,r.jsx)("div",{className:"vip-item border-b border-neutral-700",children:(0,r.jsxs)("div",{className:"vip-level",children:[(0,r.jsx)("div",{className:"vip-level-icon"}),(0,r.jsx)("div",{className:"vip-level-num",children:g.grade})]})}),(0,r.jsx)("div",{className:"vip-item border-b border-neutral-700"}),(0,r.jsxs)("div",{className:"vip-item border-b border-neutral-700 font-num",children:[(0,r.jsx)(f.B,{type:"icon-coin",className:"mr-1 text-primary"})," ",g.expMin]}),(0,r.jsx)("div",{className:"vip-item border-b border-neutral-700",children:g.rollInfo}),(0,r.jsxs)("div",{className:"vip-item border-b border-neutral-700 font-num",children:["+",g.rechargeDiscount,"%"]}),(0,r.jsx)("div",{className:"vip-item border-b border-neutral-700",children:g.couponInfo}),(0,r.jsxs)("div",{className:"vip-item border-b border-neutral-700 font-num",children:[(0,r.jsx)(f.B,{type:"icon-coin",className:"mr-1 text-primary"}),g.cdkInfo]}),(0,r.jsx)("div",{className:"vip-item border-b border-neutral-700",children:(0,r.jsx)("img",{src:g.headGround,width:50})}),(0,r.jsx)("div",{className:"vip-item",children:(0,r.jsx)("button",{className:"btn btn-xs btn-secondary btn-outline rounded",type:"button",children:"\u9886\u53D6"})})]},o)})]})]})})}},27571:function(T,b,t){t.d(b,{A:function(){return d}});function f(i){var j;return i==null||(j=i.getRootNode)===null||j===void 0?void 0:j.call(i)}function x(i){return f(i)!==(i==null?void 0:i.ownerDocument)}function d(i){return x(i)?f(i):null}}}]);
