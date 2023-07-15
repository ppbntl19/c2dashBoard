"use strict";(self["webpackChunkc2_cms_admin"]=self["webpackChunkc2_cms_admin"]||[]).push([[476],{6476:function(t,e,n){n.r(e),n.d(e,{default:function(){return f}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("div",{staticClass:"filter-container__search"}),n("div",{staticClass:"filter-container__ctrl"},[n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",plain:"",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v(" "+t._s(t.$t("table.add"))+" ")])],1)]),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,attrs:{border:"",fit:"","highlight-current-row":"",stripe:"",data:t.list,id:"tableList"}},[n("el-table-column",{attrs:{label:"Classification"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[t._v(" "+t._s(n.name)+" ")]}}])}),n("el-table-column",{attrs:{sortable:"",prop:"updatedAt",label:t.$t("table.updatedAt"),align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(t._f("formatDate")(a.updatedAt)))])]}}])}),n("el-table-column",{attrs:{label:t.$t("table.status"),"class-name":"status-col",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("el-tag",{attrs:{type:t._f("statusFilter")(a.status),size:"mini"}},[t._v(" "+t._s(a.status?"On":"Disable")+" ")])]}}])}),n("el-table-column",{attrs:{label:t.$t("table.actions"),align:"center","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.handleUpdate(a)}}},[t._v(" "+t._s(t.$t("table.edit"))+" ")]),"deleted"!=a.status?n("el-button",{attrs:{size:"mini",type:"danger",plain:""},on:{click:function(e){return t.handleDelete(a)}}},[t._v(" "+t._s(t.$t("table.delete"))+" ")]):t._e()]}}])})],1)],1)},i=[],s=(n(57658),n(21249),n(48289)),r=n(1620),l=n(42325),o={name:"PostTagList",filters:{statusFilter:function(t){return t?"success":"info"},formatDate:function(t){return(0,l.p6)(t)}},data:function(){return{tableKey:0,list:null,total:0,listLoading:!0,listQuery:{page:1,limit:10,importance:void 0,title:void 0,type:void 0,sort:"+id",keyword:""},downloadLoading:!1,selectedRows:[]}},watch:{"listQuery.keyword":function(t){t.length<=0&&this.getList()}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,(0,r.mE)().then((function(e){var n=e.totalResults,a=void 0===n?0:n,i=e.results,s=void 0===i?[]:i;t.total=a,t.list=s,t.listLoading=!1}))},handleCreate:function(){this.$router.push("".concat(s.v.routePath,"create"))},handleUpdate:function(t){console.log("config.routePath",s.v.routePath),this.$router.push({path:"".concat(s.v.routePath,"update"),query:{id:t.id}})},handleDelete:function(t){var e=this,n=[];Array.isArray(t)?n=t.map((function(t){return t.id})):n.push(t.id),this.handleClose((function(){(0,r.Od)({ids:n}).then((function(){e.$notify({title:"Success",message:"successfully deleted",type:"success",duration:2e3}),e.getList()}))}))},handleClose:function(t){this.$confirm("Confirm Deletion ?").then((function(){t()})).catch((function(){}))},onFilter:function(){this.listQuery.page=1,this.getList()}}},u=o,c=n(1001),d=(0,c.Z)(u,a,i,!1,null,null,null),f=d.exports},1620:function(t,e,n){n.d(e,{Nm:function(){return l},Od:function(){return r},Ue:function(){return o},Vx:function(){return u},mE:function(){return s}});var a=n(84471),i="/tags/";function s(t){return(0,a.Z)({url:"".concat(i),method:"get",params:t})}function r(t){return(0,a.Z)({url:"".concat(i),method:"delete",data:t})}function l(t){return(0,a.Z)({url:"".concat(i+t),method:"get"})}function o(t){return(0,a.Z)({url:"".concat(i),method:"post",data:t})}function u(t){return(0,a.Z)({url:"".concat(i+t.id),method:"put",data:t})}},48289:function(t,e,n){n.d(e,{v:function(){return a}});var a={routePath:"/post/tag/"}}}]);