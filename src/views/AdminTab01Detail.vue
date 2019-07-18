<template>
  <div class="container">
        <div>
            <div class="p-3 float-left">    
                <h4>관리자 상세</h4>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="addItem">
                    <table class="table table-bordered">
                        <thead>
                            <th>순번</th>
                            <th>원천시스템</th>
                            <th>소속사</th>
                            <th>사번</th>
                            <th>성명</th>
                            <th>조직</th>
                            <th>직급</th>
                            <th>직책</th>
                            <th>비고</th>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td><el-input v-model="legacyName" :disabled="true"></el-input></td>
                            <td><el-input v-model="orgNm" :disabled="true"></el-input></td>
                            <td><el-input v-model="userEmpId" :disabled="true"></el-input></td>
                            <td><el-input v-model="userNm" :disabled="true"></el-input></td>
                            <td><el-input v-model="deptNm" :disabled="true"></el-input></td>
                            <td><el-input v-model="membPostion" :disabled="true"></el-input></td>
                            <td><el-input v-model="membRank" :disabled="true"></el-input></td>
                            <td><el-input v-model="adminComment"></el-input></td>
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
  name: "obj",
  data() {
    return {
      adminId: this.$route.params.objs.adminId,
      legacyName: this.$route.params.objs.legacyName,
      orgNm: this.$route.params.objs.orgNm,
      userEmpId: this.$route.params.objs.userEmpId,
      userNm: this.$route.params.objs.userNm,
      deptNm: this.$route.params.objs.deptNm,
      membPostion: this.$route.params.objs.membPostion,
      membRank: this.$route.params.objs.membRank,
      adminComment: this.$route.params.objs.adminComment,
      listData: []
    };
  },

  created() {
    APIService.getSuperAdminByAdminId(this.adminId).then(response => {
        this.listData = response;
    });
  },
  methods: {
    edit: function() {

      var self = this;
      
      var _msg = { adminId: self.adminId
                  , adminComment: self.adminComment
                 };

      APIService.putSuperAdmin(_msg).then(response => {
          alert('수정이 완료되었습니다.');
          this.$router.push({ name: "adminStatus" });
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
          var _t = { adminId: self.adminId };
          var _item = [_t];

            APIService.deleteSuperAdmin(_item).then(response => {
              alert('삭제가 완료되었습니다.');
              this.$router.push({ name: "adminStatus" });
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
<style>
td {
  cursor: pointer;
}
</style>
</style>
