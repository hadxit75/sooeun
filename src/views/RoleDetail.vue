ㄲ<template>
  <div class="container">
        <div>
            <div class="p-3 float-left">    
                <h4>Role 상세</h4>
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
                            <td>1</td>
                            <td><el-input v-model="legacyName" disabled></el-input></td>
                            <td><el-input v-model="roleTypeName" disabled></el-input></td>
                            <td><el-input v-model="roleName"></el-input></td>
                            <td><el-input v-model="roleComment"></el-input></td>
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
      legacyName: this.$route.params.objs.legacyName,
      roleTypeName: this.$route.params.objs.roleTypeName,
      roleId: this.$route.params.objs.roleId,
      roleName: this.$route.params.objs.roleName,
      roleComment: this.$route.params.objs.roleComment
    };
  },
  methods: {
    edit: function() {
      var self = this;
      var _msg = {  roleId: self.roleId,
                    roleName: self.roleName,
                    roleComment: self.roleComment
                  };

      APIService.putRole(_msg).then(response => {
          alert('수정이 완료되었습니다.');
          this.$router.push({ name: "role" });
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
          var _msg = { data: { roleId: self.roleId } };
          
            APIService.deleteRole(_msg).then(response => {
              this.$router.push({ name: "role" });
            })
            .catch(error => {
              alert('에러가 발생하였습니다.');
              console.log(error.config);
            });

          alert('삭제가 완료되었습니다.');
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