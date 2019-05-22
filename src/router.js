import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Obj from './views/Obj.vue'
import Opr from './views/Opr.vue'
import Per from './views/Per.vue'
import Role from './views/Role.vue'
import User from './views/User.vue'
import Org from './views/Org.vue'
import ObjDetail from './views/ObjDetail.vue'
import ObjAdd from './views/ObjAdd.vue'
import OprDetail from './views/OprDetail.vue'
import OprAdd from './views/OprAdd.vue'
import PerAdd from './views/PerAdd.vue'
import PerDetail from './views/PerDetail.vue'
import RoleAdd from './views/RoleAdd.vue'
import RoleGroupAdd from './views/RoleGroupAdd.vue'
import RoleDetail from './views/RoleDetail.vue'
import RoleGroupDetail from './views/RoleGroupDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/obj',
      name: 'obj',
      component: Obj,
    },
    {
      path: '/objDetail',
      name: 'objDetail',
      component: ObjDetail,
    },
    {
      path: '/objAdd',
      name: 'objAdd',
      component: ObjAdd,
    },
    {
      path: '/opr',
      name: 'opr',
      component: Opr,
    },
    {
      path: '/oprDetail',
      name: 'oprDetail',
      component: OprDetail,
    },
    {
      path: '/oprAdd',
      name: 'oprAdd',
      component: OprAdd,
    },
    {
      path: '/per',
      name: 'per',
      component: Per,
    },
    {
      path: '/perAdd',
      name: 'perAdd',
      component: PerAdd,
    },
    {
      path: '/perDetail',
      name: 'perDetail',
      component: PerDetail,
    },
    {
      path: '/role',
      name: 'role',
      component: Role,
    },
    {
      path: '/roleAdd',
      name: 'roleAdd',
      component: RoleAdd,
    },
    {
      path: '/roleGroupAdd',
      name: 'roleGroupAdd',
      component: RoleGroupAdd,
    },
    {
      path: '/roleDetail',
      name: 'roleDetail',
      component: RoleDetail,
    },
    {
      path: '/roleGroupDetail',
      name: 'roleGroupDetail',
      component: RoleGroupDetail,
    },
    {
      path: '/user',
      name: 'user',
      component: User,
    },
    {
      path: '/org',
      name: 'org',
      component: Org,
    },
  ],
})
