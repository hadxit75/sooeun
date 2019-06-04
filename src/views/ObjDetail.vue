<template>
  <div class="container">
        <div>
            <div class="p-3 float-left">    
                <h4>객체상세</h4>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="addItem">
                    <table class="table table-bordered">
                        <thead>
                            <th>순번</th>
                            <th>원천시스템</th>
                            <th>객체종류</th>
                            <th>객체이름</th>
                            <th>비고</th>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td><el-select v-model="legacyId" placeholder="Select">
                                <el-option
                                v-for="item in legacySelect"
                                :key="item.legacyId"
                                :label="item.legacyName"
                                :value="item.legacyId">
                                </el-option>
                            </el-select></td>
                            <td><el-select v-model="objectTypeId" placeholder="Select">
                                <el-option
                                v-for="item in objSelect"
                                :key="item.objectTypeId"
                                :label="item.objectTypeName"
                                :value="item.objectTypeId">
                                </el-option>
                            </el-select></td>
                            <td><el-input v-model="objectName"></el-input></td>
                            <td><el-input v-model="objectComment"></el-input></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            <div style="margin-left:20px">
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
    name: "AddItem"
  },
  data() {
    return {
      legacyId: this.$route.params.objs.legacyId,
      legacyName: this.$route.params.objs.legacyName,
      objectTypeId: this.$route.params.objs.objectTypeId,
      objectTypeName: this.$route.params.objs.objectTypeName,
      objectId: this.$route.params.objs.objectId,
      objectName: this.$route.params.objs.objectName,
      objectComment: this.$route.params.objs.objectComment,
      legacySelect: [],
      objSelect: []
    };
  },
  created() {
    APIService.getObjectTypeList().then(response => {
        this.objSelect = response;

        var _self = this;
        APIService.getLegacyList().then(response => {
            _self.legacySelect = response;
          });
      });
  },
  methods: {
    edit: function() {

      var self = this;
      
      var _msg = {objectId: self.objectId,
                  objectTypeId: self.objectTypeId,
                  objectName: self.objectName,
                  legacyId: self.legacyId,
                  objectComment: self.objectComment
              };

      APIService.putObject(_msg).then(response => {
          alert('수정이 완료되었습니다.');
          this.$router.push({ name: "obj" });
        })
        .catch(error => {
          alert('에러가 발생하였습니다.');
          console.log(error.config);
        });
    },
    del: function() {
      this.$confirm("삭제 하시겠습니까?", "Warning", {
        confirmButtonText: "확인",
        cancelButtonText: "취소",
        type: "warning"
      })
        .then(() => {
          var self = this;
          var _msg = {
              data: { objectId: self.objectId }
            };

            APIService.deleteObject(_msg).then(response => {
              alert('삭제가 완료되었습니다.');
              this.$router.push({ name: "obj" });
            })
            .catch(error => {
              alert('에러가 발생하였습니다.');
              console.log(error.config);
            });
        })
        .catch(() => {
          alert('삭제가 취소되었습니다.');
        });
    },
    cancle: function() {
      this.$router.go(-1);
    }
  }
};
</script>