<!--  -->
<template>
  <div class="menu">
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router :collapse="isCollapse">
      <el-menu-item index="">
        <strong slot="title" style="color: #1e78bf">易购后台管理系统</strong>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ $t("menu.home") }}</span>
      </el-menu-item>
      <el-menu-item index="/goods">
        <i class="el-icon-s-shop"></i>
        <span slot="title">{{ $t("menu.goods") }}</span>
      </el-menu-item>
      <el-submenu index="/params">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>{{ $t("menu.params") }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/params/specification">
            <i class="el-icon-document"></i>
            <span slot="title">规格与包装</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/advert">
        <i class="el-icon-s-opportunity"></i>
        <span slot="title">{{ $t("menu.advert") }}</span>
      </el-menu-item>
      <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-paperclip"></i>
          <span>{{ $t("menu.order") }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order/order-list">
            <i class="el-icon-document"></i>
            <span slot="title">订单列表</span>
          </el-menu-item>
          <el-menu-item index="/order/order-back">
            <i class="el-icon-tickets"></i>
            <span slot="title">退货管理</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/user">
        <i class="el-icon-menu"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ['isCollapse'],
  data() {
    return {

    }
  }
}
</script>

<style  scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
