import{r as a,j as e}from"./index-D61s1Tjt.js";import{C as b}from"./CRow-N44qJXZN.js";import{C as N}from"./CCol-B9bgIcnU.js";import{C as P,a as w}from"./CCardBody-BCTVJJ4q.js";import{C as S}from"./CCardHeader-D9bYJMT6.js";import{C as D,a as v,b as x,c as n,d as E,e as t}from"./CTable-B6fphQoh.js";import{a as j}from"./index.es-vXd0TMDy.js";import{C as T,a as V}from"./CModalHeader-CKcM1eys.js";import{C as H}from"./CModalBody--9TayEQU.js";import{C as M}from"./CModalFooter-Co--6Y0L.js";import"./DefaultLayout-CU_RidXn.js";import"./cil-lock-locked-DmxpJbVL.js";import"./tlogo1-w0QlOMSf.js";import"./cil-user-Ddrdy7PS.js";const Q=()=>{const[m,p]=a.useState([]),[C,l]=a.useState(!0),[i,u]=a.useState(null),[s,d]=a.useState(null),[f,c]=a.useState(!1);a.useEffect(()=>{(async()=>{try{const o=await fetch("http://www.taxidermyadmin.hunt30.com/api/payments");if(!o.ok)throw new Error("Network response was not ok");const y=await o.json();p(y.payments),l(!1)}catch(o){u(o.message),l(!1)}})()},[]);const g=r=>{d(r),c(!0)},h=()=>{c(!1),d(null)};return C?e.jsx("p",{children:"Loading..."}):i?e.jsxs("p",{children:["Error: ",i]}):e.jsxs(e.Fragment,{children:[e.jsx(b,{children:e.jsx(N,{children:e.jsxs(P,{children:[e.jsx(S,{children:"Payments"}),e.jsx(w,{children:e.jsxs(D,{hover:!0,responsive:!0,children:[e.jsx(v,{children:e.jsxs(x,{children:[e.jsx(n,{children:"Payment ID"}),e.jsx(n,{children:"Vendor Name"}),e.jsx(n,{children:"Shop Name"}),e.jsx(n,{children:"Amount"}),e.jsx(n,{children:"Payment Date"}),e.jsx(n,{children:"Status"}),e.jsx(n,{children:"Card Holder"}),e.jsx(n,{children:"Card Number"}),e.jsx(n,{children:"Action"})]})}),e.jsx(E,{children:m.map(r=>e.jsxs(x,{children:[e.jsx(t,{children:r.paymentId}),e.jsx(t,{children:r.vendorName}),e.jsx(t,{children:r.shopName}),e.jsxs(t,{children:["$",r.amount]}),e.jsx(t,{children:r.paymentDate}),e.jsx(t,{children:r.status}),e.jsx(t,{children:r.email}),e.jsxs(t,{children:["**** **** **** ",r.cardNumber.slice(-4)]}),e.jsx(t,{children:e.jsx(j,{color:"primary",onClick:()=>g(r),children:"View Details"})})]},r.paymentId))})]})})]})})}),e.jsxs(T,{visible:f,onClose:h,children:[e.jsx(V,{closeButton:!0,children:"Payment Details"}),e.jsx(H,{children:s&&e.jsxs(e.Fragment,{children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Payment ID:"})," ",s.paymentId]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Amount:"})," $",s.amount]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Card Holder:"})," ",s.email]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Card Number:"})," ",s.cardNumber]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Card Type:"})," ",s.cardType]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Status:"})," ",s.status]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Payment Date:"})," ",s.paymentDate]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Shop Name:"})," ",s.shopName]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Owner Name:"})," ",s.ownerName]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Contact Number:"})," ",s.contactNumber]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Subscription Plan:"})," ",s.subscriptionPlan]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Vendor Name:"})," ",s.vendorName]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Vendor Contact:"})," ",s.vendorContact]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Vendor Email:"})," ",s.vendorEmail]})]})}),e.jsx(M,{children:e.jsx(j,{color:"secondary",onClick:h,children:"Close"})})]})]})};export{Q as default};
