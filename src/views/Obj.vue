
<template>
 <div class="container">
   <div>
    <div class="p-3 float-left">    
        <h4>객체현황</h4>
    </div>
    <div class="p-3 float-right">
        <b-form inline>
            <b-form-input v-model="search" id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" v-on:keyup="searchHandler"></b-form-input>
            <b-button v-on:click="greet" variant="warning" >추가</b-button>
        </b-form>
    </div>
    <div> 
    <el-table
        :data = displayData
        border
        height="530"
        @current-change="handleCurrentChange"
    style="width: 100">
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
      prop="objectComment"
      label="비고"
      header-align="center">
    </el-table-column>
     
  </el-table>
    </div>
    </div>
 </div>
</template>

<script>
import APIService from "../util/APIService";

export default {
  name: "obj",
  data() {
    return {
      activeIndex: "2",
      listData: [],
      listData2: [],
      listData3: [],
      search: "",
      displayData: [],
      legacyData: []
    };
  },
  created() {
    var self = this;
    APIService.getObjectList().then(data => {
      this.listData = data;
      this.displayData = this.listData;

      var _self = this;
      _self.$http
        .get("http://dabin02272.cafe24.com:8090/api/legacy/list", {
          headers: { "Content-Type": "application/json" }
        })
        .then(response => {
          _self.listData2 = _self.listData.filter(item => {
            var _value = response.data.results.find(
              sitem => item.legacyId == sitem.legacyId
            ).legacyName;

            _value = _value ? _value : "";
            item["legacyName"] = _value;
            return item;
          });
          _self.displayData = _self.listData2;
          _self.listData = _self.listData2;
        });

      var _self2 = this;
      _self2.$http
        .get("http://dabin02272.cafe24.com:8090/api/object-type/list", {
          headers: { "Content-Type": "application/json" }
        })
        .then(response => {
          _self2.listData3 = _self.listData.filter(item => {
            var _value = response.data.results.find(
              sitem => item.objectTypeId == sitem.objectTypeId
            ).objectTypeName;

            _value = _value ? _value : "";
            item["objectTypeName"] = _value;
            return item;
          });
          _self.displayData = _self.listData3;
          _self.listData = _self.listData3;
        });
    });
  },
  methods: {
    test() {
      //console.log(this.listData);
    },
    rowSelected(items) {
      this.$router.push({
        name: "objDetail",
        params: { objs: items }
      });
    },
    greet: function() {
      this.$router.push({ name: "objAdd" });
    },
    handleCurrentChange(val) {
      //console.log(val)
      this.$router.push({ name: "objDetail", params: { objs: val } });
    },
    searchHandler() {
      //console.log(" searchHandler")
      var self = this;
      if (this.search) {
        this.displayData = this.listData.filter(
          data =>
            !self.search ||
            (data.objectName
              ? data.objectName
                  .toLowerCase()
                  .includes(self.search.toLowerCase())
              : 1 == 2) ||
            (data.legacyName
              ? data.legacyName
                  .toLowerCase()
                  .includes(self.search.toLowerCase())
              : 1 == 2) ||
            (data.comment
              ? data.comment.toLowerCase().includes(self.search.toLowerCase())
              : 1 == 2)
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

