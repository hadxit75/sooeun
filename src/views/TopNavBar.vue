<template>
  <navbar v-model="showNavbar">
    <div class="navbar-wrapper">
      <!-- <div class="navbar-minimize">
        <button id="minimizeSidebar" class="btn btn-icon btn-round" @click="minimizeSidebar">
          <i class="nc-icon nc-minimal-right text-center visible-on-sidebar-mini"></i>
          <i class="nc-icon nc-minimal-left text-center visible-on-sidebar-regular"></i>
        </button>
      </div> -->
      <!-- <div class="navbar-toggle">
        <navbar-toggle-button @click.native="toggleSidebar">

        </navbar-toggle-button>
      </div> -->
       <router-link to="/" >
      <a class="navbar-brand" href="#">HOME</a>
       </router-link>
    </div>

    <template slot="navbar-menu">
      <ul class="navbar-nav">
        <!-- <li class="nav-item">
          <router-link to="/" class="nav-item" tag="li">
          <a class="nav-link btn-magnify" >
            <i class="nc-icon nc-layout-11"></i>
            <p>
              <span class="d-md-block">권환 현황</span>
            </p>
          </a>
          </router-link>
        </li> -->
         <li class="nav-item">
          <router-link to="/obj" class="nav-item" tag="li">
          <a class="nav-link btn-magnify" >
            <i class="nc-icon nc-app"></i>
            <p>
              <span class="d-md-block">객체현황</span>
            </p>
          </a>
          </router-link>
        </li>
         <li class="nav-item">
          <router-link to="/opr" class="nav-item" tag="li">
          <a class="nav-link btn-magnify" >
            <i class="nc-icon nc-atom"></i>
            <p>
              <span class="d-md-block">연산관리</span>
            </p>
          </a>
          </router-link>
        </li>
         <li class="nav-item">
          <router-link to="/per" class="nav-item" tag="li">
          <a class="nav-link btn-magnify" >
            <i class="nc-icon nc-touch-id"></i>
            <p>
              <span class="d-md-block">권환현황</span>
            </p>
          </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/role" class="nav-item" tag="li">
          <a class="nav-link btn-magnify" >
            <i class="nc-icon nc-tap-01"></i>
            <p>
              <span class="d-md-block">Role현황</span>
            </p>
          </a>
          </router-link>
        </li>


        <drop-down icon="nc-icon nc-single-02" tag="li"
                   position="right"
                   direction="none"
                   class="nav-item btn-nmagnify dropdown">
          <a slot="title"
             slot-scope="{isOpen}"
             class="nav-link dropdown-toggle"
             data-toggle="dropdown"
             aria-haspopup="true"
             :aria-expanded="isOpen">
            <i class="nc-icon nc-single-02"></i>
            <p>
              <span class="d-md-block">사용자</span>
            </p>
          </a>
          <a class="dropdown-item" href="#">사용자 그룹관리</a>
          <a class="dropdown-item" href="#">사용자 관리</a>
        </drop-down>



        <!-- // <li class="nav-item">
        //   <router-link to="/user" class="nav-item" tag="li">
        //   <a class="nav-link btn-magnify" >
        //     <i class="nc-icon nc-single-02"></i>
        //     <p>
        //       <span class="d-md-block">User</span>
        //     </p>
        //   </a>
        //   </router-link>
        // </li> -->




        <li class="nav-item">
          <router-link to="/org" class="nav-item" tag="li">
          <a class="nav-link btn-magnify" >
            <i class="nc-icon nc-vector"></i>
            <p>
              <span class="d-md-block">조직도관리</span>
            </p>
          </a>
          </router-link>
        </li>
        
        <!-- <li class="nav-item">
          <a class="nav-link btn-rotate" href="#pablo">
            <i class="nc-icon nc-settings-gear-65"></i>
            <p>
              <span class="d-lg-none d-md-block">Account</span>
            </p>
          </a>
        </li> -->
      </ul>
    </template>
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
      showNavbar: true
    };
  },
  methods: {
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
.nav-item a,
.nav-item i {
  font-size: 20px !important;
}
</style>
