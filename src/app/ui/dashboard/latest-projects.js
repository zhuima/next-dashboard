/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-12-04 11:00:23
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-04 13:42:26
 * @FilePath: /my-next-dashboard/src/app/ui/dashboard/latest-projects.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import { AiOutlineSync } from "react-icons/ai";

import clsx from "clsx";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import { useProjects } from "@/app/hooks/useProjects";

export default function LatestProjects() {
  const page = 1;
  const limit = 10;
  const query = "";
  const queryParams = new URLSearchParams({
    page: page ?? 1,
    size: limit ?? 10,
    query: query ?? "", // 假设API支持`q`作为搜索参数
  }).toString();

  const url = queryParams ? `/api/project?${queryParams}` : "/api/project";
  // console.log("Query Params:", queryParams);

  const { projects, total, isLoading, mutate } = useProjects(url);

  return (
    <div className="flex w-full flex-col md:col-span-4 lg:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Projects
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4 ">
        {/* NOTE: comment in this code when you get to this point in the course */}

        {projects.map((project, i) => {
          return (
            <div
              key={project.id}
              className={clsx(
                "flex flex-row items-center justify-start py-4 gap-x-6 hover:bg-gray-100",
                {
                  "border-t": i !== 0,
                }
              )}
            >
              <div className="flex flex-1 items-center">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold md:text-base">
                    {project.project_name}
                  </p>
                  <p className="hidden text-sm text-gray-500 sm:block">
                    {project.status}
                  </p>
                </div>
              </div>
              <div className="flex-1 flex-shrink-0 w-20">
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {project.created_at}
                </p>
              </div>
              <div className="flex-shrink-0 w-20">
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base `}
                >
                  {project.port}
                </p>
              </div>
            </div>
          );
        })}
        <div className="flex items-center pb-2 pt-6">
          <AiOutlineSync className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
