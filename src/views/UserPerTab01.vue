<template>
    <div>
    <div class="p-3 float-right" style="margin-right:-15px">
        <b-form inline>
            <b-form-input v-model="search" id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" v-on:keyup="searchHandler"></b-form-input>
        </b-form>
    </div>
    <div> 
    <el-table
        :data = displayData
        border
        height="530"
        @current-change="handleCurrentChange"
        style="width: 100"
       >

    <el-table-column
      type="index"
      width="70px"
      :index="indexMethod"
      label="순번"
      align="center">
    </el-table-column>

    <el-table-column
      prop="userPrmssnName"
      label="이름"
      header-align="center">
    </el-table-column>
    
    <el-table-column
      prop="userNm"
      label="사용자(그룹)이름"
      align="center">
    </el-table-column>

    <el-table-column
      prop=""
      label="Role(그룹)이름"
      align="center">
    </el-table-column>

    <el-table-column
      prop="prmssnName"
      label="권한(그룹)이름"
      header-align="center">
    </el-table-column>

     <el-table-column
      prop="userPrmssnComment"
      label="비고"
      header-align="center">
    </el-table-column>
     
  </el-table>
    </div>
    </div>

</template>


<script>
import APIService from '../util/APIService';
export default {
  name: "obj",
  data() {
    return {
      listData: [],
      listData2: [],
      listData3: [],
      search: "",
      displayData: [],
      legacyData: [],
      spanArr: []
    };
  },

  created() {
    APIService.getUsersPermission().then(response => {
        this.listData = response;
        this.displayData = this.listData;

          var _self = this
          APIService.getUsersGroupPermissionList().then(response => {
            _self.displayData.push(...response);
          });

           APIService.getUserPermissionUserRoleList().then(response => {
            _self.displayData.push(...response);
          });

           APIService.getUserPermissionUserGroupRoleList().then(response => {
            _self.displayData.push(...response);
          });

       });
  },
  methods: {
    test() {
      //console.log(this.listData);
    },
    handleCurrentChange(val) {
      // console.log("isUserGroup",val.isUserGroup)
      // console.log("isRoleGroup",val.isRoleGroup)
      // console.log("isPrmssnGroup",val.isPrmssnGroup)

      if(val.isUserGroup == 0 && val.isRoleGroup == 0 && val.isPrmssnGroup == 1){
        this.$router.push({ name: "userPerTab05Detail", params: { objs: val } });

      } else if (val.isUserGroup == 1 && val.isRoleGroup == 0 && val.isPrmssnGroup == 1) {
        this.$router.push({ name: "userPerTab03Detail", params: { objs: val } });

      } else if (val.isUserGroup == 0 && val.isRoleGroup == 1 && val.isPrmssnGroup == 0) {
        //alert('작업중')
        this.$router.push({ name: "userPerTab04Detail", params: { objs: val } });

      }else if (val.isUserGroup == 1 && val.isRoleGroup == 1 && val.isPrmssnGroup == 0) {
        //alert('작업중')
        this.$router.push({ name: "userPerTab02Detail", params: { objs: val } });

      }else {
        alert('Error! 관리자에게 확인하세요.')
      }
    },
    searchHandler() {
      var self = this;
      if (this.search) {
        this.displayData = this.listData.filter(
          data =>
            !self.search ||
            data.userPrmssnName.toLowerCase().includes(self.search.toLowerCase()) ||
            data.userNm.toLowerCase().includes(self.search.toLowerCase()) ||
            data.prmssnName.toLowerCase().includes(self.search.toLowerCase())
        );
      } else {
        this.displayData = this.listData;
      }
    },
    indexMethod(index) {
      return index + 1;
    }
  }
};
</script>
<style>
td {
  cursor: pointer;
}
</style>
</style>
