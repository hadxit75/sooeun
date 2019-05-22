<template>
  <div class="container">
        <div>
            <div class="p-3 float-left">    
                <h4>연산추가</h4>
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
                            <td><el-input placeholder="" v-model="oprtnName"></el-input></td>
                            <td><el-input placeholder="" v-model="comment"></el-input></td>
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
      oprtnId: null,
      oprtnName: null,
      comment: null
    }
  },
   methods: {
      add: function() {
        var self = this
        this.$http.post('http://dabin02272.cafe24.com:8090/api/operation', { oprtnId : self.oprtnId , 
                                                                             oprtnName : self.oprtnName,
                                                                             comment : self.comment })
        .then((response) => {
            this.$message({
                type: 'success',
                message: '추가가 완료되었습니다.'
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
      cancle: function () {
        this.$router.go(-1)  
      }
    }
}
</script>