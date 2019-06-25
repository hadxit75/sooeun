<template>
  <div class="container">
        <div>
            <div class="p-3 float-left">    
                <h4>Role 권한추가</h4>
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
                            <td>{{index}}</td>
                            <td><el-select v-model="legacyId" @change="legacyChange" placeholder="Select" clearable>
                                <el-option
                                v-for="item in legacySelect"
                                :key="item.legacyId"
                                :label="item.legacyName"
                                :value="item.legacyId">
                                </el-option>
                            </el-select></td>
                            <td><el-select v-model="roleTypeId" @change="roletypeChange" placeholder="Select" clearable>
                                <el-option
                                v-for="item in roleTypeSelect"
                                :key="item.roleTypeId"
                                :label="item.roleTypeName"
                                :value="item.roleTypeId">
                                </el-option>
                            </el-select></td>
                            <td><el-select v-model="roleId" placeholder="Select" @change="setComment(index, $event)" clearable>
                                <el-option
                                v-for="item in roleSelect"
                                :key="item.roleId"
                                :label="item.roleName"
                                :value="item.roleId">
                                </el-option>
                            </el-select></td>
                            <td><el-input placeholder="" v-model="roleComment" ></el-input></td>
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
                            <td><el-select v-model="sitem.legacyId" placeholder="Select" @change="legacyChange2"  clearable>
                                <el-option
                                v-for="item in legacySelect2"
                                :key="item.legacyId"
                                :label="item.legacyName"
                                :value="item.legacyId">
                                </el-option>
                            </el-select></td>
                            <td><el-select v-model="sitem.groupId" placeholder="Select" @change="setComment2(sitem.idx, sitem.groupId)" clearable>
                                <el-option 
                                v-for="item in objTypeSelect2"
                                :key="item.groupId"
                                :label="item.prmssnName"
                                :value="item.groupId">
                                </el-option>
                            </el-select></td>
                            <td><el-input placeholder="" v-model="sitem.prmssnComment"></el-input></td>
                            <td><el-button type="warning" v-on:click="rowMinus(sitem.idx)" plain>-</el-button></td>
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
      legacySelect2: [],
      roleSelect: [],
      roleSelectClone: [],
      rolePrmssnName: null,
      rolePrmssnComment: null,
      legacyId: null,
      legacyId2: null,
      roleTypeSelect: [],
      objTypeSelect2: [],
      objTypeSelect2Clone: [],
      roleTypeId: null,
      roleId: null,
      index: 1,
      tasks: [],
      roleComment: null,
      sroleId: null,
      sprmssnId: null, 
      prmssnComment: null
    }
  },
  created() {
    this.$http.get('http://dabin02272.cafe24.com:8090/api/role/list', { headers: { 'Content-Type': 'application/json' } })
    .then((response) => {
      this.legacySelect = response.data.results;

      var _self = this
      this.$http.get('http://dabin02272.cafe24.com:8090/api/permission/list', { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
        _self.legacySelect2 = response.data.results;
    })

    });   
  },
   methods: {
    legacyChange: function(selected){
        this.slegacyId = selected

        var _self = this;
        _self.objTypeSelect = [];

        _self.$http.get('http://dabin02272.cafe24.com:8090/api/role/legacy/' + selected ,{ headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                _self.roleTypeSelect = response.data.results;
        })
  
      },
       legacyChange2: function(selected){
        //this.slegacyId2 = selected

        var _self = this;
        _self.objTypeSelect2 = [];

        _self.$http.get('http://dabin02272.cafe24.com:8090/api/permission/legacy/' + selected ,{ headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                _self.objTypeSelect2 = response.data.results;
                _self.objTypeSelect2Clone = response.data.results;
        })
  
      },
      roletypeChange: function(selected){
    
        var _self = this;
        _self.roleSelect = [];

        _self.$http.get('http://dabin02272.cafe24.com:8090/api/role/role-type/legacy/' + this.slegacyId 
        + '/' + selected ,{ headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                _self.roleSelect = response.data.results;
                _self.roleSelectClone = response.data.results;
        })
  
      },
      setComment: function(index,roleId){
    //   console.log("index",index)
    //   console.log("roleId",roleId)

      this.sroleId = roleId;
      var _self = this
      var _idx = 1;

      var _a ;
      this.roleSelect.forEach(item=>{
          if(_idx == index)
          {
              _a = item.roleId
          }
          _idx++;
      })

      _idx = 1;
      
      this.roleSelect = this.roleSelect.filter(item =>{
        if(_idx == index)
            {
                item.roleId = roleId;

                this.roleSelectClone.forEach(sitem=>{
                      if(sitem.roleId == _self.sroleId){	
                        _self.roleComment = sitem.roleComment;
                        // console.log("_self.userGroupComment",_self.userGroupComment)
                      }
                  })
            }
             _idx++;
            // console.log("item", item)
            return item
        })  
      },
      
      setComment2: function(index, groupId){
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
                // console.log("item.groupId",item.groupId)
                _self.objTypeSelect2Clone.forEach(sitem=>{
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
      rowPlus: function () {
          var _index = this.tasks.length+1;
          this.tasks.push({orders:_index++, legacyId:"", prmssnId:"", prmssnComment:"", groupId: ""})
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
      add: function() {
        var self = this

        var _msg = [];
        // console.log("tasks", this.tasks)
        this.tasks.forEach(sitem=>{

             var _item = {"isRoleGroup": 0 
                          , "groupRoleId" : 0
                          , "roleId": self.sroleId
                          , "orders": 1
                          , "prmssnGroupId": sitem.groupId 
                          , "rolePrmssnName" : self.rolePrmssnName
                          , "rolePrmssnComment": self.rolePrmssnComment};

            _msg.push(_item);
           
        })
        console.log(_msg)

         this.$http.post('http://dabin02272.cafe24.com:8090/api/role-permission', _msg)
        .then((response) => {
            alert('추가가 완료되었습니다.');
            this.$router.push({name:'rolePer'})  
                         
        })
        .catch((error) => {
            alert('에러가 발생하였습니다.');
            console.log(error.config)
        })
      },
      cancle: function () {
        this.$router.go(-1)  
      }
    }
}
</script>