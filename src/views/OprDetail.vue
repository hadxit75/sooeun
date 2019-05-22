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
            <div>
                <b-button v-on:click="edit" variant="success" >수정</b-button>&nbsp;&nbsp;&nbsp;
                <b-button v-on:click="del" variant="danger" >삭제</b-button>&nbsp;&nbsp;&nbsp;
                <b-button v-on:click="cancle" variant="warning" >취소</b-button>
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
      oprtnId: this.$route.params.objs.oprtnId,
      oprtnName: this.$route.params.objs.oprtnName,
      comment: this.$route.params.objs.comment
    }
  },
   methods: {
      edit: function() {
        var self = this
        this.$http.put('http://dabin02272.cafe24.com:8090/api/operation', {  oprtnId : self.oprtnId, 
                                                                          oprtnName : self.oprtnName,
                                                                          comment : self.comment })
        .then((response) => {
            this.$message({
                type: 'success',
                message: '수정이 완료되었습니다.'
            });
            this.$router.push({name:'opr'}) 
        })
        .catch((error) => {
            this.$message({
                type: 'error',
                message: '에러가 발생하였습니다.'
            });
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
            this.$http.delete('http://dabin02272.cafe24.com:8090/api/operation', { data: {oprtnId : self.oprtnId} })
            .then((response) => {
                this.$router.push({name:'opr'}) 
            })
            .catch((error) => {
                this.$message({
                    type: 'error',
                    message: '에러가 발생하였습니다.'
                });
                console.log(error.config)
            })

            this.$message({
            type: 'success',
            message: '삭제가 완료되었습니다.'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '삭제가 취소되었습니다.'
          });          
        });
        
      },
      cancle: function () {
        this.$router.go(-1)  
      }
    }
}
</script>