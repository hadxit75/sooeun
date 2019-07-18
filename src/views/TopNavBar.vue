<template>
  <navbar v-model="showNavbar">
    <div class="navbar-wrapper">
       <router-link to="/" >
       <a class="navbar-brand" href="#"><img src="assets/img/logo.png"/>Role 관리 시스템</a>
       </router-link>
    </div>
    <div style="display:block;width:100%">
      <div style="display: inline-block; text-align: right; width: 100%">
        <div style="display:flex;float:right">
          <div style="margin-left:5px">
             <span v-if="this.$store.state.username">{{this.$store.state.username}}</span>
          </div>
          <div style="margin-left:5px" v-if="this.$store.state.username">
             <el-button size="mini" round @click="logOut()">로그아웃</el-button>&nbsp;
             <router-link to="/adminStatus" ><i class="fas fa-cog"></i></router-link>
          </div>
        </div>
      </div>
      <div class="center-align">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" >
          <el-menu-item index="1"> <router-link to="/obj" >객체관리</router-link></el-menu-item>
          <el-menu-item index="2"> <router-link to="/opr"> 연산관리</router-link></el-menu-item>
          <el-menu-item index="3"> <router-link to="/per"> 권한관리</router-link></el-menu-item>
          
          <el-submenu index="4">
            <template slot="title"><span class="custom-font">Role관리</span></template>
            <el-menu-item index="4-1">
              <router-link to="/role">Role관리</router-link>
            </el-menu-item>
            <el-menu-item index="4-2">
               <router-link to="/rolePer">Role 권한관리</router-link>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title"><span class="custom-font">사용자관리</span></template>
            <el-menu-item index="5-1">
              <router-link to="/ugstatus">사용자 그룹현황</router-link>
            </el-menu-item>
            <el-menu-item index="5-2">
               <router-link to="/userPerStatus">사용자 권한관리</router-link>
            </el-menu-item>
           </el-submenu>
            <el-menu-item index="6" ><router-link to="/org"> 조직도관리</router-link></el-menu-item>
          </el-menu>
      </div>
    </div>
  
  </navbar>
</template>
<script>
import { Navbar, NavbarToggleButton } from "../UIComponent";

export default {
  components: {
    Navbar,
    NavbarToggleButton
  },
  data() {
    return {
      activeNotifications: false,
      showNavbar: true,
      activeIndex: "",
      activeIndex2: ""
    };
  },
  mounted() {
    console.log(this.$store.state);
  },
  methods: {
    logOut() {
      // console.log("ff");
      // commit("IS_AUTH", false);
      this.$store.commit("USERNAME", null);
      this.$store.commit("IS_AUTH", false);
      this.$router.push("/login");
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    minimizeSidebar() {
      // this.$sidebar.toggleMinimize();
    },
    toggleNavbar() {
      this.showNavbar = !this.showNavbar;
    }
  }
};
</script>
<style>
.el-menu-item a,
.custom-font {
  font-size: 20px;
  text-decoration: none !important;
  color: #333333 !important;
}
.center-align {
  display: table;
  margin: 0 auto;
  margin-top: -15px;
}
</style>
