/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-12-05 14:31:00
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-05 14:31:07
 * @FilePath: /my-next-dashboard/src/app/providers.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import { SessionProvider } from "next-auth/react";

export const NextAuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
