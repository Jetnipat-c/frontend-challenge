import { auth } from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { customInitApp } from "@lib/firebase-admin-config";
import { ACCESS_TOKEN_KEY } from "@constants/common.constant";
import { cookies } from "next/headers";
import { getCookie, setCookie } from "cookies-next";
import { SignInResponse } from "types/signin-response.type";

customInitApp();

export async function GET(request: NextRequest) {
  const token = request.headers.get("IdToken");
  if (!token) {
    return NextResponse.json({ isSigned: false }, { status: 401 });
  }

  try {
    const decodedClaims = await auth().verifyIdToken(token, true);
    if (!decodedClaims) {
      return NextResponse.json({ isSigned: false } as SignInResponse, {
        status: 401,
      });
    }
  } catch (err) {
    return NextResponse.json({ isSigned: false } as SignInResponse, {
      status: 401,
    });
  }

  return NextResponse.json({ isSigned: true } as SignInResponse, {
    status: 200,
  });
}
