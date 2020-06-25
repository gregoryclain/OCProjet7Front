<template>
  <layout-default>
    <h1>Ecrire un nouveau message</h1>
    <div class="row">
      <div class="col-md-12">
        <form>
          <div class="form-group">
            <label for="exampleFormControlInput1">Titre</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" />
          </div>

          <div class="form-group">
            <label for="exampleFormControlTextarea1">Texte</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>

          <div class="form-group">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">Upload</span>
              </div>
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="inputGroupFile01" />
                <label class="custom-file-label" for="inputGroupFile01">Veuillez choisir une image</label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <button type="button" class="btn btn-info btn-block" @click="goTopage('/forum')">Retour</button>
      </div>
      <div class="col-md-6">
        <button type="button" class="btn btn-success btn-block">Publier</button>
        <button type="button" class="btn btn-warning btn-block">Modifier</button>
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
