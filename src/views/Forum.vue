<template>
  <layout-default>
    <h1>Forum</h1>
    <div class="row">
      <div class="col-md-12">
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
                  Créé par {{ message.User.name }},
                  {{ message.createdAt | formatDate }}
                </p>
              </td>
              <td class="col-md-3 text-left">
                <p v-if="allLastMessages[index]">
                  Dernier message par {{ allLastMessages[index].User.name }},
                  {{ allLastMessages[index].createdAt | formatDate }}
                  <router-link to @click.native="goToLastMsg(message.id)">
                    <i
                      class="fa fa-arrow-circle-o-right"
                      aria-hidden="true"
                    ></i>
                  </router-link>
                </p>
                <p v-else>Aucune réponse</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <div class="col-md-3" v-if="currentRole === 'iscom'">
        <div class="row">
          <div class="col-md-12">
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="msgCom in allMessagesForCom"
                :key="msgCom.id"
              >
                <router-link :to="'/forum/topic/' + msgCom.id">
                  <i class="fa fa-sign-out" aria-hidden="true"></i>
                  {{ msgCom.title }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div> -->
    </div>

    <div class="row">
      <div class="col-md-9 text-left">
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
import { mapState } from "vuex";
export default {
  components: {
    "layout-default": LayoutDefault
  },
  computed: {
    ...mapState({
      userStore: state => state.userStore
    })
  },
  mounted: function() {
    this.getAllMessages();
    this.currentRole = this.$store.state.authUser.user.Role.title;
    // this.getAllMessagesForCommercial();
  },
  data() {
    return {
      currentRole: "user",
      allMessages: [],
      allLastMessages: [],
      allMessagesForCom: []
    };
  },
  methods: {
    goTopage(page) {
      this.$router.push(page);
    },
    goToLastMsg(msgId) {
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
            this.allLastMessages.push(response.data.last[0]);
          })
          .catch(error => {
            console.log("error", error);
            this.showLoader = false;
          });
      });
    },
    getAllMessages() {
      this.$axios
        .get(this.$api.MESSAGE_LIST_PARENT)
        .then(response => {
          this.allMessages = response.data;
          this.getAllLastMessages();
        })
        .catch(error => {
          console.log("error", error);
          this.showLoader = false;
        });
    },
    getAllMessagesForCommercial() {
      this.$axios
        .get(this.$api.MESSAGE_LIST)
        .then(response => {
          this.allMessagesForCom = response.data;
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
