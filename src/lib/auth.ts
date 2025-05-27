import { auth } from "@clerk/nextjs/server";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { NextResponse } from "next/server";
import { Roles } from "@/types";

export async function isAdmin() {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  return true;
}

export function withRouteAuth<Args extends unknown[]>(
  handler: (req: Request, ...args: Args) => Promise<Response>,
) {
  return async (req: Request, ...args: Args) => {
    const admin = await isAdmin();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return handler(req, ...args);
  };
}

export function withPageAuth<P extends Record<string, unknown>>(
  gssp: GetServerSideProps<P>,
): GetServerSideProps<P> {
  return async (
    context: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const { userId } = await auth();

    if (!userId) {
      return {
        redirect: {
          destination: "/sign-in",
          permanent: false,
        },
      };
    }

    return await gssp(context);
  };
}

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth()
  return sessionClaims?.metadata.role === role
}