/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-23 17:31:43
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-23 17:32:54
 * @FilePath: /my-next-dashboard/src/app/ui/dutyschedule/previewModal.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
// PreviewModal.js
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PDFViewer } from "@react-pdf/renderer";

const PreviewModal = ({ show, onClose, document }) => (
  <Transition appear show={show} as={Fragment}>
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
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
      </Transition.Child>

      {/* Center the modal contents */}
      <div className="fixed inset-0 z-10 overflow-y-auto">
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
            <div className="inline-block w-full max-w-4xl overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="flex justify-between text-lg font-medium leading-6 text-gray-900 p-4 border-b"
              >
                <p>PDF 预览</p>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-800"
                >
                  关闭
                </button>
              </Dialog.Title>
              <div className="p-4">
                <PDFViewer className="w-full" height={800}>
                  <document />
                </PDFViewer>
              </div>
            </div>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);

export default PreviewModal;
