<template>
  <layout-default>
    <h1>Mon compte</h1>
    <div class="row" v-if="userInfos">
      <div class="col-md-4">Pseudo : {{ userInfos.user.name }}</div>
      <div class="col-md-4">Email : {{ userInfos.user.email }}</div>
      <div class="col-md-4">
        <button type="button" class="btn btn-danger" @click="deleteUser()">
          <i class="fa fa-trash-o" aria-hidden="true"></i>
          Supprimer mon compte
        </button>
      </div>
    </div>
  </layout-default>
</template>

<script>
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import { authenticationService } from "@/_services/authentication.service";
export default {
  components: {
    "layout-default": LayoutDefault
  },
  mounted: function() {
    this.getInfoUser();
  },
  data() {
    return {
      userInfos: null
    };
  },
  methods: {
    getInfoUser() {
      this.userInfos = this.$store.state.authUser;
      console.log("userInfos", this.userInfos);
    },
    deleteUser() {
      if (this.userInfos) {
        this.$axios
          .delete(this.$api.USERS_DELETE + this.userInfos.user.id)
          .then(() => {
            authenticationService.logout();
            this.$router.push("/login");
          })
          .catch(error => {
            console.log("error", error);
          });
      }
    }
  }
};
</script>
