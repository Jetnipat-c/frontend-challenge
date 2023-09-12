import { User } from "firebase/auth";

export interface IUserStoreState {
  user: User;
}

export interface IUserStore extends IUserStoreState {
  setUser: (data: User) => void;
}
