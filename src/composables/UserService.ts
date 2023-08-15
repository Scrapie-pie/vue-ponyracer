import axios, { AxiosResponse } from 'axios';
import { UserModel } from '@/models/UserModel';

export function useUserService() {
  return {
    async register(user: UserModel): Promise<UserModel> {
      const response: AxiosResponse = await axios.post<UserModel>('https://ponyracer.ninja-squad.com/api/users', user);
      return response.data;
    }
  };
}
