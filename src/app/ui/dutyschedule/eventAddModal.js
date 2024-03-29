import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AiOutlinePlus,
  AiOutlineDelete,
  AiFillEdit,
  AiOutlineClose,
} from "react-icons/ai";

import { DutySchema } from "@/schema";
import { useUserList } from "@/app/hooks/useUserList";
import { ColorOptions } from "@/app/lib/utils";

export default function EventAddModal({
  isOpen,
  onClose,
  onAddEvent,
  selectedDate,
}) {

  const { users, isLoading: usersLoading } = useUserList()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(DutySchema),
    defaultValues: {
      eventName: "",
      eventUser: "",
      eventColor: "",
    },
  });

  const onInvalid = (errors) => console.error(errors)

  const onError = (errors, e) => {
    // Handle errors, e.g., log them or display messages
    console.log("------>    errors", errors);
    console.log("------>    e", e);

  };


  const handleEventAdd = async (formData) => {
    // Here formData will have the structure { eventName, eventUser, eventColor }
    if (formData.eventName) {
      onAddEvent(
        selectedDate,
        formData.eventName,
        formData.eventUser,
        formData.eventColor
      );
      reset();
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
              onSubmit={handleSubmit(handleEventAdd, onError, onInvalid)}
              className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <div className="flex justify-between items-center mb-2">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-500"
                >
                  添加值班人员
                </Dialog.Title>
                <div className="flex items-center space-x-2">
                  <AiOutlineClose
                    className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={onClose}
                  />
                </div>
              </div>

              {/* User Select */}
              <div className="border-t-4 border-orange-400 pt-2 mt-2">
                <label className="block text-sm font-medium text-gray-700 leading-loose">
                  Select User
                </label>
                <select
                  className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-200  w-full sm:text-sm border-gray-300 "
                  {...register("eventUser")}
                >
                  <option value="" disabled>
                    Select a user
                  </option>

                  {users.map((user) => (
                    <option key={user.username} value={user.id.toString()}>
                      {user.username}
                    </option>
                  ))}
                </select>
                {errors.eventUser && (
                  <p className="text-red-500">{errors.eventUser.message}</p>
                )}
              </div>

              {/* Event Name Input */}
              <div className="mt-4 ">
                <label className="block text-sm font-medium text-gray-700 leading-loose">
                  Event Name
                </label>

                {/* rounded-md block w-full mt-1 border rounded-md shadow-sm focus:ring focus:ring-blue-200 */}
                <input
                  type="text"
                  className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-200  w-full sm:text-sm border-gray-300 "
                  placeholder="Enter Event Title"
                  {...register("eventName")}
                />
                {errors.eventName && (
                  <p className="text-red-500">{errors.eventName.message}</p>
                )}
              </div>

              {/* Event Color Select */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 leading-loose">
                  Event Color
                </label>
                <select
                  className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-200  w-full sm:text-sm border-gray-300 "
                  {...register("eventColor")}
                >
                  <option value="" disabled>
                    Select a color
                  </option>

                  {ColorOptions.map((color) => (
                    <option key={color.label} value={color.value}>
                      {color.label}
                    </option>
                  ))}

                </select>
                {errors.eventColor && (
                  <p className="text-red-500">{errors.eventColor.message}</p>
                )}
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md"
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
