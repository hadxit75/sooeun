<template>
  <div class="container">
        <div>
         
                <div class="row">
                     <div class="col-md-12">
                         <h4>사용자 그룹 상세</h4>
                     </div>
                    <div class="col-md-2">
                       <label>사용자 그룹명</label>
                        <el-input
                            v-model="groupName" disabled>
                        </el-input>
                    </div>
                    <div class="col-md-2">
                        <label>비고</label>
                        <el-input
                            v-model="groupcomment" disabled>
                        </el-input>
                 
                     </div>
                      <div class="col-md-2" style="margin-top:30px">
                      <el-button plain type="success" icon="el-icon-search" style="width:100%">사용자 개별 검색</el-button> 
                     </div>
                      <div class="col-md-2" style="margin-top:30px">
                      <el-button plain type="primary" @click="onModifyEvent()" style="width:100%">수정</el-button> 
                     </div>
                     <div class="col-md-2" style="margin-top:30px">
                      <el-button plain type="primary" @click="onDeleteEvent()" style="width:100%">삭제</el-button> 
                     </div>
                      <div class="col-md-2"  style="margin-top:30px">
                      <el-button plain type="danger"  @click="backToStatus()" style="width:100%">취소</el-button> 
                     </div>
                     <div class="col-md-12" style="margin-top:10px;margin-bottom:10px"></div>
                    <div class="col-md-4">
                        <el-card shadow="never">
                           <p>조직도</p>
                        <el-tree
                        ref="tree"
                        style="height:calc(100vh - 400px);overflow-y:scroll"
                        :data="data"
                        show-checkbox
                         @check-change="handleCheckChange"
                        node-key="id"
                        :props="defaultProps">
                        </el-tree>
                        </el-card>
                    </div>
                    <div class="col-md-8">
                       <el-card shadow="never">
                          <p>선택된 사용자</p>
                        <el-table
                        ref="multipleTable"
                        :data="tableData"
                        style="width: 100%;height:calc(100vh - 400px);overflow-y:scroll"
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
                       </el-card>
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
      // legacyId: this.$route.params.objs.legacyId,
      //   legacyName: this.$route.params.objs.legacyName,
      //   objectTypeId: this.$route.params.objs.objectTypeId,
      //   objectTypeName: this.$route.params.objs.objectTypeName,
      groupId: this.$route.params.objs.groupId,
      userGroupName: this.$route.params.objs.userGroupName,
      userGroupComment: this.$route.params.objs.userGroupComment,

      //   objectName: this.$route.params.objs.objectName,
      //   objectComment: this.$route.params.objs.objectComment,
      legacySelect: [],
      objSelect: [],
      groupName: "",
      orders: 1,
      groupcomment: "",
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
    this.groupName = this.userGroupName;
    this.groupcomment = this.userGroupComment;
    // console.log(this.groupId);

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

    var self = this;
    console.log(this.groupId);
    APIService.getUsersFromGroupId(this.groupId).then(data => {
      // console.log(item);
      data.forEach(item => {
        // var _t = { userEmpId: item.userId };
        console.log(item);
        self.tableData.push(item);
        self.orders = item.orders + 1;
      });

      // this.tableData = data.
      // console.log(data);
    });
    // console.log(this.tableData);
  },
  mounted() {},
  methods: {
    backToStatus() {
      this.$router.push("/ugstatus");
    },
    onDeleteEvent() {
      var _t = {
        groupId: this.groupId
      };

      var _item = [_t];

      APIService.deleteUserGroup(_item)
        .then(result => {
          this.$message({
            type: "success",
            message: "삭제가 완료되었습니다."
          });

          this.$router.push("/ugstatus");
          // console.log(result);
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: "에러가 발생했습니다."
          });
          console.log(error.config);
        });
    },
    onModifyEvent() {
      // var self = this;
      // var sendItem = [];
      // var idx = 0;
      // this.multipleSelection.forEach(item => {
      //   var _t = {
      //     userId: item.userEmpId,
      //     userGroupName: self.groupName,
      //     orders: idx++,
      //     comment: self.groupcomment
      //   };
      //   sendItem.push(_t);
      // });
      // if (sendItem.length > 0) {
      //   APIService.setUserGroup(sendItem).then(result => console.log(result));
      // }
    },
    handleCheckChange(mdata, checked, indeterminate) {
      if (checked) {
        var self = this;
        console.log(mdata);

        APIService.getOrgMemberList(mdata.obj.orgId, mdata.obj.deptId).then(
          data => {
            // console.log("d", data);
            // this.tableData = [];
            data.forEach(item => {
              this.tableData.push({
                userEmpId: item.userEmpId,
                userName: item.userNm,
                org: mdata.obj.deptNm,
                position: item.membPostion,
                level: item.membRank,
                deptId: item.deptId
              });
            });
          }
        );
      } else {
        this.tableData = this.tableData.filter(item => {
          if (item.deptId != mdata.obj.deptId) {
            return item;
          }
        });
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
      console.log(this.multipleSelection);
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