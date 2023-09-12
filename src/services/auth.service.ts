import httpClient from "@utils/httpClient";

const signIn = async () => {
  const path = `/v1/auth/signin`;
  return await httpClient().get(path);
};

const authService = {
  signIn,
};

export default authService;
