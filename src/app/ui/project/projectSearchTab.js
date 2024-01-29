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
import { clsx } from "clsx";
import React, { useState } from "react";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useProjectWithName } from "@/app/hooks/useProjectWithName";
import { useProject } from "@/app/hooks/useProject"
import { useAudit } from "@/app/hooks/useAudit";
import "react-tabs/style/react-tabs.css";


import {
  approvalStatusOptions,
  applyOperateOptions,
  userOption,
  BusinessOptions,
  RenderStatusComponent,
  RenderLink,
  TypeOptions,
} from "@/app/lib/utils";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'
import { UpdateWorkflow, DeleteWorkflow } from "@/app/ui/workflow/buttons";
import { UpdateProject } from "./buttons";

import { ProjectTabPanel } from "./projectTabPanel";
import { AuditLogTabPanel } from "./auditLogTabPanel";
import { NothingSelect } from "./nothingSelect"
import { OrgChartTreeTabPanel } from "./d3treeTabPanel"

const ProjectSearchTab = ({ projectid }) => {
  const [tabIndex, setTabIndex] = useState(0);

  // const queryParams = new URLSearchParams({
  //   query: selectedItems ?? "", // 假设API支持`q`作为搜索参数
  // }).toString();

  // console.log("Query Params:", queryParams);

  const { project, total, isLoading } = useProject(projectid);
  const { project: backendProject, isLoading: bisLoading } = useProject(project?.backend_id ?? null);
  console.log(backendProject, "<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

  const { audits, isLoading: auditLoading } = useAudit(project?.id ?? null);


  return (
    <>
      {!isLoading ? (
        <>
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
            defaultIndex={1}
          >
            <TabList className="flex items-center">
              {/* <Tab>项目信息</Tab>
              <Tab>变更记录</Tab> */}
              {/* 添加 Edit 按钮 */}
              {/* 左侧 Tabs */}
              <Tab className={clsx("px-4 py-2 border-b-2 border-transparent border-blue-500 hover:border-blue-500 focus:outline-none", tabIndex === 0 ? "text-green-500" : "")}>
                项目信息
              </Tab>
              <Tab className={clsx("px-4 py-2 border-b-2 border-transparent border-blue-500 hover:border-blue-500 focus:outline-none ", tabIndex === 1 ? "text-green-500" : "")}>
                变更记录
              </Tab>
              {project.type == 1 && (
                <Tab className={clsx("px-4 py-2 border-b-2 border-transparent border-blue-500 hover:border-blue-500 focus:outline-none ", tabIndex === 2 ? "text-green-500" : "")}>
                  关系图
                </Tab>
              )}


              {/* 右侧 Edit 按钮 */}
              <div className="flex-grow"></div>

              <UpdateProject
                id={project?.id}
                className="p-2 text-blue-500 hover:text-blue-700 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 rounded-md"
              />

            </TabList>
            <div className="project-scrollbar  overflow-y-auto h-full max-h-[calc(100vh-12rem)]">
              <TabPanel>
                <ProjectTabPanel project={project} />
              </TabPanel>
              <TabPanel className="mb-6">
                {!auditLoading && audits?.length >= 1 ? (
                  <AuditLogTabPanel audits={audits} project={project} />
                ) : (
                  <NothingSelect />
                )}
              </TabPanel>
              {(project.type == 1 && !bisLoading) && (
                <TabPanel>
                  <OrgChartTreeTabPanel project={project} backendProject={backendProject} />
                </TabPanel>
              )}
            </div>
          </Tabs>
        </>
      ) : (
        <div className="peer flex-1  p-2"><Skeleton count={10} /></div>
      )
      }
    </>
  );
};

export default ProjectSearchTab;
