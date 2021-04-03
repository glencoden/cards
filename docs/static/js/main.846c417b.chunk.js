(this.webpackJsonpcards=this.webpackJsonpcards||[]).push([[0],{68:function(e,t,n){},76:function(e,t,n){"use strict";n.r(t);var a,r=n(0),c=n.n(r),i=n(11),o=n.n(i),s=(n(68),n(15)),l=n(32),u=n(8),d=n(34),j=n(35),b="".concat("http://192.168.1.3:80","/cards"),f=new(function(){function e(){Object(d.a)(this,e)}return Object(j.a)(e,[{key:"_get",value:function(e){return fetch(e).then((function(e){return e.json()}))}},{key:"_post",value:function(e,t){return Promise.resolve().then((function(){return JSON.stringify(t)})).then((function(t){return fetch(e,{method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"},body:t})})).then((function(e){return e.json()}))}},{key:"getUser",value:function(e){return this._get("".concat(b,"/user/").concat(e))}},{key:"getAll",value:function(){return this._get("".concat(b,"/all"))}},{key:"delete",value:function(e){return this._get("".concat(b,"/delete/").concat(e))}},{key:"add",value:function(e){return this.update(e)}},{key:"update",value:function(e){return this._post("".concat(b,"/upsert"),e)}}]),e}()),p="fresh",h="high",O="medium",m="low",x=(a={},Object(s.a)(a,p,1e3),Object(s.a)(a,h,3),Object(s.a)(a,O,2),Object(s.a)(a,m,1),a),g=new(function(){function e(){Object(d.a)(this,e),this._cards=[],this._user=""}return Object(j.a)(e,[{key:"_getCard",value:function(e){return this._cards.find((function(t){return t.id===e}))}},{key:"_getPriority",value:function(){var e=this,t=0;return Object.keys(x).reduce((function(n,a){var r=Math.random()*x[a];return r<=t||!e._cards.find((function(e){return e.priority===a}))?n:(t=r,a)}),"")}},{key:"init",value:function(e){var t=this;return f.getUser(e).then((function(e){return t._user=e.user,f.getAll()})).then((function(e){return t._cards=e,t._user}))}},{key:"getActiveCard",value:function(){var e=this;return new Promise((function(t,n){var a=e._getPriority(),r=e._cards.filter((function(e){return e.priority===a})).reduce((function(e,t){return e&&e.lastSeenAt<t.lastSeenAt?e:t}),null);r?(r.lastSeenAt=Date.now(),t(r)):n("no active card")}))}},{key:"shuffleCards",value:function(){}},{key:"rankCard",value:function(e,t){var n=this._getCard(e),a=Object(u.a)(Object(u.a)({},n),{},{priority:t});return f.update(a).then((function(e){n.priority=e.priority}))}},{key:"deleteCard",value:function(e){var t=this;return f.delete(e).then((function(e){t._cards.splice(t._cards.indexOf(t._cards.find((function(t){return t.id===parseInt(e.id,10)}))),1)}))}},{key:"updateCard",value:function(e){var t=this;if(!e.id)return f.add({translations:e.translations,example:e.example,priority:p,lastSeenAt:Date.now()}).then((function(e){t._cards.push(e)}));var n=this._getCard(e.id);return n?f.update(Object(u.a)(Object(u.a)({},n),{},{translations:Object(u.a)(Object(u.a)({},n.translations),e.translations),example:e.example})).then((function(e){n.translations=e.translations,n.example=e.example})):Promise.reject("no card to update")}}]),e}()),v=n(108),y=n(111),k=n(113),C=n(120),w=n(116),_=n(117),N=n(118),S=n(119),A=n(122),T=n(123),P=n(121),B=n(6),z="set-user",D="set-card",F="turn-card",L={user:null,card:null,cardTurned:!1},M=function(e,t){switch(t.type){case z:return Object(u.a)(Object(u.a)({},e),{},{user:t.user});case D:return Object(u.a)(Object(u.a)({},e),{},{card:t.card,cardTurned:!1});case F:return Object(u.a)(Object(u.a)({},e),{},{cardTurned:!e.cardTurned});default:return Object(u.a)({},e)}},W=Object(v.a)((function(e){return{root:{width:"".concat(window.innerWidth,"px"),height:"".concat(window.innerHeight,"px"),display:"grid",gridTemplateRows:"auto 112px",backgroundColor:e.palette.grey[100]},card:{width:"330px",justifySelf:"center",alignSelf:"center",overflow:"visible"},cardContent:{position:"relative",height:"190px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},translations:{fontSize:"24px",textAlign:"center"},example:{fontSize:"14px",textAlign:"center",marginTop:"10px"},cardActions:{position:"absolute",bottom:"-72px",display:"flex",justifyContent:"center"},rankButton:{margin:"0 16px"},rbFresh:{backgroundColor:e.palette.error.dark},rbHigh:{backgroundColor:e.palette.warning.main},rbMedium:{backgroundColor:e.palette.success.main},rbLow:{backgroundColor:e.palette.info.light},speedDial:{position:"fixed",right:"28px",bottom:"28px"},editor:{padding:"20px",alignSelf:"center"},editorActions:{width:"210px",justifySelf:"center",alignSelf:"center",display:"flex",justifyContent:"space-between"}}}));var H=function(){var e=W(),t=Object(r.useReducer)(M,L),n=Object(l.a)(t,2),a=n[0],c=n[1],i=Object(r.useState)(!1),o=Object(l.a)(i,2),d=o[0],j=o[1],b=Object(r.useState)(!1),f=Object(l.a)(b,2),x=f[0],v=f[1],H=Object(r.useState)(null),I=Object(l.a)(H,2),J=I[0],E=I[1],R=Object(r.useCallback)((function(){g.getActiveCard().then((function(e){return c({card:e,type:D})})).catch((function(e){console.log(e),c({card:null,type:D})}))}),[c]),U=Object(r.useCallback)((function(e,t,n){e.stopPropagation(),g.rankCard(t,n).then(R)}),[R]);Object(r.useEffect)((function(){g.init("meyer").then((function(e){return c({type:z,user:e})})).then((function(){return g.getActiveCard()})).then((function(e){return c({card:e,type:D})})).catch((function(e){return console.log(e)}))}),[c]);var q=null;return x?q=Object(B.jsxs)(B.Fragment,{children:[Object(B.jsx)(y.a,{variant:"contained",onClick:function(e){e.stopPropagation(),v(!1)},children:Object(B.jsx)("span",{className:"material-icons",children:"clear"})},"clear"),Object(B.jsx)(y.a,{variant:"contained",color:"secondary",onClick:function(e){e.stopPropagation(),g.deleteCard(a.card.id).then((function(){v(!1),R()}))},children:Object(B.jsx)("span",{className:"material-icons",children:"delete"})},"delete")]}):a.cardTurned&&(q=Object(B.jsxs)(B.Fragment,{children:[Object(B.jsx)(k.a,{className:"".concat(e.rankButton," ").concat(e.rbFresh),size:"small",onClick:function(e){return U(e,a.card.id,p)}},"rb-fresh"),Object(B.jsx)(k.a,{className:"".concat(e.rankButton," ").concat(e.rbHigh),size:"small",onClick:function(e){return U(e,a.card.id,h)}},"rb-high"),Object(B.jsx)(k.a,{className:"".concat(e.rankButton," ").concat(e.rbMedium),size:"small",onClick:function(e){return U(e,a.card.id,O)}},"rb-medium"),Object(B.jsx)(k.a,{className:"".concat(e.rankButton," ").concat(e.rbLow),size:"small",onClick:function(e){return U(e,a.card.id,m)}},"rb-low")]})),J?Object(B.jsxs)("div",{className:e.root,children:[Object(B.jsxs)("div",{className:e.editor,children:[Object.keys(J.translations.from).map((function(e,t){return Object(B.jsx)(C.a,{id:e,label:e,margin:"normal",value:J.translations.from[e],onChange:function(t){return E((function(n){return Object(u.a)(Object(u.a)({},n),{},{translations:Object(u.a)(Object(u.a)({},n.translations),{},{from:Object(u.a)(Object(u.a)({},n.translations.from),{},Object(s.a)({},e,t.target.value))})})}))},fullWidth:!0},t)})),Object.keys(J.translations.to).map((function(e,t){return Object(B.jsx)(C.a,{id:e,label:e,margin:"normal",value:J.translations.to[e],onChange:function(t){return E((function(n){return Object(u.a)(Object(u.a)({},n),{},{translations:Object(u.a)(Object(u.a)({},n.translations),{},{to:Object(u.a)(Object(u.a)({},n.translations.to),{},Object(s.a)({},e,t.target.value))})})}))},fullWidth:!0},t)})),Object(B.jsx)(C.a,{id:"example",label:"Beispiel",margin:"normal",value:J.example,onChange:function(e){return E((function(t){return Object(u.a)(Object(u.a)({},t),{},{example:e.target.value})}))},fullWidth:!0})]}),Object(B.jsxs)("div",{className:e.editorActions,children:[Object(B.jsx)(y.a,{variant:"contained",onClick:function(){return E(null)},children:"Abbrechen"}),Object(B.jsx)(y.a,{variant:"contained",color:"primary",onClick:function(){g.updateCard(J).then((function(){R(),E(null)}))},children:"Fertig"})]})]}):(console.log("APP",a.card),Object(B.jsxs)("div",{className:e.root,children:[Object(B.jsx)(w.a,{className:e.card,onClick:function(){return c({type:F})},children:a.card&&Object(B.jsxs)(_.a,{className:e.cardContent,children:[Object.values(a.cardTurned?a.card.translations.to:a.card.translations.from).map((function(t,n){return t?Object(B.jsx)(N.a,{className:e.translations,variant:"subtitle2",children:t},n):null})),a.cardTurned&&a.card.example&&Object(B.jsx)(N.a,{className:e.example,variant:"caption",children:a.card.example}),Object(B.jsx)(S.a,{className:e.cardActions,children:q})]})}),Object(B.jsxs)(A.a,{className:e.speedDial,ariaLabel:"SpeedDial",hidden:!1,icon:Object(B.jsx)(T.a,{}),onClose:function(){return j(!1)},onOpen:function(){return j(!0)},open:d,direction:"up",children:[Object(B.jsx)(P.a,{icon:Object(B.jsx)("span",{className:"material-icons",children:"add"}),tooltipTitle:"Neu",onClick:function(){E({translations:{from:a.user.from.reduce((function(e,t){return Object(u.a)(Object(u.a)({},e),{},Object(s.a)({},t,""))}),{}),to:a.user.to.reduce((function(e,t){return Object(u.a)(Object(u.a)({},e),{},Object(s.a)({},t,""))}),{})},example:""}),j(!1)}}),Object(B.jsx)(P.a,{icon:Object(B.jsx)("span",{className:"material-icons",children:"edit"}),tooltipTitle:"Bearbeiten",onClick:function(){a.card&&E(a.card),j(!1)}}),Object(B.jsx)(P.a,{icon:Object(B.jsx)("span",{className:"material-icons",children:"delete"}),tooltipTitle:"L\xf6schen",onClick:function(){a.card&&v(!0),j(!1)}})]})]}))};o.a.render(Object(B.jsx)(c.a.StrictMode,{children:Object(B.jsx)(H,{})}),document.getElementById("root"))}},[[76,1,2]]]);
//# sourceMappingURL=main.846c417b.chunk.js.map