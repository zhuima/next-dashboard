/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-15 18:47:10
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-20 14:10:47
 * @FilePath: /my-next-dashboard/src/app/ui/workflow/table.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import Link from "next/link";
import { clsx } from "clsx";

import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  AiOutlineMore,
  AiOutlinePlus,
  AiOutlineDelete,
  AiFillEdit,
} from "react-icons/ai";
import { Menu } from "@headlessui/react";
import { UpdateWorkflow, DeleteWorkflow } from "@/app/ui/workflow/buttons";
import WorkflowStatus from "@/app/ui/workflow/status";
import {
  approvalStatusOptions,
  applyOperateOptions,
  userOption,
  BusinessOptions,
  RenderStatusComponent,
  TypeOptions,
} from "@/app/lib/utils";

export default function WorkflowTable({ loading, projects, page, mutate }) {
  return (
    <div className="mt-3 flow-root mb-3">
      <div className="inline-block min-w-full align-middle">
        <div className={clsx(
          "rounded-lg bg-gray-50 p-2 md:pt-0",
          loading
            ? "loading"
            : ""
        )}>
          <table className="hidden min-w-full text-gray-900 md:table ">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="whitespace-nowrap px-4 py-5 font-medium sm:pl-6">
                  id
                </th>
                <th scope="col" className="whitespace-nowrap px-3 py-5 font-medium">
                  Name
                </th>
                <th scope="col" className="whitespace-nowrap px-3 py-5 font-medium">
                  服务类型
                </th>
                <th scope="col" className="whitespace-nowrap px-3 py-5 font-medium">
                  Language
                </th>
                <th scope="col" className="whitespace-nowrap px-3 py-5 font-medium">
                  业务线
                </th>
                <th scope="col" className="whitespace-nowrap px-3 py-5 font-medium">
                  Description
                </th>
                <th scope="col" className="whitespace-nowrap px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {projects?.map((project) => (
                <tr
                  key={project.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg hover:bg-gray-100"
                >
                  <td className="whitespace-normal py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Link href={`/dashboard/workflow/${project.id}/detail`} prefetch>
                        {project.id}
                      </Link>
                    </div>
                  </td>
                  <td className="whitespace-normal py-3 pl-6 pr-3">
                    <p>{project.project_name}</p>
                  </td>
                  <td className="whitespace-normal  px-3 py-3">
                    <RenderStatusComponent
                      options={TypeOptions}
                      currentValue={project.type}
                    />
                  </td>
                  <td className="whitespace-normal px-3 py-3">
                    {project.language}
                  </td>

                  <td className="whitespace-normal px-3 py-3">
                    <RenderStatusComponent
                      options={BusinessOptions}
                      currentValue={project.business}
                    />
                  </td>
                  <td className="max-w-xs px-3 py-3" >
                    <p className="truncate" data-tooltip-id={project.id}>{project.description}</p>
                    <ReactTooltip
                      id={project.id}
                      place="top"
                      content={project.description}
                      style={{ backgroundColor: "rgb(37, 99, 235)", color: "#fff", maxWidth: "20%" }}
                      overridePosition={({ left, top }, event, triggerElement, tooltipElement) => {
                        return {
                          top,
                          left: Math.min(left, window.innerWidth - tooltipElement.offsetWidth),
                        };
                      }}
                    />
                  </td>
                  <td className="whitespace-normal px-3 py-3">
                    <WorkflowStatus status={project.status} />
                  </td>
                  {/* <td className="whitespace-normal py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateWorkflow id={project.id} page={page} />
                      <DeleteWorkflow id={project.id} mutate={mutate} />
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
                                  <UpdateWorkflow
                                    id={project.id}
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
                                  <DeleteWorkflow
                                    id={project.id}
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
