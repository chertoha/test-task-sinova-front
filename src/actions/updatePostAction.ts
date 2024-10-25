"use server";

import { basicFetch } from "@/helpers/basicFetch";
import { ResponseError } from "@/helpers/responseErrors";
import { revalidateTag } from "next/cache";

export type UpdatePostActionresponse = {
  status: "success" | "error";
  message: string;
};

export const updatePostAction = async (
  id: string,
  formData: FormData,
): Promise<UpdatePostActionresponse> => {
  let body = {};

  for (const entry of formData.entries()) {
    body = JSON.stringify({
      [entry[0]]: entry[1],
    });
  }

  try {
    await basicFetch(`/posts/${id}`, {
      method: "PATCH",
      body,
      headers: { "Content-Type": "application/json" },
    });

    revalidateTag("posts");

    return { status: "success", message: "Post successfully updated" };
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
