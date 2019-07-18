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
import AdminTab01Detail from "../views/AdminTab01Detail.vue";
import AdminLegacyAdd from "../views/AdminLegacyAdd.vue";
import AdminTab02Detail from "../views/AdminTab02Detail.vue";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/",
    component: Frame,
    children: [
      {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/",
        name: "home",
        component: Home,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/obj",
        name: "obj",
        component: Obj,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/opr",
        name: "opr",
        component: Opr,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/per",
        name: "per",
        component: Per,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/role",
        name: "role",
        component: Role,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/user",
        name: "user",
        component: User,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/ugadd",
        name: "ugAdd",
        component: UserGroupAdd,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/ugstatus",
        name: "ugStatus",
        component: UserGroupStatus,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/ugdetail",
        name: "ugDetail",
        component: UserGroupDetail,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/org",
        name: "org",
        component: Org,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/objDetail",
        name: "objDetail",
        component: ObjDetail,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/objAdd",
        name: "objAdd",
        component: ObjAdd,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/oprDetail",
        name: "oprDetail",
        component: OprDetail,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/oprAdd",
        name: "oprAdd",
        component: OprAdd,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/perAdd",
        name: "perAdd",
        component: PerAdd,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/perDetail",
        name: "perDetail",
        component: PerDetail,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/roleAdd",
        name: "roleAdd",
        component: RoleAdd,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/roleGroupAdd",
        name: "roleGroupAdd",
        component: RoleGroupAdd,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/roleDetail",
        name: "roleDetail",
        component: RoleDetail,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/roleGroupDetail",
        name: "roleGroupDetail",
        component: RoleGroupDetail,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/rolePer",
        name: "rolePer",
        component: RolePer,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/rolePerDetail",
        name: "rolePerDetail",
        component: RolePerDetail,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/rolePerAdd",
        name: "rolePerAdd",
        component: RolePerAdd,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/rolePerGroupAdd",
        name: "rolePerGroupAdd",
        component: RolePerGroupAdd,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/roleGroupPerDetail",
        name: "roleGroupPerDetail",
        component: RoleGroupPerDetail,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/userPerStatus",
        name: "userPerStatus",
        component: UserPerStatus,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/userPerTab01",
        name: "userPerTab01",
        component: UserPerTab01,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/userPerTab05Detail",
        name: "userPerTab05Detail",
        component: UserPerTab05Detail,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/userPerTab03Detail",
        name: "userPerTab03Detail",
        component: UserPerTab03Detail,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/userPerTab02Detail",
        name: "userPerTab02Detail",
        component: UserPerTab02Detail,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/userPerTab04Detail",
        name: "userPerTab04Detail",
        component: UserPerTab04Detail,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/adminStatus",
        name: "adminStatus",
        component: AdminStatus,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/adminAdd",
        name: "adminAdd",
        component: AdminAdd,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/adminTab01Detail",
        name: "adminTab01Detail",
        component: AdminTab01Detail,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/adminLegacyAdd",
        name: "adminLegacyAdd",
        component: AdminLegacyAdd,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/adminTab02Detail",
        name: "adminTab02Detail",
        component: AdminTab02Detail,
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
  // { path: "*", component: NotFound }
];

export default routes;
