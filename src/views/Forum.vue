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
        <tr class="row" v-for="message in allMessages" :key="message.id">
          <td class="col-md-9 text-left">
            <p>
              <router-link :to="'/forum/topic/' + message.id">
                <i class="fa fa-sign-out" aria-hidden="true"></i>
                {{ message.title }}
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
        >
          Ecrire une nouvelle publication
        </button>
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
  mounted: function() {
    this.getAllMessages();
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
    getAllMessages() {
      this.$axios
        .get(this.$api.MESSAGE_LIST)
        .then(response => {
          this.allMessages = response.data.messages;
          // console.log("response", response.data.messages);
        })
        .catch(error => {
          console.log("error", error);
          this.showLoader = false;
        });
    }
  }
};
</script>
