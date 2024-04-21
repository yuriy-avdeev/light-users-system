import{d as D,o as l,c as p,t as C,n as L,_ as I,r as m,e as z,f as $,g as ae,w as ne,v as le,b as s,h as v,i as x,F as R,j as W,k as b,B as q,u as Y,s as j,l as E,m as P,q as F,U as T,P as A,C as oe,p as G,a as H}from"./index-1126d9fe.js";const ue="/light-users-system/assets/update-9339d31a.svg",ie=["disabled"],re=D({__name:"Arrow",props:{direction:{type:String,required:!0},isActive:{type:Boolean,default:!1},isDisabled:{type:Boolean,default:!1}},setup(_){const c=_;return(u,d)=>(l(),p("button",{class:L(["arrow",{arrow_active:c.isActive,arrow_disabled:c.isDisabled}]),type:"button",disabled:_.isDisabled},C(_.direction==="up"?"▲":"▼"),11,ie))}});const U=I(re,[["__scopeId","data-v-f32873c5"]]),_e="/light-users-system/assets/search-e34fce9a.svg",ce=["placeholder"],de={class:"input__icons-container"},pe={key:1,class:"input__search-icon",src:_e,alt:"search icon",width:"11",height:"11"},ve={class:"input__warning"},be=D({__name:"Input",props:{modelValue:{type:String,required:!0},placeholder:{type:String,default:"Type your text here"},warningText:{type:String,default:""},isFocused:{type:Boolean,default:!1},isDisabled:{type:Boolean,default:!1},debounceDelay:{type:Number,default:0}},emits:["update:modelValue"],setup(_,{emit:c}){const u=_,d=m(null);z(()=>{var n;u.isFocused&&((n=d.value)==null||n.focus())});const i=$({get(){return u.modelValue},set(n){r(n.trim())}}),r=ae(n=>{c("update:modelValue",n)},u.debounceDelay);return(n,o)=>(l(),p("div",{class:L(["input",{input_disabled:u.isDisabled}])},[ne(s("input",{ref_key:"inputElement",ref:d,type:"text",class:"input__input",placeholder:u.placeholder,"onUpdate:modelValue":o[0]||(o[0]=k=>i.value=k)},null,8,ce),[[le,i.value]]),s("div",de,[i.value?(l(),p("button",{key:0,class:"input__button-clear",type:"button",onClick:o[1]||(o[1]=v(k=>i.value="",["prevent"]))}," ✖ ")):(l(),p("img",pe))]),s("span",ve,C(u.warningText),1)],2))}});const me=I(be,[["__scopeId","data-v-aebdaa18"]]),ge={class:"app-pagination"},fe={class:"app-pagination__list"},he=D({__name:"AppPagination",props:{quantityOfPages:{type:Number,required:!0},currentPage:{type:Number,required:!0}},emits:["click-page"],setup(_,{emit:c}){const u=_,d=$(()=>{const{currentPage:r,quantityOfPages:n}=u;if(n<=3){const o=[];for(let k=1;k<=n;k++)o.push(k);return o}return r===1?[1,2,3]:r===n?[n-2,n-1,n]:[r-1,r,r+1]}),i=$(()=>u.quantityOfPages>3);return(r,n)=>(l(),p("div",ge,[i.value?(l(),p("button",{key:0,class:L(["app-pagination__arrow-button",{"app-pagination__arrow-button_disabled":u.currentPage===1}]),onClick:n[0]||(n[0]=v(o=>c("click-page",u.currentPage-1),["prevent"]))}," ◀ ",2)):x("",!0),s("ul",fe,[(l(!0),p(R,null,W(d.value,o=>(l(),p("li",{key:o,class:"app-pagination__list-item"},[b(q,{text:String(o),type:"button",class:L(["app-pagination__list-button",{"app-pagination__list-button_active":o===u.currentPage}]),onClick:v(k=>c("click-page",o),["prevent"])},null,8,["text","class","onClick"])]))),128))]),i.value?(l(),p("button",{key:1,class:L(["app-pagination__arrow-button",{"app-pagination__arrow-button_disabled":u.currentPage===u.quantityOfPages}]),onClick:n[1]||(n[1]=v(o=>c("click-page",u.currentPage+1),["prevent"]))}," ▶ ",2)):x("",!0)]))}});const ye=I(he,[["__scopeId","data-v-7245635f"]]),S=_=>(G("data-v-105a3b5b"),_=_(),H(),_),ke={class:"users-list"},we={class:"users-list__top-container"},Ce={key:0,class:"users-list__popup-warning"},$e={class:"users-table"},Pe={class:"users-table__header"},xe={class:"users-table__column users-table__column_order"},Se=["onClick"],Ue=S(()=>s("img",{src:ue,alt:"update button",width:"13",height:"13",loading:"lazy"},null,-1)),Le=[Ue],De=S(()=>s("th",{class:"users-table__column users-table__column_id users-table__column_mobile-hidden"}," ID ",-1)),Ie={class:"users-table__column users-table__column_first-name"},Be=S(()=>s("span",null,"First Name",-1)),Ve={class:"users-table__column users-table__column_second-name"},qe=S(()=>s("span",null,"Second Name",-1)),Ne={class:"users-table__column users-table__column_e-mail users-table__column_mobile-hidden"},Ee=S(()=>s("span",null,"E-mail",-1)),Fe=S(()=>s("th",{class:"users-table__column_mobile-hidden"},null,-1)),Ae=S(()=>s("th",{class:"users-table__column_mobile-hidden"},null,-1)),Me={class:"users-table__column users-table__column_order"},Oe={class:"users-table__column users-table__column_id users-table__column_mobile-hidden"},Te={class:"users-table__column users-table__column_first-name"},ze={class:"users-table__column users-table__column_second-name"},Re={class:"users-table__column users-table__column_e-mail users-table__column_mobile-hidden"},We={class:"users-table__column users-table__column_button users-table__column_mobile-hidden"},Ye={class:"users-table__column users-table__column_button users-table__column_mobile-hidden"},V=5,je=D({__name:"UsersList",setup(_){const c=Y(),{users:u}=j(c),d=m(!1),i=m(null),r=m(null),n=m(""),o=m(""),k=()=>{const t=M.value.toLowerCase();return u.value.filter(e=>{const{first_name:a,second_name:y,e_mail:se}=e;return a.toLowerCase().includes(t)||y.toLowerCase().includes(t)||se.toLowerCase().includes(t)})},M=$(()=>o.value.length>=3?o.value:""),w=$(()=>M.value?k():u.value),g=m(""),f=m(""),h=m(""),J=(t,e)=>e==="up"?[...w.value].sort((a,y)=>a[t].localeCompare(y[t])):[...w.value].sort((a,y)=>y[t].localeCompare(a[t])),B=$(()=>{let t=null,e="";return g.value?(t="first_name",e=g.value):f.value?(t="second_name",e=f.value):h.value&&(t="e_mail",e=h.value),t?J(t,e):w.value}),K=()=>{g.value="",f.value="",h.value=""};E(g,t=>{t&&(f.value="",h.value="")}),E(f,t=>{t&&(g.value="",h.value="")}),E(h,t=>{t&&(g.value="",f.value="")});const Q=async t=>{try{await c.addUser(t),d.value=!1}catch(e){e instanceof Error&&e.message?n.value=e.message:n.value="Some problems with creating new user.",setTimeout(()=>{n.value=""},3e3)}},X=t=>{const e=r.value;e&&c.editUserData(t,e),r.value=null},Z=t=>{c.deleteUser(t),i.value=null},N=m(1),O=$(()=>Math.ceil(B.value.length/V)),ee=$(()=>{if(B.value.length<=V)return B.value;const t=(N.value-1)*V;return B.value.slice(t,t+V)}),te=t=>{N.value=t};return(t,e)=>(l(),p("div",ke,[s("div",we,[b(me,{modelValue:o.value,"onUpdate:modelValue":e[0]||(e[0]=a=>o.value=a),placeholder:"Search users by names","warning-text":o.value.length&&o.value.length<3?"It should include at least 3 characters":"","debounce-delay":250},null,8,["modelValue","warning-text"]),b(q,{text:"Create User",type:"button",onClick:e[1]||(e[1]=v(a=>d.value=!0,["prevent"])),class:"users-list__create-button"})]),d.value?(l(),P(A,{key:0,onClosePopup:e[2]||(e[2]=a=>d.value=!1)},{default:F(()=>[n.value?(l(),p("h3",Ce,C(n.value),1)):(l(),P(T,{key:1,"button-text":"Register",onUserData:Q}))]),_:1})):x("",!0),s("table",$e,[s("thead",null,[s("tr",Pe,[s("th",xe,[s("button",{class:"users-table__update-button",onClick:v(K,["prevent"])},Le,8,Se)]),De,s("th",Ie,[b(U,{direction:"up","is-active":g.value==="up","is-disabled":!w.value.length,onClick:e[3]||(e[3]=v(a=>g.value="up",["prevent"]))},null,8,["is-active","is-disabled"]),b(U,{direction:"down","is-active":g.value==="down","is-disabled":!w.value.length,onClick:e[4]||(e[4]=v(a=>g.value="down",["prevent"]))},null,8,["is-active","is-disabled"]),Be]),s("th",Ve,[b(U,{direction:"up","is-active":f.value==="up","is-disabled":!w.value.length,onClick:e[5]||(e[5]=v(a=>f.value="up",["prevent"]))},null,8,["is-active","is-disabled"]),b(U,{direction:"down","is-active":f.value==="down","is-disabled":!w.value.length,onClick:e[6]||(e[6]=v(a=>f.value="down",["prevent"]))},null,8,["is-active","is-disabled"]),qe]),s("th",Ne,[b(U,{direction:"up","is-active":h.value==="up","is-disabled":!w.value.length,onClick:e[7]||(e[7]=v(a=>h.value="up",["prevent"]))},null,8,["is-active","is-disabled"]),b(U,{direction:"down","is-active":h.value==="down","is-disabled":!w.value.length,onClick:e[8]||(e[8]=v(a=>h.value="down",["prevent"]))},null,8,["is-active","is-disabled"]),Ee]),Fe,Ae])]),s("tbody",null,[(l(!0),p(R,null,W(ee.value,a=>(l(),p("tr",{key:a.id,class:"users-table__row"},[s("td",Me,C(a.order),1),s("td",Oe,C(a.id),1),s("td",Te,C(a.first_name),1),s("td",ze,C(a.second_name),1),s("td",Re,C(a.e_mail),1),s("td",We,[b(q,{text:"Edit",type:"button",onClick:v(y=>r.value=r.value?null:a.id,["stop","prevent"]),class:"users-table__button"},null,8,["onClick"]),r.value===a.id?(l(),P(A,{key:0,onClosePopup:e[9]||(e[9]=y=>r.value=null)},{default:F(()=>[b(T,{"button-text":"Update","first-name":a.first_name,"second-name":a.second_name,"e-mail":a.e_mail,onUserData:X},null,8,["first-name","second-name","e-mail"])]),_:2},1024)):x("",!0)]),s("td",Ye,[b(q,{text:"Delete",type:"button",onClick:v(y=>i.value=i.value?null:a.id,["stop","prevent"]),class:"users-table__button"},null,8,["onClick"]),i.value===a.id?(l(),P(oe,{key:0,onClickNo:e[10]||(e[10]=y=>i.value=null),onClickYes:y=>Z(a.id),text:"Are you sure?"},null,8,["onClickYes"])):x("",!0)])]))),128))])]),O.value>1?(l(),P(ye,{key:1,"quantity-of-pages":O.value,"current-page":N.value,onClickPage:te},null,8,["quantity-of-pages","current-page"])):x("",!0)]))}});const Ge=I(je,[["__scopeId","data-v-105a3b5b"]]);const He={},Je=_=>(G("data-v-db0efc3c"),_=_(),H(),_),Ke={class:"loader"},Qe=Je(()=>s("div",{class:"loader__spinner"},null,-1)),Xe=[Qe];function Ze(_,c){return l(),p("div",Ke,Xe)}const et=I(He,[["render",Ze],["__scopeId","data-v-db0efc3c"]]),tt={class:"users-list-page"},st={class:"users-list-page__error-container"},at=s("span",{class:"users-list-page__error-sign"},"✖",-1),nt={class:"users-list-page__error-text"},ot=D({__name:"UsersListPage",setup(_){const c=Y(),{users:u}=j(c),d=m(!1),i=m(null);return z(async()=>{if(!u.value.length)try{d.value=!0,await c.initializeUsers(),i.value=null}catch(r){r instanceof Error?i.value=r.message:i.value="Error: loading users data"}finally{d.value=!1}}),(r,n)=>(l(),p("div",tt,[d.value?(l(),P(et,{key:0})):i.value?(l(),P(A,{key:1,onClosePopup:n[0]||(n[0]=o=>i.value=null)},{default:F(()=>[s("div",st,[at,s("p",nt,C(i.value),1)])]),_:1})):x("",!0),d.value?x("",!0):(l(),P(Ge,{key:2}))]))}});export{ot as default};
