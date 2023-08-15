export interface UserModel {
  id?: number;
  login: string;
  password: string;
  birthYear: number;
  money?: number;
  token?: string;
}
