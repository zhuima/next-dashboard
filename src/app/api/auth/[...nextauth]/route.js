/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-12-05 10:41:40
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-05 15:32:05
 * @FilePath: /my-next-dashboard/src/app/api/auth/[...nextauth]/route.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { customAuth } from "@/app/lib/customAuth";

const handler = NextAuth({
  debug: true,
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        const response = await customAuth(
          credentials?.username,
          credentials?.password
        );

        const user = {
          id: 22,
          username: credentials?.username,
          email: "jsmith@example.com",
        };
        return user;

        // console.log("response ", response);
        // if (response) {
        //   return {
        //     username: credentials?.username,
        //     // token: response,
        //     // id: user.id,
        //     // email: user.email,
        //   };
        // }

        // return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        console.log("token --->", token);
        console.log("account --->", token);
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (token) {
        session.accessToken = token.accessToken;
        session.user = {};
        session.user.id = token.id;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
