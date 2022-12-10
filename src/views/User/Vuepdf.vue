<!--  -->
<template>
  <div>
    <el-dialog title="合同内容" :visible.sync="dialogVisible" width="70%">
      <h1>vue-pdf插件用不了</h1>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import pdf from 'vue-pdf'
export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  components: {
  }
}
</script>

<style  scoped>

</style>
