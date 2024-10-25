"use server";

import { CreateFormValues } from "@/components/CreatePostForm/CreatePostForm";
import { basicFetch } from "@/helpers/basicFetch";
import { ResponseError } from "@/helpers/responseErrors";
import { revalidateTag } from "next/cache";

export type CreatePostAction = {
  status: "success" | "error";
  message: string;
};

export const createPostAction = async (data: CreateFormValues): Promise<CreatePostAction> => {
  try {
    await basicFetch("/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    revalidateTag("posts");

    return { status: "success", message: "Post successfully created" };
  } catch (error) {
    let message = "Something went wrong";

    if (error instanceof ResponseError) {
      if (error.status === 409) {
        message = "Post with this title already exists";
      } else {
        message = error.message;
      }
    }
    return { status: "error", message };
  }
};
