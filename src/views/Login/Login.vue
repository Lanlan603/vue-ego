<!--  -->
<template>
  <div class="login-box">
    <h2 class="title">登录页面</h2>
    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="账号" prop="username">
    <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
    <el-button @click="resetForm('loginForm')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import jwt from 'jwt-decode'
 export default {
    data() {
      var  validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { validator: validateUser, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      ...mapMutations('loginModule',['setUser']),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('校验通过',this.loginForm)
            const {username, password} = this.loginForm
            // 请求登录接口
            this.$api.getLogin({
              username, password
            }).then(res => {
              // 当响应状态码为200时
              if(res.data.status === 200) {
                // 登录成功的状态
                // 保存用户信息
                let obj = {
                  user: jwt(res.data.data).username,
                  token: res.data.data
                }
                // 储存到vuex
                this.setUser(obj)
                // 保存本地存储
                localStorage.setItem('user',JSON.stringify(obj))
                // 跳转页面
                this.$router.push('/')
              }else {
                // 登录失败的状态
                this.$message.error('账号或密码错误')
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style  scoped lang="less">
.login-box {
  width: 400px;
  height: 300px;
  padding: 20px;
  margin: 150px auto;
  
  border-radius: 10px;
  border: 1px solid #eee;
  background: #fff;
}
.demo-ruleForm{
  margin-top: 60px;

}
.title{
  margin-bottom: 30px;
  text-align: center;
  color: #666;
}

</style>
