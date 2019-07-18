<template>
  <div class="container">
        <div>
            <div class="p-3 float-left">    
                <h4>Role 그룹상세</h4>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="addItem">
                    <table class="table table-bordered">
                        <thead>
                            <th>순번</th>
                            <th>원천시스템</th>
                            <th>Role 유형</th>
                            <th>Role 이름</th>
                            <th>비고</th>
                            <th>행삭제</th>
                        </thead>
                        <tbody>
                            <tr v-for="(sitem,index) in tasks " :index=index>
                            <td>{{sitem.orders}}</td>
                            <td><el-select v-model="sitem.legacyId" placeholder="Select" :disabled="sitem.utype != 'I'" @change="legacyChange" clearable>
                                <el-option
                                v-for="item in legacySelect"
                                :key="item.legacyId"
                                :label="item.legacyName"
                                :value="item.legacyId">
                                </el-option>
                            </el-select></td>
                            <td><el-select v-model="sitem.roleTypeId" placeholder="Select" :disabled="sitem.utype != 'I'" @change="roleTypeChange(index, $event)" clearable>
                                <el-option 
                                v-for="item in roleTypeSelect"
                                :key="item.roleTypeId"
                                :label="item.roleTypeName"
                                :value="item.roleTypeId">
                                </el-option>
                            </el-select></td>
                            <td><el-select v-model="sitem.roleId" placeholder="Select" :disabled="sitem.utype != 'I'" @change="test(index,$event)" clearable>
                                <el-option
                                v-for="(item,index) in objectTypeSelectNew(sitem.legacyId, sitem.roleTypeId)"
                                :key="index"
                                :label="item.roleName"
                                :value="item.roleId">
                                </el-option>
                            </el-select></td>
                            <td><el-input placeholder="" v-model="sitem.roleComment" :disabled="sitem.utype != 'I'"></el-input></td>
                            <td><el-button type="warning" v-on:click="rowMinus(sitem.orders, sitem.roleGroupId)" plain>-</el-button></td>
                            </tr>
                            <tr>
                            <td >Role 그룹이름</td> 
                            <td colspan="2"><el-input placeholder="" v-model="roleGroupName"></el-input></td>
                            <td>비고</td>
                            <td colspan="2"><el-input placeholder="" v-model="roleGroupComment"></el-input></td>
                            </tr>
                        </tbody>
                    </table>
                    <el-row>
                    <el-button type="success" v-on:click="rowPlus" plain>+</el-button>
                    
                    </el-row>

                </form>
            </div>
           <div style="margin-left:15px">
                <el-button plain type="primary" @click="edit">수정</el-button> 
                <el-button plain type="danger" @click="del">삭제</el-button> 
                <el-button plain type="warning" @click="cancle">취소</el-button> 
            </div>
        </div>
    </div>
</template>

