/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 16:34:20
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-05 13:43:27
 * @FilePath: /my-next-dashboard/src/app/ui/login-form.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import {
  AiOutlineKey,
  AiOutlineArrowRight,
  AiOutlineUser,
} from "react-icons/ai";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./button";
import { useForm } from "react-hook-form";
import * as z from "zod";
// import { signIn } from "@/app/auth";
import { signIn } from "next-auth/react";
const FormSchema = z.object({
  username: z.string().min(3, "UserName is required"),
  password: z.string().min(6, "Password is required"),
});

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(FormSchema) });

  const onSubmit = async (data) => {
    console.log("log", data);
    // const result = await authenticate(data);
    const result = await signIn("credentials", {
      ...data,
      // callbackUrl: "/dashboard",
      redirect: false,
    });

    console.log("xxxxxxxxxx", { result });
    // // 这里只处理错误情况，因为成功的重定向由 NextAuth 配置管理
    if (result.error) {
      // 显示错误信息
      // console.error(result.error);
      toast.error(result.error);
      // throw new Error(result.error);
    }

    if (!result?.error) {
      router.push("/dashboard");
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
        <LoginButton />
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
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  // const { "pending" } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled="false">
      Log in <AiOutlineArrowRight className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
