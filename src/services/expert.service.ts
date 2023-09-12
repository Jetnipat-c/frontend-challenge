import httpClient from "@utils/httpClient";
import { AxiosResponse } from "axios";
import { TExpert, TExpertQuery } from "types/expert.type";
import { TPaginateResponse } from "types/pagination.type";

const searchExpert = async (
  query: TExpertQuery
): Promise<AxiosResponse<TPaginateResponse<TExpert>>> => {
  const path = `/v1/users/expert`;
  return await httpClient().get(path, { params: query });
};

const searchExpertById = async (
  id: string
): Promise<AxiosResponse<TExpert>> => {
  const path = `/v1/users/expert/${id}`;
  return await httpClient().get(path);
};

const expertService = {
  searchExpert,
  searchExpertById,
};

export default expertService;
