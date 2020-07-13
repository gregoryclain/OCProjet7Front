<template>
  <layout-default>
    <h1 v-if="!isEdit">Ecrire un nouveau message</h1>
    <h1 v-else>Edition d'un message</h1>
    <div class="alert alert-danger" v-if="isError">
      <strong>Erreur !</strong> {{ msgError }}
    </div>
    <div class="row">
      <div class="col-md-12">
        <form enctype="multipart/form-data">
          <div class="form-group">
            <label for="titre">Titre</label>
            <input
              type="text"
              class="form-control"
              id="titre"
              v-model="message.title"
              aria-label="Titre du message"
            />
          </div>

          <div class="form-group">
            <label for="texte">Texte</label>
            <textarea
              class="form-control"
              id="texte"
              rows="3"
              v-model="message.message"
              aria-label="Texte du messagee"
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
                  id="media"
                  :ref="'file'"
                  name="file"
                  aria-label="Media aà uploader"
                />
                <label class="custom-file-label" for="media"
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
          title="Retour a l'accueil du forum"
        >
          Retour
        </button>
      </div>
      <div class="col-md-6">
        <button
          v-if="!isEdit"
          type="button"
          class="btn btn-success btn-block"
          @click="postMsg()"
          title="Publier"
        >
          Publier
        </button>

        <button
          v-if="isEdit"
          type="button"
          class="btn btn-success btn-block"
          @click="postMsg()"
          title="Modifier"
        >
          Modifier
        </button>
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
  mounted: function() {
    this.checkIfEdit();
  },
  data() {
    return {
      msgError: "",
      isError: false,
      isEdit: false,
      message: {
        title: "",
        message: "",
        userId: null,
        messageParentId: 0
      },
      file: ""
    };
  },
  methods: {
    checkIfEdit() {
      let editId = this.$route.params.id;
      this.$axios
        .get(this.$api.MESSAGE_GET_ONE + editId)
        .then(response => {
          // this.$router.push("/forum");
          console.log("response edit", response.data.message);
          if (response.data.message) {
            this.isEdit = true;
            this.message = response.data.message;
          }
        })
        .catch(error => {
          console.log("error", error);
          this.showLoader = false;
        });
    },
    goTopage(page) {
      this.$router.push(page);
    },
    postMsg() {
      this.isError = false;
      this.msgError = "";

      let formData = new FormData();
      this.file = this.$refs.file.files[0];
      if (!this.isEdit) {
        this.message.userId = this.$store.state.authUser.user.id;
      }

      if (this.message.title === "" || this.message.message === "") {
        this.isError = true;
        this.msgError = "Le titre ou le texte est vide";
        return false;
      }

      formData.append("message", JSON.stringify(this.message));
      formData.append("file", this.file);

      let url = this.$api.MESSAGE_CREATE;
      if (this.isEdit) {
        let editId = this.$route.params.id;
        url = this.$api.MESSAGE_EDIT_ONE + editId;
        this.$axios
          .put(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(() => {
            this.$router.push("/forum");
            // console.log("response", response);
          })
          .catch(error => {
            console.log("error", error);
            this.showLoader = false;
          });
      } else {
        this.$axios
          .post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
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
  }
};
</script>
