import httpClient from "@utils/httpClient";
import { AxiosResponse } from "axios";
import { TUser } from "types/user.type";

const getUserByRefUid = async (
  refUid: string
): Promise<AxiosResponse<TUser>> => {
  const path = `/v1/users/find/${refUid}`;
  return await httpClient().get(path);
};

const userService = {
  getUserByRefUid,
};

export default userService;
