<template>
 <div class="container">
    <div>
        <div class="p-3 float-left">    
            <h4>연산 관리</h4>
        </div>
        <div class="p-3 float-right" style="margin-right:-15px">
        <b-form inline>
            <b-form-input v-model="search" id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" v-on:keyup="searchHandler"></b-form-input>
            <!-- <b-button v-on:click="greet" variant="warning" >추가</b-button> -->
             <el-button plain type="primary" @click="greet">추가</el-button> 
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
        prop="oprtnName"
        label="연산이름"
        header-align="center">
        </el-table-column>
        
        <el-table-column
        prop="comment"
        label="비고"
        align="center">
        </el-table-column>
        
    </el-table>
        </div>
    </div>
</div>
</template>

<script>
import APIService from '../util/APIService';
export default {
  name: "opr",
  data() {
    return {
      listData: [],
      search: "",
      displayData: [],
      legacyData: []
    };
  },
  created() {
    var self = this;
    APIService.getOperationList().then(response => {
        this.listData = response;
        this.displayData = this.listData;
      });
  },
  methods: {
    greet: function() {
      this.$router.push({ name: "oprAdd" });
    },
    handleCurrentChange(val) {
      //console.log(val)
      this.$router.push({ name: "oprDetail", params: { objs: val } });
    },
    searchHandler() {
      //console.log(" searchHandler")
      var self = this;
      if (this.search) {
        this.displayData = this.listData.filter(
          data =>
            !self.search ||
            data.oprtnName.toLowerCase().includes(self.search.toLowerCase())
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
