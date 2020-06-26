<template>
  <layout-default>
    <h1>Ecrire un nouveau message</h1>
    <div class="row">
      <div class="col-md-12">
        <form>
          <div class="form-group">
            <label for="exampleFormControlInput1">Titre</label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              v-model="message.title"
            />
          </div>

          <div class="form-group">
            <label for="exampleFormControlTextarea1">Texte</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              v-model="message.message"
            ></textarea>
          </div>

          <div class="form-group">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">Upload</span>
              </div>
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="inputGroupFile01"
                />
                <label class="custom-file-label" for="inputGroupFile01"
                  >Veuillez choisir une image</label
                >
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
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
        <button
          type="button"
          class="btn btn-success btn-block"
          @click="postMsg()"
        >
          Publier
        </button>
        <!-- 
          <button type="button" class="btn btn-warning btn-block">
          Modifier
        </button> 
        -->
      </div>
    </div>
  </layout-default>
</template>

<script>
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      userStore: state => state.userStore
    })
  },
  components: {
    "layout-default": LayoutDefault
  },
  data() {
    return {
      message: {
        title: "",
        message: "",
        userId: null,
        messageParentId: 0
      }
    };
  },
  methods: {
    goTopage(page) {
      this.$router.push(page);
    },
    postMsg() {
      this.message.userId = this.$store.state.authUser.user.id;
      this.$axios
        .post(this.$api.MESSAGE_CREATE, this.message)
        .then(() => {
          this.$router.push("/forum");
          // console.log("response", response);
        })
        .catch(error => {
          console.log("error", error);
          this.showLoader = false;
        });
    }
  }
};
</script>
