<template>
  <div class="container">
        <div>
            <div class="p-3 float-left">    
                <h4>객체추가</h4>
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
                            <td><el-input placeholder="" v-model="objectName"></el-input></td>
                            <td><el-input placeholder="" v-model="objectComment"></el-input></td>
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
export default {
  components: {
    name: "AddItem"
  },
  data() {
    return {
      selected: null,
      legacySelect: [],
      objSelect: [],
      objectName: null,
      objectComment: null,
      legacyId: null,
      objectTypeId: null
    };
  },
  created() {
    this.$http
      .get("http://dabin02272.cafe24.com:8090/api/object-type/list", {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        this.objSelect = response.data.results;

        var _self = this;
        _self.$http
          .get("http://dabin02272.cafe24.com:8090/api/legacy/list", {
            headers: { "Content-Type": "application/json" }
          })
          .then(response => {
            _self.legacySelect = response.data.results;
          });
      });
  },
  methods: {
    add: function() {
      var self = this;
      this.$http
        .post("http://dabin02272.cafe24.com:8090/api/object", {
          legacyId: self.legacyId,
          objectTypeId: self.objectTypeId,
          objectName: self.objectName,
          objectComment: self.objectComment
        })
        .then(response => {
          alert('추가가 완료되었습니다.');
          this.$router.push({ name: "obj" });
        })
        .catch(error => {
          alert('에러가 발생하였습니다.');
          console.log(error.config);
        });
    },
    cancle: function() {
      this.$router.go(-1);
    }
  }
};
</script>