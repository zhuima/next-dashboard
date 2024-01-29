/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-12-07 11:46:06
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-20 14:23:06
 * @FilePath: /my-next-dashboard/src/schema/index.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import z from "zod";

export const LoginZodSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .min(3, { message: "Username is too short" })
    .max(20, { message: "Username is too long" }),
  // .regex(/\./, "Username must include '.'")
  // .refine((pw) => /\./.test(pw), { message: "Username must include '.'" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password is too short" }),
});

export const TaskZodSchema = z.object({
  spec: z.string().min(1, "Spec is required"),
  type: z.string().min(1, "Type is required"),
  command: z.string(),
  methodname: z.string(),
  description: z.string(),
  status: z.enum(["active", "disable"], "Status is required"),
});

export const ProjectApprovalZodSchema = z.object({
  project_name: z.string().min(1, "Spec is required"),
  git_repo: z
    .string(),
  // .min(1, "git_repo is required")
  // .regex(/^git@/, "git_repo must Start with 'git@'")
  // .regex(/.git$/, "git_repo must End with '.git'"),
  // .refine((pw) => /git@/.test(pw), {
  //   message: "git_repo must Start with 'git@'",
  // }),
  // https://www.reddit.com/r/reactjs/comments/15hup78/how_to_use_shadcn_reacthookform_zod_for_input/ 解决Expected number, received string 报错
  is_proxy: z.string().transform((v) => Number(v) || 1),
  language: z.string(),
  domain: z.string(),
  port: z.number(),
  description: z.string(),
  owner_id: z.string().transform((v) => Number(v) || 1),
  backend_id: z.string().transform((v) => Number(v) || 1),
  business: z.string().min(1, "business is required"),
  status: z.enum(["active", "disable"], "Status is required"),
  deploy_type: z.string().transform((v) => Number(v) || 1),
  type: z.string().transform((v) => Number(v) || 1),
  approver: z.string().min(1, "Approver is required"),
  assigner: z.string(),
});

export const ProjectZodSchema = z.object({
  project_name: z.string().min(1, "Spec is required"),
  git_repo: z
    .string(),
  // .min(1, "git_repo is required")
  // .regex(/^git@/, "git_repo must Start with 'git@'")
  // .regex(/.git$/, "git_repo must End with '.git'"),
  // .refine((pw) => /git@/.test(pw), {
  //   message: "git_repo must Start with 'git@'",
  // }),
  // https://www.reddit.com/r/reactjs/comments/15hup78/how_to_use_shadcn_reacthookform_zod_for_input/ 解决Expected number, received string 报错
  is_proxy: z.string().transform((v) => Number(v) || 0),
  language: z.string(),
  port: z.number(),
  domain: z.string(),
  description: z.string(),
  owner_id: z.string().transform((v) => Number(v) || 0),
  backend_id: z.string().transform((v) => Number(v) || 1),
  type: z.string().transform((v) => Number(v) || 1),
  // host_ids: z.array(z.coerce.number()),
  business: z.string().min(1, "business is required"),
  status: z.enum(["active", "disable"], "Status is required"),
  deploy_type: z.string().transform((v) => Number(v) || 1),
});

export const ProgressSchema = z.object({
  operate: z.string(),
  next: z.string().optional(),
  opinion: z.string(),
});


// 定义表单的验证架构
export const DutySchema = z.object({
  eventName: z.string().min(1, "事件名称是必填项"),
  eventUser: z.string().transform((v) => Number(v) || 0),
  // eventUser: z.number().min(1, "用户是必填项"),
  eventColor: z.string().min(1, "颜色是必填项"),
});