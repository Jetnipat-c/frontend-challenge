import { TPaginateOptions } from "./pagination.type";

export type TExpertQuery = TPaginateOptions & {};

export type TExpert = {
  id: string;
  createdAt: string;
  updatedAt: string;
  refUid: string;
  email: string;
  name: string;
  role: string;
  photoUrl: string | null | undefined;
};
