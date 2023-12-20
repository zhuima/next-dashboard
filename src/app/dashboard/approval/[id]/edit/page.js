/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 17:12:40
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-27 11:06:45
 * @FilePath: /my-next-dashboard/src/app/dashboard/workflow/[id]/edit/page.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import { Suspense } from "react";
import Form from "@/app/ui/approval/edit-form";
import { useApproval } from "@/app/hooks/useApproval";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { AiFillHome } from "react-icons/ai";
import { TasksTableSkeleton } from "@/app/ui/skeletons";
// export const metadata = {
//   title: "Edit Task",
// };

export default function Page({ params }) {
  const id = params.id;

  const { approval, isLoading, error } = useApproval(id);

  console.log("approval data", approval);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "首页", Icon: AiFillHome, href: "/dashboard" },
          {
            label: "工单待办",
            href: "/dashboard/approval",
            active: false,
          },
          {
            label: "编辑工单",
            href: `/dashboard/approval/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Suspense fallback={<TasksTableSkeleton />}>
        {isLoading ? <div>Loading...</div> : <Form approval={approval} />}
      </Suspense>
    </main>
  );
}
