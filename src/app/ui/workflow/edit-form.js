/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-15 18:47:10
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-01 11:19:49
 * @FilePath: /my-next-dashboard/src/app/ui/workflow/edit-form.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import {
  FcClock,
  FcViewDetails,
  FcCommandLine,
  FcCheckmark,
  FcDisapprove,
  FcDocument,
} from "react-icons/fc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useProjects } from "@/app/hooks/useProjects";
import { usePathname, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { ProjectZodSchema } from "@/schema";
import { BusinessOptions } from "@/app/lib/utils";

export default function EditProjectForm({ project }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ProjectZodSchema),
    defaultValues: {
      project_name: project?.project_name,
      git_repo: project?.git_repo,
      is_proxy: project?.is_proxy.toString(),
      language: project?.language,
      port: project?.port,
      business: project?.business,
      description: project?.description,
      owner: project?.owner,
      status: project?.status,
    },
  });
  const router = useRouter();
  const { updateProject } = useProjects(); // 使用 useProjects 钩子获取 createProject 函数

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  console.log("page is ---?>", page);

  const onSubmit = async (data) => {
    console.log("------>", data);
    // const transformedData = {
    //   ...data,
    //   is_proxy: Number(data.is_proxy),
    // };

    try {
      await updateProject(project.id, data);
      toast.success("Project update successfully!", { autoClose: 2000 });
      setTimeout(() => {
        router.push(`/dashboard/workflow?page=${page}`); // 使用 Router.push 进行跳转
      }, 1000); // 在显示成功消息 2 秒后跳转
    } catch (error) {
      toast.error("Failed to update project", { autoClose: 2000 });
      console.error("Failed to update project", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label
            htmlFor="project_name"
            className="mb-2 block text-sm font-medium"
          >
            项目名称
          </label>
          <div className="relative">
            <input
              id="project_name"
              {...register("project_name")}
              placeholder="Enter Project Name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="type-error"
            />
            <FcClock className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          {errors?.project_name?.message ? (
            <div
              id="customer-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {errors.project_name.message}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="git_repo" className="mb-2 block text-sm font-medium">
            代码仓库地址
          </label>
          <div className="relative">
            <input
              id="git_repo"
              {...register("git_repo")}
              placeholder="Enter Git Repo Address"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="type-error"
            />
            <FcClock className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          {errors?.git_repo?.message ? (
            <div
              id="customer-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {errors.git_repo.message}
            </div>
          ) : null}
        </div>

        <div className="-mx-3 flex flex-wrap ">
          {/* Task Type */}
          <div className="w-full px-3 sm:w-1/2 ">
            <div className="mb-4">
              <label
                htmlFor="language"
                className="mb-2 block text-sm font-medium"
              >
                项目语言类型
              </label>
              <div className="relative">
                <select
                  id="language"
                  {...register("language")}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 pl-10 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option value="" disabled>
                    Select Project Language
                  </option>
                  <option key="vue" value="vue">
                    vue
                  </option>
                  <option key="java" value="java">
                    java
                  </option>
                  <option key="go" value="go">
                    go
                  </option>
                  <option key="python" value="python">
                    python
                  </option>
                  <option key="rust" value="rust">
                    rust
                  </option>
                </select>
                <FcViewDetails className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>

              {errors?.language?.message ? (
                <div
                  id="customer-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {errors.language.message}
                </div>
              ) : null}
            </div>
          </div>

          <div className="w-full px-3 sm:w-1/2">
            {/* Task is_proxy */}
            <fieldset className="mb-4">
              <legend className="mb-2 block text-sm font-medium">
                是否需要域名
              </legend>
              <div className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <input
                      {...register("is_proxy")}
                      type="radio"
                      id="proxy_disable"
                      value="0" // 0 代表 disable
                      aria-describedby="is_proxy-error"
                    />
                    <label
                      htmlFor="proxy_disable"
                      className="ml-2 flex items-center"
                    >
                      否
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      {...register("is_proxy")}
                      type="radio"
                      id="proxy_active"
                      value="1" // 1 代表 active
                    />
                    <label
                      htmlFor="proxy_active"
                      className="ml-2 flex items-center "
                    >
                      是
                    </label>
                  </div>
                </div>
              </div>
              {errors?.is_proxy?.message ? (
                <div
                  id="is_proxy-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {errors.is_proxy.message}
                </div>
              ) : null}
            </fieldset>
          </div>
        </div>

        <div className="-mx-3 flex flex-wrap ">
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-4">
              <label htmlFor="port" className="mb-2 block text-sm font-medium">
                项目端口
              </label>
              <div className="relative">
                <input
                  id="port"
                  type="number"
                  {...register("port", {
                    setValueAs: (value) =>
                      value === "" ? null : parseInt(value, 10),
                  })}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white pl-10 py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  aria-describedby="type-error"
                />
                <FcClock className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>

              {errors?.port?.message ? (
                <div
                  id="customer-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {errors.port.message}
                </div>
              ) : null}
            </div>
          </div>

          {/* Project Owner */}
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-4">
              <label htmlFor="owner" className="mb-2 block text-sm font-medium">
                项目负责人
              </label>
              <div className="relative">
                <select
                  id="owner"
                  {...register("owner")}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white pl-10 py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option value="" disabled>
                    Select Project owner
                  </option>
                  <option key="zhuima" value="zhuima">
                    zhuima
                  </option>
                  <option key="Nick" value="Nick">
                    Nick
                  </option>
                  <option key="Tony" value="Tony">
                    Tony
                  </option>
                </select>
                <FcViewDetails className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>

              {errors?.owner?.message ? (
                <div
                  id="customer-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {errors.owner.message}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="-mx-3 flex flex-wrap mt-5">
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-4">
              <label
                htmlFor="business"
                className="mb-2 block text-sm font-medium"
              >
                所属业务线
              </label>
              <div className="relative">
                <select
                  id="business"
                  {...register("business")}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white pl-10 py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option value="" disabled>
                    Select Project business
                  </option>

                  {BusinessOptions.map((business) => (
                    <option key={business.value} value={business.value}>
                      {business.label}
                    </option>
                  ))}
                </select>
                <FcClock className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>

              {errors?.business?.message ? (
                <div
                  id="customer-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {errors.business.message}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Task Description */}
        <div className="mt-4 mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            项目描述
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="description"
                {...register("description")}
                placeholder="Enter Cron description"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="description-error"
              />
              <FcDocument className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {errors?.description?.message ? (
            <div
              id="customer-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {errors.description.message}
            </div>
          ) : null}
        </div>

        {/* Task Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">状态</legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  {...register("status")}
                  type="radio"
                  id="status-disable"
                  value="disable"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="disable"
                  className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                >
                  禁用
                </label>
              </div>
              <div className="flex items-center">
                <input
                  {...register("status")}
                  type="radio"
                  id="status-active"
                  value="active"
                />
                <label
                  htmlFor="active"
                  className="ml-2 flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white dark:text-gray-300"
                >
                  启用
                </label>
              </div>
            </div>
          </div>
          {errors?.status?.message ? (
            <div
              id="status-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {errors.status.message}
            </div>
          ) : null}
        </fieldset>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/dashboard/workflow?page=${page}`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          取消
        </Link>
        <Button type="submit">提交</Button>
      </div>
    </form>
  );
}
