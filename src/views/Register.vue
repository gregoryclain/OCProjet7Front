<template>
  <layout-default>
    <h1>Register</h1>
    <div class="alert alert-danger" v-if="isError">
      <strong>Erreur !</strong> {{ msgError }}
    </div>
    <form>
      <div class="form-group">
        <div class="form__error" v-if="!$v.credentials.name.required">
          *This field is required.
        </div>
        <label for="Pseudo">Pseudo</label>
        <input
          type="text"
          class="form-control"
          id="Pseudo"
          placeholder="Votre nom"
          v-model="credentials.name"
          title="Entrer votre nom"
          aria-label="Entrer votre nom"
        />
      </div>

      <div class="form-group">
        <div class="form__error" v-if="!$v.credentials.email.required">
          *This field is required.
        </div>
        <label for="Email">Email address</label>
        <input
          type="email"
          class="form-control"
          id="Email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="credentials.email"
          title="Entrer un email"
          aria-label="Entrer un email"
        />
      </div>
      <div class="form-group">
        <div class="form__error" v-if="!$v.credentials.password.required">
          *This field is required.
        </div>
        <label for="Password">Password</label>
        <input
          type="password"
          class="form-control"
          id="Password"
          placeholder="Password"
          v-model="credentials.password"
          title="Entrer un password"
          aria-label="Entrer un password"
        />
      </div>

      <button type="button" class="btn btn-primary" @click="submitForm()">
        Submit
      </button>
    </form>
  </layout-default>
</template>

<script>
/* eslint-disable no-undef */
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import { required, minLength, email } from "vuelidate/lib/validators";
// const { required, minLength, email } = require("vuelidate/lib/validators");
export default {
  components: {
    "layout-default": LayoutDefault
  },
  data() {
    return {
      msgError: "",
      isError: false,
      credentials: {
        email: "gregory.aerialgroup@gmail.com",
        password: "test",
        name: "Grégory"
      }
    };
  },
  methods: {
    submitForm() {
      this.isError = false;
      this.msgError = "";

      if (
        this.credentials.email === "" ||
        this.credentials.password === "" ||
        this.credentials.name === ""
      ) {
        this.isError = true;
        this.msgError = "Tous les champs sont obligatoires";
        return false;
      }

      this.$axios
        .post(this.$api.USERS_SIGNUP, this.credentials)
        .then(response => {
          console.log("response.data", response.data);
          this.$router.push("/login");
        })
        .catch(error => {
          console.log("error", error);
          this.isError = true;
          this.msgError = error;
        });
    }
  },
  validations: {
    credentials: {
      password: {
        required,
        minLength: minLength(4)
      },
      name: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      }
    }
  }
};
</script>
<style scoped>
.dirty {
  border-color: #5a5;
  background: #efe;
}

.dirty:focus {
  outline-color: #8e8;
}

.error {
  border-color: red;
  background: #fdd;
}

.error:focus {
  outline-color: #f99;
}
</style>
