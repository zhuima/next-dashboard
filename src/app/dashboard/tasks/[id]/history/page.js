/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 17:10:50
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-22 11:59:07
 * @FilePath: /my-next-dashboard/src/app/dashboard/tasks/[id]/history/page.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import { useState, Suspense } from "react";
import { AiFillHome } from "react-icons/ai";
import Pagination from "@/app/ui/tasks/pagination";
import Search from "@/app/ui/search";
import TaskHistoryTable from "@/app/ui/tasks/history/table";
import { TasksTableSkeleton } from "@/app/ui/skeletons";
import { usePathname, useSearchParams } from "next/navigation";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { useTaskHistory } from "@/app/hooks/useTaskHistory";
// export const metadata = {
//   title: "Tasks",
// };

export default function Page({ params }) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("query");
  const [limit, setLimit] = useState(10);

  const id = params.id;

  const { taskHistory, total, isLoading } = useTaskHistory(
    id,
    page,
    limit,
    query
  );

  console.log("current id, page, page limit, query", id, page, limit, query);
  return (
    <div className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: "首页", Icon: AiFillHome, href: "/dashboard" },
          {
            label: "定时任务",
            href: "/dashboard/tasks",
            active: false,
          },
          {
            label: `任务 ${id} 执行记录`,
            href: `/dashboard/tasks/${id}/history`,
            active: true,
          },
        ]}
      />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search tasks..." />
      </div>
      {/* <Suspense key={query + page} fallback={<TasksTableSkeleton />}>
        <TaskHistoryTable taskHistory={taskHistory} />
      </Suspense> */}
      {isLoading ? (
        <TasksTableSkeleton />
      ) : (
        <>
          <TaskHistoryTable taskHistory={taskHistory} />
          <div className="mt-5 flex w-full justify-center">
            <Pagination total={total} currentPage={page} itemsPerPage={limit} />
          </div>
        </>
      )}
    </div>
  );
}
