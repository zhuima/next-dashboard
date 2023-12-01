/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 17:10:50
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-01 14:24:53
 * @FilePath: /my-next-dashboard/src/app/dashboard/tasks/page.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import { useState, Suspense } from "react";
import { AiFillHome } from "react-icons/ai";

import Pagination from "@/app/ui/tasks/pagination";
import Search from "@/app/ui/search";
import { useTasks } from "@/app/hooks/useTasks";
import TasksTable from "@/app/ui/tasks/table";
import { CreateTask } from "@/app/ui/tasks/buttons";
import { TasksTableSkeleton } from "@/app/ui/skeletons";
import { usePathname, useSearchParams } from "next/navigation";
import Breadcrumbs from "@/app/ui/breadcrumbs";

// export const metadata = {
//   title: "Tasks",
// };

export default function Page() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("query");
  const [limit, setLimit] = useState(10);
  const { tasks, total, isLoading, mutate } = useTasks(page, limit, query);

  console.log("current page, page limit, query", page, limit, query);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "首页", Icon: AiFillHome, href: "/dashboard" },

          {
            label: "定时任务",
            href: "/dashboard/tasks",
            active: true,
          },
        ]}
      />
      <div className="w-full">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search tasks..." />
          <CreateTask />
        </div>
        {/* <Suspense key={query + page} fallback={<TasksTableSkeleton />}>
        <TasksTable tasks={tasks} />
      </Suspense> */}
        {isLoading ? (
          <TasksTableSkeleton />
        ) : (
          <>
            <TasksTable tasks={tasks} page={page} mutate={mutate} />
            <div className="mt-5 flex w-full items-center justify-center">
              <span class="text-sm text-gray-700 pr-6">
                Total <span class="font-semibold">{total}</span> items
              </span>
              <Pagination
                total={total}
                currentPage={page}
                itemsPerPage={limit}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
