<template>
  <layout-default>
    <h1>Libellé Topic</h1>
    <ul class="list-group">
      <li class="list-group-item">
        <div class="row">
          <div class="col-md-3">
            <span class="badge badge-primary mt-3">Pseudo</span>
          </div>
          <div class="col-md-9">
            <div class="card-body text-primary text-left">
              <h5 class="card-title">Titre du premier message</h5>
              <p class="card-text">Texte description commentaire</p>
              <img src="images/c4-cactus.jpg" alt="cactus" class="img-fluid img-thumbnail" />
            </div>
          </div>
        </div>
      </li>
      <li class="list-group-item">
        <div class="row">
          <div class="col-md-3">
            <span class="badge badge-primary mt-3">Pseudo</span>
          </div>
          <div class="col-md-9">
            <div class="card-body text-primary text-left">
              <h5 class="card-title">Titre du commentaire 2</h5>
              <p class="card-text">Texte description commentaire</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="row mt-3">
      <div class="col-md-6">
        <button type="button" class="btn btn-info btn-block" @click="goTopage('/forum')">Retour</button>
      </div>
      <div class="col-md-6">
        <button type="button" class="btn btn-success btn-block">Répondre</button>
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
