<template>
  <div class="wrapper">

    <div class="main-panel">
      <el-tabs type="border-card">
        <el-tab-pane label="관리자현황"><AdminTab01></AdminTab01></el-tab-pane>
        <el-tab-pane label="원천시스템 현황"><AdminTab02></AdminTab02></el-tab-pane>
      </el-tabs>
     </div>
  </div>
</template>
<style >
</style>
<script>
import AdminTab01 from "./AdminTab01.vue";
import AdminTab02 from "./AdminTab02.vue";
import TopNavbar from "./TopNavBar.vue";
import ContentFooter from "./ContentFooter.vue";
import MainContent from "./Content.vue";
//   import UserMenu from 'src/components/UIComponents/SidebarPlugin/UserMenu.vue'

export default {
  components: {
    AdminTab01,
    AdminTab02,
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

