"use client";

import {
  FcClock,
  FcViewDetails,
  FcCommandLine,
  FcCheckmark,
  FcDisapprove,
  FcDocument,
} from "react-icons/fc";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { usePathname, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTasks } from "@/app/hooks/useTasks"; // 更新为正确的路径
import { TaskZodSchema } from "@/schema";

export default function EditInvoiceForm({ task }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(TaskZodSchema),
    defaultValues: {
      spec: task?.spec,
      type: task?.type,
      command: task?.command,
      status: task?.status,
      description: task?.description,
    },
  });
  const router = useRouter();

  const { updateTask } = useTasks(); // 使用 useTasks 钩子获取 createTask 函数

  // get current page for keep go back page
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  console.log("page is ---?>", page);

  const onSubmit = async (data) => {
    // console.log("------>", data);
    try {
      await updateTask(task.id, data);
      toast.success("Task update successfully!", { autoClose: 1000 });
      setTimeout(() => {
        router.push(`/dashboard/tasks?page=${page}`); // 使用 Router.push 进行跳转
      }, 1000); // 在显示成功消息 2 秒后跳转
    } catch (error) {
      toast.error("Failed to update task", { autoClose: 1000 });
      console.error("Failed to update task", error);
    }
  };

  console.log("task 哇哈哈--->", task);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
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
        {/* Task Command */}
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
          href={`/dashboard/tasks?page=${page}`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          取消
        </Link>
        <Button type="submit">提交</Button>
      </div>
    </form>
  );
}
