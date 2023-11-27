/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-15 18:47:10
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-27 14:13:37
 * @FilePath: /my-next-dashboard/src/app/ui/workflow/table.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import Link from "next/link";
import { UpdateWorkflow, DeleteWorkflow } from "@/app/ui/workflow/buttons";
import WorkflowStatus from "@/app/ui/workflow/status";

export default function WorkflowTable({ projects, page }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {projects?.map((project) => (
              <div
                key={project.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{project.project_name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{project.git_repo}</p>
                  </div>
                  <WorkflowStatus status={project.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{project.language}</p>
                    <p>{project.description}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateWorkflow id={project.id} page={page} />
                    <DeleteWorkflow id={project.id} />
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
                  Repo
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Language
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
              {projects?.map((project) => (
                <tr
                  key={project.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{project.id}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>{project.project_name}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {project.git_repo}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {project.language}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {project.description}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <WorkflowStatus status={project.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateWorkflow id={project.id} page={page} />
                      <DeleteWorkflow id={project.id} />
                    </div>
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
