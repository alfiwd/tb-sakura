<template>
  <div class="login">
    <div class="content">
      <div class="left-side">
        <img src="../../public/images/login.svg" alt="login" />
        <h2>TB Sakura</h2>
      </div>
      <div class="right-side">
        <div class="container">
          <h1><strong>Login</strong></h1>
          <FormLogin />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormLogin from "../components/Form/FormLogin.vue";

export default {
  components: {
    FormLogin,
  },

  mounted() {
    if (localStorage.getItem("login")) {
      this.$router.push({ name: "Dashboard" });
    }
  },
};
</script>

<style>
.login {
  background-color: #001529;
  height: 100vh;
  display: flex;
}

.content {
  display: flex;
  width: 60%;
  min-height: 60%;
  margin: auto;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.left-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.left-side img {
  width: 75%;
}

.left-side h2 {
  color: #fff;
  margin-top: 20px;
}

.right-side {
  flex: 1;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.right-side .container {
  width: 100%;
  padding: 0px 50px;
}

.right-side .container h1 {
  text-align: center;
  margin-bottom: 20px;
}

/* ================ Responsive Breakpoints ================ */
@media (max-width: 600px) {
  .content {
    flex-direction: column;
    width: 75%;
  }

  .right-side .container {
    width: 100%;
    padding: 10px 15px;
  }

  .right-side .container h1 {
    font-size: 1.2em;
  }

  .left-side {
    padding: 15px;
  }

  .left-side img {
    width: 50%;
  }
}
</style>
