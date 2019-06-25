<template>
<div class="row">
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
        <div class="col-md-4">
            <el-card shadow="never">
                <p>조직도</p>
            <el-tree
            ref="tree"
            style="height:calc(100vh - 500px);overflow-y:scroll"
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
                style="width: 100%;height:calc(100vh - 500px);overflow-y:scroll"
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
   <user-search :visiable="invokeFlag" @closed="onCloseModal" @clicked="onClickChild"></user-search>

    <div class="card-body">
              <p>Role(그룹)권한</p>
                <form v-on:submit.prevent="addItem">
                    <table class="table table-bordered">
                        <thead>
                            <th>순번</th>
                            <th>원천시스템</th>
                            <th>Role(그룹)이름</th>
                            <th>비고</th>
                            <th>행삭제</th>
                        </thead>
                        <tbody>
                            <tr v-for="(sitem,index) in tasks " :index=index>
                            <td>{{sitem.idx}}</td>
                            <td><el-select v-model="sitem.legacyId" placeholder="Select" @change="legacyChange"  clearable>
                                <el-option
                                v-for="item in legacySelect"
                                :key="item.legacyId"
                                :label="item.legacyName"
                                :value="item.legacyId">
                                </el-option>
                            </el-select></td>
                            <td><el-select v-model="sitem.rolePrmssnId" placeholder="Select" @change="test(sitem.idx, sitem.rolePrmssnId)" clearable>
                                <el-option 
                                v-for="item in prmssSelect"
                                :key="item.rolePrmssnId"
                                :label="item.roleUnifiedName"
                                :value="item.rolePrmssnId">
                                </el-option>
                            </el-select></td>
                            <td><el-input placeholder="" v-model="sitem.roleGroupComment"></el-input></td>
                            <td><el-button type="warning" v-on:click="rowMinus(sitem.idx)" plain>-</el-button></td>
                            </tr>
                            <tr>
                            <td>사용자그룹 권한(그룹) 이름</td> 
                            <td><el-input placeholder="" v-model="userRolesName"></el-input></td>
                            <td>비고</td>
                            <td colspan="2"><el-input placeholder="" v-model="userRolesComment"></el-input></td>
                            </tr>
                        </tbody>
                    </table>
                    <el-row>
                    <el-button type="success" v-on:click="rowPlus" plain>+</el-button>
                    </el-row>
               </form>
      </div>
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
      userRolesName: null,
      userRolesComment: null
    };
  },
  created() {
    APIService.getOrgList().then(data => {
      var _parent = [];
      var _self = this;

      data.forEach(item => {
        if (item.deptDepth == 1) {
          var _child = _self.recursiveDepth(data, 2, item.deptId);
          _parent.push({
            id: item.deptSeq,
            label: item.deptNm,
            children: _child,
            obj: item
          });
        }
      });
      _self.data = _parent;
      
      APIService.getRolePermissionLegacyList().then((response) => {
        _self.legacySelect = response;
      }); 

      APIService.getRolePermissionItemList().then((response) => {
        _self.prmssSelect = response;
        _self.prmssSelectClone = response;
      }); 
    });
  },
  mounted() {},
  methods: {
    test(index,event)
    {
        var _a ;
        var _idx = 1;
        this.tasks.forEach(item=>{
            if(_idx == index)
            {
                _a = item.rolePrmssnId
            }
            _idx++;
        })

        _idx = 1;
        var _self = this
        this.tasks = this.tasks.filter(item =>{
            if(_idx == index)
            {
                item.groupId = _a;
                // console.log("item.groupId",item.groupId)
                _self.prmssSelectClone.forEach(sitem=>{
                    if(sitem.rolePrmssnId == item.rolePrmssnId){
                        item.roleGroupComment = sitem.roleGroupComment
                    }
                })
            }
            _idx++;
            // console.log("item", item)
            return item
        })
      // console.log("tasks", this.tasks)
    },
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
      this.$router.go();
    },
    onInsertEvent() {
      var self = this;

      var sendItem = [];
      var sendUser = [];
      var sendGroup = [];
      var idx = 0;

       this.multipleSelection.forEach(item => {
        var _t = {
          userId: item.orgId + ":" + item.userEmpId
        };
        sendUser.push(_t);
      });

      this.tasks.forEach(item => {

        this.prmssSelect.forEach(sitem => {
          if(sitem.rolePrmssnId == item.rolePrmssnId){
             item.isRoleItemGroup = sitem.isRoleItemGroup;
             item.rolePrmssnGroupId = sitem.rolePrmssnGroupId;
          }
        })
      });
  
      this.tasks.forEach(item => {
        var _h = {
          rolePrmssnId: item.rolePrmssnId,
          isRoleItemGroup: item.isRoleItemGroup,
          rolePrmssnGroupId: item.rolePrmssnGroupId
        };
        sendGroup.push(_h);
      });

      sendItem.push({
        userRolesName: this.userRolesName,
        userRolesComment: this.userRolesComment,
        userIds: sendUser,
        roleGroupIds: sendGroup
      });

       console.log(sendItem)

      if (sendItem.length > 0) {
        APIService.postUserPermissionUserRole(sendItem)
          .then(result => {
            this.$message({
              type: "success",
              message: "추가가 완료되었습니다."
            });

           this.$router.go();
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
                deptId: item.deptId
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
    legacyChange: function(selected){
        this.slegacyId = selected

        var _self = this;
        this.prmssSelect = [];

        APIService.getRolePermissionByLegacy(this.slegacyId).then((response)=>{
          _self.prmssSelect = response;
        });
      },
      rowPlus: function () {
          var _index = this.tasks.length+1;
          this.tasks.push({idx:_index++, legacyId:"", groupId:"", prmssnComment:""})
      },
      rowMinus: function (sidx) {
          var _lidx = 1;
          this.tasks = this.tasks.filter(item=>{
            //   console.log(item);
              if(item.idx != sidx)
              {
                  item['idx'] = _lidx;
                  _lidx++;
               return item;
              }
        });
      }
  }
};
</script>