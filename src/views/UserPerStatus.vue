<template>
  <div class="wrapper">

    <div class="main-panel">
      <el-tabs type="border-card">
        <el-tab-pane label="사용자(그룹)권한현황"><UserPerTab01></UserPerTab01></el-tab-pane>
        <el-tab-pane label="사용자별 상세 권한현황"><UserPerTab06></UserPerTab06></el-tab-pane>
        <el-tab-pane label="사용자그룹 Role (그룹)권한추가"><UserPerTab02></UserPerTab02></el-tab-pane>
        <el-tab-pane label="사용자그룹 권한(그룹)추가"><UserPerTab03></UserPerTab03></el-tab-pane>
        <el-tab-pane label="사용자 Role (그룹)추가"><UserPerTab04></UserPerTab04></el-tab-pane>
        <el-tab-pane label="사용자 권한 (그룹)추가"><UserPerTab05></UserPerTab05></el-tab-pane>
      </el-tabs>
     </div>
  </div>
</template>
<style >
</style>
<script>
import UserPerTab01 from "./UserPerTab01.vue";
import UserPerTab02 from "./UserPerTab02.vue";
import UserPerTab03 from "./UserPerTab03.vue";
import UserPerTab04 from "./UserPerTab04.vue";
import UserPerTab05 from "./UserPerTab05.vue";
import UserPerTab06 from "./UserPerTab06.vue";
import TopNavbar from "./TopNavBar.vue";
import ContentFooter from "./ContentFooter.vue";
import MainContent from "./Content.vue";
//   import UserMenu from 'src/components/UIComponents/SidebarPlugin/UserMenu.vue'

export default {
  components: {
    UserPerTab01,
    UserPerTab02,
    UserPerTab03,
    UserPerTab04,
    UserPerTab05,
    UserPerTab06,
    TopNavbar,
    ContentFooter,
    MainContent
    //   UserMenu,
  },
  methods: {
    //   toggleSidebar () {
    //     if (this.$sidebar.showSidebar) {
    //       this.$sidebar.displaySidebar(false)
    //     }
    //   }
  }
};
</script>
<style>
.main-panel {
  width: 100% !important;
}
</style>

