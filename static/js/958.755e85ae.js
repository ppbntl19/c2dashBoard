"use strict";(self["webpackChunkc2_cms_admin"]=self["webpackChunkc2_cms_admin"]||[]).push([[958],{7137:function(t,e,a){a.d(e,{Z:function(){return D}});var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"app-container"},[a("el-form",{ref:"validateForm",staticClass:"fixed--form",attrs:{model:t.formData,rules:t.rules,"label-width":"140px"}},[a("el-form-item",{attrs:{label:"Title",prop:"name"}},[a("el-input",{model:{value:t.formData.name,callback:function(e){t.$set(t.formData,"name",e)},expression:"formData.name"}})],1),a("el-form-item",{attrs:{label:"Category",prop:"category"}},[a("el-select",{attrs:{placeholder:"please choose"},model:{value:t.formData.category,callback:function(e){t.$set(t.formData,"category",e)},expression:"formData.category"}},t._l(t.categoryList,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),a("el-form-item",{attrs:{label:"Description",prop:"introduction"}},[a("el-input",{model:{value:t.formData.description,callback:function(e){t.$set(t.formData,"description",e)},expression:"formData.description"}})],1),a("el-form-item",{attrs:{label:"Route",prop:"route"}},[a("el-input",{model:{value:t.formData.route,callback:function(e){t.$set(t.formData,"route",e)},expression:"formData.route"}})],1),a("el-form-item",{attrs:{label:"Banner",prop:"pic"}},[a("el-upload",{attrs:{action:"","http-request":t.onUploadStart,"list-type":"picture-card","auto-upload":!0,"file-list":t.uploadFile.list,name:"upload",drag:"",limit:t.uploadFile.limit,"on-success":t.onUploadChange,"on-remove":t.onRemoveChange,"on-exceed":t.onUploadExceed,headers:t.uploadHeaders}},[a("i",{staticClass:"el-icon-plus",attrs:{slot:"default"},slot:"default"})])],1),a("el-form-item",{attrs:{label:"Content",prop:"content"}},[a("ckeditor",{attrs:{editor:t.editor,config:t.editorConfig},model:{value:t.formData.content,callback:function(e){t.$set(t.formData,"content",e)},expression:"formData.content"}})],1),a("el-form-item",{attrs:{label:"Status",prop:"status"}},[a("el-switch",{model:{value:t.formData.status,callback:function(e){t.$set(t.formData,"status",e)},expression:"formData.status"}}),t._v(" "+t._s(t.formData.status?"On":"Disable")+" ")],1)],1),a("div",{staticClass:"fixed--footer"},[a("el-button",{attrs:{type:"primary",id:"editor"},on:{click:function(e){return t.submitForm("validateForm")}}},[t._v("Submit")]),a("el-button",{on:{click:function(e){return t.resetForm("validateForm")}}},[t._v("Reset")])],1)],1)},o=[],s=(a(7658),a(366)),n=(a(2325),a(2002)),i=a.n(n),l=a(1836),u=a(5334),d=a(6480),c=a(4069);const p=(0,l.LP)(),m=`Bearer ${p}`,{routePath:f}=c.config;var h={name:"AboutCreateUpdate",filters:{},props:{type:{type:String,default:function(){return"create"}}},data(){return{loading:!1,querys:{id:""},formData:{id:"",name:"",route:"",description:"",category:"",banner:"",content:"",status:!0,createdBy:this.$store.state.user.userInfo.id},rules:{name:[{required:!0,message:"Please enter Name",trigger:"blur"}],content:[{required:!0,message:"Please enter details",trigger:"blur"}],pic:[{required:!1,message:"Please enter details",trigger:"blur"}]},categoryList:[{value:"about",label:"About us"},{value:"contact",label:"Contact Us"}],uploadHeaders:{Authorization:m},uploadFile:{list:[],limit:1},editor:i(),editorConfig:{htmlSupport:{allow:[{name:/.*/,attributes:!0,classes:!0,styles:!0,scripts:!0}]},extraPlugins:[g]}}},watch:{},created(){this.getQuery()},methods:{submitForm(t){this.$refs[t].validate((t=>{if(!t)return!1;this.loading=!0,"update"===this.type?this.putUpdate():this.postCreate()}))},resetForm(t){this.$refs[t].resetFields()},getQuery(){const t=this.$route.query||{};if(this.querys=t,"update"===this.type){if(!t.id)return void this.$router.push("list");this.getDetail()}},onChoiceCategory(t){console.log("onChoiceCategory",t),this.formData.category=t},onResetCategory(){this.formData.category=[]},onUploadChange(t){console.log(t),this.formData.pic=t.path},onUploadStart(t){(0,u.I)(t.file,"banner","banner").then((t=>{this.formData.pic=t.url}))},onUploadExceed(){this.$message({message:"Sorry, only one image can be uploaded",type:"error"}),console.log("onUploadExceed")},onRemoveChange(t){t.response;this.uploadFile.list=[],this.formData.pic=""},postCreate(){(0,s.Ue)(this.formData).then((()=>{this.loading=!1,this.$message({message:"Congratulations, the operation was successful",type:"success",duration:1e3}),setTimeout((()=>{this.$router.push(`${f}list`)}),1e3)})).finally((()=>{this.loading=!1}))},putUpdate(){(0,s.Vx)(this.formData).then((()=>{this.loading=!1,this.$message({message:"Congratulations, the operation was successful",type:"success",duration:1e3}),setTimeout((()=>{this.$router.push(`${f}list`)}),1e3)})).finally((()=>{this.loading=!1}))},getDetail(){this.loading=!0,(0,s.Nm)(this.querys.id).then((t=>{this.loading=!1;const{pic:e}=t;e&&this.uploadFile.list.push({name:e,url:e}),this.formData=t})).finally((()=>{this.loading=!1}))}}};function g(t){t.plugins.get("FileRepository").createUploadAdapter=t=>new d.i(t,"about","C2_About")}var b=h,y=a(1001),v=(0,y.Z)(b,r,o,!1,null,null,null),D=v.exports},4958:function(t,e,a){a.r(e),a.d(e,{default:function(){return d}});var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("create-update",{attrs:{type:t.type}})],1)},o=[],s=a(7137),n={name:"CreateAbout",components:{CreateUpdate:s.Z},data(){return{type:"create"}}},i=n,l=a(1001),u=(0,l.Z)(i,r,o,!1,null,null,null),d=u.exports},366:function(t,e,a){a.d(e,{Nm:function(){return i},Od:function(){return n},Ue:function(){return l},Vx:function(){return u},mE:function(){return s}});var r=a(4471);const o="/about/";function s(t){return(0,r.Z)({url:`${o}`,method:"get",params:t})}function n(t){return(0,r.Z)({url:`${o}`,method:"delete",data:t})}function i(t){return(0,r.Z)({url:`${o+t}`,method:"get"})}function l(t){return(0,r.Z)({url:`${o}`,method:"post",data:t})}function u(t){return(0,r.Z)({url:`${o+t.id}`,method:"put",data:t})}},5334:function(t,e,a){a.d(e,{I:function(){return o}});var r=a(2325);const o=async(t,e,a)=>{var o=new FormData;o.append("upload_preset",r.nr),o.append("folder",a||"/content/articles"),o.append("tags",e||"browser_upload"),o.append("file",t);var s=`${r.lQ}/${r.Ke}/upload`;try{const t=await fetch(s,{method:"POST",body:o});return await t.json()}catch(n){return console.error(n)}}},6480:function(t,e,a){a.d(e,{i:function(){return o}});var r=a(2325);class o{constructor(t,e,a,r){this.loader=t,this.folder=e,this.tags=a,r&&(this.sizes=r)}upload(){return this.loader.file.then((t=>new Promise(((e,a)=>{this._initRequest(),this._initListeners(e,a,t),this._sendRequest(t)}))))}abort(){this.xhr&&this.xhr.abort()}_initRequest(){const t=this.xhr=new XMLHttpRequest;var e=`${r.lQ}/${r.Ke}/upload`;t.open("POST",e,!0),t.responseType="json"}_initListeners(t,e,a){const r=this.xhr,o=this.loader,s=`Couldn't upload file: ${a.name}.`;r.addEventListener("error",(()=>e(s))),r.addEventListener("abort",(()=>e())),r.addEventListener("load",(()=>{const a=r.response;if(!a||a.error)return e(a&&a.error?a.error.message:s);t({default:a.url})})),r.upload&&r.upload.addEventListener("progress",(t=>{t.lengthComputable&&(o.uploadTotal=t.total,o.uploaded=t.loaded)}))}_sendRequest(t){const e=new FormData;e.append("upload_preset",r.nr),e.append("folder",this.folder||"/content/articles"),e.append("tags",this.tags||"browser_upload"),e.append("file",t),e.append("upload",t),this.xhr.send(e)}}},4069:function(t,e,a){a.d(e,{config:function(){return r}});const r={routePath:"/about/"}}}]);