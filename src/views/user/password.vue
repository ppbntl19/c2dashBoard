<template>
  <div v-loading="loading" class="app-container">
    <el-form
      ref="validateForm"
      :model="formData"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="Old Password" prop="oldPassword">
        <el-input
          v-model="formData.oldPassword"
          type="password"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item label="New Password" prop="password">
        <el-input
          v-model="formData.password"
          type="password"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item label="Re-Password" prop="rePassword">
        <el-input
          v-model="formData.rePassword"
          type="password"
          show-password
        ></el-input>
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
import { updatePassword } from '@/api/users'

export default {
  name: 'ChangPassword',
  components: {},
  filters: {},
  data() {
    var validateRePass = (rule, value, callback) => {
      if (value !== this.formData.password) {
        callback(new Error('Entering Password twice is inconsistent!'))
      } else {
        callback()
      }
    }

    return {
      loading: false,

      formData: {
        id: '',
        oldPassword: '',
        password: '',
        rePassword: '',
      },

      rules: {
        oldPassword: [
          {
            required: true,
            message: 'Please enter old Password',
            trigger: 'blur',
          },
          {
            min: 6,
            max: 20,
            message: '6 to 20 characters long',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'Please enter a new Password',
            trigger: 'blur',
          },
          {
            min: 6,
            max: 20,
            message: '6 to 20 characters long',
            trigger: 'blur',
          },
        ],
        rePassword: [
          {
            required: true,
            message: 'Please enter new Password again',
            trigger: 'blur',
          },
          {
            validator: validateRePass,
            message: 'Entering Password twice is inconsistent',
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

        this.putUpdatePassword()
      })
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    // query
    getQuery() {
      const querys = this.$route.query || {}
      this.formData.id = querys.id
    },

    // Update
    putUpdatePassword() {
      updatePassword(this.formData)
        .then(() => {
          this.loading = false

          this.$message({
            message: 'Congratulations, the operation was successful',
            type: 'success',
            duration: 1000,
          })

          setTimeout(() => {
            this.$router.push('/user/list')
          }, 1000)
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>
