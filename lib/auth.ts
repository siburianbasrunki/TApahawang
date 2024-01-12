import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;
        const decode = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!decode) return null;
        return {
          name: user.name,
          id: user.id,
          role: user.role, // Add the role property to the user object
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (!user) return token;
      return {
        ...token,
        id: user.id,
        role: user.role, // Add the role property to the token
      };
    },
    session({ session, token }) {
      return {
        ...session,
        id: token.id,
        role: token.role, // Add the role property to the session
      };
    },
  },
};
