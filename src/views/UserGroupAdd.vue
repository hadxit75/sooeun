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
                        node-key="id"
                        :default-expanded-keys="[2, 3]"
                        :default-checked-keys="[5]"
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
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        label="Date"
                        width="120">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                        property="name"
                        label="Name"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        property="address"
                        label="Address"
                        show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    </div>
                
                </div>

        </div>
    </div>
</template>

<script>
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
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-08",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-06",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-07",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        }
      ],
      multipleSelection: [],
      data: [
        {
          id: 1,
          label: "Level one 1",
          children: [
            {
              id: 4,
              label: "Level two 1-1",
              children: [
                {
                  id: 9,
                  label: "Level three 1-1-1"
                },
                {
                  id: 10,
                  label: "Level three 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "Level one 2",
          children: [
            {
              id: 5,
              label: "Level two 2-1"
            },
            {
              id: 6,
              label: "Level two 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "Level one 3",
          children: [
            {
              id: 7,
              label: "Level two 3-1"
            },
            {
              id: 8,
              label: "Level two 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    // this.$http
    //   .get("http://dabin02272.cafe24.com:8090/api/object-type/list", {
    //     headers: { "Content-Type": "application/json" }
    //   })
    //   .then(response => {
    //     this.objSelect = response.data.results;
    //     var _self = this;
    //     _self.$http
    //       .get("http://dabin02272.cafe24.com:8090/api/legacy/list", {
    //         headers: { "Content-Type": "application/json" }
    //       })
    //       .then(response => {
    //         _self.legacySelect = response.data.results;
    //       });
    //   });
  },
  methods: {
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