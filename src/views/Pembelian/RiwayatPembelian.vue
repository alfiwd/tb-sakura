<template>
  <div class="riwayat-pembelian">
    <a-row>
      <a-col :xs="24" :md="24" :lg="24">
        <Table v-model:data="purchaseHistory" :columns="columnPurchaseHistory" :loading="loading" name="supplier" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Table from "../../components/Table.vue";

import columnPurchaseHistory from "../../data/column-purchase-history.json";
import toast from "../../components/toast";
import api from "../../services/api";

export default {
  data() {
    return {
      columnPurchaseHistory,
      purchaseHistory: [],
      loading: false,
    };
  },

  components: {
    Table,
  },

  methods: {
    async setData() {
      this.loading = true;
      try {
        const response = await api.get("api/order");
        console.log({ response });
        if (response.status === 200) {
          this.purchaseHistory = response.data.content;
          this.loading = false;
        }
      } catch (error) {
        this.toast("error", `Server error\nGagal mendapatkan data riwayat pembelian`);
        this.loading = false;
      }
    },
    toast,
  },

  mounted() {
    this.setData();
  },
};
</script>
