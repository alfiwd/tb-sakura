<template>
  <div class="menu-pembelian">
    <a-row style="margin-bottom: 25px">
      <a-col :xs="12" :md="8" :lg="6">
        <a-input-search v-model:value="search" placeholder="Cari produk ..." enter-button />
      </a-col>
      <a-col :xs="12" :md="16" :lg="18" style="text-align: end">
        <a-pagination v-model:current="current" :total="total" @change="onChange" :responsive="true" :showSizeChanger="true" show-less-items />
      </a-col>
    </a-row>
    <a-row>
      <a-col :xs="24" :md="24" :lg="24">
        <a-list :grid="{ gutter: [20, 20], xs: 2, sm: 3, md: 4, lg: 5, xl: 5, xxl: 5 }" :data-source="searchData" :loading="loading">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-card hoverable>
                <template #cover>
                  <img alt="example" :src="`data:image/png;base64,${item.photo}`" />
                </template>
                <div class="card-detail">
                  <h1 class="title">
                    <strong>{{ item?.nama?.toUpperCase() }}</strong>
                  </h1>
                  <p>{{ item?.kategori }}</p>
                  <p v-if="item?.stok < 1" style="color: red">STOK HABIS</p>
                  <p v-else-if="item?.stok > 0">{{ item?.stok }}</p>
                  <p class="price">
                    <strong>{{ rupiah(`${item?.hargaJual}`, "Rp. ") }}</strong>
                  </p>
                </div>
                <template v-if="item?.stok > 0" #actions>
                  <div @click="beli(item)" class="beli">
                    <shopping-outlined />
                    <span><strong>Beli</strong></span>
                  </div>
                </template>
              </a-card>
            </a-list-item>
          </template>
        </a-list>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ShoppingOutlined } from "@ant-design/icons-vue";

import api from "../../services/api";
import toast from "../../components/toast";
import rupiah from "../../helper/rupiah";

export default {
  data() {
    return {
      current: 1,
      data: [],
      minValue: 0,
      maxValue: 10,
      total: 0,
      search: "",
      loading: false,
      sameProduct: null,
    };
  },

  components: {
    ShoppingOutlined,
  },

  methods: {
    onChange(current, maxItem) {
      console.log({ current });
      console.log({ maxItem });
      this.current = current;
      this.minValue = (current - 1) * maxItem;
      this.maxValue = current * maxItem;
    },
    async setData() {
      this.loading = true;
      try {
        const response = await api.get("api/product");
        this.data = response.data.content;
        this.total = response.data.content.length;
        this.loading = false;
      } catch (error) {
        this.toast("error", `Server error\nGagal mendapatkan data produk`);
      }
    },
    beli(item) {
      if (localStorage.getItem("orderProduct") == null) {
        let data = [];
        item.quantity = 1;
        data.push({ ...item });
        localStorage.setItem("orderProduct", JSON.stringify(data));
        this.toast("success", "Berhasil menambahkan ke keranjang");
      } else {
        let data = JSON.parse(localStorage.getItem("orderProduct"));
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === item.id) {
            data[i].quantity += 1;
            this.sameProduct = true;
            break;
          } else {
            this.sameProduct = false;
          }
        }
        if (this.sameProduct) {
          localStorage.setItem("orderProduct", JSON.stringify(data));
        } else if (!this.sameProduct) {
          item.quantity = 1;
          data.push({ ...item });
          localStorage.setItem("orderProduct", JSON.stringify(data));
        }
        this.toast("success", "Berhasil menambahkan ke keranjang");
      }
    },
    rupiah,
    toast,
  },

  computed: {
    searchData() {
      const matchParam = new RegExp(this.search, "gi");
      const data = this.data.filter((item) => item?.nama?.match(matchParam));
      const result = data.slice(this.minValue, this.maxValue);
      this.total = data.length;
      if (result.length > 0) {
        return result;
      } else {
        return data;
      }
    },
  },

  mounted() {
    this.setData();
  },
};
</script>

<style>
.menu-pembelian .beli span {
  margin-left: 10px;
}

.menu-pembelian .card-detail {
  text-align: center;
  padding-top: 10px;
}

.menu-pembelian .card-detail .title {
  letter-spacing: 2px;
}

.menu-pembelian .card-detail .price {
  color: #1890ff;
}

.menu-pembelian .ant-card-body {
  padding: 0px 5px !important;
}

.menu-pembelian .ant-card-actions:hover {
  background-color: #1890ff;
}

.menu-pembelian .ant-card-actions .beli {
  color: grey;
}

.menu-pembelian .ant-card-actions .beli:hover {
  color: #000;
}
</style>
