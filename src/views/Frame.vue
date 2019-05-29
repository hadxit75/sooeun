<template>
  <div class="wrapper">

    <div class="main-panel">
      <top-navbar></top-navbar>
      <br/><br/>
      <main-content>

      </main-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style >
</style>
<script>
import TopNavbar from "./TopNavBar.vue";
import ContentFooter from "./ContentFooter.vue";
import MainContent from "./Content.vue";
//   import UserMenu from 'src/components/UIComponents/SidebarPlugin/UserMenu.vue'

export default {
  components: {
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

