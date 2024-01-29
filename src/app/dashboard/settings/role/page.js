"use client";
import React from 'react'
import { useState, Suspense } from "react";
import { AiFillHome } from "react-icons/ai";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import Pagination from "@/app/ui/domain/pagination";
import { useTasks } from "@/app/hooks/useTasks";
import Table from "@/app/ui/domain/table";
import { CreateTask } from "@/app/ui/tasks/buttons";

import Search from "@/app/ui/search";
import { TasksTableSkeleton } from "@/app/ui/skeletons";
import { usePathname, useSearchParams } from "next/navigation";


export default function Page() {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const query = searchParams.get("query");
    const [limit, setLimit] = useState(10);
    const { tasks, total, isLoading, mutate } = useTasks(page, limit, query);

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "首页", Icon: AiFillHome, href: "/dashboard" },
                    {
                        label: "系统设置",
                        href: "/dashboard/settings",
                        active: false,
                    },
                    {
                        label: " 角色管理",
                        href: "/dashboard/settings/role",
                        active: true,
                    }
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
                        <Table tasks={tasks} page={page} mutate={mutate} />
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

