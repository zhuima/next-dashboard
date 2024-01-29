/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-12-18 15:35:29
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-20 11:03:05
 * @FilePath: /my-next-dashboard/src/app/ui/approval/approval-drawer.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { clsx } from "clsx";
import React, { useState } from "react";
// import component 👇
import Drawer from "react-modern-drawer";
import { useApproval } from "@/app/hooks/useApproval";
//import styles 👇
import "react-modern-drawer/dist/index.css";
import { useSession } from "next-auth/react";
import ApplyForm from "./approval-apply";
import { useProgressByID, useProgress } from "@/app/hooks/useProgress";
//React Suite imports
// import { Timeline, TimelineItem } from "rsuite";
// import "rsuite/dist/rsuite.min.css";



import {
  approvalStatusOptions,
  applyOperateOptions,
  userOption,
} from "@/app/lib/utils";

const ApprovalDrawer = ({ isOpen, closeDrawer, approvalId }) => {
  console.log("daaaaaa", approvalId);
  return (
    <Drawer
      open={isOpen}
      onClose={closeDrawer}
      direction="left"
      className=" text-black  border-none py-2.5 px-6 cursor-pointer w-300"
      style={{ width: "650px", height: "100%", overflow: "scroll" }}
    >
      <DrawerBody approvalId={approvalId} closeDrawer={closeDrawer} />
    </Drawer>
  );
};

const DrawerBody = ({ approvalId, closeDrawer }) => {
  const { data: session } = useSession();
  const { approval, isLoading, error } = useApproval(approvalId);
  const {
    progress,
    isLoading: pLoading,
    error: perror,
  } = useProgressByID(approvalId);


  // 判断用户角色
  const isApproverAndRoleAdmin = session.user.username === approval?.approver || session.user.role === 1;

  console.log("session.user.username ----->", session.user.username, isApproverAndRoleAdmin)

  console.log("result ----->", isApproverAndRoleAdmin && approval?.status === 1)

  console.log("id ----->", Array.isArray(progress));

  // 类型数组，用于根据状态值映射到对应的标签类型
  const typeArray = ["", "gray", "green", "red"];

  // // 根据当前状态值找到对应的标签选项
  const statusOption = approvalStatusOptions.find(
    (option) => option.value === approval?.status
  );
  const tag = {
    type: typeArray[approval?.status], // 获取类型
    label: statusOption ? statusOption.label : "", // 获取标签，如果未找到则为空字符串
  };



  console.log("status, label, tag", approval?.status, tag.label, tag.type)
  return (
    <div className={`p-0 ${isLoading ? "loading" : ""}`}>
      <div className="flex items-center">
        <span
          className={clsx(
            "ring-1 ring-inset ring-red-600/10 text-white rounded px-2 py-1 mr-2",
            {
              "bg-gray-500": approval?.status === 1,
              "bg-green-500": approval?.status === 2,
              "bg-red-500": approval?.status === 3,
            }
          )}
        >
          {tag.label}
        </span>
        <h5>{approval?.title}</h5>
      </div>

      {/* <div className="py-5"> */}
      {/* <div className="flex items-start mr-8"> */}
      {/* <div className="flex-shrink-0 mr-4">
              <div className="rounded-full h-8 w-8 flex items-center justify-center text-white"></div>
            </div> */}

      {/* 渲染时间线 */}
      <div className="max-w-md mx-auto bg-white p-4">
        <AlignTimeline
          session={session}
          approval={approval}
          progress={progress}
          pLoading={pLoading}
        />
      </div>

      {/* </div> */}

      {/* 用户相同 或者用户角色是1的才能进行审批 */}
      {isApproverAndRoleAdmin && approval?.status === 1 && (
        <ApplyForm
          operateOptions={applyOperateOptions}
          userOption={userOption}
          approvalId={approvalId}
          closeDrawer={closeDrawer}
        />
      )}
    </div>

  );
};

const AlignTimeline = ({ session, approval, progress, pLoading }) => (
  // <Timeline align="left">
  //   <Timeline.Item>
  //     <p className="text-gray-600 leading-none text-xs mb-5">
  //       申请人: {approval?.user?.username} {approval?.created_at}
  //       {/* {format(approval?.created_at, "yyyy-MM-dd HH:mm:ss")} */}
  //     </p>
  //   </Timeline.Item>
  <div className="py-5 flex items-start justify-start bg-white" >
    <div className="space-y-6 border-l-2 border-dashed">
      <div className="relative w-full" >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-green-500">
          <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
        </svg>
        <p className="ml-6 text-gray-600 leading-none text-xs mb-5">
          申请人: {approval?.user?.username} {approval?.created_at}
          {/* {format(approval?.created_at, "yyyy-MM-dd HH:mm:ss")} */}
        </p>
      </div>

      {progress && Array.isArray(progress) && !pLoading
        ? progress?.map((item, index) => (
          // <Timeline.Item key={index}>
          //   <p className="text-gray-600 leading-none text-xs">
          //     {approval?.approver} {item.updated_at}
          //   </p>
          //   <div className="w-full mt-2 p-4 bg-white shadow rounded border border-gray-200">
          //     <div dangerouslySetInnerHTML={{ __html: item.opinion }} />
          //   </div>
          // </Timeline.Item>


          <div className="relative w-full" key={index}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-green-500">
              <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
            </svg>
            <span className="ml-6 text-gray-600 leading-none text-xs mb-2"> {approval?.approver} {item.updated_at}</span>
            <div className="ml-6 w-full rounded border border-slate-200 bg-white p-4 shadow">
              {/* <div className="mb-1 flex items-center justify-between space-x-2">
                  <div className="font-bold text-slate-900">Order Placed</div>
                </div> */}
              <div className="mt-2 max-w-screen-sm text-sm text-gray-500"> <div dangerouslySetInnerHTML={{ __html: item.opinion }} />.</div>
            </div>
          </div>


        ))
        : ""}

      {approval?.status == 1 ? (
        // <Timeline.Item>
        //   <div className="w-full p-4 bg-white shadow rounded border border-gray-200">
        //     {approval?.approver} 审批中
        //   </div>
        // </Timeline.Item>

        <div className="relative w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-gray-500">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
          </svg>
          <div className="ml-6 w-full rounded border border-slate-200 bg-white p-4 shadow">
            {/* <div className="mb-1 flex items-center justify-between space-x-2">
                  <div className="font-bold text-slate-900">Order Placed</div>
                </div> */}
            {approval?.approver} 审批中
          </div>
        </div>

      ) : (
        ""
      )}
      {/* </Timeline> */}

    </div>
  </div >
);

export default ApprovalDrawer;
