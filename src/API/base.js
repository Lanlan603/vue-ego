// 网络请求的默认配置

const base = {
  host: 'localhost:8989', // 基础地址
  projectList: '/api/api/projectList', // 商品列表
  search: '/api/api/search', // 搜索接口
  selectCategory: '/api/api/backend/itemCategory/selectItemCategoryByParentId', // 类目选择
  uploadUrl: 'api/api/upload', // 图片上传 post请求
  addGoods: 'api/api/backend/item/insertTbItem', // 添加商品
  deleteGoods: 'api/api/backend/item/deleteItemById', // 删除商品
  updateGoods: 'api/api/backend/item/updateTbItem', // 更新商品
  login: 'api/api/login', //登录
  statistical:'api/api/statistical',//统计数据
  sellTotal:"api/api/sellTotal",//统计数据
  params: 'api/api/backend/itemParam/selectItemParamAll', // 规格参数
  insertItemParam: 'api/api/backend/itemParam/insertItemParam', // 添加规格参数
  deleteParams: 'api/api/params/delete', // 删除规格参数
}

export default base;