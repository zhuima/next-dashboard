import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function EventModal({
  isOpen,
  onClose,
  onAddEvent,
  selectedDate,
}) {
  let eventNameInput;
  let eventUserInput;
  let eventColorInput;
  const handleEventAdd = () => {
    const eventName = eventNameInput.value;
    const eventUser = eventUserInput.value;
    const eventColor = eventColorInput.value;
    if (eventName) {
      onAddEvent(selectedDate, eventName, eventUser, eventColor);
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
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                添加值班人员
              </Dialog.Title>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Select User
                </label>
                <select
                  className="block w-full mt-1 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
                  defaultValue=""
                  ref={(select) => (eventUserInput = select)}
                >
                  <option value="zhuima">zhuima</option>
                  <option value="tony">tony</option>
                  <option value="nick">nick</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Event Name
                </label>
                <input
                  type="text"
                  className="block w-full mt-1 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
                  ref={(input) => (eventNameInput = input)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Event Color
                </label>
                <select
                  className="block w-full mt-1 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
                  defaultValue=""
                  ref={(select) => (eventColorInput = select)}
                >
                  <option value="red">red</option>
                  <option value="blue">blue</option>
                  <option value="green">green</option>
                </select>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleEventAdd}
                  className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
                >
                  提交
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
