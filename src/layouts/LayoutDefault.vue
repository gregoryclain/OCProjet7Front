<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <router-link class="navbar-brand" to="/" title="accueil">
        <img src="/images/icon.png" alt="Accueil Groupomania" height="50" />
        <span class="sr-only">(current)</span>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/forum" title="Acces au forum">
              <i class="fa fa-comments" aria-hidden="true"></i> Forum
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- menu right -->

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown active">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-user" aria-hidden="true"></i>
            </a>
            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="navbarDropdown"
            >
              <!-- Accès à tous-->
              <router-link
                class="dropdown-item"
                to="/login"
                v-if="!isLoged"
                title="S'authentifier"
              >
                <i class="fa fa-sign-in" aria-hidden="true"></i> S'authentifier
              </router-link>

              <router-link
                class="dropdown-item"
                to="/register"
                v-if="!isLoged"
                title="S'inscrire"
              >
                <i class="fa fa-user-plus" aria-hidden="true"></i>
                S'inscrire
              </router-link>

              <!-- Si logué -->
              <router-link
                class="dropdown-item"
                to="/profile"
                v-if="isLoged"
                title="Mon compte"
              >
                <i class="fa fa-user" aria-hidden="true"></i> Mon compte
              </router-link>

              <button
                class="dropdown-item"
                @click="logout()"
                v-if="isLoged"
                title="Déconnexion"
              >
                <i class="fa fa-sign-out" aria-hidden="true"></i> Déconnexion
              </button>
              <div class="dropdown-divider"></div>

              <!-- Si commercial-->
              <router-link
                class="dropdown-item"
                to="/users"
                v-if="isLoged && currentRole === 'iscom'"
                title="Gestion des utilisateurs"
              >
                <i class="fa fa-users" aria-hidden="true"></i> Utilisateurs
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <slot />
    </div>
  </div>
</template>
<script>
import { authenticationService } from "@/_services/authentication.service";
import { mapState } from "vuex";
export default {
  /* eslint-disable semi */
  // eslint-disable-next-line space-before-function-paren
  computed: {
    ...mapState({
      userStore: state => state.userStore
    })
  },
  mounted: function() {
    if (this.$store.state.authUser && this.$store.state.authUser.user.id) {
      this.isLoged = true;
      this.currentRole = this.$store.state.authUser.user.Role.title;
    }
  },
  data() {
    return {
      isLoged: false,
      currentRole: "user"
    };
  },
  methods: {
    logout() {
      console.log("je dois me delog");
      authenticationService.logout();
    }
  }
};
</script>
<style>
.container {
  margin-bottom: 20px;
}
</style>
