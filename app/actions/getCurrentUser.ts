// This code to be a part of an authentication-related logic in Next.js, 
// where it retrieves the current user's information based on the session and database. 
// It uses NextAuth.js for session management and Prisma for database querying.

//  This session is typically identified by a unique session ID, 
// which is stored as a cookie in the user's browser or passed through other means of identification.

import { getServerSession } from "next-auth/next"

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      }
    });

    if (!currentUser) {
      return null;
    }
    
    // The toISOString() method is commonly used when working with dates in JavaScript, 
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: 
        currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}

