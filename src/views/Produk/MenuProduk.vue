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
        <Table v-model:data="searchData" v-model:loading="loading" v-on:deleteItem="deleteProduct" :columns="columnProducts" name="product" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { AppstoreAddOutlined, DownOutlined } from "@ant-design/icons-vue";

import Table from "../../components/Table.vue";
import columnProducts from "../../data/column-products.json";
import api from "../../services/api";
import toast from "../../components/toast";

export default {
  data() {
    return {
      search: "",
      columnProducts,
      searchOption: "nama_produk",
      dataProducts: [],
      loading: false,
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
    async setData() {
      this.loading = true;
      try {
        const response = await api.get("api/product");
        console.log({ response });
        this.dataProducts = response.data.content;
        this.loading = false;
      } catch (error) {
        this.toast("error", `Server error\nGagal mendapatkan data produk`);
      }
    },
    async deleteProduct(id) {
      try {
        const response = await api.delete(`api/product/${id}`);
        if (response.status === 200) {
          this.toast("success", "Berhasil menghapus product");
          this.setData();
        }
      } catch (error) {
        this.toast("error", "Server error");
      }
    },
    toast,
  },

  computed: {
    searchData() {
      if (this.searchOption == "nama_produk") {
        const matchParam = new RegExp(this.search, "gi");
        return this.dataProducts?.filter((item) => item?.nama?.match(matchParam));
      } else {
        const matchParam = new RegExp(this.search, "gi");
        return this.dataProducts?.filter((item) => item?.kategori?.match(matchParam));
      }
    },
  },

  mounted() {
    this.setData();
  },
};
</script>

<style></style>
