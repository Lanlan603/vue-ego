<!--  -->
<template>
  <div>
    <el-tree :props="props" :load="loadNode" lazy accordion @node-click="nodeClick">
    </el-tree>
  </div>
</template>

<script>
export default {
    data() {
      return {
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
      };
    },
    methods: {
      // 获取tree节点属性
      nodeClick(data,val) {
        this.$emit('sendTreeData',data)
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          // 进入页面 获取第一层数据
          this.$api.getSelectCategory().then(res => {
            if (res.data.status === 200) {
              return resolve(res.data.result)
            }
          })
        }
        if (node.level >= 1) {
          // 请求当前点击的tree下面的数据
          this.$api.getSelectCategory({
            id: node.data.cid
          }).then(res => {
            if (res.data.status === 200) {
              return resolve(res.data.result)
            } else {
              return resolve([])
            }
          })
        }
      }
    }
  };
</script>

<style  scoped>

</style>
