/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-12-21 14:53:08
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-22 14:10:42
 * @FilePath: /my-next-dashboard/src/app/ui/project/projectTab.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useProjects } from "@/app/hooks/useProjects";
import "react-tabs/style/react-tabs.css";
import {
  approvalStatusOptions,
  applyOperateOptions,
  userOption,
  BusinessOptions,
  RenderStatusComponent,
} from "@/app/lib/utils";

const ProjectTab = ({ selectedItems }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const queryParams = new URLSearchParams({
    query: selectedItems ?? "", // 假设API支持`q`作为搜索参数
  }).toString();

  const url = queryParams ? `/api/project?${queryParams}` : "/api/project";
  // console.log("Query Params:", queryParams);

  const { projects, total, isLoading, mutate } = useProjects(url);

  return (
    <>
      {!isLoading ? (
        <>
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
          >
            <TabList>
              <Tab>测试环境</Tab>
              <Tab>预发环境</Tab>
              <Tab>生产环境</Tab>
              <Tab>变更记录</Tab>
            </TabList>
            <TabPanel>
              <div className="flex justify-end mt-3 ">
                <button
                  className="middle none center mr-4 rounded-lg bg-blue-500 px-6 py-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  data-ripple-light="true"
                >
                  编辑
                </button>
              </div>
              <div className=" border shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-3">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                        项目名称
                      </th>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {projects[0]?.project_name}
                      </td>
                      <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                        项目负责人
                      </th>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {projects[0]?.owner_id}
                      </td>
                    </tr>
                    <tr>
                      <th className="px-6 py-4 whitespace-nowrap text-start  text-sm font-medium text-gray-500 bg-gray-100">
                        项目代码仓库地址
                      </th>
                      <td
                        colSpan="3"
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        <p>{projects[0]?.git_repo}</p>
                      </td>
                    </tr>
                    <tr>
                      <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                        所属业务线
                      </th>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <RenderStatusComponent
                          options={BusinessOptions}
                          currentValue={projects[0]?.business}
                        />
                      </td>
                      <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                        项目语言类型
                      </th>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {projects[0]?.language}
                      </td>
                    </tr>
                    <tr>
                      <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                        状态
                      </th>
                      <td
                        colSpan="3"
                        className="px-6 py-4 whitespace-nowrap text-sm text-green-500"
                      >
                        {projects[0]?.status}
                      </td>
                    </tr>
                    <tr>
                      <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                        项目对应端口
                      </th>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {projects[0]?.port}
                      </td>
                      <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                        项目域名
                      </th>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link href={`${projects[0]?.domain}`} target="_blank">
                          {projects[0]?.domain}{" "}
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <th className="px-6 py-4 whitespace-nowrap text-start  text-sm font-medium text-gray-500 bg-gray-100">
                        项目描述
                      </th>
                      <td
                        colSpan="3"
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        <p>{projects[0]?.description}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabPanel>
            <TabPanel>Title 2 {selectedItems}</TabPanel>
            <TabPanel>Title 3 {selectedItems}</TabPanel>
            <TabPanel>Title 4 {selectedItems}</TabPanel>
          </Tabs>
        </>
      ) : (
        <div className="peer flex-1  p-2">Loading...</div>
      )}
    </>
  );
};

export default ProjectTab;
