/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-12-05 10:41:40
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-22 10:48:07
 * @FilePath: /my-next-dashboard/src/app/api/auth/authOptions.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import CredentialsProvider from "next-auth/providers/credentials";
import * as z from "zod";
import { loginAuth } from "@/app/lib/loginAuth";

const authOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      name: "crendentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        // try {
        //   // validate the inputs
        //   const parsedCredentials = z
        //     .object({
        //       username: z.string().min(4),
        //       password: z.string().min(6),
        //     })
        //     .safeParse(credentials);
        //   if (parsedCredentials.isError)
        //     throw new Error(parsedCredentials.message);
        //   // make db calls her
        //   const result = await loginAuth(parsedCredentials.data);
        //   if (result.isError) throw new Error(result.message);

        //   console.log("response after login ", result.data);

        //   return result.data;
        // } catch (error) {
        //   throw new Error(error.message);
        // }

        const parsedCredentials = z
          .object({
            username: z.string().min(4),
            password: z.string().min(6),
          })
          .safeParse(credentials);
        if (parsedCredentials.isError)
          throw new Error(parsedCredentials.message);

        console.log("parsedCredentials data------>", parsedCredentials.data);
        // 接收的并不是一个对象，直接传递 parsedCredentials.data 会报错
        const response = await loginAuth(
          parsedCredentials.data.username,
          parsedCredentials.data.password
        );

        console.log(
          "request api interface response ++++++++++++++++++",
          response
        );
        if (!response) throw new Error(response.message);

        const user = response ? response.user : null;
        console.log(
          "《〈《〈《〈《〈《〈《〈《〈《〈《〈《〈《〈《〈《〈《〈",
          user
        );
        return user;
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
    async jwt({ token, user, session }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      // 用户初次登录时，user 对象会被提供
      // console.log("jwt -----> ", { token, user, session });
      // console.log("jwt -----++++++++++++++++++++> ", user.token);
      // console.log("jwt -----++++++++++++++++++++> ", user);

      if (user) {
        // 将用户名添加到 JWT 令牌中
        // token.username = user.username;
        // console.log("jwt -----++++++++++++++++++++> ", user.id);

        return {
          ...token,
          id: user.ID,
          role: user.role_id,
          username: user.username,
          accessToken: user.token,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      // console.log("session -----> ", { session, token, user });
      // console.log(
      //   "session ----++++++++++++++++++++ -----> ",
      //   token.accessToken
      // );

      console.log("session -----> ", { token });
      // Send properties to the client, like an access_token and user id from a provider.
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          accessToken: token.accessToken,
          username: token.username,
        },
      };

      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl));
      }
      return true;
    },
  },
};

export default authOptions;
