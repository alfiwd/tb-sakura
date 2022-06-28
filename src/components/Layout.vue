<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo">
        <img src="../../public/images/logo.png" alt="logo" width="50" />
        <div v-if="collapsed"></div>
        <span v-else><strong>TB Sakura</strong></span>
      </div>
      <a-menu theme="dark" mode="inline">
        <a-menu-item key="1" :class="$route.name == 'Dashboard' ? 'ant-menu-item-selected' : ''">
          <home-outlined />
          <span>Dashboard</span>
          <router-link to="/dashboard"></router-link>
        </a-menu-item>
        <a-menu-item key="2" :class="$route.name == 'Menu Produk' || $route.name == 'Tambah Produk' || $route.name == 'Ubah Produk' ? 'ant-menu-item-selected' : ''">
          <hdd-outlined />
          <span>Menu Produk</span>
          <router-link to="/menu-produk"></router-link>
        </a-menu-item>
        <a-menu-item key="3" :class="$route.name == 'Menu Supplier' || $route.name == 'Tambah Supplier' || $route.name == 'Ubah Supplier' ? 'ant-menu-item-selected' : ''">
          <team-outlined />
          <span>Menu Supplier</span>
          <router-link to="/menu-supplier"></router-link>
        </a-menu-item>
        <a-menu-item key="4" :class="$route.name == 'Menu Pembelian' ? 'ant-menu-item-selected' : ''">
          <shop-outlined />
          <span>Menu Pembelian</span>
          <router-link to="/menu-pembelian"></router-link>
        </a-menu-item>
        <a-menu-item key="5" :class="$route.name == 'Keranjang' ? 'ant-menu-item-selected' : ''">
          <shopping-cart-outlined />
          <span>Keranjang</span>
          <router-link to="/keranjang"></router-link>
        </a-menu-item>
        <a-menu-item key="6" :class="$route.name == 'Riwayat Pembelian' || $route.name == 'Detail Riwayat Pembelian' ? 'ant-menu-item-selected' : ''">
          <ordered-list-outlined />
          <span>Riwayat Pembelian</span>
          <router-link to="/riwayat-pembelian"></router-link>
        </a-menu-item>
        <a-menu-item v-if="roles[0] === 'ROLE_ADMIN'" key="7" :class="$route.name == 'Menu User' ? 'ant-menu-item-selected' : ''">
          <user-outlined />
          <span>Menu User</span>
          <router-link to="/menu-user"></router-link>
        </a-menu-item>
        <a-menu-item v-on:click="logout" key="8">
          <logout-outlined />
          <span>Logout</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout style="width: min-content">
      <Modal :visible="visible" :name="name" />
      <a-layout-header style="padding: 0" />
      <a-layout-content style="margin: 30px 30px 0px 30px">
        <div v-if="$route.name != 'Dashboard'" class="menu-name">
          <a-breadcrumb separator=">">
            <a-breadcrumb-item v-for="(item, index) in breadcrumb" :key="item.id" class="breadcrumb">
              <router-link :to="item.path" v-if="index < breadcrumb.length - 1">
                <strong>{{ item.name }}</strong>
              </router-link>
              <strong v-else>{{ item.name }}</strong>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div style="height: 100%">
          <component :is="content"></component>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center"> TB Sakura @2022 </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { HomeOutlined, ShopOutlined, ShoppingCartOutlined, TeamOutlined, HddOutlined, LogoutOutlined, UserOutlined, OrderedListOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import Modal from "./Modal.vue";

export default defineComponent({
  components: {
    HomeOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    TeamOutlined,
    HddOutlined,
    LogoutOutlined,
    UserOutlined,
    OrderedListOutlined,
    Modal,
  },

  data() {
    return {
      collapsed: ref<boolean>(false),
      visible: false,
      name: "",
      roles: [],
    };
  },

  props: ["content", "breadcrumb"],

  methods: {
    logout() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("orderProduct");
      this.$router.push("/");
    },
  },

  mounted() {
    if (!localStorage.getItem("accessToken")) {
      this.$router.push("/");
    }
    if (this.$route.params.name) {
      this.name = this.$route.params.name;
      this.visible = true;
    }
    const dataUser = JSON.parse(localStorage.getItem("user"));
    this.roles.push(dataUser.roles[0]);
  },
});
</script>
<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

.logo span {
  color: #fff;
  margin-left: 15px;
}

.menu-name {
  margin-bottom: 30px;
}

.menu-name h1 {
  font-size: 1.7em;
}

.breadcrumb {
  font-size: 1.7em;
}
</style>
