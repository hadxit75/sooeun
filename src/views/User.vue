<template>
<div class="container">
    <div>
        <div class="p-3 float-left">    
            <h4>사용자 관리</h4>
        </div>
        <div class="card-body">
        <table class="table table-bordered">
           <thead>
                <th v-for="item in listHeader" :key="item">{{item}}</th>
            </thead>
            <tbody>
                <tr v-for="item in listData" :key="item.id">
                <td>{{item.system}}</td>
                <td>{{item.objId}}</td>
                <td>{{item.objType}}</td>
                <td>{{item.objName}}</td>
                <td>{{item.edit}}</td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: "obj",
  data() {
    return {
      listHeader: ["원천시스템", "객체ID", "객체 종류", "객체 이름", "편집"],
      listData: [
        {id: 1, system: "공통", objId: "1", objType: "메뉴", objName: "공통-1", edit: "편집 삭제"},
        {id: 2, system: "업무현황시스템", objId: "2", objType: "보고서", objName: "보고서-1", edit: "편집 삭제"},
        {id: 3, system: "CRM", objId: "3", objType: "스크린", objName: "마케팅관리", edit: "편집 삭제"}
      ]
    }
  }
};
</script>
