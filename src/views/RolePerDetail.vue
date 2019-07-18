<template>
  <div class="container">
        <div>
            <div class="p-3 float-left">    
                <h4>Role 권한상세</h4>
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
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td><el-input v-model="legacyName" disabled></el-input></td>
                            <td><el-input v-model="roleTypeName" disabled></el-input></td>
                            <td><el-input v-model="roleName"></el-input></td>
                            <td><el-input v-model="roleComment"></el-input></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>

            <div class="card-body">
                <form v-on:submit.prevent="addItem">
                    <table class="table table-bordered">
                        <thead>
                            <th>순번</th>
                            <th>원천시스템</th>
                            <th>권한그룹이름</th>
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
                            <td><el-select v-model="sitem.prmssnGroupId" placeholder="Select" :disabled="sitem.utype != 'I'" clearable>
                                <el-option 
                                v-for="item in roleSelect"
                                :key="item.prmssnGroupId"
                                :label="item.rolePrmssnName"
                                :value="item.prmssnGroupId">
                                </el-option>
                            </el-select></td>
                            <td><el-input placeholder="" :disabled="sitem.utype != 'I'" v-model="sitem.prmssnComment"></el-input></td>
                            <td><el-button type="warning" v-on:click="rowMinus(sitem.orders, sitem.rolePrmssnId)" plain>-</el-button></td>
                            </tr>
                            <tr>
                            <td>권한(그룹)이름</td> 
                            <td><el-input placeholder="" v-model="rolePrmssnName"></el-input></td>
                            <td >비고</td>
                            <td colspan="2"><el-input placeholder="" v-model="rolePrmssnComment"></el-input></td>
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
      legacyName: this.$route.params.objs.legacyName,
      roleTypeName: this.$route.params.objs.roleTypeName,
      roleName: this.$route.params.objs.roleName,
      roleId: this.$route.params.objs.roleId,
      roleComment: this.$route.params.objs.roleComment,
      rolePrmssnName: this.$route.params.objs.rolePrmssnName,
      rolePrmssnComment: this.$route.params.objs.rolePrmssnComment,
      srolePrmssnName: this.$route.params.objs.rolePrmssnName,
      srolePrmssnComment: this.$route.params.objs.rolePrmssnComment,
      legacySelect: [],
      roleSelect: [],
      roleSelectClone: [],
      legacyId: null,
      roleTypeSelect: [],
      index: 1,
      tasks: []
    }
  },
  created() {
    APIService.getRolePermissionNonGroupByGroupId(this.groupId).then((response) => {
        this.tasks = response;
        this.tasks['utype']='U';

        var _self = this
        APIService.getLegacyList().then((response) => {  
            _self.legacySelect = response;
        }) 

        APIService.getRolePermissionGroupList().then((response) => {  
            _self.roleSelect = response;
            _self.roleSelectClone = response;
        }) 

    });   
  },
   methods: {
    legacyChange: function(selected){
        this.slegacyId = selected
        var _self = this;
        
        _self.objTypeSelect = [];

        APIService.getRoleLegacyByLegacyId(this.slegacyId).then((response) => {
            _self.roleTypeSelect = response;
        })
  
      },
      setComment: function(selected){
          var _self = this
        this.roleSelectClone.forEach(sitem=>{
            if(sitem.roleId = selected){
                _self.roleComment = sitem.roleComment
            }
        })
      },
      rowPlus: function () {
          var _index = this.tasks.length+1;
          this.tasks.push({orders:_index++, legacyId:"", prmssnGroupId:"", prmssnComment:"", utype:"I"})
      },
      rowMinus: function (sidx, rolePrmssnId) {
        if (rolePrmssnId != null) {
            if(this.tasks.length <= 1){
                alert('하단 삭제 버튼을 눌러 주세요.(전체삭제)');
                
            }else if(this.tasks.length > 1){
                    this.$confirm('삭제 하시겠습니까?', 'Warning', {
                    confirmButtonText: '확인',
                    cancelButtonText: '취소',
                    type: 'warning'
                
                }).then(() => {
                    var self = this;
                    var data = { data: [{rolePrmssnId : rolePrmssnId}] };

                    APIService.deleteRolePermissionPermissions(data).then((response) => {
                        APIService.getRolePermissionNonGroupByGroupId(this.groupId).then((response) => {
                            self.tasks = response;
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
      edit: function() {
           //롤그룹 명, 코멘트 변경시
           if(this.rolePrmssnName != this.srolePrmssnName || this.rolePrmssnComment != this.srolePrmssnComment){
                var self = this;
                var data = { rolePrmssnName: self.rolePrmssnName 
                            , rolePrmssnComment: self.rolePrmssnComment
                            , groupId: self.groupId
                            };

                APIService.putRolePermission(data).then((response) => {
                    alert('수정이 완료되었습니다.');  
                })
                .catch((error) => {
                    alert('에러가 발생하였습니다.');  
                    console.log(error.config)
                })
           }

           //롤 항목 추가 시
           var self2 = this
           var _msg2 = [];
           this.tasks.forEach(sitem=>{
               if(sitem.utype=="I"){
                var _item = { "isRoleGroup": 0
                            ,"groupRoleId": 0
                            ,"groupId": self2.groupId
                            ,"orders": sitem.orders 
                            ,"prmssnGroupId": sitem.prmssnGroupId
                            ,"rolePrmssnName": self2.rolePrmssnName
                            ,"rolePrmssnComment": self2.rolePrmssnComment
                            };

                _msg2.push(_item);
               }
            })

            APIService.postRoleGroupPutAdd(_msg2).then((response) => {
                alert('수정이 완료되었습니다.');  
                self2.$router.push({name:'rolePer'})  
                            
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
                alert('삭제가 완료되었습니다.');  
                this.$router.push({name:'role'}) 
            })
            .catch((error) => {
                alert('에러가 발생하였습니다.'); 
                console.log(error.config)
            })
        }).catch(() => {
          alert('삭제가 취소되었습니다.');       
        });
        
      },
      cancle: function () {
        this.$router.go(-1)  
      }
    }
}
</script>