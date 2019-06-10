<template>
  <div class="container">
    <div>
    <div class="p-3 float-left">    
        <h4>권한현황</h4>
    </div>
    <div class="p-3 float-right" style="margin-right:-15px">
        <b-form inline>
            <b-form-input v-model="search" id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" v-on:keyup="searchHandler"></b-form-input>
               <el-button plain type="primary" @click="greet">추가</el-button> 
        </b-form>
    </div>
    <div> 
    <el-table
        :data = displayData
        border
        height="530"
        @current-change="handleCurrentChange"
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
      prop="objectTypeName"
      label="객체종류"
      align="center">
    </el-table-column>

    <el-table-column
      prop="objectName"
      label="객체이름"
      align="center">
    </el-table-column>

    <el-table-column
      prop="oprtnName"
      label="연산이름"
      header-align="center">
    </el-table-column>

     <el-table-column
      prop="prmssnName"
      label="권한(그룹)이름"
      header-align="center">
    </el-table-column>

     <el-table-column
      prop="prmssnComment"
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
      legacyData: [],
      spanArr: []
    };
  },

  created() {
    APIService.getPermissionList().then(response => {
        this.listData = response;
        this.displayData = this.listData;
        this.getSpanArr(this.displayData);
      });
  },
  methods: {
    greet: function() {
      this.$router.push({ name: "perAdd" });
    },
    handleCurrentChange(val) {
      //console.log(val)
      this.$router.push({ name: "perDetail", params: { objs: val } });
    },
    searchHandler() {
      //console.log(" searchHandler")
      var self = this;
      if (this.search) {
        this.displayData = this.listData.filter(
          data =>
            !self.search ||
            data.legacyName.toLowerCase().includes(self.search.toLowerCase()) ||
            data.prmssnName.toLowerCase().includes(self.search.toLowerCase())
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
          // Determine if the current element is the same as the previous element
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
      if (columnIndex === 5 || columnIndex === 6) {
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
