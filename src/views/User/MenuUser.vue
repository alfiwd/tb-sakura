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
      <Table v-model:data="searchData" @deleteItem="deleteUser" :columns="columnUsers" :loading="loading" name="user" />
    </div>
  </div>
</template>

<script>
import { UserAddOutlined, DownOutlined } from "@ant-design/icons-vue";

import api from "../../services/api";
import toast from "../../components/toast";
import Table from "../../components/Table.vue";
import columnUsers from "../../data/column-users.json";

export default {
  data() {
    return {
      search: "",
      columnUsers,
      searchOption: "nama_supplier",
      dataUsers: [],
      loading: false,
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
    async setData() {
      this.loading = true;
      try {
        const response = await api.get("api/user");
        if (response.status === 200) {
          this.dataUsers = response.data.content;
          this.loading = false;
        }
      } catch (error) {
        this.toast("error", `Server error\nGagal mendapatkan data user`);
      }
    },
    async deleteUser(id) {
      if (id === 1) {
        this.toast("error", "Tidak dapat menghapus user admin");
      } else {
        try {
          const response = await api.delete(`api/user/${id}`);
          if (response.status === 200) {
            this.toast("success", "Berhasil menghapus user");
            this.setData();
          }
        } catch (error) {
          this.toast("error", `Server error\nGagal menghapus user`);
        }
      }
    },
    toast,
  },

  computed: {
    searchData() {
      const matchParam = new RegExp(this.search, "gi");
      return this.dataUsers?.filter((item) => item?.nama?.match(matchParam));
    },
  },

  mounted() {
    this.setData();
  },
};
</script>

<style>
.menu-user {
  height: 100%;
}

.menu-user .top-menu {
  display: flex;
  justify-content: space-between;
}

.menu-user .table {
  margin-top: 15px;
}

.menu-user .search-option {
  min-width: 150px;
  margin-right: 10px;
}
</style>
