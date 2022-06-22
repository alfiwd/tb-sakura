<template>
  <a-table :columns="columns" :row-key="(record) => record.key" :data-source="data">
    <template v-slot:bodyCell="{ column, record }">
      <template v-if="column.key === 'foto'">
        <img :src="record.foto.url" alt="" width="100" />
      </template>
      <template v-if="column.key === 'no'">
        {{ record.key }}
      </template>
      <template v-if="column.key === 'hargaJual'"> Rp. {{ record.hargaJual }} </template>
      <template v-if="column.key === 'hargaModal'"> Rp. {{ record.hargaModal }} </template>
      <template v-if="column.key == 'aksi'">
        <div class="aksi">
          <div class="hapus">
            <a-popconfirm v-if="data.length" :title="titleDelete()">
              <delete-outlined />
              <span class="text">Hapus</span>
            </a-popconfirm>
          </div>
          <div class="ubah">
            <edit-outlined />
            <span v-if="name == 'product'" v-on:click="ubahData(record, name)" class="text">Ubah</span>
            <span v-else-if="name == 'supplier'" v-on:click="ubahData(record, name)" class="text">Ubah</span>
            <span v-else-if="name == 'user'" v-on:click="ubahData(record, name)" class="text">Ubah</span>
          </div>
        </div>
      </template>
      <template v-if="column.key == 'hapus'">
        <div class="aksi">
          <div class="hapus">
            <delete-outlined />
          </div>
        </div>
      </template>
      <template v-if="column.key == 'keranjangDeskripsi'">
        <div class="deskripsi-keranjang">
          <div class="foto-produk">
            <img :src="record.keranjangDeskripsi.fotoProduk" alt="foto produk" width="100" />
          </div>
          <div class="detail-produk">
            <h1>
              <strong>{{ record.keranjangDeskripsi.namaProduk }}</strong>
            </h1>
            <p>{{ record.keranjangDeskripsi.harga }}</p>
          </div>
        </div>
      </template>
      <template v-if="column.key == 'jumlah'">
        <div class="jumlah">
          <plus-circle-outlined v-on:click="actionJumlah('before')" />
          <a-input-number id="inputNumber" v-model:value="jumlah" :min="1" :controls="false" style="margin: 0px 10px" />
          <minus-circle-outlined v-on:click="actionJumlah('after')" />
        </div>
      </template>
    </template>
  </a-table>
</template>

<script>
import logo from "../../public/images/logo.png";
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons-vue";

export default {
  data() {
    return {
      jumlah: 1,
    };
  },

  components: {
    EditOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
    MinusCircleOutlined,
  },

  props: ["data", "columns", "name"],

  methods: {
    ubahData(record, name) {
      const data = JSON.stringify(record);
      if (name == "product") {
        this.$router.push({ name: "Ubah Produk", params: { data } });
      } else if (name == "supplier") {
        this.$router.push({ name: "Ubah Supplier", params: { data } });
      } else if (name == "user") {
        this.$router.push({ name: "Ubah User", params: { data } });
      }
    },
    titleDelete() {
      if (this.name == "product") {
        return "Apakah yakin ingin menghapus data produk ini?";
      } else if (this.name == "supplier") {
        return "Apakah yakin ingin menghapus data supplier ini?";
      } else if (this.name == "user") {
        return "Apakah yakin ingin menghapus data user ini?";
      }
    },
    actionJumlah(type) {
      if (type == "before") {
        this.jumlah = this.jumlah + 1;
      } else if (type == "after") {
        if (this.jumlah > 1) {
          this.jumlah = this.jumlah - 1;
        }
      }
    },
  },
};
</script>

<style>
.aksi {
  display: flex;
  flex-direction: column;
}

.aksi .anticon {
  margin-right: 5px;
}

.hapus {
  margin-bottom: 10px;
}

.hapus span {
  color: red;
  cursor: pointer;
}

.ubah span {
  color: orange;
  cursor: pointer;
}

.jumlah .ant-input-number-group-addon {
  cursor: pointer;
}

.jumlah .ant-input-number-input-wrap {
  width: 75px;
  height: 40px;
}

.jumlah .ant-input-number-input-wrap input {
  height: 100%;
}

.deskripsi-keranjang {
  display: flex;
}

.deskripsi-keranjang .detail-produk {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
}

/* ===================== Responsive Breakpoints ===================== */
@media (max-width: 1200px) {
  .aksi .text {
    display: none;
  }
  .aksi .anticon {
    font-size: 20px;
  }
}
</style>
