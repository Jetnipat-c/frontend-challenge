import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_KEY } from "@constants/common.constant";
import { SignInResponse } from "types/signin-response.type";

const WithAuth = (Component: any) => {
  const AuthenticatedComponent = async (props: any) => {
    const cookieStore = cookies();

    const cookie = cookieStore.get(ACCESS_TOKEN_KEY);

    if (cookie) {
      const responseAPI = await fetch("http://localhost:3000/api/verify", {
        headers: {
          IdToken: `${cookie?.value}`,
        },
      });

      const data = (await responseAPI.json()) as SignInResponse;

      if (responseAPI.status !== 200 && !data?.isSigned) {
        return redirect("/signin");
      }
      return <Component {...props} />;
    }

    redirect("/signin");
  };
  return AuthenticatedComponent;
};

export default WithAuth;
