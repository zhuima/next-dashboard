/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-15 18:47:10
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-18 15:16:11
 * @FilePath: /my-next-dashboard/src/app/ui/approval/edit-form.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import {
  FcClock,
  FcViewDetails,
  FcCommandLine,
  FcCheckmark,
  FcDisapprove,
  FcDocument,
} from "react-icons/fc";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useProjects } from "@/app/hooks/useProjects";
import { useApprovals } from "@/app/hooks/useApprovals";
import { usePathname, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { ProjectZodSchema } from "@/schema";
// import component 👇
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";

export default function EditProjectForm({ project }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ProjectZodSchema),
    defaultValues: {
      project_name: project?.project_name,
      git_repo: project?.git_repo,
      is_proxy: project?.is_proxy.toString(),
      language: project?.language,
      port: project?.port,
      description: project?.description,
      owner: project?.owner,
      status: project?.status,
    },
  });
  const router = useRouter();
  const { updateProject } = useProjects(); // 使用 useProjects 钩子获取 createProject 函数
  const { updateApproval } = useApprovals(); // 使用 useApprovals 钩子获取 createProject 函数

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  console.log("page is ---?>", page);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  // const onSubmit = async (data) => {
  //   console.log("------>", data);
  //   // const transformedData = {
  //   //   ...data,
  //   //   is_proxy: Number(data.is_proxy),
  //   // };

  //   try {
  //     await updateProject(project.id, data);
  //     toast.success("Project update successfully!", { autoClose: 2000 });
  //     setTimeout(() => {
  //       router.push(`/dashboard/workflow?page=${page}`); // 使用 Router.push 进行跳转
  //     }, 1000); // 在显示成功消息 2 秒后跳转
  //   } catch (error) {
  //     toast.error("Failed to update project", { autoClose: 2000 });
  //     console.error("Failed to update project", error);
  //   }
  // };

  return (
    <>
      <button onClick={toggleDrawer}>Show</button>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="bla bla bla"
      >
        <div>Hello World</div>
      </Drawer>
    </>
  );
}
