/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 17:12:40
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-17 13:52:54
 * @FilePath: /my-next-dashboard/src/app/dashboard/tasks/[id]/edit/page.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import { Suspense } from "react";
import Form from "@/app/ui/tasks/edit-form";
import { useTask } from "@/app/hooks/useTask";
import Breadcrumbs from "@/app/ui/tasks/breadcrumbs";
import { notFound } from "next/navigation";
import { TasksTableSkeleton } from "@/app/ui/skeletons";
// export const metadata = {
//   title: "Edit Task",
// };

export default function Page({ params }) {
  const id = params.id;

  const { task, isLoading, error } = useTask(id);

  console.log("task data", task);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Tasks", href: "/dashboard/tasks" },
          {
            label: "Edit Task",
            href: `/dashboard/tasks/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Suspense fallback={<TasksTableSkeleton />}>
        {isLoading ? <div>Loading...</div> : <Form task={task} />}
      </Suspense>
    </main>
  );
}
