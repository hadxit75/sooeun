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
      <a class="navbar-brand" href="#">ROLE</a>
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
            <i class="nc-icon nc-layout-11"></i>
            <p>
              <span class="d-md-block">객체 현황</span>
            </p>
          </a>
          </router-link>
        </li>
         <li class="nav-item">
          <router-link to="/opr" class="nav-item" tag="li">
          <a class="nav-link btn-magnify" >
            <i class="nc-icon nc-layout-11"></i>
            <p>
              <span class="d-md-block">Opr</span>
            </p>
          </a>
          </router-link>
        </li>
         <li class="nav-item">
          <router-link to="/per" class="nav-item" tag="li">
          <a class="nav-link btn-magnify" >
            <i class="nc-icon nc-layout-11"></i>
            <p>
              <span class="d-md-block">Per</span>
            </p>
          </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/role" class="nav-item" tag="li">
          <a class="nav-link btn-magnify" >
            <i class="nc-icon nc-layout-11"></i>
            <p>
              <span class="d-md-block">Role</span>
            </p>
          </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/user" class="nav-item" tag="li">
          <a class="nav-link btn-magnify" >
            <i class="nc-icon nc-layout-11"></i>
            <p>
              <span class="d-md-block">User</span>
            </p>
          </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/org" class="nav-item" tag="li">
          <a class="nav-link btn-magnify" >
            <i class="nc-icon nc-layout-11"></i>
            <p>
              <span class="d-md-block">Org</span>
            </p>
          </a>
          </router-link>
        </li>
        <drop-down icon="nc-icon nc-bell-55" tag="li"
                   position="right"
                   direction="none"
                   class="nav-item btn-rotate dropdown">
          <a slot="title"
             slot-scope="{isOpen}"
             class="nav-link dropdown-toggle"
             data-toggle="dropdown"
             aria-haspopup="true"
             :aria-expanded="isOpen">
            <i class="nc-icon nc-bell-55"></i>
            <p>
              <span class="d-lg-none d-md-block">Some Actions</span>
            </p>
          </a>
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </drop-down>
        <li class="nav-item">
          <a class="nav-link btn-rotate" href="#pablo">
            <i class="nc-icon nc-settings-gear-65"></i>
            <p>
              <span class="d-lg-none d-md-block">Account</span>
            </p>
          </a>
        </li>
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
</style>
