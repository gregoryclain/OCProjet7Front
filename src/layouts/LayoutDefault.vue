<template>
  <div>
    <!-- <h1>Default layout</h1> -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <!-- <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>-->

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">
              <i class="fa fa fa-home" aria-hidden="true"></i> Accueil
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li>
            <router-link class="nav-link" to="/forum">
              <i class="fa fa-comments" aria-hidden="true"></i> Forum
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-user" aria-hidden="true"></i> Mon compte
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link class="dropdown-item" to="/login">S'autentifier</router-link>
              <router-link class="dropdown-item" to="/register">S'inscrire</router-link>
              <router-link class="dropdown-item" to="/">Déconnexion</router-link>
            </div>
          </li>
        </ul>

        <!-- <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>-->
      </div>
    </nav>
    <div class="col-md-12">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  /* eslint-disable semi */
  // eslint-disable-next-line space-before-function-paren
  data() {
    return {
      // selectedSite: false
    };
  }
};
</script>
