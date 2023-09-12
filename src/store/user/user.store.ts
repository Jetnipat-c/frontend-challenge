import { create, StoreApi } from "zustand";
import { devtools } from "zustand/middleware";

import { User } from "firebase/auth";
import { IUserStore, IUserStoreState } from "./user.type";

const initialState: IUserStoreState = {
  user: {} as User,
};

const UserStore = create(
  devtools((set: StoreApi<IUserStore>["setState"]) => ({
    ...initialState,
    setUser: (data: User) => set({ user: data }),
  }))
);

export default UserStore;
