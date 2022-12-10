<!--  -->
<template>
  <div>
    <div class="header">
      <i v-show="!isCollapse" @click="changeMenu" class="iconfont icon-indent-decrease"></i>
      <i v-show="isCollapse" @click="changeMenu" class="iconfont icon-indent-increase"></i>
      <div class="header-right">
        <el-dropdown @command="clickLang">
          <span class="el-dropdown-link" style="color: #fff">
            多语言<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="user">
          <span>欢迎: {{userinfo.user}}</span>
          <i class="iconfont icon-tuichu" @click="quitLogin"></i>
        </div>
      </div>
    </div>
    <!-- 内容区域---路由出口 -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex' 
export default {
  props: ['isCollapse'],
  data() {
    return {
    }
  },
  methods: {
    ...mapMutations('loginModule',['clearUser']),
    changeMenu() {
      this.$emit('changeCollapse')
    },
    clickLang(command) {
      this.$i18n.locale = command
    },
    // 退出登录
  quitLogin() {
    // 清除本地存储
    localStorage.removeItem('user')
    // 清除vuex
    this.clearUser
    // 路由跳转到登录页
    this.$router.push('/login')
  }
  },
  computed: {
    ...mapState('loginModule',['userinfo'])
  },
}
</script>

<style  scoped lang="less">
.header {
  height: 50px;
  line-height: 50px;
  color: #fff;
  background: #1e78bf;
  .iconfont {
    font-size: 24px;
    margin-left: 10px;
    cursor: pointer;
  }
}
.header-right {
  float: right;
  padding-right: 20px;
  display: flex;
  .user {
    margin-left: 20px;
    span {
      position: relative;
      top: -4px;
      margin-right: 10px;
    }
  }
}
</style>
