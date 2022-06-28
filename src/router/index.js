import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import MenuProduk from "../views/Produk/MenuProduk.vue";
import MenuSupplier from "../views/Supplier/MenuSupplier.vue";
import MenuPembelian from "../views/Pembelian/MenuPembelian.vue";
import Keranjang from "../views/Keranjang.vue";
import MenuUser from "../views/User/MenuUser.vue";
import KelolaProduk from "../views/Produk/KelolaProduk.vue";
import KelolaSupplier from "../views/Supplier/KelolaSupplier.vue";
import KelolaUser from "../views/User/KelolaUser.vue";
import RiwayatPembelian from "../views/Pembelian/RiwayatPembelian.vue";
import DetailRiwayatPembelian from "../views/Pembelian/DetailRiwayatPembelian.vue";

import Layout from "../components/Layout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Layout,
      props: {
        content: Dashboard,
      },
    },
    {
      path: "/menu-produk",
      name: "Menu Produk",
      component: Layout,
      props: {
        content: MenuProduk,
        breadcrumb: [
          {
            id: 1,
            name: "Menu Produk",
            path: "/menu-produk",
          },
        ],
      },
    },
    {
      path: "/tambah-produk",
      name: "Tambah Produk",
      component: Layout,
      props: {
        content: KelolaProduk,
        breadcrumb: [
          {
            id: 1,
            name: "Menu Produk",
            path: "/menu-produk",
          },
          {
            id: 2,
            name: "Tambah Produk",
            path: "/tambah-produk",
          },
        ],
      },
    },
    {
      path: "/ubah-produk",
      name: "Ubah Produk",
      component: Layout,
      props: {
        content: KelolaProduk,
        breadcrumb: [
          {
            id: 1,
            name: "Menu Produk",
            path: "/menu-produk",
          },
          {
            id: 2,
            name: "Ubah Produk",
            path: "/ubah-produk",
          },
        ],
      },
    },
    {
      path: "/menu-supplier",
      name: "Menu Supplier",
      component: Layout,
      props: {
        content: MenuSupplier,
        breadcrumb: [
          {
            id: 1,
            name: "Menu Supplier",
            path: "/menu-supplier",
          },
        ],
      },
    },
    {
      path: "/tambah-supplier",
      name: "Tambah Supplier",
      component: Layout,
      props: {
        content: KelolaSupplier,
        breadcrumb: [
          {
            id: 1,
            name: "Menu Supplier",
            path: "/menu-supplier",
          },
          {
            id: 2,
            name: "Tambah Supplier",
            path: "/tambah-supplier",
          },
        ],
      },
    },
    {
      path: "/ubah-supplier",
      name: "Ubah Supplier",
      component: Layout,
      props: {
        content: KelolaSupplier,
        breadcrumb: [
          {
            id: 1,
            name: "Menu Supplier",
            path: "/menu-supplier",
          },
          {
            id: 2,
            name: "Ubah Supplier",
            path: "/ubah-supplier",
          },
        ],
      },
    },
    {
      path: "/menu-pembelian",
      name: "Menu Pembelian",
      component: Layout,
      props: {
        content: MenuPembelian,
        breadcrumb: [
          {
            id: 1,
            name: "Menu Pembelian",
            path: "/menu-pembelian",
          },
        ],
      },
    },
    {
      path: "/keranjang",
      name: "Keranjang",
      component: Layout,
      props: {
        content: Keranjang,
        breadcrumb: [
          {
            id: 1,
            name: "Keranjang",
            path: "/keranjang",
          },
        ],
      },
    },
    {
      path: "/menu-user",
      name: "Menu User",
      component: Layout,
      props: {
        content: MenuUser,
        breadcrumb: [
          {
            id: 1,
            name: "Menu User",
            path: "/menu-user",
          },
        ],
      },
    },
    {
      path: "/ubah-user",
      name: "Ubah User",
      component: Layout,
      props: {
        content: KelolaUser,
        breadcrumb: [
          {
            id: 1,
            name: "Menu User",
            path: "/menu-user",
          },
          {
            id: 2,
            name: "Ubah User",
            path: "/ubah-user",
          },
        ],
      },
    },
    {
      path: "/tambah-user",
      name: "Tambah User",
      component: Layout,
      props: {
        content: KelolaUser,
        breadcrumb: [
          {
            id: 1,
            name: "Menu User",
            path: "/menu-user",
          },
          {
            id: 2,
            name: "Tambah User",
            path: "/tambah-user",
          },
        ],
      },
    },
    {
      path: "/riwayat-pembelian",
      name: "Riwayat Pembelian",
      component: Layout,
      props: {
        content: RiwayatPembelian,
        breadcrumb: [
          {
            id: 1,
            name: "Riwayat Pembelian",
            path: "/riwayat-pembelian",
          },
        ],
      },
    },
    {
      path: "/detail-riwayat-pembelian",
      name: "Detail Riwayat Pembelian",
      component: Layout,
      props: {
        content: DetailRiwayatPembelian,
        breadcrumb: [
          {
            id: 1,
            name: "Riwayat Pembelian",
            path: "/riwayat-pembelian",
          },
          {
            id: 2,
            name: "Detail Riwayat Pembelian",
            path: "/detail-riwayat-pembelian",
          },
        ],
      },
    },
  ],
});

export default router;
