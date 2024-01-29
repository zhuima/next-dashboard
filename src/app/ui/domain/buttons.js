/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 17:20:03
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-01 13:53:16
 * @FilePath: /my-next-dashboard/src/app/ui/tasks/buttons.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { AiOutlinePlus, AiOutlineDelete, AiFillEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Link from "next/link";
import { useTasks } from "@/app/hooks/useTasks"; // 更新为正确的路径

export function CreateTask() {
  return (
    <Link
      href="/dashboard/tasks/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      prefetch
    >
      <span className="hidden md:block">Create Task</span>{" "}
      <AiOutlinePlus className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateTask({ id, page, className }) {
  return (
    <Link
      href={{
        pathname: `/dashboard/tasks/${id}/edit`,
        query: { page: page },
      }}
      className={className}
      prefetch
    >
      <AiFillEdit className="h-4 w-4" aria-hidden="true" />
      <span className="text-sm font-medium">Edit</span>
    </Link>
  );
}

export function DeleteTask({ id, mutate, className }) {
  const { deleteTask } = useTasks();
  // const handleDelete = async (e) => {
  //   e.preventDefault(); // 阻止表单默认提交行为

  //   // Swal.fire({
  //   //   title: "危险操作，确认要删除么?",
  //   //   text: "请注意，数据删除将永久消失",
  //   //   icon: "warning",
  //   //   showCancelButton: true,
  //   //   confirmButtonColor: "#3085d6",
  //   //   cancelButtonColor: "#d33",
  //   //   confirmButtonText: "确认",
  //   //   cancelButtonText: "取消",
  //   // }).then((result) => {
  //   //   if (result.isConfirmed) {
  //   //     // Swal.fire({
  //   //     //   title: "Deleted!",
  //   //     //   text: "Your file has been deleted.",
  //   //     //   icon: "success",
  //   //     // });
  //   //     try {
  //   //       deleteTask(id);
  //   //       toast.success("Task deleted successfully!");
  //   //       // 可选: 显示删除成功的消息
  //   //     } catch (error) {
  //   //       toast.error("Failed to delete task");
  //   //       // 可选: 处理错误情况
  //   //       console.error("Error deleting task", error);
  //   //     }
  //   //   }
  //   // });

  //   if (confirm("确定要删除么？")) {
  //     try {
  //       await deleteTask(id);
  //       await toast.success("Task deleted successfully!", { autoClose: 2000 });

  //       // 可选: 显示删除成功的消息
  //     } catch (error) {
  //       await toast.error("Failed to delete task", { autoClose: 2000 });

  //       // 可选: 处理错误情况
  //       console.error("Error deleting task", error);
  //     }
  //   } else {
  //     console.log("Deletion cancelled");
  //   }
  // };

  const handleDelete = async (e) => {
    e.preventDefault(); // 阻止表单默认提交行为
    const result = await Swal.fire({
      title: "危险操作，确认要删除么?",
      text: "请注意，数据删除将永久消失",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "确认",
      cancelButtonText: "取消",
    });

    if (result.isConfirmed) {
      // Swal.fire({
      //   title: "Deleted!",
      //   text: "Your file has been deleted.",
      //   icon: "success",
      // });
      try {
        // 本地乐观 UI 更新，删除缓存中的对应 id 的 Task
        mutate((currentData) => {
          console.log("Expected an array, but received:", currentData);
          // currentData 是当前缓存的 todo 列表
          // 这里移除了具有特定 id 的 todo
          console.log(
            "Expected an array, but after received:",
            currentData.tasks.filter((task) => task.id !== id)
          );

          // 移除具有特定 id 的 task
          const updatedTasks = currentData.tasks.filter(
            (task) => task.id !== id
          );

          console.log("After removal:", updatedTasks);

          // 返回更新后的完整数据结构
          return { ...currentData, tasks: updatedTasks };
        }, false); // 设置为 false 表示不立即重新获取数据

        // 调用接口，删除远程的数据
        await deleteTask(id);

        // TODO
        // 删除成功后，检查当前页是否还有数据，避免当前页数据删除完毕展示空页面
        // mutate((currentData) => {
        //   if (currentData.tasks.length === 0 && currentPage > 1) {
        //     // 如果当前页没有数据，并且不是第一页，减少页码
        //     setCurrentPage(currentPage - 1);
        //     // 重新获取新页码的数据
        //     fetchData(currentPage - 1);
        //   }
        //   return currentData;
        // });

        toast.success("Task deleted successfully!", { autoClose: 1000 });
        // 可选: 显示删除成功的消息
      } catch (error) {
        // 回滚
        mutate();
        toast.error("Failed to delete Task", { autoClose: 1000 });
        // 可选: 处理错误情况
        console.error("Error deleting Task", error);
      }
    }
  };

  return (
    <button className={className} type="button" onClick={handleDelete}>
      {/* <span className="sr-only">Delete</span>
        <AiOutlineDelete className="w-5" /> */}
      <AiOutlineDelete className="h-4 w-4" aria-hidden="true" />
      <span className="text-sm font-medium">Delete</span>
    </button>
  );
}
