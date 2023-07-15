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
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column label="Name">
        <template slot-scope="{ row }"> {{ row.name }} </template>
      </el-table-column>

      <el-table-column label="Picture" align="center">
        <template slot-scope="{ row }">
          <el-popover placement="right" width="230" trigger="hover">
            <img :src="row.pic" style="width: 200px" />
            <img :src="row.pic" slot="reference" style="width: 40px" />
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="Classification">
        <template slot-scope="{ row }">
          {{ row.tag | tagIDsToName }}
        </template>
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
    <div class="el-table__footer">
      <el-button
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
import { fetchList, remove } from '@/api/post'
import { fetchList as fetchTagList } from '@/api/tag'
import waves from '@/directive/waves' // waves directive
import { formatDate, listToObject, baseHost } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

let tagList = {}
export default {
  name: 'PostList',
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
    tagIDsToName(id) {
      console.log('tagList', tagList)
      let item = tagList[id] || {}
      let name = item.name || ''

      return name
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
  async created() {
    await this.getTag()
    await this.getList()
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

    // Get tag
    getTag() {
      fetchTagList().then((res) => {
        const { totalResults = 0, results = [] } = res

        this.total = totalResults
        let listObject = listToObject(results)
        this.tagList = listObject
        tagList = listObject
      })
    },

    // create
    handleCreate() {
      this.$router.push(`${config.routePath}create`)
    },

    // Update
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

    handleSelectionChange(val) {
      this.selectedRows = val
    },

    // Close
    handleClose(done) {
      this.$confirm('confirm deletion')
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
