(()=>{"use strict";var e={535:()=>{try{self["workbox:cacheable-response:7.0.0"]&&_()}catch(e){}},136:()=>{try{self["workbox:core:7.0.0"]&&_()}catch(e){}},626:()=>{try{self["workbox:expiration:7.0.0"]&&_()}catch(e){}},447:()=>{try{self["workbox:precaching:7.0.0"]&&_()}catch(e){}},227:()=>{try{self["workbox:routing:7.0.0"]&&_()}catch(e){}},390:()=>{try{self["workbox:strategies:7.0.0"]&&_()}catch(e){}}},t={};function s(n){var a=t[n];if(void 0!==a)return a.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,s),r.exports}(()=>{s(136);class e extends Error{constructor(e,t){super(((e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s})(e,t)),this.name=e,this.details=t}}s(227);const t=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,s,n="GET"){this.handler=t(s),this.match=e,this.method=n}setCatchHandler(e){this.catchHandler=t(e)}}class a extends n{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class r{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:a,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let i=r&&r.handler;const c=e.method;if(!i&&this._defaultHandlerMap.has(c)&&(i=this._defaultHandlerMap.get(c)),!i)return;let o;try{o=i.handle({url:s,request:e,event:t,params:a})}catch(e){o=Promise.reject(e)}const h=r&&r.catchHandler;return o instanceof Promise&&(this._catchHandler||h)&&(o=o.catch((async n=>{if(h)try{return await h.handle({url:s,request:e,event:t,params:a})}catch(e){e instanceof Error&&(n=e)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw n}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const a=this._routes.get(s.method)||[];for(const r of a){let a;const i=r.match({url:e,sameOrigin:t,request:s,event:n});if(i)return a=i,(Array.isArray(a)&&0===a.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(a=void 0),{route:r,params:a}}return{}}setDefaultHandler(e,s="GET"){this._defaultHandlerMap.set(s,t(e))}setCatchHandler(e){this._catchHandler=t(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(t){if(!this._routes.has(t.method))throw new e("unregister-route-but-not-found-with-method",{method:t.method});const s=this._routes.get(t.method).indexOf(t);if(!(s>-1))throw new e("unregister-route-route-not-registered");this._routes.get(t.method).splice(s,1)}}let i;function c(t,s,c){let o;if("string"==typeof t){const e=new URL(t,location.href);o=new n((({url:t})=>t.href===e.href),s,c)}else if(t instanceof RegExp)o=new a(t,s,c);else if("function"==typeof t)o=new n(t,s,c);else{if(!(t instanceof n))throw new e("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});o=t}return(i||(i=new r,i.addFetchListener(),i.addCacheListener()),i).registerRoute(o),o}const o={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},h=e=>[o.prefix,e,o.suffix].filter((e=>e&&e.length>0)).join("-"),l=e=>e||h(o.precache),u=e=>e||h(o.runtime);function d(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class p{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const f=new Set;function g(e){return"string"==typeof e?new Request(e):e}s(390);class w{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new p,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(t){const{event:s}=this;let n=g(t);if("navigate"===n.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const a=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))n=await e({request:n.clone(),event:s})}catch(t){if(t instanceof Error)throw new e("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const r=n.clone();try{let e;e=await fetch(n,"navigate"===n.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:r,response:e});return e}catch(e){throw a&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:a.clone(),request:r.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=g(e);let s;const{cacheName:n,matchOptions:a}=this._strategy,r=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},a),{cacheName:n});s=await caches.match(r,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:n,matchOptions:a,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(t,s){const n=g(t);var a;await(a=0,new Promise((e=>setTimeout(e,a))));const r=await this.getCacheKey(n,"write");if(!s)throw new e("cache-put-with-no-response",{url:(i=r.url,new URL(String(i),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var i;const c=await this._ensureResponseSafeToCache(s);if(!c)return!1;const{cacheName:o,matchOptions:h}=this._strategy,l=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),p=u?await async function(e,t,s,n){const a=d(t.url,s);if(t.url===a)return e.match(t,n);const r=Object.assign(Object.assign({},n),{ignoreSearch:!0}),i=await e.keys(t,r);for(const t of i)if(a===d(t.url,s))return e.match(t,n)}(l,r.clone(),["__WB_REVISION__"],h):null;try{await l.put(r,u?c.clone():c)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of f)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:o,oldResponse:p,newResponse:c.clone(),request:r,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let n=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))n=g(await e({mode:t,request:n,event:this.event,params:this.params}));this._cacheKeys[s]=n}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),n=n=>{const a=Object.assign(Object.assign({},n),{state:s});return t[e](a)};yield n}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class m{constructor(e={}){this.cacheName=u(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,a=new w(this,{event:t,request:s,params:n}),r=this._getResponse(a,s,t);return[r,this._awaitComplete(r,a,s,t)]}async _getResponse(t,s,n){let a;await t.runCallbacks("handlerWillStart",{event:n,request:s});try{if(a=await this._handle(s,t),!a||"error"===a.type)throw new e("no-response",{url:s.url})}catch(e){if(e instanceof Error)for(const r of t.iterateCallbacks("handlerDidError"))if(a=await r({error:e,event:n,request:s}),a)break;if(!a)throw e}for(const e of t.iterateCallbacks("handlerWillRespond"))a=await e({event:n,request:s,response:a});return a}async _awaitComplete(e,t,s,n){let a,r;try{a=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:a}),await t.doneWaiting()}catch(e){e instanceof Error&&(r=e)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:a,error:r}),t.destroy(),r)throw r}}const y={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class _ extends m{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(y)}async _handle(t,s){const n=s.fetchAndCachePut(t).catch((()=>{}));s.waitUntil(n);let a,r=await s.cacheMatch(t);if(r);else try{r=await n}catch(e){e instanceof Error&&(a=e)}if(!r)throw new e("no-response",{url:t.url,error:a});return r}}s(535);class b{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some((t=>e.headers.get(t)===this._headers[t]))),t}}class v{constructor(e){this.cacheWillUpdate=async({response:e})=>this._cacheableResponse.isResponseCacheable(e)?e:null,this._cacheableResponse=new b(e)}}function R(e){e.then((()=>{}))}const x=(e,t)=>t.some((t=>e instanceof t));let C,E;const q=new WeakMap,L=new WeakMap,U=new WeakMap,k=new WeakMap,T=new WeakMap;let D={get(e,t,s){if(e instanceof IDBTransaction){if("done"===t)return L.get(e);if("objectStoreNames"===t)return e.objectStoreNames||U.get(e);if("store"===t)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return I(e[t])},set:(e,t,s)=>(e[t]=s,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function N(e){return"function"==typeof e?(t=e)!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(E||(E=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(P(this),e),I(q.get(this))}:function(...e){return I(t.apply(P(this),e))}:function(e,...s){const n=t.call(P(this),e,...s);return U.set(n,e.sort?e.sort():[e]),I(n)}:(e instanceof IDBTransaction&&function(e){if(L.has(e))return;const t=new Promise(((t,s)=>{const n=()=>{e.removeEventListener("complete",a),e.removeEventListener("error",r),e.removeEventListener("abort",r)},a=()=>{t(),n()},r=()=>{s(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",a),e.addEventListener("error",r),e.addEventListener("abort",r)}));L.set(e,t)}(e),x(e,C||(C=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(e,D):e);var t}function I(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,s)=>{const n=()=>{e.removeEventListener("success",a),e.removeEventListener("error",r)},a=()=>{t(I(e.result)),n()},r=()=>{s(e.error),n()};e.addEventListener("success",a),e.addEventListener("error",r)}));return t.then((t=>{t instanceof IDBCursor&&q.set(t,e)})).catch((()=>{})),T.set(t,e),t}(e);if(k.has(e))return k.get(e);const t=N(e);return t!==e&&(k.set(e,t),T.set(t,e)),t}const P=e=>T.get(e),M=["get","getKey","getAll","getAllKeys","count"],K=["put","add","delete","clear"],S=new Map;function A(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(S.get(t))return S.get(t);const s=t.replace(/FromIndex$/,""),n=t!==s,a=K.includes(s);if(!(s in(n?IDBIndex:IDBObjectStore).prototype)||!a&&!M.includes(s))return;const r=async function(e,...t){const r=this.transaction(e,a?"readwrite":"readonly");let i=r.store;return n&&(i=i.index(t.shift())),(await Promise.all([i[s](...t),a&&r.done]))[0]};return S.set(t,r),r}var O;O=D,D={...O,get:(e,t,s)=>A(e,t)||O.get(e,t,s),has:(e,t)=>!!A(e,t)||O.has(e,t)},s(626);const W="cache-entries",B=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class j{constructor(e){this._db=null,this._cacheName=e}_upgradeDb(e){const t=e.createObjectStore(W,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(e){this._upgradeDb(e),this._cacheName&&function(e,{blocked:t}={}){const s=indexedDB.deleteDatabase(e);t&&s.addEventListener("blocked",(e=>t(e.oldVersion,e))),I(s).then((()=>{}))}(this._cacheName)}async setTimestamp(e,t){const s={url:e=B(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)},n=(await this.getDb()).transaction(W,"readwrite",{durability:"relaxed"});await n.store.put(s),await n.done}async getTimestamp(e){const t=await this.getDb(),s=await t.get(W,this._getId(e));return null==s?void 0:s.timestamp}async expireEntries(e,t){const s=await this.getDb();let n=await s.transaction(W).store.index("timestamp").openCursor(null,"prev");const a=[];let r=0;for(;n;){const s=n.value;s.cacheName===this._cacheName&&(e&&s.timestamp<e||t&&r>=t?a.push(n.value):r++),n=await n.continue()}const i=[];for(const e of a)await s.delete(W,e.id),i.push(e.url);return i}_getId(e){return this._cacheName+"|"+B(e)}async getDb(){return this._db||(this._db=await function(e,t,{blocked:s,upgrade:n,blocking:a,terminated:r}={}){const i=indexedDB.open(e,t),c=I(i);return n&&i.addEventListener("upgradeneeded",(e=>{n(I(i.result),e.oldVersion,e.newVersion,I(i.transaction),e)})),s&&i.addEventListener("blocked",(e=>s(e.oldVersion,e.newVersion,e))),c.then((e=>{r&&e.addEventListener("close",(()=>r())),a&&e.addEventListener("versionchange",(e=>a(e.oldVersion,e.newVersion,e)))})).catch((()=>{})),c}("workbox-expiration",1,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}}class F{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new j(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const e of t)await s.delete(e,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,R(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){const t=await this._timestampModel.getTimestamp(e),s=Date.now()-1e3*this._maxAgeSeconds;return void 0===t||t<s}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}class H{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const a=this._isResponseDateFresh(n),r=this._getCacheExpiration(s);R(r.expireEntries());const i=r.updateTimestamp(t.url);if(e)try{e.waitUntil(i)}catch(e){}return a?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),f.add(t))}_getCacheExpiration(t){if(t===u())throw new e("expire-custom-caches-only");let s=this._cacheExpirations.get(t);return s||(s=new F(t,this._config),this._cacheExpirations.set(t,s)),s}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);return null===t||t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}function V(e,t){const s=t();return e.waitUntil(s),s}function $(t){if(!t)throw new e("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:s,url:n}=t;if(!n)throw new e("add-to-cache-list-unexpected-type",{entry:t});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const a=new URL(n,location.href),r=new URL(n,location.href);return a.searchParams.set("__WB_REVISION__",s),{cacheKey:a.href,url:r.href}}s(447);class G{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class Q{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}let J,z;class X extends m{constructor(e={}){e.cacheName=l(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(X.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){return await t.cacheMatch(e)||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(t,s){let n;const a=s.params||{};if(!this._fallbackToNetwork)throw new e("missing-precache-entry",{cacheName:this.cacheName,url:t.url});{const e=a.integrity,r=t.integrity,i=!r||r===e;n=await s.fetch(new Request(t,{integrity:"no-cors"!==t.mode?r||e:void 0})),e&&i&&"no-cors"!==t.mode&&(this._useDefaultCacheabilityPluginIfNeeded(),await s.cachePut(t,n.clone()))}return n}async _handleInstall(t,s){this._useDefaultCacheabilityPluginIfNeeded();const n=await s.fetch(t);if(!await s.cachePut(t,n.clone()))throw new e("bad-precaching-response",{url:t.url,status:n.status});return n}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==X.copyRedirectedCacheableResponsesPlugin&&(n===X.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);0===t?this.plugins.push(X.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}X.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},X.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await async function(t,s){let n=null;if(t.url&&(n=new URL(t.url).origin),n!==self.location.origin)throw new e("cross-origin-copy-response",{origin:n});const a=t.clone(),r={headers:new Headers(a.headers),status:a.status,statusText:a.statusText},i=s?s(r):r,c=function(){if(void 0===J){const e=new Response("");if("body"in e)try{new Response(e.body),J=!0}catch(e){J=!1}J=!1}return J}()?a.body:await a.blob();return new Response(c,i)}(t):t};class Y{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new X({cacheName:l(e),plugins:[...t,new Q({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(t){const s=[];for(const n of t){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:t,url:a}=$(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(a)&&this._urlsToCacheKeys.get(a)!==t)throw new e("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(a),secondEntry:t});if("string"!=typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(t)&&this._cacheKeysToIntegrities.get(t)!==n.integrity)throw new e("add-to-cache-list-conflicting-integrities",{url:a});this._cacheKeysToIntegrities.set(t,n.integrity)}if(this._urlsToCacheKeys.set(a,t),this._urlsToCacheModes.set(a,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return V(e,(async()=>{const t=new G;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const n=this._cacheKeysToIntegrities.get(s),a=this._urlsToCacheModes.get(t),r=new Request(t,{integrity:n,cache:a,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(e){return V(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(t){const s=this.getCacheKeyForURL(t);if(!s)throw new e("non-precached-url",{url:t});return e=>(e.request=new Request(t),e.params=Object.assign({cacheKey:s},e.params),this.strategy.handle(e))}}const Z=()=>(z||(z=new Y),z);class ee extends n{constructor(e,t){super((({request:s})=>{const n=e.getURLsToCacheKeys();for(const a of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:a}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(n){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=n.get(a);if(t)return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}),e.strategy)}}var te;c((e=>{let{url:t}=e;return t.pathname.startsWith("/images/")}),new _({cacheName:"images",plugins:[new v({statuses:[0,200]}),new H({maxAgeSeconds:31536e3,maxEntries:90})]})),c((e=>{let{url:t}=e;return t.pathname.startsWith("/songs/")}),new _({cacheName:"songs",plugins:[new v({statuses:[0,200]}),new H({maxAgeSeconds:31536e3,maxEntries:90})]})),c((e=>{let{url:t}=e;return t.href.startsWith("https://notes-api.dicoding.dev/v1/users/me")}),new class extends m{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(y),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(t,s){const n=[],a=[];let r;if(this._networkTimeoutSeconds){const{id:e,promise:i}=this._getTimeoutPromise({request:t,logs:n,handler:s});r=e,a.push(i)}const i=this._getNetworkPromise({timeoutId:r,request:t,logs:n,handler:s});a.push(i);const c=await s.waitUntil((async()=>await s.waitUntil(Promise.race(a))||await i)());if(!c)throw new e("no-response",{url:t.url});return c}_getTimeoutPromise({request:e,logs:t,handler:s}){let n;return{promise:new Promise((t=>{n=setTimeout((async()=>{t(await s.cacheMatch(e))}),1e3*this._networkTimeoutSeconds)})),id:n}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,handler:n}){let a,r;try{r=await n.fetchAndCachePut(t)}catch(e){e instanceof Error&&(a=e)}return e&&clearTimeout(e),!a&&r||(r=await n.cacheMatch(t)),r}}),c((e=>{let{url:t}=e;return t.href.startsWith("https://notes-api.dicoding.dev/v1")}),new _({cacheName:"notesAPI-data"})),c((e=>{let{url:t}=e;return t.href.startsWith("https://fonts.googleapis.com")}),new _({cacheName:"google-fonts-stylesheets"})),c((e=>{let{url:t}=e;return t.href.startsWith("https://fonts.gstatic.com")}),new class extends m{async _handle(t,s){let n,a=await s.cacheMatch(t);if(a);else try{a=await s.fetchAndCachePut(t)}catch(e){e instanceof Error&&(n=e)}if(!a)throw new e("no-response",{url:t.url,error:n});return a}}({cacheName:"google-fonts-webfonts",plugins:[new v({statuses:[0,200]}),new H({maxAgeSeconds:31536e3,maxEntries:30})]})),te=[{'revision':'bf4e925175c75a2e05832001a470a351','url':'/index.html'},{'revision':'d234a98b40b44c0a682d60c76834360b','url':'/main~263.bundle.js'},{'revision':'6963d4d54415797fc488cf5b112cbeb3','url':'/main~263.bundle.js.map'},{'revision':'e4c2f7da8b621f7acbecb3c0f98abc99','url':'/main~31.bundle.js'},{'revision':'78477b491205dd0060db54caa49abea9','url':'/main~31.bundle.js.LICENSE.txt'},{'revision':'655e18fe0d038007c72ff3b929176ccf','url':'/main~31.bundle.js.map'},{'revision':'a789ac36710b612ed94d7bb272e9b71f','url':'/main~329.bundle.js'},{'revision':'7167f42af12ff076e153f9028d4aa6bf','url':'/main~329.bundle.js.LICENSE.txt'},{'revision':'8ecb65dee3013f99d01bddee2bf26826','url':'/main~329.bundle.js.map'},{'revision':'98a3a7b9d8bf801972fea1f1764e6697','url':'/main~333.bundle.js'},{'revision':'30e6a32e85350d4f768aca79a868a38d','url':'/main~333.bundle.js.map'},{'revision':'79acf812affd7e43a5309abcc54302b7','url':'/main~465.bundle.js'},{'revision':'a13ae33eceab88a0c0b2be3848fb4107','url':'/main~465.bundle.js.map'},{'revision':'3e017d011ddef11b563b10b992bfc35c','url':'/main~551.bundle.js'},{'revision':'e1e1f91d155bb9614a2eedd666d5574b','url':'/main~551.bundle.js.LICENSE.txt'},{'revision':'033e50eed40821a34ae842732f5f6437','url':'/main~551.bundle.js.map'},{'revision':'cb9a3932efdbef5c06ef0a116841e49a','url':'/main~588.bundle.js'},{'revision':'96e35334d67af668f10158cffcf5a040','url':'/main~588.bundle.js.LICENSE.txt'},{'revision':'1455169166c8c4a68d8eac4cd7cca7f2','url':'/main~588.bundle.js.map'},{'revision':'7fa11adb25999913fd3903cb3902d41d','url':'/main~644.bundle.js'},{'revision':'7f71347342d2358b3c4088bdb00f4447','url':'/main~644.bundle.js.map'},{'revision':'28801c8deff55aecdd8f8648f810fd18','url':'/main~767.bundle.js'},{'revision':'945fe2325ea46b73fd9f87b38759f3fe','url':'/main~767.bundle.js.LICENSE.txt'},{'revision':'efddbbb1e22f515497ff433a217682ea','url':'/main~767.bundle.js.map'},{'revision':'012ca0e0c65739d390ea7b37ab37de89','url':'/main~819.bundle.js'},{'revision':'1fdc491f6e5540b96851ef3a0e865bcf','url':'/main~819.bundle.js.map'},{'revision':'ff3e8aa286b4c8166d7ae33481b7e9c5','url':'/main~828.bundle.js'},{'revision':'c97db1992ce56da1128d8e96657af7b5','url':'/main~828.bundle.js.LICENSE.txt'},{'revision':'d7517047346ab94d32be1e5df2f3df3e','url':'/main~828.bundle.js.map'},{'revision':'4edad93f7d961a77ef9f8aaf025e547f','url':'/main~app~4f064d56.bundle.js'},{'revision':'41c690eb253f446110fa35e8ea6742f0','url':'/main~app~4f064d56.bundle.js.map'},{'revision':'803009e568a11ee219f035a47cdb6a76','url':'/main~app~ac58a86e.bundle.js'},{'revision':'101d0f6e05249b7f3ee313f9959cc27d','url':'/main~app~ac58a86e.bundle.js.map'},{'revision':'b5704c011cf4fa4f62f97ba696b361b3','url':'/main~app~ef7d455c.bundle.js'},{'revision':'7b6cf74f3d46f288e8b2e2a3d8a0496d','url':'/main~app~ef7d455c.bundle.js.map'},{'revision':'d89a1cc062a3b1893f064ab332fed876','url':'/sw.js.map'}],Z().precache(te),function(e){const t=Z();c(new ee(t,e))}(undefined)})()})();
//# sourceMappingURL=sw.js.map