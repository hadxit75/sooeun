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
                                v-for="(item,index) in roleSelect"
                                :key="index"
                                :label="item.roleName"
                                :value="item.roleId">
                                </el-option>
                            </el-select></td>
                            <td><el-input placeholder="" v-model="sitem.comment" :disabled="sitem.utype != 'I'"></el-input></td>
                            <td><el-button type="warning" v-on:click="rowMinus(sitem.orders, sitem.roleGroupId)" plain>-</el-button></td>
                            </tr>
                            <tr>
                            <td >Role 그룹이름</td> 
                            <td colspan="2"><el-input placeholder="" v-model="roleGroupName"></el-input></td>
                            <td>비고</td>
                            <td colspan="2"><el-input placeholder="" v-model="roleComment"></el-input></td>
                            </tr>
                        </tbody>
                    </table>
                    <el-row>
                    <el-button type="success" v-on:click="rowPlus" plain>+</el-button>
                    
                    </el-row>

                </form>
            </div>
            <div>
                <b-button v-on:click="edit" variant="success" >수정</b-button>&nbsp;&nbsp;&nbsp;
                <b-button v-on:click="del" variant="danger" >삭제</b-button>&nbsp;&nbsp;&nbsp;
                <b-button v-on:click="cancle" variant="warning" >취소</b-button>
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
      groupId: this.$route.params.objs.groupId,
      roleGroupName: this.$route.params.objs.roleGroupName,
      roleComment: this.$route.params.objs.roleComment,
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
      slegacyId: null
    }
  },
  created() {
     console.log("this.groupId::"+this.groupId)
    this.$http.get('http://dabin02272.cafe24.com:8090/api/role-group/'+ this.groupId, { headers: { 'Content-Type': 'application/json' } })
    .then((response) => {
      this.tasks = response.data.results;
         this.tasks['utype']='U'
         this.roleTypeSelect = response.data.results;   
         this.roleSelect = response.data.results; 

         var _self = this;
         _self.$http.get('http://dabin02272.cafe24.com:8090/api/legacy/list', { headers: { 'Content-Type': 'application/json' } })
            .then((response) => {  
                _self.legacySelect = response.data.results;

        })       
    }); 
  },
   methods: {
       test(index,event)
       {
           //console.log("test tasks::",this.tasks)
           var _a 
           this.tasks.forEach(item=>{
               if(item.orders == index+1)
               {
                   _a = item.roleId
               }
           })
           var _d = this.roleSelect.find(item=> item.roleId == _a)
           this.tasks = this.tasks.filter(item =>{
               if(item.orders == index+1)
               {
                    item.roleId = _a;
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
                         ,"orders" : sitem.idx
                         ,"comment": self.roleComment};

            _msg.push(_item);
            console.log("_msg", _msg)
           
        })

      },
      edit: function() {
           var self = this
           var _msg = [];

           this.tasks.forEach(sitem=>{
                var _item = {"roleGroupName": self.roleGroupName
                ,"comment": self.roleComment
                ,"groupId": self.groupId };
                _msg.push(_item);
            })
           
            this.$http.put('http://dabin02272.cafe24.com:8090/api/role-group', _msg)
            .then((response) => {
                this.$message({
                    type: 'success',
                    message: '수정이 완료되었습니다.' 
                });
                //this.$router.push({name:'role'})  
                            
            })
            .catch((error) => {
                this.$message({
                    type: 'error',
                    message: '에러가 발생하였습니다.'
                });
                console.log(error.config)
            })

           var self2 = this

           var _msg2 = [];
           this.tasks.forEach(sitem=>{
               if(sitem.utype=="I"){
                var _item = {"roleId": sitem.roleId
                            ,"roleGroupName": self2.roleGroupName
                            ,"orders": sitem.orders 
                            ,"comment" : self2.roleComment
                            ,"groupId": self2.groupId};

                _msg2.push(_item);
               }
            })

            self2.$http.post('http://dabin02272.cafe24.com:8090/api/role-group/put-add', _msg2)
            .then((response) => {
                self2.$message({
                    type: 'success',
                    message: '수정이 완료되었습니다.' 
                });
                self2.$router.push({name:'role'})  
                            
            })
            .catch((error) => {
                self2.$message({
                    type: 'error',
                    message: '에러가 발생하였습니다.'
                });
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
            //console.log("self.groupId:::>>>"+self.groupId)
            this.$http.delete('http://dabin02272.cafe24.com:8090/api/role-group/group-id', { data: [{ groupId : self.groupId}] })
            .then((response) => {
                this.$router.push({name:'role'}) 
            })
            .catch((error) => {
                this.$message({
                    type: 'error',
                    message: '에러가 발생하였습니다.'
                });
                console.log(error.config)
            })

            this.$message({
            type: 'success',
            message: '삭제가 완료되었습니다.'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '삭제가 취소되었습니다.'
          });          
        });
        
      },
      cancle: function () {
        this.$router.go(-1)  
      },
      rowPlus: function () {
          var _index = this.tasks.length+1;
          this.tasks.push({orders:_index++,roleTypeId:"", legacyId:"", roleId:"", roleGroupName:"", roleGroupComment:"", utype:"I"})
      },
      rowMinus: function (sidx, roleGroupId) {
        alert(roleGroupId)
          if (roleGroupId != null) {
              if(this.tasks.length <= 1){
                  this.$message({
                    type: 'info',
                    message: '하단 삭제 버튼을 눌러 주세요.(전체삭제)'
                });
              }else if(this.tasks.length > 1){
              this.$confirm('삭제 하시겠습니까?', 'Warning', {
                confirmButtonText: '확인',
                cancelButtonText: '취소',
                type: 'warning'
                }).then(() => {
                    var self = this
                    this.$http.delete('http://dabin02272.cafe24.com:8090/api/role-group/role-group-id', { data: [{roleGroupId : roleGroupId}] })
                    .then((response) => {
                        self.$http.get('http://dabin02272.cafe24.com:8090/api/role-group/'+ this.groupId, { headers: { 'Content-Type': 'application/json' } })
                        .then((response) => {
                        self.tasks = response.data.results;
                        });
                    })
                    .catch((error) => {
                        this.$message({
                            type: 'error',
                            message: '에러가 발생하였습니다.'
                        });
                        console.log(error.config)
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '삭제가 취소되었습니다.'
                });          
            });
          }
          }else{
            //console.log("here?")
            var _lidx = 1;
            this.tasks = this.tasks.filter(item=>{
                   //console.log(item);
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

            _self.$http.get('http://dabin02272.cafe24.com:8090/api/role/legacy/' + this.slegacyId ,{ headers: { 'Content-Type': 'application/json' } })
                .then((response) => {
                    _self.roleTypeSelect = response.data.results;
            })
           
      },
      roleTypeChange: function(index, event){
        //console.log("start")
        var _a 

        this.tasks.forEach(item=>{
            if(item.orders == index+1)
            {
                _a = item;
            }
        })
        
        var _idx = 0;

        var _self = this;

        _self.roleSelect = [];
        _self.roleSelect.push("")
        
        _self.$http.get('http://dabin02272.cafe24.com:8090/api/role/role-type/legacy/'+_self.slegacyId+'/'+ _a.roleTypeId ,{ headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                _self.roleSelect.push(...response.data.results);
        })

        this.tasks = this.tasks.filter(item=>{
            if(item.orders == index+1)
            {
                item.roleId = ""
            }
            return item;
        })
      }
    }
}
</script>