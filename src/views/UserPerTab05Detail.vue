<template>
<div class="row">
        <div class="col-md-2" style="margin-top:30px">
        <el-button plain type="primary" @click="onEditEvent()" :disabled="validateStatus()" style="width:100%">확인</el-button> 
        </div>
        <div class="col-md-2" style="margin-top:30px">
        <el-button plain type="primary" @click="onDeletetEvent()" :disabled="validateStatus()" style="width:100%">삭제</el-button> 
        </div>
        <div class="col-md-2"  style="margin-top:30px">
        <el-button plain type="danger"  @click="backToStatus()" style="width:100%">취소</el-button> 
        </div>
        <div class="col-md-12" style="margin-top:10px;margin-bottom:10px"></div>

    <div class="col-md-12">
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

    <div class="card-body">
                <form v-on:submit.prevent="addItem">
                    <table class="table table-bordered">
                        <thead>
                            <th>순번</th>
                            <th>원천시스템</th>
                            <th>권한(그룹)이름</th>
                            <th>비고</th>
                            <th>행삭제</th>
                        </thead>
                        <tbody>
                            <tr v-for="(sitem,index) in tableData " :index=index>
                            <td>{{sitem.idx}}</td>
                            <td><el-select v-model="sitem.legacyId" placeholder="Select" @change="legacyChange"  clearable>
                                <el-option
                                v-for="item in legacySelect"
                                :key="item.legacyId"
                                :label="item.legacyName"
                                :value="item.legacyId">
                                </el-option>
                            </el-select></td>
                            <td><el-select v-model="sitem.groupId" placeholder="Select" clearable>
                                <el-option 
                                v-for="item in prmssSelect"
                                :key="item.groupId"
                                :label="item.prmssnName"
                                :value="item.groupId">
                                </el-option>
                            </el-select></td>
                            <td><el-input placeholder="" v-model="sitem.prmssnComment"></el-input></td>
                            <td><el-button type="warning" v-on:click="rowMinus(sitem.idx, sitem.groupId)" plain>-</el-button></td>
                            </tr>
                            <tr>
                            <td>사용자 권한(그룹)이름</td> 
                            <td><el-input placeholder="" v-model="userPrmssnName"></el-input></td>
                            <td>비고</td>
                            <td colspan="2"><el-input placeholder="" v-model="userPrmssnComment"></el-input></td>
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
      tasksClone: [],
      legacySelect: [],
      prmssSelect: [],
      slegacyId: null,
      userPrmssnName: this.$route.params.objs.userPrmssnName,
      userPrmssnComment: this.$route.params.objs.userPrmssnComment,
      suserPrmssnName: this.$route.params.objs.userPrmssnName,
      suserPrmssnComment: this.$route.params.objs.userPrmssnComment,

      //상세조회
      groupId: this.$route.params.objs.groupId
    };
  },
  created() {
    APIService.getUsersPermissionGroupId(this.groupId).then((response) => {
        this.tableData = response;
         
         var _self = this
         APIService.getLegacyList().then((response) => {
            _self.legacySelect = response;
          }); 

          APIService.getPermissionList().then((response) => {
            _self.prmssSelect = response;
          }); 

      }); 

    
  },
  mounted() {},
  methods: {
    backToStatus() {
      this.$router.go();
    },
    onEditEvent() {
      var self = this;

      //행변화 없이 내용만 수정했을 경우
      if(this.userPrmssnName != this.suserPrmssnName || this.userPrmssnComment != this.suserPrmssnComment){
        var _msg = {
          groupId: self.groupId,
          userPrmssnName: self.userPrmssnName,
          userPrmssnComment: self.userPrmssnComment 
        }

        APIService.putUserPermission(_msg).then(result => {
            self.$message({
              type: "success",
              message: "수정이 완료되었습니다."
            });

           if(self.tasks.length <= 0){ 
              self.$router.go();
            }
          })
          .catch(error => {
            self.$message({
              type: "error",
              message: "에러가 발생했습니다."
            });
            console.log(error.config);
          });
      
      }

      //권한 추가되었을 경우
      if(this.tasks.length > 0){

        var sendItem = [];
        var sendUser = [];
        var sendGroup = [];
        var idx = 0;
  
         self.multipleSelection.forEach(item => {
          var _t = {
            userId: item.orgId + ":" + item.userEmpId
          };
          sendUser.push(_t);
        });
    
        self.tasks.forEach(item => {
          var _h = {
            prmssnGroupId: item.groupId
          };
          sendGroup.push(_h);
        });
  
        sendItem.push({
          groupId: self.groupId,
          userIds: sendUser,
          prmssnGroupIds: sendGroup
        });
  
        // console.log(sendItem)
  
        if (sendItem.length > 0) {
          APIService.putUserPermissionAdd(sendItem)
            .then(result => {
              self.$message({
                type: "success",
                message: "추가가 완료되었습니다."
              });
  
              self.$router.go();
            })
            .catch(error => {
              self.$message({
                type: "error",
                message: "에러가 발생했습니다."
              });
              console.log(error.config);
            });
        }
      }

    },
    onDeleteEvent(){
      this.$confirm('삭제 하시겠습니까?', 'Warning', {
          confirmButtonText: '확인',
          cancelButtonText: '취소',
          type: 'warning'

        }).then(() => {
            var self = this
            var data = { data: [{ groupId : self.groupId}] };

            APIService.deleteUserPermissionGroup(data)
            .then((response) => {
                 self.$router.go();
            })
            .catch((error) => {
                alert('에러가 발생하였습니다.'); 
                console.log(error.config)
            })
             
            alert('삭제가 완료되었습니다.');  

        }).catch(() => {
          alert('삭제가 취소되었습니다.');       
        });

    },
    rowMinus: function(idx, userPrmssnId){
       var _lidx = 1;
          this.tasks = this.tasks.filter(item=>{
              if(item.idx != sidx)
              {
                  item['idx'] = _lidx;
                  _lidx++;
               return item;
              }
        });

        //기존의 데이터 행삭제
        if(this.tasks.length <= 0){
            this.$confirm('삭제 하시겠습니까?', 'Warning', {
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            type: 'warning'

        }).then(() => {
            var self = this
            var data = [{ userPrmssnId : userPrmssnId}];

            APIService.deleteUserPermissionGroupRow(data)
            .then((response) => {
                 self.$router.go();
            })
            .catch((error) => {
                alert('에러가 발생하였습니다.'); 
                console.log(error.config)
            })
             
            alert('삭제가 완료되었습니다.');  

        }).catch(() => {
          alert('삭제가 취소되었습니다.');       
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

        APIService.getPermissionLegacyList(this.slegacyId).then((response)=>{
          _self.prmssSelect = response;
        });
      },
      rowPlus: function () {
          var _index = this.tasks.length+1;
          this.tasks.push({idx:_index++, legacyId:"", groupId:"", prmssnComment:""})
      },
  }
};
</script>