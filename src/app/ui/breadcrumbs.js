/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-15 18:47:10
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-22 11:56:54
 * @FilePath: /my-next-dashboard/src/app/ui/breadcrumbs.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { clsx } from "clsx";
import Link from "next/link";

export default function Breadcrumbs({ breadcrumbs }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={clsx("flex text-xl md:text-2xl")}>
        {breadcrumbs.map((breadcrumb, index) => {
          const Icon = breadcrumb.Icon; // Dynamically get the icon component

          return (
            <li
              key={breadcrumb.href}
              className={clsx(
                "flex items-center transition-all duration-300",
                breadcrumb.active
                  ? "text-gray-900 "
                  : "text-gray-500 opacity-60 "
              )}
            >
              {Icon && <Icon className="h-5 w-5 mr-2" />}{" "}
              {/* Render the icon */}
              {index < breadcrumbs.length - 1 ? (
                <Link href={breadcrumb.href} className="hover:text-blue-600">
                  {breadcrumb.label}
                </Link>
              ) : (
                <span>{breadcrumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 ? (
                <span className="mx-3 inline-block">/</span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
