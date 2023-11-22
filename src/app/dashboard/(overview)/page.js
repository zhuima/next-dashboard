/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 16:56:21
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-22 11:57:49
 * @FilePath: /my-next-dashboard/src/app/dashboard/(overview)/page.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

import { Suspense } from "react";
import {
  AiFillHome,
} from "react-icons/ai";

import Breadcrumbs from "@/app/ui/breadcrumbs";

export const metadata = {
  title: "Dashboard",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[{ label: "首页", Icon: AiFillHome, href: "/dashboard" }]}
      />
      <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>
    </main>
  );
}
