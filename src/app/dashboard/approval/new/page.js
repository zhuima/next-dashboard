/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 17:11:29
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-15 17:00:18
 * @FilePath: /my-next-dashboard/src/app/dashboard/approval/new/page.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { AiFillHome } from "react-icons/ai";
import Form from "@/app/ui/approval/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";

export const metadata = {
  title: "Create Approval",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "首页", Icon: AiFillHome, href: "/dashboard" },

          {
            label: "审批管理",
            href: "/dashboard/approval",
            active: false,
          },
          {
            label: "发起审批",
            href: "/dashboard/approval/new",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
