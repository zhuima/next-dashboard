/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-15 18:47:10
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-15 15:30:26
 * @FilePath: /my-next-dashboard/src/app/ui/tasks/create-form.js
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { useTasks } from "@/app/hooks/useTasks"; // 更新为正确的路径
import { useTaskMethod } from "@/app/hooks/useTaskMethod"; // 更新为正确的路径
import { TaskZodSchema } from "@/schema";

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(TaskZodSchema),
    defaultValues: {
      spec: "",
      type: "",
      command: "",
      description: "",
      status: "active",
      methodname: ""

    },
  });
  const router = useRouter();

  const { createTask } = useTasks(); // 使用 useTasks 钩子获取 createTask 函数
  const { methodlist } = useTaskMethod(); // 使用 useTasks 钩子获取 createTask 函数

  const onError = (errors, e) => {
    // Handle errors, e.g., log them or display messages
    console.log("------>    errors", errors);
    console.log("------>    e", e);

  };


  const onSubmit = async (data) => {
    console.log("------>", data);
    try {
      await createTask(data);
      toast.success("Task created successfully!", { autoClose: 1000 });
      setTimeout(() => {
        router.push("/dashboard/tasks"); // 使用 Router.push 进行跳转
      }, 2000); // 在显示成功消息 2 秒后跳转
    } catch (error) {
      toast.error("Failed to create task", { autoClose: 1000 });
      console.error("Failed to create task", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="spec" className="mb-2 block text-sm font-medium">
            定时任务
          </label>
          <div className="relative">
            <input
              id="spec"
              {...register("spec")}
              placeholder="Enter Cron spec"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="type-error"
            />
            <FcClock className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          {errors?.spec?.message ? (
            <div
              id="customer-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {errors.spec.message}
            </div>
          ) : null}
        </div>

        {/* Task Type */}
        <div className="mb-4">
          <label htmlFor="type" className="mb-2 block text-sm font-medium">
            任务类型
          </label>
          <div className="relative">
            <select
              id="type"
              {...register("type")}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            >
              <option value="" disabled>
                Select a type
              </option>
              <option key="system_command" value="system_command">
                System Command
              </option>
              <option key="custom_method" value="custom_method">
                Custom Method
              </option>
            </select>
            <FcViewDetails className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>

          {errors?.type?.message ? (
            <div
              id="customer-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {errors.type.message}
            </div>
          ) : null}
        </div>




        {/* 如果选择类型为custom_method，从后端获取任务列表 */}
        {watch("type") === "custom_method" ? (
          <div className="-mx-3 flex flex-wrap mt-5">
            <div className="w-full px-3 sm:w-1/2">
              {/* Task is_proxy */}
              <fieldset className="mb-4">
                <legend className="mb-2 block text-sm font-medium">
                  请选择任务
                </legend>
                <div className="relative">
                  <select
                    id="methodname"
                    {...register("methodname")}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white pl-10 py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  >
                    <option value="" disabled>
                      Select Project methodname
                    </option>

                    {methodlist?.map((methodName) => (
                      <option key={methodName.label} value={methodName.name}>
                        {methodName.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors?.methodname?.message ? (
                  <div
                    id="methodname-error"
                    aria-live="polite"
                    className="mt-2 text-sm text-red-500"
                  >
                    {errors.methodname.message}
                  </div>
                ) : null}
              </fieldset>
            </div>
          </div>
        ) : ""}


        {/* Task Command */}
        {watch("type") === "system_command" ? (
          <div className="mb-4">
            <label htmlFor="command" className="mb-2 block text-sm font-medium">
              任务内容
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="command"
                  {...register("command")}
                  placeholder="Enter Cron command"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="command-error"
                />
                <FcCommandLine className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            {errors?.command?.message ? (
              <div
                id="customer-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {errors.command.message}
              </div>
            ) : null}
          </div>
        ) : ""}


        {/* Task Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            任务描述
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
          href="/dashboard/tasks"
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
