import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Login from '@/views/Login/Login'
import Home from '@/views/Home/Home'
// 异步
const Goods = () => import('@/views/Goods/Goods')
const AddGoods = () => import('@/views/Goods/AddGoods')
const Params = () => import('@/views/Params/Params')
const Specification = () => import('@/views/Params/ParamsInfo/Specification')
const Advert = () => import('@/views/Advert/Advert')
const Order = () => import('@/views/Order')
const OrderList = () => import('@/views/Order/OrderList/OrderList')
const OrderBack = () => import('@/views/Order/OrderBack/OrderBack')
const User = () => import('@/views/User')

Vue.use(VueRouter)

const routes = [
 {
  path: '',
  component: Layout,
  meta: {isLogin: true},
  children:[
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods,
    },
    {
      path: '/add-goods',
      name: 'AddGoods',
      component: AddGoods,
    },
    {
      path: '/user',
      name: 'User',
      component: User,
    },
    {
      path: '/params',
      name: 'Params',
      component: Params,
      redirect: '/params/specification',
      children: [
        {
          path: 'specification',
          component: Specification
        }
      ]
    },
    {
      path: '/advert',
      name: 'Advert',
      component: Advert,
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      redirect: '/order/order-list',
      children: [
        {
          path: 'order-list',
          component: OrderList,
        },
        {
          path: 'order-back',
          component: OrderBack,
        }
      ]
    },
  ]
 },
 {
  path: '/login',
  name: 'Login',
  component: Login,
 }
]

const router = new VueRouter({
  routes
})


export default router
