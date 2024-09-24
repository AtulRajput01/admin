import{r as i,R as G,c as H,P as c,_ as q,b as N,d as J,j as e}from"./index-DMQZN-YT.js";import{a as T}from"./axios-B4uVmeYG.js";import{F as I,f as K,a as Q}from"./index-C1miZcRY.js";import{C as W}from"./CAlert-DrKDa5JD.js";import{C as X,a as Y}from"./CCardBody-DJt4bdLB.js";import{C as Z}from"./CCardHeader-DaPF9maz.js";import{C as z}from"./CForm-BCH59H3k.js";import{C as m}from"./CFormInput-BBxsUJtP.js";import{C as n}from"./CCol-C5GETTd3.js";import{C as ee}from"./CCardText-B_2xx9bP.js";import{C as se,a as re,b as V,c as b,d as ae,e as S}from"./CTable-CMobc8GF.js";import{C as te,a as C}from"./index.es-Dr928r4n.js";import{C as le,a as w}from"./CPaginationItem-ixz3nRJf.js";import{C as D,a as k}from"./CModalHeader-D0deP1c3.js";import{C as B}from"./CModalTitle-eDClRaYZ.js";import{C as M}from"./CModalBody-cu4JkqK7.js";import{C as R}from"./CModalFooter-C3CBLEIu.js";import"./DefaultLayout-DUEFxvKU.js";import"./cil-user-Ddrdy7PS.js";import"./cil-lock-locked-DmxpJbVL.js";var U=i.forwardRef(function(a,h){var l,j=a.children,x=a.as,u=x===void 0?"ul":x,s=a.className,f=a.flush,d=a.layout;return G.createElement(u,{className:H("list-group",(l={"list-group-flush":f},l["list-group-".concat(d)]=d,l),s),ref:h},j)});U.propTypes={as:c.elementType,children:c.node,className:c.string,flush:c.bool,layout:c.oneOf(["horizontal","horizontal-sm","horizontal-md","horizontal-lg","horizontal-xl","horizontal-xxl"])};U.displayName="CListGroup";var E=i.forwardRef(function(a,h){var l,j=a.children,x=a.active,u=a.as,s=u===void 0?"li":u,f=a.className,d=a.disabled,g=a.color,t=q(a,["children","active","as","className","disabled","color"]),y=s==="a"||s==="button"?te:s;return t=N(N(N(N({},(s==="a"||s==="button")&&{active:x,disabled:d,as:s,ref:h}),x&&{"aria-current":!0}),d&&{"aria-disabled":!0}),t),G.createElement(y,N({className:H("list-group-item",(l={},l["list-group-item-".concat(g)]=g,l["list-group-item-action"]=s==="a"||s==="button",l.active=x,l.disabled=d,l),f)},t),j)});E.propTypes={active:c.bool,as:c.elementType,children:c.node,className:c.string,color:J,disabled:c.bool};E.displayName="CListGroupItem";const Ae=()=>{const[a,h]=i.useState(!1),[l,j]=i.useState(!1),[x,u]=i.useState(!1),[s,f]=i.useState(null),[d,g]=i.useState([]),[t,y]=i.useState({name:"",email:"",contactNumber:"",password:""}),[L,A]=i.useState(null);i.useState(""),i.useEffect(()=>{F()},[]);const F=async()=>{try{const r=await T.get("http://54.71.141.115:3002/api/vendor/getUser");g(r.data.data)}catch(r){A("Error fetching users"),console.error("Error fetching users:",r)}},_=async r=>{try{await T.delete(`http://54.71.141.115:3002/api/vendor/deleteUser/${r}`),g(d.filter(o=>o._id!==r))}catch(o){A("Error deleting user"),console.error("Error deleting user:",o)}},$=async r=>{r.preventDefault();try{const o=await T.post("http://54.71.141.115:3002/api/user/vendor/register",t);j(!1),v(),F()}catch(o){A("Error adding user"),console.error("Error adding user:",o)}},O=async r=>{r.preventDefault();const{_id:o}=s;try{await T.put(`http://54.71.141.115:3002/api/vendor/user/${o}`,t),u(!1),y(),F()}catch(P){A("Error updating user"),console.error("Error updating user:",P)}},p=r=>{const{id:o,value:P}=r.target;y({...t,[o]:P})},v=()=>{y({name:"",email:"",contactNumber:"",password:""})};return e.jsxs(e.Fragment,{children:[L&&e.jsx(W,{color:"danger",children:L}),e.jsxs(X,{children:[e.jsxs(Z,{className:"d-flex justify-content-between align-items-center",children:[e.jsx("h3",{children:"Manage Users"}),e.jsx(z,{className:"d-flex align-items-center",style:{width:"12rem",marginLeft:"auto"},children:e.jsx(m,{type:"text",placeholder:"Search by Name"})}),e.jsx(n,{xs:"auto",className:"px-4"})]}),e.jsxs(Y,{children:[e.jsx(ee,{children:e.jsxs(se,{responsive:!0,striped:!0,hover:!0,bordered:!0,children:[e.jsx(re,{color:"dark",children:e.jsxs(V,{children:[e.jsx(b,{scope:"col",style:{textAlign:"center"},children:"#"}),e.jsx(b,{scope:"col",style:{textAlign:"center"},children:"Name"}),e.jsx(b,{scope:"col",style:{textAlign:"center"},children:"Email"}),e.jsx(b,{scope:"col",style:{textAlign:"center"},children:"Contact Number"}),e.jsx(b,{scope:"col",style:{textAlign:"center"},children:"Action"})]})}),e.jsx(ae,{children:d.map((r,o)=>e.jsxs(V,{children:[e.jsx(b,{scope:"row",style:{textAlign:"center"},children:o+1}),e.jsx(S,{style:{textAlign:"center"},children:r.name||"null"}),e.jsx(S,{style:{textAlign:"center"},children:r.email||"null"}),e.jsx(S,{style:{textAlign:"center"},children:r.contactNumber||"null"}),e.jsxs(S,{style:{textAlign:"center"},children:[e.jsx(C,{size:"sm",onClick:()=>{f(r),h(!0)},children:e.jsx(I,{icon:K,style:{color:"grey",cursor:"pointer",marginRight:"5px"}})}),e.jsx(C,{size:"sm",onClick:()=>_(r._id),children:e.jsx(I,{icon:Q,style:{color:"#fd2b2b"}})})]})]},r._id))})]})}),e.jsxs(le,{align:"center","aria-label":"Page navigation example",children:[e.jsx(w,{disabled:!0,"aria-label":"Previous",children:e.jsx("span",{"aria-hidden":"true",children:"«"})}),e.jsx(w,{active:!0,children:"1"}),e.jsx(w,{children:"2"}),e.jsx(w,{children:"3"}),e.jsx(w,{"aria-label":"Next",children:e.jsx("span",{"aria-hidden":"true",children:"»"})})]})]})]}),e.jsxs(D,{visible:l,onClose:()=>{j(!1),v()},children:[e.jsx(k,{closeButton:!0,children:e.jsx(B,{children:"Add User"})}),e.jsx(M,{children:e.jsxs(z,{className:"row g-3",onSubmit:$,children:[e.jsx(n,{md:6,children:e.jsx(m,{type:"text",id:"name",label:"Name",value:t.name,onChange:p})}),e.jsx(n,{md:6,children:e.jsx(m,{type:"email",id:"email",label:"Email",value:t.email,onChange:p})}),e.jsx(n,{xs:12,children:e.jsx(m,{id:"contactNumber",label:"contact Number",value:t.contactNumber,onChange:p})}),e.jsx(n,{md:6,children:e.jsx(m,{type:"password",id:"password",label:"Password",value:t.password,onChange:p})}),e.jsx(n,{xs:12,children:e.jsx(C,{color:"primary",type:"submit",children:"Submit"})})]})}),e.jsx(R,{children:e.jsx(C,{color:"secondary",onClick:()=>{j(!1),v()},children:"Close"})})]}),e.jsxs(D,{visible:x,onClose:()=>{u(!1),v()},children:[e.jsx(k,{closeButton:!0,children:e.jsx(B,{children:"Edit User"})}),e.jsx(M,{children:e.jsxs(z,{className:"row g-3",onSubmit:O,children:[e.jsx(n,{md:6,children:e.jsx(m,{type:"text",id:"name",label:"Name",value:t.name,onChange:p})}),e.jsx(n,{md:6,children:e.jsx(m,{type:"email",id:"email",label:"Email",value:t.email,onChange:p})}),e.jsx(n,{xs:12,children:e.jsx(m,{id:"contactNumber",label:"contact Number",value:t.contactNumber,onChange:p})}),e.jsx(n,{md:6,children:e.jsx(m,{type:"password",id:"password",label:"Password",value:t.password,onChange:p})}),e.jsx(n,{xs:12,children:e.jsx(C,{color:"primary",type:"submit",children:"Submit"})})]})}),e.jsx(R,{children:e.jsx(C,{color:"secondary",onClick:()=>{u(!1),v()},children:"Close"})})]}),e.jsxs(D,{visible:a,onClose:()=>h(!1),children:[e.jsx(k,{onClose:()=>h(!1),closeButton:!0,children:e.jsx(B,{children:"User Details"})}),e.jsx(M,{children:e.jsxs(U,{children:[e.jsxs(E,{children:[e.jsx("strong",{children:"Name: "})," ",s==null?void 0:s.name]}),e.jsxs(E,{children:[e.jsx("strong",{children:"Email: "})," ",s==null?void 0:s.email]}),e.jsxs(E,{children:[e.jsx("strong",{children:"Contact Number: "})," ",s==null?void 0:s.contactNumber]})]})}),e.jsx(R,{children:e.jsx(C,{color:"secondary",onClick:()=>h(!1),children:"Close"})})]})]})};export{Ae as default};
