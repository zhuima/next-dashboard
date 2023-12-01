/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-24 11:53:08
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-01 09:58:02
 * @FilePath: /my-next-dashboard/src/app/dashboard/workflow/page.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

"use client";
import { useState, Suspense } from "react";
import { AiFillHome } from "react-icons/ai";

import Pagination from "@/app/ui/tasks/pagination";
import Search from "@/app/ui/search";
import { useProjects } from "@/app/hooks/useProjects";
import { TasksTableSkeleton } from "@/app/ui/skeletons";
import { usePathname, useSearchParams } from "next/navigation";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import WorkflowTable from "@/app/ui/workflow/table";
import { CreateWorkflow } from "@/app/ui/workflow/buttons";

export default function Page() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("query");
  const [limit, setLimit] = useState(10);
  // console.log("log----> first", page);
  const queryParams = new URLSearchParams({
    page: page,
    size: limit,
    query: query ?? "", // 假设API支持`q`作为搜索参数
  }).toString();

  const url = queryParams ? `/api/project?${queryParams}` : "/api/project";
  // console.log("Query Params:", queryParams);

  const { projects, total, isLoading, mutate } = useProjects(url);

  console.log("log----> after", page, projects);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "首页", Icon: AiFillHome, href: "/dashboard" },

          {
            label: "工单待办",
            href: "/dashboard/workflow",
            active: true,
          },
        ]}
      />
      <div className="w-full">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search workflow..." />
          <CreateWorkflow />
        </div>
        {isLoading ? (
          <TasksTableSkeleton />
        ) : (
          <>
            <WorkflowTable
              projects={projects}
              page={page}
              url={url}
              mutate={mutate}
            />
            <div className="mt-5 flex w-full justify-center">
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
