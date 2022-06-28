<template>
  <div class="menu-supplier">
    <a-row>
      <a-col :xs="24" :md="24" :lg="24">
        <a-row :gutter="[8, 0]">
          <a-col :xs="7" :md="8" :lg="5">
            <a-form-item class="search-option">
              <a-select v-model:value="searchOption">
                <a-select-option value="nama_supplier">Nama Supplier</a-select-option>
                <a-select-option value="alamat">Alamat</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="7" :md="8" :lg="5">
            <a-input-search v-model:value="search" placeholder="Cari supplier ..." enter-button />
          </a-col>
          <a-col :xs="10" :md="8" :lg="14" style="text-align: end">
            <a-button type="primary" v-on:click="tambahSupplier">
              <template #icon><appstore-add-outlined /></template>
              Tambah Supplier
            </a-button>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row>
      <a-col :xs="24" :md="24" :lg="24">
        <Table v-model:data="searchData" :loading="loading" v-on:deleteItem="deleteSupplier" :columns="columnSuppliers" name="supplier" />
      </a-col>
    </a-row>
    <!-- <div class="top-menu">
      <div class="input-area">
        <a-form-item class="search-option">
          <a-select v-model:value="searchOption">
            <a-select-option value="nama_supplier">Nama Supplier</a-select-option>
            <a-select-option value="kategori">Daerah</a-select-option>
          </a-select>
        </a-form-item>
        <a-input-search v-model:value="search" placeholder="Cari supplier ..." enter-button style="width: 300px" />
      </div>
      <a-button type="primary" v-on:click="tambahSupplier">
        <template #icon><appstore-add-outlined /></template>
        Tambah Supplier
      </a-button>
    </div>
    <div class="table">
      <Table v-model:data="searchData" :columns="columnSuppliers" name="supplier" />
    </div> -->
  </div>
</template>

<script>
import Table from "../../components/Table.vue";
import columnSuppliers from "../../data/column-suppliers.json";
import { AppstoreAddOutlined, DownOutlined } from "@ant-design/icons-vue";

import api from "../../services/api";
import toast from "../../components/toast";

export default {
  data() {
    return {
      search: "",
      columnSuppliers,
      searchOption: "nama_supplier",
      dataSuppliers: [],
      loading: false,
    };
  },

  components: {
    Table,
    AppstoreAddOutlined,
    DownOutlined,
  },

  methods: {
    tambahSupplier() {
      this.$router.push("/tambah-supplier");
    },
    async setData() {
      this.loading = true;
      try {
        const response = await api.get("api/supplier");
        this.dataSuppliers = response.data.content;
        this.loading = false;
      } catch (error) {
        this.toast("error", `Server error\nGagal mendapatkan data supplier`);
      }
    },
    async deleteSupplier(id) {
      try {
        const response = await api.delete(`api/supplier/${id}`);
        if (response.status === 200) {
          this.toast("success", "Berhasil menghapus supplier");
          this.setData();
        }
      } catch (error) {
        this.toast("error", `Server error\nGagal menghapus supplier`);
      }
    },
    toast,
  },

  computed: {
    searchData() {
      if (this.searchOption == "nama_supplier") {
        const matchParam = new RegExp(this.search, "gi");
        return this.dataSuppliers?.filter((item) => item?.nama?.match(matchParam));
      } else {
        const matchParam = new RegExp(this.search, "gi");
        return this.dataSuppliers?.filter((item) => item?.alamat?.match(matchParam));
      }
    },
  },

  mounted() {
    this.setData();
  },
};
</script>

<style></style>
