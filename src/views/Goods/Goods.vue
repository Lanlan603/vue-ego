<!--  -->
<template>
  <div class="goods">
    <!-- 1. 搜索区域 -->
    <div class="header">
      <!-- change	仅在输入框失去焦点或用户按下回车时触发 -->
      <el-input @change="searchIpt" v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary">查询</el-button>
      <router-link to="/add-goods">
        <el-button type="primary">添加</el-button>
      </router-link>
      <el-button type="primary" @click="addGoods">快速添加</el-button>
    </div>
    <!-- 2. 表格区域展示试图数据 -->
    <div class="wrapper">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="商品ID" width="100">
        </el-table-column>
        <el-table-column prop="title" label="商品名称" width="100" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="price" label="商品价格" width="120">
        </el-table-column>
        <el-table-column prop="num" label="商品数量" width="120">
        </el-table-column>
        <el-table-column prop="category" label="规格类目" width="100">
        </el-table-column>
        <el-table-column prop="image" label="商品图片" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="sellPoint" label="商品卖点" width="160" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="280">
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
    <!-- 分页器 -->
    <MyPagination @changePage="changePage" :total="total" :pageSize="pageSize" v-show="isShow"
      :currentPage="currentPage" />
    <!-- 添加功能弹窗 -->
    <GoodsDialog ref="Dialog" :title="title" :rowData="rowData" />
  </div>
</template>

<script>
import MyPagination from '@/components/MyPagination.vue'
import GoodsDialog from './GoodsDialog.vue'
export default {
  components: {
    MyPagination,
    GoodsDialog
  },
  data() {
    return {
      input: '',
      tableData: [],
      total: 10,
      pageSize: 1,
      type: 1,
      list: [],
      isShow: true,
      currentPage: 1,
      title: '添加商品', // 弹窗标题
      rowData: {}, // 编辑商品数据
    }
  },
  methods: {
    // 初始化商品列表
    http(page) {
      this.$api.getProjectList({
        page
      })
        .then(res => {
          if (res.status === 200) {
            this.tableData = res.data.data
            this.total = res.data.total
            this.pageSize = res.data.pageSize
          }
        })
    },
    // 分页器
    changePage(num) {
      this.currentPage = num;
      if (this.type == 1) {
        this.http(num); //商品列表分页
      } else {
        //搜索分页 1 2 3 4 --  list=[0,1,2,3,4,5,6,7,8]  0-3  3-6  6-9 9-12
        console.log("搜索的分页处理---");
        //（num-1）*3  num*3
        this.tableData = this.list.slice((num - 1) * 3, num * 3);
      }
    },
    // 搜索
    searchIpt(val) {
      if (!val) {
        this.http(1)
        this.currentPage = 1
        this.type = 1
        this.isShow = true
        return;
      }
      this.$api.getSearch({
        search: val
      }).then(res => {
        if (res.data.status === 200) {
          this.list = res.data.result // 获取搜索的总条数 --- 数据分割
          // 处理分页
          this.total = res.data.result.length
          this.pageSize = 3
          this.tableData = res.data.result.slice(0, 3)
          this.type = 2
        } else {
          this.tableData = [],
            this.isShow = false
        }
      })
      this.isShow = true
    },
    // 弹窗添加商品
    addGoods() {
      this.title = '添加商品'
      this.$refs.Dialog.dialogVisible = true
    },
    // 删除商品
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deleteGoods({
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
    // 编辑商品
    handleEdit(index, row) {
      this.title = '编辑商品'
      this.$refs.Dialog.dialogVisible = true
      this.rowData = { ...row }
    }
  },
  created() {
    this.http(1)
  }
}
</script>

<style  scoped lang="less">
.goods {
  margin: 10px;
}

.position {
  // background: #fff;
  padding: 10px;
  // border: 1px solid #eee;
  margin-bottom: 10px;
}

.header {
  display: flex;
  background: #fff;
  padding: 10px;
  border: 1px solid #eee;

  button {
    margin-left: 20px;
  }

  .el-form-item {
    margin-bottom: 0;
  }
}

.wrapper {
  margin: 10px 0;
}
</style>

