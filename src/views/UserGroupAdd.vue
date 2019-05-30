<template>
  <div class="container">
        <div>
         
                <div class="row">
                     <div class="col-md-12">
                         <h4>사용자 그룹 추가</h4>
                     </div>
                    <div class="col-md-3">
                       <label>사용자 그룹명</label>
                        <el-input
                            v-model="groupName">
                        </el-input>
                    </div>
                    <div class="col-md-3">
                        <label>비고</label>
                        <el-input
                            v-model="comment">
                        </el-input>
                 
                     </div>
                      <div class="col-md-2" style="margin-top:30px">
                      <el-button plain type="success" icon="el-icon-search" style="width:100%">사용자 검색</el-button> 
                     </div>
                      <div class="col-md-2" style="margin-top:30px">
                      <el-button plain type="primary"  style="width:100%">확인</el-button> 
                     </div>
                      <div class="col-md-2"  style="margin-top:30px">
                      <el-button plain type="danger"  style="width:100%">취소</el-button> 
                     </div>
                     <div class="col-md-12" style="margin-top:10px;margin-bottom:10px"></div>
                    <div class="col-md-4">
                        <el-card shadow="never">
                        <el-tree
                        :data="data"
                        show-checkbox
                         @check-change="handleCheckChange"
                        node-key="id"
                        :props="defaultProps">
                        </el-tree>
                        </el-card>
                    </div>
                    <div class="col-md-8">
                        <el-table
                        ref="multipleTable"
                        :data="tableData"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        
                        <el-table-column
                        property="userEmpId"
                        label="사번">
                        </el-table-column>
                        <el-table-column
                        property="position"
                        label="직책">
                        </el-table-column>
                    </el-table>
                    </div>
                
                </div>

        </div>
    </div>
</template>

<script>
import APIService from "../util/APIService";
export default {
  components: {
    name: "AddItem"
  },
  data() {
    return {
      //   legacyId: this.$route.params.objs.legacyId,
      //   legacyName: this.$route.params.objs.legacyName,
      //   objectTypeId: this.$route.params.objs.objectTypeId,
      //   objectTypeName: this.$route.params.objs.objectTypeName,
      //   objectId: this.$route.params.objs.objectId,
      //   objectName: this.$route.params.objs.objectName,
      //   objectComment: this.$route.params.objs.objectComment,
      legacySelect: [],
      objSelect: [],
      groupName: "",
      comment: "",
      tableData: [],
      multipleSelection: [],
      data: [],
      org: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    APIService.getOrgList().then(data => {
      // var dummy = data.find(item => item.deptDepth == 0);
      var _parent = [];

      data.forEach(item => {
        if (item.deptDepth == 1) {
          var _child = this.recursiveDepth(data, 2, item.deptId);
          _parent.push({
            id: item.deptSeq,
            label: item.deptNm,
            children: _child,
            obj: item
          });
          // console.log("p", _parent);
        }
      });
      this.data = _parent;
    });
  },
  mounted() {},
  methods: {
    handleCheckChange(data, checked, indeterminate) {
      if (checked) {
        var self = this;
        console.log(data, checked, indeterminate);
        APIService.getOrgMemberList(data.obj.orgId, data.obj.deptId).then(
          data => {
            console.log("d", data);
            this.tableData = [];
            data.forEach(item => {
              this.tableData.push({
                userEmpId: item.userEmpId,
                position: item.membPostion
              });
            });
          }
        );
      }
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
          // console.log(_parent);
        }
      });

      return _parent;
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
    edit: function() {
      //   //
      //   var self = this;
      //   this.$http
      //     .put("http://dabin02272.cafe24.com:8090/api/object", {
      //       objectId: self.objectId,
      //       objectTypeId: self.objectTypeId,
      //       objectName: self.objectName,
      //       legacyId: self.legacyId,
      //       objectComment: self.objectComment
      //     })
      //     .then(response => {
      //       this.$message({
      //         type: "success",
      //         message: "수정이 완료되었습니다."
      //       });
      //       this.$router.push({ name: "obj" });
      //     })
      //     .catch(error => {
      //       this.$message({
      //         type: "error",
      //         message: "에러가 발생하였습니다."
      //       });
      //       console.log(error.config);
      //     });
    },
    del: function() {
      //   this.$confirm("삭제 하시겠습니까?", "Warning", {
      //     confirmButtonText: "확인",
      //     cancelButtonText: "취소",
      //     type: "warning"
      //   })
      //     .then(() => {
      //       var self = this;
      //       this.$http
      //         .delete("http://dabin02272.cafe24.com:8090/api/object", {
      //           data: { objectId: self.objectId }
      //         })
      //         .then(response => {
      //           this.$router.push({ name: "obj" });
      //         })
      //         .catch(error => {
      //           this.$message({
      //             type: "error",
      //             message: "에러가 발생하였습니다."
      //           });
      //           console.log(error.config);
      //         });
      //       this.$message({
      //         type: "success",
      //         message: "삭제가 완료되었습니다."
      //       });
      //     })
      //     .catch(() => {
      //       this.$message({
      //         type: "info",
      //         message: "삭제가 취소되었습니다."
      //       });
      //     });
    },
    cancle: function() {
      this.$router.go(-1);
    }
  }
};
</script>