/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-12-05 10:41:40
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-06 11:19:42
 * @FilePath: /my-next-dashboard/src/app/api/auth/[...nextauth]/route.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import NextAuth from "next-auth";
import authOptions from "../authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
