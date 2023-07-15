"use strict";(self["webpackChunkc2_cms_admin"]=self["webpackChunkc2_cms_admin"]||[]).push([[277],{2308:function(e,t,a){a.d(t,{Z:function(){return h}});var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"app-container"},[a("el-form",{ref:"validateForm",attrs:{model:e.formData,rules:e.rules,"label-width":"140px"}},[a("el-form-item",{attrs:{label:"Category Name",prop:"name"}},[a("el-input",{model:{value:e.formData.name,callback:function(t){e.$set(e.formData,"name",t)},expression:"formData.name"}})],1),a("el-form-item",{attrs:{label:"Routing",prop:"route"}},[a("el-input",{model:{value:e.formData.route,callback:function(t){e.$set(e.formData,"route",t)},expression:"formData.route"}})],1),a("el-form-item",{attrs:{label:"Description (SEO)",prop:"description"}},[a("el-input",{model:{value:e.formData.description,callback:function(t){e.$set(e.formData,"description",t)},expression:"formData.description"}})],1),a("el-form-item",{attrs:{label:"Category Picture",prop:"pic"}},[a("el-upload",{attrs:{action:"","http-request":e.onUploadStart,"list-type":"picture-card",name:"upload","auto-upload":!0,"file-list":e.uploadFile.list,limit:e.uploadFile.limit,"on-success":e.onUploadChange,"on-remove":e.onRemoveChange,"on-exceed":e.onUploadExceed,drag:"",multiple:"",headers:e.uploadHeaders}},[a("i",{staticClass:"el-icon-plus",attrs:{slot:"default"},slot:"default"})])],1),a("el-form-item",{attrs:{label:"Content",prop:"content"}},[a("ckeditor",{attrs:{editor:e.editor},model:{value:e.formData.content,callback:function(t){e.$set(e.formData,"content",t)},expression:"formData.content"}})],1),a("el-form-item",{attrs:{label:"Status",prop:"status"}},[a("el-switch",{model:{value:e.formData.status,callback:function(t){e.$set(e.formData,"status",t)},expression:"formData.status"}}),e._v(" "+e._s(e.formData.status?"On":"Disable")+" ")],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("validateForm")}}},[e._v("Submit")]),a("el-button",{on:{click:function(t){return e.resetForm("validateForm")}}},[e._v("Reset")])],1)],1)],1)},o=[],n=(a(7658),a(5864)),s=a(1720),i=a(1836),l=a(5334);const u=(0,i.LP)(),c=`Bearer ${u}`;var d={name:"ProductCreateUpdate",filters:{},props:{type:{type:String,default:function(){return"create"}}},data(){return{loading:!1,querys:{id:""},formData:{id:"",name:"",route:"",description:"",pic:"",content:"",status:!0,createdBy:this.$store.state.user.userInfo.id},rules:{name:[{required:!0,message:"Please enter a category",trigger:"blur"},{min:1,max:40,message:"Length between 1 and 40 characters",trigger:"blur"}],content:[{required:!0,message:"Please enter a content",trigger:"blur"}],route:[{required:!0,message:"Please enter a Route",trigger:"blur"},{min:1,max:100,message:"1 to 100 characters long",trigger:"blur"}],description:[{required:!0,message:"Please enter a Description",trigger:"blur"},{min:1,max:1e3,message:"1 to 1000 characters long",trigger:"blur"}],pic:[{required:!0,message:"Please upload a picture",trigger:"change"}]},uploadHeaders:{Authorization:c},uploadFile:{list:[],limit:1}}},watch:{},created(){this.getQuery()},methods:{submitForm(e){this.$refs[e].validate((e=>{if(!e)return!1;this.loading=!0,"update"===this.type?this.putUpdate():this.postCreate()}))},resetForm(e){this.$refs[e].resetFields()},onUploadChange(e){this.formData.pic=e.path},onUploadStart(e){(0,l.I)(e.file,"pic","pic").then((e=>{this.formData.pic=e.url}))},onRemoveChange(e){e.response;this.uploadFile.list=[],this.formData.pic=""},onUploadExceed(){this.$message({message:"Exceeded upload quantity",type:"error"}),console.log("onUploadExceed")},onChoiceCategory(e){console.log("onChoiceCategory",e),this.formData.parent=e},onResetCategory(){this.formData.parent=[]},getQuery(){const e=this.$route.query||{};this.querys=e,"update"===this.type&&this.getDetail()},defaultCategoryParent(){let e=this.formData.parent||[];return e.length>0?e:["0"]},hasCategory(){let e=this.formData.parent||[],t=this.formData.id;if(console.log(e,t),e.indexOf(t)>-1)return!0},postCreate(){(0,n.Ue)(this.formData).then((()=>{this.loading=!1,this.$message({message:"Congratulations, the operation was successful",type:"success",duration:1e3}),setTimeout((()=>{this.$router.push(`${s.v.routePath}list`)}),1e3)}))},putUpdate(){(0,n.Vx)(this.formData).then((()=>{this.loading=!1,this.$message({message:"Congratulations, the operation was successful",type:"success",duration:1e3}),setTimeout((()=>{this.$router.push(`${s.v.routePath}list`)}),1e3)}))},getDetail(){this.loading=!0,(0,n.Nm)(this.querys.id).then((e=>{this.loading=!1;const{pic:t}=e;t&&t&&this.uploadFile.list.push({name:t,url:t}),this.formData=e}))}}},p=d,m=a(1001),f=(0,m.Z)(p,r,o,!1,null,null,null),h=f.exports},7277:function(e,t,a){a.r(t),a.d(t,{default:function(){return c}});var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("create-update",{attrs:{type:e.type}})],1)},o=[],n=a(2308),s={name:"CreateAbout",components:{CreateUpdate:n.Z},data(){return{type:"create"}}},i=s,l=a(1001),u=(0,l.Z)(i,r,o,!1,null,null,null),c=u.exports},5334:function(e,t,a){a.d(t,{I:function(){return o}});var r=a(2325);const o=async(e,t,a)=>{var o=new FormData;o.append("upload_preset",r.nr),o.append("folder",a||"/content/articles"),o.append("tags",t||"browser_upload"),o.append("file",e);var n=`${r.lQ}/${r.Ke}/upload`;try{const e=await fetch(n,{method:"POST",body:o});return await e.json()}catch(s){return console.error(s)}}},5864:function(e,t,a){a.d(t,{Nm:function(){return i},Od:function(){return s},Ue:function(){return l},Vx:function(){return u},mE:function(){return n}});var r=a(4471);const o="/product-categories/";function n(e){return(0,r.Z)({url:`${o}`,method:"get",params:e})}function s(e){return(0,r.Z)({url:`${o}`,method:"delete",data:e})}function i(e){return(0,r.Z)({url:`${o+e}`,method:"get"})}function l(e){return(0,r.Z)({url:`${o}`,method:"post",data:e})}function u(e){return(0,r.Z)({url:`${o+e.id}`,method:"put",data:e})}},1720:function(e,t,a){a.d(t,{v:function(){return r}});const r={routePath:"/product/category/"}}}]);