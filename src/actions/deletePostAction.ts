"use server";

import { basicFetch } from "@/helpers/basicFetch";
import { ResponseError } from "@/helpers/responseErrors";
import { revalidateTag } from "next/cache";

export type DeletePostActionresponse = {
  status: "success" | "error";
  message: string;
};

export const deletePostAction = async (id: string): Promise<DeletePostActionresponse> => {
  try {
    await basicFetch(`/posts/${id}`, {
      method: "DELETE",
    });

    revalidateTag("posts");

    return { status: "success", message: "Post successfully deleted" };
  } catch (error) {
    let message = "Something went wrong";
    if (error instanceof ResponseError) {
      message = error.message;
    }
    return { status: "error", message };
  }
};
