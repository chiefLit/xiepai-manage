<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

import * as userApi from '@/api/user'

function handlerRoutes(items, menus) {
  return items
    .filter(item => menus.find(menu => menu === item.name))
    .map(item => {
      if (item.meta && item.meta.routeable) {
        let res = { ...item };
        if (item.children) res.children = handlerRoutes(item.children, menus);
        return res;
      }
    });
}

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      menus: []
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return handlerRoutes(this.$router.options.routes, this.menus)
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  beforeMount() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const data = await userApi.getUserInfo()
      this.menus = data.object.menus;
    }
  }
}
</script>
