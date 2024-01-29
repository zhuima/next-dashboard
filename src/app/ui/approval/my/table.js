/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-15 18:47:10
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-20 13:57:17
 * @FilePath: /my-next-dashboard/src/app/ui/approval/table.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import Link from "next/link";
import {
  AiOutlineMore,
  AiOutlinePlus,
  AiOutlineDelete,
  AiFillEdit,
} from "react-icons/ai";
import { useState } from "react";
import { Menu } from "@headlessui/react";
import { UpdateApproval, DeleteApproval } from "@/app/ui/approval/buttons";
import WorkflowStatus from "@/app/ui/workflow/status";
import ApprovalDrawer from "../approval-drawer";
import {
  approvalStatusOptions,
  applyOperateOptions,
  userOption,
  BusinessOptions,
  RenderStatusComponent,
} from "@/app/lib/utils";
import ApprovalStatus from "../status";

export default function WorkflowTable({ approvals, page, mutate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleApprovalClick = (id) => () => {
    setSelectedId(id); // 设置选中的审批 ID
    setIsOpen((prevState) => !prevState);
  };

  const closeDrawer = () => {
    setIsOpen(false); // 关闭抽屉
    setSelectedId(null); // 清除选中的审批 ID
  };

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {approvals?.map((approval) => (
              <div
                key={approval.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{approval.project_name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{approval.git_repo}</p>
                  </div>
                  <WorkflowStatus status={approval.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{approval.language}</p>
                    <p>{approval.description}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateApproval id={approval.id} page={page} />
                    <DeleteApproval id={approval.id} />
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
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  审批人
                </th>

                {/* <th scope="col" className="px-3 py-5 font-medium">
                  Language
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
                </th> */}
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {approvals?.map((approval) => (
                <tr
                  key={approval.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg hover:bg-gray-100"
                >
                  <td className="whitespace-normal py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{approval.id}</p>
                    </div>
                  </td>
                  <td className="whitespace-normal py-3 pl-6 pr-3">
                    <p>{approval.title}</p>
                  </td>
                  <td className="whitespace-normal px-3 py-3">
                    {approval.approver}
                  </td>
                  {/* <td className="whitespace-normal px-3 py-3">
                    {approval.language}
                  </td>
                  <td className="whitespace-normal px-3 py-3">
                    {approval.description}
                  </td> */}

                  <td className="whitespace-normal px-3 py-3">
                    <RenderStatusComponent
                      options={approvalStatusOptions}
                      currentValue={approval.status}
                      Component={ApprovalStatus}
                    />
                  </td>
                  <td className="whitespace-normal py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {/* <button onClick={handleApprovalClick(approval.id)}>
                        审批
                      </button> */}
                      <Link href={`/dashboard/approval/${approval.id}/detail`} prefetch>
                        审批详情
                      </Link>
                      {/* <UpdateApproval id={approval.id} page={page} />
                      <DeleteApproval id={approval.id} mutate={mutate} /> */}
                    </div>
                  </td>
                  {/* <td className="whitespace-normal p-6">
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
                            className={`absolute right-0  mt-2  z-50 origin-top-right bg-white rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-40 ${
                              open ? "top-full" : "bottom-full"
                            }`}
                          >
                            <div className="py-1">
                              <Menu.Item as="div">
                                {({ active }) => (
                                  <UpdateApproval
                                    id={approval.id}
                                    page={page}
                                    className={`${
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700"
                                    } w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-md text-gray-500`}
                                  />
                                )}
                              </Menu.Item>
                              <Menu.Item as="div">
                                {({ active }) => (
                                  <DeleteApproval
                                    id={approval.id}
                                    mutate={mutate}
                                    className={`${
                                      active
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
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* 只有被选中才触发网络请求 */}
      {selectedId && (
        <ApprovalDrawer
          isOpen={isOpen}
          closeDrawer={closeDrawer}
          approvalId={selectedId}
        />
      )}
    </div>
  );
}
