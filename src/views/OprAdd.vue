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
      oprtnId: null,
      oprtnName: null,
      comment: null
    }
  },
   methods: {
      add: function() {
        var self = this
        var _mgs = { oprtnId : self.oprtnId , 
                     oprtnName : self.oprtnName,
                     comment : self.comment }
                     
       APIService.postOperation(_mgs).then((response) => {
            alert('추가가 완료되었습니다.');
            this.$router.push({name:'opr'})   
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