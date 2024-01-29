/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 17:12:40
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-27 11:06:45
 * @FilePath: /my-next-dashboard/src/app/dashboard/workflow/[id]/edit/page.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import { Suspense } from "react";
import Form from "@/app/ui/approval/edit-form";
import { useApproval } from "@/app/hooks/useApproval";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { AiFillHome } from "react-icons/ai";
import { TasksTableSkeleton } from "@/app/ui/skeletons";
import ApprovalDisplay from "@/app/ui/approval/approval-display"

export default function Page({ params }) {
    const id = params.id;

    const { approval, isLoading, error } = useApproval(id);

    console.log("approval data", approval);

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
                        label: "工单审批",
                        href: `/dashboard/approval/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Suspense fallback={<TasksTableSkeleton />}>
                <ApprovalDisplay event={approval} />
            </Suspense>
        </main>
    );
}
