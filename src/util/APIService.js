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
  ////////////////////////////////////////////////
  // PERMISSION API
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
  getUserGroupList() {
    const url = `${baseURL}/api/user-group/list`;
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
  }
};
