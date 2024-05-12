import{d as A,o as l,c as m,t as P,n as q,_ as E,e as x,w as d,f as C,b as s,F as W,r as R,g as _,B as D,u as Y,s as j,h as v,i as V,j as $,k as S,I as ae,P as N,U as T,C as ne,p as le,a as oe,l as ue}from"./index-ab1ad913.js";import{L as G}from"./Loader-af4416a6.js";const ie="/light-users-system/assets/search-e34fce9a.svg",re="/light-users-system/assets/update-9339d31a.svg",ce=["disabled"],_e=A({__name:"Arrow",props:{direction:{type:String,required:!0},isActive:{type:Boolean,default:!1},isDisabled:{type:Boolean,default:!1}},setup(b){const r=b;return(c,g)=>(l(),m("button",{class:q(["arrow",{arrow_active:r.isActive,arrow_disabled:r.isDisabled}]),type:"button",disabled:b.isDisabled},P(b.direction==="up"?"▲":"▼"),11,ce))}});const L=E(_e,[["__scopeId","data-v-4ce5d3a3"]]),de={class:"app-pagination"},pe={class:"app-pagination__list"},ve=A({__name:"AppPagination",props:{quantityOfPages:{type:Number,required:!0},currentPage:{type:Number,required:!0}},emits:["click-page"],setup(b,{emit:r}){const c=b,g=x(()=>{const{currentPage:u,quantityOfPages:n}=c;if(n<=3){const o=[];for(let p=1;p<=n;p++)o.push(p);return o}return u===1?[1,2,3]:u===n?[n-2,n-1,n]:[u-1,u,u+1]}),i=x(()=>c.quantityOfPages>3);return(u,n)=>(l(),m("div",de,[i.value?(l(),m("button",{key:0,class:q(["app-pagination__arrow-button",{"app-pagination__arrow-button_disabled":c.currentPage===1}]),onClick:n[0]||(n[0]=d(o=>r("click-page",c.currentPage-1),["prevent"]))}," ◀ ",2)):C("",!0),s("ul",pe,[(l(!0),m(W,null,R(g.value,o=>(l(),m("li",{key:o,class:"app-pagination__list-item"},[_(D,{text:String(o),type:"button",class:q(["app-pagination__list-button",{"app-pagination__list-button_active":o===c.currentPage}]),onClick:d(p=>r("click-page",o),["prevent"])},null,8,["text","class","onClick"])]))),128))]),i.value?(l(),m("button",{key:1,class:q(["app-pagination__arrow-button",{"app-pagination__arrow-button_disabled":c.currentPage===c.quantityOfPages}]),onClick:n[1]||(n[1]=d(o=>r("click-page",c.currentPage+1),["prevent"]))}," ▶ ",2)):C("",!0)]))}});const me=E(ve,[["__scopeId","data-v-9bc25849"]]),U=b=>(le("data-v-88edd0f8"),b=b(),oe(),b),be={class:"users-list"},ge={class:"users-list__top-container"},he={class:"users-list__input-icon-container"},fe={key:1,class:"users-list__input-search-icon",src:ie,alt:"search icon",width:"11",height:"11"},ye={class:"users-list__popup-warning"},we={class:"users-table"},ke={class:"users-table__header"},Ce={class:"users-table__column users-table__column_order"},Pe=["onClick"],$e=U(()=>s("img",{src:re,alt:"update button",width:"13",height:"13",loading:"lazy"},null,-1)),xe=[$e],Ue=U(()=>s("th",{class:"users-table__column users-table__column_id users-table__column_mobile-hidden"}," ID ",-1)),Le={class:"users-table__column users-table__column_first-name"},Se=U(()=>s("span",null,"First Name",-1)),Ie={class:"users-table__column users-table__column_second-name"},Be=U(()=>s("span",null,"Second Name",-1)),qe={class:"users-table__column users-table__column_e-mail users-table__column_mobile-hidden"},De=U(()=>s("span",null,"E-mail",-1)),Ne=U(()=>s("th",{class:"users-table__column_mobile-hidden"},null,-1)),Ae=U(()=>s("th",{class:"users-table__column_mobile-hidden"},null,-1)),Fe={class:"users-table__column users-table__column_order"},Oe={class:"users-table__column users-table__column_id users-table__column_mobile-hidden"},Ve={class:"users-table__column users-table__column_first-name"},Ee={class:"users-table__column users-table__column_second-name"},Me={class:"users-table__column users-table__column_e-mail users-table__column_mobile-hidden"},ze={class:"users-table__column users-table__column_button users-table__column_mobile-hidden"},Te={class:"users-table__column users-table__column_button users-table__column_mobile-hidden"},B=5,We=A({__name:"UsersList",setup(b){const r=Y(),{users:c}=j(r),g=v(!1),i=v(null),u=v(null),n=v(""),o=v(""),p=v(!1),H=()=>{const a=M.value.toLowerCase();return c.value.filter(e=>{const{first_name:t,second_name:w,e_mail:se}=e;return t.toLowerCase().includes(a)||w.toLowerCase().includes(a)||se.toLowerCase().includes(a)})},M=x(()=>o.value.length>=3?o.value:""),k=x(()=>M.value?H():c.value),h=v(""),f=v(""),y=v(""),J=(a,e)=>e==="up"?[...k.value].sort((t,w)=>t[a].localeCompare(w[a])):[...k.value].sort((t,w)=>w[a].localeCompare(t[a])),I=x(()=>{let a=null,e="";return h.value?(a="first_name",e=h.value):f.value?(a="second_name",e=f.value):y.value&&(a="e_mail",e=y.value),a?J(a,e):k.value}),K=()=>{h.value="",f.value="",y.value=""};V(h,()=>{f.value="",y.value=""}),V(f,()=>{h.value="",y.value=""}),V(y,()=>{h.value="",f.value=""});const Q=async a=>{try{p.value=!0,g.value=!1,await r.addUser(a)}catch(e){F(e,"Some problems with the creating new user.")}finally{p.value=!1}},X=async a=>{try{p.value=!0;const e=u.value;u.value=null,e&&await r.editUserData(a,e)}catch(e){F(e,"Some problems with the editing user data.")}finally{p.value=!1}},Z=async a=>{try{p.value=!0,i.value=null,await r.deleteUser(a)}catch(e){F(e,"Some problems with the deleting user.")}finally{p.value=!1}},F=(a,e)=>{a.message?n.value=a.message:n.value=e,setTimeout(()=>{n.value=""},3e3)},O=v(1),z=x(()=>Math.ceil(I.value.length/B)),ee=x(()=>{if(I.value.length<=B)return I.value;const a=(O.value-1)*B;return I.value.slice(a,a+B)}),te=a=>{O.value=a};return(a,e)=>(l(),m("div",be,[p.value?(l(),$(G,{key:0})):C("",!0),s("div",ge,[_(ae,{modelValue:o.value,"onUpdate:modelValue":e[1]||(e[1]=t=>o.value=t),class:"users-list__input",placeholder:"Search users by names","warning-text":o.value.length&&o.value.length<3?"It should include at least 3 characters":""},{default:S(()=>[s("div",he,[o.value?(l(),m("button",{key:0,class:"users-list__input-button-clear",type:"button",onClick:e[0]||(e[0]=d(t=>o.value="",["prevent"]))}," ✖ ")):(l(),m("img",fe))])]),_:1},8,["modelValue","warning-text"]),_(D,{class:"users-list__create-button",text:"Create User",type:"button",onClick:e[2]||(e[2]=d(t=>g.value=!0,["prevent"]))})]),n.value?(l(),$(N,{key:1,onClosePopup:e[3]||(e[3]=t=>n.value="")},{default:S(()=>[s("h3",ye,P(n.value),1)]),_:1})):C("",!0),g.value?(l(),$(N,{key:2,onClosePopup:e[4]||(e[4]=t=>g.value=!1)},{default:S(()=>[_(T,{"button-text":"Register","show-password":"",onUserData:Q})]),_:1})):C("",!0),s("table",we,[s("thead",null,[s("tr",ke,[s("th",Ce,[s("button",{class:"users-table__update-button",onClick:d(K,["prevent"])},xe,8,Pe)]),Ue,s("th",Le,[_(L,{direction:"up","is-active":h.value==="up","is-disabled":!k.value.length,onClick:e[5]||(e[5]=d(t=>h.value="up",["prevent"]))},null,8,["is-active","is-disabled"]),_(L,{direction:"down","is-active":h.value==="down","is-disabled":!k.value.length,onClick:e[6]||(e[6]=d(t=>h.value="down",["prevent"]))},null,8,["is-active","is-disabled"]),Se]),s("th",Ie,[_(L,{direction:"up","is-active":f.value==="up","is-disabled":!k.value.length,onClick:e[7]||(e[7]=d(t=>f.value="up",["prevent"]))},null,8,["is-active","is-disabled"]),_(L,{direction:"down","is-active":f.value==="down","is-disabled":!k.value.length,onClick:e[8]||(e[8]=d(t=>f.value="down",["prevent"]))},null,8,["is-active","is-disabled"]),Be]),s("th",qe,[_(L,{direction:"up","is-active":y.value==="up","is-disabled":!k.value.length,onClick:e[9]||(e[9]=d(t=>y.value="up",["prevent"]))},null,8,["is-active","is-disabled"]),_(L,{direction:"down","is-active":y.value==="down","is-disabled":!k.value.length,onClick:e[10]||(e[10]=d(t=>y.value="down",["prevent"]))},null,8,["is-active","is-disabled"]),De]),Ne,Ae])]),s("tbody",null,[(l(!0),m(W,null,R(ee.value,t=>(l(),m("tr",{key:t.id,class:"users-table__row"},[s("td",Fe,P(t.order),1),s("td",Oe,P(t.id),1),s("td",Ve,P(t.first_name),1),s("td",Ee,P(t.second_name),1),s("td",Me,P(t.e_mail),1),s("td",ze,[_(D,{text:"Edit",type:"button",onClick:d(w=>u.value=u.value?null:t.id,["stop","prevent"]),class:"users-table__button"},null,8,["onClick"]),u.value===t.id?(l(),$(N,{key:0,onClosePopup:e[11]||(e[11]=w=>u.value=null)},{default:S(()=>[_(T,{"button-text":"Update","first-name":t.first_name,"second-name":t.second_name,"e-mail":t.e_mail,onUserData:X},null,8,["first-name","second-name","e-mail"])]),_:2},1024)):C("",!0)]),s("td",Te,[_(D,{text:"Delete",type:"button",onClick:d(w=>i.value=i.value?null:t.id,["stop","prevent"]),class:"users-table__button"},null,8,["onClick"]),i.value===t.id?(l(),$(ne,{key:0,onClickNo:e[12]||(e[12]=w=>i.value=null),onClickYes:w=>Z(t.id),text:"Are you sure?"},null,8,["onClickYes"])):C("",!0)])]))),128))])]),z.value>1?(l(),$(me,{key:3,"quantity-of-pages":z.value,"current-page":O.value,onClickPage:te},null,8,["quantity-of-pages","current-page"])):C("",!0)]))}});const Re=E(We,[["__scopeId","data-v-88edd0f8"]]),Ye={class:"users-list-page"},je={class:"users-list-page__error-container"},Ge=s("span",{class:"users-list-page__error-sign"},"✖",-1),He={class:"users-list-page__error-text"},Qe=A({__name:"UsersListPage",setup(b){const r=Y(),{users:c}=j(r),g=v(!1),i=v(null);return ue(async()=>{if(!c.value.length)try{g.value=!0,await r.initializeUsers(),i.value=null}catch(u){u instanceof Error?i.value=u.message:i.value="Error: loading users data"}finally{g.value=!1}}),(u,n)=>(l(),m("div",Ye,[g.value?(l(),$(G,{key:0})):i.value?(l(),$(N,{key:1,onClosePopup:n[0]||(n[0]=o=>i.value=null)},{default:S(()=>[s("div",je,[Ge,s("p",He,P(i.value),1)])]),_:1})):C("",!0),_(Re)]))}});export{Qe as default};
