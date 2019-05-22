<template>
  <div id="app">
    <!-- 헤더 -->
      <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1"><a href="/">Role 관리시스템</a></el-menu-item>
          <el-menu-item index="2"><a href="/obj">객체관리</a></el-menu-item>
          <el-menu-item index="3"><a href="/opr">연산관리</a></el-menu-item>
          <el-menu-item index="4"><a href="/per">권한관리</a></el-menu-item>
          <el-submenu index="5">
            <template slot="title"><a href="/role">Role 관리</a></template>
            <el-menu-item index="5-1">Role 권한관리</el-menu-item>
          </el-submenu>
          <el-menu-item index="6"><a href="/user">사용자 관리</a></el-menu-item>
          <el-menu-item index="7"><a href="/org">조직도 관리</a></el-menu-item>
        </el-menu>

        <!-- <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">Role 관리시스템</el-menu-item>
        <el-menu-item index="2"><a href="/obj">객체관리</a></el-menu-item>
        <el-menu-item index="3"><a href="/opr">연산관리</a></el-menu-item>
        <el-menu-item index="4"><a href="/per">권한관리</a></el-menu-item>
        <el-submenu index="5">
        <template slot="title"><a href="/role">Role 관리</a></template>
          <el-menu-item index="5-1">Role 권한관리</el-menu-item>
        </el-submenu>
        <el-menu-item index="6"><a href="/user">사용자 관리</a></el-menu-item>
        <el-menu-item index="7"><a href="/org">조직도 관리</a></el-menu-item>
      </el-menu> -->
<!-- 
        <b-navbar toggleable="lg" type="dark" variant="secondary">
            <b-navbar-brand href="/">Role 관리시스템</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="/obj">객체관리</b-nav-item>
                <b-nav-item href="/opr">연산관리</b-nav-item>
                <b-nav-item href="/per">권한관리</b-nav-item>
                <b-nav-item-dropdown href="/role">Role 관리</b-nav-item-dropdown>
                  <b-dropdown-item href="#">Role 권한관리</b-dropdown-item>
                <b-nav-item href="/user">사용자 관리</b-nav-item>
                <b-nav-item href="/org">조직도 관리</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                <template slot="button-content"><em>User</em></template>
                <b-dropdown-item href="#">로그아웃</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar> -->
        </div>

    <!-- 라우터 뷰 -->
    <div id="content">
        <router-view />
    </div>

    <footer class="footer">
      <div class="container">
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        //console.log("key",key, keyPath);
      }
    }
  }
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
}
header, footer{
  height: 20px;
  padding: 20px;
}
header span {
  float: right;
}

#container {
  display: flex;
  flex: 1
}

#content {
  flex: 1;
  margin-left: 50px;
  margin-right: 50px;
  text-align: center;
}

footer span {
  float: right;
}
</style>
