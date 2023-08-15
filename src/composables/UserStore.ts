import { ref, watchEffect } from 'vue';
import { defineStore } from 'pinia';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import { UserModel } from '@/models/UserModel';
import { Connection, useWsService } from '@/composables/WsService';

export function retrieveUser(): UserModel | null {
  const userAsString = window.localStorage.getItem('rememberMe');
  return userAsString ? JSON.parse(userAsString) : null;
}

const userModel = ref(retrieveUser());
let connection: Connection | null;

watchEffect(() => {
  if (connection) {
    connection.disconnect();
  }
  if (userModel.value) {
    const wsService = useWsService();
    connection = wsService.connect<UserModel>(`/player/${userModel.value.id}`, (userWithScore: UserModel) => {
      userModel.value!.money = userWithScore.money;
    });
  }
});

function storeLoggedInUser(user: UserModel): void {
  userModel.value = user;
  window.localStorage.setItem('rememberMe', JSON.stringify(user));
}

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  if (userModel.value) {
    config.headers!.Authorization = `Bearer ${userModel.value.token}`;
  }
  return config;
});

export const useUserStore = defineStore('user', () => {
  return {
    userModel,

    async register(user: UserModel): Promise<UserModel> {
      const response: AxiosResponse = await axios.post<UserModel>('https://ponyracer.ninja-squad.com/api/users', user);
      storeLoggedInUser(response.data);
      return response.data;
    },

    async authenticate(credentials: { login: string; password: string }): Promise<UserModel> {
      const response: AxiosResponse = await axios.post<UserModel>('https://ponyracer.ninja-squad.com/api/users/authentication', credentials);
      storeLoggedInUser(response.data);
      return response.data;
    },

    logoutAndForget(): void {
      userModel.value = null;
      window.localStorage.removeItem('rememberMe');
    }
  };
});
