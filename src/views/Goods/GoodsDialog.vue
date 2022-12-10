<!--  -->
<template>
  <div>
    <!-- 弹窗 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="70%" :before-close="clearForm">
      <!-- 内容区域 -->
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类目选择" prop="category">
          <el-button type="primary" @click="innerVisible = true">类目选择</el-button>
          <span>{{ form.category }}</span>
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="form.num"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" required>
          <el-col :span="3">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="3">
            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input v-model="form.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="image">
          <el-button type="primary" @click="innerVisibleImg = true">上传图片</el-button>
          <br>
          <img :src="form.image" height="200px" style="margin-top: 10px" alt="" />
        </el-form-item>
        <el-form-item label="商品描述" prop="descs">
          <GoodsTextarea @sendTextarea="sendTextarea" ref="editor" />
        </el-form-item>
      </el-form>

      <!-- 弹框底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">添加</el-button>
      </span>

      <!-- 1. 内弹窗--- 类目选择 -->
      <el-dialog width="40%" title="类目选择" :visible.sync="innerVisible" append-to-body>
        <TreeGoods @sendTreeData="sendTreeData" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="showTreeData">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 2. 内弹窗--- 上传图片 -->
      <el-dialog width="40%" title="上传图片" :visible.sync="innerVisibleImg" append-to-body>
        <UploadImg @sendImg="sendImg" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisibleImg = false">取 消</el-button>
          <el-button type="primary" @click="showImg">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import AddGoods from './AddGoods'
import TreeGoods from './TreeGoods'
import UploadImg from './UploadImg'
import GoodsTextarea from './GoodsTextarea.vue'
export default {
  props: {
    title: {
      type: String,
      default: '添加商品'
    },
    rowData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      dialogVisible: false, // 外弹窗
      innerVisible: false, // 内弹窗
      innerVisibleImg: false, // 上传图片弹框
      treeData: {}, // tree节点属性
      imgUrl: "", // 图片地址

      form: {
        id: '',
        title: '',
        price: '',
        num: '',
        cid: '',
        sellPoint: '',
        image: '',
        descs: '',
        category: '',
        date1: '',
        date2: '',
      },
      rules: {
        title: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        num: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
      }
    }
  },
  components: {
    AddGoods,
    TreeGoods,
    UploadImg,
    GoodsTextarea,
  },
  methods: {
    // 展示Tree节点名称
    showTreeData() {
      this.innerVisible = false
      this.form.category = this.treeData.name
      this.form.cid = this.treeData.cid
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          //参数： title cid  category sellPoint price num descs paramsInfo image
          const { title, cid, category, sellPoint, price, num, descs, image, id } = this.form
          if (this.title === '添加商品') {
            this.$api.getAddgoods({
              title, cid, category, sellPoint, price, num, descs, image
            })
              .then(res => {
                // 成功的结果
                console.log(res.data)
                if (res.data.status === 200) {
                  // 更新列表
                  this.$parent.http(1)
                  this.$message({
                    message: '添加商品成功',
                    type: 'success'
                  })
                  // 清空表单
                  this.clearForm()
                }
              })
          } else {
            this.$api.updateGoods({
              title, cid, category, sellPoint, price, num, descs, image, id
            }).then(res => {
              if (res.data.status === 200) {
                // 更新列表
                this.$parent.http(1)
                this.$message({
                  message: '商品修改成功',
                  type: 'success'
                })
                // 清空表单
                this.clearForm()
              }
            })
          }
        } else {
          this.$message({
            message: '添加失败',
            type: 'warning'
          })
          return false;
        }
      })
    },
    // 获取tree节点属性
    sendTreeData(val) {
      this.treeData = val
    },
    // 获取图片url地址
    sendImg(val) {
      this.imgUrl = val
    },
    // 展示图片
    showImg() {
      this.innerVisibleImg = false
      this.form.image = 'http://' + this.imgUrl
    },
    sendTextarea(val) {
      this.form.descs = val
    },
    clearForm() {
      // 关闭弹窗
      this.dialogVisible = false
      // 清空表单
      this.form = {
        title: '',
        price: '',
        num: '',
        cid: '',
        sellPoint: '',
        image: '',
        descs: '',
        category: '',
      }
      // 清空wangeditor
      this.$refs.editor.editor.txt.clear()
    }
  },
  watch: {
    rowData(val) {
      // console.log(val)
      this.form = val
      // DOM加载完毕调用函数
      this.$nextTick(() => {
        this.$refs.editor.editor.txt.html(val.descs)
      })
    }
  }
}
</script>

<style  scoped>
.line {
  text-align: center;
}
</style>
