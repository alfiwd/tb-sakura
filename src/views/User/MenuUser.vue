<template>
  <div class="menu-user">
    <div class="top-menu">
      <div class="input-area">
        <a-input-search v-model:value="search" placeholder="Cari user ..." enter-button style="width: 300px" />
      </div>
      <a-button type="primary" v-on:click="tambahUser">
        <template #icon><user-add-outlined /></template>
        Tambah User
      </a-button>
    </div>
    <div class="table">
      <Table v-model:data="searchData" :columns="columnUsers" name="user" />
    </div>
  </div>
</template>

<script>
import Table from "../../components/Table.vue";
import dataUsers from "../../data/users.json";
import columnUsers from "../../data/column-users.json";
import { UserAddOutlined, DownOutlined } from "@ant-design/icons-vue";

export default {
  data() {
    return {
      search: "",
      columnUsers,
      searchOption: "nama_supplier",
    };
  },

  components: {
    Table,
    UserAddOutlined,
    DownOutlined,
  },

  methods: {
    tambahUser() {
      this.$router.push("/tambah-user");
    },
  },

  computed: {
    searchData() {
      const matchParam = new RegExp(this.search, "gi");
      return dataUsers.filter((item) => item.namaUser.match(matchParam));
    },
  },
};
</script>

<style>
.menu-user {
  /* background-color: #fff; */
  /* padding: 20px 20px 0px 20px; */
  /* width: 1000px; */
  /* max-height: 70vh; */
  /* overflow: scroll; */
  height: 100%;
}

.menu-user .top-menu {
  display: flex;
  justify-content: space-between;
}

.menu-user .table {
  /* max-height: 68vh; */
  /* overflow: scroll; */
  margin-top: 15px;
}

.menu-user .input-area {
  /* display: flex; */
}

.menu-user .search-option {
  min-width: 150px;
  margin-right: 10px;
}

/* ======================= Responsive Breakpoints ======================= */
@media (max-width: 600px) {
  .menu-user {
    /* height: 500px; */
  }
}
</style>
