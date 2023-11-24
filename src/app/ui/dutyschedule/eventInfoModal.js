/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-20 17:59:31
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-24 11:22:11
 * @FilePath: /my-next-dashboard/src/app/ui/dutyschedule/eventInfoModal.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  AiOutlinePlus,
  AiOutlineDelete,
  AiFillEdit,
  AiOutlineClose,
} from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";

const EventInfoModal = ({ event, isOpen, onClose, onEdit }) => {
  if (!isOpen || !event) {
    return null;
  }

  const eventStartDate = new Date(event.start);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date for comparison

  const isPastEvent = eventStartDate < today;

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
              <div className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* Title and Action Icons */}
                <div className="flex justify-between items-center mb-2">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-500"
                  >
                    {event.user}
                  </Dialog.Title>
                  <div className="flex items-center space-x-2">
                    {/* Replace these with actual event handlers and icons */}
                    <AiOutlinePlus
                      className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700"
                      onClick={() => {}}
                    />
                    {!isPastEvent && (
                      <HiOutlinePencil
                        className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700"
                        onClick={onEdit}
                      />
                    )}
                    <AiOutlineClose
                      className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700"
                      onClick={onClose}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="border-t-4 border-orange-400 pt-2 mt-2 text-gray-900 text-sm font-normal">
                  <div className="grid grid-cols-5 gap-3">
                    <span className="text-gray-500">Start:</span>
                    <span className="col-span-4">
                      {event.start.toLocaleString()}
                    </span>
                    <span className="text-gray-500">End:</span>
                    <span className="col-span-4">
                      {event.end.toLocaleString()}
                    </span>
                    <span className="text-gray-500">Note:</span>
                    <span className="col-span-4">{event.title}</span>
                    <span className="text-gray-500">Role:</span>
                    <span className="col-span-4">{event.role}</span>
                    <span className="text-gray-500">User:</span>
                    <span className="col-span-4">{event.user}</span>
                    <span className="text-gray-500">E-Mail:</span>
                    <span className="col-span-4">{event.email}</span>
                    <span className="text-gray-500">Call:</span>
                    <span className="col-span-4">{event.call}</span>
                    {/* Repeat for each piece of content */}
                  </div>
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
