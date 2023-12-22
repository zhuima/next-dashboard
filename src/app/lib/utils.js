/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 17:36:51
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-20 14:10:30
 * @FilePath: /my-next-dashboard/src/app/lib/utils.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
export const formatCurrency = (amount) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatDateToLocal = (dateStr, locale = "en-US") => {
  const date = new Date(dateStr);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generatePagination = (currentPage, totalPages) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const approvalStatusOptions = [
  { label: "审批中", value: 1 },
  { label: "通过", value: 2 },
  { label: "驳回", value: 3 },
];

export const applyOperateOptions = [
  { label: "申请", value: 1 },
  { label: "移交", value: 2 },
  { label: "通过", value: 3 },
  { label: "驳回", value: 4 },
  { label: "回复", value: 5 },
];

export const userOption = [
  { label: "用户1", value: "user1" },
  { label: "用户2", value: "user2" },
  // ...其他用户选项
];

export const BusinessOptions = [
  { label: "大数据", value: "bigData" },
  { label: "美事美选", value: "meishi" },
  { label: "美事通", value: "meishitong" },
  { label: "运维", value: "ops" },
  { label: "前端", value: "frontend" },
];

export const RenderStatusComponent = ({ options, currentValue, Component }) => {
  const option = options.find((o) => o.value === currentValue);
  if (option) {
    if (Component) {
      return <Component status={option.value} label={option.label} />;
    }
    // 返回一个简单的 JSX 元素
    return (
      <span status={option.value} label={option.label}>
        {option.label}
      </span>
    );
  }
  return "待分配";
};
