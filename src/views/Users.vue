<template>
  <layout-default>
    <h1>Contribution des utilisateurs</h1>
    <div class="row">
      <div class="col-md-12">
        <ul class="list-group">
          <li
            class="list-group-item"
            v-for="(user, index) in users"
            :key="user.id"
          >
            <div class="row">
              <div class="col-md-2">{{ user.name }}</div>
              <div class="col-md-3 text-left">
                <button
                  class="btn btn-info mb-1"
                  @click="fetchUserMsg(user.id, index)"
                  :title="'Voir les message de ' + user.name"
                >
                  Voir ses messages
                </button>
              </div>
              <div class="col-md-7" v-if="userIndex === index">
                <div
                  class="alert alert-info"
                  v-for="message in messages"
                  :key="message.id"
                >
                  <h4 class="alert-heading">{{ message.title }}</h4>
                  <hr />
                  <p>
                    {{ message.message }}
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
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
    this.fetchUsers();
  },
  data() {
    return {
      users: [],
      messages: [],
      userIndex: null
    };
  },
  methods: {
    fetchUsers() {
      this.$axios
        .get(this.$api.USERS_LIST)
        .then(response => {
          // console.log(response.data.messages.length);
          this.users = response.data;
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    fetchUserMsg(id, indexSelected) {
      this.userIndex = indexSelected;
      this.$axios
        .get(this.$api.MESSAGE_FROM_USER + id)
        .then(response => {
          this.messages = response.data;
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  }
};
</script>
