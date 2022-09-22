<template>
  <div class="popupview">
    <ChromeExImg :filename="'icon48.png'" />
    <p>Firebase Login Sample</p> 
    <div v-if="isAuthenticated" 
      class="popupview__user"
    >
      <div class="popupview__user-icon">
        <img :src="user?.profileImage" />
      </div>
      <div class="popupview__user-name">{{ user?.nickName }}</div>
      <div class="popupview__user-email">{{ user?.email }}</div>
      <button 
        @click="authStore.logout" 
        class="popupview__user-logout"
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
import ChromeExImg from "../components/ChromeExImg.vue";
import GoogleLoginButton from "../components/GoogleLoginButton.vue";

import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/auth";

const authStore = useAuthStore();
const { user, isAuthenticated } = storeToRefs(authStore);

onMounted(() => { authStore.login({ interactive: false })});
</script>

<style scoped>
.popupview {
  padding: 5px;
  background-color: white;
  font-size: 16px;
  color: black;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.popupview__user-icon img {
  width: 40px;
  border-radius: 20px;
}

.popupview__user {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.popupview__user-logout {
  padding: 3px 12px;
  border-radius: 10px;
  background-color: white;
  border: 1px solid gray;
  color: black;
}

.popupview__user-logout:hover {
  background-color: lightgray;
}
</style>