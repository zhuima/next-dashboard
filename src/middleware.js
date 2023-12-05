/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-12-04 13:54:57
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-05 14:49:05
 * @FilePath: /my-next-dashboard/src/app/middleware.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
// import NextAuth from "next-auth";
// import { authConfig } from "./src/app/auth.config";

// export default NextAuth(authConfig).auth;

// export const config = {
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   matcher: ["/((?!api|_next/static|_next/image|.png).*)"],
// };

export { default } from "next-auth/middleware";

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher: ["/((?!api|_next/static|_next/image|.png).*)"],
  matcher: ["/dashboard", "/dashboard/:path*"],
};
