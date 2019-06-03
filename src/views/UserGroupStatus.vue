<template>
 <div class="container">
    <div>
        <div class="p-3 float-left">    
            <h4>사용자 그룹 현황</h4>
        </div>
        <div class="p-3 float-right" style="margin-right:-15px;display:flex">
            <el-input placeholder="사용자 그룹명을 검색하세요" v-model="search" style="margin-right:10px;width:300px"></el-input>
             <el-button plain type="primary" @click="greet">사용자 그룹 추가</el-button> 
        </div>

        <div>
            <el-table
            :data="displayData.filter(data => !search || data.userGroupName.toLowerCase().includes(search.toLowerCase()))"
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
            prop="userGroupName"
            label="사용자그룹이름"
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
import APIService from "../util/APIService";
export default {
  data() {
    return {
      search: "",
      displayData: []
    };
  },
  created() {
    APIService.getUserGroupList().then(data => {
      this.displayData = data;
    });
  },
  methods: {
    greet: function() {
      this.$router.push({ name: "ugAdd" });
    },
    indexMethod(index) {
      return index + 1;
    },
    handleCurrentChange(val) {
      this.$router.push({ name: "ugDetail", params: { objs: val } });
    }
  }
};
</script>

<style>
</style>
