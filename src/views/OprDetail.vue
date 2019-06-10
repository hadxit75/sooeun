<template>
  <div class="container">
        <div>
            <div class="p-3 float-left">    
                <h4>연산상세</h4>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="addItem">
                    <table class="table table-bordered">
                        <thead>
                            <th>순번</th>
                            <th>연산이름</th>
                            <th>비고</th>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td><el-input v-model="oprtnName"></el-input></td>
                            <td><el-input v-model="comment"></el-input></td>
                            </tr>
                        </tbody>
                    </table>
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
import APIService from '../util/APIService';
export default {
  components: {
    name: "AddItem"
  },
  data() {
    return {
      oprtnId: this.$route.params.objs.oprtnId,
      oprtnName: this.$route.params.objs.oprtnName,
      comment: this.$route.params.objs.comment
    };
  },
  methods: {
    edit: function() {
      var self = this;
      var _msg = { oprtnId: self.oprtnId,
                   oprtnName: self.oprtnName,
                   comment: self.comment
                 };

      APIService.putOperation(_msg).then(response => {
          alert('수정이 완료되었습니다.');
          this.$router.push({ name: "opr" });
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
          var _msg = { data: { oprtnId: self.oprtnId } };

          APIService.deleteOperation(_msg).then(response => {
              alert('삭제가 완료되었습니다.');
              this.$router.push({ name: "opr" });
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