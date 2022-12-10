import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'
Vue.use(VueI18n)


// 配置语言
const messages = {
   // 中文
   zh: {
    menu: {
      home: '首页',
      goods: '商品管理',
      params: '规格参数',
      advert: '广告分类',
      order: '售后管理'
    },
    ...zhLocale,
  },
  // English
  en: {
    menu: {
      home: 'home',
      goods: 'Goods manage',
      params: 'params',
      advert: 'advert',
      order: 'order'
    },
    ...enLocale,
  },
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: 'zh', // 选中的语言
  messages, // 语言环境
})

ElementLocale.i18n((key, value) => i18n.t(key, value))
// 导出i18n
export default i18n