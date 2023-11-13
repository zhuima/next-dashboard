/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 17:12:40
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-13 17:42:18
 * @FilePath: /my-next-dashboard/src/app/dashboard/invoices/[id]/edit/page.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Invoice",
};

export default async function Page({ params }) {
  const id = params.id;

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
