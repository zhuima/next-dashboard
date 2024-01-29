import Image from "next/image";
import { UpdateInvoice, DeleteInvoice } from "@/app/ui/invoices/buttons";
import InvoiceStatus from "@/app/ui/invoices/status";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
export default async function InvoicesTable({ query, currentPage }) {
  const invoices = [
    {
      id: 1,
      image_url: "/next.svg",
      name: "Emil Kowalski",
      email: "emil.kowalski@mail.com",
      amount: "$49.72",
      date: "Jul 08, 2023",
      status: "Overdue",
    },
    {
      id: 2,
      image_url: "/next.svg",
      name: "Noah Davis",
      email: "noah.davis@mail.com",
      amount: "$50.22",
      date: "Aug 03, 2023",
      status: "Pending",
    },
    {
      id: 3,
      image_url: "/next.svg",
      name: "Isabella Rodriguez",
      email: "isabella.rodriguez@mail.com",
      amount: "$72.6",
      date: "May 25, 2023",
      status: "Overdue",
    },
    {
      id: 4,
      image_url: "/next.svg",
      name: "Amelia Rodriguez",
      email: "amelia.rodriguez@mail.com",
      amount: "$9.2",
      date: "Jun 27, 2023",
      status: "Paid",
    },
    {
      id: 5,
      image_url: "/next.svg",
      name: "Mia Johnson",
      email: "mia.johnson@mail.com",
      amount: "$66.38",
      date: "Jun 12, 2023",
      status: "Overdue",
    },
    {
      id: 6,
      image_url: "/next.svg",
      name: "Mia Johnson",
      email: "mia.johnson@mail.com",
      amount: "$74.86",
      date: "Nov 01, 2023",
      status: "Paid",
    },
    {
      id: 7,
      image_url: "/next.svg",
      name: "Elijah Kowalski",
      email: "elijah.kowalski@mail.com",
      amount: "$56.24",
      date: "Jun 13, 2023",
      status: "Pending",
    },
    {
      id: 8,
      image_url: "/next.svg",
      name: "Noah Davis",
      email: "noah.davis@mail.com",
      amount: "$52.67",
      date: "Jul 13, 2023",
      status: "Pending",
    },
    {
      id: 9,
      image_url: "/next.svg",
      name: "Noah Williams",
      email: "noah.williams@mail.com",
      amount: "$31.97",
      date: "May 01, 2023",
      status: "Paid",
    },
    {
      id: 10,
      image_url: "/next.svg",
      name: "Emil Garcia",
      email: "emil.garcia@mail.com",
      amount: "$44.41",
      date: "Aug 04, 2023",
      status: "Overdue",
    },
    {
      id: 11,
      image_url: "/next.svg",
      name: "Isabella Jones",
      email: "isabella.jones@mail.com",
      amount: "$76.03",
      date: "Nov 01, 2023",
      status: "Overdue",
    },
    {
      id: 12,
      image_url: "/next.svg",
      name: "Emil Smith",
      email: "emil.smith@mail.com",
      amount: "$70.21",
      date: "Sep 02, 2023",
      status: "Pending",
    },
    {
      id: 13,
      image_url: "/next.svg",
      name: "Isabella Garcia",
      email: "isabella.garcia@mail.com",
      amount: "$20.48",
      date: "Jan 31, 2023",
      status: "Overdue",
    },
    {
      id: 14,
      image_url: "/next.svg",
      name: "Isabella Johnson",
      email: "isabella.johnson@mail.com",
      amount: "$63.3",
      date: "May 26, 2023",
      status: "Pending",
    },
    {
      id: 15,
      image_url: "/next.svg",
      name: "Elijah Johnson",
      email: "elijah.johnson@mail.com",
      amount: "$94.67",
      date: "Apr 24, 2023",
      status: "Overdue",
    },
    {
      id: 16,
      image_url: "/next.svg",
      name: "Isabella Jones",
      email: "isabella.jones@mail.com",
      amount: "$13.85",
      date: "Apr 03, 2023",
      status: "Paid",
    },
    {
      id: 17,
      image_url: "/next.svg",
      name: "Ava Rodriguez",
      email: "ava.rodriguez@mail.com",
      amount: "$17.86",
      date: "May 01, 2023",
      status: "Pending",
    },
    {
      id: 18,
      image_url: "/next.svg",
      name: "Amelia Davis",
      email: "amelia.davis@mail.com",
      amount: "$59.9",
      date: "Apr 10, 2023",
      status: "Overdue",
    },
    {
      id: 19,
      image_url: "/next.svg",
      name: "Emil Johnson",
      email: "emil.johnson@mail.com",
      amount: "$95.65",
      date: "Jul 07, 2023",
      status: "Paid",
    },
    {
      id: 20,
      image_url: "/next.svg",
      name: "Sophia Davis",
      email: "sophia.davis@mail.com",
      amount: "$81.06",
      date: "Mar 30, 2023",
      status: "Overdue",
    },
  ];
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.email}</p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-normal py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={invoice.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-normal px-3 py-3">
                    {invoice.email}
                  </td>
                  <td className="whitespace-normal px-3 py-3">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-normal px-3 py-3">
                    {formatDateToLocal(invoice.date)}
                  </td>
                  <td className="whitespace-normal px-3 py-3">
                    <InvoiceStatus status={invoice.status} />
                  </td>
                  <td className="whitespace-normal py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
