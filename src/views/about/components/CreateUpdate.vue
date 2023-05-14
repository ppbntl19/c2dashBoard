<template>
  <div class="app-container" v-loading="loading">
    <el-form
      :model="formData"
      :rules="rules"
      ref="validateForm"
      class="fixed--form"
      label-width="140px"
    >
      <el-form-item label="Title" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>

      <el-form-item label="Category" prop="category">
        <el-select v-model="formData.category" placeholder="please choose">
          <el-option
            v-for="item in categoryList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Description" prop="introduction">
        <el-input v-model="formData.description"></el-input>
      </el-form-item>

      <el-form-item label="Route" prop="route">
        <el-input v-model="formData.route"></el-input>
      </el-form-item>
      <el-form-item label="Banner" prop="pic">
        <el-upload
          action=""
          :http-request="onUploadStart"
          list-type="picture-card"
          :auto-upload="true"
          :file-list="uploadFile.list"
          name="upload"
          drag
          :limit="uploadFile.limit"
          :on-success="onUploadChange"
          :on-remove="onRemoveChange"
          :on-exceed="onUploadExceed"
          :headers="uploadHeaders"
        >
          <i slot="default" class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="Content" prop="content">
        <ckeditor :editor="editor" v-model="formData.content" :config="editorConfig"> </ckeditor>
      </el-form-item>

      <el-form-item label="Status" prop="status">
        <el-switch v-model="formData.status"></el-switch>
        {{ formData.status ? 'On' : 'Disable' }}
      </el-form-item>
    </el-form>
    <div class="fixed--footer">
      <el-button type="primary" id="editor" @click="submitForm('validateForm')"
        >Submit</el-button
      >
      <el-button @click="resetForm('validateForm')">Reset</el-button>
    </div>
  </div>
</template>
<script>
import { getDetail, create, update } from '@/api/about'
import { baseApi, baseHost } from '@/utils'

import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { getToken } from '@/utils/auth'
import { uploadImage } from '@/api/cloudnary'
import { MyUploadAdapter } from '@/api/uploadAdopter'


const token = getToken()
const Authorization = `Bearer ${token}`

import { config } from '../config'

const { routePath } = config

export default {
  name: 'AboutCreateUpdate',
  filters: {},
  props: {
    type: {
      type: String,
      default: function () {
        return 'create'
      },
    },
  },
  data() {
    return {
      loading: false,

      // query
      querys: {
        id: '',
      },

      formData: {
        id: '',
        name: '',
        route: '',
        description: '',
        category: '',
        banner: '',
        content: '',
        status: true,
        createdBy: this.$store.state.user.userInfo.id,
      },
      rules: {
        name: [
          { required: true, message: 'Please enter Name', trigger: 'blur' }
        ],
        content: [
          { required: true, message: 'Please enter details', trigger: 'blur' },
        ],
        pic: [
          { required: false, message: 'Please enter details', trigger: 'blur' },
        ],
      },

      categoryList: [
        {
          value: 'about',
          label: 'About us',
        },
        {
          value: 'contact',
          label: 'Contact Us',
        },
      ],

      // Upload headers
      uploadHeaders: {
        Authorization,
      },
      uploadFile: {
        list: [],
        limit: 1,
      },

      // Editor
      editor: Editor,
      editorConfig: {
        htmlSupport: {
            allow: [
                {
                    name: /.*/,
                    attributes: true,
                    classes: true,
                    styles: true,
                    scripts :true
                }
            ]
        },
      extraPlugins: [ MyCustomUploadAdapterPlugin ]
      },
    }
  },
  watch: {},
  created() {
    this.getQuery()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        /* if (true) {
          console.log('formData', this.formData)
          return
        } */
        if (!valid) {
          return false
        }

        this.loading = true

        if (this.type === 'update') {
          this.putUpdate()
        } else {
          this.postCreate()
        }
      })
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    // Get query
    getQuery() {
      const querys = this.$route.query || {}
      this.querys = querys

      if (this.type === 'update') {
        if (!querys.id) {
          this.$router.push('list')
          return
        }
        this.getDetail()
      }
    },

    // On selection
    onChoiceCategory(value) {
      console.log('onChoiceCategory', value)
      this.formData.category = value
    },

    // On reset
    onResetCategory() {
      this.formData.category = []
    },

    // On Upload Change
    onUploadChange(res) {
      console.log(res)
      this.formData.pic = res.path
    },
    // On Upload Change
    onUploadStart(file) {
      uploadImage(file.file, 'banner', 'banner').then((data) => {
        this.formData.pic = data.url
      })
    },
    // On upload exceed
    onUploadExceed() {
      this.$message({
        message: 'Sorry, only one image can be uploaded',
        type: 'error',
      })
      console.log('onUploadExceed')
    },
    // on file remove
    onRemoveChange(file) {
      let res = file.response || {}
      this.uploadFile.list = [];
      this.formData.pic ='';
    },

    // Create
    postCreate() {
     //Update content
      create(this.formData).then(() => {
        this.loading = false

        this.$message({
          message: 'Congratulations, the operation was successful',
          type: 'success',
          duration: 1000,
        })

        setTimeout(() => {
          this.$router.push(`${routePath}list`)
        }, 1000)
      }).finally(() => {
        this.loading = false;
      })
    },

    // Upldate
    putUpdate() {
      update(this.formData).then(() => {
        this.loading = false

        this.$message({
          message: 'Congratulations, the operation was successful',
          type: 'success',
          duration: 1000,
        })

        setTimeout(() => {
          this.$router.push(`${routePath}list`)
        }, 1000)
      }).finally(() => {
        this.loading = false;
      })
    },

    // Get Details
    getDetail() {
      this.loading = true

      getDetail(this.querys.id).then((res) => {
        this.loading = false

        const { pic } = res
        pic && this.uploadFile.list.push({
          name: pic,
          url: pic,
        })
       
        //var elem = document.createElement('textarea');
        //elem.innerHTML = res.content;
        //var decoded = elem.value;
        //this.formData = {...res,...{content:decoded}};
        
        this.formData = res;
      }).finally(() => {
        this.loading = false;
      })
    },

  },
}


function MyCustomUploadAdapterPlugin( editor ) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        // Configure the URL to the upload script in your back-end here!
        return new MyUploadAdapter( loader, 'about', 'C2_About' );
    };
}

</script>
