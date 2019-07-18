<template>
<div class="row">
        <!-- <div class="col-md-2" style="margin-top:30px">
        <el-button plain type="success" @click="onUserSearch()" icon="el-icon-search" style="width:100%">사용자 개별 검색</el-button> 
        </div> -->
        <div class="col-md-2" style="margin-top:30px">
        <el-button plain type="primary" @click="onInsertEvent()" :disabled="validateStatus()" style="width:100%">확인</el-button> 
        </div>
        <div class="col-md-2"  style="margin-top:30px">
        <el-button plain type="danger"  @click="backToStatus()" style="width:100%">취소</el-button> 
        </div>
        <div class="col-md-12" style="margin-top:10px;margin-bottom:10px"></div>
    <div class="col-md-12">
        <el-card shadow="never">
            <p>사용자 그룹</p>
            <table class="table table-bordered">
              <thead>
                  <th>순번</th>
                  <th>사용자그룹이름</th>
                  <th>비고</th>
              </thead>
              <tbody>
                  <tr>
                  <td>{{index}}</td>
                  <td><el-select v-model="groupId" placeholder="Select" @change="setComment(index,$event)"  clearable>
                      <el-option
                      v-for="item in groupSelect"
                      :key="item.groupId"
                      :label="item.userGroupName"
                      :value="item.groupId">
                      </el-option>
                  </el-select></td>
                  <td><el-input placeholder="" v-model="userGroupComment"></el-input></td>
                  </tr>
              </tbody>
          </table>
        </el-card>
    </div>
    <!-- <user-search :visiable="invokeFlag" @closed="onCloseModal" @clicked="onClickChild"></user-search> -->
    <div class="card-body">
              <p>권한(그룹)</p>
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
                            <td><el-select v-model="sitem.groupId" placeholder="Select" @change="test(sitem.idx, sitem.groupId)" clearable>
                                <el-option 
                                v-for="item in prmssSelect"
                                :key="item.groupId"
                                :label="item.prmssnName"
                                :value="item.groupId">
                                </el-option>
                            </el-select></td>
                            <td><el-input placeholder="" v-model="sitem.prmssnComment"></el-input></td>
                            <td><el-button type="warning" v-on:click="rowMinus(sitem.idx)" plain>-</el-button></td>
                            </tr>
                            <tr>
                            <td>사용자그룹 권한(그룹) 이름</td> 
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
      groupSelect: [],
      groupSelectClone: [],
      userGroupComment: null,
      index: 1,
      userGroupId: null,
      userGroup: [],

      //권한
      tasks: [],
      tasksClone: [],
      prmssSelect: [],
      prmssSelectClone: [],
      slegacyId: null,
      userPrmssnName: null,
      userPrmssnComment: null,
      sgroupId: null,
      prmssnComment: null,
      suserGroupId: null
    };
  },
  created() {

      APIService.getPermissionList().then((response) => {
        this.legacySelect = response;

          var _self = this;
          APIService.getPermissionAllList().then((response) => {
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
    setComment: function(index,groupId){
      this.suserGroupId = groupId;
      var _self = this
      var _idx = 1;

      var _a ;
      this.groupSelect.forEach(item=>{
          if(_idx == index)
          {
              _a = item.groupId
          }
          _idx++;
      })

      _idx = 1;

      this.groupSelect = this.groupSelect.filter(item =>{
       
         if(item.groupId == groupId){

          this.groupSelectClone.forEach(sitem=>{
                if(sitem.groupId == _self.suserGroupId){	
                  _self.userGroupComment = sitem.userGroupComment;
                }
            })
          }
          return item
        })  
    },
     test(index,event)
    {
        var _a ;
        var _idx = 1;
        this.tasks.forEach(item=>{
            if(_idx == index)
            {
                _a = item.groupId
            }
            _idx++;
        })

        _idx = 1;
        var _self = this
        this.tasks = this.tasks.filter(item =>{
            if(_idx == index)
            {
                item.groupId = _a;
                _self.prmssSelectClone.forEach(sitem=>{
                    if(sitem.groupId == item.groupId){
                        item.prmssnComment = sitem.prmssnComment
                    }
                })
            }
            _idx++;
            return item
        })
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
      // var sendUser = [];
      var sendGroup = [];
      var idx = 0;

      //  this.multipleSelection.forEach(item => {
      //   var _t = {
      //     userId: item.orgId + ":" + item.userEmpId
      //   };
      //   sendUser.push(_t);
      // });


  
      this.tasks.forEach(item => {
        var _h = {
          prmssnGroupId: item.groupId
        };
        sendGroup.push(_h);
      });

      // console.log("suserGroupId",this.suserGroupId)

      sendItem.push({
        userPrmssnName: this.userPrmssnName,
        userPrmssnComment: this.userPrmssnComment,
        groupUserId: this.suserGroupId,
        prmssnGroupIds: sendGroup
      });

      // console.log(sendItem)

      if (sendItem.length > 0) {
        APIService.postUserGroupPermission(sendItem).then(response => {
           if(response.code == "200"){
            this.$message({
              type: "success",
              message: "추가가 완료되었습니다."
            });

            this.$router.go();

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
      return !(this.tasks.length > 0);
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
      },
  }
};
</script>