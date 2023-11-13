/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 16:34:20
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-13 17:04:05
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
import { Button } from "./button";
import { useFormState, useFormStatus } from "react-dom";

export default function LoginForm() {
  return (
    <form className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={` mb-3 text-2xl`}>Please log in to continue.</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                defaultValue={"admin@admin.com"}
                required
              />
              <AiOutlineUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
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
                defaultValue={"admin"}
                required
                minLength={6}
              />
              <AiOutlineKey className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
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
  const { pending } = useFormStatus();

  return (
    <Link href="/dashboard">
      <Button className="mt-4 w-full" aria-disabled={pending}>
        Log in <AiOutlineArrowRight className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
    </Link>
  );
}
