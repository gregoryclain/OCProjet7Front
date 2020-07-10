
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
              <br />
              Créé par {{ message.User.email}}, {{ message.createdAt}}
            </p>
          </td>
          <td class="col-md-3 text-left">
            <p>
              Dernier message par YYYYY, {{ message.createdAt}}
              <router-link to @click.native="goToLastMsg(message.id)">
                <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
              </router-link>
              <!-- <a href="#">
                <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
              </a>-->
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
/* eslint-disable no-unused-vars */

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
    goToLastMsg(msgId) {
      console.log("test", msgId);
      this.$axios
        .get(this.$api.MESSAGE_RESPONSES + msgId)
        .then(response => {
          // console.log(response.data.messages.length);
          let anchorId = response.data.messages.length;
          this.$router.push("/forum/topic/" + msgId + "#msg-" + anchorId);
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    getAllMessages() {
      console.log("get all message");
      this.$axios
        .get(this.$api.MESSAGE_LIST)
        .then(response => {
          this.allMessages = response.data;
          console.log("response", response.data);
        })
        .catch(error => {
          console.log("error", error);
          this.showLoader = false;
        });
    }
  }
};
</script>
