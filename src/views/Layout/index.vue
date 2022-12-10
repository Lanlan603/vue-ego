<!--  -->
<template>
  <div class="layout">
    <!-- 左侧导航区域 -->
    <Mymenu class="menu" :isCollapse="isCollapse" />
    <!-- 右侧内容区域 -->
    <Content class="content"
     @changeCollapse="changeCollapse" 
     :isCollapse="isCollapse"
     :class="{isActive: isCollapse}" />
  </div>
</template>

<script>
import Mymenu from './Mymenu'
import Content from './Content'
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  components: {
    Mymenu,
    Content
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style  scoped lang="less">
.layout {
  .menu {
    background-color: #fff;
    position: fixed;
    top: 0;
    bottom: 0;
  }
  .content {
    margin-left: 200px;
    transition: margin-left .3s ease-in-out;

  }
  .isActive {
    margin-left: 60px;
  }
}
</style>
