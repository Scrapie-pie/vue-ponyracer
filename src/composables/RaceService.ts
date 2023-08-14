import { RaceModel } from '@/models/RaceModel';
import axios, { AxiosResponse } from 'axios';

export function useRaceService() {
  return {
    async list(): Promise<Array<RaceModel>> {
      const response: AxiosResponse = await axios.get<Array<RaceModel>>('https://ponyracer.ninja-squad.com/api/races', {
        params: { status: 'PENDING' }
      });
      return response.data;
    }
  };
}
