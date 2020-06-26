<template>
  <layout-default>
    <h1>Libellé Topic</h1>
    <ul class="list-group">
      <li class="list-group-item" v-if="allMessages[0]">
        <div class="row">
          <div class="col-md-3">
            <span class="badge badge-primary mt-3">Pseudo</span>
          </div>
          <div class="col-md-9">
            <div class="card-body text-primary text-left">
              <h5 class="card-title">{{ allMessages[0].title }}</h5>
              <p class="card-text">{{ allMessages[0].message }}</p>
              <img
                src="images/c4-cactus.jpg"
                alt="cactus"
                class="img-fluid img-thumbnail"
              />
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

    <div class="row mt-3"></div>

    <div class="row mt-3">
      <div class="col-md-6">
        <button
          type="button"
          class="btn btn-info btn-block"
          @click="goTopage('/forum')"
        >
          Retour
        </button>
      </div>
      <div class="col-md-6">
        <button type="button" class="btn btn-success btn-block">
          Répondre
        </button>
      </div>
    </div>
  </layout-default>
</template>

<script>
import LayoutDefault from "@/layouts/LayoutDefault.vue";

export default {
  mounted: function() {
    this.getOneMessageAndComments();
  },
  components: {
    "layout-default": LayoutDefault
  },
  data() {
    return {
      allMessages: []
    };
  },
  methods: {
    goTopage(page) {
      this.$router.push(page);
    },
    getOneMessageAndComments() {
      let msgId = this.$route.params.id;
      console.log("msgId", msgId);
      this.$axios
        .get(this.$api.MESSAGE_GET_ONE + msgId)
        .then(response => {
          this.allMessages.push(response.data.message);
          console.log("response", response);
          // ensuite requete pour récupérer les reply en fonction de l'id du premier message
        })
        .catch(error => {
          console.log("error", error);
          this.showLoader = false;
        });
    }
  }
};
</script>
