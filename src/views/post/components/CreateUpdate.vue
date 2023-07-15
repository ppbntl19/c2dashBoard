<template>
  <div class="app-container" v-loading="loading">
    <el-form
      :model="formData"
      :rules="rules"
      ref="validateForm"
      label-width="140px"
    >
      <el-form-item label="Name" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>

      <el-form-item label="Route" prop="route">
        <el-input v-model="formData.route"></el-input>
      </el-form-item>

      <el-form-item label="Tag" prop="tag">
        <el-select v-model="formData.tag" placeholder="please choose">
          <el-option
            v-for="item in tagList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Post Picture" prop="pic">
        <el-upload
          action=""
          :http-request="onUploadStart"
          list-type="picture-card"
          name="upload"
          :auto-upload="true"
          :file-list="uploadFile.list"
          :limit="uploadFile.limit"
          :on-success="onUploadChange"
          :on-remove="onRemoveChange"
          :on-exceed="onUploadExceed"
          drag
          multiple
          :headers="uploadHeaders"
        >
          <i slot="default" class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="Home Recommended" prop="recommend">
        <el-switch v-model="formData.recommend"></el-switch>
        {{ formData.recommend ? 'On' : 'Disable' }}
      </el-form-item>

      <el-form-item label="Status" prop="status">
        <el-switch v-model="formData.status"></el-switch>
        {{ formData.status ? 'On' : 'Disable' }}
      </el-form-item>

      <el-form-item label="About(SEO)" prop="intro">
        <el-input v-model="formData.intro"></el-input>
      </el-form-item>

      <el-form-item label="Content" prop="content">
        <ckeditor :editor="editor" v-model="formData.content"> </ckeditor>
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
import { config } from '../config'
import { getDetail, create, update } from '@/api/post'
import { fetchList } from '@/api/tag'
import { baseApi, baseHost } from '@/utils'

import { getToken } from '@/utils/auth'

import { uploadImage } from '@/api/cloudnary'
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { MyUploadAdapter } from '@/api/uploadAdopter'

const token = getToken()
const Authorization = `Bearer ${token}`

const { routePath } = config

export default {
  name: 'PostCreateUpdate',
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
        name: '',
        route: '',
        tag: '',
        pic: '',
        recommend: true,
        intro: '',
        content: '',
        status: true,
        createdBy: this.$store.state.user.userInfo.id,
      },
      rules: {
        name: [
          { required: true, message: 'Please enter a name', trigger: 'blur' }
        ],
        route: [
          { required: true, message: 'Please enter a Description(Slug URL)', trigger: 'blur' },
          {
            min: 1,
            max: 100,
            message: '1 to 100 characters long',
            trigger: 'blur',
          },
        ],
        tag: [
          {
            required: true,
            message: 'Please select a type',
            trigger: 'change',
          },
        ],
        pic: [
          {
            required: true,
            message: 'Please upload a picture',
            trigger: 'change',
          },
        ],
        content: [
          {
            required: true,
            message: 'Please enter details',
            trigger: 'change',
          },
        ],
      },

      tagList: [],

      // Upload file
      uploadHeaders: {
        Authorization,
      },
      uploadFile: {
        list: [],
        limit: 1,
      },
      // Editor
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
    this.getTagList()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
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

    // query
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

    // Choice tag change
    onChoiceTag(value) {
      console.log('onChoiceTag', value)
    },

    // Reset Tag
    onResetTag() {
      this.formData.tag = []
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
    // on file remove
    onRemoveChange(file) {
      let res = file.response || {}
      this.uploadFile.list = [];
      this.formData.pic = '';
    },

    // On Upload Exceed
    onUploadExceed() {
      this.$message({
        message: 'Exceeded upload quantity',
        type: 'error',
      })
      console.log('onUploadExceed')
    },

    // Create
    postCreate() {
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
        if (pic) {
          pic && this.uploadFile.list.push({
            name: pic,
            url: pic,
          })
        }

        this.formData = res
      }).finally(() => {
        this.loading = false;
      })
    },

    //  Get tags
    getTagList() {
      fetchList().then((res) => {
        this.tagList = res.results || []
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
