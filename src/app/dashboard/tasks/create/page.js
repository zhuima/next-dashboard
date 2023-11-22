/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 17:11:29
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-22 11:59:21
 * @FilePath: /my-next-dashboard/src/app/dashboard/tasks/create/page.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { AiFillHome } from "react-icons/ai";
import Form from "@/app/ui/tasks/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";

export const metadata = {
  title: "Create Task",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "首页", Icon: AiFillHome, href: "/dashboard" },

          {
            label: "定时任务",
            href: "/dashboard/tasks",
            active: false,
          },
          {
            label: "创建任务",
            href: "/dashboard/tasks/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
