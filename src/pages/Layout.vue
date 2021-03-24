<template>
  <el-container>
    <el-aside :width="isCollapse ? '60px' : '226px'">
      <h3 class="logo">小U商城后台</h3>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#333"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">管理中心</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>系统设置</span>
          </template>
          <el-menu-item index="/menu">
            <span slot="title">菜单管理</span>
          </el-menu-item>
          <el-menu-item index="/role">
            <span slot="title">角色管理</span>
          </el-menu-item>
          <el-menu-item index="/user">
            <span slot="title">管理员管理</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-goods"></i>
            <span>商城管理</span>
          </template>
          <el-menu-item index="/cate">
            <span slot="title">商品分类</span>
          </el-menu-item>
          <el-menu-item index="/specs">
            <span slot="title">商品规格</span>
          </el-menu-item>
          <el-menu-item index="/goods">
            <span slot="title">商品管理</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="left">
          <el-button
            @click="isCollapse = !isCollapse"
            type="primary"
            icon="el-icon-s-fold"
            size="mini"
            class="leftbtn"
          ></el-button>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }"
              >管理中心</el-breadcrumb-item
            >
            <el-breadcrumb-item>数据可视化</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="right">
          <el-dropdown>
            <span class="el-dropdown-link">
              下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>全屏展示</el-dropdown-item>
              <el-dropdown-item>安全退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <!-- 二级路由占位符  -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  created() {},
  methods: {},
  components: {},
};
</script>
<style scoped>
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  display: flex;
  box-shadow: 0 0 5px #000;
  z-index: 1;
  justify-content: space-between;
}

.el-aside {
  background-color: #333;
  color: #fff;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.logo {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  font-weight: 400;
  letter-spacing: 3px;
  background-color: #555;
}
.el-menu {
  border: 0;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.left {
  display: flex;
  align-items: center;
}
.leftbtn {
  margin-right: 10px;
}
</style>