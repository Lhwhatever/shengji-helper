(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"9eSz":function(e,t,a){"use strict";a("rGqo"),a("yt8O"),a("Btvt"),a("XfO3"),a("EK0E"),a("INYr"),a("0mN4");var i=a("TqRt");t.__esModule=!0,t.default=void 0;var n,r=i(a("PJYZ")),s=i(a("VbXa")),o=i(a("8OQS")),l=i(a("pVnL")),d=i(a("q1tI")),c=i(a("17x9")),u=function(e){var t=(0,l.default)({},e),a=t.resolutions,i=t.sizes,n=t.critical;return a&&(t.fixed=a,delete t.resolutions),i&&(t.fluid=i,delete t.sizes),n&&(t.loading="eager"),t.fluid&&(t.fluid=O([].concat(t.fluid))),t.fixed&&(t.fixed=O([].concat(t.fixed))),t},f=function(e){var t=e.media;return!!t&&(y&&!!window.matchMedia(t).matches)},p=function(e){var t=e.fluid,a=e.fixed;return m(t||a).src},m=function(e){if(y&&function(e){return!!e&&Array.isArray(e)&&e.some((function(e){return void 0!==e.media}))}(e)){var t=e.findIndex(f);if(-1!==t)return e[t]}return e[0]},g=Object.create({}),h=function(e){var t=u(e),a=p(t);return g[a]||!1},b="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,y="undefined"!=typeof window,v=y&&window.IntersectionObserver,w=new WeakMap;function E(e){return e.map((function(e){var t=e.src,a=e.srcSet,i=e.srcSetWebp,n=e.media,r=e.sizes;return d.default.createElement(d.default.Fragment,{key:t},i&&d.default.createElement("source",{type:"image/webp",media:n,srcSet:i,sizes:r}),d.default.createElement("source",{media:n,srcSet:a,sizes:r}))}))}function O(e){var t=[],a=[];return e.forEach((function(e){return(e.media?t:a).push(e)})),[].concat(t,a)}function x(e){return e.map((function(e){var t=e.src,a=e.media,i=e.tracedSVG;return d.default.createElement("source",{key:t,media:a,srcSet:i})}))}function S(e){return e.map((function(e){var t=e.src,a=e.media,i=e.base64;return d.default.createElement("source",{key:t,media:a,srcSet:i})}))}function j(e,t){var a=e.srcSet,i=e.srcSetWebp,n=e.media,r=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(n?'media="'+n+'" ':"")+'srcset="'+(t?i:a)+'" '+(r?'sizes="'+r+'" ':"")+"/>"}var k=function(e,t){var a=(void 0===n&&"undefined"!=typeof window&&window.IntersectionObserver&&(n=new window.IntersectionObserver((function(e){e.forEach((function(e){if(w.has(e.target)){var t=w.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(n.unobserve(e.target),w.delete(e.target),t())}}))}),{rootMargin:"200px"})),n);return a&&(a.observe(e),w.set(e,t)),function(){a.unobserve(e),w.delete(e)}},L=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",i=e.srcSet?'srcset="'+e.srcSet+'" ':"",n=e.title?'title="'+e.title+'" ':"",r=e.alt?'alt="'+e.alt+'" ':'alt="" ',s=e.width?'width="'+e.width+'" ':"",o=e.height?'height="'+e.height+'" ':"",l=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",d=e.loading?'loading="'+e.loading+'" ':"",c=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map((function(e){return(e.srcSetWebp?j(e,!0):"")+j(e)})).join("")+"<img "+d+s+o+a+i+t+r+n+l+c+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},D=function(e){var t=e.src,a=e.imageVariants,i=e.generateSources,n=e.spreadProps,r=e.ariaHidden,s=d.default.createElement(R,(0,l.default)({src:t},n,{ariaHidden:r}));return a.length>1?d.default.createElement("picture",null,i(a),s):s},R=d.default.forwardRef((function(e,t){var a=e.sizes,i=e.srcSet,n=e.src,r=e.style,s=e.onLoad,c=e.onError,u=e.loading,f=e.draggable,p=e.ariaHidden,m=(0,o.default)(e,["sizes","srcSet","src","style","onLoad","onError","loading","draggable","ariaHidden"]);return d.default.createElement("img",(0,l.default)({"aria-hidden":p,sizes:a,srcSet:i,src:n},m,{onLoad:s,onError:c,ref:t,loading:u,draggable:f,style:(0,l.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},r)}))}));R.propTypes={style:c.default.object,onError:c.default.func,onLoad:c.default.func};var V=function(e){function t(t){var a;(a=e.call(this,t)||this).seenBefore=y&&h(t),a.isCritical="eager"===t.loading||t.critical,a.addNoScript=!(a.isCritical&&!t.fadeIn),a.useIOSupport=!b&&v&&!a.isCritical&&!a.seenBefore;var i=a.isCritical||y&&(b||!a.useIOSupport);return a.state={isVisible:i,imgLoaded:!1,imgCached:!1,fadeIn:!a.seenBefore&&t.fadeIn},a.imageRef=d.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,r.default)(a)),a.handleRef=a.handleRef.bind((0,r.default)(a)),a}(0,s.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:h(this.props)}),this.isCritical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},a.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=k(e,(function(){var e=h(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},(function(){return t.setState({imgLoaded:e,imgCached:!!t.imageRef.current.currentSrc})}))})))},a.handleImageLoaded=function(){var e,t,a;e=this.props,t=u(e),a=p(t),g[a]=!0,this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=u(this.props),t=e.title,a=e.alt,i=e.className,n=e.style,r=void 0===n?{}:n,s=e.imgStyle,o=void 0===s?{}:s,c=e.placeholderStyle,f=void 0===c?{}:c,p=e.placeholderClassName,g=e.fluid,h=e.fixed,b=e.backgroundColor,y=e.durationFadeIn,v=e.Tag,w=e.itemProp,O=e.loading,j=e.draggable,k=!1===this.state.fadeIn||this.state.imgLoaded,V=!0===this.state.fadeIn&&!this.state.imgCached,A=(0,l.default)({opacity:k?1:0,transition:V?"opacity "+y+"ms":"none"},o),U="boolean"==typeof b?"lightgray":b,C={transitionDelay:y+"ms"},I=(0,l.default)({opacity:this.state.imgLoaded?0:1},V&&C,{},o,{},f),z={title:t,alt:this.state.isVisible?"":a,style:I,className:p,itemProp:w};if(g){var N=g,T=m(g);return d.default.createElement(v,{className:(i||"")+" gatsby-image-wrapper",style:(0,l.default)({position:"relative",overflow:"hidden"},r),ref:this.handleRef,key:"fluid-"+JSON.stringify(T.srcSet)},d.default.createElement(v,{"aria-hidden":!0,style:{width:"100%",paddingBottom:100/T.aspectRatio+"%"}}),U&&d.default.createElement(v,{"aria-hidden":!0,title:t,style:(0,l.default)({backgroundColor:U,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},V&&C)}),T.base64&&d.default.createElement(D,{ariaHidden:!0,src:T.base64,spreadProps:z,imageVariants:N,generateSources:S}),T.tracedSVG&&d.default.createElement(D,{ariaHidden:!0,src:T.tracedSVG,spreadProps:z,imageVariants:N,generateSources:x}),this.state.isVisible&&d.default.createElement("picture",null,E(N),d.default.createElement(R,{alt:a,title:t,sizes:T.sizes,src:T.src,crossOrigin:this.props.crossOrigin,srcSet:T.srcSet,style:A,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:w,loading:O,draggable:j})),this.addNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:L((0,l.default)({alt:a,title:t,loading:O},T,{imageVariants:N}))}}))}if(h){var P=h,W=m(h),G=(0,l.default)({position:"relative",overflow:"hidden",display:"inline-block",width:W.width,height:W.height},r);return"inherit"===r.display&&delete G.display,d.default.createElement(v,{className:(i||"")+" gatsby-image-wrapper",style:G,ref:this.handleRef,key:"fixed-"+JSON.stringify(W.srcSet)},U&&d.default.createElement(v,{"aria-hidden":!0,title:t,style:(0,l.default)({backgroundColor:U,width:W.width,opacity:this.state.imgLoaded?0:1,height:W.height},V&&C)}),W.base64&&d.default.createElement(D,{ariaHidden:!0,src:W.base64,spreadProps:z,imageVariants:P,generateSources:S}),W.tracedSVG&&d.default.createElement(D,{ariaHidden:!0,src:W.tracedSVG,spreadProps:z,imageVariants:P,generateSources:x}),this.state.isVisible&&d.default.createElement("picture",null,E(P),d.default.createElement(R,{alt:a,title:t,width:W.width,height:W.height,sizes:W.sizes,src:W.src,crossOrigin:this.props.crossOrigin,srcSet:W.srcSet,style:A,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:w,loading:O,draggable:j})),this.addNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:L((0,l.default)({alt:a,title:t,loading:O},W,{imageVariants:P}))}}))}return null},t}(d.default.Component);V.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var A=c.default.shape({width:c.default.number.isRequired,height:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string}),U=c.default.shape({aspectRatio:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,sizes:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string});V.propTypes={resolutions:A,sizes:U,fixed:c.default.oneOfType([A,c.default.arrayOf(A)]),fluid:c.default.oneOfType([U,c.default.arrayOf(U)]),fadeIn:c.default.bool,durationFadeIn:c.default.number,title:c.default.string,alt:c.default.string,className:c.default.oneOfType([c.default.string,c.default.object]),critical:c.default.bool,crossOrigin:c.default.oneOfType([c.default.string,c.default.bool]),style:c.default.object,imgStyle:c.default.object,placeholderStyle:c.default.object,placeholderClassName:c.default.string,backgroundColor:c.default.oneOfType([c.default.string,c.default.bool]),onLoad:c.default.func,onError:c.default.func,onStartLoad:c.default.func,Tag:c.default.string,itemProp:c.default.string,loading:c.default.oneOf(["auto","lazy","eager"]),draggable:c.default.bool};var C=V;t.default=C},Dtc0:function(e,t,a){"use strict";a.r(t);a("91GP");var i=a("R/WZ"),n=a("hlFM"),r=a("ofer"),s=a("Ji2X"),o=a("wx14"),l=a("Ff2n"),d=a("q1tI"),c=a.n(d),u=a("17x9"),f=a.n(u),p=(a("rGqo"),a("yt8O"),a("Btvt"),a("LK8F"),a("DNiP"),a("V+eJ"),a("KQm4")),m=a("A+CX"),g=a("2mql"),h=a.n(g),b=a("tr08"),y=a("LEIi"),v=a("lopY"),w=function(e,t){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return a?y.b.indexOf(e)<=y.b.indexOf(t):y.b.indexOf(e)<y.b.indexOf(t)},E=function(e,t){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return a?y.b.indexOf(t)<=y.b.indexOf(e):y.b.indexOf(t)<y.b.indexOf(e)},O="undefined"==typeof window?c.a.useEffect:c.a.useLayoutEffect,x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return function(t){var a=e.withTheme,i=void 0!==a&&a,n=e.noSSR,r=void 0!==n&&n,s=e.initialWidth;function d(e){var a=Object(b.a)(),n=e.theme||a,d=Object(m.a)({theme:n,name:"MuiWithWidth",props:Object(o.a)({},e)}),u=d.initialWidth,f=d.width,g=Object(l.a)(d,["initialWidth","width"]),h=c.a.useState(!1),y=h[0],w=h[1];O((function(){w(!0)}),[]);var E=Object(p.a)(n.breakpoints.keys).reverse().reduce((function(e,t){var a=Object(v.a)(n.breakpoints.up(t));return!e&&a?t:e}),null),x=Object(o.a)({width:f||(y||r?E:void 0)||u||s},i?{theme:n}:{},{},g);return void 0===x.width?null:c.a.createElement(t,x)}return h()(d,t),d}};function S(e){var t=e.children,a=e.only,i=e.width,n=Object(b.a)(),r=!0;if(a)if(Array.isArray(a))for(var s=0;s<a.length;s+=1){if(i===a[s]){r=!1;break}}else a&&i===a&&(r=!1);if(r)for(var o=0;o<n.breakpoints.keys.length;o+=1){var l=n.breakpoints.keys[o],d=e["".concat(l,"Up")],c=e["".concat(l,"Down")];if(d&&w(l,i)||c&&E(l,i)){r=!1;break}}return r?t:null}S.propTypes={children:f.a.node,className:f.a.string,implementation:f.a.oneOf(["js","css"]),initialWidth:f.a.oneOf(["xs","sm","md","lg","xl"]),lgDown:f.a.bool,lgUp:f.a.bool,mdDown:f.a.bool,mdUp:f.a.bool,only:f.a.oneOfType([f.a.oneOf(["xs","sm","md","lg","xl"]),f.a.arrayOf(f.a.oneOf(["xs","sm","md","lg","xl"]))]),smDown:f.a.bool,smUp:f.a.bool,width:f.a.string.isRequired,xlDown:f.a.bool,xlUp:f.a.bool,xsDown:f.a.bool,xsUp:f.a.bool};var j=x()(S),k=(a("8+KV"),a("dZ+Y"),a("RW0V"),a("0l/t"),a("rePB")),L=a("NqtD"),D=a("H2TA");var R=Object(D.a)((function(e){var t={display:"none"};return e.breakpoints.keys.reduce((function(a,i){return a["only".concat(Object(L.a)(i))]=Object(k.a)({},e.breakpoints.only(i),t),a["".concat(i,"Up")]=Object(k.a)({},e.breakpoints.up(i),t),a["".concat(i,"Down")]=Object(k.a)({},e.breakpoints.down(i),t),a}),{})}),{name:"PrivateHiddenCss"})((function(e){var t=e.children,a=e.classes,i=e.className,n=e.only,r=(Object(l.a)(e,["children","classes","className","only"]),Object(b.a)()),s=[];i&&s.push(i);for(var o=0;o<r.breakpoints.keys.length;o+=1){var d=r.breakpoints.keys[o],u=e["".concat(d,"Up")],f=e["".concat(d,"Down")];u&&s.push(a["".concat(d,"Up")]),f&&s.push(a["".concat(d,"Down")])}return n&&(Array.isArray(n)?n:[n]).forEach((function(e){s.push(a["only".concat(Object(L.a)(e))])})),c.a.createElement("div",{className:s.join(" ")},t)}));var V=function(e){var t=e.implementation,a=void 0===t?"js":t,i=e.lgDown,n=void 0!==i&&i,r=e.lgUp,s=void 0!==r&&r,d=e.mdDown,u=void 0!==d&&d,f=e.mdUp,p=void 0!==f&&f,m=e.smDown,g=void 0!==m&&m,h=e.smUp,b=void 0!==h&&h,y=e.xlDown,v=void 0!==y&&y,w=e.xlUp,E=void 0!==w&&w,O=e.xsDown,x=void 0!==O&&O,S=e.xsUp,k=void 0!==S&&S,L=Object(l.a)(e,["implementation","lgDown","lgUp","mdDown","mdUp","smDown","smUp","xlDown","xlUp","xsDown","xsUp"]);return"js"===a?c.a.createElement(j,Object(o.a)({lgDown:n,lgUp:s,mdDown:u,mdUp:p,smDown:g,smUp:b,xlDown:v,xlUp:E,xsDown:x,xsUp:k},L)):c.a.createElement(R,Object(o.a)({lgDown:n,lgUp:s,mdDown:u,mdUp:p,smDown:g,smUp:b,xlDown:v,xlUp:E,xsDown:x,xsUp:k},L))},A=a("jH1G"),U=a("9eSz"),C=a.n(U),I=function(){var e=A.data;return c.a.createElement(C.a,{fluid:e.file.childImageSharp.fluid})},z=a("vN+1"),N=a("dmsj"),T=Object(i.a)((function(e){return{root:{display:"flex",alignItems:"center",flexGrow:1,height:"100vh"},linkCol:{flexGrow:1,display:"flex",flexDirection:"column",alignItems:"center"},btnLinks:{display:"flex",flexDirection:"column","& a":{marginBottom:e.spacing(1)}},btnLinksCompact:{display:"flex",flexDirection:"row",justifyContent:"center","& a":{marginLeft:e.spacing(1),marginRight:e.spacing(1)}},image:{flexGrow:3},smroot:{display:"flex",flexDirection:"column"},linksectheaderbox:{display:"flex",justifyContent:"center"}}})),P=function(e){return c.a.createElement(n.a,Object.assign({},e,{m:1}),c.a.createElement(r.a,{variant:"h5"},"Shengji Helper"))},W=function(e){var t=e.compact,a=T();return c.a.createElement(n.a,{className:t?a.btnLinksCompact:a.btnLinks},c.a.createElement(z.a,{variant:"outlined",to:"/calc"},"Calculator"),c.a.createElement(z.a,{variant:"outlined",to:"/planner"},"Game Planner"))};t.default=function(){var e=T();return c.a.createElement(s.a,{className:e.container},c.a.createElement(N.a,{title:"Home"}),c.a.createElement(V,{xsDown:!0},c.a.createElement(n.a,{className:e.root},c.a.createElement(n.a,{className:e.linkCol},c.a.createElement(P,{className:e.linksectheaderbox}),c.a.createElement(W,null)),c.a.createElement(n.a,{className:e.image},c.a.createElement(I,null)))),c.a.createElement(V,{smUp:!0},c.a.createElement(n.a,{className:e.smroot},c.a.createElement(n.a,null,c.a.createElement(I,null)),c.a.createElement(P,{className:e.linksectheaderbox}),c.a.createElement(W,{compact:!0}))))}},jH1G:function(e){e.exports=JSON.parse('{"data":{"file":{"id":"8afa5403-b302-55fb-8654-e23a2c540216","childImageSharp":{"id":"3b936307-4861-5e13-a09b-842992c7f8ea","fluid":{"base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsSAAALEgHS3X78AAACEElEQVQ4y7VTPY/TQBBdJ/wJRIko6BAlLRKio76en0DDT6CiTYlER4cooysikeJOyYlE0emkiy3nw7GdOP7e9a7X3mF3Lz5FRxJEwZPWM/aMnt/M7CC0h+VyiSBJUAyAVrMZypKkDdJXkPaRPMZwMEDNN9u20VFosl0iT9PWfuyy07l/lzktRqmx89F4PEYnoVQ0fkjpWyLEOeG8Rzn/nGfZWROjjLUbUs/zjigsCk1WpOk7ttn8gs0GYDYD8H1QkCRhURTftnH8TOWVjLWOKpvP5wg8T/+VRdEnmE6hur5m9c0Nr4bDuu71GJimJmYYd/M8f9koXK/Xh0mj9VorDEzzcUVIKGR2BVDLI0Qln44jYLsl4LrA6vpr09ODhErhpiwRVFV716OOUsMZ41UouedzIaZTAUEgJD1gjF/r9hDSOjmUHGOdkCfJC9kjwThX6gRYFgjOK7i9hYrS0YcdURTH97fjD1BKkeO6ugz1jgn5oZsWBFRYFgfbLvVwMP6oy5XVOIsFmkwmhwn7/b62QRDospe+/wbHMdeTVpBDqeOYREXxVMXTMDTQ37C3Gdpai8WTAuA9BziH1QrK0ei7jl9cGLG81K6s6CTUcB6SN0gBXqVJ8lz5xPeNL8d69xCmaWo7uLpCK8cxatmrfXK63d6tntz3f4JlWVrlz24XhVmGcrnjuefdbZPvo4UcyH/Hb5r40mLiXB8WAAAAAElFTkSuQmCC","aspectRatio":1.3333333333333333,"src":"/static/e11af81f85394ae2b314073e04116e78/3c17d/index.png","srcSet":"/static/e11af81f85394ae2b314073e04116e78/69585/index.png 200w,\\n/static/e11af81f85394ae2b314073e04116e78/497c6/index.png 400w,\\n/static/e11af81f85394ae2b314073e04116e78/3c17d/index.png 720w","sizes":"(max-width: 720px) 100vw, 720px"}}}}}')}}]);
//# sourceMappingURL=component---src-pages-index-jsx-afc11a55f8a5b723feac.js.map