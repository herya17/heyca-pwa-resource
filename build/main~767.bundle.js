/*! For license information please see main~767.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkHeyCa_=self.webpackChunkHeyCa_||[]).push([[767],{7767:(e,t,r)=>{r.d(t,{$P:()=>d,BV:()=>N,Ix:()=>D,Zp:()=>f,g:()=>g,jb:()=>u,qh:()=>k,x$:()=>C,zy:()=>m});var n=r(6540),a=r(5588);function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o.apply(this,arguments)}const l=n.createContext(null),i=n.createContext(null),u=n.createContext(null),s=n.createContext(null),c=n.createContext({outlet:null,matches:[],isDataRoute:!1}),p=n.createContext(null);function d(e,t){let{relative:r}=void 0===t?{}:t;h()||(0,a.Oi)(!1);let{basename:o,navigator:l}=n.useContext(u),{hash:i,pathname:s,search:c}=C(e,{relative:r}),p=s;return"/"!==o&&(p="/"===s?o:(0,a.HS)([o,s])),l.createHref({pathname:p,search:c,hash:i})}function h(){return null!=n.useContext(s)}function m(){return h()||(0,a.Oi)(!1),n.useContext(s).location}function v(e){n.useContext(u).static||n.useLayoutEffect(e)}function f(){let{isDataRoute:e}=n.useContext(c);return e?function(){let{router:e}=function(e){let t=n.useContext(l);return t||(0,a.Oi)(!1),t}(b.UseNavigateStable),t=U(B.UseNavigateStable),r=n.useRef(!1);return v((()=>{r.current=!0})),n.useCallback((function(n,a){void 0===a&&(a={}),r.current&&("number"==typeof n?e.navigate(n):e.navigate(n,o({fromRouteId:t},a)))}),[e,t])}():function(){h()||(0,a.Oi)(!1);let e=n.useContext(l),{basename:t,navigator:r}=n.useContext(u),{matches:o}=n.useContext(c),{pathname:i}=m(),s=JSON.stringify((0,a.sd)(o).map((e=>e.pathnameBase))),p=n.useRef(!1);return v((()=>{p.current=!0})),n.useCallback((function(n,o){if(void 0===o&&(o={}),!p.current)return;if("number"==typeof n)return void r.go(n);let l=(0,a.Gh)(n,JSON.parse(s),i,"path"===o.relative);null==e&&"/"!==t&&(l.pathname="/"===l.pathname?t:(0,a.HS)([t,l.pathname])),(o.replace?r.replace:r.push)(l,o.state,o)}),[t,r,s,i,e])}()}function g(){let{matches:e}=n.useContext(c),t=e[e.length-1];return t?t.params:{}}function C(e,t){let{relative:r}=void 0===t?{}:t,{matches:o}=n.useContext(c),{pathname:l}=m(),i=JSON.stringify((0,a.sd)(o).map((e=>e.pathnameBase)));return n.useMemo((()=>(0,a.Gh)(e,JSON.parse(i),l,"path"===r)),[e,i,l,r])}function x(e,t,r){h()||(0,a.Oi)(!1);let{navigator:l}=n.useContext(u),{matches:i}=n.useContext(c),p=i[i.length-1],d=p?p.params:{},v=(p&&p.pathname,p?p.pathnameBase:"/");p&&p.route;let f,g=m();if(t){var C;let e="string"==typeof t?(0,a.Rr)(t):t;"/"===v||(null==(C=e.pathname)?void 0:C.startsWith(v))||(0,a.Oi)(!1),f=e}else f=g;let x=f.pathname||"/",E="/"===v?x:x.slice(v.length)||"/",b=(0,a.ue)(e,{pathname:E}),B=function(e,t,r){var o;if(void 0===t&&(t=[]),void 0===r&&(r=null),null==e){var l;if(null==(l=r)||!l.errors)return null;e=r.matches}let i=e,u=null==(o=r)?void 0:o.errors;if(null!=u){let e=i.findIndex((e=>e.route.id&&(null==u?void 0:u[e.route.id])));e>=0||(0,a.Oi)(!1),i=i.slice(0,Math.min(i.length,e+1))}return i.reduceRight(((e,a,o)=>{let l=a.route.id?null==u?void 0:u[a.route.id]:null,s=null;r&&(s=a.route.errorElement||y);let c=t.concat(i.slice(0,o+1)),p=()=>{let t;return t=l?s:a.route.Component?n.createElement(a.route.Component,null):a.route.element?a.route.element:e,n.createElement(O,{match:a,routeContext:{outlet:e,matches:c,isDataRoute:null!=r},children:t})};return r&&(a.route.ErrorBoundary||a.route.errorElement||0===o)?n.createElement(R,{location:r.location,revalidation:r.revalidation,component:s,error:l,children:p(),routeContext:{outlet:null,matches:c,isDataRoute:!0}}):p()}),null)}(b&&b.map((e=>Object.assign({},e,{params:Object.assign({},d,e.params),pathname:(0,a.HS)([v,l.encodeLocation?l.encodeLocation(e.pathname).pathname:e.pathname]),pathnameBase:"/"===e.pathnameBase?v:(0,a.HS)([v,l.encodeLocation?l.encodeLocation(e.pathnameBase).pathname:e.pathnameBase])}))),i,r);return t&&B?n.createElement(s.Provider,{value:{location:o({pathname:"/",search:"",hash:"",state:null,key:"default"},f),navigationType:a.rc.Pop}},B):B}function E(){let e=function(){var e;let t=n.useContext(p),r=function(e){let t=n.useContext(i);return t||(0,a.Oi)(!1),t}(B.UseRouteError),o=U(B.UseRouteError);return t||(null==(e=r.errors)?void 0:e[o])}(),t=(0,a.pX)(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,o={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return n.createElement(n.Fragment,null,n.createElement("h2",null,"Unexpected Application Error!"),n.createElement("h3",{style:{fontStyle:"italic"}},t),r?n.createElement("pre",{style:o},r):null,null)}const y=n.createElement(E,null);class R extends n.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||"idle"!==t.revalidation&&"idle"===e.revalidation?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error||t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error?n.createElement(c.Provider,{value:this.props.routeContext},n.createElement(p.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function O(e){let{routeContext:t,match:r,children:a}=e,o=n.useContext(l);return o&&o.static&&o.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=r.route.id),n.createElement(c.Provider,{value:t},a)}var b,B,S;function U(e){let t=function(e){let t=n.useContext(c);return t||(0,a.Oi)(!1),t}(),r=t.matches[t.matches.length-1];return r.route.id||(0,a.Oi)(!1),r.route.id}function k(e){(0,a.Oi)(!1)}function D(e){let{basename:t="/",children:r=null,location:o,navigationType:l=a.rc.Pop,navigator:i,static:c=!1}=e;h()&&(0,a.Oi)(!1);let p=t.replace(/^\/*/,"/"),d=n.useMemo((()=>({basename:p,navigator:i,static:c})),[p,i,c]);"string"==typeof o&&(o=(0,a.Rr)(o));let{pathname:m="/",search:v="",hash:f="",state:g=null,key:C="default"}=o,x=n.useMemo((()=>{let e=(0,a.pb)(m,p);return null==e?null:{location:{pathname:e,search:v,hash:f,state:g,key:C},navigationType:l}}),[p,m,v,f,g,C,l]);return null==x?null:n.createElement(u.Provider,{value:d},n.createElement(s.Provider,{children:r,value:x}))}function N(e){let{children:t,location:r}=e;return x(P(t),r)}function P(e,t){void 0===t&&(t=[]);let r=[];return n.Children.forEach(e,((e,o)=>{if(!n.isValidElement(e))return;let l=[...t,o];if(e.type===n.Fragment)return void r.push.apply(r,P(e.props.children,l));e.type!==k&&(0,a.Oi)(!1),e.props.index&&e.props.children&&(0,a.Oi)(!1);let i={id:e.props.id||l.join("-"),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,loader:e.props.loader,action:e.props.action,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:null!=e.props.ErrorBoundary||null!=e.props.errorElement,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(i.children=P(e.props.children,l)),r.push(i)})),r}!function(e){e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate"}(b||(b={})),function(e){e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId"}(B||(B={})),function(e){e[e.pending=0]="pending",e[e.success=1]="success",e[e.error=2]="error"}(S||(S={})),new Promise((()=>{})),n.Component}}]);
//# sourceMappingURL=main~767.bundle.js.map