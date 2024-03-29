/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 16:34:20
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-07 14:12:37
 * @FilePath: /my-next-dashboard/src/app/ui/login-form.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import { useState } from "react"
import {
  AiOutlineKey,
  AiOutlineArrowRight,
  AiOutlineUser,
} from "react-icons/ai";
import { clsx } from "clsx";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./button";
import { useForm } from "react-hook-form";
import { usePathname, useSearchParams } from "next/navigation";
import { LoginZodSchema } from "@/schema";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  // 添加一个状态来保存错误消息
  const [loginError, setLoginError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const url = searchParams.get("callbackUrl") || "/dashboard";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(LoginZodSchema) });


  // 监听所有字段的变化
  watch((data, { name, type }) => {
    if (loginError) {
      setLoginError(null)
    }
  });


  const onSubmit = async (data) => {
    // console.log("log", data);
    // const result = await authenticate(data);
    // 清除之前的错误信息
    setLoginError(null);
    const result = await signIn("credentials", {
      ...data,
      callbackUrl: url,
      redirect: false,
    });

    console.log("xxxxxxxxxx", { result });
    // // 这里只处理错误情况，因为成功的重定向由 NextAuth 配置管理
    if (result.error) {
      // 显示错误信息
      console.error(result.error);
      // toast.error(result.error.toString());
      // throw new Error(result.error);
      // 设置错误消息
      setLoginError(result.error);
    }

    if (!result?.error) {
      // router.push("/dashboard");
      // 清除错误消息
      setLoginError(null);
      router.replace(url, { shallow: true });
      // router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={` mb-3 text-2xl`}>Please log in to continue.</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="username"
            >
              Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                {...register("username")}
                autoComplete="username"
              />
              <AiOutlineUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>

            {errors?.username?.message ? (
              <div
                id="customer-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {errors.username.message}
              </div>
            ) : null}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                {...register("password")}
                autoComplete="current-password"
              />
              <AiOutlineKey className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errors?.password?.message ? (
              <div
                id="customer-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {errors.password.message}
              </div>
            ) : null}
          </div>
        </div>
        <LoginButton isSubmitting={isSubmitting} />
        <div className="flex h-8 items-end space-x-1">
          {/* Add form errors here */}
          {/* {code === "CredentialSignin" && (
            <>
              <AiOutlineUser className="h-5 w-5 text-red-500" />
              <p aria-live="polite" className="text-sm text-red-500">
                Invalid credentials
              </p>
            </>
          )} */}

          {/* 显示错误消息 */}
          {loginError && (
            <>
              <AiOutlineUser className="h-5 w-5 text-red-500" />
              <p aria-live="polite" className="text-sm text-red-500">
                Invalid credentials
              </p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function LoginButton({ isSubmitting }) {
  // const { "pending" } = useFormStatus();

  return (
    <Button disabled={isSubmitting} className="mt-4 w-full" aria-disabled="false">
      {isSubmitting ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Logging in...
        </>) : (
        <>
          Log in <AiOutlineArrowRight className="ml-auto h-5 w-5 text-gray-50" />
        </>

      )}
    </Button >



  );
}
