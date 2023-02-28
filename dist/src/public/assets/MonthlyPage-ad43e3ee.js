import{j as E,k as P,l as Y,u as G,d as v,c as d,F as x,m as S,o as u,e as c,t as g,r as M,w as b,v as I,f as O,b as m,n as B,i as R,p as F,q as V,s as Q,x as w,y as _,z as k,A as q,B as z,h as J,C as H}from"./index-8d96a823.js";const K={query:h,get:W,post:X,postMany:Z,put:T,putMany:tt,remove:et,removeMany:nt};function h(e,n=1e3){return new Promise(t=>{const o=JSON.parse(localStorage.getItem(e)||"[]");setTimeout(()=>t(o),n)})}async function W(e,n){const o=(await h(e)).find(a=>a._id===n);if(!o)throw new Error(`Get failed, cannot find entity with id: ${n} in: ${e}`);return o}async function X(e,n){const t=await h(e);return t.push({_id:U(),...structuredClone(n)}),y(e,t),n}async function Z(e,n){const t=await h(e);return n.forEach(o=>t.push({_id:U(),...structuredClone(o)})),y(e,t),n}async function T(e,n){const t=await h(e),o=t.findIndex(a=>a._id===n._id);if(o<0)throw new Error(`Update failed, cannot find entity with id: ${n._id} in: ${e}`);return t.splice(o,1,structuredClone(n)),y(e,t),n}async function tt(e,n){const t=await h(e);return n.forEach(o=>{const a=t.findIndex(s=>s._id===o._id);if(a<0)throw new Error(`Update failed, cannot find entity with id: ${o._id} in: ${e}`);t.splice(a,1,structuredClone(o))}),y(e,t),n}async function et(e,n){const t=await h(e),o=t.findIndex(a=>a._id===n);if(o<0)throw new Error(`Remove failed, cannot find entity with id: ${n} in: ${e}`);return t.splice(o,1),y(e,t),t}async function nt(e,n){const t=await h(e);return n.forEach(o=>{const a=t.findIndex(s=>s._id===o);if(a<0)throw new Error(`Remove failed, cannot find entity with id: ${o} in: ${e}`);t.splice(a,1)}),y(e,t),t}function y(e,n){localStorage.setItem(e,JSON.stringify(n))}function U(e=5){let n="";const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let o=0;o<e;o++)n+=t.charAt(Math.floor(Math.random()*t.length));return n}const $={getMonthlyData:at,addItem:st,saveMonthlyData:rt},ot="financialsDB";async function at({year:e,month:n}){console.log("getMonthlyData",e,n);const t=E.get(`monthData/${e}`,{month:n});if(!t)throw new Error("No month data found");return t}async function st(e,n,t){const o={id:Date.now().toString(),...e};console.log(monthData);const{expneses:{recurring:a,nonRecurring:s}}=monthData;return(t?a:s).unshift(o),monthData}async function rt(e){return K.put(ot,e)}function it({year:e,searchMonth:n}){const{data:t,error:o,isLoading:a}=P(["monthly",e,n],({queryKey:s})=>{const i=s[1],r=s[2];return $.getMonthlyData({year:i,month:r})});return{monthly:t,error:o,isGettingMonthly:a}}function lt(){const e=Y(),{data:n,error:t,isLoading:o,mutate:a}=G(async({item:s,searchMonth:i,isRecurring:r})=>{const l=await $.addItem(s,i,r);return $.saveMonthlyData(l)},{onSuccess:s=>{e.setQueryData(["monthly",s.month],s)}});return{newMonthData:n,error:t,isAddingItem:o,addItem:a}}const A=v({__name:"ItemList",props:{list:null},setup(e){return(n,t)=>(u(),d("ul",null,[(u(!0),d(x,null,S(e.list,({id:o,name:a,price:s})=>(u(),d("li",{key:o},[c("span",null,g(a),1),c("span",null,g(s),1)]))),128))]))}}),ut={class:"add-item"},ct=["onSubmit"],dt=c("input",{type:"checkbox",placeholder:"isRecurring"},null,-1),mt=c("button",{type:"submit"},"Add",-1),ht={key:0},pt=v({__name:"AddItem",emits:["add-item"],setup(e,{emit:n}){const t=R("isAddingItem"),o=M({name:"",price:0}),a=()=>{n("add-item",o.value)};return(s,i)=>(u(),d("div",ut,[c("form",{onSubmit:O(a,["prevent"])},[b(c("input",{"onUpdate:modelValue":i[0]||(i[0]=r=>o.value.name=r),type:"text",placeholder:"name"},null,512),[[I,o.value.name]]),b(c("input",{"onUpdate:modelValue":i[1]||(i[1]=r=>o.value.price=r),type:"number",placeholder:"price"},null,512),[[I,o.value.price]]),dt,mt],40,ct),m(t)?(u(),d("div",ht,"Adding Item...")):B("",!0)]))}}),ft={class:"month-picker-container",list:"months"},_t={id:"months"},gt=["value"],vt=v({__name:"MonthPicker",emits:["updateMonth"],setup(e,{emit:n}){const t=["january","february","march","april","may","june","july","august","september","october","november","december"],o=new Date,a=M(t[o.getMonth()]);return F(a,s=>{n("updateMonth",t.indexOf(s))}),(s,i)=>(u(),d(x,null,[c("div",ft,[V(" Showing month: "),b(c("input",{list:"months",type:"text","onUpdate:modelValue":i[0]||(i[0]=r=>a.value=r)},null,512),[[I,a.value]])]),c("datalist",_t,[(u(),d(x,null,S(t,r=>c("option",{key:r,value:r},null,8,gt)),64))])],64))}});const C=v({__name:"NumberPicker",props:{modelValue:null,labelTxt:null,dynamicClass:null},emits:["update:modelValue"],setup(e,{emit:n}){const t=o=>{const a=o.target.innerText;n("update:modelValue",a)};return(o,a)=>(u(),d("div",{class:Q(e.dynamicClass)},[V(g(e.labelTxt)+" ",1),c("span",{contenteditable:"true",onBlur:t},g(e.modelValue),33)],2))}}),yt=v({__name:"MonthlyOverview",props:{year:null,monthData:null},emits:["add-item","updateBudget","updateYear"],setup(e,{emit:n}){const t=e,o=w(()=>t.monthData.expneses.recurring.reduce((r,l)=>r+l.price,0)+t.monthData.expneses.nonRecurring.reduce((r,l)=>r+l.price,0)),a=w(()=>t.monthData.budget-o.value),s=w({get(){return t.monthData.budget},set(r){n("updateBudget",r)}}),i=w({get(){return t.year},set(r){n("updateYear",+r)}});return(r,l)=>(u(),d(x,null,[_(vt),_(C,{"label-txt":"Showing Year",modelValue:m(i),"onUpdate:modelValue":l[0]||(l[0]=p=>k(i)?i.value=p:null)},null,8,["modelValue"]),_(C,{"label-txt":"Total Budget",modelValue:m(s),"onUpdate:modelValue":l[1]||(l[1]=p=>k(s)?s.value=p:null)},null,8,["modelValue"]),_(pt,{onAddItem:l[2]||(l[2]=p=>r.$emit("add-item",p))}),_(A,{list:e.monthData.expneses.recurring},null,8,["list"]),_(A,{list:e.monthData.expneses.nonRecurring},null,8,["list"]),V(" left to spend: "+g(m(a)),1)],64))}}),wt={key:0},xt={key:1},bt=v({__name:"MonthlyPage",setup(e){const n=J(),t=new Date,o=M(t.getFullYear()),a=M(t.getMonth()),{monthly:s,error:i,isGettingMonthly:r}=it({year:o,searchMonth:a}),{addItem:l,isAddingItem:p}=lt(),D=R("user");H("isAddingItem",p);const N=f=>{console.log("new total",f)},L=f=>{console.log("new year",f),o.value=f},j=f=>{l({item:f,searchMonth:a.value,isRecurring:!1})};return q(()=>{D!=null&&D.value||n.push("/auth")}),(f,Mt)=>(u(),d("main",null,[m(r)?(u(),d("div",wt,"Loading...")):m(i)?(u(),d("div",xt,"Had an error: "+g(m(i)),1)):m(s)?(u(),z(yt,{key:2,year:o.value,monthData:m(s),onAddItem:j,onUpdateYear:L,onUpdateBudget:N},null,8,["year","monthData"])):B("",!0)]))}});export{bt as default};