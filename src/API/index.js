// 请求方法
import base from './base'
import axios from 'axios'
import qs from 'qs'
const api = {
  // 获取商品列表
  getProjectList(params) {  //{page:xx}
    return axios.get(base.projectList, {
      params
    })
  },
  // 获取搜索接口
  getSearch(params) {
    return axios.get(base.search, {
      params
    })
  },
  // 商品类目
  getSelectCategory(params) {
    return axios.get(base.selectCategory, {
      params
    })
  },
  // 添加商品
  getAddgoods(params) {
    return axios.get(base.addGoods,{
      params
    })
  },
  // 删除商品
  deleteGoods(params) {
    return axios.get(base.deleteGoods, {
      params
    })
  },
  // 编辑商品
  updateGoods(params) {
    return axios.get(base.updateGoods, {
      params
    })
  },
  // 登录接口
  getLogin(params) {
    return axios.post(base.login,qs.stringify(params))
  },
   /**
    * 统计数据
    */
    getStatistical() {
      return axios.get(base.statistical)
  },
  /**
   * 销量对比
   */
  getSellTotal() {
      return axios.get(base.sellTotal)
  },
  // 规格参数
  getParams(params) {
    return axios.get(base.params, {
      params
    })
  },
  // 添加规格参数
  insertItemParam(params) {
    return axios.get(base.insertItemParam, {
      params
    })
  },
  // 规格参数删除
  deleteParams(params) {
    return axios.get(base.deleteParams, {
      params
    })
  }
}

export default api;