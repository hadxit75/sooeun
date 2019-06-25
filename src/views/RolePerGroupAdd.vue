<template>
  <div class="container">
        <div>
            <div class="p-3 float-left">    
                <h4>Role 그룹 권한추가</h4>
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
                            <td>{{index}}</td>
                            <td><el-select v-model="legacyId" @change="legacyChange" placeholder="Select" clearable>
                                <el-option
                                v-for="item in legacySelect"
                                :key="item.legacyId"
                                :label="item.legacyName"
                                :value="item.legacyId">
                                </el-option>
                            </el-select></td>
                            <td><el-select v-model="roleGroupId" @change="setComment(index, $event)" placeholder="Select" clearable>
                                <el-option
                                v-for="item in roleTypeSelect"
                                :key="item.roleGroupId"
                                :label="item.roleGroupName"
                                :value="item.roleGroupId">
                                </el-option>
                            </el-select></td>
                            <td><el-input placeholder="" v-model="roleGroupComment"></el-input></td>
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
                            <td>{{sitem.idx}}</td>
                            <td><el-select v-model="sitem.legacyId" placeholder="Select" @change="legacyChange2"  clearable>
                                <el-option
                                v-for="item in legacySelect2"
                                :key="item.legacyId"
                                :label="item.legacyName"
                                :value="item.legacyId">
                                </el-option>
                            </el-select></td>
                            <td><el-select v-model="sitem.prmssnId" placeholder="Select" clearable>
                                <el-option 
                                v-for="item in objTypeSelect2"
                                :key="item.prmssnId"
                                :label="item.prmssnName"
                                :value="item.prmssnId">
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
      //roleSelectClone: [],
      rolePrmssnName: null,
      rolePrmssnComment: null,
      legacyId: null,
      legacyId2: null,
      roleTypeSelect: [],
      roleTypeSelectClone: [],
      objTypeSelect2: [],
      roleTypeId: null,
      roleId: null,
      sroleId: null,
      index: 1,
      tasks: [],
      sorders: null,
      roleComment: null,
      roleGroupComment: null,
      sroleGroupId: null,
      roleGroupId: null
      
    }
  },
  created() {
    this.$http.get('http://dabin02272.cafe24.com:8090/api/role-group/list', { headers: { 'Content-Type': 'application/json' } })
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
        _self.roleTypeSelect = [];

        _self.$http.get('http://dabin02272.cafe24.com:8090/api/role-group/legacy/' + selected ,{ headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                _self.roleTypeSelect = response.data.results;
                _self.roleTypeSelectClone = response.data.results;
        })
  
      },
       legacyChange2: function(selected){
        //this.slegacyId2 = selected

        var _self = this;
        _self.objTypeSelect2 = [];

        _self.$http.get('http://dabin02272.cafe24.com:8090/api/permission/legacy/' + selected ,{ headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                _self.objTypeSelect2 = response.data.results;
        })
  
      },
       setComment: function(index,selected){
        //    console.log("index",index)
        //    console.log("selected",selected)
        this.sroleGroupId = selected
        var _self = this

        this.roleTypeSelectClone.forEach(sitem=>{
            if(sitem.roleGroupId = selected){
                _self.roleGroupComment = sitem.roleGroupComment
                _self.sroleId = sitem.roleId
                _self.sorders = sitem.orders
            }
         })
   
        // this.roleTypeSelect = this.roleTypeSelect.filter(item =>{
        //     if(item.index == index)
        //     {
        //         item.roleGroupId = _self.sroleGroupId;

        //          this.roleTypeSelectClone.forEach(sitem=>{
        //                 if(sitem.roleGroupId = _self.sroleGroupId){	
        //                     console.log("sitem.roleGroupId",sitem.roleGroupId)
        //                 }
        //             })
        //     }
        //     //console.log(item)
        //     //onsole.log("this.roleComment",this.roleComment)
        //     return item
        // })
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
        var sOrders = 2;
        this.tasks.forEach(sitem=>{

             var _item = {"isRoleGroup": 1 
                          , "groupRoleId" : 3
                          , "roleId": self.sroleId
                          , "orders": sOrders
                          , "prmssnGroupId": sitem.prmssnId 
                          , "rolePrmssnName" : self.rolePrmssnName
                          , "rolePrmssnComment": self.rolePrmssnComment};

            _msg.push(_item);
            sOrders++;
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