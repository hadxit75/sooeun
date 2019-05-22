<template>
  <div class="container">
        <div>
            <div class="p-3 float-left">    
                <h4>Role 추가</h4>
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
                            <td><el-select v-model="roleTypeId" placeholder="Select" clearable>
                                <el-option
                                v-for="item in roleTypeSelect"
                                :key="item.roleTypeId"
                                :label="item.roleTypeName"
                                :value="item.roleTypeId">
                                </el-option>
                            </el-select></td>
                            <td><el-input placeholder="" v-model="roleName"></el-input></td>
                            <td><el-input placeholder="" v-model="roleComment"></el-input></td>
                            </tr>
                        </tbody>
                    </table>
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
      selected: null,
      legacySelect: [],
      objSelect: [],
      roleName: null,
      roleComment: null,
      legacyId: null,
      roleTypeSelect: null,
      roleTypeId: null,
      index: 1
    }
  },
  created() {
    this.$http.get('http://dabin02272.cafe24.com:8090/api/legacy/list', { headers: { 'Content-Type': 'application/json' } })
    .then((response) => {
      this.legacySelect = response.data.results;
    });   
  },
   methods: {
    legacyChange: function(selected){
        this.slegacyId = selected

        var _self = this;
        _self.objTypeSelect = [];

        _self.$http.get('http://dabin02272.cafe24.com:8090/api/role-type/list' ,{ headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                _self.roleTypeSelect = response.data.results;
        })
  
      },
      add: function() {
        var self = this
        this.$http.post('http://dabin02272.cafe24.com:8090/api/role', { roleTypeId : self.roleTypeId , 
                                                                          roleName : self.roleName,
                                                                          comment : self.roleComment,
                                                                          legacyId : self.legacyId })
        .then((response) => {
            this.$message({
                type: 'success',
                message: '추가가 완료되었습니다.'
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
      },
      cancle: function () {
        this.$router.go(-1)  
      }
    }
}
</script>