<template>
 <div class="container">
    <div>
        <div class="p-3 float-left">    
            <h4>원천시스템 별 권한 현황</h4>
        </div>
        <!--
        <div class="p-3 float-right">
        <b-form inline>
            <b-form-select v-model="selected" :options="options"></b-form-select>
        </b-form>
        </div>
        -->

        <div class="card-body">
        <el-table
        :data = listData
        border
        :default-sort = "{prop: 'index', order: 'descending'}"
        height="530"
        style="width: 100">

        <el-table-column
        type="index"
        :index="indexMethod"
        label="순번"
        align="center"
        >
        </el-table-column>

        <el-table-column
        prop="system"
        label="원천시스템"
        header-align="center"
        >
        </el-table-column>
        
        <el-table-column
        prop="obj"
        label="객체"
        align="center">
        </el-table-column>

        <el-table-column
        prop="per"
        label="권한"
        align="center">
        </el-table-column>

        <el-table-column
        prop="role"
        label="Role"
        header-align="center">
        </el-table-column>

         <el-table-column
        prop="user"
        label="사용자"
        header-align="center">
        </el-table-column>
        
    </el-table>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
        selected: null,
        options: [
            { value: null, text: '순번' },
            { value: 'a', text: '원천시스템' },
            { value: 'b', text: '객체' },
            { value: 'c', text: '권한' },
            { value: 'd', text: 'Role'},
            { value: 'd', text: '사용자'}
      ],
      listHeader: ["순번","원천시스템", "객체", "권한", "Role", "사용자"],
      listData: [
        {id: 1, system: "공통", obj: 10, per: 20, role: 5, user: 200},
        {id: 2, system: "업무현황시스템", obj: 20, per: 30, role: 10, user: 300},
        {id: 3, system: "CRM", obj: 30, per: 40, role: 15, user: 400}
      ],
      text: "test"
    }
  }
  ,
    methods: {
      formatter(row, column) {
        return row.address;
      }
    }
};
</script>