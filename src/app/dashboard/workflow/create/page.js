/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 17:11:29
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-24 13:40:35
 * @FilePath: /my-next-dashboard/src/app/dashboard/workflow/create/page.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { AiFillHome } from "react-icons/ai";
import Form from "@/app/ui/workflow/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";

export const metadata = {
  title: "Create Workflow",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "首页", Icon: AiFillHome, href: "/dashboard" },
          {
            label: "工单待办",
            href: "/dashboard/workflow",
            active: false,
          },
          {
            label: "创建工单",
            href: "/dashboard/workflow/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
