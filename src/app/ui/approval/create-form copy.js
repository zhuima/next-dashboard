/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-15 18:47:10
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-20 11:36:04
 * @FilePath: /my-next-dashboard/src/app/ui/approval/create-form.js
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
import { useApprovals } from "@/app/hooks/useApprovals";
import { useProjects } from "@/app/hooks/useProjects";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { ProjectApprovalZodSchema } from "@/schema";
import { useSession } from "next-auth/react";
import { BusinessOptions } from "@/app/lib/utils";

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ProjectApprovalZodSchema),
    defaultValues: {
      project_name: "",
      git_repo: "",
      is_proxy: "0",
      language: "",
      port: 8080,
      description: "",
      domain: "",
      owner: "",
      business: "",
      status: "active",
      deploy_type: "1",
      approver: "",
      assigner: "",
    },
  });
  const router = useRouter();
  const { data: session } = useSession();
  const { createApproval } = useApprovals(); // 使用 useProjects 钩子获取 createProject 函数
  const { createProject } = useProjects(); // 使用 useProjects 钩子获取 createProject 函数

  // console.log(watch('is_proxy'));
  // console.log(watch('deploy_type'));


  const onSubmit = async (data) => {
    console.log("why nothing work")
    console.log("------>", data);
    // const transformedData = {
    //   ...data,
    //   is_proxy: Number(data.is_proxy),
    // };

    const projectData = {
      project_name: data.project_name,
      git_repo: data.git_repo,
      is_proxy: data.is_proxy,
      domain: data?.domain,
      language: data.language,
      port: data.port,
      business: data.business,
      description: data.description,
      deploy_type: data.deploy_type,
      create_user_id: session.user.id,
      status: data.status,
    };
    try {
      // 从第一步的响应中获取必要的数据
      const projectResponse = await createProject(projectData);
      console.log("projectResponse------>", projectResponse);

      // 第二步：使用第一步返回的数据创建项目
      if (projectResponse && projectResponse.projectID) {
        const approvalData = {
          title: "创建" + data.project_name + "项目申请",
          relatedId: projectResponse.projectID, //依赖projectData数据请求之后返回的结果中的数据
          status: 1,
          approver: data.approver,
          assigner: data.assigner,
          create_user_id: session.user.id,
        };

        console.log("approvalData------>", approvalData);

        await createApproval(approvalData);
        toast.success("Project created successfully!");
        setTimeout(() => {
          router.push("/dashboard/approval/base"); // 使用 Router.push 进行跳转
        }, 2000); // 在显示成功消息 2 秒后跳转
      } else {
        throw new Error("Invalid response data from the approval creation.");
      }
    } catch (error) {
      toast.error("Failed to create project");
      console.error("Failed to create project", error);
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
                      checked={watch('is_proxy') === '0'}
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
                      checked={watch('is_proxy') === '1'}
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


        {/* 如果需要域名的话，需要输入域名地址 */}
        {watch('is_proxy') === '1' ? (
          <div className="-mx-3 flex flex-wrap mt-5">
            <div className="w-full px-3 sm:w-1/2">
              {/* Task is_proxy */}
              <fieldset className="mb-4">
                <legend className="mb-2 block text-sm font-medium">
                  请输入域名
                </legend>
                <div className="relative">
                  <input
                    id="domain"
                    {...register("domain")}
                    placeholder="Enter Project Domain"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="type-error"
                  />
                  <FcClock className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
                {errors?.domain?.message ? (
                  <div
                    id="domain-error"
                    aria-live="polite"
                    className="mt-2 text-sm text-red-500"
                  >
                    {errors.domain.message}
                  </div>
                ) : null}
              </fieldset>
            </div>
          </div>
        ) : ""}


        {/* Deploy Type */}
        <div className="-mx-3 flex flex-wrap mt-5">
          <div className="w-full px-3 sm:w-1/2">
            {/* Task is_proxy */}
            <fieldset className="mb-4">
              <legend className="mb-2 block text-sm font-medium">
                部署方式
              </legend>
              <div className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <input
                      {...register("deploy_type")}
                      type="radio"
                      id="deploy_type_k8s"
                      value="1" // 0 代表 k8s
                      checked={watch('deploy_type') === '1'}
                      aria-describedby="deploy_type-error"
                    />
                    <label
                      htmlFor="deploy_type_k8s"
                      className="ml-2 flex items-center"
                    >
                      k8s
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      {...register("deploy_type")}
                      type="radio"
                      id="deploy_type_active"
                      value='2' // 1 代表 ecs
                      checked={watch('deploy_type') === '2'}
                    />
                    <label
                      htmlFor="deploy_type_active"
                      className="ml-2 flex items-center "
                    >
                      ecs
                    </label>
                  </div>
                </div>
              </div>
              {errors?.deploy_type?.message ? (
                <div
                  id="deploy_type-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {errors.deploy_type.message}
                </div>
              ) : null}
            </fieldset>
          </div>

        </div>


        {/* 如果是ecs部署的话，需要选中对应的主机 */}
        {watch('deploy_type') === '2' ? (
          <div className="-mx-3 flex flex-wrap mt-5">
            <div className="w-full px-3 sm:w-1/2">
              {/* Task is_proxy */}
              <fieldset className="mb-4">
                <legend className="mb-2 block text-sm font-medium">
                  请选择主机
                </legend>
                <div className="relative">
                  <input
                    id="domain"
                    {...register("domain")}
                    placeholder="Enter Project Domain"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="type-error"
                  />
                  <FcClock className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
                {errors?.domain?.message ? (
                  <div
                    id="domain-error"
                    aria-live="polite"
                    className="mt-2 text-sm text-red-500"
                  >
                    {errors.domain.message}
                  </div>
                ) : null}
              </fieldset>
            </div>
          </div>
        ) : ""}


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

        <div className="-mx-3 flex flex-wrap mt-5">
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-4">
              <label
                htmlFor="approver"
                className="mb-2 block text-sm font-medium"
              >
                审批人
              </label>
              <div className="relative">
                <select
                  id="approver"
                  {...register("approver")}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white pl-10 py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option value="" disabled>
                    Select Project approver
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
                <FcClock className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>

              {errors?.approver?.message ? (
                <div
                  id="customer-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {errors.approver.message}
                </div>
              ) : null}
            </div>
          </div>

          {/* Project Owner */}
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-4">
              <label
                htmlFor="assigner"
                className="mb-2 block text-sm font-medium"
              >
                抄送
              </label>
              <div className="relative">
                <select
                  id="assigner"
                  {...register("assigner")}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white pl-10 py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option value="" disabled>
                    Select Project assigner
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

              {errors?.assigner?.message ? (
                <div
                  id="customer-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {errors.assigner.message}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/approval/base"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          prefetch
        >
          取消
        </Link>
        <Button type="submit">提交</Button>
      </div>
    </form>
  );
}
