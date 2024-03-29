<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-container__search"></div>
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
      border
      fit
      highlight-current-row
      stripe
      :data="list"
      id="tableList"
    >
      <el-table-column label="Classification">
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

          <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            plain
            @click="handleDelete(row)"
          >
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { config } from './config'
import { fetchList, remove } from '@/api/product-category'
import { formatDate } from '@/utils'

export default {
  name: 'ProductCategoryList',
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
    // Get List
    getList() {
      this.listLoading = true
      fetchList().then((res) => {
        const { totalResults = 0, results = [] } = res

        this.total = totalResults

        this.list = results

        this.listLoading = false
      })
    },

    // Create data
    handleCreate() {
      this.$router.push(`${config.routePath}create`)
    },

    // Update data
    handleUpdate(row) {
      console.log('config.routePath', config.routePath)
      this.$router.push({
        path: `${config.routePath}update`,
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
        }).then(() => {
          this.$notify({
            title: 'Success',
            message: 'successfully deleted',
            type: 'success',
            duration: 2000,
          })
          this.getList()
        })
      })
    },

    // Close
    handleClose(done) {
      this.$confirm('Confirm Deletion ?')
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
