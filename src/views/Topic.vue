<template>
  <layout-default>
    <h1>Message</h1>

    <ul class="list-group" v-if="allMessages.length > 0">
      <li
        class="list-group-item"
        v-for="(msg, index) in allMessages"
        :key="index"
        :id="'msg-' + index"
      >
        <div class="row">
          <div class="col-md-3">
            <span class="badge badge-primary mt-3">{{ msg.User.name }}</span>
          </div>
          <div class="col-md-9">
            <div class="card-body text-primary text-left">
              <h5 class="card-title">{{ msg.title }}</h5>
              <p class="card-text">{{ msg.message }}</p>
              <img
                :src="msg.imageUrl"
                :alt="msg.title"
                class="img-fluid img-thumbnail"
                v-if="msg.imageUrl"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 text-right">
            <button
              v-if="$store.state.authUser.user.Role.title == 'iscom'"
              @click="goTopage('/forum/topic/edit/' + msg.id)"
              class="btn btn-warning"
            >
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editer
            </button>
            <button
              v-if="$store.state.authUser.user.Role.title == 'iscom'"
              @click="deletePost(msg.id)"
              class="btn btn-danger ml-2"
            >
              <i class="fa fa-trash" aria-hidden="true"></i> Supprimer
            </button>
          </div>
        </div>
      </li>
    </ul>
    <hr />
    <h2>Répondre</h2>
    <div class="row mt-3">
      <div class="col-md-12">
        <form>
          <div class="form-group">
            <label for="exampleFormControlInput1">Titre</label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              v-model="newMessage.title"
            />
          </div>

          <div class="form-group">
            <label for="exampleFormControlTextarea1">Texte</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              v-model="newMessage.message"
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
                  :ref="'file'"
                  name="file"
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
        <button
          type="button"
          class="btn btn-success btn-block"
          @click="postNewMessage()"
        >
          Répondre
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
  mounted: function() {
    this.getOneMessageAndComments();
  },
  components: {
    "layout-default": LayoutDefault
  },
  data() {
    return {
      allMessages: [],
      newMessage: {
        title: "",
        message: "",
        userId: null,
        messageParentId: 0
      }
    };
  },
  methods: {
    deletePost(msgId) {
      this.$axios
        .delete(this.$api.MESSAGE_DELETE_ONE + msgId)
        .then(() => {
          this.$router.push("/forum");
        })
        .catch(error => {
          console.log("error", error);
        });
    },
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
          console.log("INITIAL", response);
          this.getResponses();
          // ensuite requete pour récupérer les reply en fonction de l'id du premier message
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    postNewMessage() {
      this.newMessage.userId = this.$store.state.authUser.user.id;
      this.newMessage.messageParentId = this.allMessages[0].id;

      let formData = new FormData();
      this.file = this.$refs.file.files[0];
      formData.append("message", JSON.stringify(this.newMessage));
      formData.append("file", this.file);

      this.$axios
        // .post(this.$api.MESSAGE_CREATE, this.newMessage)
        .post(this.$api.MESSAGE_CREATE, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          // this.$router.push("/forum");
          console.log("response MSG", response.data.last);
          this.newMessage = {
            title: "",
            message: ""
          };
          this.allMessages.push(response.data.last);
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    getResponses() {
      let msgId = this.$route.params.id;
      this.$axios
        .get(this.$api.MESSAGE_RESPONSES + msgId)
        .then(response => {
          if (response.data.messages.length > 0) {
            response.data.messages.forEach(resp => {
              this.allMessages.push(resp);
            });

            console.log(this.allMessages);
          }
          console.log("REPONSES", response.data.messages);
          // ensuite requete pour récupérer les reply en fonction de l'id du premier message
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  }
};
</script>
