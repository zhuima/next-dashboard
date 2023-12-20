/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-24 11:53:08
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-15 15:54:08
 * @FilePath: /my-next-dashboard/src/app/dashboard/approval/base/page.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

"use client";
import { useState, Suspense } from "react";
import { AiFillHome } from "react-icons/ai";

import Pagination from "@/app/ui/tasks/pagination";
import Search from "@/app/ui/search";
import { useApprovals } from "@/app/hooks/useApprovals";
import { TasksTableSkeleton } from "@/app/ui/skeletons";
import { usePathname, useSearchParams } from "next/navigation";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import WorkflowTable from "@/app/ui/approval/table";
import { CreateApproval } from "@/app/ui/approval/buttons";

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

  const url = queryParams ? `/api/approval?${queryParams}` : "/api/approval";
  // console.log("Query Params:", queryParams);

  const { approvals, total, isLoading, mutate } = useApprovals(url);

  console.log("log----> after", page, approvals);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "首页", Icon: AiFillHome, href: "/dashboard" },

          {
            label: "审批管理",
            href: "/dashboard/approval",
            active: false,
          },
          {
            label: "所有审批",
            href: "/dashboard/approval/base",
            active: true,
          },
        ]}
      />
      <div className="w-full">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search approval..." />
          <CreateApproval />
        </div>
        {isLoading ? (
          <TasksTableSkeleton />
        ) : (
          <>
            <WorkflowTable
              approvals={approvals}
              page={page}
              url={url}
              mutate={mutate}
            />
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
