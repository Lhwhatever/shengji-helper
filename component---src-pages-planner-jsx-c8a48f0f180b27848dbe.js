(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"1Uo6":function(e,a,n){"use strict";n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi"),n("E5k/");var t=n("r9w1"),r=n("17x9"),l=n.n(r),c=n("q1tI"),i=n.n(c);var o=i.a.forwardRef((function(e,a){var n=e.children,r=e.native,l=function(e,a){if(null==e)return{};var n,t,r={},l=Object.keys(e);for(t=0;t<l.length;t++)n=l[t],a.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["children","native"]);return i.a.createElement(t.a,Object.assign({select:!0,SelectProps:{native:r},ref:a},l),n)}));o.displayName="SelectField",o.propTypes={children:l.a.node,native:l.a.bool},a.a=o},"9jzQ":function(e,a,n){"use strict";n.d(a,"a",(function(){return o}));n("E5k/");var t=n("jjAL"),r=n("q1tI"),l=n.n(r),c=n("1Uo6"),i=n("1Iet"),o=function(e){return l.a.createElement(c.a,Object.assign({variant:"filled"},e),i.b.map((function(e){return l.a.createElement(t.a,{value:e,key:e},l.a.createElement(i.a,{level:e}))})))}},bP9X:function(e,a,n){"use strict";n.r(a);var t=n("R/WZ"),r=n("ofer"),l=n("hlFM"),c=n("q1tI"),i=n.n(c),o=n("dgr1"),s=n("L12J"),u=Object(t.a)((function(e){return{numOfPlayerField:{width:200,marginTop:e.spacing(2)},deckPlanner:{marginTop:e.spacing(4)}}}));a.default=function(){var e=u(),a=Object(c.useState)(""),n=a[0],t=a[1],f=Object(c.useState)(null),d=f[0],m=f[1];return i.a.createElement(s.a,null,i.a.createElement(r.a,{variant:"h4"},"Game Planner"),i.a.createElement(r.a,{variant:"body2"},"Use this tool to decide how many decks should you play your game with."),i.a.createElement(o.b,{value:n,onChange:function(e){t(e.target.value)},className:e.numOfPlayerField}),n&&i.a.createElement(l.a,{className:e.deckPlanner},i.a.createElement(o.a,{numOfPlayers:n,config:d,setConfig:m,dense:!0})))}},dgr1:function(e,a,n){"use strict";n.d(a,"a",(function(){return h})),n.d(a,"b",(function(){return P})),n.d(a,"c",(function(){return C.a}));n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi"),n("E5k/");var t=n("R/WZ"),r=n("3PeG"),l=n("M4Ey"),c=n("nCZa"),i=n("kKAo"),o=n("sRsu"),s=n("Uf6+"),u=n("DYoa"),f=n("iuhU"),d=n("q1tI"),m=n.n(d),g=n("RyVU"),E=n("WiXO");function b(e,a){if(null==e)return{};var n,t,r={},l=Object.keys(e);for(t=0;t<l.length;t++)n=l[t],a.indexOf(n)>=0||(r[n]=e[n]);return r}var p=Object(t.a)((function(e){return{table:{"& td, & th":{textAlign:"center"},"& table":{marginBottom:e.spacing(0)}},theadErr:{backgroundColor:e.palette.error.main,"& th":{color:e.palette.error.contrastText}},tick:{display:"flex",flex:"1 1 0",justifyContent:"center",alignItems:"center"},clickable:{cursor:"pointer"}}})),y=m.a.createElement(u.a,{style:{fontSize:16}}),v=function(e){var a,n,t=e.row,c=e.config,i=e.size,o=e.onChange,s=b(e,["row","config","size","onChange"]),u=Object.assign({},Object(g.b)(),{},p()),f=(n=c,(a=t)&&n&&a.decks===n.decks&&a.totalCards===n.totalCards&&a.cardsPerPlayer===n.cardsPerPlayer&&a.spareCards===n.spareCards||!1);return m.a.createElement(E.b,Object.assign({},s,{className:u.clickable,highlight:f?1:0,onClick:o}),m.a.createElement(r.a,null,m.a.createElement(l.a,{color:"secondary",size:i,name:"set-config-radio",checked:f,onChange:o})),m.a.createElement(r.a,null,t.decks),m.a.createElement(r.a,null,t.totalCards),m.a.createElement(r.a,null,t.cardsPerPlayer),m.a.createElement(r.a,null,t.spareCards))},h=function(e){var a=e.config,n=e.setConfig,t=e.numOfPlayers,l=e.error,u=b(e,["config","setConfig","numOfPlayers","error"]),d=Object.assign({},Object(g.b)(),{},p(u)),h=function(e){for(var a=[],n=function(n){for(var t=54*n,r=function(a){return(t-a)/e},l=t%e;l/r(l)<=.2;)l+=e;for(;l/r(l)<.5;)a.push({decks:n,totalCards:t,cardsPerPlayer:r(l),spareCards:l}),l+=e},t=2;t<=4;++t)n(t);return a}(t),k=u.dense?"small":"medium";return m.a.createElement(c.a,{component:i.a,className:d.table},m.a.createElement(E.c,{"aria-label":"table of decks",size:k},m.a.createElement(E.a,{align:"center",className:l?d.theadErr:null},m.a.createElement(o.a,null,m.a.createElement(r.a,{align:"center"},m.a.createElement("span",{className:Object(f.a)(d.tick,d.invisible)},y)),m.a.createElement(r.a,null,"Decks"),m.a.createElement(r.a,null,"Total Cards"),m.a.createElement(r.a,null,"Cards per Player"),m.a.createElement(r.a,null,"Spare Cards"))),m.a.createElement(s.a,null,h.map((function(e,t){return m.a.createElement(v,{size:k,row:e,config:a,key:t,onChange:function(){return n(e)}})})))))},k=(n("9jzQ"),n("jjAL")),O=(n("YbXK"),n("cFtU"),function(e,a){return Array.from({length:a-e},(function(a,n){return n+e}))}),C=n("1Uo6"),j=m.a.forwardRef((function(e,a){return m.a.createElement(C.a,Object.assign({fullWidth:!0,label:"No. of Players",ref:a,variant:"filled"},e),O(4,11).map((function(e){return m.a.createElement(k.a,{key:e,value:e},e)})))}));j.displayName="NumOfPlayerField";var P=j;n("1u9R")}}]);
//# sourceMappingURL=component---src-pages-planner-jsx-c8a48f0f180b27848dbe.js.map