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
      legacyName: this.$route.params.objs.legacyName,
      roleTypeName: this.$route.params.objs.roleTypeName,
      roleId: this.$route.params.objs.roleId,
      roleName: this.$route.params.objs.roleName,
      comment: this.$route.params.objs.comment
    }
  },
   methods: {
      edit: function() {
        var self = this
        this.$http.put('http://dabin02272.cafe24.com:8090/api/role', {  roleId : self.roleId, 
                                                                        roleName : self.roleName,
                                                                        comment : self.comment })
        .then((response) => {
            this.$message({
                type: 'success',
                message: '수정이 완료되었습니다.'
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
      del: function() {

        this.$confirm('삭제 하시겠습니까?', 'Warning', {
          confirmButtonText: '확인',
          cancelButtonText: '취소',
          type: 'warning'
        }).then(() => {
            var self = this
            this.$http.delete('http://dabin02272.cafe24.com:8090/api/role', { data: {roleId : self.roleId} })
            .then((response) => {
                this.$router.push({name:'role'}) 
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