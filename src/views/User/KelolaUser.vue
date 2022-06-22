<template>
  <div class="kelola-user">
    <FormUser v-if="$route.name == 'Ubah User'" v-model:data="data" />
    <FormUser v-else-if="$route.name == 'Tambah User'" />
  </div>
</template>

<script>
import FormUser from "../../components/Form/FormUser.vue";

export default {
  data() {
    return {
      data: null,
    };
  },

  components: {
    FormUser,
  },

  mounted() {
    if (this.$route.name == "Ubah User" && this.$route.params.data == undefined) {
      this.$router.push("/menu-user");
    }

    if (this.$route.params.data) {
      const data = JSON.parse(this.$route.params.data);
      this.data = data;
    }
  },
};
</script>

<style>
.kelola-user {
  background-color: #fff;
  padding: 20px 20px 0px 20px;
  height: 100%;
}
</style>