<script>
import APIService from '../util/APIService';
export default {
  components: {
      name: 'AddItem'
  },
  data() {
    return {
      groupId: this.$route.params.objs.groupId,
      roleGroupName: this.$route.params.objs.roleGroupName,
      roleComment: this.$route.params.objs.roleComment,
      roleGroupComment: this.$route.params.objs.roleGroupComment,
      sroleGroupName: this.$route.params.objs.roleGroupName,
      sroleGroupComment: this.$route.params.objs.roleGroupComment,
      selected: null,
      legacySelect: [],
      roleTypeSelect: [],
      roleSelect: [],
      comment: null,
      legacyId: null,
      objectTypeId: null,
      oprSelect: [],
      oprtnId: null,
      oprtnName: null,
      tasks: [],
      tasksClone: [],
      slegacyId: null
    }
  },
  created() {
    APIService.getRoleGroupByGroupId(this.groupId).then((response) => {
        this.tasks = response;
        this.tasks['utype']='U';
        this.roleTypeSelect = response;   

        var _self = this;

        APIService.getLegacyList().then((response) => {  
            _self.legacySelect = response;
        })  
        
        APIService.getRoleAllList().then((response) => {  
            _self.roleSelect = response;
            _self.tasksClone = response;
        })  
    }); 
  },
   methods: {
       test(index,event)
       {
           var _a ;
           var _idx = 1;
           this.tasks.forEach(item=>{
               if(_idx == index+1)
               {
                   _a = item.roleId
               }
               _idx++;
           })

           _idx = 1;
           this.tasks = this.tasks.filter(item =>{
               if(_idx == index+1)
               {
                    item.roleId = _a;
                    // console.log("item.roleId",item.roleId)
                    this.tasksClone.forEach(sitem=>{
                        if(sitem.roleId == item.roleId){
                            item.roleComment = sitem.roleComment
                        }
                    })
               }
               _idx++;
            //    console.log("item", item)
               return item

           })
       },
       objectTypeSelectNew(legacyId, roleTypeId)
       {
            var _r=[];
            this.roleSelect.forEach(item=>{
                if(item.roleTypeId == roleTypeId && item.legacyId == legacyId)
                {   
                    _r.push(item);
                }
            });
    
            return _r;

        },
       add: function() {
        var self = this

        var _msg = [];
        this.tasks.forEach(sitem=>{

             var _item = {"roleGroupName": self.roleGroupName
                         ,"roleId": sitem.roleId
                         ,"orders" : sitem.idx
                         ,"roleComment": self.roleComment};

            _msg.push(_item);
            
           
        })

      },
      edit: function() {
           //롤그룹 명, 코멘트 변경시
           if(this.roleGroupName != this.sroleGroupName || this.roleGroupComment != this.sroleGroupComment){
                var self = this
                var _msg = { roleGroupName: self.roleGroupName 
                            ,roleGroupComment: self.roleGroupComment
                            ,groupId: self.groupId
                           };

                APIService.putRoleGroup(_msg).then((response) => {
                    this.$message({
                        type: 'success',
                        message: '수정이 완료되었습니다.' 
                    });
                    this.$router.push({name:'role'})  
                                
                })
                .catch((error) => {
                    this.$message({
                        type: 'error',
                        message: '에러가 발생하였습니다.'
                    });
                    console.log(error.config)
                })
           }

           //롤 항목 추가 시
           var self2 = this
           var _msg2 = [];
           this.tasks.forEach(sitem=>{
               if(sitem.utype=="I"){
                var _item = {"roleId": sitem.roleId
                            ,"roleGroupName": self2.roleGroupName
                            ,"orders": sitem.orders 
                            ,"roleGroupComment" : self2.roleGroupComment
                            ,"groupId": self2.groupId};

                _msg2.push(_item);
               }
            })

            APIService.postRoleGroupPutAdd(_msg2).then((response) => {
                alert('수정이 완료되었습니다.');
                self2.$router.push({name:'role'})               
            })
            .catch((error) => {
                alert('에러가 발생하였습니다.');
                console.log(error.config)
            })


      },
      del: function() {

        this.$confirm('삭제 하시겠습니까?', 'Warning', {
          confirmButtonText: '확인',
          cancelButtonText: '취소',
          type: 'warning'

        }).then(() => {
            var self = this
            var data = { data: [{ groupId : self.groupId}] };
            
            APIService.deleteRoleGroupByGroupId(data).then((response) => {
                self.$router.push({name:'role'}) 
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
      cancle: function () {
        this.$router.go(-1)  
      },
      rowPlus: function () {
          var _index = this.tasks.length+1;
          this.tasks.push({orders:_index++,roleTypeId:"", legacyId:"", roleId:"", roleName:"", roleGroupName:"", roleGroupComment:"", utype:"I"})
      },
      rowMinus: function (sidx, roleGroupId) {
        if (roleGroupId != null) {
            if(this.tasks.length <= 1){
                alert('하단 삭제 버튼을 눌러 주세요.(전체삭제)');     
                
            }else if(this.tasks.length > 1){
                this.$confirm('삭제 하시겠습니까?', 'Warning', {
                confirmButtonText: '확인',
                cancelButtonText: '취소',
                type: 'warning'

            }).then(() => {
                var self = this
                var data = { data: [{roleGroupId : roleGroupId}] };

                APIService.deleteRoleGroupByRoleGroupId(data).then((response) => {
                    APIService.getRoleGroupByGroupId(this.groupId).then((response) => {
                        self.tasks = response;
                    });
                }).catch((error) => {
                        alert('에러가 발생하였습니다.'); 
                        console.log(error.config)
                    })
                }).catch(() => {
                    alert('삭제가 취소되었습니다.');        
                });
            }//end of else if

        }else{
            var _lidx = 1;
            this.tasks = this.tasks.filter(item=>{
                if(item.orders != sidx)
                {
                    item['orders'] = _lidx;
                    _lidx++;
                return item;
                }

                this.editFlag--;
            }); 
        } 
      },
      legacyChange: function(selected){
        this.slegacyId = selected

        var _self = this;
        _self.roleTypeSelect = [];

        APIService.getRoleLegacyByLegacyId(this.slegacyId).then((response) => {
            _self.roleTypeSelect = response;
        })   
      },
      roleTypeChange: function(index, event){
        var _self = this;
        _self.roleSelect = [];

        APIService.getRoleLegacyByLegacyIdroleTypeId(this.slegacyId, event).then((response) => {
            _self.roleSelect = response;
        })

        // var _a 
        // this.tasks.forEach(item=>{
        //     if(item.orders == index+1)
        //     {
        //         _a = item;
        //     }
        // })

        // var _idx = 1;
        // this.tasks = this.tasks.filter(item=>{
        //     if(_idx == index+1)
        //     {
        //         item.roleId = ""
        //     }
        //     _idx++;
        //     return item;
        // })

      }
    }
}
</script>