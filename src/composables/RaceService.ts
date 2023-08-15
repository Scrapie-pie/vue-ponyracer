import axios, {AxiosResponse} from 'axios';
import { RaceModel } from '@/models/RaceModel';

export function useRaceService() {
  return {
    async list(): Promise<Array<RaceModel>> {
      const response: AxiosResponse = await axios.get<Array<RaceModel>>('https://ponyracer.ninja-squad.com/api/races', { params: { status: 'PENDING' } });
      return response.data;
    },

    async get(raceId: number): Promise<RaceModel> {
      const response: AxiosResponse = await axios.get<RaceModel>(`https://ponyracer.ninja-squad.com/api/races/${raceId}`);
      return response.data;
    },

    async bet(raceId: number, ponyId: number): Promise<RaceModel> {
      const response: AxiosResponse = await axios.post<RaceModel>(`https://ponyracer.ninja-squad.com/api/races/${raceId}/bets`, { ponyId });
      return response.data;
    },

    async cancelBet(raceId: number): Promise<void> {
      await axios.delete(`https://ponyracer.ninja-squad.com/api/races/${raceId}/bets`);
    }
  };
}
