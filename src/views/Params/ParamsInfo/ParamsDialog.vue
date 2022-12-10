<!--  -->
<template>
  <div>
    <el-dialog title="添加规格参数" :visible.sync="dialogVisible" width="50%">
      <!-- 弹窗内容区域 -->
      <TreeGoods @sendTreeData="sendTreeData" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true" :disabled="isdisabled">确定并添加分组</el-button>
      </span>
      <!-- 二级弹窗---嵌套 -->
      <el-dialog width="45%" title="商品规格参数配置" :visible.sync="innerVisible" append-to-body>
        <div class="title">当前选中的商品: {{ treeData.name }}</div>
        <el-button @click="addDomain" style="margin: 10px">新增规格列表</el-button>
        <hr>
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="120px" class="demo-dynamic">
          <el-form-item v-for="(item, index) in dynamicValidateForm.groups" :label="item.title + index" :key="index"
            :prop="item.title" :rules="{
              required: true, message: '域名不能为空', trigger: 'blur'
            }">
            <div class="item">
              <el-input v-model="item.title"></el-input>
              <el-button @click.prevent="addChildDomain(index)">添加子组</el-button>
              <el-button @click.prevent="removeDomain(index)">删除</el-button>
            </div>
            <el-form-item v-for="(ele, i) in item.children" :label="ele.title + i" :key="i" :prop="ele.title" :rules="{
              required: true, message: '域名不能为空', trigger: 'blur'
            }">
              <div class="item">
                <el-input v-model="ele.title"></el-input>
                <el-button @click.prevent="removeChildDomain(index, i)">删除</el-button>
              </div>
            </el-form-item>
          </el-form-item>
          <!-- <el-form-item>
              <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
              <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
            </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
          <el-button @click="closeForm('dynamicValidateForm')">取消</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import TreeGoods from '@/views/Goods/TreeGoods'
export default {
  data() {
    return {
      dialogVisible: false,
      innerVisible: false,
      treeData: {},
      isdisabled: true,  // 控制确定按钮是否可以点击, 默认不可点击
      dynamicValidateForm: {
        // 动态表单
        groups: [],
      }
    }
  },
  components: {
    TreeGoods
  },
  methods: {
    // 获取点击Tree的数据
    sendTreeData(val) {
      this.treeData = val
      // 启用按钮
      this.isdisabled = false
    },
    // 添加规格参数
    addDomain() {
      this.dynamicValidateForm.groups.push({
        value: '',
        title: '',
        children: []
      });
    },
    // 添加子组
    addChildDomain(index) {
      this.dynamicValidateForm.groups[index].children.push({
        value: '',
        title: '',
      })
    },
    // 删除子组
    removeChildDomain(index, i) {
      this.dynamicValidateForm.groups[index].children.splice(i, 1)
    },

    // 删除配置项
    removeDomain(index) {
      this.dynamicValidateForm.groups.splice(index, 1)
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.dynamicValidateForm.groups)
          this.$api.insertItemParam({
            itemCatId: this.treeData.cid,
            content: JSON.stringify(this.dynamicValidateForm.groups),
            specsName: this.treeData.name
          }).then(res => {
            console.log(res.data);
            if (res.data.status === 200) {
              // 添加成功 隐藏弹窗
              this.innerVisible = false
              this.dialogVisible = false
              // 清空数据
              this.dynamicValidateForm.groups = []
              this.isdisabled = true
              // 更新视图
              this.$parent.http(1)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 关闭
    closeForm(formName) {
      // 关闭弹框
      this.innerVisible = false
      // 清空数据
      this.dynamicValidateForm.groups = []
      this.isdisabled = true
    },
  }
}
</script>

<style  scoped lang="less">
.demo-dynamic {
  margin: 10px;
}

.item {
  display: flex;

  button {
    margin-left: 10px;
  }
}
</style>
