<template>
  <layout-default>
    <h1>Forum</h1>

    <table class="table table-hover">
      <thead>
        <tr class="row">
          <th class="col-md-9 text-left">Discussions</th>
          <th class="col-md-3 text-left">Dernier message</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row">
          <td class="col-md-9 text-left">
            <p>
              <router-link to="/forum/topic/1">
                <i class="fa fa-sign-out" aria-hidden="true"></i> Le titre du
                message
              </router-link>
              <br />Créé par XXXX XXXX, 11/03/2020, 10h25
            </p>
          </td>
          <td class="col-md-3 text-left">
            <p>
              Dernier message par YYYYY, 12/05/2020 13h44
              <a href="#">
                <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
              </a>
            </p>
          </td>
        </tr>
        <tr class="row">
          <td class="col-md-9 text-left">
            <p>
              <router-link to="/forum/topic/1">
                <i class="fa fa-sign-out" aria-hidden="true"></i> Le titre du
                message
              </router-link>
              <br />Créé par XXXX XXXX, 11/03/2020, 10h25
            </p>
          </td>
          <td class="col-md-3 text-left">
            <p>
              Dernier message par YYYYY, 12/05/2020 13h44
              <a href="#">
                <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
              </a>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="col-md-12 text-right">
        <button
          type="button"
          class="btn btn-primary"
          @click="goTopage('/forum/topic/new')"
        >Ecrire une nouvelle publication</button>
      </div>
    </div>
  </layout-default>
</template>

<script>
import LayoutDefault from "@/layouts/LayoutDefault.vue";

export default {
  components: {
    "layout-default": LayoutDefault
  },
  methods: {
    goTopage(page) {
      this.$router.push(page);
    }
  }
};
</script>
