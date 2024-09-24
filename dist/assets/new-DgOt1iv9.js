import{r as t,j as e}from"./index-DMQZN-YT.js";import{a as N}from"./axios-B4uVmeYG.js";import{F as y,f as J,c as U,a as _}from"./index-C1miZcRY.js";import{C as $,a as q}from"./CCardBody-DJt4bdLB.js";import{C as z}from"./CCardHeader-DaPF9maz.js";import{a as K,b as Q,d as W,e as C}from"./DefaultLayout-DUEFxvKU.js";import{C as X}from"./CCardText-B_2xx9bP.js";import{C as Y,a as Z,b,c as d,d as ee,e as n}from"./CTable-CMobc8GF.js";import{a as o}from"./index.es-Dr928r4n.js";import{C as se,a as h}from"./CPaginationItem-ixz3nRJf.js";import{C as g,a as S}from"./CModalHeader-D0deP1c3.js";import{C as I}from"./CModalTitle-eDClRaYZ.js";import{C as w}from"./CModalBody-cu4JkqK7.js";import{C as re}from"./CForm-BCH59H3k.js";import{C as ae}from"./CRow-WkUoOd6G.js";import{C as a}from"./CCol-C5GETTd3.js";import{a as l,C as i}from"./CFormInput-BBxsUJtP.js";import{C as le}from"./CFormSelect-_km6Euae.js";import{C as P}from"./CModalFooter-C3CBLEIu.js";import"./cil-user-Ddrdy7PS.js";import"./cil-lock-locked-DmxpJbVL.js";const Ne=()=>{const[O,E]=t.useState([]),[A,v]=t.useState(!0),[r,u]=t.useState(null),[x,D]=t.useState(""),[L,c]=t.useState(!1),[k,j]=t.useState(!1),[T,F]=t.useState("ALL"),M=async()=>{try{const s=await N.get("http://54.71.141.115:3002/api/OrderDetails/");E(s.data),v(!1)}catch(s){console.error("Error fetching order details:",s),v(!1)}};t.useEffect(()=>{M()},[]);const R=s=>{u(s),D(s.status),c(!0)},V=s=>{u(s),j(!0)},B=s=>{D(s.target.value)},G=async()=>{try{const s=await N.put(`http://54.71.141.115:3002/api/OrderDetails/${r._id}`,{status:x});u({...r,status:x}),E(p=>p.map(f=>f._id===r._id?{...f,status:x}:f)),c(!1)}catch(s){console.error("Error updating status:",s)}},m=s=>{F(s)},H=T==="ALL"?O:O.filter(s=>s.status===T);return e.jsxs($,{children:[e.jsxs(z,{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("h4",{children:"Order Details"}),e.jsxs(K,{className:"float-right",children:[e.jsx(Q,{color:"secondary",children:"Filter Orders"}),e.jsxs(W,{children:[e.jsx(C,{onClick:()=>m("ALL"),children:"ALL"}),e.jsx(C,{onClick:()=>m("ACCEPT"),children:"ACCEPT"}),e.jsx(C,{onClick:()=>m("REJECT"),children:"REJECT"}),e.jsx(C,{onClick:()=>m("PENDING"),children:"PENDING"})]})]})]}),e.jsxs(q,{children:[e.jsx(X,{children:e.jsxs(Y,{hover:!0,bordered:!0,striped:!0,responsive:!0,children:[e.jsx(Z,{color:"dark",children:e.jsxs(b,{children:[e.jsx(d,{children:"Order ID"}),e.jsx(d,{children:"Items"}),e.jsx(d,{children:"Date and Time"}),e.jsx(d,{children:"Price"}),e.jsx(d,{children:"Special Note"}),e.jsx(d,{children:"Status"}),e.jsx(d,{children:"Actions"})]})}),e.jsx(ee,{children:A?e.jsx(b,{children:e.jsx(n,{colSpan:"7",children:"Loading..."})}):H.map((s,p)=>e.jsxs(b,{children:[e.jsx(n,{children:s.orderId}),e.jsx(n,{children:s.items}),e.jsx(n,{children:s.dateTime}),e.jsx(n,{children:s.price}),e.jsx(n,{children:s.specialNote}),e.jsx(n,{children:s.status}),e.jsxs(n,{children:[e.jsx(o,{onClick:()=>R(s),children:e.jsx(y,{icon:J,style:{color:"#975c26"}})}),e.jsx(o,{onClick:()=>V(s),children:e.jsx(y,{icon:U,style:{color:"#1d979f"}})}),e.jsx(o,{children:e.jsx(y,{icon:_,style:{color:"#b71f1f"}})})]})]},p))})]})}),e.jsxs(se,{align:"center","aria-label":"Page navigation example",children:[e.jsx(h,{disabled:!0,"aria-label":"Previous",children:e.jsx("span",{"aria-hidden":"true",children:"«"})}),e.jsx(h,{active:!0,children:"1"}),e.jsx(h,{children:"2"}),e.jsx(h,{children:"3"}),e.jsx(h,{"aria-label":"Next",children:e.jsx("span",{"aria-hidden":"true",children:"»"})})]})]}),r&&e.jsxs(g,{visible:L,onClose:()=>c(!1),children:[e.jsx(S,{onClose:()=>c(!1),children:e.jsx(I,{children:"View Order"})}),e.jsx(w,{children:e.jsx(re,{children:e.jsxs(ae,{children:[e.jsxs(a,{md:6,children:[e.jsx(l,{children:"Order ID"}),e.jsx(i,{value:r.orderId,readOnly:!0})]}),e.jsxs(a,{md:6,children:[e.jsx(l,{children:"Items"}),e.jsx(i,{value:r.items,readOnly:!0})]}),e.jsxs(a,{md:6,children:[e.jsx(l,{children:"Date and Time"}),e.jsx(i,{value:r.dateTime,readOnly:!0})]}),e.jsxs(a,{md:6,children:[e.jsx(l,{children:"Price"}),e.jsx(i,{value:r.price,readOnly:!0})]}),e.jsxs(a,{md:6,children:[e.jsx(l,{children:"Special Note"}),e.jsx(i,{value:r.specialNote,readOnly:!0})]}),e.jsxs(a,{md:6,children:[e.jsx(l,{children:"Additional Items"}),e.jsx(i,{value:r.additionalItems,readOnly:!0})]}),e.jsxs(a,{md:6,children:[e.jsx(l,{children:"Status"}),e.jsxs(le,{value:x,onChange:B,children:[e.jsx("option",{value:"ACCEPT",children:"ACCEPT"}),e.jsx("option",{value:"REJECT",children:"REJECT"}),e.jsx("option",{value:"PENDING",children:"PENDING"})]})]}),e.jsx(a,{md:12,children:e.jsx("h5",{children:"User Details"})}),e.jsxs(a,{md:6,children:[e.jsx(l,{children:"User Name"}),e.jsx(i,{value:r.userName,readOnly:!0})]}),e.jsxs(a,{md:6,children:[e.jsx(l,{children:"Mobile Number"}),e.jsx(i,{value:r.mobileNumber,readOnly:!0})]}),e.jsxs(a,{md:6,children:[e.jsx(l,{children:"Email"}),e.jsx(i,{value:r.email,readOnly:!0})]}),e.jsxs(a,{md:6,children:[e.jsx(l,{children:"Address"}),e.jsx(i,{value:r.address,readOnly:!0})]})]})})}),e.jsxs(P,{children:[e.jsx(o,{color:"primary",onClick:G,children:"Update"}),e.jsx(o,{color:"secondary",onClick:()=>c(!1),children:"Close"})]})]}),r&&e.jsxs(g,{visible:k,onClose:()=>j(!1),children:[e.jsx(S,{onClose:()=>j(!1),children:e.jsx(I,{children:"Chat"})}),e.jsx(w,{}),e.jsx(P,{children:e.jsx(o,{color:"secondary",onClick:()=>j(!1),children:"Close"})})]})]})};export{Ne as default};
