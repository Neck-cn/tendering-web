import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import UserInfo from '../components/UserInfo'
import My from "../components/My"
import black from "../components/black"
import MyTenderings from "../components/MyTenderings";
import EditTenderings from "../components/EditTenderings"
import Tenderings from "../components/Tenderings"
import MyTenderingsDetail from "../components/MyTenderingsDetail";
import TenderingsDetail from "../components/TenderingsDetail";
import MyBids from "../components/MyBids";
import MyBidsDetail from "../components/MyBidsDetail";
import  Header from '../components/Header'
import AdminAdmin from '../components/admin/Admin'
import AdminReport from '../components/admin/AdminReport'
import AdminLogin from '../components/admin/Login'
import AdminBid from '../components/admin/Bid'
import AdminBidDetail from '../components/admin/BidDetail'
import AdminTender from '../components/admin/Tender'
import AdminEnterprise from '../components/admin/Enterprise'
import AdminTenderDetail from '../components/admin/TenderDetail'
import AdminEnterpriseDetail from '../components/admin/EnterpriseDetail'
Vue.use(Router);


export default new Router({
  mode: "history",
  routes: [

    {
      path: '/My',
      name: 'My',
      component: My,
      children: [

        {
          path: '/My/EditTenderings',
          name: 'EditTenderings',
          component: EditTenderings,
          meta: {keepAlive: true}
        },
        {
          path: '/Header',
          name: 'Header',
          component: Header,
          meta: {keepAlive: true}
        },
        {
          path: '/My/MyTenderings',
          name: 'MyTenderings',
          component: MyTenderings,
          meta: {keepAlive: true}
        },
        {
          path: '/My/MyBids',
          name: 'MyBids',
          component: MyBids,
          meta: {keepAlive: true}
        },
        {
          path: '/My/TenderingsDetail',
          name: 'MyTenderingsDetail',
          component: MyTenderingsDetail
        },
        {
          path: '/My/MyBidsDetail',
          name: 'MyBidsDetail',
          component: MyBidsDetail
        },

        {
          path: '/My/Login',
          name: 'Login',
          component: Login
        }, {
          path: '/My/Register',
          name: 'Register',
          component: Register
        }, {
          path: '/My/UserInfo',
          name: 'UserInfo',
          component: UserInfo
        },
      ]
    },
    {
      path: "/black",
      name: "black",
      component: black
    },
    {
      path: "/Tenderings",
      name: "Tenderings",
      component: Tenderings,
    }, {
      path: "/Login",
      name: "Login",
      component: Login,
    }, {
      path: '/TenderingsDetail',
      name: 'TenderingsDetail',
      component: TenderingsDetail
    }, {
      path: '/',
      name: 'My',
      component: My
    },

    {
      path: '/Admin/admin',
      name: 'AdminAdmin',
      component: AdminAdmin,
      meta: {keepAlive: true}
    }, {
      path: '/Admin/login',
      name: 'AdminLogin',
      component: AdminLogin,
      meta: {keepAlive: true}
    },
    {
      path: '/Admin/Report',
      name: 'AdminReport',
      component: AdminReport,
      meta: {keepAlive: true}
    },
    {
      path: '/Admin/Bid',
      name: 'AdminBid',
      component: AdminBid,
      meta: {keepAlive: true}
    },

    {
      path: '/Admin/BidDetail',
      name: 'AdminBidDetail',
      component: AdminBidDetail,
      meta: {keepAlive: true}
    },
    {
      path: '/Admin/enter',
      name: 'AdminEnter',
      component: AdminEnterprise,
      meta: {keepAlive: true}
    },

    {
      path: '/Admin/EnterpriseDetail',
      name: 'AdminEnterpriseDetail',
      component: AdminEnterpriseDetail,
      meta: {keepAlive: true}
    },
    {
      path: '/Admin/Tender',
      name: 'AdminTender',
      component: AdminTender,
      meta: {keepAlive: true}
    },

    {
      path: '/Admin/tenderDetail',
      name: 'AdminTenderDetail',
      component: AdminTenderDetail,
      meta: {keepAlive: true}
    },
  ]
})
