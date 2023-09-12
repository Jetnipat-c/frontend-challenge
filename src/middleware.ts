// import { ACCESS_TOKEN_KEY } from "@constants/common.constant";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
//   const cookie = request.cookies.get(ACCESS_TOKEN_KEY);

//   if (
//     request.nextUrl.pathname.startsWith("/_next") ||
//     request.nextUrl.pathname.startsWith("/signin")
//   ) {
//     return NextResponse.next();
//   }

//   if (!cookie && !request.nextUrl.pathname.startsWith("/signin")) {
//     return NextResponse.rewrite(new URL("/signin", request.nextUrl));
//   }

//   if (cookie) {
//     const responseAPI = await fetch("http://localhost:3000/api/verify", {
//       headers: {
//         IdToken: `${cookie?.value}`,
//       },
//     });

//     const data = await responseAPI.json();

//     if (responseAPI.status !== 200) {
//       return NextResponse.redirect(new URL("/signin", request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/", "/profile", "/history"],
// };

export async function middleware(request: NextRequest) {
  return NextResponse.next();
}
