import { baseURL } from "./variables";
import axios from "axios";

export default {
  // OBJECT API
  getObjectList() {
    const url = `${baseURL}/api/object/list`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  getLegacyList() {
    const url = `${baseURL}/api/legacy/list`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  getObjectTypeList() {
    const url = `${baseURL}/api/object-type/list`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  postObject(_msg) {
    const url = `${baseURL}/api/object`;
    return axios
      .post(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data);
  },
  putObject(_msg) {
    const url = `${baseURL}/api/object`;
    return axios
      .put(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  deleteObject(_msg) {
    const url = `${baseURL}/api/object`;
    return axios
      .delete(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  ////////////////////////////////////////////////
  // OPERATION API
  getOperationList() {
    const url = `${baseURL}/api/operation/list`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  postOperation(_msg) {
    const url = `${baseURL}/api/operation`;
    return axios
      .post(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data);
      
  },
  putOperation(_msg) {
    const url = `${baseURL}/api/operation`;
    return axios
      .put(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  deleteOperation(_msg) {
    const url = `${baseURL}/api/operation`;
    return axios
      .delete(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  ////////////////////////////////////////////////
  // PERMISSION API
  getPermissionAllList() {
    const url = `${baseURL}/api/permission/all/list`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  getPermissionList() {
    const url = `${baseURL}/api/permission/list`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  getObjLegacyList(legacyId) {
    const url = `${baseURL}/api/object/legacy/${legacyId}`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  getObjTypeLegacyList(legacyId, objTypeId) {
    const url = `${baseURL}/api/object/object-type/${legacyId}/${objTypeId}`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  postPermission(_msg) {
    const url = `${baseURL}/api/permission`;
    return axios
      .post(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data);
  },
  putPermission(_msg) {
    const url = `${baseURL}/api/permission/put-add`;
    return axios
      .post(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  getPermissionLegacyList(legacyId) {
    const url = `${baseURL}/api/permission/legacy/${legacyId}`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  deleteUserPermissionGroupId(data) {
    const url = `${baseURL}/api/permission/group-id`;
    return axios
    .delete(url, { data }, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.data.results);
  },
  getPermissionByGroupId(groupId) {
    const url = `${baseURL}/api/permission/${groupId}`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  deletePermissionById(data) {
    const url = `${baseURL}/api/permission/permission-id`;
    return axios
    .delete(url, { data }, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.data.results);
  },

  ////////////////////////////////////////////////
  // ROLE API
  getRoleList() {
    const url = `${baseURL}/api/role/list`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  getRoleAllList() {
    const url = `${baseURL}/api/role/all/list`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  getRoleGroupList() {
    const url = `${baseURL}/api/role-group/list`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  getRoleGroupAllList() {
    const url = `${baseURL}/api/role-group/all/list`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  getRolePermissionItemList() {
    const url = `${baseURL}/api/role-permission/item-list`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  putRole(_msg) {
    const url = `${baseURL}/api/role`;
    return axios
      .put(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  deleteRole(_msg) {
    const url = `${baseURL}/api/role`;
    return axios
    .delete(url,  _msg , {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.data.results);
  },
  getRoleTypeList() {
    const url = `${baseURL}/api/role-type/list`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  postRole(_msg) {
    const url = `${baseURL}/api/role`;
    return axios
      .post(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data);
  },
  getRoleGroupByGroupId(groupId) {
    const url = `${baseURL}/api/role-group/${groupId}`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  putRoleGroup(_msg) {
    const url = `${baseURL}/api/role-group`;
    return axios
      .put(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  postRoleGroup(_msg) {
    const url = `${baseURL}/api/role-group`;
    return axios
      .post(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data);
  },
  getRoleLegacyByLegacyId(legacyId) {
    const url = `${baseURL}/api/role/legacy/${legacyId}`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  getRoleLegacyByLegacyIdroleTypeId(legacyId, roleTypeId) {
    const url = `${baseURL}/api/role/role-type/legacy/${legacyId}/${roleTypeId}`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  postRoleGroupPutAdd(_msg) {
    const url = `${baseURL}/api/role-group/put-add`;
    return axios
      .post(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  deleteRoleGroupByGroupId(_msg) {
    const url = `${baseURL}/api/role-group/group-id`;
    return axios
    .delete(url,  _msg , {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.data.results);
  },
  deleteRoleGroupByRoleGroupId(_msg) {
    const url = `${baseURL}/api/role-group/role-group-id`;
    return axios
    .delete(url,  _msg , {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.data.results);
  },

  ////////////////////////////////////////////////
  // ROLE PERMISSION API
  getRolePermissionItemList() {
    const url = `${baseURL}/api/role-permission/item-list`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  getRolePermissionGroupList() {
    const url = `${baseURL}/api/role-permission/group-list`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  getRolePermissionNonGroupByGroupId(groupId) {
    const url = `${baseURL}/api/role-permission/non-group/${groupId}`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  deleteRolePermissionPermissions(_msg) {
    const url = `${baseURL}/api/role-permission/permissions`;
    return axios
    .delete(url,  _msg , {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.data.results);
  },
  putRolePermission(_msg) {
    const url = `${baseURL}/api/role-permission`;
    return axios
      .put(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  postRolePermission(_msg) {
    const url = `${baseURL}/api/role-permission`;
    return axios
      .post(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data);
  },
  getRolePermissionGroupByGroupId(groupId) {
    const url = `${baseURL}/api/role-permission/group/${groupId}`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  getRoleGroupLegacyByLegacyId(legacyId) {
    const url = `${baseURL}/api/role-group/legacy/${legacyId}`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  postRolePermissionPutAdd(_msg) {
    const url = `${baseURL}/api/role-permission/put-add`;
    return axios
      .post(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },

  ////////////////////////////////////////////////
  // USER API
  getUserGroupList() {
    const url = `${baseURL}/api/user-group/group-id-list`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  getUsersFromGroupId(groupid) {
    const url = `${baseURL}/api/user-group/${groupid}`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  getOrgList() {
    const url = `${baseURL}/api/organization/list`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  getOrgMemberList(orgId, deptId) {
    const url = `${baseURL}/api/organization/users/${orgId}/${deptId}`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  getUsers(userNm) {
    const url = `${baseURL}/api/organization/get-users`;
    return axios.post(url, { userNm }).then(response => response.data.results);
  },
  setUserGroup(data) {
    const url = `${baseURL}/api/user-group`;
    return axios.post(url, data).then(response => response);
  },
  addUserGroup(data) {
    const url = `${baseURL}/api/user-group/put-add`;
    return axios.post(url, data).then(response => response);
  },
  removeUserGroup(data) {
    const url = `${baseURL}/api/user-group/user-group-id`;
    return axios.delete(url, { data }).then(response => response);
  },
  deleteUserGroup(data) {
    const url = `${baseURL}/api/user-group/group-id`;
    return axios.delete(url, { data }).then(response => response);
  },
  ////////////////////////////////////////////////
  // USER PERMISSION MANANGEMENT API
  getUsersPermission(userNm) {
    const url = `${baseURL}/api/user-permission/user-permissions/list`;
    return axios
    .get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.data.results);
  },
  getUsersPermissionGroupId(groupId) {
    const url = `${baseURL}/api/user-permission/user-permissions/${groupId}`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.result);
  },
  postUserPermission(_msg) {
    const url = `${baseURL}/api/user-permission/user-permissions`;
    return axios
      .post(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data);
  },
  putUserPermission(_msg) {
    const url = `${baseURL}/api/user-permission`;
    return axios
      .put(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  putUserPermissionAdd(_msg) {
    const url = `${baseURL}/api/user-permission/user-permissions/put-add`;
    return axios
      .post(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  deleteUserPermissionGroup(data) {
    const url = `${baseURL}/api/user-permission/group-id`;
    return axios
    .delete(url, { data }, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.data.results);
  },
  deleteUserPermissionGroupRow(data) {
    const url = `${baseURL}/api/user-permission/user-permissions`;
    return axios
    .delete(url, {data}, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.data);
  },
  postUserGroupPermission(_msg) {
    const url = `${baseURL}/api/user-permission/user-group-permissions`;
    return axios
      .post(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data);
  },
  getUsersGroupPermissionList() {
    const url = `${baseURL}/api/user-permission/user-group-permissions/list`;
    return axios
    .get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.data.results);
  },
  getUserGroupPermissionGroupId(groupId) {
    const url = `${baseURL}/api/user-permission/user-group-permissions/${groupId}`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.result);
  },
  putUserGroupPermissionAdd(_msg) {
    const url = `${baseURL}/api/user-permission/user-group-permissions/put-add`;
    return axios
      .post(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  getRolePermissionLegacyList() {
    const url = `${baseURL}/api/role-permission/all/legacy/list`;
    return axios
    .get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.data.results);
  },
  getRolePermissionByLegacy(legacyId) {
    const url = `${baseURL}/api/role-permission/all/legacy/${legacyId}`;
    return axios
    .get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.data.results);
  },
  getUserPermissionUserRoleList() {
    const url = `${baseURL}/api/user-permission/user-role/list`;
    return axios
    .get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.data.results);
  },
  getUserPermissionUserGroupRoleList() {
    const url = `${baseURL}/api/user-permission/user-group-role/list`;
    return axios
    .get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.data.results);
  },
  postUserPermissionUserGroupRole(_msg) {
    const url = `${baseURL}/api/user-permission/user-group-role`;
    return axios
      .post(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data);
  },
  postUserPermissionUserRole(_msg) {
    const url = `${baseURL}/api/user-permission/user-role`;
    return axios
      .post(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data);
  },
  getUserGroupPermissionUserGroupRole(groupId) {
    const url = `${baseURL}/api/user-permission/user-group-role/${groupId}`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.result);
  },
  postUserPermissionUserGroupRolePutAdd(_msg) {
    const url = `${baseURL}/api/user-permission/user-group-role/put-add`;
    return axios
      .post(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  deleteUserPermissionUserGroupRoleRow(data) {
    const url = `${baseURL}/api/user-permission/user-group-role`;
    return axios
    .delete(url, {data}, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.data.results);
  },
  getUserGroupPermissionUserRole(groupId) {
    const url = `${baseURL}/api/user-permission/user-role/${groupId}`;
    return axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.result);
  },
  postUserPermissionUserRolePutAdd(_msg) {
    const url = `${baseURL}/api/user-permission/user-role/put-add`;
    return axios
      .post(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  deleteUserPermissionUserRoleRow(data) {
    const url = `${baseURL}/api/user-permission/user-role`;
    return axios
    .delete(url, {data}, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.data.results);
  },

  ////////////////////////////////////////////////
  // ADMIN API
  getSuperAdminList() {
    const url = `${baseURL}/api/super-admin/list`;
    return axios
    .get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.data.results);
  },
  postSuperAdmin(_msg) {
    const url = `${baseURL}/api/super-admin`;
    return axios
      .post(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data);
  },
  getSuperAdminByAdminId(adminId) {
    const url = `${baseURL}/api/super-admin/${adminId}`;
    return axios
      .get(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  putSuperAdmin(_msg) {
    const url = `${baseURL}/api/super-admin`;
    return axios
      .put(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  deleteSuperAdmin(data) {
    const url = `${baseURL}/api/super-admin`;
    return axios
    .delete(url, {data}, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.data.results);
  },
  getAdminLegacyList() {
    const url = `${baseURL}/api/legacy/list`;
    return axios
    .get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.data.results);
  },
  postLegacy(_msg) {
    const url = `${baseURL}/api/legacy`;
    return axios
      .post(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data);
  },
  putLegacy(_msg) {
    const url = `${baseURL}/api/legacy`;
    return axios
      .put(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
  deleteLegacy(data) {
    const url = `${baseURL}/api/legacy`;
    return axios
    .delete(url, {data}, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.data.results);
  },
  postUsersDetailPermissions(_msg) {
    const url = `${baseURL}/api/user-permission/detail-permissions`;
    return axios
      .post(url, _msg, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data.results);
  },
};
