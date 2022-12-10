<!--  -->
<template>
  <div class="pagination">
    <el-pagination background layout="total, prev, pager, next, jumper" 
    :total="total"
    :page-size="pageSize"
    :current-page="currentPage"
    @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 100
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
    }
  },
  methods: {
    changePage(num) {
      this.$emit('changePage', num)
    }
  }
}
</script>

<style  scoped>
.pagination {
  margin: 20px auto;
  text-align: center;
}
</style>
