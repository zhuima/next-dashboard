/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-12-04 11:00:03
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-04 11:05:14
 * @FilePath: /my-next-dashboard/src/app/ui/dashboard/cards.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
// import {
//   BanknotesIcon,
//   ClockIcon,
//   UserGroupIcon,
//   InboxIcon,
// } from "@heroicons/react/24/outline";

import { AiFillHome } from "react-icons/ai";
import { lusitana } from "@/app/ui/fonts";

const iconMap = {
  collected: AiFillHome,
  customers: AiFillHome,
  pending: AiFillHome,
  invoices: AiFillHome,
};

export default async function CardWrapper() {
  //   const {
  //     numberOfCustomers,
  //     numberOfInvoices,
  //     totalPaidInvoices,
  //     totalPendingInvoices,
  //   } = await fetchCardData();
  const numberOfCustomers = 1;
  const numberOfInvoices = 5;
  const totalPaidInvoices = 12;
  const totalPendingInvoices = 16;

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

export function Card({ title, value, type }) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
