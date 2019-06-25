<template>
<div class="row">
        <div class="p-3 float-left">    
          <h4>사용자 권한 (그룹) 상세</h4>
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
            <p>선택된 사용자</p>
            <el-table
                ref="multipleTable"
                :data="tableData.users"
                style="width: 100%;height:calc(100vh - 550px);overflow-y:scroll">
                <el-table-column
                type="index"
                width="100">
                </el-table-column>
                <el-table-column
                property="userId"
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
                            <td><el-select v-model="sitem.userPrmssnId" placeholder="Select" :disabled="sitem.utype != 'I'" @change="test(sitem.idx, sitem.userPrmssnId)" clearable>
                                <el-option 
                                v-for="item in prmssSelect"
                                :key="item.rolePrmssnId"
                                :label="item.roleUnifiedName"
                                :value="item.rolePrmssnId">
                                </el-option>
                            </el-select></td>
                            <td><el-input placeholder="" :disabled="sitem.utype != 'I'" v-model="sitem.prmssnComment"></el-input></td>
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
      prmssSelectClone:[],
      slegacyId: null,
      userPrmssnName: this.$route.params.objs.userPrmssnName,
      userPrmssnComment: this.$route.params.objs.userPrmssnComment,
      suserPrmssnName: this.$route.params.objs.userPrmssnName,
      suserPrmssnComment: this.$route.params.objs.userPrmssnComment,

      //상세조회
      groupId: this.$route.params.objs.groupId,

      //전체 데이터 개수
      rowCount: null,
      dataArray: []

    };
  },
  created() {
    APIService.getUserGroupPermissionUserRole(this.groupId).then(response => {
      //console.log("response", response)
        this.tableData = response;
        this.tableData['utype']='U'
        this.tasks.push(...this.tableData.roles);
        this.tasksClone = this.tableData;

        this.rowCount = this.tasks.length;
        // console.log("rowCount",this.rowCount)

        //console.log(this.tableData)
        // console.log("tasks",this.tasks)
         
          var _self = this
          APIService.getLegacyList().then((response) => {
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
        // console.log("index", index)
        // console.log("event", event)
        var _a ;
        var _idx = 1;
        this.tasks.forEach(item=>{
            if(_idx == index+1)
            {
                _a = item.prmssnGroupId
            }
            _idx++;
        })

        // console.log("_a", _a)

        _idx = 1;
        var _self = this
        this.tasks = this.tasks.filter(item =>{
            if(_idx == index+1)
            {
                item.groupId = _a;
                // console.log("item.groupId",item.groupId)
                _self.prmssSelectClone.forEach(sitem=>{
                    if(sitem.groupId == item.groupId){
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
        var sendUser = [];
        var sendGroup = [];
        var idx = 0;
  
         self.tableData.users.forEach(item => {
          var _t = {
            userId: item.orgId + ":" + item.userEmpId
          };
          sendUser.push(_t);
        });
    
        self.tasks.forEach(item => {
          if(item.utype=="I"){
            var _h = {
              prmssnGroupId: item.groupId
            };
            sendGroup.push(_h);
          }
        });
  
        sendItem.push({
          groupId: self.groupId,
          userIds: sendUser,
          prmssnGroupIds: sendGroup
        });
  
        // console.log("sendItem",sendItem)
  
        if (sendItem.length > 0) {
          APIService.postUserPermissionUserRolePutAdd(sendItem)
            .then(result => {
              self.$message({
                type: "success",
                message: "추가가 완료되었습니다."
              });
  
              this.$router.push({name:'userPerStatus'})
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
    rowMinus: function(sidx, userPrmssnId){
        //기존의 데이터 행삭제
        if(userPrmssnId != null){
            this.$confirm('삭제 하시겠습니까?', 'Warning', {
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            type: 'warning'

        }).then(() => {
            var self = this
            //var data = [{ userPrmssnId : userPrmssnId}];
            var _t = { userPrmssnId: userPrmssnId };
            var _item = [_t];

            APIService.deleteUserPermissionUserRoleRow(_item)
            .then((response) => {
                alert('삭제가 완료되었습니다.');  
                
                APIService.getUserGroupPermissionUserRole(self.groupId).then(response => {
                    //console.log("response", response)
                      self.tableData = response;
                      self.tableData['utype']='U'
                      self.tasks = self.tableData.roles;
                      self.tasksClone = self.tableData;
                      self.rowCount = self.tasks.length;

                    });  
            
            }).catch((error) => {
                alert('에러가 발생하였습니다.'); 
                console.log(error.config)
            })
        }).catch(() => {
          alert('삭제가 취소되었습니다.');       
        });
        }else{
           var _lidx = 1;
            this.tasks = this.tasks.filter(item=>{
                   //console.log(item);
                if(item.orders != sidx)
                {
                    item['orders'] = _lidx;
                    _lidx++;
                return item;
                }

                //this.editFlag--;
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
          _self.prmssSelectClone = response;
        });
      },
      rowPlus: function () {
        //alert("!!")
          var _index = this.tasks.length+1;
          this.tasks.push({orders:_index++, legacyId:"", userPrmssnId:"", prmssnComment:"",utype:"I"})
      },
      onDeletetEvent: function() {

        this.$confirm('삭제 하시겠습니까?', 'Warning', {
          confirmButtonText: '확인',
          cancelButtonText: '취소',
          type: 'warning'

        }).then(() => {
            var self = this
            // self.dataArray.push({groupId : self.groupId});
          
            var _t = { groupId: this.groupId };
            var _item = [_t];


            APIService.deleteUserPermissionGroup(_item).then((response) => {
                alert('삭제가 완료되었습니다.'); 
                self.$router.push("/userPerStatus");
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