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
import { Timeline, TimelineItem } from "rsuite";
import "rsuite/dist/rsuite.min.css";
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

  console.log("id ----->", Array.isArray(progress));

  // 类型数组，用于根据状态值映射到对应的标签类型
  const typeArray = ["", "gray", "green", "red"];

  // 根据当前状态值找到对应的标签选项
  const statusOption = approvalStatusOptions.find(
    (option) => option.value === approval?.status
  );
  const tag = {
    type: typeArray[approval?.status], // 获取类型
    label: statusOption ? statusOption.label : "", // 获取标签，如果未找到则为空字符串
  };

  return (
    <div className={`p-0 ${isLoading ? "loading" : ""}`}>
      <div className="flex items-center">
        <span
          className={`bg-${tag.type}-100  ring-1 ring-inset ring-red-600/10 text-black rounded px-2 py-1 mr-2`}
        >
          {tag.label}
        </span>
        <h5>{approval?.title}</h5>
      </div>
      <div className="py-5">
        <div className="flex flex-col mb-10">
          <div className="flex items-start mr-4">
            <div className="flex-shrink-0 mr-4">
              <div className="rounded-full h-8 w-8 flex items-center justify-center text-white"></div>
            </div>

            {/* 渲染时间线 */}
            <AlignTimeline
              session={session}
              approval={approval}
              progress={progress}
              pLoading={pLoading}
            />
          </div>
        </div>

        {approval?.status == 1 ? (
          <ApplyForm
            operateOptions={applyOperateOptions}
            userOption={userOption}
            approvalId={approvalId}
            closeDrawer={closeDrawer}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const AlignTimeline = ({ session, approval, progress, pLoading }) => (
  <Timeline align="left">
    <Timeline.Item>
      <p className="text-gray-600 leading-none text-xs mb-5">
        申请人: {session?.user?.username} {approval?.created_at}
        {/* {format(approval?.created_at, "yyyy-MM-dd HH:mm:ss")} */}
      </p>
    </Timeline.Item>
    {progress && Array.isArray(progress) && !pLoading
      ? progress?.map((item, index) => (
          <Timeline.Item key={index}>
            <p className="text-gray-600 leading-none text-xs">
              {approval?.approver} {item.updated_at}
            </p>
            <div className="w-full mt-2 p-4 bg-white shadow rounded border border-gray-200">
              <div dangerouslySetInnerHTML={{ __html: item.opinion }} />
            </div>
          </Timeline.Item>
        ))
      : ""}

    {approval?.status == 1 ? (
      <Timeline.Item>
        <div className="w-full p-4 bg-white shadow rounded border border-gray-200">
          {approval?.approver} 审批中
        </div>
      </Timeline.Item>
    ) : (
      ""
    )}
  </Timeline>
);

export default ApprovalDrawer;
