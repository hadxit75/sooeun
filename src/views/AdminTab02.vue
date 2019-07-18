<template>
    <div>
    <div class="p-3 float-right" style="margin-right:-15px">
        <b-form inline>
            <b-form-input v-model="search" id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" v-on:keyup="searchHandler"></b-form-input>
            <el-button plain type="primary" @click="InsertEvent">원천시스템 추가</el-button> 
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
      width="100px"
      :index="indexMethod"
      label="순번"
      align="center">
    </el-table-column>

    <el-table-column
      prop="legacyName"
      label="원천시스템"
      width="300px"
      header-align="center">
    </el-table-column>
    
    <el-table-column
      prop="comment"
      label="비고"
      width="300px"
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
    APIService.getAdminLegacyList().then(response => {
        this.listData = response;
        this.displayData = this.listData;
       });
  },
  methods: {
    test() {
      //console.log(this.listData);
    },
    handleCurrentChange(val) {
      //alert("작업중");
      this.$router.push({ name: "adminTab02Detail", params: { objs: val } });
    },
    searchHandler() {
      var self = this;
      if (this.search) {
        this.displayData = this.listData.filter(
          data =>
            !self.search ||
            data.legacyName.toLowerCase().includes(self.search.toLowerCase()) ||
            data.orgNm.toLowerCase().includes(self.search.toLowerCase())
        );
      } else {
        this.displayData = this.listData;
      }
    },
    indexMethod(index) {
      return index + 1;
    },
    InsertEvent: function() {
      this.$router.push({ name: "adminLegacyAdd" });
    },
  }
};
</script>
<style>
td {
  cursor: pointer;
}
</style>
</style>
