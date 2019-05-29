<template>
  <div class="container">
        <div>
            <div class="p-3 float-left">    
                <h4>Role 그룹 권한상세</h4>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="addItem">
                    <table class="table table-bordered">
                        <thead>
                            <th>순번</th>
                            <th>원천시스템</th>
                            <th>Role 그룹 이름</th>
                            <th>비고</th>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td><el-input v-model="legacyName" disabled></el-input></td>
                            <td><el-input v-model="roleGroupName" disabled></el-input></td>
                            <td><el-input v-model="roleGroupComment"></el-input></td>
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
                            <th>권한(그룹)이름</th>
                            <th>비고</th>
                            <th>행삭제</th>
                        </thead>
                        <tbody>
                            <tr v-for="(sitem,index) in tasks " :index=index>
                            <td>{{sitem.orders}}</td>
                            <td><el-select v-model="sitem.legacyId" placeholder="Select" @change="legacyChange"  clearable>
                                <el-option
                                v-for="item in legacySelect"
                                :key="item.legacyId"
                                :label="item.legacyName"
                                :value="item.legacyId">
                                </el-option>
                            </el-select></td>
                            <td><el-select v-model="sitem.prmssnGroupId" placeholder="Select" clearable>
                                <el-option 
                                :key="sitem.prmssnGroupId"
                                :label="sitem.rolePrmssnName"
                                :value="sitem.prmssnGroupId">
                                </el-option>
                            </el-select></td>
                            <td><el-input placeholder="" v-model="sitem.prmssnComment"></el-input></td>
                            <td><el-button type="warning" v-on:click="rowMinus(sitem.idx)" plain>-</el-button></td>
                            </tr>
                            <tr>
                            <td>권한(그룹)이름</td> 
                            <td colspan="2"><el-input placeholder="" v-model="rolePrmssnName"></el-input></td>
                            <td> 비고</td>
                            <td><el-input placeholder="" v-model="rolePrmssnComment"></el-input></td>
                            </tr>
                        </tbody>
                    </table>
                    <el-row>
                    <el-button type="success" v-on:click="rowPlus" plain>+</el-button>
                    
                    </el-row>

                </form>
            </div>

            <div>
                <b-button v-on:click="add" variant="success">확인</b-button>&nbsp;&nbsp;&nbsp;&nbsp;
                <b-button v-on:click="cancle" variant="warning">취소</b-button>
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
      legacyName: this.$route.params.objs.legacyName,
      roleGroupName: this.$route.params.objs.roleGroupName,
      roleGroupComment: this.$route.params.objs.roleGroupComment,
      rolePrmssnName: this.$route.params.objs.rolePrmssnName,
      rolePrmssnComment: this.$route.params.objs.rolePrmssnComment,

      selected: null,
      legacySelect: [],
      legacySelect2: [],
      roleSelect: [],
      rolePrmssnName: null,
      rolePrmssnComment: null,
      legacyId: null,
      legacyId2: null,
      roleTypeSelect: [],
      roleTypeSelectClone: [],
      objTypeSelect2: [],
      roleTypeId: null,
      roleId: null,
      index: 1,
      tasks: [],
      roleComment: null,
      roleGroupComment: null
    }
  },
  created() {
    // console.log("groupId", this.groupId)
    // console.log("roleGroupName", this.roleGroupName)
    // console.log("roleGroupComment", this.roleGroupComment)
    this.$http.get('http://dabin02272.cafe24.com:8090/api/role-permission/group/' + this.groupId, { headers: { 'Content-Type': 'application/json' } })
    .then((response) => {
      this.tasks = response.data.results;

      var _self = this
      this.$http.get('http://dabin02272.cafe24.com:8090/api/legacy/list', { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
        _self.legacySelect = response.data.results;
    })

    });   
  },
   methods: {
    legacyChange: function(selected){
        this.slegacyId = selected

        var _self = this;
        _self.roleTypeSelect = [];

        _self.$http.get('http://dabin02272.cafe24.com:8090/api/role-group/legacy/' + selected ,{ headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                _self.roleTypeSelect = response.data.results;
                _self.roleTypeSelectClone = response.data.results;
        })
  
      },
      setComment: function(selected){
        var _self = this
        this.roleTypeSelectClone.forEach(sitem=>{
            if(sitem.roleGroupId = selected){
                _self.roleGroupComment = sitem.roleGroupComment
            }
        })
      },
      rowPlus: function () {
          var _index = this.tasks.length+1;
          this.tasks.push({idx:_index++, legacyId:"", prmssnId:"", prmssnComment:""})
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
        
        this.tasks.forEach(sitem=>{

             var _item = {"isRoleGroup": 0 
                          , "groupRoleId" : 0
                          , "groupId": sitem.groupId
                          , "orders": sitem.orders
                          , "prmssnGroupId": sitem.prmssnId 
                          , "rolePrmssnName" : self.rolePrmssnName
                          , "rolePrmssnComment": self.rolePrmssnComment};

            _msg.push(_item);
            //console.log(sitem.objectId);
           
        })
        //console.log(_msg)

         this.$http.post('http://dabin02272.cafe24.com:8090/api/role-permission/put-add,', _msg)
        .then((response) => {
            this.$message({
                type: 'success',
                message: '추가가 완료되었습니다.' 
             });
            this.$router.push({name:'rolePer'})  
                         
        })
        .catch((error) => {
            this.$message({
                type: 'error',
                message: '에러가 발생하였습니다.'
             });
            console.log(error.config)
        })
      },
      cancle: function () {
        this.$router.go(-1)  
      }
    }
}
</script>