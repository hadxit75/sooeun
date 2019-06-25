import Home from "../views/Home.vue";
import Obj from "../views/Obj.vue";
import Opr from "../views/Opr.vue";
import Per from "../views/Per.vue";
import Role from "../views/Role.vue";
import User from "../views/User.vue";
import Org from "../views/Org.vue";
import ObjDetail from "../views/ObjDetail.vue";
import ObjAdd from "../views/ObjAdd.vue";
import OprDetail from "../views/OprDetail.vue";
import OprAdd from "../views/OprAdd.vue";
import PerAdd from "../views/PerAdd.vue";
import PerDetail from "../views/PerDetail.vue";
import RoleAdd from "../views/RoleAdd.vue";
import RoleGroupAdd from "../views/RoleGroupAdd.vue";
import RoleDetail from "../views/RoleDetail.vue";
import RoleGroupDetail from "../views/RoleGroupDetail.vue";
import RolePer from "../views/RolePer.vue";
import RolePerDetail from "../views/RolePerDetail.vue";
import RolePerAdd from "../views/RolePerAdd.vue";
import RolePerGroupAdd from "../views/RolePerGroupAdd.vue";
import RoleGroupPerDetail from "../views/RoleGroupPerDetail.vue";

import UserGroupStatus from "../views/UserGroupStatus.vue";
import UserGroupDetail from "../views/UserGroupDetail.vue";
import UserGroupAdd from "../views/UserGroupAdd.vue";
import Frame from "../views/Frame.vue";

import UserPerStatus from "../views/UserPerStatus.vue";
import UserPerTab01 from "../views/UserPerTab01.vue";
import UserPerTab05Detail from "../views/UserPerTab05Detail.vue";
import UserPerTab03Detail from "../views/UserPerTab03Detail.vue";
import UserPerTab02Detail from "../views/UserPerTab02Detail.vue";
import UserPerTab04Detail from "../views/UserPerTab04Detail.vue";

import AdminStatus from "../views/AdminStatus.vue";
import AdminAdd from "../views/AdminAdd.vue";

const routes = [
  {
    path: "/",
    component: Frame,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/obj",
        name: "obj",
        component: Obj,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/opr",
        name: "opr",
        component: Opr,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/per",
        name: "per",
        component: Per,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/role",
        name: "role",
        component: Role,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/user",
        name: "user",
        component: User,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/ugadd",
        name: "ugAdd",
        component: UserGroupAdd,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/ugstatus",
        name: "ugStatus",
        component: UserGroupStatus,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/ugdetail",
        name: "ugDetail",
        component: UserGroupDetail,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/org",
        name: "org",
        component: Org,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/objDetail",
        name: "objDetail",
        component: ObjDetail,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/objAdd",
        name: "objAdd",
        component: ObjAdd,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/oprDetail",
        name: "oprDetail",
        component: OprDetail,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/oprAdd",
        name: "oprAdd",
        component: OprAdd,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/perAdd",
        name: "perAdd",
        component: PerAdd,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/perDetail",
        name: "perDetail",
        component: PerDetail,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/roleAdd",
        name: "roleAdd",
        component: RoleAdd,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/roleGroupAdd",
        name: "roleGroupAdd",
        component: RoleGroupAdd,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/roleDetail",
        name: "roleDetail",
        component: RoleDetail,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/roleGroupDetail",
        name: "roleGroupDetail",
        component: RoleGroupDetail,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/rolePer',
        name: 'rolePer',
        component: RolePer,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/rolePerDetail',
        name: 'rolePerDetail',
        component: RolePerDetail,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/rolePerAdd',
        name: 'rolePerAdd',
        component: RolePerAdd,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/rolePerGroupAdd',
        name: 'rolePerGroupAdd',
        component: RolePerGroupAdd,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/roleGroupPerDetail',
        name: 'roleGroupPerDetail',
        component: RoleGroupPerDetail,
        meta: {
          requiresAuth: false 
        }
      },
      {
        path: '/userPerStatus',
        name: 'userPerStatus',
        component: UserPerStatus,
        meta: {
          requiresAuth: false 
        }
      },
      {
        path: '/userPerTab01',
        name: 'userPerTab01',
        component: UserPerTab01,
        meta: {
          requiresAuth: false 
        }
      },
      {
        path: '/userPerTab05Detail',
        name: 'userPerTab05Detail',
        component: UserPerTab05Detail,
        meta: {
          requiresAuth: false 
        }
      },
      {
        path: '/userPerTab03Detail',
        name: 'userPerTab03Detail',
        component: UserPerTab03Detail,
        meta: {
          requiresAuth: false 
        }
      },
      {
        path: '/userPerTab02Detail',
        name: 'userPerTab02Detail',
        component: UserPerTab02Detail,
        meta: {
          requiresAuth: false 
        }
      },
      {
        path: '/userPerTab04Detail',
        name: 'userPerTab04Detail',
        component: UserPerTab04Detail,
        meta: {
          requiresAuth: false 
        }
      },
      {
        path: '/adminStatus',
        name: 'adminStatus',
        component: AdminStatus,
        meta: {
          requiresAuth: false 
        }
      },
      {
        path: '/adminAdd',
        name: 'adminAdd',
        component: AdminAdd,
        meta: {
          requiresAuth: false 
        }
      },
    ]
  }
  // { path: "*", component: NotFound }
];

export default routes;
