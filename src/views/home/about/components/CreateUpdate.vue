<template>
  <div class="app-container" v-loading="loading">
    <el-form
      :model="formData"
      :rules="rules"
      ref="validateForm"
      label-width="140px"
    >
      <el-form-item label="Title" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>

      <el-form-item label="Picture" prop="pic">
        <el-upload
          action=""
          :http-request="onUploadStart"
          list-type="picture-card"
          :auto-upload="true"
          :file-list="uploadFile.list"
          name="upload"
          drag
          :limit="uploadFile.limit"
          :on-remove="onRemoveChange"
          :on-success="onUploadChange"
          :on-exceed="onUploadExceed"
        >
          <i slot="default" class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="About" prop="intro">
        <ckeditor :editor="editor" v-model="formData.intro" :config="editorConfig"> </ckeditor>
      </el-form-item>

      <el-form-item label="Status" prop="status">
        <el-switch v-model="formData.status"></el-switch>
        {{ formData.status ? 'On' : 'Disable' }}
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          id="editor"
          @click="submitForm('validateForm')"
          >Submit</el-button
        >
        <el-button @click="resetForm('validateForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getDetail, create, update } from '@/api/home-about'
import { baseHost } from '@/utils'
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { MyUploadAdapter } from '@/api/uploadAdopter'
import { uploadImage } from '@/api/cloudnary'

const routePath = '/about/'

export default {
  name: 'HomeAboutCreateUpdate',
  components: {},
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

      // Query
      querys: {
        id: '',
      },

      formData: {
        id: '',
        pic: '',
        intro: '',
        status: true,
        createdBy: this.$store.state.user.userInfo.id,
      },
      rules: {
        name: [
          { required: true, message: 'Please enter Title', trigger: 'blur' },
        ]
      },

      // Upload file
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
              scripts: true,
            },
          ],
        },
        extraPlugins: [MyCustomUploadAdapterPlugin],
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

    // Query
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

    // On Upload Change
    onUploadChange(res) {
      this.formData.pic = res.path
    },
    // On Upload Change
    onUploadStart(file) {
      uploadImage(file.file, 'banner', 'banner').then((data) => {
        this.formData.pic = data.url
      })
    },
    // on file remove
    onRemoveChange(res) {
      this.uploadFile.list = [];
      this.formData.pic ='';
    },

    // On Upload Exceed
    onUploadExceed() {
      this.$message({
        message: 'Sorry, only one image can be uploaded',
        type: 'error',
      })
    },

    // Create
    postCreate() {
      create(this.formData).then((res) => {
        this.loading = false

        this.$message({
          message: 'Congratulations, the operation was successful',
          type: 'success',
          duration: 1000,
        })

        setTimeout(() => {
          this.$router.push(`/home${routePath}list`)
        }, 1000)
      })
    },

    // Update
    putUpdate() {
      update(this.formData).then(() => {
        this.loading = false

        this.$message({
          message: 'Congratulations, the operation was successful',
          type: 'success',
          duration: 1000,
        })

        setTimeout(() => {
          this.$router.push(`/home${routePath}list`)
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

        this.formData = res
      }).finally(() => {
        this.loading = false;
      })
    },
  },
}

function MyCustomUploadAdapterPlugin( editor ) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        // Configure the URL to the upload script in your back-end here!
        return new MyUploadAdapter( loader, 'home_about', 'C2_home_About' );
    };
}
</script>
