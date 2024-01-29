"use client";

import Link from "next/link";

import {
  AiOutlineCheckCircle,
  AiFillClockCircle,
  AiFillMoneyCollect,
  AiFillRest,
} from "react-icons/ai";

import { Button } from "@/app/ui/button";
import { useFormState } from "react-dom";
import { createTask } from "@/app/lib/actions";

export default function Form() {
  const initialState = {
    message: null,
    errors: {
      spec: [],
      type: [],
      command: [],
      status: [],
    },
  };
  const [state, dispatch] = useFormState(createTask, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Task Spec */}
        <div className="mb-4">
          <label htmlFor="spec" className="mb-2 block text-sm font-medium">
            定时任务
          </label>
          <div className="relative">
            <input
              id="spec"
              name="spec"
              type="text"
              placeholder="Enter Cron spec"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="spec-error"
            />
            <AiFillRest className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {state.errors?.spec ? (
            <div
              id="customer-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors?.spec?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        {/* Task Type */}
        <div className="mb-4">
          <label htmlFor="type" className="mb-2 block text-sm font-medium">
            任务类型
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="type"
                name="type"
                type="text"
                placeholder="Enter Cron type"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="type-error"
              />
              <AiFillMoneyCollect className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {state.errors?.type ? (
            <div
              id="type-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors?.type?.map((error) => (
                <p key={error}>{error}</p>
              ))}
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
                name="command"
                command="text"
                placeholder="Enter Cron command"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="command-error"
              />
              <AiFillMoneyCollect className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {state.errors?.command ? (
            <div
              id="command-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors?.command?.map((error) => (
                <p key={error}>{error}</p>
              ))}
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
                  id="disable"
                  name="status"
                  type="radio"
                  value="disable"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="disable"
                  className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                >
                  禁用 <AiFillClockCircle className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="active"
                  name="status"
                  type="radio"
                  value="active"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="active"
                  className="ml-2 flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white dark:text-gray-300"
                >
                  启用 <AiOutlineCheckCircle className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          {state.errors?.status ? (
            <div
              id="status-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors?.status?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </fieldset>
        {state.message ? (
          <div
            id="error-message"
            aria-live="polite"
            className="mt-2 text-sm text-red-500"
          >
            <p>{state.message}</p>
          </div>
        ) : null}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/tasks"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          取消
        </Link>
        <Button type="submit">提交</Button>
      </div>
    </form>
  );
}
