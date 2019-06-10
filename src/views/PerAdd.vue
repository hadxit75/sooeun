<template>
  <div class="container">
        <div>
            <div class="p-3 float-left">    
                <h4>권한추가</h4>
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
                            <td>{{sitem.idx}}</td>
                            <td><el-select v-model="sitem.legacyId" placeholder="Select" @change="legacyChange"  clearable>
                                <el-option
                                v-for="item in legacySelect"
                                :key="item.legacyId"
                                :label="item.legacyName"
                                :value="item.legacyId">
                                </el-option>
                            </el-select></td>
                            <td><el-select v-model="sitem.objectTypeId" placeholder="Select" @change="objTypeChange(index, $event)" clearable>
                                <el-option 
                                v-for="item in objTypeSelect"
                                :key="item.objectTypeId"
                                :label="item.objectTypeName"
                                :value="item.objectTypeId">
                                </el-option>
                            </el-select></td>
                            <td><el-select v-model="sitem.objectId" placeholder="Select" @change="test(index,$event)" clearable>
                                <el-option
                                v-for="(item,index) in objSelect"
                                :key="index"
                                :label="item.objectName"
                                :value="item.objectId">
                                </el-option>
                            </el-select></td>
                            <td><el-select v-model="sitem.oprtnId" placeholder="Select" clearable>
                                <el-option
                                v-for="item in oprSelect"
                                :key="item.oprtnId"
                                :label="item.oprtnName"
                                :value="item.oprtnId">
                                </el-option>
                            </el-select></td>
                            <td><el-input placeholder="" v-model="sitem.objectComment"></el-input></td>
                            <td><el-button type="warning" v-on:click="rowMinus(sitem.idx)" plain>-</el-button></td>
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
                <el-button plain type="primary" @click="add">확인</el-button> 
                <el-button plain type="danger" @click="cancle">취소</el-button> 
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
      selected: null,
      legacySelect: [],
      objTypeSelect: [],
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
      prmssnName: null,
      prmssnComment: null,
      objectId: null,
      slegacyId: null,
      objectComment: null
    }
  },
  created() {
    APIService.getLegacyList().then((response) => {
      this.legacySelect = response;
    });   
  },
   methods: {
       test(index,event)
       {
           var _a 
 
           this.tasks.forEach(item=>{
               if(item.idx == index+1)
               {
                   _a = item.objectId
               }
    
           })

           this.tasks = this.tasks.filter(item =>{
               if(item.idx == index+1)
               {
                    item.objectId = _a;

                    this.tasksClone.forEach(sitem=>{
                        if(sitem.objectId == item.objectId){
                            item.objectComment = sitem.objectComment
                        }
                    })
               }
               return item
           })
           //console.log("this.tasks",this.tasks)
       },
      add: function() {
        var self = this

        var _msg = [];
  
        this.tasks.forEach(sitem=>{
             var _item = {"prmssnName": self.prmssnName,"objectId": sitem.objectId,"oprtnId": sitem.oprtnId , "orders" : sitem.idx, "prmssnComment": self.prmssnComment};
             _msg.push(_item);
        })

        APIService.postPermission(_msg).then((response) => {
            alert('추가가 완료되었습니다.');
            this.$router.push({name:'per'})               
        })
        .catch((error) => {
            alert('에러가 발생하였습니다.');
            console.log(error.config)
        })
      },
      cancle: function () {
        this.$router.go(-1)  
      },
      rowPlus: function () {
          var _index = this.tasks.length+1;
          this.tasks.push({idx:_index++,objectTypeId:"", legacyId:"", objectName:"", oprtnId:"", comment:"", objectComment:""})
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
      legacyChange: function(selected){
            this.slegacyId = selected

            var _self = this;
            _self.objTypeSelect = [];

            APIService.getObjLegacyList(selected).then((response) => {
                    _self.objTypeSelect = response;
            })  
      },
      objTypeChange: function(index, event){
            var _a 

            this.tasks.forEach(item=>{
                if(item.idx == index+1)
                {
                    _a = item;
                }
            })
        
            var _idx = 0;
            var _self = this;

            _self.objSelect = [];
            _self.objSelect.push("")

            APIService.getObjTypeLegacyList(_self.slegacyId, _a.objectTypeId).then((response) => {
                    _self.objSelect.push(...response);
                    _self.tasksClone = response;
            })

            var _self2 = this;
            APIService.getOperationList().then((response) => {
                _self2.oprSelect = response;
             })
 
            this.tasks = this.tasks.filter(item=>{
              if(item.idx == index+1)
              {
                 item.objectId = ""
              }
              return item;
          })
       }
    }
}
</script>