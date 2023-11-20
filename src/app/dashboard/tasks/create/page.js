/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 17:11:29
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-17 11:58:36
 * @FilePath: /my-next-dashboard/src/app/dashboard/tasks/create/page.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import Form from "@/app/ui/tasks/create-form";
import Breadcrumbs from "@/app/ui/tasks/breadcrumbs";

export const metadata = {
  title: "Create Task",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Tasks", href: "/dashboard/tasks" },
          {
            label: "Create Task",
            href: "/dashboard/tasks/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
