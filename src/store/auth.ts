import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { Nullable } from "../types/base";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from "../plugins/firebase_config";
import { ChromeRuntimeMessage } from "../types/base";

export interface IUser {
  nickName?: string;
  profileImage?: string;
  userId?: string;
  email?: string;
}

const getAuthToken = (interactive: boolean) => {
  return new Promise<string>(resolve => {
    const msg = { 
      type : ChromeRuntimeMessage.ISSUE_AUTH_TOKEN, 
      interactive: interactive,
    };
    chrome.runtime.sendMessage(msg, (response) => {
      resolve(response.token);
    })
  });
}

export const useAuthStore = defineStore('auth', () => {
  const app = initializeApp(firebaseConfig);
  const userRef = ref<Nullable<IUser>>(null);
  const tokenRef = ref<Nullable<string>>(null);
  const isAuthenticated = computed<boolean>(() => userRef.value !== null);

  async function login ({interactive}: {interactive:boolean}) {
    const token = await getAuthToken(interactive);
    tokenRef.value = token;
    const auth = getAuth();
    const oAuthCredential = GoogleAuthProvider.credential(null, token);
    const userCredential = await signInWithCredential(auth, oAuthCredential);
    userRef.value = {
      nickName: userCredential.user.displayName ?? 'Anonymous',
      userId : userCredential.user.uid,
      profileImage: userCredential.user.photoURL ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbADKB5OER8mK9MCrkCBFJeXc2pZCGucLNxA&usqp=CAU',
      email: userCredential.user.email ?? "",
    }
  }

  async function logout () {
    const msg = { 
      type : ChromeRuntimeMessage.REVOKE_AUTH_TOKEN, 
      token: tokenRef.value,
    };
    chrome.runtime.sendMessage(msg, (response) => {
      console.log(response)
    });
    userRef.value = null;
  }

  return {
    user: userRef,
    isAuthenticated,
    token: tokenRef,
    login,
    logout,
  }
});