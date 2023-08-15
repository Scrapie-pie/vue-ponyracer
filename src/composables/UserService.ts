import { ref } from 'vue';
import axios, { AxiosResponse } from 'axios';
import { UserModel } from '@/models/UserModel';

const userModel = ref<UserModel | null>(null);

export function useUserService() {
  return {
    userModel,

    async register(user: UserModel): Promise<UserModel> {
      const response: AxiosResponse = await axios.post<UserModel>('https://ponyracer.ninja-squad.com/api/users', user);
      return response.data;
    },

    async authenticate(credentials: { login: string; password: string }): Promise<UserModel> {
      const response: AxiosResponse = await axios.post<UserModel>(
        'https://ponyracer.ninja-squad.com/api/users/authentication',
        credentials
      );
      userModel.value = response.data;
      return response.data;
    }
  };
}
