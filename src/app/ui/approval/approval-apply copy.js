/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-12-18 18:25:47
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-20 10:30:40
 * @FilePath: /my-next-dashboard/src/app/ui/approval/approval-apply.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProgress } from "@/app/hooks/useProgress";
import { toast } from "react-toastify";
import { ProgressSchema } from "@/schema";

const ApplyForm = ({ operateOptions, userOption, approvalId }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ProgressSchema),
  });

  const { createProgress } = useProgress();

  // 过滤掉值为1的选项
  const operateOptionsFilter = operateOptions.filter(
    (option) => option.value !== 1
  );

  //   提交数据
  const onSubmit = async (data) => {
    console.log("log data", data);
    const formattedData = {
      ...data,
      operate: parseInt(data.operate, 10), // 或使用 +data.operate
      approval_id: approvalId,
    };
    console.log("提交数据", formattedData);

    try {
      // 从第一步的响应中获取必要的数据
      await createProgress(formattedData);
      toast.success("Progress created successfully!");
      //   setTimeout(() => {
      //     router.push("/dashboard/approval/base"); // 使用 Router.push 进行跳转
      //   }, 2000); // 在显示成功消息 2 秒后跳转
    } catch (error) {
      console.error("Failed to create Progress", error);

      toast.error("Failed to create Progress");
      console.error("Failed to create Progress", error);
    }
  };

  //   use form hook 的特性
  const selectedOperate = watch("operate");

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded ">
      12312
      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="operate"
          className="block text-sm font-medium text-gray-700 mb-3"
        >
          审批操作
        </label>

        <div className="mb-4">
          {operateOptionsFilter.map((item) => (
            <label key={item.value} className="inline-flex items-center mr-2">
              <input
                {...register("operate")}
                type="radio"
                value={item.value}
                className="form-radio text-blue-600"
              />
              <span className="ml-1 text-sm text-gray-700">{item.label}</span>
            </label>
          ))}
        </div>

        {selectedOperate === "2" && (
          <div className="mb-4">
            <label
              htmlFor="next"
              className="block text-sm font-medium text-gray-700 mb-3"
            >
              移交到
            </label>
            <select
              {...register("next")}
              className="form-select block w-full border-gray-300 rounded"
            >
              {userOption.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="opinion"
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            审批意见
          </label>
          <textarea
            {...register("opinion")}
            className="form-textarea mt-1 block w-full border-gray-300 rounded"
            rows="3"
            placeholder="请输入审批意见..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          提交
        </button>
      </form>
    </div>
  );
};

export default ApplyForm;
