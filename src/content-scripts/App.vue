<template>
  <div class="contentsview">
    <p>Firebase Login Sample</p>
    <div v-if="isAuthenticated" 
      class="contentsview__user"
    >
      <div class="contentsview__user-icon">
        <img :src="user?.profileImage" />
      </div>
      <div class="contentsview__user-name">{{ user?.nickName }}</div>
      <div class="contentsview__user-email">{{ user?.email }}</div>
      <button
        @click="authStore.logout"
        class="contentsview__user-logout"
      >Logout</button>
    </div>
    <div v-else>
      <GoogleLoginButton 
        :width="150" 
        :height="32"
        @click="authStore.login({ interactive : true})"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import GoogleLoginButton from "../components/GoogleLoginButton.vue";

import { onMounted } from "vue";
import { storeToRefs } from 'pinia';
import { useAuthStore } from "../store/auth";

const authStore = useAuthStore();
const { user, isAuthenticated } = storeToRefs(authStore);

onMounted(() => { authStore.login({ interactive: false })});
</script>

<style scoped>
.contentsview {
  position: fixed;
  top: 10px;
  right: 10px;
  width: 200px;
  padding: 5px;
  border-radius: 10px;
  background-color: white;
  font-size: 12px;
  z-index: 100;
  color: black;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.contentsview__user-icon img {
  width: 40px;
  border-radius: 20px;
}

.contentsview__user {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.contentsview__user-logout {
  padding: 3px 12px;
  border-radius: 10px;
  background-color: white;
  border: 1px solid gray;
  color: black;
}

.contentsview__user-logout:hover {
  background-color: lightgray;
}
</style>