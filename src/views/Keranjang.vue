<template>
  <div class="keranjang">
    <a-row :gutter="[0, 30]">
      <a-col :xs="24" :md="24" style="">
        <a-row :gutter="[10, 0]">
          <a-col :xs="1" :md="2" style=""><h1>No</h1></a-col>
          <a-col :xs="8" :md="8" style=""><h1>Detail Produk</h1></a-col>
          <a-col :xs="6" :md="6" style="text-align: center"><h1>Jumlah</h1></a-col>
          <a-col :xs="5" :md="5" style="text-align: center"><h1>Total Harga</h1></a-col>
          <a-col :xs="4" :md="3" style="text-align: center"><span></span></a-col>
        </a-row>
      </a-col>
      <a-col :xs="24" :md="24">
        <a-row :gutter="[10, 0]" v-for="(item, index) in dataCarts" :key="item.id" align="middle">
          <a-col :xs="1" :md="2" style=""
            ><span>{{ item.id }}</span></a-col
          >
          <a-col :xs="8" :md="8" style="">
            <a-row align="middle">
              <a-col class="foto-produk">
                <img :src="item.keranjangDeskripsi.fotoProduk" alt="produk" />
              </a-col>
              <a-col class="deskripsi-produk">
                <h1>{{ item.keranjangDeskripsi.namaProduk }}</h1>
                <p>
                  <strong>Rp. {{ item.keranjangDeskripsi.harga }}</strong>
                </p>
              </a-col>
            </a-row>
          </a-col>
          <a-col :xs="6" :md="6" class="jumlah" style="">
            <div>
              <plus-circle-outlined @click="actionJumlah('tambah', index)" />
              <a-input-number id="inputNumber" v-model:value="item.keranjangDeskripsi.jumlah" :min="1" :controls="false" style="margin: 0px 10px" />
              <minus-circle-outlined @click="actionJumlah('kurang', index)" />
            </div>
          </a-col>
          <a-col :xs="5" :md="5" class="total-harga" style="">
            <h1>
              <strong>Rp. {{ item.keranjangDeskripsi.harga * item.keranjangDeskripsi.jumlah }}</strong>
            </h1>
          </a-col>
          <a-col :xs="4" :md="3" class="hapus-item" style="text-align: end">
            <delete-outlined />
          </a-col>
        </a-row>
      </a-col>
      <a-col :xs="24" :md="24">
        <a-row align="middle">
          <a-col :xs="12" :md="12" style=""> </a-col>
          <a-col :xs="12" :md="12" style="text-align: end">
            <div class="total-belanja">
              <h1>Total Belanja : <strong>Rp. 600000</strong></h1>
            </div>
          </a-col>
        </a-row>
      </a-col>
      <a-col :xs="24" :md="24">
        <a-row>
          <a-col :xs="12" :md="12" style=""> </a-col>
          <a-col :xs="12" :md="12" style="text-align: end">
            <div class="checkout">
              <a-button type="primary">
                <template #icon><shopping-cart-outlined /></template>
                Checkout
              </a-button>
            </div>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Table from "../components/Table.vue";

import { PlusCircleOutlined, MinusCircleOutlined, DeleteOutlined, ArrowLeftOutlined, ShoppingCartOutlined } from "@ant-design/icons-vue";

import columnCarts from "../data/column-carts.json";

export default {
  data() {
    return {
      jumlah: 1,
      columnCarts,
      dataCarts: [
        {
          id: 1,
          keranjangDeskripsi: {
            namaProduk: "Genteng",
            harga: 12000,
            fotoProduk: "/assets/logo.f16b9f6a.png",
            jumlah: 1,
          },
          totalHarga: 150000,
        },
        {
          id: 2,
          keranjangDeskripsi: {
            namaProduk: "Genteng",
            harga: 12000,
            fotoProduk: "/assets/logo.f16b9f6a.png",
            jumlah: 233,
          },
          totalHarga: 150000,
        },
        {
          id: 3,
          keranjangDeskripsi: {
            namaProduk: "Genteng",
            harga: 12000,
            fotoProduk: "/assets/logo.f16b9f6a.png",
            jumlah: 15,
          },
          totalHarga: 150000,
        },
      ],
    };
  },

  components: {
    Table,
    PlusCircleOutlined,
    MinusCircleOutlined,
    DeleteOutlined,
    ArrowLeftOutlined,
    ShoppingCartOutlined,
  },

  methods: {
    actionJumlah(tipe, index) {
      if (tipe == "tambah") {
        this.dataCarts[index].keranjangDeskripsi.jumlah = this.dataCarts[index].keranjangDeskripsi.jumlah + 1;
      } else if (tipe == "kurang") {
        if (this.dataCarts[index].keranjangDeskripsi.jumlah > 1) {
          this.dataCarts[index].keranjangDeskripsi.jumlah = this.dataCarts[index].keranjangDeskripsi.jumlah - 1;
        }
      }
    },
  },
};
</script>

<style>
.keranjang .jumlah,
.keranjang .total-harga,
.keranjang .hapus-item {
  text-align: center;
}

.keranjang .anticon {
  font-size: 20px;
  cursor: pointer;
}

.keranjang .hapus-item {
  color: red;
}

.keranjang .foto-produk img {
  width: 100px;
  margin-right: 20px;
}

.keranjang .lanjutkan-pembelian {
  cursor: pointer;
}

.keranjang .lanjutkan-pembelian .anticon {
  margin-right: 10px;
}

/* ===================== Responsive Breakpoints ===================== */
@media (max-width: 992px) {
  .keranjang .foto-produk img {
    width: 50px;
  }

  .keranjang .total-harga {
    align-items: center;
  }

  .keranjang .jumlah .ant-input-number {
    width: 50px;
    height: 25px;
  }

  .keranjang .jumlah input {
    height: 25px;
  }

  .keranjang .anticon {
    font-size: 15px;
  }
}
</style>
