<template>
  <layout-default>
    <h1>Login</h1>
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="credentials.email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          v-model="credentials.password"
        />
      </div>

      <button type="button" class="btn btn-primary" @click="submitForm()">
        Submit
      </button>
    </form>
  </layout-default>
</template>

<script>
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import { authenticationService } from "@/_services/authentication.service";
export default {
  components: {
    "layout-default": LayoutDefault
  },
  data() {
    return {
      credentials: {
        email: "gregory.aerialgroup@gmail.com",
        password: "test"
      }
    };
  },
  methods: {
    submitForm() {
      authenticationService.login(this.credentials);
      // this.$axios
      //   .post(this.$api.USERS_LOGIN, this.credentials)
      //   .then(response => {
      //     console.log("response.data", response.data);
      //     this.$router.push("/forum");
      //   })
      //   .catch(error => {
      //     console.log("error", error);
      //   });
    }
  }
};
</script>
