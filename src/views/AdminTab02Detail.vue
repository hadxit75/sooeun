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
                            <th>비고</th>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td><el-input v-model="legacyName"></el-input></td>
                            <td><el-input v-model="comment"></el-input></td>
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
      legacyId: this.$route.params.objs.legacyId
      , legacyName: this.$route.params.objs.legacyName
      , comment: this.$route.params.objs.comment
    };
  },

  created() {
    
  },
  methods: {
    edit: function() {

      var self = this;
      
      var _msg = { legacyId: self.legacyId
                  , legacyName: self.legacyName
                  , comment: self.comment
                 };

      APIService.putLegacy(_msg).then(response => {
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
          var _t = { legacyId: self.legacyId };

          console.log(_t)
            APIService.deleteLegacy(_t).then(response => {
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
