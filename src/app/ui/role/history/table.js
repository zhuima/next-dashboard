/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-15 18:47:10
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-17 14:27:21
 * @FilePath: /my-next-dashboard/src/app/ui/tasks/history/table.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import TaskStatus from "@/app/ui/tasks/status";

export default function TaskHistoryTable({ taskHistory }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {taskHistory?.map((task) => (
              <div
                key={task.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{task.task_id}</p>
                    </div>
                    <p className="text-sm text-gray-500">{task.start_time}</p>
                  </div>
                  <TaskStatus status={task.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{task.end_time}</p>
                    <p>{task.result}</p>
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
                  Start Time
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  End Time
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Result
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {taskHistory?.map((task) => (
                <tr
                  key={task.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-normal py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{task.id}</p>
                    </div>
                  </td>
                  <td className="whitespace-normal py-3 pl-6 pr-3">
                    <p>{task.start_time}</p>
                  </td>
                  <td className="whitespace-normal px-3 py-3">
                    {task.end_time}
                  </td>
                  <td className="whitespace-normal px-3 py-3">
                    <TaskStatus status={task.status} />
                  </td>

                  <td className="whitespace-normal py-3 pl-6 pr-3">
                    <p>{task.result}</p>
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
