/* eslint-disable react-hooks/rules-of-hooks */
import expertService from "@services/expert.service";
import userService from "@services/user.service";
import { useQuery } from "@tanstack/react-query";
import { TExpertQuery } from "types/expert.type";

const useUser = () => {
  const getUserByRefUid = (refUid: string) => {
    const response = useQuery({
      queryKey: ["user", refUid],
      queryFn: () => userService.getUserByRefUid(refUid),
      enabled: !!refUid,
    });
    return response;
  };
  return { getUserByRefUid };
};

export default useUser;
