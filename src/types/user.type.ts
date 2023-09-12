import { TCompany } from "./company.type";

export type TUser = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  refUid: string;
  email: string;
  name: string;
  photoUrl: string;
  role: string;
  company: TCompany;
};
