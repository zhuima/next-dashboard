/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-16 11:33:35
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-05 10:13:12
 * @FilePath: /my-next-dashboard/src/app/lib/actions.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/app/auth";
// import { useTasks } from "@/app/hooks/useTasks";

// const TaskSchema = z.object({
//   spec: z.string({
//     invalid_type_error: "Please enter a spec.",
//   }),
//   type: z.string({
//     invalid_type_error: "Please select a type.",
//   }),
//   command: z.string({
//     invalid_type_error: "Please enter a command.",
//   }),
//   status: z.enum(["active", "disable"], {
//     invalid_type_error: "Please select an task status.",
//   }),
// });

// const CreateTask = TaskSchema.omit();
// // const UpdateInvoice = InvoiceSchema.omit({ date: true });

// export async function createTask(prevState, formData) {
//   // Validate form using Zod
//   const validatedFields = CreateTask.safeParse({
//     spec: formData.get("spec"),
//     type: formData.get("type"),
//     command: formData.get("command"),
//     status: formData.get("status"),
//   });

//   // If form validation fails, return errors early. Otherwise, continue.
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Missing Fields. Failed to Create Task.",
//     };
//   }

//   // Prepare data for insertion into the database
//   const { spec, type, command, status } = validatedFields.data;

//   console.log("----->", spec, type, command, status);
//   // Insert data into the database
//   //   const { createTaskRequest } = useTasks();

//   //   createTask({ name: taskName });
//   // Revalidate the cache for the invoices page and redirect the user.
//   // revalidatePath("/dashboard/tasks");
//   // //☝🏻 Dado que está actualizando los datos que se muestran en la ruta de facturas, desea borrar este caché y activar una nueva solicitud al servidor. Puedes hacer esto con la revalidatePathfunción de Next.js:

//   // redirect("/dashboard/tasks");
//   return "next state";
// }

// export async function updateInvoice(_id, prevState, formData) {
//   const validatedFields = UpdateInvoice.safeParse({
//     customerId: formData.get("customerId"),
//     amount: formData.get("amount"),
//     status: formData.get("status"),
//     id: _id,
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Missing Fields. Failed to Update Invoice.",
//     };
//   }

//   const { customerId, amount, status, id } = validatedFields.data;
//   const amountInCents = amount * 100;

//   try {
//     await sql`
//       UPDATE invoices
//       SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//       WHERE id = ${id}
//     `;
//   } catch (error) {
//     return { message: "Database Error: Failed to Update Invoice." };
//   }

//   revalidatePath("/dashboard/invoices");
//   redirect("/dashboard/invoices");
// }

// export async function deleteInvoice(id) {
//   // throw new Error("Failed to Delete Invoice");
//   try {
//     await sql`DELETE FROM invoices WHERE id = ${id}`;
//     revalidatePath("/dashboard/invoices");
//     return { message: "Deleted Invoice." };
//   } catch (error) {
//     return { message: "Database Error: Failed to Delete Invoice." };
//   }
// }

export async function authenticate(userData) {
  try {
    await signIn("credentials", userData);
  } catch (error) {
    if (error.message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}
