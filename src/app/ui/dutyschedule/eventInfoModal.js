/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-20 17:59:31
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-21 11:32:13
 * @FilePath: /my-next-dashboard/src/app/ui/dutyschedule/eventInfoModal.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const EventInfoModal = ({ event, isOpen, onClose, onEdit }) => {
  if (!isOpen || !event) {
    return null;
  }

  console.log("isopen", isOpen, event, onEdit);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {event.title}
                </Dialog.Title>
                <div className="mt-2 border-t ">
                  <p className="text-sm text-gray-500 pt-2">用户信息: 追马</p>
                  <div className="flex text-sm text-gray-500 pt-2 ">
                    联系电话: 135xxxxxxxx 一键onCall{" "}
                    <span className="flex-no-shrink text-xs  font-medium tracking-wider  text-gray-400 hover:text-green-400 transition ease-in duration-300 ml-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 pt-2">
                    开始时间: {event.start.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 pt-2">
                    结束时间: {event.end.toLocaleString()}
                  </p>
                </div>

                <div className="flex mt-4">
                  <button
                    className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    data-ripple-light="true"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <button
                    className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    data-ripple-dark="true"
                    onClick={onEdit}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EventInfoModal;
