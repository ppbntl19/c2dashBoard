"use strict";(self["webpackChunkc2_cms_admin"]=self["webpackChunkc2_cms_admin"]||[]).push([[159],{2576:function(t,e,a){a.d(e,{Z:function(){return y}});var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"app-container"},[a("el-form",{ref:"validateForm",attrs:{model:t.formData,rules:t.rules,"label-width":"140px"}},[a("el-form-item",{attrs:{label:"Name",prop:"name"}},[a("el-input",{model:{value:t.formData.name,callback:function(e){t.$set(t.formData,"name",e)},expression:"formData.name"}})],1),a("el-form-item",{attrs:{label:"Route",prop:"route"}},[a("el-input",{model:{value:t.formData.route,callback:function(e){t.$set(t.formData,"route",e)},expression:"formData.route"}})],1),a("el-form-item",{attrs:{label:"Tag",prop:"tag"}},[a("el-select",{attrs:{placeholder:"please choose"},model:{value:t.formData.tag,callback:function(e){t.$set(t.formData,"tag",e)},expression:"formData.tag"}},t._l(t.tagList,(function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1),a("el-form-item",{attrs:{label:"Post Picture",prop:"pic"}},[a("el-upload",{attrs:{action:"","http-request":t.onUploadStart,"list-type":"picture-card",name:"upload","auto-upload":!0,"file-list":t.uploadFile.list,limit:t.uploadFile.limit,"on-success":t.onUploadChange,"on-remove":t.onRemoveChange,"on-exceed":t.onUploadExceed,drag:"",multiple:"",headers:t.uploadHeaders}},[a("i",{staticClass:"el-icon-plus",attrs:{slot:"default"},slot:"default"})])],1),a("el-form-item",{attrs:{label:"Home Recommended",prop:"recommend"}},[a("el-switch",{model:{value:t.formData.recommend,callback:function(e){t.$set(t.formData,"recommend",e)},expression:"formData.recommend"}}),t._v(" "+t._s(t.formData.recommend?"On":"Disable")+" ")],1),a("el-form-item",{attrs:{label:"Status",prop:"status"}},[a("el-switch",{model:{value:t.formData.status,callback:function(e){t.$set(t.formData,"status",e)},expression:"formData.status"}}),t._v(" "+t._s(t.formData.status?"On":"Disable")+" ")],1),a("el-form-item",{attrs:{label:"About(SEO)",prop:"intro"}},[a("el-input",{model:{value:t.formData.intro,callback:function(e){t.$set(t.formData,"intro",e)},expression:"formData.intro"}})],1),a("el-form-item",{attrs:{label:"Content",prop:"content"}},[a("ckeditor",{attrs:{editor:t.editor},model:{value:t.formData.content,callback:function(e){t.$set(t.formData,"content",e)},expression:"formData.content"}})],1)],1),a("div",{staticClass:"fixed--footer"},[a("el-button",{attrs:{type:"primary",id:"editor"},on:{click:function(e){return t.submitForm("validateForm")}}},[t._v("Submit")]),a("el-button",{on:{click:function(e){return t.resetForm("validateForm")}}},[t._v("Reset")])],1)],1)},o=[],n=(a(7658),a(1057)),s=a(1966),i=a(1620),l=(a(2325),a(1836)),u=a(5334),d=a(2002),c=a.n(d),p=a(6480);const m=(0,l.LP)(),f=`Bearer ${m}`,{routePath:h}=n.config;var g={name:"PostCreateUpdate",components:{},filters:{},props:{type:{type:String,default:function(){return"create"}}},data(){return{loading:!1,querys:{id:""},formData:{id:"",name:"",route:"",tag:"",pic:"",recommend:!0,intro:"",content:"",status:!0,createdBy:this.$store.state.user.userInfo.id},rules:{name:[{required:!0,message:"Please enter a name",trigger:"blur"}],route:[{required:!0,message:"Please enter a Description(Slug URL)",trigger:"blur"},{min:1,max:100,message:"1 to 100 characters long",trigger:"blur"}],tag:[{required:!0,message:"Please select a type",trigger:"change"}],pic:[{required:!0,message:"Please upload a picture",trigger:"change"}],content:[{required:!0,message:"Please enter details",trigger:"change"}]},tagList:[],uploadHeaders:{Authorization:f},uploadFile:{list:[],limit:1},editor:c(),editorConfig:{htmlSupport:{allow:[{name:/.*/,attributes:!0,classes:!0,styles:!0,scripts:!0}]},extraPlugins:[b]}}},watch:{},created(){this.getQuery(),this.getTagList()},methods:{submitForm(t){this.$refs[t].validate((t=>{if(!t)return!1;this.loading=!0,"update"===this.type?this.putUpdate():this.postCreate()}))},resetForm(t){this.$refs[t].resetFields()},getQuery(){const t=this.$route.query||{};if(this.querys=t,"update"===this.type){if(!t.id)return void this.$router.push("list");this.getDetail()}},onChoiceTag(t){console.log("onChoiceTag",t)},onResetTag(){this.formData.tag=[]},onUploadChange(t){console.log(t),this.formData.pic=t.path},onUploadStart(t){(0,u.I)(t.file,"banner","banner").then((t=>{this.formData.pic=t.url}))},onRemoveChange(t){t.response;this.uploadFile.list=[],this.formData.pic=""},onUploadExceed(){this.$message({message:"Exceeded upload quantity",type:"error"}),console.log("onUploadExceed")},postCreate(){(0,s.Ue)(this.formData).then((()=>{this.loading=!1,this.$message({message:"Congratulations, the operation was successful",type:"success",duration:1e3}),setTimeout((()=>{this.$router.push(`${h}list`)}),1e3)})).finally((()=>{this.loading=!1}))},putUpdate(){(0,s.Vx)(this.formData).then((()=>{this.loading=!1,this.$message({message:"Congratulations, the operation was successful",type:"success",duration:1e3}),setTimeout((()=>{this.$router.push(`${h}list`)}),1e3)})).finally((()=>{this.loading=!1}))},getDetail(){this.loading=!0,(0,s.Nm)(this.querys.id).then((t=>{this.loading=!1;const{pic:e}=t;e&&e&&this.uploadFile.list.push({name:e,url:e}),this.formData=t})).finally((()=>{this.loading=!1}))},getTagList(){(0,i.mE)().then((t=>{this.tagList=t.results||[]})).finally((()=>{this.loading=!1}))}}};function b(t){t.plugins.get("FileRepository").createUploadAdapter=t=>new p.i(t,"home_about","C2_home_About")}var v=g,D=a(1001),$=(0,D.Z)(v,r,o,!1,null,null,null),y=$.exports},7159:function(t,e,a){a.r(e),a.d(e,{default:function(){return d}});var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("create-update",{attrs:{type:t.type}})],1)},o=[],n=a(2576),s={name:"UpdateAbout",components:{CreateUpdate:n.Z},data(){return{type:"update"}}},i=s,l=a(1001),u=(0,l.Z)(i,r,o,!1,null,null,null),d=u.exports},5334:function(t,e,a){a.d(e,{I:function(){return o}});var r=a(2325);const o=async(t,e,a)=>{var o=new FormData;o.append("upload_preset",r.nr),o.append("folder",a||"/content/articles"),o.append("tags",e||"browser_upload"),o.append("file",t);var n=`${r.lQ}/${r.Ke}/upload`;try{const t=await fetch(n,{method:"POST",body:o});return await t.json()}catch(s){return console.error(s)}}},1966:function(t,e,a){a.d(e,{Nm:function(){return i},Od:function(){return s},Ue:function(){return l},Vx:function(){return u},mE:function(){return n}});var r=a(4471);const o="/posts/";function n(t){return(0,r.Z)({url:`${o}`,method:"get",params:t})}function s(t){return(0,r.Z)({url:`${o}`,method:"delete",data:t})}function i(t){return(0,r.Z)({url:`${o+t}`,method:"get"})}function l(t){return(0,r.Z)({url:`${o}`,method:"post",data:t})}function u(t){return(0,r.Z)({url:`${o+t.id}`,method:"put",data:t})}},1620:function(t,e,a){a.d(e,{Nm:function(){return i},Od:function(){return s},Ue:function(){return l},Vx:function(){return u},mE:function(){return n}});var r=a(4471);const o="/tags/";function n(t){return(0,r.Z)({url:`${o}`,method:"get",params:t})}function s(t){return(0,r.Z)({url:`${o}`,method:"delete",data:t})}function i(t){return(0,r.Z)({url:`${o+t}`,method:"get"})}function l(t){return(0,r.Z)({url:`${o}`,method:"post",data:t})}function u(t){return(0,r.Z)({url:`${o+t.id}`,method:"put",data:t})}},6480:function(t,e,a){a.d(e,{i:function(){return o}});var r=a(2325);class o{constructor(t,e,a,r){this.loader=t,this.folder=e,this.tags=a,r&&(this.sizes=r)}upload(){return this.loader.file.then((t=>new Promise(((e,a)=>{this._initRequest(),this._initListeners(e,a,t),this._sendRequest(t)}))))}abort(){this.xhr&&this.xhr.abort()}_initRequest(){const t=this.xhr=new XMLHttpRequest;var e=`${r.lQ}/${r.Ke}/upload`;t.open("POST",e,!0),t.responseType="json"}_initListeners(t,e,a){const r=this.xhr,o=this.loader,n=`Couldn't upload file: ${a.name}.`;r.addEventListener("error",(()=>e(n))),r.addEventListener("abort",(()=>e())),r.addEventListener("load",(()=>{const a=r.response;if(!a||a.error)return e(a&&a.error?a.error.message:n);t({default:a.url})})),r.upload&&r.upload.addEventListener("progress",(t=>{t.lengthComputable&&(o.uploadTotal=t.total,o.uploaded=t.loaded)}))}_sendRequest(t){const e=new FormData;e.append("upload_preset",r.nr),e.append("folder",this.folder||"/content/articles"),e.append("tags",this.tags||"browser_upload"),e.append("file",t),e.append("upload",t),this.xhr.send(e)}}},1057:function(t,e,a){a.d(e,{config:function(){return r}});const r={routePath:"/post/"}}}]);