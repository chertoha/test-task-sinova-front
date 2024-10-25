"use server";

import { basicFetch } from "@/helpers/basicFetch";
import { ResponseError } from "@/helpers/responseErrors";
import { revalidateTag } from "next/cache";

export type DeletePostsBatchAction = {
  status: "success" | "error";
  message: string;
};

export const deletePostsBatchAction = async (data: {
  ids: string[];
}): Promise<DeletePostsBatchAction> => {
  try {
    await basicFetch("/posts/delete-batch", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    revalidateTag("posts");

    return { status: "success", message: "Posts successfully deleted" };
  } catch (error) {
    let message = "Something went wrong";
    if (error instanceof ResponseError) {
      message = error.message;
    }
    return { status: "error", message };
  }
};
