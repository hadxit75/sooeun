<template>
  <div class="container">
        <div>
         
                <div class="row">
                     <div class="col-md-12">
                         <h4>관리자 추가</h4>
                     </div>
                     <div class="col-md-2" style="margin-top:30px">
                      <el-button plain type="success" @click="onUserSearch()" icon="el-icon-search" style="width:100%">사용자 개별 검색</el-button> 
                     </div>
                      <div class="col-md-2" style="margin-top:30px">
                      <el-button plain type="primary" @click="onInsertEvent()" :disabled="validateStatus()" style="width:100%">확인</el-button> 
                     </div>
                      <div class="col-md-2"  style="margin-top:30px">
                      <el-button plain type="danger"  @click="backToStatus()" style="width:100%">취소</el-button> 
                     </div>
                     <div class="col-md-12" style="margin-top:10px;margin-bottom:10px"></div>
                    <div class="col-md-2">
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
                    <div class="col-md-10">
                       <el-card shadow="never">
                          <p>선택된 사용자</p>
                          <el-table
                              ref="multipleTable"
                              :data="tableData"
                              style="width: 100%;height:calc(100vh - 400px);overflow-y:scroll"
                              @selection-change="handleSelectionChange"
                              >
                              <el-table-column
                                type="index"
                                width="100">
                              </el-table-column>
                              <el-table-column
                                type="selection"
                                width="55">
                              </el-table-column>
                              <el-table-column
                              label="원천시스템"
                              width="150">
         <template slot-scope="scope">
                                <el-select v-model="scope.row.legacyId"  @change="legacyChange(scope.$index, $event)" placeholder="Select">
                                  <el-option
                                    v-for="item in legacySelect"
                                    :key="item.legacyId"
                                    :label="item.legacyName"
                                    :value="item.legacyId">
                                  </el-option>
                                </el-select>
         </template>   
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
                              <el-table-column
                              label="코멘트">
                              <template slot-scope="scope2">
                              <el-input placeholder="Please input" v-model="scope2.row.adminComment"></el-input>
                              </template>
                              </el-table-column>
                          </el-table>
                       </el-card>
                    </div>
                
                </div>

        </div>
         <user-search :visiable="invokeFlag" @closed="onCloseModal" @clicked="onClickChild"></user-search>
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
      legacySelect: [],
      invokeFlag: false,
      objSelect: [],
      groupName: "",
      groupcomment: "",
      tableData: [],
      multipleSelection: [],
      data: [],
      org: [],
      legacySelect: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      legacyId: null
    };
  },
  created() {
    APIService.getOrgList().then(data => {
      var _parent = [];

      data.forEach(item => {
        if (item.deptDepth == 1) {
          var _child = this.recursiveDepth(
            data,
            2,
            item.orgId + ":" + item.deptId
          );

          _parent.push({
            id: item.orgId + ":" + item.deptId + ":" + item.deptSeq,
            label: item.deptNm,
            children: _child,
            obj: item
          });
        }
      });
      this.data = _parent;

      var _self = this;
      APIService.getLegacyList().then(response => {
        _self.legacySelect = response;
      });
    });
  },
  mounted() {},
  methods: {
    onClickChild(evt) {
      this.invokeFlag = false;
      var _startpoint = this.tableData.length;
      this.tableData.push(...evt);
      var _endpoint = this.tableData.length + 1;
      for (var i = _startpoint; i < _endpoint; i++) {
        this.$refs.multipleTable.toggleRowSelection(this.tableData[i]);
      }
    },
    onCloseModal() {
      this.invokeFlag = false;
    },
    onUserSearch() {
      this.invokeFlag = true;
    },
    backToStatus() {
      this.$router.push("/ugstatus");
    },
    onInsertEvent() {
      var self = this;

      var sendItem = [];
      var idx = 0;

      this.multipleSelection.forEach(item => {
        var _t = {
          userId: item.orgId + ":" + item.userEmpId,
          legacyId: item.legacyId,
          adminComment: item.adminComment
        };
        sendItem.push(_t);
      });
      // console.log("tableData", this.tableData)
      // console.log("sendItem", sendItem)

      if (sendItem.length > 0) {
        APIService.postSuperAdmin(sendItem).then(response => {
           if(response.code == "200"){
               alert('추가가 완료되었습니다.');
               this.$router.push({name:'adminStatus'})   
               
           }else if(response.code != "200"){
              alert(response.message)
           }

          })
          .catch(error => {
            this.$message({
              type: "error",
              message: "에러가 발생했습니다."
            });
            console.log(error.config);
          });
      }
    },
    handleCheckChange(mdata, checked, indeterminate) {
      if (checked) {
        var self = this;

        APIService.getOrgMemberList(mdata.obj.orgId, mdata.obj.deptId).then(
          data => {
            var _startpoint = this.tableData.length;
            data.forEach(item => {
              this.tableData.push({
                orgId: item.orgId,
                userEmpId: item.userEmpId,
                userNm: item.userNm,
                deptNm: mdata.obj.deptNm,
                membPostion: item.membPostion,
                membRank: item.membRank,
                deptId: item.deptId,
                legacyId: "",
                adminComment: ""
              });
            });
            var _endpoint = this.tableData.length + 1;
            for (var i = _startpoint; i < _endpoint; i++) {
              this.$refs.multipleTable.toggleRowSelection(this.tableData[i]);
            }
          }
        );
      } else {
        this.tableData = this.tableData.filter(item => {
          if (item.deptId != mdata.obj.deptId) {
            return item;
          }
        });
      }
      // console.log("tableData", this.tableData);
    },
    recursiveDepth(sdata, i, parentId) {
      var _parent = [];
      var self = this;

      sdata.forEach(item => {
        if (
          item.deptDepth == i &&
          item.orgId + ":" + item.deptParent == parentId
        ) {
          var _child = self.recursiveDepth(
            sdata,
            i + 1,
            item.orgId + ":" + item.deptId
          );

          _parent.push({
            id: item.orgId + ":" + item.deptId + ":" + item.deptSeq,
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
      this.$router.go(-1);
    },
    legacyChange: function(index, legacyId) {
      // console.log("index",index)
      // console.log("legacyId",legacyId)
      var _self = this;
      var rowCnt = this.tableData.length;

      for (var i = 0; i < rowCnt; i++) {
        if (i == index) {
          _self.tableData[i].legacyId = legacyId;
        }
      }

      //console.log("tableData", this.tableData);
    }
  }
};
</script>