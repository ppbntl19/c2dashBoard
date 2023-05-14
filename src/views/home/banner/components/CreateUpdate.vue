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

      <el-form-item label="URL" prop="url">
        <el-input v-model="formData.url"></el-input>
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
          :on-success="onUploadChange"
          :on-remove="onRemoveChange"
          :on-exceed="onUploadExceed"
          :headers="uploadHeaders"
        >
          <i slot="default" class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="About" prop="intro">
        <el-input v-model="formData.intro"></el-input>
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
import { getDetail, create, update } from '@/api/banner'
import { uploadImage } from '@/api/cloudnary'
import { baseHost } from '@/utils'
import { getToken } from '@/utils/auth'

const token = getToken()
const Authorization = `Bearer ${token}`

const routePath = '/banner/'

export default {
  name: 'BannerCreateUpdate',
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
        url: '',
        pic: '',
        intro: '',
        status: true,
        createdBy: this.$store.state.user.userInfo.id,
      },
      rules: {
        name: [
          { required: true, message: 'Please enter Title', trigger: 'blur' },
        ],
        url: [
          { required: true, message: 'Please enter url', trigger: 'blur' },
        ],
        pic: [
          {
            required: true,
            length: 1,
            message: 'Please upload a picture',
            trigger: 'change',
          },
        ],
      },

      categoryList: [],

      // Upload file
      uploadHeaders: {
        Authorization,
      },
      uploadFile: {
        list: [],
        limit: 1,
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
    onRemoveChange(file) {
      this.uploadFile.list = [];
      this.formData.pic = '';
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
      create(this.formData).then(() => {
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
      })
    },
  },
}
</script>
