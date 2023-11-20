/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 17:10:50
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-17 16:07:31
 * @FilePath: /my-next-dashboard/src/app/dashboard/tasks/page.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import { useState, Suspense } from "react";

import Pagination from "@/app/ui/tasks/pagination";
import Search from "@/app/ui/search";
import { useTasks } from "@/app/hooks/useTasks";
import TasksTable from "@/app/ui/tasks/table";
import { CreateTask } from "@/app/ui/tasks/buttons";
import { TasksTableSkeleton } from "@/app/ui/skeletons";
import { usePathname, useSearchParams } from "next/navigation";

// export const metadata = {
//   title: "Tasks",
// };

export default function Page() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("query");
  const [limit, setLimit] = useState(10);
  const { tasks, total, isLoading } = useTasks(page, limit, query);

  console.log("current page, page limit, query", page, limit, query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Tasks</h1>
      </div>
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
          <TasksTable tasks={tasks} />{" "}
          <div className="mt-5 flex w-full justify-center">
            <Pagination total={total} currentPage={page} itemsPerPage={limit} />
          </div>
        </>
      )}
    </div>
  );
}
