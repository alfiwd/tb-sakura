<template>
  <div class="detail-riwayat-pembelian">
    <a-row v-if="loading">
      <a-col :xs="24" :md="24" align="middle">
        <loading-outlined style="font-size: 50px" />
      </a-col>
    </a-row>
    <a-row v-else-if="!loading" :gutter="[0, 30]">
      <a-col :xs="24" :md="24" style="">
        <a-row :gutter="[10, 0]">
          <a-col :xs="4" :md="4" style=""
            ><h1><strong>No</strong></h1></a-col
          >
          <a-col :xs="4" :md="4" style=""
            ><h1><strong>Foto</strong></h1></a-col
          >
          <a-col :xs="4" :md="4" style="text-align: center"
            ><h1><strong>Kategori</strong></h1></a-col
          >
          <a-col :xs="4" :md="4" style="text-align: center"
            ><h1><strong>Nama Produk</strong></h1></a-col
          >
          <a-col :xs="4" :md="4" style="text-align: center"
            ><h1><strong>Harga</strong></h1></a-col
          >
          <a-col :xs="4" :md="4" style="text-align: center"
            ><h1><strong>Jumlah</strong></h1></a-col
          >
        </a-row>
      </a-col>
      <a-col :xs="24" :md="24">
        <a-row v-for="(item, index) in orderItems" :key="item.product.id" align="middle" style="margin-bottom: 20px">
          <a-col :xs="4" :md="4">{{ index + 1 }}. </a-col>
          <a-col :xs="4" :md="4" class="foto-produk">
            <img :src="`data:image/png;base64,${item.product.photo}`" alt="foto product" />
          </a-col>
          <a-col :xs="4" :md="4" style="text-align: center">{{ item.product.nama }}</a-col>
          <a-col :xs="4" :md="4" style="text-align: center">{{ item.product.kategori }}</a-col>
          <a-col :xs="4" :md="4" style="text-align: center">{{ rupiah(`${item.price}`, "Rp. ") }}</a-col>
          <a-col :xs="4" :md="4" style="text-align: center">{{ item.quantity }}</a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { LoadingOutlined } from "@ant-design/icons-vue";

import toast from "../../components/toast";
import api from "../../services/api";
import rupiah from "../../helper/rupiah";

export default {
  data() {
    return {
      data: null,
      orderItems: [],
      loading: false,
    };
  },

  methods: {
    async setData(id) {
      this.loading = true;
      try {
        const response = await api.get(`api/order/${id}`);
        if (response.status === 200) {
          this.data = response.data;
          this.orderItems = response.data.orderItems;
          this.loading = false;
        }
      } catch (error) {
        this.toast("error", `Server error\nGagal mendapatkan detail riwayat pembelian`);
      }
    },
    rupiah,
    toast,
  },

  mounted() {
    if (this.$route.name == "Detail Riwayat Pembelian" && this.$route.params.data == undefined) {
      this.$router.push("/riwayat-pembelian");
    }
    if (this.$route.params.data) {
      this.setData(this.$route.params.data);
    }
  },

  components: {
    LoadingOutlined,
  },
};
</script>

<style>
.detail-riwayat-pembelian .foto-produk img {
  width: 100px;
}

/* ===================== Responsive Breakpoints ===================== */
@media (max-width: 992px) {
  .detail-riwayat-pembelian .foto-produk img {
    width: 50px;
  }
}
</style>
