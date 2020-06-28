<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <!-- <a class="navbar-brand" href="#">Home</a> -->
      <router-link class="navbar-brand" to="/">
        <i class="fa fa fa-home" aria-hidden="true"></i> Accueil
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
            <router-link class="nav-link" to="/forum">
              <i class="fa fa-comments" aria-hidden="true"></i> Forum
              <span class="sr-only">(current)</span>
            </router-link>
          </li>

          <!-- 
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li> 
          -->
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
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" to="/login">
                <i class="fa fa-sign-in" aria-hidden="true"></i> S'authentifier
              </router-link>
              <router-link class="dropdown-item" to="/register">
                <i class="fa fa-user-plus" aria-hidden="true"></i>
                S'inscrire
              </router-link>
              <!-- <router-link class="dropdown-item" to="/">
                <i class="fa fa-sign-out" aria-hidden="true"></i> Déconnexion
              </router-link>-->

              <button class="dropdown-item" @click="logout()">
                <i class="fa fa-sign-out" aria-hidden="true"></i> Déconnexion
              </button>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" to="/users">
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
export default {
  /* eslint-disable semi */
  // eslint-disable-next-line space-before-function-paren
  data() {
    return {
      // selectedSite: false
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
