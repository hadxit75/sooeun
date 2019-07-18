<template>
  <div class="container">
        <div>
            <div class="p-3 float-left">    
                <h4>권한상세</h4>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="addItem">
                    <table class="table table-bordered">
                        <thead>
                            <th>순번</th>
                            <th>원천시스템</th>
                            <th>객체종류</th>
                            <th>객체이름</th>
                            <th>연산이름</th>
                            <th>비고</th>
                            <th>행삭제</th>
                        </thead>
                        <tbody>
                            <tr v-for="(sitem,index) in tasks " :index=index>
                            <td>{{sitem.orders}}</td>
                            <td>
                                <el-select v-model="sitem.legacyId" placeholder="Select" @change="legacyChange" :disabled="sitem.utype != 'I'" clearable>
                                <el-option
                                v-for="item in legacySelect"
                                :key="item.legacyId"
                                :label="item.legacyName"
                                :value="item.legacyId">
                                </el-option>
                            </el-select></td>
                            <td><el-select v-model="sitem.objectTypeId" placeholder="Select" @change="objTypeChange(index, $event)" :disabled="sitem.utype != 'I'" clearable>
                                <el-option
                                v-for="item in objTypeSelect"
                                :key="item.objectTypeId"
                                :label="item.objectTypeName"
                                :value="item.objectTypeId">
                                </el-option>
                            </el-select></td>
                            <td><el-select v-model="sitem.objectId" placeholder="Select" @change="test(index,$event)" :disabled="sitem.utype != 'I'" clearable>
                                <el-option
                                v-for="(item,index) in objectTypeSelectNew(sitem.legacyId, sitem.objectTypeId)"
                                :key="index"
                                :label="item.objectName"
                                :value="item.objectId">
                                </el-option>
                            </el-select></td>
                            <td><el-select v-model="sitem.oprtnId" placeholder="Select" :disabled="sitem.utype != 'I'" clearable>
                                <el-option
                                v-for="item in oprSelect"
                                :key="item.oprtnId"
                                :label="item.oprtnName"
                                :value="item.oprtnId">
                                </el-option>
                            </el-select></td>
                            <td><el-input placeholder="" v-model="sitem.objectComment" :disabled="sitem.utype != 'I'" ></el-input></td>
                            <td><el-button type="warning" v-on:click="rowMinus(sitem.orders, sitem.prmssnId)" plain>-</el-button></td>
                            </tr>
                            <tr>
                            <td colspan="2">권한(그룹)이름</td> 
                            <td colspan="2"><el-input placeholder="" v-model="prmssnName"></el-input></td>
                            <td>비고</td>
                            <td colspan="2"><el-input placeholder="" v-model="prmssnComment"></el-input></td>
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
      selected: null,
      legacySelect: [],
      objTypeSelect: [],
      objTypeSelectClone : [],
      objSelect: [],
      objectName: null,
      comment: null,
      legacyId: null,
      objectTypeId: null,
      oprSelect: [],
      oprtnId: null,
      oprtnName: null,
      tasks: [],   
      tasksClone: [],               
      prmssnName: this.$route.params.objs.prmssnName,
      prmssnComment: this.$route.params.objs.prmssnComment,
      sprmssnName: this.$route.params.objs.prmssnName,
      sprmssnComment: this.$route.params.objs.prmssnComment,
      objectId: null,
      editFlag: 0, 
      dummy: [],
      slegacyId: null
    }
  },
  created() {
        APIService.getPermissionByGroupId(this.groupId).then((response)=>{
            this.tasks = response;
            this.tasks['utype']='U'
    
            var _self = this;
            APIService.getLegacyList().then((response) => {  
                _self.legacySelect = response;
            })       

            APIService.getOperationList().then((response) => {
                _self.oprSelect = response;
            })

            APIService.getObjectList().then((response) => {
                _self.objSelect = response;
                _self.tasksClone = response;
            })
            
            APIService.getObjectTypeList().then((response) => {
                _self.objTypeSelect = response;
            })
        });   
  },
   methods: {
    test(index,event)
    {
        var _a;
        var _idx = 1;
        this.tasks.forEach(item=>{
            if(_idx == index+1)
            {
                _a = item.objectId
            }
            _idx++;
        })
       
       _idx = 1;
        this.tasks = this.tasks.filter(item =>{
            if(_idx == index+1)
            {
                item.objectId = _a;
                //비고
                this.tasksClone.forEach(sitem=>{
                        if(sitem.objectId == item.objectId){
                            item.objectComment = sitem.objectComment
                        }
                    })
            }
            _idx++;
            //console.log(item)
            return item

        })

    },
    objectTypeSelectNew(legacyId, objectTypeId)
    {

        var _r=[];
        this.objSelect.forEach(item=>{
            if(item.objectTypeId == objectTypeId && item.legacyId == legacyId)
            {
                _r.push(item);
            }
        });
        return _r;

    },
    edit: function() {
           //권한명, 코멘트 변경시
           if(this.prmssnName!=this.sprmssnName || this.prmssnComment!=this.sprmssnComment){
            var self = this
            var _msg = [];

            this.tasks.forEach(sitem=>{
                    var _item = {"prmssnName": self.prmssnName
                                ,"objectId": sitem.objectId
                                ,"oprtnId": sitem.oprtnId 
                                ,"orders" : sitem.orders
                                ,"prmssnComment": self.prmssnComment
                                ,"groupId": sitem.groupId
                                ,"prmssnId":sitem.prmssnId};
                    _msg.push(_item);
                })
            
               APIService.postPermission(_msg).then((response) => {
                    alert('수정이 완료되었습니다.');
                    this.$router.push({name:'per'})  
                                
                })
                .catch((error) => {
                    alert('에러가 발생하였습니다.');
                    console.log(error.config)
                })
           }

           //항목 추가 시
           var self2 = this
           var _msg2 = [];
           this.tasks.forEach(sitem=>{
               if(sitem.utype=="I"){
                var _item = {"prmssnName": self2.prmssnName
                            ,"objectId": sitem.objectId
                            ,"oprtnId": sitem.oprtnId 
                            ,"orders" : sitem.orders
                            ,"groupId": self2.groupId
                            ,"prmssnComment": self2.prmssnComment};
                _msg2.push(_item);
               }
            })

            APIService.putPermission(_msg2).then((response) => {
                alert('수정이 완료되었습니다.');
                self2.$router.push({name:'per'})  
                            
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
            var _msg = { groupId : self.groupId };
           
            APIService.deleteUserPermissionGroupId(_msg).then((response) => {
                alert('삭제가 완료되었습니다.');
                self.$router.push({name:'per'}) 
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
      },
      rowPlus: function () {
          var _index = this.tasks.length+1;
          this.tasks.push({orders:_index++,objectTypeId:"", legacyId:"", objectName:"", oprtnId:"", comment:"", utype:"I"})
          this.editFlag++;
      },
      rowMinus: function (sidx, sPrmssnId) {
          if (sPrmssnId != null) {
              if(this.tasks.length <= 1){
                  alert('하단 삭제 버튼을 눌러 주세요.(전체삭제)');

              }else if(this.tasks.length > 1){
                this.$confirm('삭제 하시겠습니까?', 'Warning', {
                confirmButtonText: '확인',
                cancelButtonText: '취소',
                type: 'warning'

              }).then(() => {
                    var self = this
                    var _msg = {prmssnId : sPrmssnId};

                    APIService.deletePermissionById(_msg).then((response) => {

                        APIService.getPermissionByGroupId(self.groupId).then((response)=>{
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
      legacyChange: function(selected){
        this.slegacyId = selected

        var _self = this;
        _self.objTypeSelect = [];

        var _m = new Map();
        
        APIService.getObjLegacyList(selected).then((response) => {
            response.forEach(item=>{
                _m.set(item.objectTypeId, { objectTypeId : item.objectTypeId, objectTypeName : item.objectTypeName})
            });

            _m.forEach(item=>{
                _self.objTypeSelect.push(item);
            });
        })
      },
      objTypeChange: function(index, event){
        var _a = []
        this.tasks.forEach(item=>{
            if(item.orders == index+1)
            {
                _a = item;
            }
        })

        var _self2 = this;
        APIService.getOperationList().then((response) => {
            _self2.oprSelect = response;
        })

        var _idx = 1;
        this.tasks = this.tasks.filter(item=>{
            if(_idx == index+1)
            {
                item.objectId = ""
            }
            _idx++;
            return item;
        })
      }
    }
}
</script>