import{u as l,a as c,d as y,r as b,b as h,c as m,e as o,w as p,v as g,f as L,o as f,i as S,g as k,h as x}from"./index-58c89ad4.js";function A(){const{mutateAsync:n,isLoading:s,error:e}=l(async({username:a,password:u})=>c.login(a,u));return{login:n,isLoading:s,error:e}}function C(){const{data:n,error:s,mutateAsync:e}=l(async({username:a,password:u})=>c.signup(a,u));return{user:n,error:s,signup:e}}function P(){const{mutateAsync:n,isLoading:s,error:e}=l(async()=>c.logout());return{logout:n,isLoading:s,error:e}}const B={key:0},M=["onSubmit"],U={class:"form-group"},V=o("label",{for:"username"},"Username",-1),E={class:"form-group"},O=o("label",{for:"password"},"Password",-1),R=o("button",{type:"submit",class:"btn btn-primary"},"Submit",-1),D=y({__name:"AuthPage",setup(n){const s=S("user"),e=k();x();const{login:a}=A(),{signup:u}=C(),{logout:_}=P(),t=b({username:"",password:""}),v=async()=>{if(!t.value.username.trim()||!t.value.password.trim())return;const d=e.fullPath.toLowerCase().includes("signup")?u:a;s.value=await d(t.value)},w=()=>{_(),s.value=null};return(d,r)=>h(s)?(f(),m("div",B,[o("button",{onClick:w},"Log Out")])):(f(),m("form",{key:1,onSubmit:L(v,["prevent"])},[o("div",U,[V,p(o("input",{"onUpdate:modelValue":r[0]||(r[0]=i=>t.value.username=i),type:"text",class:"form-control",id:"username",placeholder:"Enter username"},null,512),[[g,t.value.username]])]),o("div",E,[O,p(o("input",{"onUpdate:modelValue":r[1]||(r[1]=i=>t.value.password=i),type:"password",class:"form-control",id:"password",placeholder:"Password"},null,512),[[g,t.value.password]])]),R],40,M))}});export{D as default};