import{d as w,m as U,s as S,h as d,q as t,o as u,c as P,j as p,f as i,b as e,v as r,t as n,g as v,w as b,B,k as h,U as C,P as y,p as I,a as D,_ as N}from"./index-ab1ad913.js";import{L as V}from"./Loader-af4416a6.js";const x=_=>(I("data-v-e4e87740"),_=_(),D(),_),L={key:0,class:"user-page"},T={class:"user-page__title"},$=x(()=>e("br",null,null,-1)),E={class:"user-page__data-list"},F={class:"user-page__data-item"},H={class:"user-page__data-text"},W={class:"user-page__data-item"},j={class:"user-page__data-text"},q={class:"user-page__data-item"},A={class:"user-page__data-text"},M=x(()=>e("p",{class:"user-page__message"}," If you want to change your data, please click button below and when you are ready don't forget to save updates. ",-1)),R={class:"user-page__popup-warning"},Y=w({__name:"UserPage",setup(_){const m=U(),{currentUser:s}=S(m),l=d(!1),o=d(""),c=d(!1),k=async f=>{try{c.value=!0,l.value=!1,s.value&&await m.editUserData(f,s.value.id)}catch(a){a instanceof Error&&a.message?o.value=a.message:o.value="Some problems with the editing user data.",setTimeout(()=>{o.value=""},2500)}finally{c.value=!1}};return(f,a)=>t(s)?(u(),P("div",L,[c.value?(u(),p(V,{key:0})):i("",!0),e("h2",T,[r(" Hey "+n(t(s).first_name)+"! ",1),$,r(" Here is your data: ")]),e("ul",E,[e("li",F,[r(" First name: "),e("p",H,n(t(s).first_name),1)]),e("li",W,[r(" Second name: "),e("p",j,n(t(s).second_name),1)]),e("li",q,[r(" Your e_mail: "),e("p",A,n(t(s).e_mail),1)])]),M,v(B,{text:"Update",class:"user-page__button",onClick:a[0]||(a[0]=b(g=>l.value=!0,["prevent"]))}),l.value?(u(),p(y,{key:1,onClosePopup:a[1]||(a[1]=g=>l.value=!1)},{default:h(()=>[v(C,{"button-text":"Save","first-name":t(s).first_name,"second-name":t(s).second_name,"e-mail":t(s).e_mail,onUserData:k},null,8,["first-name","second-name","e-mail"])]),_:1})):i("",!0),o.value?(u(),p(y,{key:2,onClosePopup:a[2]||(a[2]=g=>o.value="")},{default:h(()=>[e("h3",R,n(o.value),1)]),_:1})):i("",!0)])):i("",!0)}});const J=N(Y,[["__scopeId","data-v-e4e87740"]]);export{J as default};
