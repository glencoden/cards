(this.webpackJsonpcards=this.webpackJsonpcards||[]).push([[0],{68:function(e,t,n){},76:function(e,t,n){"use strict";n.r(t);var a,r=n(0),c=n.n(r),i=n(10),o=n.n(i),s=(n(68),n(17)),l=n(23),u=n(11),d=n(34),j=n(35),f="".concat("https://wolke.glencoden.de","/cards"),h=new(function(){function e(){Object(d.a)(this,e)}return Object(j.a)(e,[{key:"_get",value:function(e){return fetch(e).then((function(e){return e.json()}))}},{key:"_post",value:function(e,t){return Promise.resolve().then((function(){return JSON.stringify(t)})).then((function(t){return fetch(e,{method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"},body:t})})).then((function(e){return e.json()}))}},{key:"getUser",value:function(e){return this._get("".concat(f,"/user/").concat(e))}},{key:"getAll",value:function(e){return this._get("".concat(f,"/all/").concat(e))}},{key:"delete",value:function(e){return this._get("".concat(f,"/delete/").concat(e))}},{key:"add",value:function(e){return this.update(e)}},{key:"update",value:function(e){return this._post("".concat(f,"/upsert"),e)}}]),e}()),b={FRESH:"fresh",HIGH:"high",MEDIUM:"medium",LOW:"low"},p=(a={},Object(s.a)(a,b.FRESH,6),Object(s.a)(a,b.HIGH,4),Object(s.a)(a,b.MEDIUM,3),Object(s.a)(a,b.LOW,1),a),m=new(function(){function e(){Object(d.a)(this,e),this._user={},this._cards=[]}return Object(j.a)(e,[{key:"init",value:function(e){var t=this;return h.getUser(e).then((function(e){if(!e.user)throw new Error("wrong user name");return t._setUser(e.user),h.getAll(t._user.name)})).then((function(e){return t._setCards(e),t._user}))}},{key:"getActiveCard",value:function(){var e=this;return new Promise((function(t,n){if(e._cards.length){var a=e._cards[e._cards.length-1],r=0,c=e._cards.reduce((function(e,t,n){var c=Math.floor(p[t.priority]*(a.lastSeenAt-t.lastSeenAt)*Math.random());return c<r?e:(r=c,t.id)}),0),i=e._getCard(c);i?(console.log("active card",i),console.log("fresh ".concat(e._cards.filter((function(e){return e.priority===b.FRESH})).length,", high ").concat(e._cards.filter((function(e){return e.priority===b.HIGH})).length,", mid ").concat(e._cards.filter((function(e){return e.priority===b.MEDIUM})).length,", low ").concat(e._cards.filter((function(e){return e.priority===b.LOW})).length)),i.lastSeenAt=Date.now(),e._sortCards(),t(i)):n("no active card")}else n("no cards")}))}},{key:"getNumCards",value:function(){return this._cards.length}},{key:"upsertCard",value:function(e){var t=this;if(!e.id)return h.add({user:this._user.name,translations:e.translations,example:e.example,priority:b.FRESH,lastSeenAt:Date.now()}).then((function(e){return t._addCard(e),e}));var n=this._getCard(e.id);return n?h.update(Object(u.a)(Object(u.a)({},n),{},{translations:Object(u.a)(Object(u.a)({},n.translations),e.translations),example:e.example})).then((function(e){return n.translations=e.translations,n.example=e.example,n})):Promise.reject("no card to update")}},{key:"deleteCard",value:function(e){var t=this;return h.delete(e).then((function(e){t._removeCard(e.id)}))}},{key:"rankCard",value:function(e,t){if(!Object.values(b).includes(t))return Promise.reject("no priority");var n=this._getCard(e);return h.update(Object(u.a)(Object(u.a)({},n),{},{priority:t})).then((function(e){n.priority=e.priority}))}},{key:"_setUser",value:function(e){this._user=e,console.log("card deck set user",this._user)}},{key:"_setCards",value:function(e){this._cards=e,this._sortCards(),console.log("card deck set cards",this._cards)}},{key:"_sortCards",value:function(){this._cards=this._cards.sort((function(e,t){return e.lastSeenAt-t.lastSeenAt}))}},{key:"_getCard",value:function(e){return this._cards.find((function(t){return t.id===e}))}},{key:"_addCard",value:function(e){this._cards.unshift(e)}},{key:"_removeCard",value:function(e){this._cards.splice(this._cards.indexOf(this._cards.find((function(t){return t.id===parseInt(e,10)}))),1)}}]),e}()),O=n(108),x=n(111),g=n(113),v=n(121),y=n(116),_=n(117),C=n(118),k=n(119),w=n(120),S=n(123),N=n(124),A=n(122),T=n(5),M="set-user",H="set-card",B="turn-card",D={user:null,card:null,cardTurned:!1},I=function(e,t){switch(t.type){case M:return Object(u.a)(Object(u.a)({},e),{},{user:t.user});case H:return Object(u.a)(Object(u.a)({},e),{},{card:t.card,cardTurned:t.cardTurned});case B:return Object(u.a)(Object(u.a)({},e),{},{cardTurned:!e.cardTurned});default:return Object(u.a)({},e)}},E=Object(O.a)((function(e){return{root:{width:"".concat(window.innerWidth,"px"),height:"".concat(window.innerHeight,"px"),display:"grid",gridTemplateRows:"auto 112px",backgroundColor:e.palette.grey[100]},card:{width:"330px",justifySelf:"center",alignSelf:"center",overflow:"visible"},cardContent:{position:"relative",height:"190px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},translations:{fontSize:"24px",textAlign:"center"},example:{fontSize:"14px",textAlign:"center",marginTop:"10px"},cardActions:{position:"absolute",bottom:"-72px",display:"flex",justifyContent:"center"},rankButton:{margin:"0 16px"},rbFresh:{backgroundColor:"".concat(e.palette.error.dark," !important")},rbHigh:{backgroundColor:"".concat(e.palette.warning.main," !important")},rbMedium:{backgroundColor:"".concat(e.palette.success.main," !important")},rbLow:{backgroundColor:"".concat(e.palette.info.light," !important")},numCards:{position:"fixed",top:"28px",left:"28px"},showOrderSwitch:{alignSelf:"center",justifySelf:"start",marginLeft:"28px"},speedDial:{position:"fixed",right:"28px",bottom:"28px"},login:{width:"200px",height:"150px",justifySelf:"center",alignSelf:"center",display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center"},editor:{width:"330px",justifySelf:"center",alignSelf:"center"},editorActions:{width:"210px",justifySelf:"center",alignSelf:"center",display:"flex",justifyContent:"space-between"}}})),F={A_TO_B:"a-to-b",B_TO_A:"b-to-a",RANDOM:"random"};var R=function(){var e,t,n=E(),a=Object(r.useReducer)(I,D),c=Object(l.a)(a,2),i=c[0],o=c[1],d=Object(r.useState)(""),j=Object(l.a)(d,2),f=j[0],h=j[1],p=Object(r.useState)(!1),O=Object(l.a)(p,2),R=O[0],L=O[1],W=Object(r.useState)(F.A_TO_B),P=Object(l.a)(W,2),U=P[0],z=P[1],G=Object(r.useState)(!1),J=Object(l.a)(G,2),q=J[0],K=J[1],Q=Object(r.useState)(!1),V=Object(l.a)(Q,2),X=V[0],Y=V[1],Z=Object(r.useState)(null),$=Object(l.a)(Z,2),ee=$[0],te=$[1],ne=Object(r.useCallback)((function(){L(!1);var e=!1;U===F.B_TO_A?e=!0:U===F.RANDOM&&(e=Math.random()<.5),m.getActiveCard().then((function(t){return o({card:t,cardTurned:e,type:H})})).catch((function(e){console.log(e),o({card:null,type:H})}))}),[o,U]),ae=Object(r.useCallback)((function(e,t,n){e.stopPropagation(),m.rankCard(t,n).then(ne)}),[ne]),re=null;return X?re=Object(T.jsxs)(T.Fragment,{children:[Object(T.jsx)(x.a,{variant:"contained",onClick:function(e){e.stopPropagation(),Y(!1)},children:Object(T.jsx)("span",{className:"material-icons",children:"clear"})},"clear"),Object(T.jsx)(x.a,{variant:"contained",color:"secondary",onClick:function(e){e.stopPropagation(),m.deleteCard(i.card.id).then((function(){Y(!1),ne()}))},children:Object(T.jsx)("span",{className:"material-icons",children:"delete"})},"delete")]}):R&&(re=Object(T.jsxs)(T.Fragment,{children:[Object(T.jsx)(g.a,{className:"".concat(n.rankButton," ").concat(n.rbFresh),size:"small",onClick:function(e){return ae(e,i.card.id,b.FRESH)}},"rb-fresh"),Object(T.jsx)(g.a,{className:"".concat(n.rankButton," ").concat(n.rbHigh),size:"small",onClick:function(e){return ae(e,i.card.id,b.HIGH)}},"rb-high"),Object(T.jsx)(g.a,{className:"".concat(n.rankButton," ").concat(n.rbMedium),size:"small",onClick:function(e){return ae(e,i.card.id,b.MEDIUM)}},"rb-medium"),Object(T.jsx)(g.a,{className:"".concat(n.rankButton," ").concat(n.rbLow),size:"small",onClick:function(e){return ae(e,i.card.id,b.LOW)}},"rb-low")]})),i.user?ee?Object(T.jsxs)("div",{className:n.root,children:[Object(T.jsxs)("div",{className:n.editor,children:[Object.keys(ee.translations.from).map((function(e,t){return Object(T.jsx)(v.a,{id:e,label:e,margin:"normal",value:ee.translations.from[e],onChange:function(t){return te((function(n){var a=Object(u.a)({},n);return a.translations.from[e]=t.target.value,a}))},fullWidth:!0},e+t)})),Object.keys(ee.translations.to).map((function(e,t){return Object(T.jsx)(v.a,{id:e,label:e,margin:"normal",value:ee.translations.to[e],onChange:function(t){return te((function(n){var a=Object(u.a)({},n);return a.translations.to[e]=t.target.value,a}))},fullWidth:!0},e+t)})),Object(T.jsx)(v.a,{id:"example",label:"Beispiel",margin:"normal",value:ee.example,onChange:function(e){return te((function(t){return Object(u.a)(Object(u.a)({},t),{},{example:e.target.value})}))},fullWidth:!0})]}),Object(T.jsxs)("div",{className:n.editorActions,children:[Object(T.jsx)(x.a,{variant:"contained",onClick:function(){return te(null)},children:"Abbrechen"}),Object(T.jsx)(x.a,{variant:"contained",color:"primary",onClick:function(){m.upsertCard(ee).then((function(e){o({card:e,cardTurned:!1,type:H}),te(null),L(!1)}))},children:"Fertig"})]})]}):(console.log("app render"),Object(T.jsxs)("div",{className:n.root,children:[Object(T.jsx)(y.a,{className:n.numCards,variant:"caption",color:"textSecondary",children:"".concat(m.getNumCards()," cards")}),Object(T.jsx)(_.a,{className:n.card,onClick:function(){o({type:B}),L(!0)},children:i.card&&Object(T.jsxs)(C.a,{className:n.cardContent,children:[Object.values(i.cardTurned?i.card.translations.to:i.card.translations.from).map((function(e,t){return e?Object(T.jsx)(y.a,{className:n.translations,variant:"subtitle2",children:e},t):null})),i.cardTurned&&i.card.example&&Object(T.jsx)(y.a,{className:n.example,variant:"caption",children:i.card.example}),Object(T.jsx)(k.a,{className:n.cardActions,children:re})]})}),Object(T.jsxs)("div",{className:n.showOrderSwitch,children:[Object(T.jsx)(y.a,{variant:"caption",color:"textSecondary",children:null===(e=i.user)||void 0===e?void 0:e.from[0]}),Object(T.jsxs)(w.a,{onClick:function(){return z((function(e){var t=Object.values(F);return t[(t.indexOf(e)+1)%3]}))},children:[U===F.A_TO_B&&Object(T.jsx)("span",{className:"material-icons",children:"arrow_right_alt"}),U===F.B_TO_A&&Object(T.jsx)("span",{className:"material-icons",style:{transform:"rotate(180deg)"},children:"arrow_right_alt"}),U===F.RANDOM&&Object(T.jsx)("span",{className:"material-icons",children:"swap_horiz"})]}),Object(T.jsx)(y.a,{variant:"caption",color:"textSecondary",children:null===(t=i.user)||void 0===t?void 0:t.to[0]})]}),Object(T.jsxs)(S.a,{className:n.speedDial,ariaLabel:"SpeedDial",hidden:!1,icon:Object(T.jsx)(N.a,{}),onClose:function(){return K(!1)},onOpen:function(){return K(!0)},open:q,direction:"up",children:[Object(T.jsx)(A.a,{icon:Object(T.jsx)("span",{className:"material-icons",children:"add"}),tooltipTitle:"Neu",onClick:function(){te({translations:{from:i.user.from.reduce((function(e,t){return Object(u.a)(Object(u.a)({},e),{},Object(s.a)({},t,""))}),{}),to:i.user.to.reduce((function(e,t){return Object(u.a)(Object(u.a)({},e),{},Object(s.a)({},t,""))}),{})},example:""}),K(!1)}}),Object(T.jsx)(A.a,{icon:Object(T.jsx)("span",{className:"material-icons",children:"edit"}),tooltipTitle:"Bearbeiten",onClick:function(){i.card&&te(i.card),K(!1)}}),Object(T.jsx)(A.a,{icon:Object(T.jsx)("span",{className:"material-icons",children:"delete"}),tooltipTitle:"L\xf6schen",onClick:function(){i.card&&Y(!0),K(!1)}})]})]})):Object(T.jsx)("div",{className:n.root,children:Object(T.jsxs)("div",{className:n.login,children:[Object(T.jsx)(v.a,{id:"username",label:"Name",margin:"normal",value:f,onChange:function(e){return h(e.target.value)},fullWidth:!0}),Object(T.jsx)(x.a,{variant:"contained",color:"primary",onClick:function(){m.init(f).then((function(e){return o({type:M,user:e})})).then(ne).catch((function(e){return console.log(e)}))},children:"Fertig"})]})})};o.a.render(Object(T.jsx)(c.a.StrictMode,{children:Object(T.jsx)(R,{})}),document.getElementById("root"))}},[[76,1,2]]]);
//# sourceMappingURL=main.3517c98a.chunk.js.map