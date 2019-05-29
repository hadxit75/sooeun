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
                           <td><el-select v-model="sitem.prmssnId" placeholder="Select" clearable>
                                <el-option 
                                v-for="item in objTypeSelect"
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
                <el-button plain type="primary" @click="edit">수정</el-button> 
                <el-button plain type="danger" @click="del">삭제</el-button> 
                <el-button plain type="warning" @click="cancle">취소</el-button> 
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
      objTypeSelect: [],
      objTypeSelectClone: [],
      roleTypeId: null,
      roleId: null,
      index: 1,
      tasks: [],
      roleComment: null,
      roleGroupComment: null
    }
  },
  created() {
    this.$http.get('http://dabin02272.cafe24.com:8090/api/role-permission/group/' + this.groupId, { headers: { 'Content-Type': 'application/json' } })
    .then((response) => {
      this.tasks = response.data.results;

      var _self = this
      this.$http.get('http://dabin02272.cafe24.com:8090/api/legacy/list', { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
        _self.legacySelect = response.data.results;
       })

      var _self = this
      this.$http.get('http://dabin02272.cafe24.com:8090/api/permission/list ', { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
        _self.objTypeSelect = response.data.results;
       })


    });   
  },
   methods: {
    legacyChange: function(selected){
        this.slegacyId = selected

        var _self = this;
        _self.objTypeSelect = [];

        _self.$http.get('http://dabin02272.cafe24.com:8090/api/role-group/legacy/' + selected ,{ headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                _self.objTypeSelect = response.data.results;
                _self.objTypeSelectClone = response.data.results;
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
          this.tasks.push({orders:_index++, legacyId:"", prmssnId:"", prmssnComment:""})
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
      edit: function() {
           //롤그룹 명, 코멘트 변경시
           if(this.rolePrmssnName != this.srolePrmssnName || this.rolePrmssnComment != this.srolePrmssnComment){
                var self = this

                self.$http.put('http://dabin02272.cafe24.com:8090/api/role-permission', { rolePrmssnName: self.rolePrmssnName 
                                                                                    ,rolePrmssnComment: self.rolePrmssnComment
                                                                                    ,groupId: self.groupId
                                                                                    })
            
                .then((response) => {
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
                var _item = { "isRoleGroup": 1
                            ,"groupRoleId": 3
                            ,"groupId": self2.groupId
                            ,"orders": sitem.orders 
                            ,"prmssnGroupId": sitem.prmssnGroupId
                            ,"rolePrmssnName": self2.rolePrmssnName
                            ,"rolePrmssnComment": self2.rolePrmssnComment
                            };

                _msg2.push(_item);
               }
            })

            self2.$http.post('http://dabin02272.cafe24.com:8090/api/role-group/put-add', _msg2)
            .then((response) => {
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
            //console.log("self.groupId:::>>>"+self.groupId)
            this.$http.delete('http://dabin02272.cafe24.com:8090/api/role-group/group-id', { data: [{ groupId : self.groupId}] })
            .then((response) => {
                this.$router.push({name:'role'}) 
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
      }
    }
}
</script>