<template>
  <div class="container">
        <div>
            <div class="p-3 float-left">    
                <h4>Role 그룹추가</h4>
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
                            <td>{{sitem.idx}}</td>
                            <td><el-select v-model="sitem.legacyId" placeholder="Select" @change="legacyChange" clearable>
                                <el-option
                                v-for="item in legacySelect"
                                :key="item.legacyId"
                                :label="item.legacyName"
                                :value="item.legacyId">
                                </el-option>
                            </el-select></td>
                            <td><el-select v-model="sitem.roleTypeId" placeholder="Select" @change="roleTypeChange(index, $event)" clearable>
                                <el-option 
                                v-for="item in roleTypeSelect"
                                :key="item.roleTypeId"
                                :label="item.roleTypeName"
                                :value="item.roleTypeId">
                                </el-option>
                            </el-select></td>
                            <td><el-select v-model="sitem.roleId" placeholder="Select" @change="test(index,$event)" clearable>
                                <el-option
                                v-for="(item,index) in roleSelect"
                                :key="index"
                                :label="item.roleName"
                                :value="item.roleId">
                                </el-option>
                            </el-select></td>
                            <td><el-input placeholder="" v-model="sitem.roleComment"></el-input></td>
                            <td><el-button type="warning" v-on:click="rowMinus(sitem.idx)" plain>-</el-button></td>
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
                <el-button plain type="primary" @click="add">확인</el-button> 
                <el-button plain type="danger" @click="cancle">취소</el-button> 
            </div>
        </div>
    </div>
</template>

<script>
export default {
  components: {
      name: 'AddItem'
  },
  data() {
    return {
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
      roleGroupName: null,
      roleComment: null,
      slegacyId: null,
      roleGroupComment: null,
      groupId: null
    }
  },
  created() {
    this.$http.get('http://dabin02272.cafe24.com:8090/api/legacy/list', { headers: { 'Content-Type': 'application/json' } })
    .then((response) => {
      this.legacySelect = response.data.results;
    });   
  },
   methods: {
       test(index,event)
       {
           //console.log(this.tasks)
           var _a 
           this.tasks.forEach(item=>{
               if(item.idx == index+1)
               {
                   _a = item.roleId
               }
           })
           var _d = this.roleSelect.find(item=> item.roleId == _a)
           this.tasks = this.tasks.filter(item =>{
               if(item.idx == index+1)
               {
                    item.roleId = _a;
                    this.tasksClone.forEach(sitem=>{
                        if(sitem.roleId = item.roleId){
                            item.roleComment = sitem.roleComment
                        }
                    })
               }
               return item

           })

       },
      add: function() {
        var self = this
        var _msg = [];

        this.tasks.forEach(sitem=>{

             var _item = {"roleGroupName": self.roleGroupName
                         ,"roleId": sitem.roleId
                         ,"orders": sitem.idx
                         ,"roleGroupComment": self.roleGroupComment
                         ,"groupId": sitem.groupId};

            _msg.push(_item);
            console.log("_msg", _msg)
           
        })

        this.$http.post('http://dabin02272.cafe24.com:8090/api/role-group', _msg)
        .then((response) => {
            alert('추가가 완료되었습니다.');
            this.$router.push({name:'role'})  
                         
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
          this.tasks.push({idx:_index++, roleId:"", legacyId:"", roleGroupName:"", comment:""})
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
            _self.roleTypeSelect = [];

            _self.$http.get('http://dabin02272.cafe24.com:8090/api/role/legacy/' + this.slegacyId ,{ headers: { 'Content-Type': 'application/json' } })
                .then((response) => {
                    _self.roleTypeSelect = response.data.results;
            })
           
      },
      roleTypeChange: function(index, event){
        var _a 

        this.tasks.forEach(item=>{
            if(item.idx == index+1)
            {
                _a = item;
            }
        })
        
        var _idx = 0;

        var _self = this;

        _self.roleSelect = [];
        _self.roleSelect.push("")

        _self.$http.get('http://dabin02272.cafe24.com:8090//api/role/role-type/legacy/'+_self.slegacyId+'/'+ _a.roleTypeId ,{ headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                _self.roleSelect.push(...response.data.results);
                _self.tasksClone = response.data.results;
        })

        this.tasks = this.tasks.filter(item=>{
            if(item.idx == index+1)
            {
                item.roleId = ""
            }
            return item;
        })
      }
    }
}
</script>