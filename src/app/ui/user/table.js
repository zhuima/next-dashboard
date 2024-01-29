/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-15 18:47:10
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-01 14:05:43
 * @FilePath: /my-next-dashboard/src/app/ui/items/table.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client"
import Link from "next/link";
import { clsx } from "clsx";
import {
  AiOutlineMore,
  AiOutlinePlus,
  AiOutlineDelete,
  AiFillEdit,
} from "react-icons/ai";
import { Menu } from "@headlessui/react";

import { UpdateTask, DeleteTask } from "@/app/ui/domain/buttons";
import TaskStatus from "@/app/ui/domain/status";
import { RenderStatusComponent, RoleOptions, UserStatusOptions } from "@/app/lib/utils";

export default function Table({ loading, items, page, mutate }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className={clsx(
          "rounded-lg bg-gray-50 p-2 md:pt-0",
          loading
            ? "loading"
            : ""
        )}>
          <div className="md:hidden ">

            {items?.map((item) => (
              <div
                key={item.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{item.Cron}</p>
                    </div>
                    <p className="text-sm text-gray-500">{item.Type}</p>
                  </div>
                  <TaskStatus status={item.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{item.type}</p>
                    <p>{item.command}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateTask id={item.id} page={page} />
                    <DeleteTask id={item.id} mutate={mutate} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  id
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Role
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {items?.map((item) => (
                <tr
                  key={item.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg hover:bg-gray-100"
                >
                  <td className="whitespace-normal py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>
                        <Link href={`/dashboard/settings/${item.id}/sub`} prefetch>
                          {item.id}
                        </Link>
                      </p>
                    </div>
                  </td>
                  <td className="whitespace-normal py-3 pl-6 pr-3">
                    <p>{item.nickname}</p>
                  </td>
                  <td className="whitespace-normal px-3 py-3">
                    {item.email}
                  </td>
                  <td className="whitespace-normal px-3 py-3">
                    <RenderStatusComponent
                      options={RoleOptions}
                      currentValue={item.role_id}
                    />
                  </td>
                  <td className="whitespace-normal px-3 py-3">{item.description}</td>
                  <td className="whitespace-normal px-3 py-3">
                    {/* <TaskStatus status={item.status} /> */}
                    <RenderStatusComponent
                      options={UserStatusOptions}
                      currentValue={item.status}
                    />
                  </td>
                  {/* <td className="whitespace-normal py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateTask id={item.id} page={page} />
                      <DeleteTask id={item.id} mutate={mutate} />
                    </div>
                  </td> */}
                  <td className="whitespace-normal p-6">
                    <Menu as="div" className="relative inline-block text-left">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="px-2 py-1 bg-transparent text-black hover:bg-gray-200 active:bg-gray-300 rounded">
                              <AiOutlineMore
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                            </Menu.Button>
                          </div>
                          <Menu.Items
                            className={`absolute right-0  mt-2  z-50 origin-top-right bg-white rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-40 ${open ? "top-full" : "bottom-full"
                              }`}
                          >
                            <div className="py-1">
                              <Menu.Item as="div">
                                {({ active }) => (
                                  <UpdateTask
                                    id={item.id}
                                    page={page}
                                    className={`${active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                      } w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-md text-gray-500`}
                                  />
                                )}
                              </Menu.Item>
                              <Menu.Item as="div">
                                {({ active }) => (
                                  <DeleteTask
                                    id={item.id}
                                    mutate={mutate}
                                    className={`${active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                      } w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500`}
                                  />
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </>
                      )}
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
