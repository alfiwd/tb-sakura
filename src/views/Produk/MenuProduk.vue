<template>
  <div class="menu-product">
    <a-row>
      <a-col :xs="24" :md="24" :lg="24">
        <a-row :gutter="[8, 0]">
          <a-col :xs="7" :md="8" :lg="5">
            <a-form-item class="search-option">
              <a-select v-model:value="searchOption">
                <a-select-option value="nama_produk">Nama Produk</a-select-option>
                <a-select-option value="kategori">Kategori</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="7" :md="8" :lg="5">
            <a-input-search v-model:value="search" placeholder="Cari produk ..." enter-button />
          </a-col>
          <a-col :xs="10" :md="8" :lg="14" style="text-align: end">
            <a-button type="primary" v-on:click="tambahProduk">
              <template #icon><appstore-add-outlined /></template>
              Tambah Produk
            </a-button>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row>
      <a-col :xs="24" :md="24" :lg="24">
        <Table v-model:data="searchData" :columns="columnProducts" name="product" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Table from "../../components/Table.vue";
import dataProducts from "../../data/products.json";
import columnProducts from "../../data/column-products.json";
import { AppstoreAddOutlined, DownOutlined } from "@ant-design/icons-vue";

export default {
  data() {
    return {
      search: "",
      columnProducts,
      searchOption: "nama_produk",
    };
  },

  components: {
    Table,
    AppstoreAddOutlined,
    DownOutlined,
  },

  methods: {
    tambahProduk() {
      this.$router.push("/tambah-produk");
    },
  },

  computed: {
    searchData() {
      if (this.searchOption == "nama_produk") {
        const matchParam = new RegExp(this.search, "gi");
        return dataProducts.filter((item) => item.namaProduk.match(matchParam));
      } else {
        const matchParam = new RegExp(this.search, "gi");
        return dataProducts.filter((item) => item.kategori.match(matchParam));
      }
    },
  },
};
</script>

<style></style>
