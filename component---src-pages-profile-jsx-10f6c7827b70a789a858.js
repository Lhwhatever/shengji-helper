(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"0WKb":function(e,a,t){"use strict";var n=t("q1tI"),r=t.n(n),l=t("LYUY");a.a=Object(l.a)(r.a.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit")},"2agg":function(e,a,t){"use strict";t("pJf4");var n=t("sRsu"),r=t("3PeG"),l=t("nCZa"),c=t("kKAo"),i=t("Uf6+"),o=t("q1tI"),s=t.n(o),m=t("1Iet"),u=(t("T09Sb"),t("WiXO")),d=(t("OK66"),function(e){var a=e.roundNum,t=e.round,l=e.players;return s.a.createElement(n.a,null,s.a.createElement(r.a,{align:"center",variant:"head"},a+1),s.a.createElement(r.a,{align:"center"},s.a.createElement(m.a,{level:t.playerLevels[0].level,active:t.playerLevels[0].active})),s.a.createElement(r.a,{align:"center"},s.a.createElement(m.a,{level:t.playerLevels[1].level,active:t.playerLevels[1].active})),s.a.createElement(r.a,null,l[t.leader].name," (Team ",t.leader%2+1,")"),s.a.createElement(r.a,{align:"center"},void 0===t.score?"-":t.score))});a.a=function(e){var a=e.tableSize,t=e.profile;return s.a.createElement(l.a,{component:c.a,variant:"outlined"},s.a.createElement(u.c,{size:a},s.a.createElement(u.a,null,s.a.createElement(n.a,null,s.a.createElement(r.a,{align:"center"},"Round"),s.a.createElement(r.a,{align:"center"},"Team 1"),s.a.createElement(r.a,{align:"center"},"Team 2"),s.a.createElement(r.a,null,"Leader"),s.a.createElement(r.a,{align:"center"},"Score"))),s.a.createElement(i.a,null,t.history.map((function(e,a){return s.a.createElement(d,{key:a,roundNum:a,round:e,players:t.players})})),s.a.createElement(u.b,{highlight:1},s.a.createElement(r.a,{align:"center",variant:"head"},"Now"),s.a.createElement(r.a,{align:"center"},s.a.createElement(m.a,{level:t.players[0].level,active:t.players[0].active})),s.a.createElement(r.a,{align:"center"},s.a.createElement(m.a,{level:t.players[1].level,active:t.players[1].active})),s.a.createElement(r.a,null,t.leader>=0?t.players[t.leader].name+" (Team "+(t.leader%2+1)+")":""),s.a.createElement(r.a,null)))))}},DQfm:function(e,a,t){"use strict";t.r(a);t("rzGZ"),t("Dq+y"),t("8npG"),t("Ggvi"),t("E5k/"),t("pJf4"),t("sC2a");var n=t("R/WZ"),r=t("H2TA"),l=t("r9w1"),c=t("hlFM"),i=t("ofer"),o=t("PsDL"),s=t("q1tI"),m=t.n(s),u=t("LYUY"),d=Object(u.a)(m.a.createElement("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}),"ChevronLeft"),p=t("0WKb"),f=t("DYoa"),v=t("Rb52"),y=t("L12J"),E=t("vN+1"),b=t("tRbT"),h=t("wx14"),g=t("Ff2n"),k=(t("17x9"),t("iuhU")),O=t("NqtD");function j(e){var a,t,n;return a=e,t=0,n=1,e=(Math.min(Math.max(t,a),n)-t)/(n-t),e=(e-=1)*e*e+1}var x=s.forwardRef((function(e,a){var t,n=e.classes,r=e.className,l=e.color,c=void 0===l?"primary":l,i=e.disableShrink,o=void 0!==i&&i,m=e.size,u=void 0===m?40:m,d=e.style,p=e.thickness,f=void 0===p?3.6:p,v=e.value,y=void 0===v?0:v,E=e.variant,b=void 0===E?"indeterminate":E,x=Object(g.a)(e,["classes","className","color","disableShrink","size","style","thickness","value","variant"]),w={},S={},L={};if("determinate"===b||"static"===b){var C=2*Math.PI*((44-f)/2);w.strokeDasharray=C.toFixed(3),L["aria-valuenow"]=Math.round(y),"static"===b?(w.strokeDashoffset="".concat(((100-y)/100*C).toFixed(3),"px"),S.transform="rotate(-90deg)"):(w.strokeDashoffset="".concat((t=(100-y)/100,t*t*C).toFixed(3),"px"),S.transform="rotate(".concat((270*j(y/70)).toFixed(3),"deg)"))}return s.createElement("div",Object(h.a)({className:Object(k.a)(n.root,r,"inherit"!==c&&n["color".concat(Object(O.a)(c))],{indeterminate:n.indeterminate,static:n.static}[b]),style:Object(h.a)({width:u,height:u},S,{},d),ref:a,role:"progressbar"},L,x),s.createElement("svg",{className:n.svg,viewBox:"".concat(22," ").concat(22," ").concat(44," ").concat(44)},s.createElement("circle",{className:Object(k.a)(n.circle,o&&n.circleDisableShrink,{indeterminate:n.circleIndeterminate,static:n.circleStatic}[b]),style:w,cx:44,cy:44,r:(44-f)/2,fill:"none",strokeWidth:f})))})),w=Object(r.a)((function(e){return{root:{display:"inline-block"},static:{transition:e.transitions.create("transform")},indeterminate:{animation:"$circular-rotate 1.4s linear infinite"},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},svg:{display:"block"},circle:{stroke:"currentColor"},circleStatic:{transition:e.transitions.create("stroke-dashoffset")},circleIndeterminate:{animation:"$circular-dash 1.4s ease-in-out infinite",strokeDasharray:"80px, 200px",strokeDashoffset:"0px"},"@keyframes circular-rotate":{"100%":{transform:"rotate(360deg)"}},"@keyframes circular-dash":{"0%":{strokeDasharray:"1px, 200px",strokeDashoffset:"0px"},"50%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-15px"},"100%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-125px"}},circleDisableShrink:{animation:"none"}}}),{name:"MuiCircularProgress",flip:!1})(x),S=Object(n.a)({loadingGrid:{height:"100vh"}}),L=function(){var e=S();return m.a.createElement(b.a,{container:!0,justify:"center",spacing:1,alignItems:"center",direction:"column",className:e.loadingGrid},m.a.createElement(b.a,{item:!0,xs:12},m.a.createElement(w,{color:"secondary"})),m.a.createElement(b.a,{item:!0,xs:12},m.a.createElement(i.a,{variant:"body2"},"Loading...")))},C=t("OK66"),N=(t("q8oJ"),t("YbXK"),t("cFtU"),t("m210"),t("4DPX"),t("kKAo")),D=t("jjAL"),R=t("Z3vd"),z=t("RyVU"),I=t("2agg"),A=t("lopY"),M=t("tr08"),P=t("nCZa"),T=t("sRsu"),F=t("3PeG"),U=t("Uf6+"),q=t("1u9R"),B=t("WiXO"),G=t("yKwf"),J=Object(n.a)((function(e){var a,t,n;return{scoreInput:(a={width:150},a[e.breakpoints.up("sm")]={marginBottom:e.spacing(2)},a),outcomeBox:(t={padding:e.spacing(1),flexGrow:1},t[e.breakpoints.down("xs")]={marginTop:e.spacing(2)},t),scoreContainer:{flexBasis:"fit-content"},biddingBtnContainer:(n={},n[e.breakpoints.down("xs")]={marginLeft:e.spacing(2),alignSelf:"center"},n[e.breakpoints.up("sm")]={alignSelf:"flex-end"},n)}})),H=Object(n.a)((function(e){return{benefit:{color:e.palette.primary.main,fontWeight:"bold"},cost:{color:e.palette.secondary.main,fontWeight:"bold"},victory:{display:"flex",alignItems:"center"}}})),K=function(e){var a=e.children,t=H();return m.a.createElement("span",{className:t.benefit},"(",a,")")},Y=function(e){var a=e.children,t=H();return m.a.createElement("span",{className:t.cost},"(",a,")")},Z=function(e){var a=e.size,t=H();return m.a.createElement(c.a,{className:t.victory},m.a.createElement(G.a,{fontSize:a||"small"}),m.a.createElement(c.a,{component:"span",ml:.25,mt:.25},"Victory"))},W=t("aZVb"),$=t("yv+Y"),V=t("EQI2"),X=(t("JHok"),t("EHdT")),Q=s.forwardRef((function(e,a){e.checked;var t=e.classes,n=e.className,r=e.control,l=e.disabled,c=(e.inputRef,e.label),o=e.labelPlacement,m=void 0===o?"end":o,u=(e.name,e.onChange,e.value,Object(g.a)(e,["checked","classes","className","control","disabled","inputRef","label","labelPlacement","name","onChange","value"])),d=Object(X.a)(),p=l;void 0===p&&void 0!==r.props.disabled&&(p=r.props.disabled),void 0===p&&d&&(p=d.disabled);var f={disabled:p};return["checked","name","onChange","value","inputRef"].forEach((function(a){void 0===r.props[a]&&void 0!==e[a]&&(f[a]=e[a])})),s.createElement("label",Object(h.a)({className:Object(k.a)(t.root,n,"end"!==m&&t["labelPlacement".concat(Object(O.a)(m))],p&&t.disabled),ref:a},u),s.cloneElement(r,f),s.createElement(i.a,{component:"span",className:Object(k.a)(t.label,p&&t.disabled)},c))})),_=Object(r.a)((function(e){return{root:{display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,"&$disabled":{cursor:"default"}},labelPlacementStart:{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},labelPlacementTop:{flexDirection:"column-reverse",marginLeft:16},labelPlacementBottom:{flexDirection:"column",marginLeft:16},disabled:{},label:{"&$disabled":{color:e.palette.text.disabled}}}}),{name:"MuiFormControlLabel"})(Q),ee=t("M4Ey"),ae=t("+JwS"),te=(t("T09Sb"),function(e){var a=e.open,t=e.setOpen,n=e.playerList,r=e.setLeader,l=Object(s.useState)(),o=l[0],u=l[1],d=Object(s.useState)(!1),p=d[0],f=d[1],v=function(){void 0!==o?(t(!1),r(o)):f(!0)};return m.a.createElement(W.a,{open:a,onClose:v},m.a.createElement($.a,null,"Set winning bidder of first round"),m.a.createElement(V.a,null,m.a.createElement(i.a,{variant:"body2"},"The winning bidder of the first round is the bidder. Select the winning bidder below:"),m.a.createElement(c.a,{mt:2},m.a.createElement(b.a,{container:!0,spacing:1},m.a.createElement(b.a,{item:!0,xs:6},m.a.createElement(i.a,{variant:"h6"},"Team 1")),m.a.createElement(b.a,{item:!0,xs:6},m.a.createElement(i.a,{variant:"h6"},"Team 2")),n.map((function(e,a){return m.a.createElement(b.a,{item:!0,key:a,xs:6},m.a.createElement(_,{control:m.a.createElement(ee.a,null),label:e.name,checked:o===a,value:a,onChange:function(){u(a),f(!1)}}))})))),p&&m.a.createElement(i.a,{variant:"body2",color:"error"},"You must select the winning bidder.")),m.a.createElement(ae.a,null,m.a.createElement(R.a,{variant:"contained",color:"primary",disabled:void 0===o,onClick:v},"Continue")))}),ne=t("1Iet"),re=function(e){var a=e.playerNum%2==e.leader%2,t=e.playerNum===e.leader;return m.a.createElement(B.b,{highlight:t?1:0},m.a.createElement(F.a,null,e.player.name," (Team ",e.playerNum%2+1,")"),m.a.createElement(F.a,{align:"center"},m.a.createElement(ne.a,{level:e.level,active:a})),m.a.createElement(F.a,{align:"center"},t?"Leader":a?"Defender":"Attacker"),m.a.createElement(F.a,null,void 0!==e.nextLeader&&m.a.createElement(m.a.Fragment,null,m.a.createElement(ne.a,{level:e.newLevel,active:e.playerNum%2==e.nextLeader%2}),e.playerNum===e.cutFirst&&!e.willEnd&&" (Cut Deck)",e.playerNum===e.nextLeader&&!e.willEnd&&" (Leader)")))},le=Object(u.a)(m.a.createElement("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),"ChevronRight"),ce=t("Wbzz");var ie=function(e){var a=e.profile,t=e.tableSize,n=e.onNewRound,r=function(e,a){if(null==e)return{};var t,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)t=l[n],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,["profile","tableSize","onNewRound"]),l=Object(A.a)(Object(M.a)().breakpoints.down("xs")),o=Object(s.useState)(a.leader),u=o[0],d=o[1],p=-1===a.leader,v=Object(s.useState)(p),y=v[0],E=v[1],b=Object(s.useState)(void 0),h=b[0],g=b[1],k=g,O=function(e,a){if(null!=e)return e<=0?0:Math.min(Math.floor(e/20/a),5)+1}(h,a.config.decks),j=void 0===O?void 0:(u+(O<3?2:1))%a.players.length,x=void 0===O?void 0:(u+(O<3?1:0))%a.players.length,w=function(e,a,t,n){var r,l;return n%2==0?(r=e+Math.max(3-t,0),l=a+Math.max(t-3,0)):(r=e+Math.max(t-3,0),l=a+Math.max(3-t,0)),e<14&&r>14&&(r=14),a<14&&l>14&&(l=14),[r,l]}(a.players[0].level,a.players[1].level,O,u),S=w[0]>14||w[1]>14,L=Object.assign({},Object(z.b)(),{},J());return m.a.createElement(c.a,r,m.a.createElement(P.a,{component:N.a},m.a.createElement(B.c,{size:t},m.a.createElement(B.a,null,m.a.createElement(T.a,null,m.a.createElement(F.a,null,"Player"),m.a.createElement(F.a,{align:"center"},"Level"),m.a.createElement(F.a,{align:"center"},"Position"),m.a.createElement(F.a,null,"Next Game"))),m.a.createElement(U.a,null,a.players.map((function(e,t){return m.a.createElement(re,{key:t,player:e,playerNum:t,leader:u,level:a.players[t%2].level,newLevel:w[t%2],nextLeader:j,cutFirst:x,willEnd:S})})))),m.a.createElement(c.a,{m:2,className:l?L.vContainer:L.hContainer},m.a.createElement(c.a,{mr:2,className:l?L.hContainer:L.vContainer},m.a.createElement(q.a,{variant:"filled",size:t,className:L.scoreInput,label:"Score",value:h,onChange:k}),p&&m.a.createElement(c.a,{className:L.biddingBtnContainer},m.a.createElement(R.a,{variant:"contained",color:"primary",onClick:function(){return E(!0)}},"Bidding"))),void 0!==O&&m.a.createElement(N.a,{variant:"outlined",className:L.outcomeBox},m.a.createElement(i.a,{variant:"h6"},"Round Outcome"),O<3?m.a.createElement(m.a.Fragment,null,m.a.createElement(i.a,{variant:"body2"},"Score ","<",40*a.config.decks," points ",m.a.createElement(K,null,"Defenders +1 level")),O<2&&m.a.createElement(i.a,{variant:"body2"},"Score ","<",20*a.config.decks," points ",m.a.createElement(K,null,"Defenders +1 level")),O<1&&m.a.createElement(i.a,{variant:"body2"},"Score 0 points ",m.a.createElement(K,null,"Defenders +1 level"))):m.a.createElement(m.a.Fragment,null,m.a.createElement(i.a,{variant:"body2"},"Score ≥",40*a.config.decks," points ",m.a.createElement(K,null,"Attackers take over as defenders")),O>3&&m.a.createElement(i.a,{variant:"body2"},"Score ≥",60*a.config.decks," points ",m.a.createElement(K,null,"Attackers +1 level")),O>4&&m.a.createElement(i.a,{variant:"body2"},"Score ≥",80*a.config.decks," points ",m.a.createElement(K,null,"Attackers +1 level")),O>5&&m.a.createElement(i.a,{variant:"body2"},"Score ≥",100*a.config.decks," points ",m.a.createElement(K,null,"Attackers +1 level"))),m.a.createElement(c.a,{className:L.hContainer,mt:1},m.a.createElement(c.a,{className:L.hExpand}),w[0]>14||w[1]>14?m.a.createElement(R.a,{color:"primary",variant:"contained",endIcon:m.a.createElement(f.a,null),onClick:function(){n({score:h,leader:u,nextLeader:-1,playerLevels:a.players.map((function(e){return{level:e.level,active:e.active}})),newPlayerLevels:a.players.map((function(e,a){return{level:w[a%2],active:j%2==a%2}})),victors:a.players.filter((function(e,a){return w[a%2]>14})).map((function(e,a){return a}))}),Object(ce.navigate)("/calc")}},"Finish Game"):m.a.createElement(R.a,{color:"primary",variant:"contained",endIcon:m.a.createElement(le,null),onClick:function(){n({score:h,leader:u,nextLeader:j,playerLevels:a.players.map((function(e){return{level:e.level,active:e.active}})),newPlayerLevels:a.players.map((function(e,a){return{level:w[a%2],active:j%2==a%2}}))}),g(null),d(j)}},"Next Round"))))),m.a.createElement(te,{open:y,setOpen:E,playerList:a.players,setLeader:d}))},oe=t("DR9o"),se=(t("n0hJ"),t("YwZP")),me=function(e){var a=e.playerNum,t=e.playerList,n=e.entry,r=e.allOptions,l=e.size,c=e.bid,i=e.onChoice,o=t[a];return m.a.createElement(T.a,null,m.a.createElement(F.a,null,o.name),m.a.createElement(F.a,{align:"center"},m.a.createElement(ne.a,{player:o})),r.map((function(e,r){return void 0===n[e]?m.a.createElement(F.a,{key:r,align:"center"},"-"):m.a.createElement(F.a,{key:r},m.a.createElement(_,{control:m.a.createElement(ee.a,{size:l}),label:t[n[e]].name,checked:c.bidder==a&&c.bid===e||!1,value:{bidder:a,bid:e},onChange:function(){return i(a,e)}}))})))},ue=function(e){var a=e.open,t=e.setOpen,n=e.bid,r=e.setBid,l=e.playerList,c=e.onLeaderChange,o=function(){return t(!1)},s=function(e){var a=0,t=e.length,n=e.map((function(n,r){if(n.active){var l,c=1<<n.level;return a=a&~c^c,(l={})[n.level]=r,l}for(var i={},o=(r+1)%t;o!=r;o=(o+1)%t)e[o].active&&void 0===i[e[o].level]&&(i[e[o].level]=o);return i})),r=[];a>>=2;for(var l=2;0!=a;l++)1&a&&r.push(l),a>>=1;return[r,n]}(l),u=s[0],d=s[1],p=function(e,a){r({bidder:e,bid:a}),c(d[e][a])};return m.a.createElement(W.a,{open:a,onClose:o,"aria-labelledby":"form-dialog-title"},m.a.createElement($.a,null,"Bidding"),m.a.createElement(V.a,null,m.a.createElement(i.a,{variant:"body2"},"The following table shows the options each player may bid, and the resultant leader. Tap on the corresponding option to select the bidder and the bid."),m.a.createElement(P.a,{component:N.a,variant:"outlined"},m.a.createElement(B.c,{size:"small"},m.a.createElement(B.a,null,m.a.createElement(T.a,null,m.a.createElement(F.a,{rowSpan:2},"Bidder"),m.a.createElement(F.a,{rowSpan:2,align:"center"},"Level"),m.a.createElement(F.a,{colSpan:u.length,align:"center"},"Leader by Bid")),m.a.createElement(T.a,null,u.map((function(e,a){return m.a.createElement(F.a,{key:a,align:"center"},m.a.createElement(ne.a,{level:e}))})))),m.a.createElement(U.a,null,d.map((function(e,a){return m.a.createElement(me,{key:a,size:"small",playerList:l,playerNum:a,entry:e,allOptions:u,bid:n,onChoice:p})})))))),m.a.createElement(ae.a,null,m.a.createElement(R.a,{variant:"contained",color:"primary",onClick:o},"Close")))},de=t("4ppn"),pe=t("5AJ6"),fe=Object(pe.a)(s.createElement("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),ve=Object(pe.a)(s.createElement("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),ye=t("ye/S"),Ee=Object(pe.a)(s.createElement("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),be=s.createElement(ve,null),he=s.createElement(fe,null),ge=s.createElement(Ee,null),ke=s.forwardRef((function(e,a){var t=e.checkedIcon,n=void 0===t?be:t,r=e.classes,l=e.color,c=void 0===l?"secondary":l,i=e.icon,o=void 0===i?he:i,m=e.indeterminate,u=void 0!==m&&m,d=e.indeterminateIcon,p=void 0===d?ge:d,f=e.inputProps,v=e.size,y=void 0===v?"medium":v,E=Object(g.a)(e,["checkedIcon","classes","color","icon","indeterminate","indeterminateIcon","inputProps","size"]);return s.createElement(de.a,Object(h.a)({type:"checkbox",classes:{root:Object(k.a)(r.root,r["color".concat(Object(O.a)(c))],u&&r.indeterminate),checked:r.checked,disabled:r.disabled},color:c,inputProps:Object(h.a)({"data-indeterminate":u},f),icon:s.cloneElement(u?p:o,{fontSize:"small"===y?"small":"default"}),checkedIcon:s.cloneElement(u?p:n,{fontSize:"small"===y?"small":"default"}),ref:a},E))})),Oe=Object(r.a)((function(e){return{root:{color:e.palette.text.secondary},checked:{},disabled:{},indeterminate:{},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(ye.b)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(ye.b)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}}}}),{name:"MuiCheckbox"})(ke),je=function(e){return m.a.createElement(B.b,{highlight:e.isLeader?1:0},m.a.createElement(F.a,null,e.player.name),m.a.createElement(F.a,{align:"center"},m.a.createElement(ne.a,{player:e.player})),m.a.createElement(F.a,{align:"center"},"not set"!==e.leaderState&&m.a.createElement(Oe,{color:"secondary",size:e.size,checked:e.isDefender,onChange:function(a){return e.setAsDefender(a.target.checked)},disabled:e.isLeader||e.maxedDefenders&&!e.isDefender})),m.a.createElement(F.a,null,void 0===e.delta?"":e.newLevel.level>14?m.a.createElement(Z,{size:e.size}):m.a.createElement(m.a.Fragment,null,m.a.createElement(ne.a,{level:e.newLevel.level,active:e.newLevel.active})," ",e.delta>1&&m.a.createElement(K,null,e.player.active?"+"+e.delta:"↑"+(e.delta-1)),1===e.delta&&m.a.createElement(K,null,e.player.active?"+1":"↑"),0===e.delta&&e.player.active&&m.a.createElement(Y,null,"↓"))))};var xe=function(e){var a=e.profile,t=e.onNewRound,n=e.tableSize,r=function(e,a){if(null==e)return{};var t,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)t=l[n],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,["profile","onNewRound","tableSize"]),l=Object(A.a)(Object(M.a)().breakpoints.down("xs")),o=Object(s.useState)(a.leader),u=o[0],d=o[1],p=Math.floor(a.players.length/2),v=Object(s.useReducer)((function(e,t){switch(t.type){case"init":var n=new Array(a.players.length).fill(!1);return n[t.key]=!0,{players:n,count:1};case"update":var r=e.players;return r[t.key]=t.value,{players:r,count:e.count+(t.value?1:-1)};case"clear":return{players:new Array(a.players.length).fill(!1),count:0};default:throw"unknown dispatcher action.type "+t.type}}),{players:new Array(a.players.length).fill(!1),count:0}),y=v[0],E=v[1],b=-1===a.leader?-1===u?"not set":"set":"preset",h=Object(s.useState)(void 0),g=h[0],O=h[1],j=function(e,a,t,n){if(null==e)return{defenderMult:void 0,attackerDelta:void 0,defenderDelta:void 0};var r=e<=0?0:Math.min(Math.floor(e/20/a)+1,6),l=t-n+1;return{defenderMult:l,attackerDelta:Math.max(r-2,0),defenderDelta:Math.max(3-r,0)*l}}(g,a.config.decks,p,y.count),x=j.defenderMult,w=j.attackerDelta,S=j.defenderDelta,L=a.players.map((function(e,a){return function(e,a){var t=a>0,n=e.level+(t?a-(e.active?0:1):0);return e.level<14&&n>14&&(n=14),{active:t,level:n}}(e,y.players[a]?S:w)})),C=L.reduce((function(e,a,t){return a.level>14&&e.push(t),e}),[]),D=Object(s.useState)(!1),I=D[0],G=D[1],H=Object(s.useState)({}),Z=H[0],W=H[1],$=Object.assign({},Object(z.b)(),{},J({leader:u}));return m.a.createElement(c.a,r,m.a.createElement(P.a,{component:N.a},m.a.createElement(B.c,{size:n},m.a.createElement(B.a,null,m.a.createElement(T.a,null,m.a.createElement(F.a,null,"Player"),m.a.createElement(F.a,{align:"center"},"Level"),m.a.createElement(F.a,{align:"center"},m.a.createElement(c.a,{className:$.vContainer},m.a.createElement(c.a,null,"Defender"),m.a.createElement(c.a,{mt:-1},m.a.createElement(i.a,{variant:"caption"},"(max ",p,")")))),m.a.createElement(F.a,null,"Next Game"))),m.a.createElement(U.a,null,a.players.map((function(e,a){return m.a.createElement(je,{key:a,size:n,player:e,isLeader:u===a,isDefender:y.players[a],setAsDefender:(t=a,function(e){E({type:"update",key:t,value:e})}),leaderState:b,maxedDefenders:y.count===p,newLevel:L[a],delta:y.players[a]?S:w});var t})))),m.a.createElement(c.a,{m:2,className:l?$.vContainer:$.hContainer},m.a.createElement(c.a,{mr:2,className:Object(k.a)(l?$.hContainer:$.vContainer,$.scoreContainer)},-1!==u&&m.a.createElement(q.a,{variant:"filled",size:n,className:$.scoreInput,label:"Score",value:g,onChange:function(e){O(e)}}),m.a.createElement(c.a,{className:$.biddingBtnContainer},m.a.createElement(R.a,{variant:"contained",color:"primary",onClick:function(){return G(!0)}},"Bidding"))),x&&y.count>0&&m.a.createElement(N.a,{variant:"outlined",className:$.outcomeBox},m.a.createElement(i.a,{variant:"h6"},"Round Outcome"),S>0&&m.a.createElement(m.a.Fragment,null,m.a.createElement(i.a,{variant:"body2"},"Score ","<",40*a.config.decks," points ",m.a.createElement(K,null,"Defenders win, +1 level")," ",m.a.createElement(Y,null,"Attackers inactive")),S>x&&m.a.createElement(i.a,{variant:"body2"},"Score ","<",20*a.config.decks," points ",m.a.createElement(K,null,"Defenders +1 level")),g<=0&&m.a.createElement(i.a,{variant:"body2"},"Score 0 points ",m.a.createElement(K,null,"Defenders +1 level")),2==x&&m.a.createElement(i.a,{variant:"body2"},"1 less defender than usual ",m.a.createElement(K,null,"Level gain ×2")),x>2&&m.a.createElement(i.a,{variant:"body2"},x-1," less defenders than usual ",m.a.createElement(K,null,"Level gain ×",x)),m.a.createElement(i.a,{variant:"body2"},"Inactive defenders become active ",m.a.createElement(Y,null,"-1 level gain if inactive"))),w>0&&m.a.createElement(m.a.Fragment,null,m.a.createElement(i.a,{variant:"body2"},"Score ≥",40*a.config.decks," points ",m.a.createElement(K,null,"Attackers win, +1 level")," ",m.a.createElement(Y,null,"Defenders inactive")),w>1&&m.a.createElement(i.a,{variant:"body2"},"Score ≥",60*a.config.decks," points ",m.a.createElement(K,null,"Attackers +1 level")),w>2&&m.a.createElement(i.a,{variant:"body2"},"Score ≥",80*a.config.decks," points ",m.a.createElement(K,null,"Attackers +1 level")),w>3&&m.a.createElement(i.a,{variant:"body2"},"Score ≥",100*a.config.decks," points ",m.a.createElement(K,null,"Attackers +1 level")),m.a.createElement(i.a,{variant:"body2"},"Inactive attackers become active ",m.a.createElement(Y,null,"-1 level gain if inactive"))),m.a.createElement(c.a,{className:$.hContainer,mt:1},m.a.createElement(c.a,{className:$.hExpand}),C.length?m.a.createElement(R.a,{color:"primary",variant:"contained",endIcon:m.a.createElement(f.a,null),onClick:function(){t({score:g,leader:u,nextLeader:-1,playerLevels:a.players.map((function(e){return{level:e.level,active:e.active}})),newPlayerLevels:L,victors:C}),Object(se.navigate)("/calc")}},"Finish Game"):m.a.createElement(R.a,{color:"primary",variant:"contained",endIcon:m.a.createElement(le,null),onClick:function(){t({score:g,leader:u,nextLeader:-1,playerLevels:a.players.map((function(e){return{level:e.level,active:e.active}})),newPlayerLevels:L}),O(null),d(-1),E({type:"clear"}),W({})}},"Next Round"))))),m.a.createElement(ue,{open:I,setOpen:G,bid:Z,setBid:W,playerList:a.players,onLeaderChange:function(e){d(e),E({type:"init",key:e})}}))};function we(e){return function(e){if(Array.isArray(e))return Se(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,a){if(!e)return;if("string"==typeof e)return Se(e,a);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Se(e,a)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Se(e,a){(null==a||a>e.length)&&(a=e.length);for(var t=0,n=new Array(a);t<a;t++)n[t]=e[t];return n}var Le=Object(n.a)({roundNumField:{width:135}}),Ce=function(e){var a=e.profile,t=e.onUpdate,n=Object.assign({},Object(z.b)(),{},Le()),r=Object(s.useState)(!1),o=r[0],u=r[1],d=Object(s.useState)(a.history.length?a.history.length-1:""),p=d[0],f=d[1];Object(s.useEffect)((function(){o&&(u(!1),location.reload(!0))}),[o]);var v=function(){f(p?p-1:""),t(Object.assign({},a,{players:a.players.map((function(e,t){return Object.assign({name:e.name},a.history[p].playerLevels[t])})),leader:"floating"===a.partnership||0===p?-1:a.history[p].leader,victors:[],history:a.history.filter((function(e,a){return a<p}))})),u(!0)};return o?m.a.createElement(L,null):m.a.createElement(m.a.Fragment,null,a.victors.length>0||m.a.createElement("floating"===a.partnership?xe:ie,{profile:a,onNewRound:function(e){var n=e.score,r=e.leader,l=e.nextLeader,c=e.playerLevels,i=e.newPlayerLevels,o=e.victors;t(Object.assign({},a,{players:a.players.map((function(e,a){return Object.assign({name:e.name},i[a])})),victors:o||a.victors,leader:l,history:[].concat(we(a.history),[{score:n,leader:r,playerLevels:c}])})),f(a.history.length)},mb:2,tableSize:"small"}),m.a.createElement(N.a,null,m.a.createElement(c.a,{p:2},m.a.createElement(i.a,{variant:"h5"},"Game History"),m.a.createElement("floating"===a.partnership?oe.a:I.a,{profile:a,tableSize:"small",onRevert:v}),m.a.createElement(c.a,{className:n.hContainer,mt:2},m.a.createElement(c.a,{className:n.hExpand}),m.a.createElement(l.a,{select:!0,variant:"outlined",size:"small",className:n.roundNumField,disabled:""===p,label:"Round No.",value:p,onChange:function(e){return f(e.target.value)}},we(new Array(a.history.length)).map((function(e,a){return m.a.createElement(D.a,{key:a,value:a},a+1)}))),m.a.createElement(c.a,{mx:1}),m.a.createElement(R.a,{variant:"outlined",onClick:v,disabled:""===p},"Revert")))))},Ne=t("tOKM");var De=function(e,a){return e.location.replace(a)},Re=Object(n.a)({profileHeaderTextBox:{display:"flex",flexDirection:"row",alignItems:"center"}}),ze=Object(r.a)((function(e){return{root:{"& input":{color:e.palette.primary.contrastText},"& label, & label.Mui-focused":{color:Ne.a[300]},"& .MuiOutlinedInput-root":{"& fieldset, &:hover fieldset, &.Mui-focused fieldset":{borderColor:Ne.a[700]}},"& button":{color:Ne.a[300]}}}}))(l.a),Ie=function(e){var a=e.profile,t=e.onProfileNameChange,n=function(e,a){if(null==e)return{};var t,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)t=l[n],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,["profile","onProfileNameChange"]),r=Re(),l=Object(s.useState)(null),u=l[0],y=l[1];return m.a.createElement(v.a,n,m.a.createElement(E.a,{color:"inherit",startIcon:m.a.createElement(d,null),to:"/calc"},"Back"),a&&m.a.createElement(c.a,{ml:3,className:r.profileHeaderTextBox},null===u?m.a.createElement(m.a.Fragment,null,m.a.createElement(i.a,{variant:"h6"},a.name," "),m.a.createElement(o.a,{"aria-label":"edit",color:"inherit",onClick:function(){return y(a.name)}},m.a.createElement(p.a,null))):m.a.createElement(ze,{variant:"outlined",size:"small",label:"Profile Name",value:u,InputProps:{endAdornment:m.a.createElement(o.a,{size:"small",color:"inherit",onClick:function(){t(u),y(null)}},m.a.createElement(f.a,{size:"inherit"}))},onChange:function(e){return y(e.target.value)}}),m.a.createElement(c.a,{ml:1}),m.a.createElement(i.a,{variant:"body2"},"(",a.config.decks," decks, ",a.players.length," players)")))};a.default=function(e){var a=e.location,t=Object(s.useState)(),n=t[0],r=t[1],l=Object(s.useReducer)((function(e,a){var t;switch(a.type){case"init":return a.value;case"update":return Object.assign({},e,((t={})[n]=Object.assign({},a.value,{lastUsed:new Date}),t));default:throw"unknown profileListDispatch action.type "+a.type}}),{}),c=l[0],i=l[1];Object(s.useEffect)((function(){a&&a.state&&a.state.uuid&&window.localStorage.setItem("shengji-helper-active",a.state.uuid);var e=window.localStorage.getItem("shengji-helper-active");if(e){r(e);var t=Object(C.a)(window);t[e]?i({type:"init",value:t}):De(window,"/calc")}else De(window,"/calc")}),[]),Object(s.useEffect)((function(){Object(C.b)(c,window)}),[c]);var o=function(e){return i({type:"update",value:e})};return m.a.createElement(y.a,{header:Ie,headerProps:{profile:c&&c[n],onProfileNameChange:function(e){return o(Object.assign({},c[n],{name:e}))}}},c&&c[n]?m.a.createElement(Ce,{profile:c[n],onUpdate:o}):m.a.createElement(L,null))}},DR9o:function(e,a,t){"use strict";t("pJf4");var n=t("sRsu"),r=t("3PeG"),l=t("Z3vd"),c=t("nCZa"),i=t("kKAo"),o=t("Uf6+"),s=t("q1tI"),m=t.n(s),u=t("1Iet"),d=(t("T09Sb"),t("WiXO")),p=(t("OK66"),function(e){var a=e.roundNum,t=e.round,c=e.onRevert;return m.a.createElement(n.a,null,m.a.createElement(r.a,{align:"center",variant:"head"},a+1),t.playerLevels.map((function(e,a){return m.a.createElement(r.a,{align:"center",key:a},m.a.createElement(u.a,{level:e.level,active:e.active}),t.leader===a&&m.a.createElement("sup",null,"L"))})),m.a.createElement(r.a,{align:"center"},void 0===t.score?"-":t.score),c&&m.a.createElement(r.a,{align:"center"},m.a.createElement(l.a,{variant:"outlined",onClick:function(){return c(a)}},"Revert")))}),f=function(e){var a=e.players;return m.a.createElement(d.b,{highlight:1},m.a.createElement(r.a,{align:"center",variant:"head"},"Now"),a.map((function(e){return m.a.createElement(r.a,{align:"center",key:e.name},m.a.createElement(u.a,{player:e}))})),m.a.createElement(r.a,null))};a.a=function(e){var a=e.tableSize,t=e.profile;return m.a.createElement(c.a,{component:i.a,variant:"outlined"},m.a.createElement(d.c,{size:a},m.a.createElement(d.a,null,m.a.createElement(n.a,null,m.a.createElement(r.a,{align:"center",color:"inherit"},"Round"),t.players.map((function(e){return m.a.createElement(r.a,{key:e.name,align:"center"},e.name)})),m.a.createElement(r.a,{align:"center"},"Score"))),m.a.createElement(o.a,null,t.history.map((function(e,a){return m.a.createElement(p,{key:a,round:e,roundNum:a})})),m.a.createElement(f,{players:t.players}))))}},MnOU:function(e,a,t){"use strict";t("pJf4");var n=t("ofer"),r=t("hlFM"),l=t("q1tI"),c=t.n(l),i=t("RyVU"),o=t("1Iet"),s=(t("T09Sb"),t("lluH")),m=function(e,a,t){return e.map((function(e,a){return e.name+(t===a?" (Leader)":"")})).filter((function(e,t){return t%2===a}))};a.a=function(e){var a=e.partnership,t=e.players,l=e.leader,u=Object(i.b)();return"floating"===a?c.a.createElement(c.a.Fragment,null,c.a.createElement(n.a,{variant:"body2"},Object(s.a)(t.map((function(e,a){return c.a.createElement("span",{key:a},e.name," (",c.a.createElement(o.a,{player:e}),a===l?", Leader":"",")")}))))):c.a.createElement(r.a,{className:u.vContainer},c.a.createElement(n.a,{variant:"body2"},"Team 1 (",c.a.createElement(o.a,{player:t[0]}),"): ",Object(s.a)(m(t,0,l))),c.a.createElement(n.a,{variant:"body2"},"Team 2 (",c.a.createElement(o.a,{player:t[1]}),"): ",Object(s.a)(m(t,1,l))))}},OK66:function(e,a,t){"use strict";t.d(a,"a",(function(){return s})),t.d(a,"b",(function(){return u}));t("q8oJ"),t("YbXK"),t("cFtU"),t("m210"),t("4DPX"),t("rzGZ"),t("Dq+y"),t("8npG"),t("PZd/"),t("E5k/"),t("pJf4");var n=t("17x9"),r=t.n(n),l=t("MnOU");function c(e){return function(e){if(Array.isArray(e))return i(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,a){if(!e)return;if("string"==typeof e)return i(e,a);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return i(e,a)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,a){(null==a||a>e.length)&&(a=e.length);for(var t=0,n=new Array(a);t<a;t++)n[t]=e[t];return n}var o=function(e){return{level:e>>1,active:1==(1&e)}},s=function(e){return Object.fromEntries(JSON.parse(e.localStorage.getItem("shengji-helper-profiles")||"[]").map((function(e){return[e.uuid,{name:decodeURIComponent(e.name),lastUsed:new Date(e.lastUsed),partnership:e.floating?"floating":"fixed",config:e.config,players:e.players.map((function(e){return Object.assign({name:e[0]},o(e[1]))})),leader:e.leader,victors:e.victors,history:e.history.map((function(e){return{leader:e[0],score:e[1],playerLevels:e.slice(2).map(o)}}))}]})))},m=function(e){return e.level<<1|(e.active?1:0)},u=function(e,a){a.localStorage.setItem("shengji-helper-profiles",JSON.stringify(Object.entries(e).map((function(e){var a=e[0],t=e[1];return{name:encodeURIComponent(t.name),uuid:a,lastUsed:t.lastUsed.valueOf(),floating:"floating"===t.partnership?1:0,config:t.config,players:t.players.map((function(e){return[e.name,m(e)]})),leader:t.leader,victors:t.victors,history:t.history.map((function(e){var a=e.leader,t=e.score,n=e.playerLevels;return[a,t].concat(c(n.map(m)))}))}}))))},d=r.a.exact({leader:r.a.number.isRequired,score:r.a.number,playerLevels:r.a.arrayOf(r.a.exact({level:r.a.number.isRequired,active:r.a.bool.isRequired})).isRequired});r.a.exact({name:r.a.string.isRequired,lastUsed:r.a.instanceOf(Date).isRequired,partnership:r.a.oneOf(["fixed","floating"]).isRequired,players:l.a.propTypes.players,config:r.a.exact({decks:r.a.number.isRequired,perPlayer:r.a.number.isRequired,spares:r.a.number.isRequired}).isRequired,leader:r.a.number.isRequired,victors:r.a.arrayOf(r.a.number).isRequired,history:r.a.arrayOf(d).isRequired})},"Y++M":function(e,a,t){"use strict";var n=t("DFzH"),r=t("dTG6"),l=t("kiRH");e.exports=function(e){for(var a=n(this),t=l(a.length),c=arguments.length,i=r(c>1?arguments[1]:void 0,t),o=c>2?arguments[2]:void 0,s=void 0===o?t:r(o,t);s>i;)a[i++]=e;return a}},lluH:function(e,a,t){"use strict";t("pJf4"),t("q8oJ"),t("8npG"),t("YbXK"),t("cFtU"),t("rzGZ"),t("m210"),t("4DPX");function n(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,a){if(!e)return;if("string"==typeof e)return r(e,a);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return r(e,a)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,a){(null==a||a>e.length)&&(a=e.length);for(var t=0,n=new Array(a);t<a;t++)n[t]=e[t];return n}a.a=function(e){return e.reduce((function(e,a){return null===e?[a]:[].concat(n(e),[", ",a])}),null)}},n0hJ:function(e,a,t){var n=t("P8UN");n(n.P,"Array",{fill:t("Y++M")}),t("Dq1/")("fill")}}]);
//# sourceMappingURL=component---src-pages-profile-jsx-10f6c7827b70a789a858.js.map