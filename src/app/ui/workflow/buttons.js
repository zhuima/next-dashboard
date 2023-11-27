/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 17:20:03
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-27 16:12:48
 * @FilePath: /my-next-dashboard/src/app/ui/workflow/buttons.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { AiOutlinePlus, AiOutlineDelete, AiFillEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Link from "next/link";
import { useProjects } from "@/app/hooks/useProjects"; // 更新为正确的路径

export function CreateWorkflow() {
  return (
    <Link
      href="/dashboard/workflow/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Workflow</span>{" "}
      <AiOutlinePlus className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateWorkflow({ id, page }) {
  return (
    <Link
      href={{
        pathname: `/dashboard/workflow/${id}/edit`,
        query: { page: page },
      }}
      // as={`/dashboard/workflow/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <AiFillEdit className="w-5" />
    </Link>
  );
}

export function DeleteWorkflow({ id }) {
  const { deleteProject } = useProjects();
  const handleDelete = (e) => {
    e.preventDefault(); // 阻止表单默认提交行为

    Swal.fire({
      title: "危险操作，确认要删除么?",
      text: "请注意，数据删除将永久消失",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "确认",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
        try {
          deleteProject(id);
          toast.success("Workflow deleted successfully!", { autoClose: 2000 });
          // 可选: 显示删除成功的消息
        } catch (error) {
          toast.error("Failed to delete Workflow", { autoClose: 2000 });
          // 可选: 处理错误情况
          console.error("Error deleting Workflow", error);
        }
      }
    });

    // if (confirm("确定要删除么？")) {
    //   try {
    //     await deleteProject(id);
    //     toast.success("Workflow deleted successfully!", { autoClose: 2000 });

    //     // 可选: 显示删除成功的消息
    //   } catch (error) {
    //     toast.error("Failed to delete Workflow", { autoClose: 2000 });

    //     // 可选: 处理错误情况
    //     console.error("Error deleting Workflow", error);
    //   }
    // } else {
    //   console.log("Deletion cancelled");
    // }
  };

  return (
    <form onSubmit={handleDelete}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <AiOutlineDelete className="w-5" />
      </button>
    </form>
  );
}
