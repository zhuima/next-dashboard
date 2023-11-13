/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 16:31:45
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-13 16:33:58
 * @FilePath: /my-next-dashboard/src/app/login/page.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import CMDBLogo from "@/app/ui/cmdb-logo";
import LoginForm from "@/app/ui/login-form";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <CMDBLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
