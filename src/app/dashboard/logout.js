/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-12-05 13:56:33
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-05 13:56:39
 * @FilePath: /my-next-dashboard/src/app/dashboard/logout.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <span
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </span>
  );
}
