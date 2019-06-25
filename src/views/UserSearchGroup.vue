<template>
<div>
    <el-dialog title="사용자 검색" :visible.sync="visiablelocal" fullscreen @close="onClose()">

    <el-input
        placeholder="이름을 입력후 엔터를 입력해주세요"
        prefix-icon="el-icon-search" 
        @keyup.enter.native="onSearch()"
        v-model="search">
    </el-input>
    <el-table
        ref="multipleTableSearch"
        :data="searchData"
        height="calc(100vh - 200px)"
        style="margin-bottom:10px;"
        @selection-change="handleSelectionChange">
        <el-table-column
        type="index"
        width="100">
        </el-table-column>
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
        property="orgNm"
        label="소속사">
        </el-table-column>
        <el-table-column
        property="userEmpId"
        label="사번">
        </el-table-column>
        <el-table-column
        property="userNm"
        label="성명">
        </el-table-column>
        <el-table-column
        property="deptNm"
        label="조직">
        </el-table-column>
        <el-table-column
        property="membPostion"
        label="직급">
        </el-table-column>
        <el-table-column
        property="membRank"
        label="직책">
        </el-table-column>
    </el-table>
    <div style="text-align:right">
    <el-button type="primary" @click="onClose()">취소</el-button>
    <el-button type="primary" @click="onSubmit()">선택한 사용자 추가</el-button>
    </div>
</el-dialog>
</div>
</template>

<script>
import APIService from "../util/APIService";
export default {
  name: "usersearch",
  props: ["visiable"],
  model: {
    prop: "visiable",
    event: "visiablechange"
  },
  computed: {
    visiablelocal: {
      get: function() {
        return this.visiable;
      },
      set: function(value) {
        this.$emit("visiablechange", value);
      }
    }
  },
  data() {
    return {
      search: "",
      searchData: [],
      multipleSelectionSearch: []
    };
  },
  mounted() {
    this.searchData = [];
    this.search = "";
  },
  methods: {
    onSearch() {
      if (this.search) {
        this.searchData = [];
        var _t = { userNm: this.search };
        APIService.getUsers(this.search).then(data => {
          data.forEach(item => {
            this.searchData.push({
              orgId: item.orgId,
              orgNm: item.orgNm,
              userEmpId: item.userEmpId,
              userNm: item.userNm,
              deptNm: item.deptNm,
              membPostion: item.membPostion,
              membRank: item.membRank,
              deptId: item.deptId
            });
          });
        });
      }
    },
    onClose(event) {
      this.searchData = [];
      this.search = "";
      this.$emit("closed");
    },
    onSubmit(event) {
      this.$emit("clicked", this.tasks);
    },
    handleSelectionChange(val) {
      this.multipleSelectionSearch = val;
    }
  }
};
</script>

<style>
</style>
