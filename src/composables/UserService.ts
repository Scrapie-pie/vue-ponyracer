import { ref } from 'vue';
import axios, { AxiosResponse } from 'axios';
import { UserModel } from '@/models/UserModel';

export function retrieveUser(): UserModel | null {
  const userAsString = window.localStorage.getItem('rememberMe');
  return userAsString ? JSON.parse(userAsString) : null;
}

const userModel = ref(retrieveUser());

function storeLoggedInUser(user: UserModel): void {
  userModel.value = user;
  window.localStorage.setItem('rememberMe', JSON.stringify(user));
}

export function useUserService() {
  return {
    userModel,

    async register(user: UserModel): Promise<UserModel> {
      const response: AxiosResponse = await axios.post<UserModel>('https://ponyracer.ninja-squad.com/api/users', user);
      storeLoggedInUser(response.data);
      return response.data;
    },

    async authenticate(credentials: { login: string; password: string }): Promise<UserModel> {
      const response: AxiosResponse = await axios.post<UserModel>(
        'https://ponyracer.ninja-squad.com/api/users/authentication',
        credentials
      );
      storeLoggedInUser(response.data);
      return response.data;
    },

    logoutAndForget(): void {
      userModel.value = null;
      window.localStorage.removeItem('rememberMe');
    }
  };
}
