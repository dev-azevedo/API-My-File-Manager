export interface IUser {
  id?: number;
  name: string;
  email: string;
  phone: string;
  dateBirth: Date;
  password: string;
  profileId: number;
}

export interface ISignInUser {
  email: string;
  password: string;
}
