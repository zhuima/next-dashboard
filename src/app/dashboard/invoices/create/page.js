/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 17:11:29
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-13 18:22:45
 * @FilePath: /my-next-dashboard/src/app/dashboard/invoices/create/page.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import Form from "@/app/ui/invoices/create-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";

export const metadata = {
  title: "Create Invoice",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Create Invoice",
            href: "/dashboard/invoices/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
