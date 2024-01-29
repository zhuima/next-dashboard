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
import Link from "next/link"
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
  { label: "通过", value: 3 },
  { label: "驳回", value: 4 },
];

export const applyOperateOptions = [
  { label: "申请中", bgColor: 'bg-gray-500', linkColor: 'bg-gray-300', value: 1 },
  { label: "移交", bgColor: 'bg-gray-500', linkColor: 'bg-gray-300', value: 2 },
  { label: "通过", bgColor: 'bg-green-500', linkColor: 'bg-green-300', value: 3 },
  { label: "驳回", bgColor: 'bg-red-500', linkColor: 'bg-red-300', value: 4 },
  { label: "回复", bgColor: 'bg-gray-500', linkColor: 'bg-gray-300', value: 5 },
];

export const userOption = [
  { label: "用户1", value: "user1" },
  { label: "用户2", value: "user2" },
  // ...其他用户选项
];


export const BusinessOptions = [
  { label: "大数据", value: "bigdata" },
  { label: "美事美选", value: "meishi" },
  { label: "美事通", value: "meishitong" },
  { label: "运维", value: "ops" },
  { label: "前端", value: "frontend" },
  { label: "crm", value: "crm" },
];

export const DeployTypeOptions = [
  { label: "k8s", value: 1 },
  { label: "虚拟机", value: 2 },
];

// 1表示application 2表示service 3表示
export const TypeOptions = [
  { label: "服务应用-web", value: 1 },
  { label: "服务应用-api", value: 7 },
  { label: "服务应用-小程序", value: 8 },
  { label: "服务应用-h5", value: 9 },
  { label: "基础服务", value: 2 },
  { label: "服务应用-dubbo", value: 3 },
  { label: "服务应用-work", value: 4 },
  { label: "服务应用-chronos", value: 5 },
  { label: "其他服务", value: 6 },

];


export const LanguageOptions = [
  { label: "vue", value: "vue" },
  { label: "java", value: "java" },
  { label: "go", value: "go" },
  { label: "python", value: "python" },
  { label: "rust", value: "rust" },
  { label: "nodejs", value: "nodejs" },
]

export const ColorOptions = [
  { label: "red", value: "red" },
  { label: "blue", value: "blue" },
  { label: "green", value: "green" },
  { label: "gray", value: "gray" },
]

export const RoleOptions = [
  { label: "管理员", value: 1 },
  { label: "用户", value: 2 },
  { label: "其他", value: 3 },
]


export const UserStatusOptions = [
  { label: "活跃", value: "active" },
  { label: "禁用", value: "disable" },
]



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


export const RenderLink = ({ href, title }) => {
  const url = href ? href : "#"
  return (
    <Link href={url} className="inline-flex items-center focus:outline-none" target="_blank">
      <span className="mr-2">{title}</span>
      <span className="inline-flex justify-center items-center text-white w-5 h-5 bg-gray-600 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M17 7l-10 10"></path>
          <path d="M8 7l9 0l0 9"></path>
        </svg>
      </span>
    </Link>
  )
}

export const convertToD3Format = ({ project, backendProject }) => {
  return {
    name: "项目信息",
    children: [
      {
        name: '前端',
        children: [
          {
            name: project?.project_name,
            onClick: () => console.log('Child Node 1 clicked')
          },
          {
            name: project?.domain,
          },
          {
            name: project?.Owner?.username,
          },
          {
            name: project?.description,
          },
          {
            name: project?.git_repo,
          },
        ],
      },
      {
        name: '后端',
        children: [
          {
            name: backendProject?.project_name,
            onClick: () => console.log('Child Node 1 clicked')
          },
          {
            name: backendProject?.domain,
          },
          {
            name: backendProject?.Owner?.username,
          },
          {
            name: backendProject?.description,
          },
          {
            name: backendProject?.git_repo,
          },
        ],
      },
    ],
  };
}

