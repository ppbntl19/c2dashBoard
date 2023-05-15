"use strict";(self["webpackChunkc2_cms_admin"]=self["webpackChunkc2_cms_admin"]||[]).push([[475],{3028:function(t,e,a){a.d(e,{Z:function(){return h}});var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"app-container"},[a("el-form",{ref:"validateForm",attrs:{model:t.formData,rules:t.rules,"label-width":"140px"}},[a("el-form-item",{attrs:{label:"Title",prop:"name"}},[a("el-input",{model:{value:t.formData.name,callback:function(e){t.$set(t.formData,"name",e)},expression:"formData.name"}})],1),a("el-form-item",{attrs:{label:"URL",prop:"url"}},[a("el-input",{model:{value:t.formData.url,callback:function(e){t.$set(t.formData,"url",e)},expression:"formData.url"}})],1),a("el-form-item",{attrs:{label:"Picture",prop:"pic"}},[a("el-upload",{attrs:{action:"","http-request":t.onUploadStart,"list-type":"picture-card","auto-upload":!0,"file-list":t.uploadFile.list,name:"upload",drag:"",limit:t.uploadFile.limit,"on-success":t.onUploadChange,"on-remove":t.onRemoveChange,"on-exceed":t.onUploadExceed,headers:t.uploadHeaders}},[a("i",{staticClass:"el-icon-plus",attrs:{slot:"default"},slot:"default"})])],1),a("el-form-item",{attrs:{label:"About",prop:"intro"}},[a("el-input",{model:{value:t.formData.intro,callback:function(e){t.$set(t.formData,"intro",e)},expression:"formData.intro"}})],1),a("el-form-item",{attrs:{label:"Status",prop:"status"}},[a("el-switch",{model:{value:t.formData.status,callback:function(e){t.$set(t.formData,"status",e)},expression:"formData.status"}}),t._v(" "+t._s(t.formData.status?"On":"Disable")+" ")],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",id:"editor"},on:{click:function(e){return t.submitForm("validateForm")}}},[t._v("Submit")]),a("el-button",{on:{click:function(e){return t.resetForm("validateForm")}}},[t._v("Reset")])],1)],1)],1)},n=[],o=(a(7658),a(135)),s=a(5334),i=(a(2325),a(1836));const l=(0,i.LP)(),u=`Bearer ${l}`,d="/banner/";var p={name:"BannerCreateUpdate",components:{},filters:{},props:{type:{type:String,default:function(){return"create"}}},data(){return{loading:!1,querys:{id:""},formData:{id:"",name:"",url:"",pic:"",intro:"",status:!0,createdBy:this.$store.state.user.userInfo.id},rules:{name:[{required:!0,message:"Please enter Title",trigger:"blur"}],url:[{required:!0,message:"Please enter url",trigger:"blur"}],pic:[{required:!0,length:1,message:"Please upload a picture",trigger:"change"}]},categoryList:[],uploadHeaders:{Authorization:u},uploadFile:{list:[],limit:1}}},watch:{},created(){this.getQuery()},methods:{submitForm(t){this.$refs[t].validate((t=>{if(!t)return!1;this.loading=!0,"update"===this.type?this.putUpdate():this.postCreate()}))},resetForm(t){this.$refs[t].resetFields()},getQuery(){const t=this.$route.query||{};if(this.querys=t,"update"===this.type){if(!t.id)return void this.$router.push("list");this.getDetail()}},onUploadChange(t){this.formData.pic=t.path},onUploadStart(t){(0,s.I)(t.file,"banner","banner").then((t=>{this.formData.pic=t.url}))},onRemoveChange(t){this.uploadFile.list=[],this.formData.pic=""},onUploadExceed(){this.$message({message:"Sorry, only one image can be uploaded",type:"error"})},postCreate(){(0,o.Ue)(this.formData).then((()=>{this.loading=!1,this.$message({message:"Congratulations, the operation was successful",type:"success",duration:1e3}),setTimeout((()=>{this.$router.push(`/home${d}list`)}),1e3)}))},putUpdate(){(0,o.Vx)(this.formData).then((()=>{this.loading=!1,this.$message({message:"Congratulations, the operation was successful",type:"success",duration:1e3}),setTimeout((()=>{this.$router.push(`/home${d}list`)}),1e3)})).finally((()=>{this.loading=!1}))},getDetail(){this.loading=!0,(0,o.Nm)(this.querys.id).then((t=>{this.loading=!1;const{pic:e}=t;e&&this.uploadFile.list.push({name:e,url:e}),this.formData=t}))}}},c=p,m=a(1001),f=(0,m.Z)(c,r,n,!1,null,null,null),h=f.exports},9475:function(t,e,a){a.r(e),a.d(e,{default:function(){return d}});var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("create-update",{attrs:{type:t.type}})],1)},n=[],o=a(3028),s={name:"CreateAbout",components:{CreateUpdate:o.Z},data(){return{type:"create"}}},i=s,l=a(1001),u=(0,l.Z)(i,r,n,!1,null,null,null),d=u.exports},135:function(t,e,a){a.d(e,{Nm:function(){return i},Od:function(){return s},Ue:function(){return l},Vx:function(){return u},mE:function(){return o}});var r=a(4471);const n="/banner/";function o(t){return(0,r.Z)({url:`${n}`,method:"get",params:t})}function s(t){return(0,r.Z)({url:`${n}`,method:"delete",data:t})}function i(t){return(0,r.Z)({url:`${n+t}`,method:"get"})}function l(t){return(0,r.Z)({url:`${n}`,method:"post",data:t})}function u(t){return(0,r.Z)({url:`${n+t.id}`,method:"put",data:t})}},5334:function(t,e,a){a.d(e,{I:function(){return n}});var r=a(2325);const n=async(t,e,a)=>{var n=new FormData;n.append("upload_preset",r.nr),n.append("folder",a||"/content/articles"),n.append("tags",e||"browser_upload"),n.append("file",t);var o=`${r.lQ}/${r.Ke}/upload`;try{const t=await fetch(o,{method:"POST",body:n});return await t.json()}catch(s){return console.error(s)}}}}]);