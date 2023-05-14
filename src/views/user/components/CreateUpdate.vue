<template>
  <div class="app-container" v-loading="loading">
    <el-form
      :model="formData"
      :rules="rules"
      ref="validateForm"
      label-width="100px"
    >
      <el-form-item label="Name" prop="name">
        <el-input type="email" v-model="formData.name"></el-input>
      </el-form-item>

      <el-form-item label="Email" prop="email">
        <el-input
          v-model="formData.email"
          type="email"
          :disabled="type === 'update'"
        ></el-input>
      </el-form-item>

      <el-form-item label="Username" prop="username">
        <el-input
          v-model="formData.username"
          :disabled="type === 'update'"
        ></el-input>
      </el-form-item>

      <el-form-item label="Password" prop="password" v-if="type !== 'update'">
        <el-input v-model="formData.password" type="password"></el-input>
      </el-form-item>

      <el-form-item label="Status" prop="status">
        <el-switch v-model="formData.status"></el-switch>
        {{ formData.status ? 'On' : 'Disable' }}
      </el-form-item>

      <el-form-item label="About" prop="intro">
        <el-input type="textarea" v-model="formData.intro"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('validateForm')"
          >Submit</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { config } from '../config'
import { getDetail, create, update } from '@/api/users'

const { routePath } = config

export default {
  name: 'CreateUpdate',
  filters: {},
  props: {
    type: {
      type: String,
    },
  },
  data() {
    return {
      loading: false,

      // query parameter
      querys: {
        id: '',
      },

      formData: {
        id: '',
        username: '',
        email: '',
        name: '',
        password: '',
        role: 'user',
        status: true,
        avatar: '',
        intro: '',
      },
      rules: {
        email: [
          { required: true, message: 'Please enter Email', trigger: 'blur' },
          {
            min: 3,
            max: 100,
            message: '3 to 20 characters long',
            trigger: 'blur',
          },
        ],
        username: [
          { required: true, message: 'Please enter Username', trigger: 'blur' },
          {
            min: 3,
            max: 100,
            message: '3 to 20 characters long',
            trigger: 'blur',
          },
        ],
        name: [
          { required: true, message: 'Please enter name', trigger: 'blur' },
          {
            min: 3,
            max: 100,
            message: '3 to 20 characters long',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'Please enter Password',
            trigger: 'blur',
          },
          {
            min: 8,
            max: 20,
            message: '8 to 20 characters long',
            trigger: 'blur',
          },
        ],
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

    onChange(e) {
      console.log(e)
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    // get query parameter
    getQuery() {
      const querys = this.$route.query || {}
      this.querys = querys

      if (this.type === 'update') {
        this.getDetail()
      }
    },

    // Add to
    postCreate() {
      create(this.formData)
        .then(() => {
          this.loading = false

          this.$message({
            message: 'Congratulations, the operation was successful',
            type: 'success',
            duration: 1000,
          })

          setTimeout(() => {
            this.$router.push(`${routePath}list`)
          }, 1000)
        })
        .catch(() => {
          this.loading = false
        })
    },

    // Update
    putUpdate() {
      update(this.formData)
        .then(() => {
          this.loading = false

          this.$message({
            message: 'Congratulations, the operation was successful',
            type: 'success',
            duration: 1000,
          })

          setTimeout(() => {
            this.$router.push(`${routePath}list`)
          }, 1000)
        })
        .catch(() => {
          this.loading = false
        })
    },

    // Details
    getDetail() {
      this.loading = true

      getDetail(this.querys.id).then((res) => {
        this.loading = false

        this.formData = res
      })
    },
  },
}
</script>
