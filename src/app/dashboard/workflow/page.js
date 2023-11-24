/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-24 11:53:08
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-24 13:45:05
 * @FilePath: /my-next-dashboard/src/app/dashboard/workflow/page.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React from "react";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { AiFillHome } from "react-icons/ai";
import Search from "@/app/ui/search";
import WorkflowTable from "@/app/ui/workflow/table";
import { CreateWorkflow } from "@/app/ui/workflow/buttons";

export default function Page() {
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
        表单提交工作流
      </div>
    </main>
  );
}
