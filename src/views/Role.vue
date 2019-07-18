<template>
 <div class="container">
   <div>
    <div class="p-3 float-left">    
        <h4>Role 현황</h4>
    </div>
    <div class="p-3 float-right" style="margin-right:-15px">
        <b-form inline>
            <b-form-input v-model="search" id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" v-on:keyup="searchHandler"></b-form-input>
             <el-button plain type="primary" @click="addRole">Role 추가</el-button> 
        </b-form>
    </div>
    <div> 
    <el-table
        :data = displayData
        border
        height="330"
        @current-change="handleCurrentChange"
        style="width: 100">

    <el-table-column
      type="index"
      :index="indexMethod"
      label="순번"
      width="70px"
      align="center">
    </el-table-column>

    <el-table-column
      prop="legacyName"
      label="원천시스템"
      header-align="center">
    </el-table-column>
    
    <el-table-column
      prop="roleTypeName"
      label="Role 유형"
      align="center">
    </el-table-column>

    <el-table-column
      prop="roleName"
      label="Role 이름"
      align="center">
    </el-table-column>

     <el-table-column
      prop="roleComment"
      label="비고"
      header-align="center">
    </el-table-column>
     
  </el-table>

    </div>
    <br/>
    <div class="p-3 float-left">    
        <h4>Role 그룹현황</h4>
    </div>
    <div class="p-3 float-right">
        <b-form inline>
            <b-form-input v-model="search" id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" v-on:keyup="searchHandler2"></b-form-input>
            <el-button plain type="primary" @click="addRoleGroup">Role 그룹추가</el-button> 
        </b-form>
    </div>
    <div> 
    <el-table
        :data = roleGroup
        border
        height="330"
        @current-change="handleCurrentChange2"
        style="width: 100"
        :span-method="objectSpanMethod">

    <el-table-column
      type="index"
      width="70px"
      :index="indexMethod"
      label="순번"
      align="center">
    </el-table-column>

    <el-table-column
      prop="legacyName"
      label="원천시스템"
      header-align="center">
    </el-table-column>
    
    <el-table-column
      prop="roleTypeName"
      label="Role 유형"
      align="center">
    </el-table-column>

    <el-table-column
      prop="roleGroupName"
      label="Role 그룹이름"
      align="center">
    </el-table-column>

     <el-table-column
      prop="roleGroupComment"
      label="비고"
      header-align="center">
    </el-table-column>
     
  </el-table>
    </div>
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
      roleGroup: [],
      spanArr: []
    };
  },

  created() {
    APIService.getRoleAllList().then(response => {
        this.listData = response;
        this.displayData = this.listData;
      
        var _self = this;

        APIService.getRoleGroupAllList().then(response => {
            _self.roleGroup = response;
            _self.getSpanArr(_self.roleGroup );
          });
      });
  },
  methods: {
    addRole: function() {
      this.$router.push({ name: "roleAdd" });
    },
    addRoleGroup: function() {
      this.$router.push({ name: "roleGroupAdd" });
    },
    handleCurrentChange(val) {
      //console.log(val)
      this.$router.push({ name: "roleDetail", params: { objs: val } });
    },
    handleCurrentChange2(val) {
      //console.log(val)
      this.$router.push({ name: "roleGroupDetail", params: { objs: val } });
    },
    searchHandler() {
      var self = this;
      if (this.search) {
        this.displayData = this.listData.filter(
          data =>
            !self.search ||
            data.legacyName.toLowerCase().includes(self.search.toLowerCase()) ||
            data.roleTypeName
              .toLowerCase()
              .includes(self.search.toLowerCase()) ||
            data.roleTypeName
              .toLowerCase()
              .includes(self.search.toLowerCase()) ||
            data.roleName.toLowerCase().includes(self.search.toLowerCase()) ||
            data.comment.toLowerCase().includes(self.search.toLowerCase())
        );
      } else {
        this.displayData = this.listData;
      }
    },
    searchHandler2() {
      var self = this;
      if (this.search) {
        this.displayData = this.listData.filter(
          data =>
            !self.search ||
            data.legacyName.toLowerCase().includes(self.search.toLowerCase()) ||
            data.roleTypeName
              .toLowerCase()
              .includes(self.search.toLowerCase()) ||
            data.roleGroupName
              .toLowerCase()
              .includes(self.search.toLowerCase()) ||
            data.roleGroupComment
              .toLowerCase()
              .includes(self.search.toLowerCase())
        );
      } else {
        this.displayData = this.listData;
      }
    },
    indexMethod(index) {
      return index + 1;
    },
    getSpanArr(data) {
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          if (data[i].groupId === data[i - 1].groupId) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 3 || columnIndex === 4) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        
        return {
          rowspan: _row,
          colspan: _col
        };
      }
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
