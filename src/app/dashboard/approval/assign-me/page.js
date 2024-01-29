/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 10:29:24
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-15 15:03:59
 * @FilePath: /my-next-dashboard/src/app/dashboard/approval/assign-me/page.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import React from 'react'
import { useState, Suspense } from "react";
import { useSession, signIn } from "next-auth/react";
import { AiFillHome } from "react-icons/ai";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import Pagination from "@/app/ui/domain/pagination";
import { useTasks } from "@/app/hooks/useTasks";
import Table from "@/app/ui/approval/my/table";
import { CreateTask } from "@/app/ui/tasks/buttons";

import Search from "@/app/ui/search";
import { TasksTableSkeleton } from "@/app/ui/skeletons";
import { usePathname, useSearchParams } from "next/navigation";
import { useApprovalByUser } from '@/app/hooks/useApprovalByUser';

export default function Page() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const page = Number(searchParams.get("page")) || 1;
  const [limit, setLimit] = useState(10);

  const username = session?.user?.username

  // console.log("log----> first", page);
  const queryParams = new URLSearchParams({
    page: page,
    size: limit,
    query: query ?? "", // 假设API支持`q`作为搜索参数
  }).toString();
  console.log("Query Params:", queryParams);


  const url = queryParams ? `/api/approval/user/username/${username}?${queryParams}` : "/api/approval/user/username/${username}";
  console.log("after Query Params:", username, url);

  const { approvals, total, isLoading, mutate } = useApprovalByUser(!!username ? url : null);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "首页", Icon: AiFillHome, href: "/dashboard" },
          {
            label: "审批列表",
            href: "/dashboard/approval/base",
            active: false,
          },
          {
            label: "我审批的",
            href: "/dashboard/approval/assign-me",
            active: true,
          },]}
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
            <Table approvals={approvals} page={page} mutate={mutate} />
            <div className="mt-5 flex w-full items-center justify-center gap-x-6">
              <span className="text-sm text-gray-700 ">
                Total <span className="font-semibold">{total}</span> items
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

