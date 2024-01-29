/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 10:29:24
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-15 15:04:13
 * @FilePath: /my-next-dashboard/src/app/dashboard/approval/my/page.js
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
import Pagination from "@/app/ui/approval/pagination";
import Table from "@/app/ui/approval/my/table";
import { CreateTask } from "@/app/ui/tasks/buttons";

import Search from "@/app/ui/search";
import { TasksTableSkeleton } from "@/app/ui/skeletons";
import { usePathname, useSearchParams } from "next/navigation";
import { useApprovalByid } from '@/app/hooks/useApprovalByid';


export default function Page() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const page = Number(searchParams.get("page")) || 1;
  const [limit, setLimit] = useState(10);

  const uid = session?.user?.id

  // console.log("log----> first", page);
  const queryParams = new URLSearchParams({
    page: page,
    size: limit,
    query: query ?? "", // 假设API支持`q`作为搜索参数
  }).toString();
  console.log("Query Params:", queryParams);


  const url = queryParams ? `/api/approval/user/id/${uid}?${queryParams}` : "/api/approval/user/id/${id}"; console.log("after Query Params:", uid, url);

  const { approvals, total, isLoading, mutate } = useApprovalByid(!!uid ? url : null);

  return (
    <main >
      <Breadcrumbs
        breadcrumbs={[
          { label: "首页", Icon: AiFillHome, href: "/dashboard" },
          {
            label: "审批列表",
            href: "/dashboard/approval/base",
            active: false,
          },
          {
            label: "我发起的",
            href: "/dashboard/approval/my",
            active: true,
          },]}
      />
      <div className="w-full">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search tasks..." />
          <CreateTask />
        </div>
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
