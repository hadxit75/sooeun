<template>
<div class="row">
        <div class="p-3 float-left">    
          <h4>사용자그룹 Role (그룹)권한상세</h4>
        </div>
        <div class="col-md-12" style="margin-bottom:10px"></div>
        <div class="col-md-2" style="margin-top:30px">
        <el-button plain type="primary" @click="onEditEvent()"  style="width:100%">확인</el-button> 
        </div>
        <div class="col-md-2" style="margin-top:30px">
        <el-button plain type="primary" @click="onDeletetEvent()" style="width:100%">삭제</el-button> 
        </div>
        <div class="col-md-2"  style="margin-top:30px">
        <el-button plain type="danger"  @click="backToStatus()" style="width:100%">취소</el-button> 
        </div>
        <div class="col-md-12" style="margin-top:10px;margin-bottom:10px"></div>

    <div class="col-md-12">
        <el-card shadow="never">
            <p>사용자그룹</p>
            <el-table
                ref="multipleTable"
                :data="tableData.users"
                style="width: 100%;height:calc(100vh - 550px);overflow-y:scroll">
                <el-table-column
                type="index"
                width="100">
                </el-table-column>
                <el-table-column
                property="userNm"
                label="사용자(그룹)이름">
                </el-table-column>
                <el-table-column
                property="userGroupComment"
                label="비교">
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
                            <th>Role(그룹)이름</th>
                            <th>비고</th>
                            <th>행삭제</th>
                        </thead>
                        <tbody>
                            <tr v-for="(sitem,index) in tasks " :index=index>
                            <td>{{sitem.orders}}</td>
                            <td><el-select v-model="sitem.legacyId" placeholder="Select" :disabled="sitem.utype != 'I'" @change="legacyChange"  clearable>
                                <el-option
                                v-for="item in legacySelect"
                                :key="item.legacyId"
                                :label="item.legacyName"
                                :value="item.legacyId">
                                </el-option>
                            </el-select></td>
                            <td><el-select v-model="sitem.userPrmssnId" placeholder="Select" :disabled="sitem.utype != 'I'" @change="test(index,$event)" clearable>
                                <el-option 
                                v-for="item in prmssSelect"
                                :key="item.rolePrmssnId"
                                :label="item.prmssnName"
                                :value="item.rolePrmssnId">
                                </el-option>
                            </el-select></td>
                            <td><el-input placeholder="" v-model="sitem.prmssnComment" :disabled="sitem.utype != 'I'"></el-input></td>
                            <td><el-button type="warning" v-on:click="rowMinus(sitem.orders, sitem.userPrmssnId)" plain>-</el-button></td>
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
export default {

  data() {
    return {
      prmssSelectClone: [],
      groupSelect: [],
      groupSelectClone: [],
      slegacyId: null,
      userPrmssnName: this.$route.params.objs.userPrmssnName,
      userPrmssnComment: this.$route.params.objs.userPrmssnComment,
      suserPrmssnName: this.$route.params.objs.userPrmssnName,
      suserPrmssnComment: this.$route.params.objs.userPrmssnComment,
      //상세조회
      groupId: this.$route.params.objs.groupId,
      groupUserId: this.$route.params.objs.groupUserId,

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
      
      //전체 데이터 개수
      rowCount: null,
      dataArray: []
    };
  },
  created() {
    APIService.getUserGroupPermissionUserGroupRole(this.groupId).then(response => {
      //console.log("response", response)
        this.tableData = response;
        this.tableData['utype']='U'
        this.tasks.push(...this.tableData.roles);
        this.tasksClone = this.tableData;
        this.rowCount = this.tasks.length;

        var _self = this
        APIService.getLegacyList().then((response) => {
          _self.legacySelect = response;
        }); 

        APIService.getRolePermissionItemList().then((response) => {
          _self.prmssSelect = response;
          _self.prmssSelectClone = response;
        }); 

        APIService.getUserGroupList().then((response) => {
            _self.groupSelect = response;
            _self.groupSelectClone = response;
          }); 

      });     
  },
  mounted() {},
  methods: {
    test(index,event)
    {
        //  console.log("index", index)
        //  console.log("event", event)
        var _a ;
        var _idx = 1;
        this.tasks.forEach(item=>{
            if(_idx == index+1)
            {
                _a = item.userPrmssnId
            }
            _idx++;
        })

        // console.log("_a", _a)

        _idx = 1;
        var _self = this
        this.tasks = this.tasks.filter(item =>{
            if(_idx == index+1)
            {
                item.userPrmssnId = _a;
                // console.log("item.groupId",item.groupId)
                _self.prmssSelectClone.forEach(sitem=>{
                    if(sitem.prmssnId == item.userPrmssnId){
                        item.prmssnComment = sitem.prmssnComment
                    }
                })
            }
            _idx++;
            // console.log("item", item)
            return item
        })
      // console.log("tasks", this.tasks)
    },
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
             this.$router.push({name:'userPerStatus'})
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
      if(this.tasks.length > this.rowCount){
        var sendItem = [];
        var sendGroup = [];
        var idx = 0;

        self.tasks.forEach(item => {

        self.prmssSelect.forEach(sitem => {
            if(sitem.rolePrmssnId == item.rolePrmssnId){
              item.isRoleItemGroup = sitem.isRoleItemGroup;
              item.rolePrmssnGroupId = sitem.rolePrmssnGroupId;
            }
          })
        });
        
        self.tasks.forEach(item => {
         if(item.utype=="I"){
            var _h = {
              rolePrmssnId: item.groupId,
              isRoleItemGroup: item.isRoleItemGroup,
              rolePrmssnGroupId: item.rolePrmssnGroupId

            };
            sendGroup.push(_h);
          }
        });
  
        sendItem.push({
          groupId: self.groupId,
          groupUserId: self.groupUserId,
          roleGroupIds: sendGroup
        });
  
         console.log(sendItem)
  
        if (sendItem.length > 0) {
          APIService.postUserPermissionUserGroupRolePutAdd(sendItem)
            .then(result => {
              self.$message({
                type: "success",
                message: "추가가 완료되었습니다."
              });
  
              //this.$router.push({name:'userPerStatus'})
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
            self.$router.push({name:'userPerStatus'})

        }).catch(() => {
          alert('삭제가 취소되었습니다.');       
        });

    },
    rowMinus: function(idx, userPrmssnId){
        //기존의 데이터 행삭제
        if(this.tasks.length > 0 && userPrmssnId != null){
            this.$confirm('삭제 하시겠습니까?', 'Warning', {
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            type: 'warning'

        }).then(() => {
            var self = this
            var data = [{ userPrmssnId : userPrmssnId}];

            APIService.deleteUserPermissionUserGroupRoleRow(data)
            .then((response) => {
                 alert('삭제가 완료되었습니다.');  
                 //to-do 
                 //조회 로직 추가

                 APIService.getUserGroupPermissionUserGroupRole(self.groupId).then(response => {
                    //console.log("response", response)
                      self.tableData = response;
                      self.tableData['utype']='U'
                      self.tasks = self.tableData.roles;
                      self.tasksClone = self.tableData;
                      self.rowCount = self.tasks.length;
                    });  
            })
            .catch((error) => {
                alert('에러가 발생하였습니다.'); 
                console.log(error.config)
            })
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

        APIService.getRolePermissionByLegacy(this.slegacyId).then((response)=>{
          _self.prmssSelect = response;
          //console.log(_self.prmssSelect)
        });
      },
      rowPlus: function () {
          var _index = this.tasks.length+1;
          this.tasks.push({orders:_index++, legacyId:"", groupId:"", prmssnComment:"",utype:"I"})
      },
      onDeletetEvent: function() {

        this.$confirm('삭제 하시겠습니까?', 'Warning', {
          confirmButtonText: '확인',
          cancelButtonText: '취소',
          type: 'warning'

        }).then(() => {
            var self = this
            var _mgs = [{ groupId : self.groupId}];
            
            var _t = { groupId: this.groupId };
            var _item = [_t];

            APIService.deleteUserPermissionGroup(_item).then((response) => {
                alert('삭제가 완료되었습니다.'); 
                self.$router.push({name:'userPerStatus'})
            })
            .catch((error) => {
                alert('에러가 발생하였습니다.'); 
                console.log(error.config)
            })
        }).catch(() => {
          alert('삭제가 취소되었습니다.');       
        });
        
      },
  }
};
</script>