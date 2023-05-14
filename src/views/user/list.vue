<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-container__search">
        <el-input
          v-model="listQuery.keyword"
          clearable
          placeholder="Please enter content"
          @keyup.enter.native="onFilter"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            type="primary"
            @click="onFilter"
            @keyup.enter.native="onFilter"
            >Search</el-button
          >
        </el-input>
      </div>
      <div class="filter-container__ctrl">
        <el-button
          class="filter-item"
          style="margin-left: 10px"
          type="primary"
          plain
          icon="el-icon-edit"
          @click="handleCreate"
        >
          {{ $t('table.add') }}
        </el-button>
      </div>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      stripe
      @selection-change="handleSelectionChange"
      id="tableList"
    >
      <el-table-column :label="$t('table.username')">
        <template slot-scope="{ row }"> {{ row.name }} </template>
      </el-table-column>

      <el-table-column
        sortable
        prop="updatedAt"
        :label="$t('table.updatedAt')"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.updatedAt | formatDate }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.status')"
        class-name="status-col"
        width="100"
      >
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter" size="mini">
            {{ row.status ? 'On' : 'Disable' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button size="mini" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>

          <el-button size="mini" @click="handleChangPwd(row)">
            ResetPassword
          </el-button>

          <el-button size="mini" type="danger" plain @click="handleDelete(row)">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="el-table__footer"></div>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { config } from './config'
import { fetchList, remove } from '@/api/users'
import { formatDate } from '@/utils'
import Pagination from '@/components/Pagination'

const { routePath } = config

export default {
  name: 'UserList',
  components: {
    Pagination,
  },

  filters: {
    statusFilter(status) {
      return status ? 'success' : 'info'
    },
    formatDate(date) {
      return formatDate(date)
    },
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id',
        keyword: '',
      },
      downloadLoading: false,
      selectedRows: [],
    }
  },
  watch: {
    'listQuery.keyword'(value) {
      if (value.length <= 0) {
        this.getList()
      }
    },
  },
  created() {
    this.getList()
  },
  methods: {
    // Get list
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then((res) => {
        const { totalResults = 0, results = [] } = res

        this.list = results
        this.total = totalResults

        this.listLoading = false
      })
    },

    // Create data
    handleCreate() {
      this.$router.push(`${routePath}create`)
    },

    // Update
    handleUpdate(row) {
      this.$router.push({ path: `${routePath}update`, query: { id: row.id } })
    },

    //ResetPassword
    handleChangPwd(row) {
      this.$router.push({
        path: `${routePath}password`,
        query: { id: row.id },
      })
    },

    // Delete
    handleDelete(row) {
      let ids = []
      if (Array.isArray(row)) {
        ids = row.map((v) => v.id)
      } else {
        ids.push(row.id)
      }

      this.handleClose(() => {
        remove({
          ids,
        }).then((res) => {
          this.$notify({
            title: 'Success',
            message: 'Successfully deleted',
            type: 'success',
            duration: 2000,
          })
          this.getList()
        })
      })
    },

    handleSelectionChange(val) {
      this.selectedRows = val
    },

    // confirm deletion
    handleClose(done) {
      this.$confirm('confirm deletion？')
        .then(() => {
          done()
        })
        .catch(() => {})
    },

    // filter
    onFilter() {
      this.listQuery.page = 1
      this.getList()
    },
  },
}
</script>
