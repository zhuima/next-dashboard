"use client";
import React from 'react'
import { useState, Suspense } from "react";
import { AiFillHome } from "react-icons/ai";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import Pagination from "@/app/ui/user/pagination";
import { useUsers } from "@/app/hooks/useUsers";
import Table from "@/app/ui/user/table";
import { CreateTask } from "@/app/ui/tasks/buttons";


import Search from "@/app/ui/search";
import { TasksTableSkeleton } from "@/app/ui/skeletons";
import { usePathname, useSearchParams } from "next/navigation";


export default function Page() {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const query = searchParams.get("query");
    const [limit, setLimit] = useState(10);
    const queryParams = new URLSearchParams({
        page: page,
        size: limit,
        query: query ?? "", // 假设API支持`q`作为搜索参数
    }).toString();

    const url = queryParams ? `/api/user?${queryParams}` : "/api/user";
    // console.log("Query Params:", queryParams);

    const { users, total, isLoading, mutate } = useUsers(url);

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
                        label: " 用户管理",
                        href: "/dashboard/settings/user",
                        active: true,
                    }]}
            />
            <div className="w-full">
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <Search placeholder="Press (CTRL + /) to search... " />
                    <CreateTask />
                </div>
                <Suspense fallback={<TasksTableSkeleton />}>
                    <Table loading={isLoading} items={users} page={page} mutate={mutate} />
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
                </Suspense>
                {/* {isLoading ? (
                    <TasksTableSkeleton />
                ) : (

                    <>
                        <Table items={users} page={page} mutate={mutate} />
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
                )} */}
            </div>
        </main>
    );
}

