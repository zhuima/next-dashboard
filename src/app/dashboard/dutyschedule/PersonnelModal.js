/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-14 10:34:46
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-14 11:43:23
 * @FilePath: /my-next-dashboard/src/app/dashboard/dutyschedule/PersonnelModal.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const PersonnelModal = ({ isOpen, closeModal, onSave }) => {
  const [aShift, setAShift] = useState("");
  const [bShift, setBShift] = useState("");

  const saveShifts = () => {
    onSave({ aShift, bShift });
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Assign Duty Personnel
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Select the personnel for the A and B shifts.
                  </p>

                  {/* Form fields for A and B shift personnel */}
                  <input
                    type="text"
                    placeholder="A Shift"
                    value={aShift}
                    onChange={(e) => setAShift(e.target.value)}
                    className="mt-4 w-full rounded-md border-gray-300 shadow-sm"
                  />
                  <input
                    type="text"
                    placeholder="B Shift"
                    value={bShift}
                    onChange={(e) => setBShift(e.target.value)}
                    className="mt-4 w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={saveShifts}
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PersonnelModal;
