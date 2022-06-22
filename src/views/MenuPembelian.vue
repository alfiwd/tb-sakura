<template>
  <div class="menu-pembelian">
    <a-row style="margin-bottom: 25px">
      <a-col :xs="12" :md="8" :lg="6">
        <a-input-search v-model:value="search" placeholder="Cari produk ..." enter-button />
      </a-col>
      <a-col :xs="12" :md="16" :lg="18" style="text-align: end">
        <a-pagination v-model:current="current" :total="total" @change="onChange" show-less-items />
      </a-col>
    </a-row>
    <a-row>
      <a-col :xs="24" :md="24" :lg="24">
        <a-list :grid="{ gutter: 16, xs: 2, sm: 3, md: 4, lg: 5, xl: 5, xxl: 5 }" :data-source="searchData">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-card hoverable>
                <template #cover>
                  <img alt="example" src="https://cdn-icons-png.flaticon.com/512/7099/7099483.png" />
                </template>
                <div class="card-detail">
                  <h1 class="title">
                    <strong>{{ item.title.toUpperCase() }}</strong>
                  </h1>
                  <p>{{ item.id }}</p>
                  <p class="price">Rp. 30000</p>
                </div>
                <template #actions>
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

    <!-- <a-row :gutter="[0, 16]">
      <a-col v-for="item in searchData" :key="item.id" :xs="14" :sm="13" :md="11" :lg="8" :xl="6" :xxl="4">
        <a-card hoverable style="width: 250px">
          <template #cover>
            <img alt="example" src="https://cdn-icons-png.flaticon.com/512/7099/7099483.png" />
          </template>
          <div class="card-detail">
            <h1 class="title">
              <strong>{{ item.title.toUpperCase() }}</strong>
            </h1>
            <p>{{ item.id }}</p>
            <p class="price">Rp. 30000</p>
          </div>
          <template #actions>
            <div class="beli">
              <shopping-outlined />
              <span><strong>Beli</strong></span>
            </div>
          </template>
        </a-card>
      </a-col>
    </a-row> -->
  </div>
</template>

<script>
import { ShoppingOutlined } from "@ant-design/icons-vue";

import api from "../services/api";

export default {
  data() {
    return {
      current: 1,
      data: [],
      minValue: 0,
      maxValue: 10,
      total: 0,
      search: "",
    };
  },

  components: {
    ShoppingOutlined,
  },

  methods: {
    onChange(current, maxItem) {
      this.current = current;
      this.minValue = (current - 1) * maxItem;
      this.maxValue = current * maxItem;
    },
    async setData() {
      try {
        const response = await api.get("https://jsonplaceholder.typicode.com/posts");
        this.data = response.data;
        this.total = response.data.length;
      } catch (error) {
        console.log({ error });
      }
    },
    beli(item) {
      console.log({ item });
    },
  },

  computed: {
    searchData() {
      const matchParam = new RegExp(this.search, "gi");
      const data = this.data.filter((item) => item.title.match(matchParam));
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
