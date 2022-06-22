<template>
  <div class="kelola-produk">
    <a-row>
      <a-col :xs="24" :md="24" :lg="24">
        <FormProduk v-if="$route.name == 'Ubah Produk'" v-model:data="data" />
        <FormProduk v-else-if="$route.name == 'Tambah Produk'" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import FormProduk from "../../components/Form/FormProduk.vue";

export default {
  data() {
    return {
      data: null,
    };
  },

  components: {
    FormProduk,
  },

  mounted() {
    if (this.$route.name == "Ubah Produk" && this.$route.params.data == undefined) {
      this.$router.push("/menu-produk");
    }

    if (this.$route.params.data) {
      const data = JSON.parse(this.$route.params.data);
      this.data = data;
    }
  },
};
</script>

<style>
.kelola-produk {
  background-color: #fff;
  padding: 20px 20px 0px 20px;
  height: 100%;
}
</style>
