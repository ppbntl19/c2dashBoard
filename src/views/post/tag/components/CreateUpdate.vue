<template>
  <div class="app-container" v-loading="loading">
    <el-form
      :model="formData"
      :rules="rules"
      ref="validateForm"
      label-width="140px"
    >
      </el-form-item>
      <el-form-item label="Tag Name" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>

      <el-form-item label="Routing" prop="route">
        <el-input v-model="formData.route"></el-input>
      </el-form-item>

       <el-form-item label="Description (SEO)" prop="description">
        <el-input v-model="formData.description"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="submitForm('validateForm')"
          >Submit</el-button
        >
        <el-button @click="resetForm('validateForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getDetail, create, update } from '@/api/tag'
import { config } from '../config'
import { getToken } from '@/utils/auth'

import { uploadImage } from '@/api/cloudnary'

const token = getToken()
const Authorization = `Bearer ${token}`


export default {
  name: 'PostCreateUpdate',
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
        description: '',
        createdBy: this.$store.state.user.userInfo.id
      },
      rules: {
        name: [
          { required: true, message: 'Please enter a tag', trigger: 'blur' },
          {
            min: 1,
            max: 40,
            message: 'Length between 1 and 40 characters',
            trigger: 'blur',
          },
        ],
        route: [
          { required: true, message: 'Please enter a Route', trigger: 'blur' },
          {
            min: 1,
            max: 100,
            message: '1 to 100 characters long',
            trigger: 'blur',
          },
        ],
        description: [
          { required: false, message: 'Please enter a Description', trigger: 'blur' },
          {
            min: 1,
            max: 1000,
            message: '1 to 1000 characters long',
            trigger: 'blur',
          },
        ]
      }
    }
  },
  watch: {},
  created() {
    this.getQuery()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
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
    // On Upload Change
    onUploadChange(res) {
      this.formData.pic = res.path
    },


    // Choice tag change
    onChoiceTag(value) {
      console.log('onChoiceTag', value)
      this.formData.parent = value
    },

    // Reset Tag
    onResetTag() {
      this.formData.parent = []
    },

    // query
    getQuery() {
      const querys = this.$route.query || {}
      this.querys = querys

      if (this.type === 'update') {
        this.getDetail()
      }
    },

    // Default Tag
    defaultTagParent() {
      let parent = this.formData.parent || []
      return parent.length > 0 ? parent : ['0']
    },

    // Has Tag
    hasTag() {
      let parent = this.formData.parent || []
      let id = this.formData.id
      console.log(parent, id)
      if (parent.indexOf(id) > -1) {
        return true
      }
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
          this.$router.push(`${config.routePath}list`)
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
          this.$router.push(`${config.routePath}list`)
        }, 1000)
      })
    },

    // Get Details
    getDetail() {
      this.loading = true

      getDetail(this.querys.id).then(res => {
        this.loading = false
        this.formData = res
      })
    },
  },
}
</script>
