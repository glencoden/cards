(this.webpackJsonpcards=this.webpackJsonpcards||[]).push([[0],{71:function(e,t,n){},79:function(e,t,n){"use strict";n.r(t);var a,r=n(0),c=n.n(r),i=n(11),o=n.n(i),s=(n(71),n(17)),l=n(19),u=n(12),d=n(35),j=n(36),h="".concat("https://wolke.glencoden.de","/cards"),f=new(function(){function e(){Object(d.a)(this,e)}return Object(j.a)(e,[{key:"_get",value:function(e){return fetch(e).then((function(e){return e.json()}))}},{key:"_post",value:function(e,t){return Promise.resolve().then((function(){return JSON.stringify(t)})).then((function(t){return fetch(e,{method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"},body:t})})).then((function(e){return e.json()}))}},{key:"getUser",value:function(e){return this._get("".concat(h,"/user/").concat(e))}},{key:"getAll",value:function(e){return this._get("".concat(h,"/all/").concat(e))}},{key:"delete",value:function(e){return this._get("".concat(h,"/delete/").concat(e))}},{key:"add",value:function(e){return this.update(e)}},{key:"update",value:function(e){return this._post("".concat(h,"/upsert"),e)}}]),e}()),p={FRESH:"fresh",HIGH:"high",MEDIUM:"medium",LOW:"low"},b=(a={},Object(s.a)(a,p.FRESH,10),Object(s.a)(a,p.HIGH,4),Object(s.a)(a,p.MEDIUM,2),Object(s.a)(a,p.LOW,1),a);var m=new(function(){function e(){Object(d.a)(this,e),this._user={},this._cards=[],this._numCardsSeen=0}return Object(j.a)(e,[{key:"init",value:function(e){var t=this;return f.getUser(e).then((function(e){if(!e.user)throw new Error("wrong user name");return t._setUser(e.user),f.getAll(t._user.name)})).then((function(e){return t._setCards(e),t._user}))}},{key:"getActiveCard",value:function(e){var t=this;return new Promise((function(n,a){if(t._cards.length){var r=t._getCard(e||function(e){var t=e[e.length-1],n=0;return e.reduce((function(e,a){var r=Math.floor(b[a.priority]*(t.lastSeenAt-a.lastSeenAt)*Math.random());return r<n?e:(n=r,a.id)}),0)}(t._cards));if(r){var c=Date.now()-r.lastSeenAt,i=36e5,o=24*i,s=Math.floor(c/o),l=Math.floor(c%o/i),u=Math.floor(c%o%i/6e4);r.spec={cardPosition:t._cards.indexOf(r),timeShowToRanking:"".concat(5.128,"s"),timeSinceLastSeen:"".concat(s,"d ").concat(l,"h ").concat(u,"m"),priorityDistribution:Object.values(p).reduce((function(e,n){return e[n]=t._cards.filter((function(e){return e.priority===n})).length,e}),{})},r.lastSeenAt=Date.now(),t._sortCards(),t._numCardsSeen++,n(r)}else a("no active card")}else a("no cards")}))}},{key:"getNumCards",value:function(){return this._cards.length}},{key:"getNumCardsSeen",value:function(){return this._numCardsSeen}},{key:"getSearchItems",value:function(){return this._cards.map((function(e){return Object.values(e.translations.from)[0]}))}},{key:"getIdBySearchItem",value:function(e){var t=this._cards.find((function(t){return Object.values(t.translations.from)[0]===e}));if(t)return t.id;console.warn("no card for search item",e)}},{key:"upsertCard",value:function(e){var t=this;if(!e.id)return f.add({user:this._user.name,translations:e.translations,example:e.example,priority:p.FRESH,lastSeenAt:Date.now()}).then((function(e){return t._addCard(e),e}));var n=this._getCard(e.id);return n?f.update(Object(u.a)(Object(u.a)({},n),{},{translations:Object(u.a)(Object(u.a)({},n.translations),e.translations),example:e.example})).then((function(e){return n.translations=e.translations,n.example=e.example,n})):Promise.reject("no card to update")}},{key:"deleteCard",value:function(e){var t=this;return f.delete(e).then((function(e){t._removeCard(e.id)}))}},{key:"rankCard",value:function(e,t){if(!Object.values(p).includes(t))return Promise.reject("no priority");var n=this._getCard(e);return f.update(Object(u.a)(Object(u.a)({},n),{},{priority:t})).then((function(e){n.priority=e.priority}))}},{key:"_setUser",value:function(e){this._user=e,console.log("card deck set user",this._user)}},{key:"_setCards",value:function(e){this._cards=e,this._sortCards(),console.log("card deck set cards",this._cards)}},{key:"_sortCards",value:function(){this._cards=this._cards.sort((function(e,t){return e.lastSeenAt-t.lastSeenAt}))}},{key:"_getCard",value:function(e){return this._cards.find((function(t){return t.id===e}))}},{key:"_addCard",value:function(e){this._cards.unshift(e)}},{key:"_removeCard",value:function(e){this._cards.splice(this._cards.indexOf(this._cards.find((function(t){return t.id===parseInt(e,10)}))),1)}}]),e}()),O=n(115),x=n(118),g=n(120),v=n(128),y=n(122),C=n(123),S=n(125),_=n(126),k=n(127),N=n(129),w=n(130),A=n(131),T=n(132),I=n(4),M="set-user",B="set-card",D="turn-card",E={user:null,card:null,cardTurned:!1},H=function(e,t){switch(t.type){case M:return Object(u.a)(Object(u.a)({},e),{},{user:t.user});case B:return Object(u.a)(Object(u.a)({},e),{},{card:t.card,cardTurned:t.cardTurned});case D:return Object(u.a)(Object(u.a)({},e),{},{cardTurned:!e.cardTurned});default:return Object(u.a)({},e)}},F=Object(O.a)((function(e){return{root:{width:"".concat(window.innerWidth,"px"),height:"".concat(window.innerHeight,"px"),display:"grid",gridTemplateRows:"auto 112px",backgroundColor:e.palette.grey[100]},card:{width:"330px",justifySelf:"center",alignSelf:"center",overflow:"visible"},cardContent:{position:"relative",height:"190px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},translations:{fontSize:"24px",textAlign:"center"},example:{fontSize:"14px",textAlign:"center",marginTop:"10px"},cardActions:{position:"absolute",bottom:"-72px",display:"flex",justifyContent:"center"},rankButton:{margin:"0 16px"},rbFresh:{backgroundColor:"".concat(e.palette.error.dark," !important")},rbHigh:{backgroundColor:"".concat(e.palette.warning.main," !important")},rbMedium:{backgroundColor:"".concat(e.palette.success.main," !important")},rbLow:{backgroundColor:"".concat(e.palette.info.light," !important")},numCards:{position:"fixed",top:"28px",left:"28px"},cardSpec:{position:"fixed",bottom:"2px",left:"0",display:"flex",justifyContent:"space-around",width:"100%",maxWidth:"600px"},cardSpecEntry:{color:e.palette.info.main},search:{position:"fixed",top:"16px",right:"16px"},searchInput:{width:"240px"},showOrderSwitch:{alignSelf:"center",justifySelf:"start",marginLeft:"28px"},speedDial:{position:"fixed",right:"28px",bottom:"28px"},login:{width:"200px",height:"150px",justifySelf:"center",alignSelf:"center",display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center"},editor:{width:"330px",justifySelf:"center",alignSelf:"center"},editorActions:{width:"210px",justifySelf:"center",alignSelf:"center",display:"flex",justifyContent:"space-between"}}})),R={A_TO_B:"a-to-b",B_TO_A:"b-to-a",RANDOM:"random"};var L=function(){var e,t,n,a=F(),c=Object(r.useReducer)(H,E),i=Object(l.a)(c,2),o=i[0],d=i[1],j=Object(r.useState)(""),h=Object(l.a)(j,2),f=h[0],b=h[1],O=Object(r.useState)(!1),L=Object(l.a)(O,2),P=L[0],W=L[1],z=Object(r.useState)(""),U=Object(l.a)(z,2),G=U[0],J=U[1],V=Object(r.useState)(!1),q=Object(l.a)(V,2),K=q[0],Q=q[1],X=Object(r.useState)(R.A_TO_B),Y=Object(l.a)(X,2),Z=Y[0],$=Y[1],ee=Object(r.useState)(!1),te=Object(l.a)(ee,2),ne=te[0],ae=te[1],re=Object(r.useState)(!1),ce=Object(l.a)(re,2),ie=ce[0],oe=ce[1],se=Object(r.useState)(null),le=Object(l.a)(se,2),ue=le[0],de=le[1],je=Object(r.useCallback)((function(e){Q(!1);var t=!1;Z===R.B_TO_A?t=!0:Z===R.RANDOM&&(t=Math.random()<.5),m.getActiveCard(e).then((function(e){return d({card:e,cardTurned:t,type:B})})).catch((function(e){console.log(e),d({card:null,type:B})}))}),[d,Z]),he=Object(r.useCallback)((function(e,t,n){e.stopPropagation(),m.rankCard(t,n).then(je)}),[je]),fe=null;return ie?fe=Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)(x.a,{variant:"contained",onClick:function(e){e.stopPropagation(),oe(!1)},children:Object(I.jsx)("span",{className:"material-icons",children:"clear"})},"clear"),Object(I.jsx)(x.a,{variant:"contained",color:"secondary",onClick:function(e){e.stopPropagation(),m.deleteCard(o.card.id).then((function(){oe(!1),je()}))},children:Object(I.jsx)("span",{className:"material-icons",children:"delete"})},"delete")]}):K&&(fe=Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)(g.a,{className:"".concat(a.rankButton," ").concat(a.rbFresh),size:"small",onClick:function(e){return he(e,o.card.id,p.FRESH)}},"rb-fresh"),Object(I.jsx)(g.a,{className:"".concat(a.rankButton," ").concat(a.rbHigh),size:"small",onClick:function(e){return he(e,o.card.id,p.HIGH)}},"rb-high"),Object(I.jsx)(g.a,{className:"".concat(a.rankButton," ").concat(a.rbMedium),size:"small",onClick:function(e){return he(e,o.card.id,p.MEDIUM)}},"rb-medium"),Object(I.jsx)(g.a,{className:"".concat(a.rankButton," ").concat(a.rbLow),size:"small",onClick:function(e){return he(e,o.card.id,p.LOW)}},"rb-low")]})),o.user?ue?Object(I.jsxs)("div",{className:a.root,children:[Object(I.jsxs)("div",{className:a.editor,children:[Object.keys(ue.translations.from).map((function(e,t){return Object(I.jsx)(v.a,{id:e,label:e,margin:"normal",value:ue.translations.from[e],onChange:function(t){return de((function(n){var a=Object(u.a)({},n);return a.translations.from[e]=t.target.value,a}))},fullWidth:!0},e+t)})),Object.keys(ue.translations.to).map((function(e,t){return Object(I.jsx)(v.a,{id:e,label:e,margin:"normal",value:ue.translations.to[e],onChange:function(t){return de((function(n){var a=Object(u.a)({},n);return a.translations.to[e]=t.target.value,a}))},fullWidth:!0},e+t)})),Object(I.jsx)(v.a,{id:"example",label:"Beispiel",margin:"normal",value:ue.example,onChange:function(e){return de((function(t){return Object(u.a)(Object(u.a)({},t),{},{example:e.target.value})}))},fullWidth:!0})]}),Object(I.jsxs)("div",{className:a.editorActions,children:[Object(I.jsx)(x.a,{variant:"contained",onClick:function(){return de(null)},children:"Abbrechen"}),Object(I.jsx)(x.a,{variant:"contained",color:"primary",onClick:function(){m.upsertCard(ue).then((function(e){d({card:e,cardTurned:!1,type:B}),de(null),Q(!1)}))},children:"Fertig"})]})]}):(console.log("app render"),Object(I.jsxs)("div",{className:a.root,children:[Object(I.jsx)(y.a,{className:a.numCards,variant:"caption",color:"textSecondary",children:"".concat(m.getNumCardsSeen(),"/").concat(m.getNumCards())}),"meyer"===o.user.name&&(null===(e=o.card)||void 0===e?void 0:e.spec)&&Object(I.jsxs)("div",{className:a.cardSpec,children:[Object(I.jsx)(y.a,{className:a.cardSpecEntry,variant:"caption",color:"textSecondary",children:"".concat(o.card.spec.cardPosition," ").concat(o.card.priority)}),Object(I.jsx)(y.a,{className:a.cardSpecEntry,variant:"caption",color:"textSecondary",children:"use ".concat(o.card.spec.timeShowToRanking)}),Object(I.jsx)(y.a,{className:a.cardSpecEntry,variant:"caption",color:"textSecondary",children:"age ".concat(o.card.spec.timeSinceLastSeen)}),Object(I.jsx)(y.a,{className:a.cardSpecEntry,variant:"caption",color:"textSecondary",children:"dist ".concat(Object.keys(o.card.spec.priorityDistribution).reduce((function(e,t,n){return e+"".concat(n?" ":"").concat(o.card.spec.priorityDistribution[t])}),""))})]}),Object(I.jsxs)("div",{className:a.search,children:[!P&&Object(I.jsx)(C.a,{onClick:function(){return W(!0)},children:Object(I.jsx)("span",{className:"material-icons",children:"search"})}),P&&Object(I.jsx)(N.a,{className:a.searchInput,freeSolo:!0,id:"free-solo-2-demo",disableClearable:!0,inputValue:G,onInputChange:function(e,t){return J(t)},onChange:function(e,t){var n=m.getIdBySearchItem(t);n&&je(n)},onBlur:function(){J(""),W(!1)},options:m.getSearchItems(),renderInput:function(e){return Object(I.jsx)(v.a,Object(u.a)(Object(u.a)({},e),{},{label:"Suche",variant:"outlined",autoFocus:!0}))}})]}),Object(I.jsx)(S.a,{className:a.card,onClick:function(){d({type:D}),Q(!0)},children:o.card&&Object(I.jsxs)(_.a,{className:a.cardContent,children:[Object.values(o.cardTurned?o.card.translations.to:o.card.translations.from).map((function(e,t){return e?Object(I.jsx)(y.a,{className:a.translations,variant:"subtitle2",children:e},t):null})),o.cardTurned&&o.card.example&&Object(I.jsx)(y.a,{className:a.example,variant:"caption",children:o.card.example}),Object(I.jsx)(k.a,{className:a.cardActions,children:fe})]})}),Object(I.jsxs)("div",{className:a.showOrderSwitch,children:[Object(I.jsx)(y.a,{variant:"caption",color:"textSecondary",children:null===(t=o.user)||void 0===t?void 0:t.from[0]}),Object(I.jsxs)(C.a,{onClick:function(){return $((function(e){var t=Object.values(R);return t[(t.indexOf(e)+1)%3]}))},children:[Z===R.A_TO_B&&Object(I.jsx)("span",{className:"material-icons",children:"arrow_right_alt"}),Z===R.B_TO_A&&Object(I.jsx)("span",{className:"material-icons",style:{transform:"rotate(180deg)"},children:"arrow_right_alt"}),Z===R.RANDOM&&Object(I.jsx)("span",{className:"material-icons",children:"swap_horiz"})]}),Object(I.jsx)(y.a,{variant:"caption",color:"textSecondary",children:null===(n=o.user)||void 0===n?void 0:n.to[0]})]}),Object(I.jsxs)(w.a,{className:a.speedDial,ariaLabel:"SpeedDial",hidden:!1,icon:Object(I.jsx)(A.a,{}),onClose:function(){return ae(!1)},onOpen:function(){return ae(!0)},open:ne,direction:"up",children:[Object(I.jsx)(T.a,{icon:Object(I.jsx)("span",{className:"material-icons",children:"add"}),tooltipTitle:"Neu",onClick:function(){de({translations:{from:o.user.from.reduce((function(e,t){return Object(u.a)(Object(u.a)({},e),{},Object(s.a)({},t,""))}),{}),to:o.user.to.reduce((function(e,t){return Object(u.a)(Object(u.a)({},e),{},Object(s.a)({},t,""))}),{})},example:""}),ae(!1)}}),Object(I.jsx)(T.a,{icon:Object(I.jsx)("span",{className:"material-icons",children:"edit"}),tooltipTitle:"Bearbeiten",onClick:function(){o.card&&de(o.card),ae(!1)}}),Object(I.jsx)(T.a,{icon:Object(I.jsx)("span",{className:"material-icons",children:"delete"}),tooltipTitle:"L\xf6schen",onClick:function(){o.card&&oe(!0),ae(!1)}})]})]})):Object(I.jsx)("div",{className:a.root,children:Object(I.jsxs)("div",{className:a.login,children:[Object(I.jsx)(v.a,{id:"username",label:"Name",margin:"normal",value:f,onChange:function(e){return b(e.target.value)},fullWidth:!0}),Object(I.jsx)(x.a,{variant:"contained",color:"primary",onClick:function(){m.init(f).then((function(e){return d({type:M,user:e})})).then(je).catch((function(e){return console.log(e)}))},children:"Fertig"})]})})};o.a.render(Object(I.jsx)(c.a.StrictMode,{children:Object(I.jsx)(L,{})}),document.getElementById("root"))}},[[79,1,2]]]);
//# sourceMappingURL=main.9646b866.chunk.js.map