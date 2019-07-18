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
    APIService.getLegacyList().then((response) => {
      this.legacySelect = response;
    });   
  },
   methods: {
    legacyChange: function(selected){
        this.slegacyId = selected

        var _self = this;
        _self.objTypeSelect = [];

        APIService.getRoleTypeList().then((response) => {
          _self.roleTypeSelect = response;
        })
  
      },
      add: function() {
        var self = this
        var _msg =  { roleTypeId : self.roleTypeId 
                      , roleName : self.roleName
                      , roleComment : self.roleComment
                      , legacyId : self.legacyId };

        APIService.postRole(_msg).then((response) => {
          if(response.code == "200"){
              alert('추가가 완료되었습니다.');
              this.$router.push({name:'role'})   
               
           }else if(response.code != "200"){
              alert(response.message)
           }
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