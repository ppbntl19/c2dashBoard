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
      <el-table-column label="Title">
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
            v-if="row.status != 'deleted' && isAdmin"
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
    <div class="el-table__footer">
      <el-button
        v-if="isAdmin"
        type="danger"
        plain
        :disabled="selectedRows.length <= 0"
        @click="handleDelete(selectedRows)"
        >Delete Selected
      </el-button>
    </div>
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
import { fetchList, remove } from '@/api/about'
import waves from '@/directive/waves' // waves directive
import { formatDate } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

let categoryList = {}
export default {
  name: 'AboutList',
  components: {
    Pagination,
  },
  directives: {
    waves,
  },
  filters: {
    statusFilter(status) {
      return status ? 'success' : 'info'
    },
    formatDate(date) {
      return formatDate(date)
    },
    categoryIDsToName(ids) {
      let names = ''
      ids.forEach((v, i) => {
        let item = categoryList[v] || {}
        let name = item.name || ''
        if (name) {
          names += i === 0 ? name : ` > ` + name
        }
      })
      return names
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

      categoryList: {},
    }
  },
  computed: {
    isAdmin() {
      const roles = this.$store.state.user.roles
      return roles.includes('admin')
    },
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
      fetchList(this.listQuery).then((res) => {
        const { totalResults = 0, results = [] } = res
        this.list = results
        this.total = totalResults

        this.listLoading = false
      })
    },

    // Create data
    handleCreate() {
      this.$router.push(`${config.routePath}create`)
    },

    // Update data
    handleUpdate(row) {
      this.$router.push({
        path: `${config.routePath}update`,
        query: { id: row.id },
      })
    },

    // Delete
    handleDelete(row) {
      let ids = []
      if (Array.isArray(row)) {
        ids = row.map((v) => v._id)
      } else {
        ids.push(row._id)
      }

      this.handleClose(() => {
        remove({
          ids,
        }).then((res) => {
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

    handleSelectionChange(val) {
      this.selectedRows = val
    },

    // Delete
    handleClose(done) {
      this.$confirm('Confirm Deletion ?')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },

    // filter
    onFilter() {
      this.listQuery.page = 1
      this.getList()
    },
  },
}
</script>
