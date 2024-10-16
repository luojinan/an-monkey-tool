// ==UserScript==
// @name         线报增强
// @namespace    npm/vite-plugin-monkey
// @version      1.0.0
// @author       monkey
// @description  过滤无效评论，移除广告，移除不感兴趣作业，优化跳转
// @icon         http://new.xianbao.fun/favicon.ico
// @match        http://new.xianbao.fun/douban-maizu/*
// @match        http://new.xianbao.fun/category-douban-maizu/*
// @require      https://registry.npmmirror.com/preact/10.22.0/files/dist/preact.min.js
// @grant        GM_addStyle
// ==/UserScript==

(e=>{if(typeof GM_addStyle=="function"){GM_addStyle(e);return}const t=document.createElement("style");t.textContent=e,document.head.append(t)})(" .article-list .title a{text-decoration:none;white-space:unset}.header{z-index:unset}.listbox .newer,.pull-right{display:none} ");

(function (preact) {
  'use strict';

  var f$1 = 0;
  function u$1(e2, t2, n, o2, i2, u2) {
    t2 || (t2 = {});
    var a2, c2, p2 = t2;
    if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
    var l2 = { type: e2, props: p2, key: n, ref: a2, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: --f$1, __i: -1, __u: 0, __source: i2, __self: u2 };
    if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
    return preact.options.vnode && preact.options.vnode(l2), l2;
  }
  var t, r, u, i, o = 0, f = [], c = [], e = preact.options, a = e.__b, v = e.__r, l = e.diffed, m = e.__c, s = e.unmount, d = e.__;
  function h(n, t2) {
    e.__h && e.__h(r, n, o || t2), o = 0;
    var u2 = r.__H || (r.__H = { __: [], __h: [] });
    return n >= u2.__.length && u2.__.push({ __V: c }), u2.__[n];
  }
  function p(n) {
    return o = 1, y(D, n);
  }
  function y(n, u2, i2) {
    var o2 = h(t++, 2);
    if (o2.t = n, !o2.__c && (o2.__ = [D(void 0, u2), function(n2) {
      var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n2);
      t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
    }], o2.__c = r, !r.u)) {
      var f2 = function(n2, t2, r2) {
        if (!o2.__c.__H) return true;
        var u3 = o2.__c.__H.__.filter(function(n3) {
          return !!n3.__c;
        });
        if (u3.every(function(n3) {
          return !n3.__N;
        })) return !c2 || c2.call(this, n2, t2, r2);
        var i3 = false;
        return u3.forEach(function(n3) {
          if (n3.__N) {
            var t3 = n3.__[0];
            n3.__ = n3.__N, n3.__N = void 0, t3 !== n3.__[0] && (i3 = true);
          }
        }), !(!i3 && o2.__c.props === n2) && (!c2 || c2.call(this, n2, t2, r2));
      };
      r.u = true;
      var c2 = r.shouldComponentUpdate, e2 = r.componentWillUpdate;
      r.componentWillUpdate = function(n2, t2, r2) {
        if (this.__e) {
          var u3 = c2;
          c2 = void 0, f2(n2, t2, r2), c2 = u3;
        }
        e2 && e2.call(this, n2, t2, r2);
      }, r.shouldComponentUpdate = f2;
    }
    return o2.__N || o2.__;
  }
  function _(n, u2) {
    var i2 = h(t++, 3);
    !e.__s && C(i2.__H, u2) && (i2.__ = n, i2.i = u2, r.__H.__h.push(i2));
  }
  function j() {
    for (var n; n = f.shift(); ) if (n.__P && n.__H) try {
      n.__H.__h.forEach(z), n.__H.__h.forEach(B), n.__H.__h = [];
    } catch (t2) {
      n.__H.__h = [], e.__e(t2, n.__v);
    }
  }
  e.__b = function(n) {
    r = null, a && a(n);
  }, e.__ = function(n, t2) {
    n && t2.__k && t2.__k.__m && (n.__m = t2.__k.__m), d && d(n, t2);
  }, e.__r = function(n) {
    v && v(n), t = 0;
    var i2 = (r = n.__c).__H;
    i2 && (u === r ? (i2.__h = [], r.__h = [], i2.__.forEach(function(n2) {
      n2.__N && (n2.__ = n2.__N), n2.__V = c, n2.__N = n2.i = void 0;
    })) : (i2.__h.forEach(z), i2.__h.forEach(B), i2.__h = [], t = 0)), u = r;
  }, e.diffed = function(n) {
    l && l(n);
    var t2 = n.__c;
    t2 && t2.__H && (t2.__H.__h.length && (1 !== f.push(t2) && i === e.requestAnimationFrame || ((i = e.requestAnimationFrame) || w)(j)), t2.__H.__.forEach(function(n2) {
      n2.i && (n2.__H = n2.i), n2.__V !== c && (n2.__ = n2.__V), n2.i = void 0, n2.__V = c;
    })), u = r = null;
  }, e.__c = function(n, t2) {
    t2.some(function(n2) {
      try {
        n2.__h.forEach(z), n2.__h = n2.__h.filter(function(n3) {
          return !n3.__ || B(n3);
        });
      } catch (r2) {
        t2.some(function(n3) {
          n3.__h && (n3.__h = []);
        }), t2 = [], e.__e(r2, n2.__v);
      }
    }), m && m(n, t2);
  }, e.unmount = function(n) {
    s && s(n);
    var t2, r2 = n.__c;
    r2 && r2.__H && (r2.__H.__.forEach(function(n2) {
      try {
        z(n2);
      } catch (n3) {
        t2 = n3;
      }
    }), r2.__H = void 0, t2 && e.__e(t2, r2.__v));
  };
  var k = "function" == typeof requestAnimationFrame;
  function w(n) {
    var t2, r2 = function() {
      clearTimeout(u2), k && cancelAnimationFrame(t2), setTimeout(n);
    }, u2 = setTimeout(r2, 100);
    k && (t2 = requestAnimationFrame(r2));
  }
  function z(n) {
    var t2 = r, u2 = n.__c;
    "function" == typeof u2 && (n.__c = void 0, u2()), r = t2;
  }
  function B(n) {
    var t2 = r;
    n.__c = n.__(), r = t2;
  }
  function C(n, t2) {
    return !n || n.length !== t2.length || t2.some(function(t3, r2) {
      return t3 !== n[r2];
    });
  }
  function D(n, t2) {
    return "function" == typeof t2 ? t2(n) : t2;
  }
  function removeDomByList(list) {
    list.forEach((item) => {
      var _a;
      (_a = document.querySelectorAll(item)) == null ? void 0 : _a.forEach((item2) => item2.remove());
    });
  }
  const styles = '*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}:root,[data-theme]{background-color:var(--fallback-b1,oklch(var(--b1)/1));color:var(--fallback-bc,oklch(var(--bc)/1))}@supports not (color: oklch(0% 0 0)){:root{color-scheme:light;--fallback-p: #491eff;--fallback-pc: #d4dbff;--fallback-s: #ff41c7;--fallback-sc: #fff9fc;--fallback-a: #00cfbd;--fallback-ac: #00100d;--fallback-n: #2b3440;--fallback-nc: #d7dde4;--fallback-b1: #ffffff;--fallback-b2: #e5e6e6;--fallback-b3: #e5e6e6;--fallback-bc: #1f2937;--fallback-in: #00b3f0;--fallback-inc: #000000;--fallback-su: #00ca92;--fallback-suc: #000000;--fallback-wa: #ffc22d;--fallback-wac: #000000;--fallback-er: #ff6f70;--fallback-erc: #000000}@media (prefers-color-scheme: dark){:root{color-scheme:dark;--fallback-p: #7582ff;--fallback-pc: #050617;--fallback-s: #ff71cf;--fallback-sc: #190211;--fallback-a: #00c7b5;--fallback-ac: #000e0c;--fallback-n: #2a323c;--fallback-nc: #a6adbb;--fallback-b1: #1d232a;--fallback-b2: #191e24;--fallback-b3: #15191e;--fallback-bc: #a6adbb;--fallback-in: #00b3f0;--fallback-inc: #000000;--fallback-su: #00ca92;--fallback-suc: #000000;--fallback-wa: #ffc22d;--fallback-wac: #000000;--fallback-er: #ff6f70;--fallback-erc: #000000}}}html{-webkit-tap-highlight-color:transparent}*{scrollbar-color:color-mix(in oklch,currentColor 35%,transparent) transparent}*:hover{scrollbar-color:color-mix(in oklch,currentColor 60%,transparent) transparent}*{color-scheme:light;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 89.824% .06192 275.75;--ac: 15.352% .0368 183.61;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 49.12% .3096 275.75;--s: 69.71% .329 342.55;--sc: 98.71% .0106 342.55;--a: 76.76% .184 183.61;--n: 32.1785% .02476 255.701624;--nc: 89.4994% .011585 252.096176;--b1: 100% 0 0;--b2: 96.1151% 0 0;--b3: 92.4169% .00108 197.137559;--bc: 27.8078% .029596 256.847952}@media (prefers-color-scheme: dark){*{color-scheme:dark;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 13.138% .0392 275.75;--sc: 14.96% .052 342.55;--ac: 14.902% .0334 183.61;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 65.69% .196 275.75;--s: 74.8% .26 342.55;--a: 74.51% .167 183.61;--n: 31.3815% .021108 254.139175;--nc: 74.6477% .0216 264.435964;--b1: 25.3267% .015896 252.417568;--b2: 23.2607% .013807 253.100675;--b3: 21.1484% .01165 254.087939;--bc: 74.6477% .0216 264.435964}}[data-theme=light]{color-scheme:light;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 89.824% .06192 275.75;--ac: 15.352% .0368 183.61;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 49.12% .3096 275.75;--s: 69.71% .329 342.55;--sc: 98.71% .0106 342.55;--a: 76.76% .184 183.61;--n: 32.1785% .02476 255.701624;--nc: 89.4994% .011585 252.096176;--b1: 100% 0 0;--b2: 96.1151% 0 0;--b3: 92.4169% .00108 197.137559;--bc: 27.8078% .029596 256.847952}[data-theme=dark]{color-scheme:dark;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 13.138% .0392 275.75;--sc: 14.96% .052 342.55;--ac: 14.902% .0334 183.61;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 65.69% .196 275.75;--s: 74.8% .26 342.55;--a: 74.51% .167 183.61;--n: 31.3815% .021108 254.139175;--nc: 74.6477% .0216 264.435964;--b1: 25.3267% .015896 252.417568;--b2: 23.2607% .013807 253.100675;--b3: 21.1484% .01165 254.087939;--bc: 74.6477% .0216 264.435964}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.container{width:100%}@media (min-width: 640px){.container{max-width:640px}}@media (min-width: 768px){.container{max-width:768px}}@media (min-width: 1024px){.container{max-width:1024px}}@media (min-width: 1280px){.container{max-width:1280px}}@media (min-width: 1536px){.container{max-width:1536px}}.alert{display:grid;width:100%;grid-auto-flow:row;align-content:flex-start;align-items:center;justify-items:center;gap:1rem;text-align:center;border-radius:var(--rounded-box, 1rem);border-width:1px;--tw-border-opacity: 1;border-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)));padding:1rem;--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--alert-bg: var(--fallback-b2,oklch(var(--b2)/1));--alert-bg-mix: var(--fallback-b1,oklch(var(--b1)/1));background-color:var(--alert-bg)}@media (min-width: 640px){.alert{grid-auto-flow:column;grid-template-columns:auto minmax(auto,1fr);justify-items:start;text-align:start}}.avatar.placeholder>div{display:flex;align-items:center;justify-content:center}@media (hover:hover){.label a:hover{--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))}.menu li>*:not(ul,.menu-title,details,.btn):active,.menu li>*:not(ul,.menu-title,details,.btn).active,.menu li>details>summary:active{--tw-bg-opacity: 1;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-nc,oklch(var(--nc)/var(--tw-text-opacity)))}}.btn{display:inline-flex;height:3rem;min-height:3rem;flex-shrink:0;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;flex-wrap:wrap;align-items:center;justify-content:center;border-radius:var(--rounded-btn, .5rem);border-color:transparent;border-color:oklch(var(--btn-color, var(--b2)) / var(--tw-border-opacity));padding-left:1rem;padding-right:1rem;text-align:center;font-size:.875rem;line-height:1em;gap:.5rem;font-weight:600;text-decoration-line:none;transition-duration:.2s;transition-timing-function:cubic-bezier(0,0,.2,1);border-width:var(--border-btn, 1px);transition-property:color,background-color,border-color,opacity,box-shadow,transform;--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);outline-color:var(--fallback-bc,oklch(var(--bc)/1));background-color:oklch(var(--btn-color, var(--b2)) / var(--tw-bg-opacity));--tw-bg-opacity: 1;--tw-border-opacity: 1}.btn-disabled,.btn[disabled],.btn:disabled{pointer-events:none}:where(.btn:is(input[type=checkbox])),:where(.btn:is(input[type=radio])){width:auto;-webkit-appearance:none;-moz-appearance:none;appearance:none}.btn:is(input[type=checkbox]):after,.btn:is(input[type=radio]):after{--tw-content: attr(aria-label);content:var(--tw-content)}.card{position:relative;display:flex;flex-direction:column;border-radius:var(--rounded-box, 1rem)}.card:focus{outline:2px solid transparent;outline-offset:2px}.card figure{display:flex;align-items:center;justify-content:center}.card.image-full{display:grid}.card.image-full:before{position:relative;content:"";z-index:10;border-radius:var(--rounded-box, 1rem);--tw-bg-opacity: 1;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));opacity:.75}.card.image-full:before,.card.image-full>*{grid-column-start:1;grid-row-start:1}.card.image-full>figure img{height:100%;-o-object-fit:cover;object-fit:cover}.card.image-full>.card-body{position:relative;z-index:20;--tw-text-opacity: 1;color:var(--fallback-nc,oklch(var(--nc)/var(--tw-text-opacity)))}.checkbox{flex-shrink:0;--chkbg: var(--fallback-bc,oklch(var(--bc)/1));--chkfg: var(--fallback-b1,oklch(var(--b1)/1));height:1.5rem;width:1.5rem;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:var(--rounded-btn, .5rem);border-width:1px;border-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)));--tw-border-opacity: .2}.drawer{position:relative;display:grid;grid-auto-columns:max-content auto;width:100%}.drawer-side{pointer-events:none;position:fixed;inset-inline-start:0px;top:0;grid-column-start:1;grid-row-start:1;display:grid;width:100%;grid-template-columns:repeat(1,minmax(0,1fr));grid-template-rows:repeat(1,minmax(0,1fr));align-items:flex-start;justify-items:start;overflow-x:hidden;overflow-y:hidden;overscroll-behavior:contain;height:100vh;height:100dvh}.drawer-side>.drawer-overlay{position:sticky;top:0;place-self:stretch;cursor:pointer;background-color:transparent;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(0,0,.2,1);transition-duration:.2s}.drawer-side>*{grid-column-start:1;grid-row-start:1}.drawer-side>*:not(.drawer-overlay){transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(0,0,.2,1);transition-duration:.3s;will-change:transform;transform:translate(-100%)}[dir=rtl] .drawer-side>*:not(.drawer-overlay){transform:translate(100%)}.drawer-toggle{position:fixed;height:0px;width:0px;-webkit-appearance:none;-moz-appearance:none;appearance:none;opacity:0}.drawer-toggle:checked~.drawer-side{pointer-events:auto;visibility:visible;overflow-y:auto}.drawer-toggle:checked~.drawer-side>*:not(.drawer-overlay){transform:translate(0)}.drawer-end{grid-auto-columns:auto max-content}.drawer-end .drawer-toggle~.drawer-content{grid-column-start:1}.drawer-end .drawer-toggle~.drawer-side{grid-column-start:2;justify-items:end}.drawer-end .drawer-toggle~.drawer-side>*:not(.drawer-overlay){transform:translate(100%)}[dir=rtl] .drawer-end .drawer-toggle~.drawer-side>*:not(.drawer-overlay){transform:translate(-100%)}.drawer-end .drawer-toggle:checked~.drawer-side>*:not(.drawer-overlay){transform:translate(0)}@media (hover: hover){.btm-nav>*.disabled:hover,.btm-nav>*[disabled]:hover{pointer-events:none;--tw-border-opacity: 0;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-bg-opacity: .1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-text-opacity: .2}.btn:hover{--tw-border-opacity: 1;border-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))}@supports (color: color-mix(in oklab,black,black)){.btn:hover{background-color:color-mix(in oklab,oklch(var(--btn-color, var(--b2)) / var(--tw-bg-opacity, 1)) 90%,black);border-color:color-mix(in oklab,oklch(var(--btn-color, var(--b2)) / var(--tw-border-opacity, 1)) 90%,black)}}@supports not (color: oklch(0% 0 0)){.btn:hover{background-color:var(--btn-color, var(--fallback-b2));border-color:var(--btn-color, var(--fallback-b2))}}.btn.glass:hover{--glass-opacity: 25%;--glass-border-opacity: 15%}.btn-outline.btn-primary:hover{--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))}@supports (color: color-mix(in oklab,black,black)){.btn-outline.btn-primary:hover{background-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black)}}.btn-outline.btn-error:hover{--tw-text-opacity: 1;color:var(--fallback-erc,oklch(var(--erc)/var(--tw-text-opacity)))}@supports (color: color-mix(in oklab,black,black)){.btn-outline.btn-error:hover{background-color:color-mix(in oklab,var(--fallback-er,oklch(var(--er)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-er,oklch(var(--er)/1)) 90%,black)}}.btn-disabled:hover,.btn[disabled]:hover,.btn:disabled:hover{--tw-border-opacity: 0;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-bg-opacity: .2;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-text-opacity: .2}@supports (color: color-mix(in oklab,black,black)){.btn:is(input[type=checkbox]:checked):hover,.btn:is(input[type=radio]:checked):hover{background-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black)}}:where(.menu li:not(.menu-title,.disabled)>*:not(ul,details,.menu-title)):not(.active,.btn):hover,:where(.menu li:not(.menu-title,.disabled)>details>summary:not(.menu-title)):not(.active,.btn):hover{cursor:pointer;outline:2px solid transparent;outline-offset:2px}@supports (color: oklch(0% 0 0)){:where(.menu li:not(.menu-title,.disabled)>*:not(ul,details,.menu-title)):not(.active,.btn):hover,:where(.menu li:not(.menu-title,.disabled)>details>summary:not(.menu-title)):not(.active,.btn):hover{background-color:var(--fallback-bc,oklch(var(--bc)/.1))}}}.footer{display:grid;width:100%;grid-auto-flow:row;place-items:start;-moz-column-gap:1rem;column-gap:1rem;row-gap:2.5rem;font-size:.875rem;line-height:1.25rem}.footer>*{display:grid;place-items:start;gap:.5rem}@media (min-width: 48rem){.footer{grid-auto-flow:column}.footer-center{grid-auto-flow:row dense}}.label{display:flex;-webkit-user-select:none;-moz-user-select:none;user-select:none;align-items:center;justify-content:space-between;padding:.5rem .25rem}.input{flex-shrink:1;-webkit-appearance:none;-moz-appearance:none;appearance:none;height:3rem;padding-left:1rem;padding-right:1rem;font-size:1rem;line-height:2;line-height:1.5rem;border-radius:var(--rounded-btn, .5rem);border-width:1px;border-color:transparent;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}.input[type=number]::-webkit-inner-spin-button,.input-md[type=number]::-webkit-inner-spin-button{margin-top:-1rem;margin-bottom:-1rem;margin-inline-end:-1rem}.input-sm[type=number]::-webkit-inner-spin-button{margin-top:0;margin-bottom:0;margin-inline-end:-0px}.join{display:inline-flex;align-items:stretch;border-radius:var(--rounded-btn, .5rem)}.join :where(.join-item){border-start-end-radius:0;border-end-end-radius:0;border-end-start-radius:0;border-start-start-radius:0}.join .join-item:not(:first-child):not(:last-child),.join *:not(:first-child):not(:last-child) .join-item{border-start-end-radius:0;border-end-end-radius:0;border-end-start-radius:0;border-start-start-radius:0}.join .join-item:first-child:not(:last-child),.join *:first-child:not(:last-child) .join-item{border-start-end-radius:0;border-end-end-radius:0}.join .dropdown .join-item:first-child:not(:last-child),.join *:first-child:not(:last-child) .dropdown .join-item{border-start-end-radius:inherit;border-end-end-radius:inherit}.join :where(.join-item:first-child:not(:last-child)),.join :where(*:first-child:not(:last-child) .join-item){border-end-start-radius:inherit;border-start-start-radius:inherit}.join .join-item:last-child:not(:first-child),.join *:last-child:not(:first-child) .join-item{border-end-start-radius:0;border-start-start-radius:0}.join :where(.join-item:last-child:not(:first-child)),.join :where(*:last-child:not(:first-child) .join-item){border-start-end-radius:inherit;border-end-end-radius:inherit}@supports not selector(:has(*)){:where(.join *){border-radius:inherit}}@supports selector(:has(*)){:where(.join *:has(.join-item)){border-radius:inherit}}.link{cursor:pointer;text-decoration-line:underline}.menu{display:flex;flex-direction:column;flex-wrap:wrap;font-size:.875rem;line-height:1.25rem;padding:.5rem}.menu :where(li ul){position:relative;white-space:nowrap;margin-inline-start:1rem;padding-inline-start:.5rem}.menu :where(li:not(.menu-title)>*:not(ul,details,.menu-title,.btn)),.menu :where(li:not(.menu-title)>details>summary:not(.menu-title)){display:grid;grid-auto-flow:column;align-content:flex-start;align-items:center;gap:.5rem;grid-auto-columns:minmax(auto,max-content) auto max-content;-webkit-user-select:none;-moz-user-select:none;user-select:none}.menu li.disabled{cursor:not-allowed;-webkit-user-select:none;-moz-user-select:none;user-select:none;color:var(--fallback-bc,oklch(var(--bc)/.3))}.menu :where(li>.menu-dropdown:not(.menu-dropdown-show)){display:none}:where(.menu li){position:relative;display:flex;flex-shrink:0;flex-direction:column;flex-wrap:wrap;align-items:stretch}:where(.menu li) .badge{justify-self:end}.select{display:inline-flex;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;height:3rem;min-height:3rem;padding-inline-start:1rem;padding-inline-end:2.5rem;font-size:.875rem;line-height:1.25rem;line-height:2;border-radius:var(--rounded-btn, .5rem);border-width:1px;border-color:transparent;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)));background-image:linear-gradient(45deg,transparent 50%,currentColor 50%),linear-gradient(135deg,currentColor 50%,transparent 50%);background-position:calc(100% - 20px) calc(1px + 50%),calc(100% - 16.1px) calc(1px + 50%);background-size:4px 4px,4px 4px;background-repeat:no-repeat}.select[multiple]{height:auto}.textarea{min-height:3rem;flex-shrink:1;padding:.5rem 1rem;font-size:.875rem;line-height:1.25rem;line-height:2;border-radius:var(--rounded-btn, .5rem);border-width:1px;border-color:transparent;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}.toast{position:fixed;display:flex;min-width:-moz-fit-content;min-width:fit-content;flex-direction:column;white-space:nowrap;gap:.5rem;padding:1rem}.toggle{flex-shrink:0;--tglbg: var(--fallback-b1,oklch(var(--b1)/1));--handleoffset: 1.5rem;--handleoffsetcalculator: calc(var(--handleoffset) * -1);--togglehandleborder: 0 0;height:1.5rem;width:3rem;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:var(--rounded-badge, 1.9rem);border-width:1px;border-color:currentColor;background-color:currentColor;color:var(--fallback-bc,oklch(var(--bc)/.5));transition:background,box-shadow var(--animation-input, .2s) ease-out;box-shadow:var(--handleoffsetcalculator) 0 0 2px var(--tglbg) inset,0 0 0 2px var(--tglbg) inset,var(--togglehandleborder)}.alert-success{border-color:var(--fallback-su,oklch(var(--su)/.2));--tw-text-opacity: 1;color:var(--fallback-suc,oklch(var(--suc)/var(--tw-text-opacity)));--alert-bg: var(--fallback-su,oklch(var(--su)/1));--alert-bg-mix: var(--fallback-b1,oklch(var(--b1)/1))}.btm-nav>*.disabled,.btm-nav>*[disabled]{pointer-events:none;--tw-border-opacity: 0;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-bg-opacity: .1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-text-opacity: .2}.btm-nav>* .label{font-size:1rem;line-height:1.5rem}@media (prefers-reduced-motion: no-preference){.btn{animation:button-pop var(--animation-btn, .25s) ease-out}}.btn:active:hover,.btn:active:focus{animation:button-pop 0s ease-out;transform:scale(var(--btn-focus-scale, .97))}@supports not (color: oklch(0% 0 0)){.btn{background-color:var(--btn-color, var(--fallback-b2));border-color:var(--btn-color, var(--fallback-b2))}.btn-primary{--btn-color: var(--fallback-p)}.btn-error{--btn-color: var(--fallback-er)}}@supports (color: color-mix(in oklab,black,black)){.btn-outline.btn-primary.btn-active{background-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black)}.btn-outline.btn-error.btn-active{background-color:color-mix(in oklab,var(--fallback-er,oklch(var(--er)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-er,oklch(var(--er)/1)) 90%,black)}}.btn:focus-visible{outline-style:solid;outline-width:2px;outline-offset:2px}.btn-primary{--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)));outline-color:var(--fallback-p,oklch(var(--p)/1))}@supports (color: oklch(0% 0 0)){.btn-primary{--btn-color: var(--p)}.btn-error{--btn-color: var(--er)}}.btn-error{--tw-text-opacity: 1;color:var(--fallback-erc,oklch(var(--erc)/var(--tw-text-opacity)));outline-color:var(--fallback-er,oklch(var(--er)/1))}.btn.glass{--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);outline-color:currentColor}.btn.glass.btn-active{--glass-opacity: 25%;--glass-border-opacity: 15%}.btn-outline.btn-primary{--tw-text-opacity: 1;color:var(--fallback-p,oklch(var(--p)/var(--tw-text-opacity)))}.btn-outline.btn-primary.btn-active{--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))}.btn-outline.btn-error{--tw-text-opacity: 1;color:var(--fallback-er,oklch(var(--er)/var(--tw-text-opacity)))}.btn-outline.btn-error.btn-active{--tw-text-opacity: 1;color:var(--fallback-erc,oklch(var(--erc)/var(--tw-text-opacity)))}.btn.btn-disabled,.btn[disabled],.btn:disabled{--tw-border-opacity: 0;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-bg-opacity: .2;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-text-opacity: .2}.btn:is(input[type=checkbox]:checked),.btn:is(input[type=radio]:checked){--tw-border-opacity: 1;border-color:var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))}.btn:is(input[type=checkbox]:checked):focus-visible,.btn:is(input[type=radio]:checked):focus-visible{outline-color:var(--fallback-p,oklch(var(--p)/1))}@keyframes button-pop{0%{transform:scale(var(--btn-focus-scale, .98))}40%{transform:scale(1.02)}to{transform:scale(1)}}.card :where(figure:first-child){overflow:hidden;border-start-start-radius:inherit;border-start-end-radius:inherit;border-end-start-radius:unset;border-end-end-radius:unset}.card :where(figure:last-child){overflow:hidden;border-start-start-radius:unset;border-start-end-radius:unset;border-end-start-radius:inherit;border-end-end-radius:inherit}.card:focus-visible{outline:2px solid currentColor;outline-offset:2px}.card.bordered{border-width:1px;--tw-border-opacity: 1;border-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))}.card.compact .card-body{padding:1rem;font-size:.875rem;line-height:1.25rem}.card.image-full :where(figure){overflow:hidden;border-radius:inherit}.checkbox:focus{box-shadow:none}.checkbox:focus-visible{outline-style:solid;outline-width:2px;outline-offset:2px;outline-color:var(--fallback-bc,oklch(var(--bc)/1))}.checkbox:disabled{border-width:0px;cursor:not-allowed;border-color:transparent;--tw-bg-opacity: 1;background-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)));opacity:.2}.checkbox:checked,.checkbox[aria-checked=true]{background-repeat:no-repeat;animation:checkmark var(--animation-input, .2s) ease-out;background-color:var(--chkbg);background-image:linear-gradient(-45deg,transparent 65%,var(--chkbg) 65.99%),linear-gradient(45deg,transparent 75%,var(--chkbg) 75.99%),linear-gradient(-45deg,var(--chkbg) 40%,transparent 40.99%),linear-gradient(45deg,var(--chkbg) 30%,var(--chkfg) 30.99%,var(--chkfg) 40%,transparent 40.99%),linear-gradient(-45deg,var(--chkfg) 50%,var(--chkbg) 50.99%)}.checkbox:indeterminate{--tw-bg-opacity: 1;background-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)));background-repeat:no-repeat;animation:checkmark var(--animation-input, .2s) ease-out;background-image:linear-gradient(90deg,transparent 80%,var(--chkbg) 80%),linear-gradient(-90deg,transparent 80%,var(--chkbg) 80%),linear-gradient(0deg,var(--chkbg) 43%,var(--chkfg) 43%,var(--chkfg) 57%,var(--chkbg) 57%)}@keyframes checkmark{0%{background-position-y:5px}50%{background-position-y:-2px}to{background-position-y:0}}.drawer-toggle:checked~.drawer-side>.drawer-overlay{background-color:#0006}.drawer-toggle:focus-visible~.drawer-content label.drawer-button{outline-style:solid;outline-width:2px;outline-offset:2px}.input input{--tw-bg-opacity: 1;background-color:var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)));background-color:transparent}.input input:focus{outline:2px solid transparent;outline-offset:2px}.input[list]::-webkit-calendar-picker-indicator{line-height:1em}.input-bordered{border-color:var(--fallback-bc,oklch(var(--bc)/.2))}.input:focus,.input:focus-within{box-shadow:none;border-color:var(--fallback-bc,oklch(var(--bc)/.2));outline-style:solid;outline-width:2px;outline-offset:2px;outline-color:var(--fallback-bc,oklch(var(--bc)/.2))}.input:has(>input[disabled]),.input-disabled,.input:disabled,.input[disabled]{cursor:not-allowed;--tw-border-opacity: 1;border-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)));color:var(--fallback-bc,oklch(var(--bc)/.4))}.input:has(>input[disabled])::-moz-placeholder,.input-disabled::-moz-placeholder,.input:disabled::-moz-placeholder,.input[disabled]::-moz-placeholder{color:var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)));--tw-placeholder-opacity: .2}.input:has(>input[disabled])::placeholder,.input-disabled::placeholder,.input:disabled::placeholder,.input[disabled]::placeholder{color:var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)));--tw-placeholder-opacity: .2}.input:has(>input[disabled])>input[disabled]{cursor:not-allowed}.input::-webkit-date-and-time-value{text-align:inherit}.join>:where(*:not(:first-child)){margin-top:0;margin-bottom:0;margin-inline-start:-1px}.join>:where(*:not(:first-child)):is(.btn){margin-inline-start:calc(var(--border-btn) * -1)}.link:focus{outline:2px solid transparent;outline-offset:2px}.link:focus-visible{outline:2px solid currentColor;outline-offset:2px}:where(.menu li:empty){--tw-bg-opacity: 1;background-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)));opacity:.1;margin:.5rem 1rem;height:1px}.menu :where(li ul):before{position:absolute;bottom:.75rem;inset-inline-start:0px;top:.75rem;width:1px;--tw-bg-opacity: 1;background-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)));opacity:.1;content:""}.menu :where(li:not(.menu-title)>*:not(ul,details,.menu-title,.btn)),.menu :where(li:not(.menu-title)>details>summary:not(.menu-title)){border-radius:var(--rounded-btn, .5rem);padding:.5rem 1rem;text-align:start;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(0,0,.2,1);transition-duration:.2s;text-wrap:balance}:where(.menu li:not(.menu-title,.disabled)>*:not(ul,details,.menu-title)):not(summary,.active,.btn).focus,:where(.menu li:not(.menu-title,.disabled)>*:not(ul,details,.menu-title)):not(summary,.active,.btn):focus,:where(.menu li:not(.menu-title,.disabled)>*:not(ul,details,.menu-title)):is(summary):not(.active,.btn):focus-visible,:where(.menu li:not(.menu-title,.disabled)>details>summary:not(.menu-title)):not(summary,.active,.btn).focus,:where(.menu li:not(.menu-title,.disabled)>details>summary:not(.menu-title)):not(summary,.active,.btn):focus,:where(.menu li:not(.menu-title,.disabled)>details>summary:not(.menu-title)):is(summary):not(.active,.btn):focus-visible{cursor:pointer;background-color:var(--fallback-bc,oklch(var(--bc)/.1));--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));outline:2px solid transparent;outline-offset:2px}.menu li>*:not(ul,.menu-title,details,.btn):active,.menu li>*:not(ul,.menu-title,details,.btn).active,.menu li>details>summary:active{--tw-bg-opacity: 1;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-nc,oklch(var(--nc)/var(--tw-text-opacity)))}.menu :where(li>details>summary)::-webkit-details-marker{display:none}.menu :where(li>details>summary):after,.menu :where(li>.menu-dropdown-toggle):after{justify-self:end;display:block;margin-top:-.5rem;height:.5rem;width:.5rem;transform:rotate(45deg);transition-property:transform,margin-top;transition-duration:.3s;transition-timing-function:cubic-bezier(.4,0,.2,1);content:"";transform-origin:75% 75%;box-shadow:2px 2px;pointer-events:none}.menu :where(li>details[open]>summary):after,.menu :where(li>.menu-dropdown-toggle.menu-dropdown-show):after{transform:rotate(225deg);margin-top:0}.mockup-phone .display{overflow:hidden;border-radius:40px;margin-top:-25px}.mockup-browser .mockup-browser-toolbar .input{position:relative;margin-left:auto;margin-right:auto;display:block;height:1.75rem;width:24rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)));padding-left:2rem;direction:ltr}.mockup-browser .mockup-browser-toolbar .input:before{content:"";position:absolute;left:.5rem;top:50%;aspect-ratio:1 / 1;height:.75rem;--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-radius:9999px;border-width:2px;border-color:currentColor;opacity:.6}.mockup-browser .mockup-browser-toolbar .input:after{content:"";position:absolute;left:1.25rem;top:50%;height:.5rem;--tw-translate-y: 25%;--tw-rotate: -45deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-radius:9999px;border-width:1px;border-color:currentColor;opacity:.6}@keyframes modal-pop{0%{opacity:0}}@keyframes progress-loading{50%{background-position-x:-115%}}@keyframes radiomark{0%{box-shadow:0 0 0 12px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 12px var(--fallback-b1,oklch(var(--b1)/1)) inset}50%{box-shadow:0 0 0 3px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 3px var(--fallback-b1,oklch(var(--b1)/1)) inset}to{box-shadow:0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset}}@keyframes rating-pop{0%{transform:translateY(-.125em)}40%{transform:translateY(-.125em)}to{transform:translateY(0)}}.select:focus{box-shadow:none;border-color:var(--fallback-bc,oklch(var(--bc)/.2));outline-style:solid;outline-width:2px;outline-offset:2px;outline-color:var(--fallback-bc,oklch(var(--bc)/.2))}.select-disabled,.select:disabled,.select[disabled]{cursor:not-allowed;--tw-border-opacity: 1;border-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)));color:var(--fallback-bc,oklch(var(--bc)/.4))}.select-disabled::-moz-placeholder,.select:disabled::-moz-placeholder,.select[disabled]::-moz-placeholder{color:var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)));--tw-placeholder-opacity: .2}.select-disabled::placeholder,.select:disabled::placeholder,.select[disabled]::placeholder{color:var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)));--tw-placeholder-opacity: .2}.select-multiple,.select[multiple],.select[size].select:not([size="1"]){background-image:none;padding-right:1rem}[dir=rtl] .select{background-position:calc(0% + 12px) calc(1px + 50%),calc(0% + 16px) calc(1px + 50%)}@keyframes skeleton{0%{background-position:150%}to{background-position:-50%}}.textarea:focus{box-shadow:none;border-color:var(--fallback-bc,oklch(var(--bc)/.2));outline-style:solid;outline-width:2px;outline-offset:2px;outline-color:var(--fallback-bc,oklch(var(--bc)/.2))}.textarea-disabled,.textarea:disabled,.textarea[disabled]{cursor:not-allowed;--tw-border-opacity: 1;border-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)));color:var(--fallback-bc,oklch(var(--bc)/.4))}.textarea-disabled::-moz-placeholder,.textarea:disabled::-moz-placeholder,.textarea[disabled]::-moz-placeholder{color:var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)));--tw-placeholder-opacity: .2}.textarea-disabled::placeholder,.textarea:disabled::placeholder,.textarea[disabled]::placeholder{color:var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)));--tw-placeholder-opacity: .2}.toast>*{animation:toast-pop .25s ease-out}@keyframes toast-pop{0%{transform:scale(.9);opacity:0}to{transform:scale(1);opacity:1}}[dir=rtl] .toggle{--handleoffsetcalculator: calc(var(--handleoffset) * 1)}.toggle:focus-visible{outline-style:solid;outline-width:2px;outline-offset:2px;outline-color:var(--fallback-bc,oklch(var(--bc)/.2))}.toggle:hover{background-color:currentColor}.toggle:checked,.toggle[aria-checked=true]{background-image:none;--handleoffsetcalculator: var(--handleoffset);--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))}[dir=rtl] .toggle:checked,[dir=rtl] .toggle[aria-checked=true]{--handleoffsetcalculator: calc(var(--handleoffset) * -1)}.toggle:indeterminate{--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));box-shadow:calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg) inset,calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg) inset,0 0 0 2px var(--tglbg) inset}[dir=rtl] .toggle:indeterminate{box-shadow:calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg) inset,calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg) inset,0 0 0 2px var(--tglbg) inset}.toggle-primary:focus-visible{outline-color:var(--fallback-p,oklch(var(--p)/1))}.toggle-primary:checked,.toggle-primary[aria-checked=true]{border-color:var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)));--tw-border-opacity: .1;--tw-bg-opacity: 1;background-color:var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))}.toggle:disabled{cursor:not-allowed;--tw-border-opacity: 1;border-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)));background-color:transparent;opacity:.3;--togglehandleborder: 0 0 0 3px var(--fallback-bc,oklch(var(--bc)/1)) inset, var(--handleoffsetcalculator) 0 0 3px var(--fallback-bc,oklch(var(--bc)/1)) inset}.btn-sm{height:2rem;min-height:2rem;padding-left:.75rem;padding-right:.75rem;font-size:.875rem}.btn-square:where(.btn-sm){height:2rem;width:2rem;padding:0}.btn-circle:where(.btn-sm){height:2rem;width:2rem;border-radius:9999px;padding:0}.drawer-open>.drawer-toggle{display:none}.drawer-open>.drawer-toggle~.drawer-side{pointer-events:auto;visibility:visible;position:sticky;display:block;width:auto;overscroll-behavior:auto}.drawer-open>.drawer-toggle~.drawer-side>*:not(.drawer-overlay){transform:translate(0)}[dir=rtl] .drawer-open>.drawer-toggle~.drawer-side>*:not(.drawer-overlay){transform:translate(0)}.drawer-open>.drawer-toggle:checked~.drawer-side{pointer-events:auto;visibility:visible}.drawer-open>.drawer-side{overflow-y:auto}html:has(.drawer-toggle:checked){overflow-y:hidden;scrollbar-gutter:stable}.input-sm{height:2rem;padding-left:.75rem;padding-right:.75rem;font-size:.875rem;line-height:2rem}.join.join-vertical{flex-direction:column}.join.join-vertical .join-item:first-child:not(:last-child),.join.join-vertical *:first-child:not(:last-child) .join-item{border-end-start-radius:0;border-end-end-radius:0;border-start-start-radius:inherit;border-start-end-radius:inherit}.join.join-vertical .join-item:last-child:not(:first-child),.join.join-vertical *:last-child:not(:first-child) .join-item{border-start-start-radius:0;border-start-end-radius:0;border-end-start-radius:inherit;border-end-end-radius:inherit}.join.join-horizontal{flex-direction:row}.join.join-horizontal .join-item:first-child:not(:last-child),.join.join-horizontal *:first-child:not(:last-child) .join-item{border-end-end-radius:0;border-start-end-radius:0;border-end-start-radius:inherit;border-start-start-radius:inherit}.join.join-horizontal .join-item:last-child:not(:first-child),.join.join-horizontal *:last-child:not(:first-child) .join-item{border-end-start-radius:0;border-start-start-radius:0;border-end-end-radius:inherit;border-start-end-radius:inherit}:where(.toast){bottom:0;inset-inline-end:0px;inset-inline-start:auto;top:auto;--tw-translate-x: 0px;--tw-translate-y: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.toast:where(.toast-start){inset-inline-end:auto;inset-inline-start:0px;--tw-translate-x: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.toast:where(.toast-center){inset-inline-end:50%;inset-inline-start:50%;--tw-translate-x: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.toast:where(.toast-center):where([dir=rtl],[dir=rtl] *){--tw-translate-x: 50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.toast:where(.toast-end){inset-inline-end:0px;inset-inline-start:auto;--tw-translate-x: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.toast:where(.toast-bottom){bottom:0;top:auto;--tw-translate-y: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.toast:where(.toast-middle){bottom:auto;top:50%;--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.toast:where(.toast-top){bottom:auto;top:0;--tw-translate-y: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.drawer-open>.drawer-toggle~.drawer-side>.drawer-overlay{cursor:default;background-color:transparent}.join.join-vertical>:where(*:not(:first-child)){margin-left:0;margin-right:0;margin-top:-1px}.join.join-vertical>:where(*:not(:first-child)):is(.btn){margin-top:calc(var(--border-btn) * -1)}.join.join-horizontal>:where(*:not(:first-child)){margin-top:0;margin-bottom:0;margin-inline-start:-1px}.join.join-horizontal>:where(*:not(:first-child)):is(.btn){margin-inline-start:calc(var(--border-btn) * -1)}.fixed{position:fixed}.absolute{position:absolute}.bottom-5{bottom:1.25rem}.right-2{right:.5rem}.z-10{z-index:10}.mx-1{margin-left:.25rem;margin-right:.25rem}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.mb-6{margin-bottom:1.5rem}.ml-2{margin-left:.5rem}.mt-1{margin-top:.25rem}.inline{display:inline}.flex{display:flex}.hidden{display:none}.min-h-full{min-height:100%}.w-4\\/5{width:80%}.w-full{width:100%}.max-w-xs{max-width:20rem}.flex-row{flex-direction:row}.items-center{align-items:center}.justify-between{justify-content:space-between}.whitespace-pre-wrap{white-space:pre-wrap}.rounded-box{border-radius:var(--rounded-box, 1rem)}.border{border-width:1px}.bg-base-200{--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))}.p-4{padding:1rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.text-2xl{font-size:1.5rem;line-height:2rem}.font-semibold{font-weight:600}.text-base-content{--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.underline{text-decoration-line:underline}.shadow-md{--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1);--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}:root{box-sizing:border-box;background-color:unset;color-scheme:unset;color:unset}.article-list .title a{text-decoration:none;white-space:unset}.topic-reply li .reply-doc p{margin:0}.reply-quote{width:unset}@media (min-width: 640px){.sm\\:w-1\\/2{width:50%}}';
  const NOT_NEED_LIST = [
    "日抛",
    "精油",
    "精华",
    "香水",
    "车走",
    "面霜",
    "身体乳",
    "申删",
    "母婴",
    "隔离",
    "美瞳",
    "【删】",
    "【交流】",
    "月抛",
    "腮红",
    "🚗走",
    "🚗跑",
    "小金管",
    "抗糖小白瓶",
    "眼霜",
    "面膜",
    "气垫",
    "双萃",
    "双抗"
  ];
  const STORAGE_KEY = "blacklist";
  const Blacklist = ({ onRefreshList }) => {
    const initialData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const [blacklist, setBlacklist] = p(initialData);
    const [newEntry, setNewEntry] = p("");
    _(() => {
      if (initialData.length === 0) {
        setBlacklist(NOT_NEED_LIST.map((item) => ({ name: item, disabled: false })));
        return;
      }
    }, []);
    _(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(blacklist));
      console.log("useEffect blacklist");
      onRefreshList(blacklist.filter((item) => !item.disabled));
    }, [blacklist]);
    const handleAdd = () => {
      if (newEntry.trim() !== "") {
        const updatedList = [{ name: newEntry, disabled: true }, ...blacklist];
        setBlacklist(updatedList);
        setNewEntry("");
      }
    };
    const handleDelete = (index) => {
      const filteredList = blacklist.filter((item, idx) => idx !== index);
      setBlacklist(filteredList);
    };
    const handleToggleDisabled = (index) => {
      const updatedList = [...blacklist];
      updatedList[index].disabled = !updatedList[index].disabled;
      setBlacklist(updatedList);
    };
    const handleInputChange = (index, value) => {
      const updatedList = [...blacklist];
      updatedList[index].name = value;
      setBlacklist(updatedList);
    };
    return /* @__PURE__ */ u$1("div", { className: "p-4", children: [
      /* @__PURE__ */ u$1("h1", { className: "text-2xl font-semibold mb-4", children: "不感兴趣关键字" }),
      /* @__PURE__ */ u$1("p", { children: "用于过滤不想看的作业，修改实时保存并过滤，不需要刷新" }),
      /* @__PURE__ */ u$1("div", { className: "flex items-center mb-6 mt-1", children: [
        /* @__PURE__ */ u$1(
          "input",
          {
            type: "text",
            className: "input input-bordered w-full max-w-xs",
            placeholder: "输入后点击右侧",
            value: newEntry,
            onChange: (e2) => setNewEntry(e2.target.value)
          }
        ),
        /* @__PURE__ */ u$1("button", { className: "btn btn-primary ml-2", onClick: handleAdd, children: "➕" })
      ] }),
      blacklist.map((item, index) => /* @__PURE__ */ u$1("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ u$1("span", { children: [
          index + 1,
          "."
        ] }),
        /* @__PURE__ */ u$1(
          "input",
          {
            type: "text",
            value: item.name,
            placeholder: "输入关键词",
            className: "input input-bordered input-sm w-full max-w-xs mx-1",
            onChange: (e2) => handleInputChange(index, e2.target.value)
          }
        ),
        /* @__PURE__ */ u$1("div", { className: "flex items-center", children: [
          /* @__PURE__ */ u$1("input", { type: "checkbox", className: "toggle toggle-primary", checked: !item.disabled, onChange: () => handleToggleDisabled(index) }),
          /* @__PURE__ */ u$1("button", { className: "btn btn-sm btn-error ml-2", onClick: () => handleDelete(index), children: "⌫" })
        ] })
      ] }, index))
    ] });
  };
  function App() {
    const [count, setCount] = p(0);
    const [showToast, setShowToast] = p(false);
    const todoubanWithAnswer = () => {
      const questionList = [];
      document.querySelectorAll(".g-biaoti").forEach((item) => {
        questionList.push({ question: item.textContent });
      });
      document.querySelectorAll(".g-neirong").forEach((nrDom, index) => {
        const text = nrDom.textContent.split("\n").filter((item) => !!item.trim() && !item.includes("智能AI助手")).join("");
        questionList[index].answer = text;
      });
      return questionList;
    };
    const clearWeb = () => {
      var _a, _b, _c;
      const strList = [".nav2-ul", ".article-list.top", ".pop-hongbao-on", ".tishi", ".xiangguan", "aside", "#commentbox", ".footer"];
      removeDomByList(strList);
      setTimeout(() => {
        removeDomByList(strList);
      }, 1e3);
      (_b = (_a = document.querySelector(".copyright")) == null ? void 0 : _a.parentElement) == null ? void 0 : _b.remove();
      (_c = document.querySelector(".art-copyright a")) == null ? void 0 : _c.setAttribute("target", "_self");
    };
    const refreshList = (filterList) => {
      const zoyeList = document.querySelectorAll(".article-list .title a");
      let num = count;
      if (zoyeList.length) {
        zoyeList.forEach((item) => {
          var _a;
          item.setAttribute("target", "_self");
          const isNoNeed = filterList.some(({ name }) => item.textContent.includes(name));
          if (isNoNeed) {
            num += 1;
            (_a = item.closest(".article-list")) == null ? void 0 : _a.remove();
          }
        });
      }
      setCount(num);
    };
    _(() => {
      console.log("✨ xb douban 脚本 ✨");
      clearWeb();
      const qaList = todoubanWithAnswer();
      const originA = document.querySelector(".art-copyright a");
      const originHref = originA == null ? void 0 : originA.getAttribute("href");
      console.log("设置新链接", originHref);
      if (originA && originHref) {
        originA.setAttribute("href", `${originHref}?qa=${encodeURIComponent(JSON.stringify(qaList))}`);
        window.location.replace(`${originHref}?qa=${encodeURIComponent(JSON.stringify(qaList))}`);
      }
    }, []);
    return /* @__PURE__ */ u$1(preact.Fragment, { children: [
      /* @__PURE__ */ u$1("style", { children: styles }),
      /* @__PURE__ */ u$1("div", { className: "drawer drawer-end", style: { "zIndex": 1 }, children: [
        /* @__PURE__ */ u$1("input", { id: "my-drawer", type: "checkbox", className: "drawer-toggle" }),
        /* @__PURE__ */ u$1("div", { className: "fixed right-2 bottom-5", children: /* @__PURE__ */ u$1("label", { htmlFor: "my-drawer", className: "btn btn-primary drawer-button", children: [
          "✨ 已移除不感兴趣作业",
          count,
          "条"
        ] }) }),
        /* @__PURE__ */ u$1("div", { className: "drawer-side", children: [
          /* @__PURE__ */ u$1("label", { htmlFor: "my-drawer", "aria-label": "close sidebar", className: "drawer-overlay" }),
          /* @__PURE__ */ u$1("ul", { className: "menu bg-base-200 text-base-content min-h-full w-4/5 p-4", children: /* @__PURE__ */ u$1(Blacklist, { onRefreshList: refreshList }) })
        ] })
      ] }),
      /* @__PURE__ */ u$1("div", { className: "toast toast-center z-10", children: /* @__PURE__ */ u$1("div", { className: `alert alert-success text-white ${showToast ? "" : "hidden"}`, children: /* @__PURE__ */ u$1("span", { children: "🎉 复制成功，去粘贴吧～" }) }) })
    ] });
  }
  preact.render(
    /* @__PURE__ */ u$1(App, {}),
    (() => {
      const container = document.createElement("div");
      container.id = "shadowContainer";
      const shadowDom = container.attachShadow({ mode: "open" });
      const root = document.createElement("div");
      shadowDom.appendChild(root);
      document.body.appendChild(container);
      return root;
    })()
  );

})(preact);