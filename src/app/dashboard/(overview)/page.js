/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 16:56:21
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-05 15:13:01
 * @FilePath: /my-next-dashboard/src/app/dashboard/(overview)/page.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

import { Suspense } from "react";
import { AiFillHome } from "react-icons/ai";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CardWrapper, { Card } from "@/app/ui/dashboard/cards";
import LatestProjects from "@/app/ui/dashboard/latest-projects";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import {
  RevenueChartSkeleton,
  InvoiceSkeleton,
  CardsSkeleton,
} from "@/app/ui/skeletons";

export const metadata = {
  title: "Dashboard",
};

export default async function Page() {
  // const session = await getServerSession();

  // if (!session) {
  //   redirect("/login");
  // }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[{ label: "首页", Icon: AiFillHome, href: "/dashboard" }]}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Card
          title="Collected"
          value={totalPaidInvoices}
          type="collected"
        />
        <Card
          title="Pending"
          value={totalPendingInvoices}
          type="pending"
        />
        <Card
          title="Total Invoices"
          value={numberOfInvoices}
          type="invoices"
        />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <RevenueChart revenue={revenue} /> */}
        <Suspense fallback={<InvoiceSkeleton />}>
          <LatestProjects />
        </Suspense>
      </div>
    </main>
  );
}
