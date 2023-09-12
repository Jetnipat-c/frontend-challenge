/* eslint-disable react-hooks/rules-of-hooks */
import expertService from "@services/expert.service";
import { useQuery } from "@tanstack/react-query";
import { TExpertQuery } from "types/expert.type";

const useExpert = () => {
  const getExpertList = (query: TExpertQuery) => {
    const response = useQuery({
      queryKey: ["expert", query],
      queryFn: () => expertService.searchExpert(query),
    });

    return response;
  };

  const getExpertById = (id: string) => {
    const response = useQuery({
      queryKey: ["expert", id],
      queryFn: () => expertService.searchExpertById(id),
    });
    return response;
  };
  return { getExpertList, getExpertById };
};

export default useExpert;
