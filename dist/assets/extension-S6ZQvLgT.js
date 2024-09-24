import{r as i,j as e,C as M}from"./index-D61s1Tjt.js";import{a as y}from"./axios-B4uVmeYG.js";import{F as J}from"./index.es-DIYg4jCt.js";import{c as K}from"./index-BRDdHwgV.js";import{C as Q,a as W}from"./CCardBody-BCTVJJ4q.js";import{C as X}from"./CCardHeader-D9bYJMT6.js";import{a as N}from"./index.es-vXd0TMDy.js";import{C as Y}from"./CCardText-cPGRMmoT.js";import{C as Z,a as ee,b as P,c as r,d as se,e as m}from"./CTable-B6fphQoh.js";import{C as te,a as x}from"./CPaginationItem-JYshQXZk.js";import{C as k,a as B}from"./CModalHeader-CKcM1eys.js";import{C as H}from"./CModalTitle-DFgpSJeL.js";import{C as O}from"./CModalBody--9TayEQU.js";import{C as ne}from"./CForm-BmHEjoGd.js";import{C as o}from"./CCol-B9bgIcnU.js";import{C as h}from"./CFormInput-DNacG-Xh.js";import{C as ae}from"./CFormSelect-BRwWCeng.js";import{C as ie}from"./CModalFooter-Co--6Y0L.js";import"./DefaultLayout-CU_RidXn.js";import"./cil-lock-locked-DmxpJbVL.js";import"./tlogo1-w0QlOMSf.js";import"./cil-user-Ddrdy7PS.js";const Fe=()=>{const[b,S]=i.useState(!1),[A,v]=i.useState([]),[_,g]=i.useState(!1),[j,u]=i.useState(!1),[c,z]=i.useState(null),[I,R]=i.useState(null),[d,E]=i.useState({name:"",image:"",price:""}),[V,$]=i.useState([]),[n,w]=i.useState({extensionName:"",extensionDescription:"",extensionImage:null,price:"",species:"",role:"admin",shopId:""}),[re,C]=i.useState(null);i.useEffect(()=>{F()},[]);const F=async()=>{try{const s=await y.get("http://www.taxidermyadmin.hunt30.com/api/Extension/getAll");v(s.data.data)}catch(s){C(s.response?s.response.data.message:"An error occurred while fetching extensions.")}};i.useEffect(()=>{b&&(async()=>{try{const t=await y.get("http://www.taxidermyadmin.hunt30.com/api/species/getSpeciesCategories/");$(t.data.data)}catch(t){C(t.response?t.response.data.message:"An error occurred while fetching species.")}})()},[b]);const l=s=>{const{id:t,value:a,files:p}=s.target;w({...n,[t]:t==="extensionImage"?p[0]:a})},q=async s=>{s.preventDefault(),u(!0);const t=new FormData;t.append("extensionName",n.extensionName),t.append("extensionDescription",n.description),t.append("extensionImage",n.extensionImage),t.append("price",n.price),t.append("specie",n.species),t.append("role",n.role),n.role==="vendor"&&t.append("shopId",n.shopId);try{const a=await y.post("http://www.taxidermyadmin.hunt30.com/api/extension/addExtension",t,{headers:{"Content-Type":"multipart/form-data"}});v([...A,a.data]),S(!1),T()}catch(a){C(a.response?a.response.data.message:"An error occurred while adding the extension.")}finally{u(!1)}},L=s=>{z(s),E({name:s.extensionName,image:s.extensionImage,price:s.price}),g(!0)},D=s=>{const{name:t,value:a}=s.target;E(p=>({...p,[t]:a}))},U=s=>{const t=s.target.files[0];R(t)},G=async()=>{u(!0);const s=`http://www.taxidermyadmin.hunt30.com/api/Extension/editeExten/${c._id}`,t=new FormData;t.append("extensionName",d.name),t.append("price",d.price),I&&t.append("extensionImage",I);try{(await y.put(s,t,{headers:{"Content-Type":"multipart/form-data"}})).status===200&&(v(p=>p.map(f=>f._id===c._id?{...f,...d,image:I||f.image}:f)),await F(),g(!1))}catch(a){C(a.response?a.response.data.message:"An error occurred while updating the extension.")}finally{u(!1)}},T=()=>{w({extensionName:"",extensionDescription:"",extensionImage:null,price:"",species:"",role:"admin",shopId:""})};return e.jsxs(e.Fragment,{children:[e.jsxs(Q,{children:[e.jsxs(X,{className:"d-flex justify-content-between align-items-center",children:[e.jsx("h3",{children:"Manage Extensions"}),e.jsx(N,{color:"primary",onClick:()=>S(!0),children:"Add Extension"})]}),e.jsxs(W,{children:[e.jsx(Y,{children:e.jsxs(Z,{responsive:!0,striped:!0,hover:!0,bordered:!0,children:[e.jsx(ee,{color:"dark",children:e.jsxs(P,{children:[e.jsx(r,{scope:"col",style:{textAlign:"center"},children:"S.No"}),e.jsx(r,{scope:"col",style:{textAlign:"center"},children:"Species"}),e.jsx(r,{scope:"col",style:{textAlign:"center"},children:"Name"}),e.jsx(r,{scope:"col",style:{textAlign:"center"},children:"Price"}),e.jsx(r,{scope:"col",style:{textAlign:"center"},children:"Image"}),e.jsx(r,{scope:"col",style:{textAlign:"center"},children:"Action"})]})}),e.jsx(se,{children:A.map((s,t)=>e.jsxs(P,{children:[e.jsx(r,{scope:"row",style:{textAlign:"center"},children:t+1}),e.jsx(m,{style:{textAlign:"center"},children:s.specie||"null"}),e.jsx(m,{style:{textAlign:"center"},children:s.extensionName||"null"}),e.jsx(m,{style:{textAlign:"center"},children:s.price||"null"}),e.jsx(m,{style:{textAlign:"center"},children:s.image&&e.jsx("img",{src:`http://www.taxidermyadmin.hunt30.com/${s.image}`,alt:s.extensionName,style:{width:"50px",height:"50px",objectFit:"cover"}})}),e.jsx(m,{style:{textAlign:"center"},children:e.jsx("button",{style:{backgroundColor:"transparent",border:"none",cursor:"pointer"},onClick:()=>L(s),children:e.jsx(J,{icon:K,style:{fontSize:"15px",marginRight:"10px"}})})})]},s._id))})]})}),e.jsxs(te,{align:"center","aria-label":"Page navigation example",children:[e.jsx(x,{disabled:!0,"aria-label":"Previous",children:e.jsx("span",{"aria-hidden":"true",children:"«"})}),e.jsx(x,{active:!0,children:"1"}),e.jsx(x,{children:"2"}),e.jsx(x,{children:"3"}),e.jsx(x,{"aria-label":"Next",children:e.jsx("span",{"aria-hidden":"true",children:"»"})})]})]})]}),e.jsxs(k,{visible:b,onClose:()=>{S(!1),T()},children:[e.jsx(B,{closeButton:!0,children:e.jsx(H,{children:"Add Extension"})}),e.jsx(O,{children:e.jsxs(ne,{className:"row g-3",onSubmit:q,children:[e.jsx(o,{md:6,children:e.jsx(h,{type:"text",id:"extensionName",label:"Name",value:n.extensionName,onChange:l})}),e.jsx(o,{md:6,children:e.jsx(h,{type:"number",id:"price",label:"Price",value:n.price,onChange:l})}),e.jsx(o,{md:6,children:e.jsxs(ae,{id:"species",label:"Species",value:n.species,onChange:l,required:!0,children:[e.jsx("option",{value:"",children:"Select species"}),V.map(s=>e.jsx("option",{value:s.name,children:s.name},s.id))]})}),e.jsx(o,{md:6,children:e.jsx(h,{type:"text",id:"description",label:"Description",value:n.description,onChange:l})}),e.jsx(o,{md:6,children:e.jsx(h,{type:"file",id:"extensionImage",label:"Image",onChange:l})}),n.role==="vendor"&&e.jsx(o,{md:6,children:e.jsx(h,{type:"text",id:"shopId",label:"Shop ID",value:n.shopId,onChange:l})}),e.jsx(o,{xs:12,children:e.jsxs(N,{type:"submit",color:"primary",className:"px-4",disabled:j,children:[j?e.jsx(M,{size:"sm"}):"Submit"," "]})})]})})]}),e.jsxs(k,{visible:_,onClose:()=>g(!1),children:[e.jsx(B,{onClose:()=>g(!1),children:e.jsx(H,{children:"Edit Item"})}),e.jsxs(O,{children:[!(c!=null&&c.speciesName)&&e.jsxs("div",{children:[e.jsx("label",{children:"Name:"}),e.jsx("input",{type:"text",name:"name",value:d.name,onChange:D,className:"form-control"})]}),e.jsxs("div",{children:[e.jsx("label",{children:"Image:"}),e.jsx("input",{type:"file",name:"image",onChange:U,className:"form-control"})]}),e.jsxs("div",{children:[e.jsx("label",{children:"Price:"}),e.jsx("input",{type:"text",name:"price",value:d.price,onChange:D,className:"form-control"})]})]}),e.jsx(ie,{children:e.jsxs(N,{onClick:G,color:"primary",className:"px-4",disabled:j,children:[j?e.jsx(M,{size:"sm"}):"Save Changes"," "]})})]})]})};export{Fe as default};
