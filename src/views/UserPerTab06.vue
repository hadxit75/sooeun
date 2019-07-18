<template>
<div class="row">
        <div class="col-md-2" style="margin-top:30px">
        <el-button plain type="success" @click="onUserSearch()" icon="el-icon-search" style="width:100%">사용자 개별 검색</el-button> 
        </div>
        <div class="col-md-12" style="margin-top:10px;margin-bottom:10px"></div>
    <user-search :visiable="invokeFlag" @closed="onCloseModal" @clicked="onClickChild"></user-search>


    <el-table
        :data = displayData
        border
        height="530"
        style="width: 100"
        :span-method="objectSpanMethod"
       >
   <el-table-column
      type="index"
      :index="indexMethod"
      label="순번"
      align="center">
    </el-table-column>

    <el-table-column
      width="200px"
      prop="orgNm"
      label="소속사"
      align="center">
    </el-table-column>

    <el-table-column
      prop="userEmpId"
      label="사번"
      align="center">
    </el-table-column>

    <el-table-column
      prop="userNm"
      label="성명"
      header-align="center">
    </el-table-column>

     <el-table-column
      prop="deptNm"
      label="조직"
      header-align="center">
    </el-table-column>

    <el-table-column
      prop="membPostion"
      label="직급"
      header-align="center">
    </el-table-column>

    <el-table-column
      prop="membRank"
      label="직책"
      header-align="center">
    </el-table-column>

    <el-table-column
      prop="legacyName"
      label="원천시스템"
      width="120px"
      header-align="center">
    </el-table-column>

    <el-table-column
      prop="objectName"
      label="객체이름"
      width="120px"
      header-align="center">
    </el-table-column>

    <el-table-column
      prop="userPrmssnName"
      label="권한(그룹)이름"
      width="120px"
      header-align="center">
    </el-table-column>

    <el-table-column
      prop="userPrmssnComment"
      label="비고"
      header-align="center">
    </el-table-column>
     
  </el-table>
    </div>

    
</template>

<script>
import APIService from "../util/APIService";
import UserSearch from "./UserSearch.vue";
export default {
  components: {
    UserSearch
  },
  data() {
    return {
      //유저
      legacySelect: [],
      invokeFlag: false,
      groupName: "",
      groupcomment: "",
      tableData: [],
      multipleSelection: [],
      data: [],
      org: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      //권한
      tasks: [],
      //tasksClone: [],
      legacySelect: [],
      prmssSelect: [],
      prmssSelectClone: [],
      slegacyId: null,
      userPrmssnName: null,
      userPrmssnComment: null,

      spanArr:[],
      displayData: []
    };
  },
  created() {
    
  },
  mounted() {},
  methods: {
    onClickChild(evt) {
      this.invokeFlag = false;
      var _startpoint = this.tableData.length;
      this.tableData.push(...evt);
      var _endpoint = this.tableData.length + 1;

      var data = [];

      this.tableData.forEach(item => {
        var _h = {
          userId: item.orgId + ":" + item.userEmpId
        };
        data.push(_h);
      });

      //console.log(data);

      var self = this;
        APIService.postUsersDetailPermissions(data).then(response => {
        self.displayData = response;
        self.getSpanArr(self.displayData);

        self.tableData = [];
      });

    },
    onCloseModal() {
      this.invokeFlag = false;
    },
    onUserSearch() {
      this.invokeFlag = true;
    },
    backToStatus() {
      this.$router.go();
    },
    recursiveDepth(sdata, i, parentId) {
      var _parent = [];
      var self = this;

      sdata.forEach(item => {
        if (item.deptDepth == i && item.deptParent == parentId) {
          var _child = self.recursiveDepth(sdata, i + 1, item.deptId);
          _parent.push({
            id: item.deptSeq,
            label: item.deptNm,
            children: _child,
            obj: item
          });
        }
      });

      return _parent;
    },
    validateStatus() {
      return !(this.multipleSelection.length > 0);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    cancle: function() {
      this.$router.reload();
    },
    indexMethod(index) {
        return index + 1;
    },
    getSpanArr(data) {　
          for (var i = 0; i < data.length; i++) {
            if (i === 0) {
              this.spanArr.push(1);
              this.pos = 0
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
        if ( columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 4|| columnIndex === 5) {
            const _row = this.spanArr[rowIndex];
            const _col = _row > 0 ? 1 : 0;
            return {
                  rowspan: _row,
                  colspan: _col
            }
          }
      }
    }

};
</script>