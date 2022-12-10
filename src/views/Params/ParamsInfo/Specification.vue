<!--  -->
<template>
  <div>
    <!-- 导航 -->
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/params' }">规格参数</el-breadcrumb-item>
        <el-breadcrumb-item>规格包装</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 搜索栏 -->
    <div class="header">
      <el-input v-model="inp" />
      <el-button type="primary">查看</el-button>
      <el-button type="primary" @click="clickShow">添加</el-button>
    </div>
    <!-- 表格 -->
    <div class="search">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="itemCatId" label="规格参数ID" width="180">
        </el-table-column>
        <el-table-column prop="id" label="类目ID" width="180">
        </el-table-column>
        <el-table-column prop="specsName" label="规格名称">
        </el-table-column>
        <el-table-column prop="paramData" label="规格参数">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini">查看</el-button>
            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">
              编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <MyPagination :total="total" :pageSize="pageSize" @changePage="changePage" />

    <!-- 弹窗 -->
    <ParamsDialog ref="dialog" />

    <h2>规格与包装</h2>
  </div>
</template>

<script>
import MyPagination from '@/components/MyPagination'
import ParamsDialog from './ParamsDialog'
export default {
  components: {
    MyPagination,
    ParamsDialog
  },
  data() {
    return {
      inp: '', // 输入框数据
      tableData: [], // 表格数据
      // 分页数据
      total: 10,
      pageSize: 1,
      currentPage: 1
    }
  },
  methods: {
    // 接口请求方法
    http(page) {
      this.$api.getParams({ page })
        .then(res => {
          if (res.data.status === 200) {
            this.total = res.data.total
            this.pageSize = res.data.pageSize
            this.tableData = res.data.data
          }
        })
    },
    // 操作分页
    changePage(num) {
      this.http(num)
    },
    // 控制彈窗
    clickShow() {
      this.$refs.dialog.dialogVisible = true
    },
    // 删除
    handleDelete(index, row) {
      console.log(row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deleteParams({
          id: row.id
        }).then(res => {
          if (res.data.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 更新列表
            this.http(1)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
  },
  created() {
    this.http(1)
  },
}
</script>

<style  scoped lang="less">
.params {
  margin: 10px;
}

.nav {
  padding: 10px;
}

.header {
  display: flex;
  background: #fff;
  padding: 10px;
  border: 1px solid #eee;

  button {
    margin-left: 20px;
  }
}

.my-table {
  margin: 10px auto;
}
</style>
