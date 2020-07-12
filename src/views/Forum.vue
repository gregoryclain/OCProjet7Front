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
        <tr
          class="row"
          v-for="(message, index) in allMessages"
          :key="message.id"
        >
          <td class="col-md-9 text-left">
            <p>
              <router-link :to="'/forum/topic/' + message.id">
                <i class="fa fa-sign-out" aria-hidden="true"></i>
                {{ message.title }}
              </router-link>
              <br />
              Créé par {{ message.User.email }},
              {{ message.createdAt | formatDate }}
            </p>
          </td>
          <td class="col-md-3 text-left">
            <p v-if="allLastMessages[index]">
              Dernier message par {{ allLastMessages[index].User.email }},
              {{ allLastMessages[index].createdAt | formatDate }}
              <router-link to @click.native="goToLastMsg(message.id)">
                <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
              </router-link>
            </p>
            <p v-else>Aucune réponse</p>
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
      allMessages: [],
      allLastMessages: []
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
    getAllLastMessages(MsgId) {
      this.allMessages.forEach(msg => {
        this.$axios
          .get(this.$api.MESSAGE_GET_LAST + msg.id)
          .then(response => {
            // this.allMessages = response.data;
            this.allLastMessages.push(response.data.last[0]);
            console.log("response last", response.data.last[0]);
          })
          .catch(error => {
            console.log("error", error);
            this.showLoader = false;
          });
      });
      console.log("allLastMessages", this.allLastMessages);
    },
    getAllMessages() {
      console.log("get all message");
      this.$axios
        .get(this.$api.MESSAGE_LIST)
        .then(response => {
          this.allMessages = response.data;
          console.log("response", response.data);
          this.getAllLastMessages();
        })
        .catch(error => {
          console.log("error", error);
          this.showLoader = false;
        });
    }
  }
};
</script>
