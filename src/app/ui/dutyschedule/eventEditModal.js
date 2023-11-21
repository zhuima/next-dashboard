"use client";
import { useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

// 定义表单的验证架构
const formSchema = z.object({
  eventName: z.string().min(1, "事件名称是必填项"),
  eventUser: z.string().min(1, "用户是必填项"),
  eventColor: z.string().min(1, "颜色是必填项"),
});

export default function EventEditModal({
  isOpen,
  onClose,
  onEditEvent,
  eventData,
}) {
  // 初始化 useForm
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted },
    trigger,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  // 当 eventData 改变时，更新表单的默认值
  useEffect(() => {
    if (isOpen && eventData) {
      setValue("eventName", eventData.title);
      setValue("eventUser", eventData.user);
      setValue("eventColor", eventData.backgroundColor);
      // Only trigger validation if the form has been interacted with
      if (isSubmitted) {
        trigger();
      }
    }
  }, [isOpen, eventData, setValue, trigger, isSubmitted]);

  // 提交表单
  const onSubmit = (data) => {
    if (eventData) {
      // // 附加额外的字段
      // data.id = Number(eventData.id); // 将 id 转换为数字
      // data.start = eventData.startStr;
      // data.end = eventData.endStr;
      onEditEvent(
        Number(eventData.id),
        eventData.startStr,
        eventData.endStr,
        data.eventName,
        data.eventUser,
        data.eventColor
      );
      onClose();
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                编辑值班人员
              </Dialog.Title>

              {/* User Select */}
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Select User
                </label>
                <select
                  className="block w-full mt-1 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
                  {...register("eventUser")}
                >
                  <option value="" disabled>
                    Select a user
                  </option>
                  <option key="zhuima" value="zhuima">
                    zhuima
                  </option>
                  <option key="tony" value="tony">
                    tony
                  </option>
                  <option key="nick" value="nick">
                    nick
                  </option>
                </select>
                {errors?.eventUser?.message ? (
                  <div
                    id="status-error"
                    aria-live="polite"
                    className="mt-2 text-sm text-red-500"
                  >
                    {errors.eventUser.message}
                  </div>
                ) : null}
              </div>

              {/* Event Name Input */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Event Name
                </label>
                <input
                  type="text"
                  className="block w-full mt-1 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
                  placeholder="Enter Event Title"
                  {...register("eventName")}
                />
                {errors?.eventName?.message ? (
                  <div
                    id="status-error"
                    aria-live="polite"
                    className="mt-2 text-sm text-red-500"
                  >
                    {errors.eventName.message}
                  </div>
                ) : null}
              </div>

              {/* Event Color Select */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Event Color
                </label>
                <select
                  className="block w-full mt-1 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
                  {...register("eventColor")}
                >
                  <option value="" disabled>
                    Select a color
                  </option>
                  <option key="red" value="red">
                    red
                  </option>
                  <option key="blue" value="blue">
                    blue
                  </option>
                  <option key="green" value="green">
                    green
                  </option>
                </select>
                {errors?.eventColor?.message ? (
                  <div
                    id="status-error"
                    aria-live="polite"
                    className="mt-2 text-sm text-red-500"
                  >
                    {errors.eventColor.message}
                  </div>
                ) : null}
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
                >
                  提交
                </button>
              </div>
            </form>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
